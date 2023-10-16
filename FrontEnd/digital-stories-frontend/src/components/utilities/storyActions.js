import axios from "axios";
const server = 'http://localhost:6969'
export const deleteStory = async (storyId) =>{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            try {
                console.log("Story ID is ", storyId);
                axios.delete(`${server}/deletestory/${storyId}`,{
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                      }
                }).then((response)=>{
                    console.log(response);
                    resolve(response)
                }).catch((error)=>{
                    console.log("Error::", error);
                    reject(error.response.data)
                })
            } catch (error) {
                reject(error.message)
            }
        }, 2000);
    })
}

export const upvoteStory = async (userId, storyId) =>{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            try {
                axios.post(`${server}/upvote`, {userId:userId, storyId:storyId},{
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                      }
                }).then((response)=>{
                    console.log(response);
                    resolve(response)
                }).catch((error)=>{
                    reject(error.message)
                })
            } catch (error) {
                reject(error.message)
            }
        }, 2000);
    })
}

export const downvoteStory = async (userId, storyId) =>{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            try {
                axios.post(`${server}/downvote`, {userId:userId, storyId:storyId},{
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                      }
                }).then((response)=>{
                    console.log(response);
                    resolve(response)
                }).catch((error)=>{
                    reject(error.message)
                })
            } catch (error) {
                reject(error.message)
            }
        }, 2000);
    })
}

export const commentStory = async (userId,body, storyId) =>{
    return new Promise((resolve,reject)=>{
        setTimeout(() => {
            try {
                axios.post(`${server}/comment`, {userId:userId,body:body, storyId:storyId},{
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                      }
                }).then((response)=>{
                    console.log(response);
                    resolve(response)
                }).catch((error)=>{
                    reject(error.message)
                })
            } catch (error) {
                reject(error.message)
            }
        }, 2000);
    })
}

export const updateStory = async (updatedData)=>{
    return new Promise((resolve, reject)=>{
        setTimeout(() => {
            try {
                axios.post(`${server}/updateStory`, updatedData,{
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem("token")}`
                      }
                }).then((response)=>{
                    console.log(response);
                    resolve(response)
                }).catch((error)=>{
                    reject(error.message)
                })
            } catch (error) {
                reject(error.message)
            }
        }, 2000);
    })
} 