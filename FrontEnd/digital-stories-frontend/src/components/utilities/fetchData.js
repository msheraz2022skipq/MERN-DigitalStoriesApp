import axios from "axios";
const server = 'http://localhost:6969'
export const fetchAllUsers = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try{
            axios.get(`${server}/getusers`,{
              headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
              }
            })
            .then((res)=>{
              resolve(res.data)
            }).catch(error=>{
              reject("Cann't get users. "+error.message)
            })
        }catch{
          reject("Error!! Try again.")

        }
      }, 3000);
    });
  };

  export const fetchAllStories = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try{
            axios.get(`${server}/getstories`,{
              headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
              }
            })
            .then((res,err)=>{
              resolve(res.data)
            }).catch(error=>{
              reject("Cann't get stories. "+error.message)
            })
        }catch{
          reject("Error!! Try again.")

        }
      }, 3000);
    });
  };
