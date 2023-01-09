const express = require('express');
const ctrl = require('./ctrl');

const route = express.Router();

route.get('/', ctrl.getBills)
route.patch('/:billSeq', ctrl.updateBillStatus)

module.exports = route;