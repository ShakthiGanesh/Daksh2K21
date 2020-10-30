
import React , {useState} from 'react';
import '../css/signin.css';
import { Button, Form } from 'react-bootstrap';
import {BaseURL} from '../public/baseURL';
import {Redirect, Route} from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';


export function SignIn () {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [auth,setAuth] = useState(false);
    function handleSubmit(event){
        fetch(BaseURL + '/login',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body : JSON.stringify({
                email : email,
                password : password,
                group:"customer"
            }),
            credentials:'same-origin'
        })
        .then(response => {
            if (response.ok){
                return response.json();
            }
            else throw new Error(response.json());
        })
        .then(data=>{
            if(data.isAuthenticated){
                setAuth(true);
            }
            else
                return(<Alert severity="warning">{data.message}</Alert>)
        })
        .catch(err=>(
            <Alert severity="error">{err.error}</Alert>
        ));
        event.preventDefault();
    }
    if(!auth){
        return( 
        <React.Fragment>
        <div className="signin">

            <div id='signin-header'>Sign In</div>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" required onChange={e=>setEmail(e.target.value)} autofocus/>
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" required onChange={e=>setPassword(e.target.value)}/>
                </Form.Group>
                <Button variant="custom" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
        </React.Fragment>
    )}
    else if(auth){
        return(
            <Route
                render = {()=>(
                    <Redirect to={{
                        pathname:'/'
                    }}/>
                )}
            />
        )
    }

}