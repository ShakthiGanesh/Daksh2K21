const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workModel = Schema({
    _id : Schema.Types.ObjectId,
    name : {type:String,required:true},
    department : {
        type:Schema.Types.ObjectId,
        ref : "Department"
    },
    updates:Object, // types of objects inside this can be mixed 
                    // a seperate handler will be used to parse the data
                    // every object inside this field should be set along with its type
    expectedDuration : String,
    status : Object,
    expense : String
},{
    timestamps:true
});

module.exports = mongoose.model('Work', workModel);