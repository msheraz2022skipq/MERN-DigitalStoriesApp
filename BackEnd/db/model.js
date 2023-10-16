const mongoose = require("mongoose");
const {userSchema,storySchema} =require("./schemas.js");
const User = new mongoose.model("User", userSchema)
const Stories = new mongoose.model("Stories", storySchema)
module.exports= {User, Stories}