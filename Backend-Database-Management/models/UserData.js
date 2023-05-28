const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    fullName: {
        type: String,
        // required: true,
    },
    gender: {
        type: String,
        // required: true,
    },
    photo: {
        type: Object,
        // required: true
    },
    DOB: {
        type: String,
        // required:true
    },
    description: {
        type: String,
        // required:true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
const User = mongoose.model('UserData', UserSchema);
module.exports = User;