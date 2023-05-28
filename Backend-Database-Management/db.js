const mongoose = require("mongoose");
const mongoUrl = "mongodb+srv://DarkRajeshow:Rajesh2003@cluster0.zjfpdmx.mongodb.net/SpecialForm";

async function connectToMongo() {
    try {
        mongoose.connect(mongoUrl, { useNewUrlParser: true });
        console.log("Connected to mongoDB");
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = connectToMongo;