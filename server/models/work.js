const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const updateSchema = Schema({
    _id: Schema.Types.ObjectId,
    message:String,
    image:String
});
const workModel = Schema({
    _id : Schema.Types.ObjectId,
    project:{
        type:Schema.Types.ObjectId,
        ref:'Project',
    },
    work : {
        type:Schema.Types.ObjectId,
        ref:'WorkTemplate'
    },
    user : {
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    staff:{
        type:Schema.Types.ObjectId,
        ref:'User',
        default:function(){
            try{
                return this.work.department.managers[0].name
            }
            catch{
                return null;
            }
        }
    },
    updates:[updateSchema],
    expectedDuration : Date,
    status : {
        types:Boolean,
        default:false
    },
    expense : String,
    department:{
        type:String,
        default:function(){
            try{
                return this.work.department;
            }
            catch{
                return null;
            }
        }
    },
    dateCompleted:{
        type:Date,
        default:function(){
            if(this.status){
                return Date.now();
            }
            return null;
        }
    }
},{
    timestamps:true,
    collection:'works'
});

module.exports = mongoose.model('Work', workModel);