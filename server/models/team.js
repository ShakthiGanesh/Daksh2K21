const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamModel = Schema({
    _id : Schema.Types.ObjectId,
    department : {
        type : Schema.Types.ObjectId,
        ref : "Department"
    },
    works : [{
        type : Schema.Types.ObjectId,
        ref : "Work"
    }],
    members : [{
        type : Schema.Types.ObjectId,
        ref : "User"
    }]
},{
    collection:"teams"
});

module.exports = mongoose.model("Team",teamModel);