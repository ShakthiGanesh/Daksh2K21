import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import '../css/progress.css'
export function Progress () {
    const percentage = 90;
    return(
        <div>
        <CircularProgressbar styles={{root: {
    width: '20%',
  }}} className="progressClass" value={percentage} text={`${percentage}%`} />;
        </div>
         
    )
    
}