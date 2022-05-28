const express = require('express');
const { createBill, finishBill } = require('./ctrl');

const route = express.Router();

route.post('/', createBill)

route.patch('/', finishBill)

module.exports = route;