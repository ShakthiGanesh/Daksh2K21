import React from 'react'
import { ProgressCircular, ProgressLinear } from './progress'
import '../css/customer.css'
import { CustomerHeader } from './customer-header'

export function Customer () {
    return(
        <div className="admin">
            <CustomerHeader />
            <h2>Happy to see you Again :-)</h2>
            <div className="admin-body">
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
        </div>
        
    )
}