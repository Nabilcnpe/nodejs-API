const Post = require('../models/post');

const getParam = async (req, res, next, id) => {
    try {
        const foundPost = await Post.findById(id)
                                    .populate('author categories')
                                    .exec();
        
                                    if (!foundPost) next(new Error('No post with that id'));
        req.post = foundPost;
        next()
    } catch (error) {
        res.send({ message: error });
    }
};

const getPosts = async (req, res) => {
    try {
        const posts = await Post.find()
                            .populate('author categories', '-password')
                            .exec();
        res.send(posts);
    } catch (error) {
        res.send({ message: error });
    }
};

const getSpecificPost = async (req, res) => {
    res.send(req.post);
};

const createPost = async (req, res) => {
    const newPost = new Post({
        title: req.body.title,
        text: req.body.text,
        author: req.body.author,
        categories: req.body.categories
    });

    try {
        const savedPost = await newPost.save();
        res.send(savedPost);
    } catch (error) {
        res.send({ message: error });
    }
};

const updatePost = async (req, res) => {
    const foundPost = req.post;
    const update = req.body;
    const freshUser = req.user;
    
    if (foundPost.author._id !== freshUser._id)
        return res.status(404).send("You don't have the right to update this post");

    Object.assign(foundPost, update);

    try {
        const savedPost = await foundPost.save();
        res.send(savedPost);
    } catch (error) {
        res.send({ message: error.stack });
    }
};

const deletePost = async (req, res) => {
    const post = req.post;

    try {
        const removedPost = await Post.deleteOne({ _id: post._id });
        res.send(removedPost);
    } catch (error) {
        res.status(500).send({ message: error.stack });
    }

};

module.exports = { getParam, getPosts, getSpecificPost, createPost, updatePost, deletePost };
