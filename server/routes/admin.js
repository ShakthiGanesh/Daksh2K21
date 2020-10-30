const {Router} = require('express');
const Department = require('../models/department');
const {WorkTemplate, Plan} = require('../models/templates');
const User = require*'../models/user';
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const router = Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded());

router.route('/department')
    .post((req, res) => {
            Department.findOne({ name: req.body.name }, (err, dept) => {
                if (dept) {
                    res.status(400).json({ error: "Department allready exists" }).end();
                }
            });
            Department.create({
                _id: mongoose.Types.ObjectId(),
                name: req.body.name
            })
                .then(() => res.status(200).end())
                .catch(err => console.log(err));
        })

    .get((req,res)=>{
        Department.find({})
        .populate('works')
        .then(departments=>res.status(200).json(departments))
        .catch(err=>res.status(500).json({error:err.message}));
    })
    .put((req,res)=>{
        Department.update({_id:req.body._id},
            {$set:{
                name : req.body.name                
            }})
        .then(()=>res.status(200).end())
        .catch(err=>res.status(500).json({error:err.message}));
    })
    .delete((req,res)=>{
        Department.delete({_id:req.body._id})
        .then(()=>res.status(200).end())
        .catch(err=>res.status(500).json({error:err.message}));
    });

router.route('/workTemplate')
    .post((req,res)=>{
        WorkTemplate.findOne({name:req.body.name})
        .then(()=>res.status(400).json({error:"The work allready exists"}).end())
        .catch(err=>console.log(err));
        WorkTemplate.create({
            _id: mongoose.Types.ObjectId(),
            name:req.body.name,
            department : req.body.dept,
            duration: req.body.duration,
            cost:req.body.cost
        })
        .then((item)=>{
            Department.update({_id:req.body.dept},
                {
                    $push:{
                        works : item._id
                    }
                })
                .then(()=>res.status(200).json({message:"Successfully added work" + item.name}))
                .catch(err=>res.status(500).json(err));
        })
        .catch(err=>res.status(500).json(err));
    })
    .get((req,res)=>{
        WorkTemplate.find({})
        .populate('department')
        .then(works=>res.status(200).json(works))
        .catch(err=>res.status(500).json({error:err.message}));
    })
    .delete((req,res)=>{
        WorkTemplate.delete({_id:req.body._id})
        .then(()=>{
            Department.update({},{$pull:{
                works : req.body.id
            }})
            .then(()=>res.status(200).json({message:"Successfully deleted work"}))
            .catch(err=>res.status(500).json(err));
        })
        .catch(err=>res.status(500).json(err));
    });

router.route('/staff')
    .get((req,res)=>{
        User.find({group:'staff'})
        .then(users=>res.status(200).json(users))
        .catch(err=>res.status(500).json(err));
    })
    .post((req,res)=>{
        User.find({staff_id:res.body.staff_id})
        .then(()=>res.status(400).json({error:"User allready exists"}))
        .catch(err=>console.log(err));
        User.create({
            staff_id: staff_id,
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            group: 'staff'
        })
        .then(()=>res.status(200).json({message:`Successfully created staff ${req.body.name}`}))
        .catch(err=>res.status(500).json({error:err}));
    })
    .put((req,res)=>{
        User.findOne({_id : req.body._id})
        .then(user=>{
            User.update({_id:user._id},{$set:{
                name: req.body.name || user.name,
                email : req.body.email || user.email,
                staff_id : rereqs.body.staff_id || user.staff_id,
                department : req.body.department || user.department,
                mobile : req.body.mobile || user.mobile
            }})
            .then(()=>res.status(200).json({message:`Updated ${user.name} successfully`}))
            .catch(err=>res.status(500).json({error:err}));
        })
        .catch(err=>res.status(500).json({error:err}));
    })
    .delete((req,res)=>{
        User.delete({_id:req.body._id})
        .then(()=>res.status(200).json({message:`Deleted ${req.body.name}`}))
        .catch(err=>res.status(500).json({error:err}));
    });

router.route('/plan')
    .get((req,res)=>{
        Plan.findOne({_id:req.body._id})
        .then(plan=>{
            res.status(200).json(plan);
        })
        .catch(err=>res.status(500).json({error:err}));
    })
    .post((res,req)=>{
        Plan.update({_id:req.body._id},{$set:{
            name: res.body.name
        }})
        .then(()=>res.status(200).json({message:"Created plan"}))
        .catch(err=>res.status(500).json({error:err}));
    });

module.exports = router;