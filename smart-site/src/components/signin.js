import React from 'react'
import '../css/signin.css'
import { Button, Form } from 'react-bootstrap
export function SignIn () {
    return(
        <React.Fragment>
        <Header />
        <div class="signin">
            <div id='signin-header'>Sign In</div>
            <Form>
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" required autoFocus/>
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" required/>
                </Form.Group>
                <Button variant="custom" type="submit">
                    Submit
                </Button>
            </Form>
        </div>
        <Footer />
        </React.Fragment>
    )
}