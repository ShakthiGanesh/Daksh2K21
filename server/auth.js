const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const User = require('./models/user');
const bcrypt = require('bcrypt');

const tokenizer = async data=>awaitjwt.sign({data},process.env.SECRET_KEY || 'secret_key',{expiresIn:5*60*60});

module.exports.authChecker = (req,res,next)=>{
    const token = Cookie.jwt;
    if(token){
        jwt.verify(token,process.env.SECRET_KEY || 'secret_key',(err,decoded)=>{
            if(decoded in User.find({})._id){
                const group = User.findOne({_id:decoded}).group;
                next(group);
            }
            else{
                res.status(401);
                res.json({error:"unauthenticated"});
            }
        });
    }
    else{
        res.status(401);
        res.json({error:"unauthenticated"});
    }
}

module.exports.loginVerification = async (req,res,next)=>{
    if(req.username in User.find({}).username){
        const user = User.findOne({username:req.username});
        const hashed = bcrypt.hash(req.password,process.env.SALT);
        if(hashed == user.password){
            res.cookie('jwt',await tokenizer({id:user._id,group:user.group}));
            next(user.group);
        }
        else{  
            res.status(401);
            res.json({error:"Incorect password"});
        }
    }
    else{
        res.status(401);
        res.json({error:'User not found'});
    }
}