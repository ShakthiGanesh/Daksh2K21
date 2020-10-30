const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { loginVerification, authChecker } = require('./auth');
const mongoose = require('mongoose');
const Department = require('./models/department');
const {WorkTemplate} = require('./models/templates');
const Message = require('./models/message');
const adminRoute = require('./routes/admin');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

mongoose.connect('mongodb+srv://analytics:analytics-password@cluster0.ix2gk.mongodb.net/node?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

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

app.get('/getDept',(req,res)=>{
    res.json({depts:[{_id:1,name:'one'},{_id:2,name:'two'},{_id:3,name:'tre'}]})
});

app.use('/admin',adminRoute);

io.on('connect',socket=>{
    console.log("New ws connection" + socket.id);
    socket.on('setRoom',req=>{
        User.findOne({_id : req.user_id})
        .then(user=>{
            user.projects.map(project=>{
                socket.join(project._id);
                io.to(project._id).emit('New User',{username:user.name});
            });
        })
        .catch(error=>console.log(error));
    });
    socket.on('message',req=>{
        User.findOne({_id : req.user_id})
        .then(user=>{
            io.to(req.project_id).emit('message',{username:user.name,message:req.message});
            Message.create({
                _id:mongoose.Types.ObjectId(),
                from : user._id,
                to : req.project_id,
                message : req.message
            })
            .then(()=>console.log("Saved message"))
            .catch(error=>console.log(error));
        })
        .catch(error=>console.log(error));
    });
    socket.on('disconnect',()=>console.log("ws client disconnected"));
});



server.listen(process.env.PORT || 3000);
