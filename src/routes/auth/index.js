const express = require('express');
const ctrl = require('./ctrl');

const route = express.Router();

route.post('/', ctrl.login)

module.exports = route;