$(document).ready(function(){
    $('#button').click(function(){
        $('nav').show('slide',300);
    });
    $('#navLogo').click(function(){
        $('nav').hide('slide',300);
    });
});
