const express = require('express');
const router = express.Router();

const {
    getParam,
    getUsers,
    getSpecificUser,
    updateUser,
    createUser,
    deleteUser
} = require('../controllers/userController')

router.param('id', getParam);

router.get('/', getUsers);

router.get('/:id', getSpecificUser);

router.put('/:id', updateUser);

router.post('/', createUser);

router.delete('/:id', deleteUser);

module.exports = router;
