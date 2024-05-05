const express = require('express');

const user = require ('../controllers/auth');

const route = express.Router();

route.post('/register', user.register);

route.post('/login',user.login);

route.post('/logindash',user.logindash)

module.exports = route 