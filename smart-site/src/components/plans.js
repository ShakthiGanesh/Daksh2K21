import React from 'react'
import "../css/plans.css"
import { ChatbotPlans } from './chatbotplans'

export function Plans () {
    return (
        <div className="plans">
            <div>
                <div className="container">
                    <img src="https://hccindia.com/uploads//markets_sub_category/0_24967800_1467957436_Aluminum-Smelter.jpg" alt="Manufacturing & Process Plants"></img>

                    <p>Manufacturing & Process Plants >>>
                        <p style={{fontSize: '15px'}}>Armed with speedy execution, precision engineering and the ability to handle end-to-end solution for wide range of structural needs, We have assumed expertise, distinction and a reputation for managing and completing complex projects with remarkable simplicity, on time.</p>
                    </p>
                    
                    
                </div>
            </div>
            <div> 
                <div className="container">
                    <img src="https://hccindia.com/uploads//markets_sub_category/0_07080200_1467957497_Real-Estate.jpg" alt='Commercial & Institutional'></img>
                    <p>Commercial & Institutional >>>
                        <p style={{fontSize: '15px'}}>We offer solutions that cater to every type and scale of commercial, institutional and residential building projects. Ours repertoire consists of corporate parks, hotels, office buildings, malls and administrative buildings as well as institutional campuses.</p>
                    </p>
                </div>
            </div>
            <div>
                <div className="container">
                    <img src='https://hccindia.com/uploads//markets_sub_category/0_71721400_1467957469_smart_city.jpg' alt="Smart Cities & Townships"></img>
                    <p>Smart Cities & Townships >>>
                        <p style={{fontSize: '15px'}}>Spaces in the form of undeveloped land perhaps hold the most potential. They are the key to what the future holds. With Lavasa, We took the first step towards building a smart city.</p>
                    </p>
                </div>
            </div>
            <div>
                <div className="container">
                    <img src='https://hccindia.com/uploads//markets_sub_category/0_22197700_1556007582_Water_Supply_&_Sanitation.jpg' alt="Water Supply & Sanitation"></img>
                    <p>Water Supply & Sanitation >>>
                        <p style={{fontSize: '15px'}}>We have presence across the complete value chain ranging from treatment to transmission, having built India’s largest water treatment plant & aqueduct and Asia’s second largest lift irrigation project.</p>
                    </p>
                </div>
            </div>
           
            <div>
                <div className="container" style={{marginBottom: '40px'}}>
                    <img src='https://hccindia.com/uploads//markets_sub_category/0_27523500_1452061982_Highway.jpg' alt="Highways,Roads & Bridges"></img>
                    <p>Highways,Roads & Bridges >>>
                        <p style={{fontSize: '15px'}}>We have capabilities to execute highway projects in all types of geologies, terrains and congested urban environments with built in structures such as tunnels, bridges and sophisticated toll plazas.</p>
                    </p>
                </div>
            </div>
            <ChatbotPlans />
        </div>
    )
}