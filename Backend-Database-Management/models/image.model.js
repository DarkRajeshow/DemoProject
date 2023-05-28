
const mongoose = require("mongoose");
const { Schema } = mongoose;

const ImageScheema = new Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        data:Buffer,
        contentType
    }
});
const image = mongoose.model('Images', ImageScheema);
module.exports = image;