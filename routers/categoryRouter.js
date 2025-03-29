const express = require('express');
const { addCategory,
        getCategory,
        getCategoryById,
        updateCategoryById,
        deleteCategoryById} = require('../controller/category');

const router = express.Router();

router.post('/categories', addCategory);
router.get('/categories', getCategory);
router.get('/categories/:id', getCategoryById);
router.put('/categories/:id', updateCategoryById);
router.delete('/categories/:id', deleteCategoryById);


module.exports = router