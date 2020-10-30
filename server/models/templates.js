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

const gallerySchema = Schema({
    _id : Schema.Types.ObjectId,
    title: String,
    description : String,
    image:String
},{
    collection:"gallery"
});

const planSchema = Schema({
    _id: Schema.Types.ObjectId,
    name : String,
    image : String,
    works:[{
        type:Schema.Types.ObjectId,
        ref:"WorkTemplate"
    }]
},{
    collection:'plans'
});

module.exports = {
    WorkTemplate: mongoose.model('WorkTemplate',workTemplate),
    GalleryTemplate: mongoose.model("GalleryTemplate",gallerySchema),
    PlanTemplate:mongoose.model('Plan',planSchema)
};