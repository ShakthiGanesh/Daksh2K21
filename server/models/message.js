const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = Schema({
    _id:Schema.Types.ObjectId,
    from:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    to:{
        type:Schema.Types.ObjectId,
        ref:"Project"
    },
    message: String,
},{
    timestamps:true,
    collection:"messages"
});

module.exports = mongoose.model('Message',MessageSchema);