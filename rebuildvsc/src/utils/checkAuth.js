// authService.js  
import userAPI  from '../api/userAPI';  
  
export default {  
    checkUserAuth(user, auth) { 
        console.log(user) 
        return userAPI.checkAuth({userId: user, needAuth: auth}).then(res => { 
            console.log(res)
            // if(res.data.code == 1){
                return res.data.code == 1
            // } else{
                // return false
            // }
        }).catch(error => {  
            console.error('Error checking authentication:', error);  
            // 可以选择抛出一个错误，或者返回一个特定的值（例如 false）  
            return false;  
        });  
    }  
};
