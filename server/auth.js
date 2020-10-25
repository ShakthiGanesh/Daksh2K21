const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const User = require('./models/user');
const bcrypt = require('bcrypt');

const tokenizer = data=>jwt.sign({data},process.env.SECRET_KEY || 'secret_key',{expiresIn:5*60*60});

module.exports.authChecker = (req,res,next)=>{
    const token = Cookie.jwt;
    jwt.verify(token,process.env.SECRET_KEY || 'secret_key',(err,decoded)=>{
        if(decoded in User.find({_id:decoded})){
            next();
        }
        else{
            res.end();
        }
    });
}

module.exports.loginVerification = async (req,res,next)=>{
    if(req.username in User.find({username:req.username})){
        const userid = User.findOne({username:req.username})._id;
        const hashed = bcrypt.hash(req.password,process.env.SALT);
        if(hashed == User.findOne({username:req.username}.password)){
            res.cookie('jwt',tokenizer(userid));
            res.end();
        }
        else{
            res.send("Incorect password");
        }
    }
    else{
        res.send('User not found');
    }
}