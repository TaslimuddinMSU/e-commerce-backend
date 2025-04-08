const express = require("express");
const { postBlog, getAllBlogs,
    getBlogById, updateBlogById,
    deleteBlogById } = require('../controller/blog');

const router = express.Router();


router.post('/blog', postBlog);
router.get('/blog', getAllBlogs);
router.get('/blog/:id', getBlogById);
router.put('/blog/:id', updateBlogById);
router.delete('/blog/:id', deleteBlogById);

module.exports = router;

