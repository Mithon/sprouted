(function()    {
    "use strict";

    var navOpen = false;
    var cPage = 'index';
    var pPage = '';
    var nav = document.querySelector('.hidden-nav');
    var uniqueStart = false;
    var path = window.location.pathname;
    var pageName = path.split("/").pop();
    pageName = pageName.slice(0, -5);

    if (pageName != "" && pageName != "index")  {
        uniqueStart = true;
        makeTransition(pageName);
    }

    if (pageName != "") {
        cPage = pageName;
    }


    window.addEventListener('popstate', function(e) {
        if (e.event == null) {
            //something
        } else {
            console.log(e);
            window.history.pushState(e.event, null, e.event +'.html');
            cPage = "e.event";
        }
    });

    function toggleNav() {
        navOpen = !navOpen;
        $( "#nav-toggle" ).toggleClass( "active" );
        $( "#nav-scaler" ).toggleClass( "grow" );
        $( "#order-button" ).toggleClass( "white" );
        $( "#order-text" ).toggleClass( "green-text" );
        $( "nav" ).toggleClass( "hidden-nav" );
    }

    if (navOpen == false && cPage == "index") {
        toggleNav();
    }

    $( "#toggle-box" ).on("click", function() {
      toggleNav();
    });


    $( ".logo" ).on('click', function() {
        if (cPage != 'index') {
            window.history.pushState(cPage, null, 'index.html');
            makeTransition('index');
            cPage = "index";
        }
    });


    function transitionIn(page) {
        //check new page to see what needs to appear
        var newContent = "." + page + "-content";
        uniqueStart = false;
        $(newContent).hide().removeClass('hidden').fadeIn();

    }

    function makeTransition(page) {
        if (uniqueStart == false && (page != 'index' && navOpen == true))
            toggleNav();

        var content = "." + cPage + "-content";
        var cButton = "." + cPage + "-button";
        var nButton = "." + page + "-button";

        $(content).fadeOut(350, function() {
            $(content).addClass('hidden');
            $(cButton).removeClass('active-page-button');
            $(nButton).addClass('active-page-button');
            transitionIn(page);
        });

        //check current page to see what needs to disappear
    }


    nav.addEventListener('click', function(e){
        if(e.target != e.currentTarget && e.target.getAttribute('data-name') != null && e.target.getAttribute('data-name') != cPage){
            e.preventDefault();
            var data = e.target.getAttribute('data-name'),
            url = data + ".html";
            window.history.pushState(data, null, url);
            makeTransition(data);
            cPage = data
        }
        e.stopPropagation();
    }, false);



})();


/*
switch (cPage) {
    case "index":

        break;
    case "contact":

        break;
    case "menu":

        break;
    case "about":

        break;
    default:
        console.log("default Current triggering");
}
*/
