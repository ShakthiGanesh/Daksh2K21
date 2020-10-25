const exppress = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const { loginVerification, authChecker } = require('./auth');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.post('/login',loginVerification,(req,res)=>{
    res.send("authenticated");
});

app.post('/checkAuth',authChecker,(req,res)=>{
    res.send("authenticated");
});

app.listen(process.env.PORT || 3000);
