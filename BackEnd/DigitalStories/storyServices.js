const { User, Stories } = require("../db/model");
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');
const fs = require('fs');


const { S3Client, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const s3 = new S3Client();
require('dotenv').config({path: '../.env'})



//User related functionalities
const loginUser = async (email, password, done) => {
    User.findOne({ email: email }, (err, user) => {
        if (user) {
            bcrypt.compare(password, user.password, (err, res) => {
                if (err) {
                    done(err);
                }
                else if (res) {
                    done(null, user);
                }
                else {
                    done("Incorrect email or password");
                }
            }
            )
        }
        else{
            return done("User not registered")
        }
        
    })
}

const registerUser = async (newUser, done) => {
    User.findOne({ email: newUser.email }, (err, user) => {
        if (user) {
            return done("User already exists...")
        }
        else {
            const user = new User(newUser)
            user.save(err => {
                if (err) {
                    console.log(err);
                    done("Registration failed.")
                }
                else {
                    console.log("Registered...");
                    done(null)
                }
            })
        }
    })
}


const getAllUsers = async (done) => {
    try {
        const allUsers = await User.find()
        console.log("Users fetched successfully");
        return done(null, allUsers)
    } catch (error) {
        return done(error)
    }
}


//Stories related functionalities
const createStory = async (story, done) => {
    try {
        const newStory = new Stories(story)
        await newStory.save();
        console.log("Story uploaded successfully...");
        const user = await User.findById(mongoose.Types.ObjectId(story.author));
        console.log("User Found to save...");
        user.stories.push(mongoose.Types.ObjectId(story._id));
        await user.save();
        console.log("Story successfully saved to user...");
        return done(null,newStory);
    } catch (error) {
        console.log(error);
        return done(error);
    }
}

const getAllStories = async (done) => {
    try {
        const allStories = await Stories.find().sort({ createdAt: -1 })
        console.log("Stories fetched successfully");
        return done(null, allStories)
    } catch (error) {
        return done(error)
    }
}

const deleteStory = async (storyId, done) => {
    try {
        console.log(storyId);
        const deletedStory = await Stories.findByIdAndDelete(mongoose.Types.ObjectId(storyId));
        if(deleteStory){
            const url = new URL(deletedStory.file);
            const key = url.pathname.substring(1);  
            const deleteParams = {
                Bucket: process.env.BUCKET_NAME,
                Key: key,
                Region: process.env.AWS_REGION
              };
              s3.send(new DeleteObjectCommand(deleteParams), (err, data) => {
                if (err) {
                  console.error(`Unable to delete file at ${deletedStory.file}: ${err}`);
                } else if(data) {
                  console.log(`Successfully deleted file from s3 at ${deletedStory.file}`);
                }
              });
        }
        
        return done(null, deletedStory);
    } catch (error) {
        console.log("Failed to delete story..."+error);
        return done(error)
    }
}

const updateStory = async (story, done) => {
    try {
        console.log(story._id);
        await Stories.findByIdAndUpdate(mongoose.Types.ObjectId(story._id), story);
        const updatedStory =await Stories.findById(mongoose.Types.ObjectId(story._id))
        return done(null, updatedStory);
    } catch (error) {
        console.log("Failed to update story..."+error);
        return done(error)
    }
}


//Stories reactions
const upvoteStory = async (userId, storyId, done) => {
    try {
        console.log("Upvote story called...");
        //$en is used to check that if userId is already available in upvotes or not. If available, null will be returned, If not available, story will be returned
        const story = await Stories.findOne({ _id: storyId, 'upvotes.author': { $ne: userId } });
        if (!story) {
            console.log('You have already upvoted this story.');
            return done('You have already reacted this story.');
        }

        await Stories.findOneAndUpdate({ _id: storyId, 'downvotes.author': userId }, { $pull: { downvotes: { author: userId } } });

        // Add the user to the upvotes array
        const updatedStory = await Stories.findOneAndUpdate({ _id: storyId }, { $push: { upvotes: { author: userId } } }, { new: true });
        console.log("Upvote successful...");
        return done(null, updatedStory);
    } catch (error) {
        console.log("Error:: " + error);
        return done(error);
    }
};

const downvoteStory = async (userId, storyId, done) => {
    try {
        console.log("Downvote story called...");
        //$en is used to check that if userId is already available in upvotes or not. If available, null will be returned, If not available, story will be returned
        const story = await Stories.findOne({ _id: storyId, 'downvotes.author': { $ne: userId } });

        if (!story) {
            console.log('You have already downvoted this story.');
            return done('You have already downvoted this story.');
        }

        await Stories.findOneAndUpdate({ _id: storyId, 'upvotes.author': userId }, { $pull: { upvotes: { author: userId } } });

        // Add the user to the upvotes array
        const updatedStory = await Stories.findOneAndUpdate({ _id: storyId }, { $push: { downvotes: { author: userId } } }, { new: true });
        console.log("Downvote successfull...");
        return done(null, updatedStory);
    } catch (error) {
        console.log("Error:: " + error);
        return done(error);
    }
};

const commentStory = async (userId, body, storyId, done) => {
    try {
        console.log("Commenting...");
        const story = await Stories.findById(mongoose.Types.ObjectId(storyId)).exec();
        const newComment = {
            author: userId,
            body: body
        }
        story.comments.push(newComment)
        await story.save();
        console.log("Commented...");
        return done(null,story)
    } catch (error) {
        console.log("Error:: " + error);
        return done(error)
    }
}





module.exports = { loginUser, registerUser, createStory,updateStory, getAllStories, getAllUsers, deleteStory, upvoteStory, downvoteStory, commentStory }