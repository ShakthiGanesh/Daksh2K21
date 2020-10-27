const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect('mongodb+srv://analytics:analytics-password@cluster0.ix2gk.mongodb.net/node?retryWrites=true&w=majority',{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

const userModel = new Schema({
    _id : Schema.Types.ObjectId,
    email : String,
    password : String,
    group: String,
    extra : Object
},{collation:'user'});

userModel.pre('save',async next=>{
    this.password = await bcrypt.hash(this.password,process.env.SALT || 'secret_key');
    next();
})

module.exports = mongoose.model('User',userModel);