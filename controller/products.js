const { Product } = require('../modal/products');
const { v4: uuidv4 } = require("uuid");

const addProduct = async (req, res) => {
    const { name, description, image, rating, reviews, originalPrice, discountedPrice, discount, stock, categoryId } = req.body;

    try {
        // Validate required fields
        if (!name || !description || !image?.url || !originalPrice || !categoryId) {
            return res.status(400).json({ message: "Missing required fields." });
        }

        const productId = uuidv4();
        const newProduct = new Product({
            productId,
            name,
            description,
            image,
            rating: rating || 0,
            reviews: reviews || 0,
            originalPrice,
            discountedPrice: discountedPrice || originalPrice,
            discount: discount || 0,
            stock: stock || 0,
            categoryId
        });

        await newProduct.save();
        return res.status(201).json({ message: "Product added successfully.", newProduct });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error.", error: error.message });
    }
};

const getAllProducts = async (req, res) => {
    try {

        const allProduct = await Product.find().select('-_id -__v');
        if (allProduct.length === 0) {
            return res.status(200).json({ message: "Product list is empty." });
        }
        return res.status(200).json({message: 'Products fetched successfully' , allProduct });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error.", error: error.message });
    }
};

const getProductById = async (req, res) => {
    const productId = req.params.id;

    try {

        const product = await Product.findOne({ productId }).select('-_id -__v');

        if (!product) {
            return res.status(400).json({ message: "No product found.", productId, error: "Invalid product ID." });
        }

        return res.status(200).json({ message: 'Products fetched successfully',product });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error.", error: error.message });

    }
}

const updateProductById = async (req, res) => {
    const productId = req.params.id;
    const { name, description, image, rating, reviews, originalPrice, discountedPrice, discount, stock } = req.body;
    try {
        const existingProduct = await Product.findOne({ productId });

        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found.", productId });
        }
        const updatedProduct = await Product.findOneAndUpdate(
            { productId },
            { 
                name, 
                description, 
                image, 
                rating, 
                reviews, 
                originalPrice, 
                discountedPrice: discountedPrice || originalPrice, 
                discount, 
                stock, 
                // categoryId 
            },
            { new: true}
        ).select('-_id -__v');

        return res.status(200).json({ message: "Product updated successfully.", updatedProduct });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error.", error: error.message });
    }
}

const deleteProductById = async (req, res) => {
    const productId = req.params.id;

    try {

        const product = await Product.findOneAndDelete({ productId });

        if (!product) {
            return res.status(400).json({ message: "No product found.", productId, error: "Invalid product ID." });
        }

        return res.status(200).json({message: "Product deleted successfully.", product: product.productId });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error.", error: error.message });
    }
}


module.exports = {
    addProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById
}