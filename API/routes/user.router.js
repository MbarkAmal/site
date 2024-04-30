const express = require ('express')
const route = express.Router()


const user = require('../controllers/user.controller')

route.get('/getAllUser', user.getAllUser);

route.delete('/deleteUser/:id', user.delete)

module.exports = route 

