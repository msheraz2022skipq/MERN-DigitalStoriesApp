import axios from "axios";
const server = 'http://localhost:6969'
export const createStory = async (story) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          console.log(story);
          if (story) {
            axios.post(`${server}/createstory`, story, {
              headers:{
                "Content-Type": "multipart/form-data",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
              }
            })
            .then(res=>{
            resolve(res);
            })
            .catch(error=>{
              console.log("Error:: Publishing failed... "+error.response.data)
              reject("Error:: Publishing failed... "+error.message)
            })
          } else {
            reject("Invalid data. Try again...");
          }
        } catch (error) {
          resolve(error.message)
          
        }
      }, 3000);
    });
  };