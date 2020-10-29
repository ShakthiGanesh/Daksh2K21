const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workTemplate = Schema({
    _id: Schema.Types.ObjectId,
    name:String,
    department : {
        type:Schema.Types.ObjectId,
        ref:"Department"
    },
    duration : Number,
    cost : Number
},{
    collection:"work-template"
});

const galleryTemplate = Schema({
    _id : Schema.Types.ObjectId,
    title: String,
    description : String
},{
    collection:"gallery-template"
});

module.exports = {
    WorkTemplate: mongoose.model('WorkTemplate',workTemplate),
    GalleryTemplate: mongoose.model("GalleryTemplate",galleryTemplate)
};