import React, { useState } from 'react'
import { ProgressCircular, ProgressLinear } from './progress'
import '../css/customer.css'
import { CustomerHeader } from './customer-header'
import ChatBot from 'react-simple-chatbot'

var temp = null;
const steps = [
    {
        id: '1',
        message: 'Welcome',
        trigger: '2',
    },
    {
        id: '2',
        options: [
            {value: 'yes',label: "Query?", trigger: '3'},
            {value: 'no', label: "No Query", trigger: 'bye'}
        ]
    },
    { 
        id: '3',
        message: 'What do you want to know?',
        trigger: 'query',

    },
    {
        id: 'query',
        options: [   
            { value: 'contactus', label: 'Contacting us', trigger: '4' },
            { value: 'plans', label: 'Plans', trigger: '4' },
            { value: 'cost', label: 'Cost', trigger: '4' },
         ],
    },
    {
        id: '4',
        message: ({previousValue, state}) => {
            temp = previousValue
            return 'You Selected {previousValue}'},
        trigger: ({value, state}) => {
            return temp
        }
        
    },
    {
        id: 'contactus',
        message: 'You can contact us through the chat box at the top or you can call us on 1234567890 ',
        trigger: 'queryCompleted'
    },
    {
        id: 'plans',
        message: 'The plan you selected is progressing well, Do you want to give any alterations or choice?',
        trigger: 'options'
    },
    {
        id: 'options',
        options: [
            {value: 'yes', label: 'yes', trigger: 'planSuggestions'},
            {value: 'no', label: 'no', trigger: 'queryCompleted'}
        ]
    },
    {
        id: 'planSuggestions',
        message: "Please give your alterations or choice",
        trigger: "userInput"
    },
    {
        id: "userInput",
        user: true,
        trigger: 'inputCaptured'
    },
    {
        id: 'inputCaptured',
        message: "Your Statement is recorded, our team will contact you soon!",
        trigger: "queryCompleted"
    },
    {
        id: 'cost',
        message: 'The Total Cost Spent is shown in your Home page, To know cost spent per day, Please visit the corresponding day tile',
        trigger: 'queryCompleted'
    },
    {
        id: 'queryCompleted',
        message: "Any other Queries?",
        trigger: '2'
    },
    {
        id: 'bye',
        message: "Thank you, Anytime!",
        trigger: '2'
    }
]



export function Customer () {
    return(
        <div className="customer">
            <CustomerHeader />
            <h2>Happy to see you Again :-)</h2>
            <div className="customer-body">
                <div style={{flex: '0.5'}}>
                <ProgressCircular  />
                </div>
                
                <div style={{flex: '0.5'}}>
                    <ProgressLinear />
                    <ProgressLinear />
                    <ProgressLinear />
                    <ProgressLinear />
                </div>
            </div>
            <div className="container">
             <ChatBot  floating={true} className="bot-style" headerTitle='Help'  opened={false}
             steps={steps} speechSynthesis={{enable: true }}/> 
             </div>
            
            
        </div>
        
    )
}

