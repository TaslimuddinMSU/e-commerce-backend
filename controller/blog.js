const { v4: uuidv4 } = require("uuid");
const Blog = require('../modal/blog');


const postBlog = async (req, res) => {
    const { author, date, category, title, slug, description, image } = req.body;
    try {

        if (!author || !category || !title || !slug || !description || !image) {
            return res.status(400).json({ message: 'Author, category, title, slug, description, or image field are empty' });
        }

        // If date is not provided, set it to the current date
        const blogDate = date || new Date();

        const blogId = uuidv4();
        const newBlog = new Blog({
            blogId,
            author,
            date: blogDate,
            category,
            title,
            slug,
            description,
            image
        });
        await newBlog.save();

        return res.status(201).json({ message: 'Posted a new blog', newBlog });

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

const getAllBlogs = async (req, res) => {

    try {

        const allBlogs = await Blog.find().select('-_id-__v');

        if ((await allBlogs).length === 0) {
            return res.status(200).json({ message: 'No existing blogs found', newBlog });
        }

        return res.status(200).json({ message: 'All blogs', allBlogs })


    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

const getBlogById = async (req, res) => {
    const blogId = req.params.id;
    try {

        if (!blogId) {
            return res.status(400).json({ message: 'Blog ID is missing' });
        }

        const blog = await Blog.findOne({ blogId });
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        return res.status(200).json({ blog });

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}

const updateBlogById = async (req, res) => {
    const blogId = req.params.id;
    const { author, date, category, title, slug, description, image } = req.body;

    try {
        const updatedBlog = await Blog.findOneAndUpdate(
            { blogId },
            {
                author,
                date,
                category,
                title,
                slug,
                description,
                image,
            },
            { new: true } // Return the updated document
        );

        if (!updatedBlog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        return res.status(200).json({ message: 'Blog updated successfully', blog: updatedBlog });
    } catch (error) {
        return res.status(500).json({ message: 'Server Error', error: error.message });
    }
};


const deleteBlogById = async (req, res) => {
    const blogId = req.params.id;

    try {

        if (!blogId) {
            return res.status(400).json({ message: 'Blog ID is missing' });
        }

        const blog = await Blog.findOneAndDelete({ blogId });
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        return res.status(200).json({ message: "Blog is deleted.", blog });

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}


module.exports = { postBlog, getAllBlogs, getBlogById, updateBlogById, deleteBlogById }

