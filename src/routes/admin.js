const express = require("express");
const router = express.Router();
const post = require("../models/post");
const User = require("../models/user");
const {admin, 
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
    } = require("../controllers/adminController");
const { authMiddlewares } = require('../middlewares/authMiddlewares');




router.get("/admin", admin);
router.post("/admin", checkLogin);
router.post("/admin/register", register);
router.get('/admin/signup', signup);
router.get("/dashboard", authMiddlewares, dashboard);
router.get('/addPost', authMiddlewares, addPost);
router.post('/addPost', authMiddlewares, addPostToDb);
router.get('/editPost/:id', authMiddlewares, getEditPost)
router.put('/editPost/:id', authMiddlewares,editPost);
router.delete('/deletePost/:id', authMiddlewares, deletePost);
router.get('/logout', logout);

module.exports = router;