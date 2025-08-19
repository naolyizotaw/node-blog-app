const Post = require("../models/post");


const main = async (req, res) => {

    try {
        const locals = {
        title: "Home",
        description: "Welcome to the home page"
    }

    let perPage = 7;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{$sort: {createdAt: -1}}]).skip(perPage*page - perPage).limit(perPage).exec();

    const count = await Post.countDocuments();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);


       
        res.render("index", { 
            locals, 
            data,
            current: page,
            nextPage,
            hasNextPage
        });
    

    } catch (error) {
        console.log("Error fetching posts:", error);
        res.status(500).send("Internal Server Error");
    }
    
};

const post = async (req, res) => {

    try {
        let slug = req.params.id;

        const data = await Post.findById({_id: slug});

        const locals = {
        title: data.title,
        description: "Welcome to the home page"
    };

    
    res.render('post', {locals, data})
    

    } catch (error) {
        console.log("Error fetching posts:", error);
        res.status(500).send("Internal Server Error");
    }
    
};

const search = async (req, res) => {

    try {
        
        let searchTerm = req.body.SearchTerm;
        const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "")

        const data = await Post.find({
            $or: [
                {title: { $regex: new RegExp(searchNoSpecialChar, 'i')}},
                {body:  { $regex: new RegExp(searchNoSpecialChar, 'i')}}
            ]
        });

        const locals = {
        title: "search",
        description: "Welcome to the search page"
        };

        res.render("search", {
            data, 
            locals
        });


    } catch (error) {
        console.log("Error fetching posts:", error);
        res.status(500).send("Internal Server Error");
    }
    
};

function insertPostData () {
    Post.insertMany([
        {
            title: "First Post",
            body: "This is the body of the first post"
            
        },
        {
        
            title: "Second Post",
            body: "This is the body of the second post"
        },
        {
            title: "Third Post",
            body: "This is the body of the third post"
        },
        {
            title: "Fourth Post",
            body: "This is the body of the fourth post"
        }
    ])
};
// insertPostData(); 




const about = (req, res) => {
    const locals = {
        title: "About",
        description: "Learn more about us on this page"
    }
    res.render("about", { locals } );
}

const contact = (req, res) => {
    const locals = {
        title: "Contact",
        description: "Get in touch with us"
    }
    res.render("contact", { locals });
}; 

module.exports = {  
    main,
    about,
    contact,
    post,
    search
}

