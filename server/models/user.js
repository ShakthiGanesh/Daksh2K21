const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userModel = new Schema({
    _id : Schema.Types.ObjectId,
    name: String,
    email : {
        type : String,
        unique : true
    },
    password : String,
    group: String,
    projects:[{
        type:Schema.Types.ObjectId,
        ref:"Project"
    }],
    staff_id : String,
    department: {
        type:Schema.Types.ObjectId,
        ref:"Department"
    },
    mobile:Number
},{collation:'users'});

// userModel.pre('save',async next=>{
//     // this.password = await bcrypt.hash(this.password,'$2b$10$SN5MRK.PivkVFa2Yi7gYIu');
//     console.log(this)
//     next();
// });

module.exports = mongoose.model('User',userModel);