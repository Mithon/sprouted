$(document).ready(function()    {
    $(function() {

        if (Modernizr.history) {


            $("nav").delegate("a", "click", function() {
                _link = $(this).attr("href");
                history.pushState(null, null, _link);
                loadContent(_link);
                return false;
            });

            function loadContent(href) {
                $("#r-side")
                    .find("#r-content")
                    .fadeOut(200, function() {
                        $("#r-side").hide().load(href + "#r-content", function() {
                            $("#r-side").fadeIn(200, function() {

                            });
                            console.log(href);
                        });
                    });
            }

            $(window).bind('popstate', function() {
                _link = location.pathname.replace(/^.*[\\\/]/, '');
                loadContent(_link);
            });

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
