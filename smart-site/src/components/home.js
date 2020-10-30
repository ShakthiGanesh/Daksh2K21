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
        <div class="home">
            <img alt="Home Display " src="../images/smartsite-dp.jpg"></img>
        </div>
        </React.Fragment>
    )
}


