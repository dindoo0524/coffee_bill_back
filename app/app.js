const express = require('express')
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser')
require('dotenv').config();

let corsOption = {
    origin: process.env.ORIGIN,
    credentials: true
} 
app.use(cors(corsOption));
// app.use(cors());
app.use(cookieParser("SECRET"))

const bills = require('./src/routes/bills')
const drinks = require('./src/routes/drinks')
const auth = require('./src/routes/auth')
const admin = require('./src/routes/admin')
const { isLogin } = require('./src/middleware/auth');


app.use(express.json())
app.use('/bills', bills);
app.use('/drinks', isLogin, drinks);
app.use('/auth', auth);
app.use('/admin/bills', admin);

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


module.exports = app;