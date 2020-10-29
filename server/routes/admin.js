const {Router} = require('express');
const Department = require('../models/department');
const {WorkTemplate} = require('../models/templates');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const router = Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded());


router.post('/postWork',(req,res)=>{
        Department.create({
            _id: mongoose.Types.ObjectId(),
            name:req.body.dept
        }).then(()=>{
            console.log("dept success");
            WorkTemplate.create({
                _id: mongoose.Types.ObjectId(),
                name:req.body.name,
                department : req.body.dept,
                duration: req.body.duration,
                cost:req.body.cost
            
            }).then(()=>console.log("update success")).catch((err)=>console.log(err));
        }).catch(()=>"dept no");
        
        res.end();
    });
router.post('/postDept',(req,res)=>{
        Department.findOne({name:req.body.name},(err,dept)=>{
            if(dept){
                res.status(400).json({error:"Department allready exists"}).end();
            }
        });
        Department.create({
            _id: mongoose.Types.ObjectId(),
            name:req.body.name
        })
        .then(()=>res.status(200).end())
        .catch(err=>console.log(err));
    });

module.exports = router;