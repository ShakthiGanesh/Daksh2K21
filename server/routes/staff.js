const {Router} = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const Work = require('../models/work');
const upload = require('../aws');

const router = Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended:true}));
router.use(cookieParser());

router.post('/changeStatus',(req,res)=>{
    const token = req.cookies.jwt;
    jwt.verify(token,process.env.SECRET_KEY || 'secret_key',(err,decoded)=>{
        User.findOne({_id:decoded.data.id})
        .then(user=>{
            if(user.group=='staff'||'admin'){
                Work.findOne({_id:req.body._id})
                .populate('staffs')
                .then(work=>{
                    if(user._id == work.staff._id){
                        Work.update({_id:work._id},{$set:{status:req.body.status}})
                        .then(()=>res.status(200).json({message:"Updated successfully"}))
                        .catch(err=>{
                            console.log(err);
                            res.status(500).json(err);
                        });
                    }
                    else
                        res.status(401).json({error:"unauthenticated"});
                })
                .catch(err=>{
                    console.log(err);
                    res.status(500).json(err);
                });
            }
            else
                res.status(401).json({error:"unauthenticated"});

        })
        .catch(err=>{
            console.log(err);
            res.status(500).json(err);
        });
    });
});

router.post('/update',upload.single('update'),(req,res)=>{
    const token = req.cookies.jwt;
    jwt.verify(token,process.env.SECRET_KEY || 'secret_key',(err,decoded)=>{
        User.findOne({_id:decoded.data.id})
        .then(user=>{
            if(user.group=='staff'||'admin'){
                Work.findOne({_id:req.body._id})
                .populate('staffs')
                .then(work=>{
                    if(user._id == work.staff._id){
                        Work.update({_id:work._id},{$push:{updates:{message:req.body.message,image:req.file.location}}})
                        .then(()=>res.status(200).json({message:"Updated successfully"}))
                        .catch(err=>{
                            console.log(err);
                            res.status(500).json(err);
                        });
                    }
                    else
                        res.status(401).json({error:"unauthenticated"});
                })
                .catch(err=>{
                    console.log(err);
                    res.status(500).json(err);
                });
            }
            else
                res.status(401).json({error:"unauthenticated"});

        })
        .catch(err=>{
            console.log(err);
            res.status(500).json(err);
        });
    });
});

module.exports = router;