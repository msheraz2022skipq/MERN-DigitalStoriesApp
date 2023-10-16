const mongoose = require("mongoose");
const connectDB = (url) => {
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => {
        console.log("Connected with Database...")
    })
}

module.exports= connectDB