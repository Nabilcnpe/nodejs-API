const express = require('express');
const router = express.Router();
const verifyToken = require('../../auth/auth').verifyToken;
const getFreshUser = require('../../auth/auth').getFreshUser;

const {
    getParam,
    getPosts,
    getSpecificPost,
    createPost,
    updatePost,
    deletePost
} = require('../controllers/postController');

router.param('id',getParam);

router.get('/', verifyToken, getPosts);

router.get('/:id', getSpecificPost);

router.post('/', verifyToken, createPost);

router.put('/:id', verifyToken, getFreshUser, updatePost);

router.delete('/:id', verifyToken, deletePost);

module.exports = router;
