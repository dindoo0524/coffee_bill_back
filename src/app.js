const express = require('express')
const app = express()
const cors = require('cors');
let corsOption = {
    origin: 'http://localhost:4000',
    credentials: true
} 

app.use(cors(corsOption));

const bills = require('./routes/bills')
const drinks = require('./routes/drinks')
const auth = require('./routes/auth')
const { isLogin } = require('./middleware/auth');


app.use(express.json())
app.use('/bills', isLogin, bills);
app.use('/drinks', isLogin, drinks);
app.use('/auth', auth);

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


module.exports = app;