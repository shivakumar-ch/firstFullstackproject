var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require("mongoose")
const cors = require("cors")

var incomeRouter = require('./routes/income');
var contactRouter = require('./routes/contact');
const dbProps = require("./properties");

var app = express();

// middleware functions 
app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/contacts', contactRouter);
app.use('/income', incomeRouter)


mongoose.connect(dbProps.DB_URL)

mongoose.connection.on("connected",()=>{
  console.log("connected to db")
})

module.exports = app;
