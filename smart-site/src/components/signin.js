import React from 'react';
import { Footer } from './footer';
import Header from './header';

export function SignIn () {
    return(
        <React.Fragment>
        <Header />
        <div class="signin">
            <div>Sign In</div>
        </div>
        <Footer />
        </React.Fragment>
    )
}