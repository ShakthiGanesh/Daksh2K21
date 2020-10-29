const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workModel = Schema({
    _id : Schema.Types.ObjectId,
    work : {
        type:Schema.Types.ObjectId,
        ref:'WorkTemplate',
        required:true},
    user : {
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    updates:Object, // types of objects inside this can be mixed 
                    // a seperate handler will be used to parse the data
                    // every object inside this field should be set along with its type
    expectedDuration : Date,
    status : Boolean,
    expense : String
},{
    timestamps:true,
    collection:'works'
});

module.exports = mongoose.model('Work', workModel);