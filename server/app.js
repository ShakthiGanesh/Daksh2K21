const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { loginVerification, authChecker } = require('./auth');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://analytics:analytics-password@cluster0.ix2gk.mongodb.net/node?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());

// use this to verify user and password with a post request from login form
app.post('/login',loginVerification,(req,res,group)=>{
    res.status(200);
    res.json({group:group,isAuthenticated:true});
});

// use this to chech user authentication before rendering protected components
app.post('/checkAuth',authChecker,(req,res,group)=>{
    res.status(200);
    res.json({group:group,isAuthenticated:true});
});

app.listen(process.env.PORT || 3000);
