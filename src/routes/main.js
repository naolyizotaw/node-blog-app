const express = require("express");
const router = express.Router();
const {main, about, contact, post, search} = require("../controllers/mainConroller");

router.get('/', main);

	// router.post('/search', search); // Existing POST route commented out for clarity
router.post('/search', search);

router.get('/post/:id', post);

router.get('/about', about);

router.get("/contact", contact);


module.exports = router;    