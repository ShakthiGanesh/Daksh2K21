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
    }]
},{
    collection:"projects",
    timestamp:true
});

module.exports = mongoose.model('Project',projectModel);