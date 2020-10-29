const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const planModel = Schema({
    _id: Schema.Types.ObjectId,
    name : String,
    works:[{
        type:Schema.Types.ObjectId,
        ref:"WorkTemplate"
    }]
},{
    collection:'plans'
});

module.exports = mongoose.model('Plan',planModel);