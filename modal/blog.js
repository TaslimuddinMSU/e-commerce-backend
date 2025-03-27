const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    author: { type: String, require },
    date: { type: String, required: true },
    category: { type: String, required: true },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: {
        data: Buffer, // Store image as binary data if uploaded from file
        contentType: String, // Store the file type (e.g., image/png, image/jpeg)
        url: String, // Store the image URL if hosted externally
    },
});

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
