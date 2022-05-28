const express = require('express')
const app = express()
const bill = require('./routes/bill')
const order = require('./routes/order')

app.use(express.json())
app.use('/bill', bill);
app.use('/', order);

module.exports = app;