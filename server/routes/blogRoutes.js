const express = require('express');
const { getAllBlogsController, createBlogController, updateBlogController, getBlogByIdController, deleteBlogController, userBlogController } = require("../Controllers/blogController");


// router object
const router = express.Router();

// routes
// GET || all blogs
router.get('/all-blog', getAllBlogsController);

// POST || create blog
router.post('/create-blog', createBlogController);


// PUT || Update blog
router.put('/update-blog/:id', updateBlogController);






// GET || single blog
router.get('/get-blog/:id', getBlogByIdController);

// Delete || delete blog


router.delete('/delete-blog/:id', deleteBlogController);



router.get('/user-blog/:id', userBlogController);





module.exports = router;