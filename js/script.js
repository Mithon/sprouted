$(document).ready(function()    {



    var navOpen = false;

    if (navOpen == false) {
        $( "#nav-toggle" ).toggleClass( "active" );
        $( "#nav-scaler" ).toggleClass( "grow" );
        $( "#order-button" ).toggleClass( "white" );
        $( "#order-text" ).toggleClass( "green-text" );
        $( "nav" ).toggleClass( "hidden-nav" );
    }

    $( "#toggle-box" ).on("click", function() {
        window.history.pushState("hello", "Title", "/new-url");
      $( "#nav-toggle" ).toggleClass( "active" );
      $( "#nav-scaler" ).toggleClass( "grow" );
      $( "#order-button" ).toggleClass( "white" );
      $( "#order-text" ).toggleClass( "green-text" );
      $( "nav" ).toggleClass( "hidden-nav" );
    });
});
