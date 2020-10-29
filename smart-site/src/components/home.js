import "../css/home.scss";
import React from 'react';
import $ from 'jquery'

$(function() {
    $('.intro').addClass('go');
  
    $('.reload').click(function() {
      $('.intro').removeClass('go').delay(200).queue(function(next) {
        $('.intro').addClass('go');
        next();
      });
  
    });
  })



export default function Home() {
  
    return(
        <React.Fragment>
<<<<<<< HEAD

=======
>>>>>>> 4f832fad24923dcb527ff968db0ff94ebbbb25e5
        <div class="home">
            <img alt="Home Display " src="https://www.build-review.com/wp-content/uploads/2019/12/A-guide-to-construction-safety-for-homebuilders.jpg"></img>
        </div>
        </React.Fragment>
    )
}


