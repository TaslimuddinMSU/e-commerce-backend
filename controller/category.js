const { v4: uuidv4 } = require("uuid");
const { Category } = require('../modal/products');

const addCategory = async (req, res) => {
    const { categoryName, image } = req.body;

    try {
        const categoryId = uuidv4();

        const category = new Category({
            categoryId,
            categoryName: categoryName,
            image: image
        });

        await category.save(); 
        return res.status(201).json({ message: 'Added new category successefully.', category: category })

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}


const getCategory = async (req, res) => {
    try {
        const allCategories = await Category.find().select('-_id -__v');
        return res.status(200).json({
            message: 'Fetched all categories successfully.',
            categories: allCategories
        });

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });

    }
}


const getCategoryById = async (req, res) => {
    const categoryId = req.params.id;

    try {
        const category = await Category.findOne({ categoryId }).select('-_id -__v');
        if (!category) {
            return res.status(400).json({
                message: "Category not found",
            });
        }
        return res.status(200).json({
            message: "Category fetched successfully",
            category
        });

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
}


const updateCategoryById = async (req, res) => {
    const categoryId = req.params.id;
    const { categoryName, image } = req.body;

    try {
        const category = await Category.findOne({ categoryId }).select('-_id -__v');

        if (!category) {
            return res.status(400).json({
                message: "Category not found",
            });
        }

        if(!categoryName || !image){
            return res.status(400).json({
                message: "Category name and image are required.",
            });
        }

        const updatedCategory = await Category.findOneAndUpdate(
            { categoryId },
            { categoryName, image },
            { new: true, runValidators: true }
        ).select('-_id -__v');

        return res.status(200).json({ message: "Category updated successfully", category: updatedCategory });

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });

    }
}


const deleteCategoryById = async (req, res) => {
    const categoryId = req.params.id;

    try {
        const category = await Category.findOne({ categoryId }).select('-_id -__v');
        if (!category) {
            return res.status(400).json({
                message: "Category not found",
            });
        }

        const deleteCategory = await Category.findOneAndDelete({ categoryId });

        return res.status(200).json({ message: "Category delete successfully", category: deleteCategory });

    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });

    }
}


module.exports = {
    addCategory,
    getCategory,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
}