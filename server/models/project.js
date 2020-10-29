const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectModel = Schema({
    _id : Schema.Types.ObjectId,
    name : {
        type: String,
        required: true
    },
    team : {
        type : Schema.Types.ObjectId,
        ref : "Team"
    },
    user : {
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