const express = require("express");
const { addProduct, getAllProducts, getProductById, 
        updateProductById, deleteProductById } = require('../controller/products');

const router = express.Router();

router.post('/products', addProduct);
router.get('/products', getAllProducts);
router.get('/product/:id', getProductById);
router.put('/product/:id', updateProductById);
router.delete('/product/:id', deleteProductById);


module.exports = router