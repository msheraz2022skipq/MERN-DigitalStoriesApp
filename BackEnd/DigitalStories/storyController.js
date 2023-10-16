const storyService = require('./storyServices')
const loginUser = (email, password, done) => {
    storyService.loginUser(email, password, done)
  };

const registerUser = (newUser, done)=>{
  storyService.registerUser(newUser, done)
}

const createStory = (story, done)=>{
  storyService.createStory(story, done)
}

const getAllStories = (done)=>{
  storyService.getAllStories(done)
}

const getAllUsers=(done)=>{
  storyService.getAllUsers(done)
}
const deleteStory=(storyId,done)=>{
  storyService.deleteStory(storyId,done)
}
 
const upvoteStory=(userId,storyId,done)=>{
  storyService.upvoteStory(userId,storyId,done)
}

const downvoteStory=(userId,storyId,done)=>{
  storyService.downvoteStory(userId,storyId,done)
}
const commentStory=(userId,body,storyId,done)=>{
  storyService.commentStory(userId,body,storyId,done)
}

const updateStory = (story, done)=>{
  storyService.updateStory(story,done)
}

module.exports={loginUser, registerUser, createStory, updateStory, getAllStories, getAllUsers, deleteStory, upvoteStory, downvoteStory, commentStory}