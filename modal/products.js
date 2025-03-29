const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    categoryId: { type: String, required: true, unique: true }, // Primary Key for Category
    categoryName: { type: String, required: true, unique: true },
    image: {
        data: Buffer, 
        contentType: String, 
        url: { type: String, required: true }
    },
});

const productSchema = new mongoose.Schema({
    productId: { type: String, required: true, unique: true }, // Primary Key for Product
    name: { type: String, required: true },
    description: { type: String, required: true },
    image: {
        data: Buffer,
        contentType: String,
        url: String,
    },
    rating: { type: Number, min: 0, max: 5, default: 0 }, 
    reviews: { type: Number, min: 0, default: 0 }, 
    originalPrice: { type: Number, required: true, min: 0 },
    discountedPrice: { type: Number, min: 0, default: 0 },
    discount: { type: Number, min: 0, default: 0 },
    stock: { type: Number, min: 0, default: 0 },
    categoryId: { type: String, required: true, ref: 'Category' }, // Foreign Key referencing Category
});

const Category = mongoose.model('Category', categorySchema);
const Product = mongoose.model('Product', productSchema);

module.exports = { Product, Category };
