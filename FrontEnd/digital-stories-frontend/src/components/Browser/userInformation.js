export const saveUserToLocalStorage = (user, expDuration) => {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    localStorage.setItem('loggedInUserExpiry', Date.now() + expDuration);
}

// Retrieve the logged in user from local storage
export const getUserFromLocalStorage = () => {
    const user = localStorage.getItem('loggedInUser');
    return user ? JSON.parse(user) : null;
}

export const checkLoggedInUser = () => {
    const expiry = localStorage.getItem('loggedInUserExpiry');
    if(expiry && expiry < Date.now()){
       return null
    }
    else{
        return getUserFromLocalStorage()
    }
}

export const logoutUserFromBrowser=()=>{
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('loggedInUserExpiry');
}
