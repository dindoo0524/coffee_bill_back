const express = require('express');
const { getDrinkList, orderDrink, getOrders, getOrderPeople } = require('./ctrl');

const route = express.Router();


route.get('/order/drinks', getDrinkList)

route.post('/order/drink', orderDrink)

route.get('/orders', getOrders)

route.get('/order/people/:orderSeq/:drinkSeq', getOrderPeople)

module.exports = route;