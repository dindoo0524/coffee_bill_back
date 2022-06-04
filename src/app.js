const express = require('express')
const app = express()
const bills = require('./routes/bills')
const drinks = require('./routes/drinks')

app.use(express.json())
app.use('/bills', bills);
app.use('/drinks', drinks);

module.exports = app;