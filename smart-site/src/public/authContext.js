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
                {this.props.children}
            </AuthContext.Provider>
        )
    }
}

export default AuthContextProvider;