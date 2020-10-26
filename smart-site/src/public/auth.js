import {baseURL} from '../public/baseURL';

class Auth{
    constructor(){
        this.isAuthenticated = false;
    }

    isAuthenticated(group){
        fetch(baseURL+'/checkAuth',{
            method: 'GET',
            credentials: 'omit'
        })
        .then((response) =>{
            
            if(response.ok) return response;
    
            // in case of un recognised response the response will be thrown as error
    
            else throw new Error(response.status);
        })
        .then(data=>{
            if(data.isAuthenticated && data.group === group) return this.isAuthenticated = true;
        })
        .catch((err) => console.error(err));

        return this.isAuthenticated;
    }

}

export default new Auth();