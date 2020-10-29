import React from 'react'
import Chatbot  from 'react-simple-chatbot'
import '../css/chatbotplans.css'


export function ChatbotPlans () {
    var details = []
    const steps = [
        {
            id: '1',
            message: 'Are you interested in our Services?',
            trigger: 'options'
        },
        {
            id: 'options',
            options: [
                {value: "yes", label: 'yes',trigger: 'details'},
                {value: 'no', label: 'no', trigger:'bye'}
            ]
        },
        {
            id: 'details',
            message: "You selected Yes, Please provide us your details.",
            trigger: "name"
        },
        {
            id: 'name',
            message: 'Plese Enter your name.',
            trigger: 'nameInput'
        },
        {
            id: 'nameInput',
            user: true,
            trigger: 'mobile'
        },
        {
            id: 'mobile',
            message: ({previousValue, steps}) => { 
                details.push(previousValue)
                return 'Hi {previousValue}, Please enter your mobile number.'},
            trigger: 'mobileInput'
        },
        {
            id: 'mobileInput',
            user: true,
            validator: (value) => {
                if ((value < 10**9) || (value > 10**10)) {
                  return 'Value should be 10 digits';
                }
                else if(isNaN(value)) {
                    return 'Value shoule be a number';
                }
                return true;
              },
            trigger: 'email'
        },
        {
            id: 'email',
            message: ({previousValue, steps}) => { 
                details.push(previousValue)
                return 'Please enter your Email Id'},
            trigger: 'inputEmail'    
        },
        {
            id: 'inputEmail',
            user: true,
            trigger: 'gotDetails'
        },
        {
            id: 'gotDetails',
            message: ({previousValue, steps}) => { 
                details.push(previousValue)
                console.log(details)
                return 'Your details have been recorded. Our team will contact you soon. Thank you :)'},
            end: true
        },
        {
            id: 'bye',
            message: "You selected No, Please check all our plans. We are here to build! Thank you"
        }
    ]
    return(
        <Chatbot steps={steps} floating={true} className='chatbot-plans' floatingStyle={{width: '75px', height: '75px'}}/>  
    )
}