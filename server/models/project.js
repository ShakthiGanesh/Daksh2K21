const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectModel = Schema({
    _id : Schema.Types.ObjectId,
    color:String,
    flooring:String,    
    staffs : [{
        type : Schema.Types.ObjectId,
        ref : "User"
    }],
    customer : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    works : [{
        type: Schema.Types.ObjectId,
        ref: "Work"
    }],
    progress:{
        type:Number,
        default:function(){
            try{
                let statuses = this.works.map(work=>work.status?1:0);
                let sum = statuses.reduce((prev,curr)=>prev+curr);
                return (sum/statuses.length)*100;
            }catch{
                return 0;
            }
        }
    }
},{
    collection:"projects",
    timestamp:true
});

module.exports = mongoose.model('Project',projectModel);