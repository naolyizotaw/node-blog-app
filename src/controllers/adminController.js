
const adminLayout = '../views/layouts/admin';
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../models/user");
const post = require("../models/post");



const admin = (req, res) => {
     try {
            const locals = {
            title: "Admin Dashboard",
            description: "Manage your blog posts"
        }

        res.render("admin/index", { locals, layout: adminLayout});
        
    
        } catch (error) {
            console.log("Error fetching posts:", error);
            res.status(500).send("Internal Server Error");
        }
        
    
};

const signup = (req, res) => {
    res.render('admin/signup')
}

 const register = async (req, res) => {
    try {
    const { username, password, role } = req.body;

    //hashed password 
    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user and save it to database 
    const newUser = new User({ username, password: hashedPassword, role});
    await newUser.save();
    // Redirect to /admin after successful registration
    res.redirect('/admin');

    } catch (err) {
        // Duplicate username error (E11000)
        if (err && err.code === 11000) {
            return res.status(409).json({ message: 'Username already exists' });
        }
        console.error('Register error:', err);
        res.status(500).json({message: 'Something is wrong!'});
    }
};





const checkLogin = async (req, res) => {
     try {
    const { username, password} = req.body;

    const user = await User.findOne({username});
    
    //compare username with in the database  
    if(!user) {
        return res.status(404).json({message: `User with username: ${username} not found!`})
    }

    //compare password with database 
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(400).json({message: `Invalid credentials!`});
    }
     
    //Access Token generator
    const token = jwt.sign(
        { id: user._id, username: user.username }, 
        process.env.JWT_SECRET,
         {expiresIn: "1h"}
        );
        res.cookie('token', token, { httpOnly: true });

        res.redirect('/dashboard');
} catch {
    res.status(404).json({message: `sth went wrong!`});
};

};

const dashboard = async (req, res) => {

    try {
        const data = await post.find();
        const locals = {
            title: "Dashboard",
            description: "Manage your blog posts"
        };
        res.render("admin/dashboard", { locals,
             data,
            layout: adminLayout });
    } catch (error) {
        console.log("Error fetching posts:", error);
        res.status(500).send("Internal Server Error");
    }

        
};

const addPost= async (req, res) => {

    try {
        const data = await post.find();
        const locals = {
            title: "Dashboard",
            description: "Manage your blog posts"
        };
        res.render("admin/addPost", { locals,
            layout: adminLayout
         });
    } catch (error) {
        console.log("Error fetching posts:", error);
        res.status(500).send("Internal Server Error");
    }

        
};

const addPostToDb = async (req, res) => {
    try {
        const newPost = new post({
            title: req.body.title,
            body: req.body.body,
        });
        await post.create(newPost);
        return res.redirect('/dashboard');
    } catch (error) {
        console.log("Error adding post to database:", error);
        return res.status(500).send("Internal Server Error");
    }

        
};

const getEditPost= async (req, res) => {

    try {
        const locals = {
            title: "Edit Post",
            description: "Manage your blog posts"
        };
       
    const data = await post.findOne({ _id: req.params.id });
        res.render('admin/edit-post', { 
            locals,
            data,
            layout: adminLayout
        });
    } catch (error) {
        console.log("Error fetching posts:", error);
        res.status(500).send("Internal Server Error");
    }

        
};

const editPost= async (req, res) => {

    try {
       
        await post.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            body: req.body.body,
            UpdatedAt: Date.now()
        })
        res.redirect(`/editPost/${req.params.id}`)
    } catch (error) {
        console.log("Error fetching posts:", error);
        res.status(500).send("Internal Server Error");
    }

        
};

const deletePost= async (req, res) => {

    try {
            await post.deleteOne( { _id: req.params.id })
            res.redirect('/dashboard')
        
    } catch (error) {
        console.log("Error fetching posts:", error);
        res.status(500).send("Internal Server Error");
    }

        
};

const logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
}






module.exports = {
    admin,
    checkLogin,
    register,
    dashboard,
    addPost,
    addPostToDb,
    editPost,
    getEditPost,
    deletePost,
    logout,
    signup
};