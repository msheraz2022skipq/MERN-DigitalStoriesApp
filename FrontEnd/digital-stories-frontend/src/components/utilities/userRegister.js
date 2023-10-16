import axios from "axios";
const server = 'http://localhost:6969'
export const userRegister = async ({ name, email, password, image }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          if (name && email && password && image) {
            axios.post(`${server}/register`, {name,email,password, image})
            .then((res, err)=>{
              if(err){
                reject("Error:: "+err)
              }
            resolve(res);
            })
            .catch(error=>{
              reject("Error "+error.response.data)
            })
          } else {
            reject("Invalid data...");
          }
        } catch (error) {
          resolve(error.message)
          
        }
      }, 3000);
    });
  };