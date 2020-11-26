const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../api/models/user');
const signToken = require('./auth').signToken;

router.post('/', async (req, res) => {

    //CHECKING IF USERNAME EXISTS IN DB
    const isUsernameExists = await User.findOne({ username: req.body.username });
    if (!isUsernameExists) return res.status(400).send('USERNAME OR PASSWORD IS WORNG');

    //CHECKING IF PASSWORD IS CORRECT
    const validPassword = await bcrypt.compare(req.body.password, isUsernameExists.password);
    if (!validPassword) return res.status(400).send('INVALID PASSWORD');

    const token = await signToken(isUsernameExists._id);
    res.header('auth-token', token).send(token);

    res.send('SUCESS !!!!!')

});

module.exports = router;
