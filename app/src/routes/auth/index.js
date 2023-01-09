const express = require('express');
const ctrl = require('./ctrl');

const route = express.Router();

route.post('/login', ctrl.login)
route.post('/signup', ctrl.signUp)

module.exports = route;