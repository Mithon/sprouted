$(document).ready(function()    {
    $(function() {

        if (Modernizr.history) {

            _href = $(this).attr("href");

            history.pushState(null, null, _href);

            function loadContent(_href) {

            }

        } else {

        }
    });


    var navOpen = false;

    if (navOpen == false) {
        $( "#nav-toggle" ).toggleClass( "active" );
        $( "#nav-scaler" ).toggleClass( "grow" );
        $( "#order-button" ).toggleClass( "white" );
        $( "#order-text" ).toggleClass( "green-text" );
        $( "nav" ).toggleClass( "hidden-nav" );
    }

    $( "#toggle-box" ).on("click", function() {
      $( "#nav-toggle" ).toggleClass( "active" );
      $( "#nav-scaler" ).toggleClass( "grow" );
      $( "#order-button" ).toggleClass( "white" );
      $( "#order-text" ).toggleClass( "green-text" );
      $( "nav" ).toggleClass( "hidden-nav" );
    });
});

console.log("hutn");
