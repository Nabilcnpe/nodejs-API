const Category = require('../models/category');

const getParam = async (req, res, next, id) => {

    try {
        const category = await Category.findById(id);
        if (!category) next(new Error('No category with that id'));
        req.category = category;
        next()
    } catch (error) {
        res.send({ message: error });
    }
};

const getAllCategories = async (req, res) => {

    try {
        const categories = await Category.find();
        res.send(categories);
    } catch (error) {
        res.send({ message: error });
    }
};

const getSpecificCategory = async (req, res) => {
    res.send(req.category);
};

const createCategory = async (req, res) => {
    const category = new Category({
        name: req.body.name
    });
    
    try {
        const newCategory = await category.save();
        res.send(newCategory);
    } catch (error) {
        res.send({ message: error });
    }
};

const updateCategory = async (req, res) => {
    const category = req.category;
    const update = req.body;

    try {
        const updatedCategory = await Category.updateOne(
            { _id: category._id },
            { $set: { name: update.name } }
        );
        res.send(updatedCategory)
    } catch (error) {
        res.send({ message: error });
    }
};

const deleteCategory = async (req, res) => {
    const category = req.category;

    try {
        const removedCategory = await Category.deleteOne({ _id: category._id });
        res.send(removedCategory)
    } catch (error) {
        res.send({ message: error });
    }
};

module.exports = { getAllCategories, getParam, getSpecificCategory, createCategory, updateCategory, deleteCategory };
