const express = require('express')
const app = express()
const bills = require('./routes/bills')
const drinks = require('./routes/drinks')
const auth = require('./routes/auth')

app.use(express.json())
app.use('/bills', bills);
app.use('/drinks', drinks);
app.use('/auth', auth);

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


module.exports = app;