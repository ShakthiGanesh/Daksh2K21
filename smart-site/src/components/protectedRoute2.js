import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import auth from '../public/auth';

// pass in component , path and locationTo and locationFrom are optional parameters
// to keep track of user's desired location 

// example usage "<ProtectedRoute path = "/admin" group="admin" component={adminPage}/>"

export default function ProtectedRoute2(props){
    return(<Route 
        {...props}
        render = {()=>{if(auth.isAuthenticated(props.group)){
                return props.component;
            }
            else{
                return (<Redirect
                    to={{
                        pathname:"/signin",
                        state:{
                            from:props.location
                        }
                    }}/>)
            }
        }}
    />)
}


