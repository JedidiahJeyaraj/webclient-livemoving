"use strict";

(function(){
    if(!localStorage.getItem('userId')){
        //window.location = '/shikhar/lovemoving-html/login.html';
        window.location = '/login.html';
    }
    else {
        $('#firstname').text('Welcome ' + localStorage.getItem('firstname'));
    }
})();


$(document).ready(function(){
    
    $('#username').text(localStorage.getItem('email'));
    $('#logout').click(function(e){
        localStorage.removeItem('userId');
        localStorage.removeItem('firstname');
        localStorage.removeItem('lastname');
        localStorage.removeItem('email');
        localStorage.removeItem('phone');
        localStorage.removeItem('is_customer_login');
        //window.location = '/shikhar/lovemoving-html/login.html';
        window.location = '/login.html';
      });
});



function isServiceProvider(){
    if(localStorage.getItem('is_customer_login') != 2){
        alert("Don't have access to partner dashboard!");
        //window.location = '/shikhar/lovemoving-html/dash-board.html';
        window.location = '/dash-board.html';  
    }
}