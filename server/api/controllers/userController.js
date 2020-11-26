const bcrypt = require('bcryptjs');

const User = require('../models/user');

const getParam = async (req, res, next, id) => {

    try {
        const foundUser = await User.findById(id);
        if (!foundUser) next(new Error('No user with that id'));
        req.user = foundUser;
        next();
    } catch (error) {
        res.send({ message: error });
    }
};

const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        res.send(users);
    } catch (error) {
        res.status(404).send({ message: error });
    }
};

const getSpecificUser = (req, res) => {
    res.send(req.user);
};

const updateUser = async (req, res) => {

    try {
        const updatedUser = await User.updateOne(
            { _id: req.user._id },
            { $set: { username: req.user.username } }
        )
        res.send(updatedUser);
    } catch (error) {
        res.send({ message: error });
    }
};

const createUser = async (req, res, next) => {

    ////CHECKING IF USERNAME ALREADY EXISTS IN DB
    const isUsernameExists = await User.findOne({ username: req.body.username });
    if (isUsernameExists) return res.status(400).send('Email already exists');

    //HASH PASSWORD
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        username: req.body.username,
        password: hashPassword
    });

    try {
        const savedUser = await user.save();
        res.send(savedUser);
    } catch (error) {
        res.status(404).send({ message: error });
    }
};

const deleteUser = async (req, res) => {

    try {
        const removedUser = await User.deleteOne({ _id: req.user._id });
        res.send(removedUser);
    } catch (error) {
        res.send({ message: error });
    }
};

module.exports = { getParam, getUsers, getSpecificUser, updateUser, createUser, deleteUser };
