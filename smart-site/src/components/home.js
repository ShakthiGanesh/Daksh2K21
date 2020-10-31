import "../css/home.scss";
import React from 'react';


export default function Home() {
  
    return(
        <React.Fragment>
        <div class="home">
            <img alt="Home Display " src="../images/smartsite-dp.jpg"></img>
            <svg viewBox="0 0 960 300">
              <symbol id="s-text">
                <text text-anchor="middle" x="50%" y="80%">WE BUILD!</text>
              </symbol>

              <g class = "g-ants">
                <use xlinkHref="#s-text" class="text-copy"></use>
                <use xlinkHref="#s-text" class="text-copy"></use>
                <use xlinkHref="#s-text" class="text-copy"></use>
                <use xlinkHref="#s-text" class="text-copy"></use>
                <use xlinkHref="#s-text" class="text-copy"></use>
              </g>
            </svg>
        </div>
        
        </React.Fragment>
    )
}


