const jwt = require('jsonwebtoken');
const config = require('../config/config');
const User = require('../api/models/user');

//CREATE & ASSIGN A TOKEN
exports.signToken = (id) => {
    return jwt.sign(
        { _id: id },
        config.secrets.jwt,
        { expiresIn: config.expireTime }
    );
};

//VERIFY TOKEN
exports.verifyToken = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('ACCESS DENIED');

    try {
        const verified = jwt.verify(token, config.secrets.jwt);
        if (!verified) return res.status(401).send('Unauthorized');

        req.user = verified;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
};

//GET INFO ABOUT THE CONNECTED USER
exports.getFreshUser = async (req, res, next) => {

    try {
        const user = await User.findById(req.user._id);
        if (!user) return res.status(401).send('Unauthorized');

        req.user = user;
        next();
    } catch (error) {
        res.send({ message: error });
    }
};
