const jwt = require('jsonwebtoken');

const User = require('./models/user');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://analytics:analytics-password@cluster0.ix2gk.mongodb.net/node?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>console.log("Connected to database"))
.catch(err=>console.log(err));
const tokenizer = async data=>jwt.sign({data},process.env.SECRET_KEY || 'secret_key',{expiresIn:5*60*60});

module.exports.authChecker = (req,res,next)=>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token,process.env.SECRET_KEY || 'secret_key',(err,decoded)=>{
            User.findOne({_id:decoded.data.id})
            .then(user=>{
                if(user.group===req.body.group)
                    next();
                else
                    res.status(401).json({error:"unauthenticated"});
            })
            .catch(err=>{
                console.log(err);
                res.status(500);
            });
            // res.status(200);
            // res.json(decoded);
        });
    }
    else{
        res.status(401);
        res.json({error:"unauthenticated"});
    }
}

module.exports.loginVerification = async (req,res,next)=>{
    User.findOne({email:req.body.email})
    .then(async user=>{
        if(user){
            const hashed = await bcrypt.hash(req.body.password, '$2b$10$SN5MRK.PivkVFa2Yi7gYIu');
            if(user.password === hashed){
                res.cookie('jwt',await tokenizer({id:user._id,group:user.group}));
                next();
            }
            else
                res.json({isAuthenticated:false,message:"Invalid password"});
        }
        else
            res.send({isAuthenticated:false,message:"User not found"});
    })
    .catch(err=>{console.log(err+error);res.status(500).end()}); 
}

