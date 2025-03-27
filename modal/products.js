const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryName: { type: String, required: true },
    image: {
        data: Buffer, // Store image as binary data if uploaded from file
        contentType: String, // Store the file type (e.g., image/png, image/jpeg)
        url: String, // Store the image URL if hosted externally
    },
});

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: {
        data: Buffer, // Store image as binary data if uploaded from file
        contentType: String, // Store the file type (e.g., image/png, image/jpeg)
        url: String, // Store the image URL if hosted externally
    },
    rating: { type: Number, required: true, min: 0, max: 5 },
    reviews: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number, required: true, min: 0 },
    discountedPrice: { type: Number, min: 0 },
    discount: { type: String },
    stock: { type: Number, min: 0, default: 0 },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }, // Linking product to category
});

const Category = mongoose.model('Category', categorySchema);
const Product = mongoose.model('Product', productSchema);

module.exports = { Product, Category };
