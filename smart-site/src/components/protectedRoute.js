import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {baseURL} from '../public/baseURL';

// pass in component , path and locationTo and locationFrom are optional parameters
// to keep track of user's desired location 

// example usage "<ProtectedRoute path = "/admin" group="admin" component={adminPage}/>"

export default function ProtectedRoute(props){
    fetch(baseURL+'/checkAuth',{
        method: 'GET',
        credentials: 'omit'
    })
    .then(response=>{
        
        // if the user is not authenticated they'll be redirected to signin page
        
        if(response.status === 401){
            return <Redirect to="/signin" locationTo={props.path} locationFrom={props.location}/>
        }
        else if(response.ok) return response;

        // in case of un recognised response the response will be thrown as error

        else throw new Error(response.status);
    })
    .then(response=>response.json())
    .then(data=>{

        // if user is authenticated and in the allowed group , will be routed to the requested location

        if(data.isAuthenticated && data.group === props.group){
            return(<Route {...props} path={props.path} component={props.component}/>)
        }
        else{
            return <Redirect to="/signin" locationTo={props.path} locationFrom={props.location}/>
        }

        // unauthenticated users are not handled here as the status code will be 401 in that case

    })
    .catch(err=>console.log(err.message));
}