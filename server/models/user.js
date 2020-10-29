const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userModel = new Schema({
    _id : Schema.Types.ObjectId,
    name: String,
    email : String,
    password : String,
    group: String,
    extra : Object
},{collation:'users'});

userModel.pre('save',async next=>{
    this.password = await bcrypt.hash(this.password,process.env.SALT || 'secret_key');
    next();
})

module.exports = mongoose.model('User',userModel);