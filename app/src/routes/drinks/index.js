const express = require('express');
const ctrl = require('./ctrl');

const route = express.Router();

route.get('/', ctrl.getDrinks)
route.post('/', ctrl.addDrink)

module.exports = route;