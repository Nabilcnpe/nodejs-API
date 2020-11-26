const express = require('express');
const router = express.Router();

const verifyToken = require('../../auth/auth').verifyToken;

const {
    getParam,
    getAllCategories,
    getSpecificCategory,
    createCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/categoryController');

router.param('id', getParam);

router.get('/', getAllCategories);

router.get('/:id', getSpecificCategory);

router.post('/', verifyToken, createCategory);

router.put('/:id', verifyToken, updateCategory);

router.delete('/:id', verifyToken, deleteCategory);

module.exports = router;
