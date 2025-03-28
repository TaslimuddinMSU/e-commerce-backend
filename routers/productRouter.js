const express = require("express");
const { addProduct, getAllProducts, getProductById, updateProductById, deleteProductById } = require('../controller/products');

const router = express.Router();

router.post('/add-product', addProduct);
router.get('/products', getAllProducts);
router.get('/product/:id', getProductById);
router.patch('/product/:id', updateProductById);
router.delete('/product/:id', deleteProductById);


module.exports = router