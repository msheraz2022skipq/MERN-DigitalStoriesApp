import axios from "axios";
const server = 'http://localhost:6969'
export const userLogin = async ({ email, password }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try{
          if (email && password) {
            axios.post(`${server}/login`,{email,password})
            .then((res,err)=>{
              if(err){
                reject("Error:: "+err)
              }
              resolve(res.data)
            }).catch(error=>{
              reject(error.response.data)
            })
          }
          else{
            reject("Invalid data")
          }
        }catch{
          reject("Error!! Try again.")

        }
      }, 3000);
    });
  };