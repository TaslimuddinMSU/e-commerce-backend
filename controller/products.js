const { Product }  = require('../modal/products');
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
        return res.status(201).json({ message: "Product added successfully.", product: newProduct });

    } catch (error) {
        return res.status(500).json({ message: "Internal server error.", error: error.message });
    }
};

const getAllProducts = async(req, res) => {
    try {
        
    } catch (error) {
        return res.status(201).json({ message: 'Added new category successefully.', category: category })
        
    }
}

const getProductById = async(req, res) => {
    try {
        
    } catch (error) {
        return res.status(201).json({ message: 'Added new category successefully.', category: category })
        
    }
}

const updateProductById = async(req, res) => {
    try {
        
    } catch (error) {
        return res.status(201).json({ message: 'Added new category successefully.', category: category })
        
    }
}

const deleteProductById = async(req, res) => {
    try {
        
    } catch (error) {
        return res.status(201).json({ message: 'Added new category successefully.', category: category })
        
    }
}


module.exports = { 
    addProduct, 
    getAllProducts, 
    getProductById, 
    updateProductById, 
    deleteProductById 
}