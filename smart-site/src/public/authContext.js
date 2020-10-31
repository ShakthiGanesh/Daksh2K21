import React, {Component,createContext} from 'react';

export const AuthContext = createContext();

class AuthContextProvider extends Component {
    state = {
        isAuthenticated:true,
        user_id : ''
    }
    render(){
        return(
            <AuthContext.Provider value={{...this.state}}>

            </AuthContext.Provider>
        )
    }
}

export default AuthContextProvider;