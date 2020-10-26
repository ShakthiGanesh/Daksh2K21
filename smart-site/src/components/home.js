import "../css/home.css";
import React from 'react';
import { Footer } from './footer';
import Header from './header';

export default function Home() {
    return(
        <React.Fragment>
        <div class="home">
            <img alt="Home Display Image" src="https://www.build-review.com/wp-content/uploads/2019/12/A-guide-to-construction-safety-for-homebuilders.jpg"></img>
        </div>
        </React.Fragment>
    )
}