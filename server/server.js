const express = require('express');
const app = express();
const mongoose = require('mongoose');

const api = require('./api/api');
const config = require('./config/config');
const loginRoute = require('./auth/routes');

//DB
mongoose.connect(
    config.db.url,
    { useNewUrlParser: true, useUnifiedTopology: true }, () => {
        console.log(`Connected to db`);
    }
);

//MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTES
app.use('/api', api);
app.use('/login', loginRoute);

//A MIDDLEWARE ERROR HANDLER
app.use((err, req, res, next) => {
    console.log('This is the error :', err.stack);
    res.status(500);
});

module.exports = app;
