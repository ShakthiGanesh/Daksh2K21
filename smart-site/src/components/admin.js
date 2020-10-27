import React from 'react'
import { ProgressCircular, ProgressLinear } from './progress'
import '../css/admin.css'
import { AdminHeader } from './admin-header'

export function Admin () {
    return(
        <div className="admin">
            <AdminHeader />
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