const express = require('express');

const cart = require ('../controllers/cart.controller')

const route = express.Router();

route.post('/addtocart', cart.addtocart);

module.exports = route 
