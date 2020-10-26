const exppress = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { loginVerification, authChecker } = require('./auth');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// use this to verify user and password with a post request from login form
app.post('/login',loginVerification,(group,req,res)=>{
    res.status(200);
    res.json({group:group,isAuthenticated:true});
});

// use this to chech user authentication before rendering protected components
app.get('/checkAuth',authChecker,(group, req,res)=>{
    res.status(200);
    res.json({group:group,isAuthenticated:true});
});

app.listen(process.env.PORT || 3000);
