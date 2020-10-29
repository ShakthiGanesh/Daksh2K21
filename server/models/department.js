const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentModel = Schema({
    _id : Schema.Types.ObjectId,
    name : {
        type : String,
        required: true
    },
    employees : [{
        type : Schema.Types.ObjectId,
        ref : 'User'
    }],
    works : [{
        type : Schema.Types.ObjectId,
        ref : 'Work'
    }],

},{
    collection:"departments"
});

module.exports  = mongoose.model("Department",departmentModel);