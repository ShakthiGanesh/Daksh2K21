import React, { useState } from 'react'
import '../css/contact.css'
import  {Button, Form } from 'react-bootstrap'
import InstagramIcon from '@material-ui/icons/Instagram';
import MailIcon from '@material-ui/icons/Mail';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';

export default function Contact() {
   
      
    return(
        <div className="contact">
            <div className="contact-map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5096.203088267299!2d79.01601762582905!3d10.729276462513916!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baabe2803211597%3A0x6371e96c202331c!2sSASTRA%20Deemed%20to%20be%20University!5e0!3m2!1sen!2sin!4v1604038999010!5m2!1sen!2sin"
              frameborder="0" style={{border:0}} allowfullscreen="" aria-hidden="false" tabindex="0"></iframe>
            </div>
            <div className='contact-form'>
                <h3>CONTACT US</h3>
                <Form>
                    <Form.Group controlId="contact.name">
                        <Form.Control type="text" placeholder="Name" />
                    </Form.Group>
                    <Form.Group controlId="contact.email">
                        <Form.Control type="email" placeholder="Email" />
                    </Form.Group>
                    <Form.Group controlId="contact.message">
                        <Form.Control as="textarea" rows={3} placeholder="Message"/>
                    </Form.Group>
                    <Button  type="submit">
                        Submit
                    </Button>
                </Form>
                <div>
                <h4>CONNECT WITH US!</h4>
                </div>  
                <div className='socialmedia'>
                    <p><FacebookIcon /></p>
                    <p><InstagramIcon /></p>
                    <p><TwitterIcon /></p>
                    <p><MailIcon /></p>
                    
                    
                </div>
                
            </div>
        </div>
        
    )
}


          