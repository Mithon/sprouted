(function()    {
    "use strict";

    /*

    Hi, I've never had my JS inspected by a prof before so hopefully it's ok.
    It's all orignal stuff by yours truly.
    I tried comment it well to help you (and me) out.

    Thanks,
    Hunter

    */

    //assinging variables
    var navOpen = false, //if nav is open
        cPage = 'index', //current page
        pPage = '', //previous page
        activeMenu = 'dinner', //what section of the menu is active
        itemInfo = true, //is the product info section showing
        orderMode = false, //is the site in order mode
        pItemID = 7, //what item is current selected
        uniqueStart = false, //did you load the page not on index
        //Info pertaining to menu items
        //I could put the names, etc. in here too but not for right now
        itemSpecs = [
            {id: 0, organic: true, local: false, protein: false},
            {id: 1, organic: true, local: false, protein: false},
            {id: 2, organic: true, local: true, protein: true},
            {id: 3, organic: true, local: false, protein: true},
            {id: 4, organic: true, local: true, protein: false},
            {id: 5, organic: true, local: true, protein: true},
            {id: 6, organic: true, local: false, protein: true},
            {id: 7, organic: true, local: true, protein: true},
            {id: 8, organic: true, local: false, protein: false},
            {id: 9, organic: true, local: true, protein: false},
            {id: 10, organic: true, local: true, protein: true},
            {id: 11, organic: true, local: false, protein: false},
            {id: 12, organic: false, local: true, protein: false},
            {id: 13, organic: true, local: true, protein: true}
        ],
        nav = document.querySelector('.hidden-nav'),
        menuNav = document.querySelector('.menu-nav'),
        menuList = document.querySelector('.menu-section'),
        path = window.location.pathname, //grab url
        pageName = path.split("/").pop(), //take end of the url 'index.html'
        pageName = pageName.slice(0, -5); //grab the indentifier 'index'

    //if page is not index.html assign true to uniqueStart
    if (pageName != "" && pageName != "index")  {
        uniqueStart = true;
        makeTransition(pageName);
    }

    //assign the current page to the pageName variable
    if (pageName != "") {
        cPage = pageName;
    }

    //if you are on index, make sure nav is open
    if (navOpen == false && cPage == "index") {
        toggleNav();
    }

    //toggle nav open/close
    function toggleNav() {
        //assign state to variable
        navOpen = !navOpen;
        //toggle the classes
        $( "#nav-toggle" ).toggleClass( "active" );
        $( "#nav-scaler" ).toggleClass( "grow" );
        $( "#order-button" ).toggleClass( "white" );
        $( "#order-text" ).toggleClass( "green-text" );
        $( "nav" ).toggleClass( "hidden-nav" );
        //if nav is open, make cart green, if not make it green
        navOpen ? ( $('.st8').css("fill", "#3CE6AD") )
            : ( $('.st8').css("fill", "#fff") );
    }

    //transition in the new elements
    function transitionIn(page) {
        //creating the class to add
        var newContent = "." + page + "-content";
        uniqueStart = false;
        //adding container classes for mobile sizing
        $('.tall').addClass(page + "-tall");
        //fade in the content
        $(newContent).hide().removeClass('hidden').fadeIn();

    }

    //the main page transition function
    function makeTransition(page) {
        //if toggle nav if certain cases
        if (uniqueStart == false && (page != 'index' && navOpen == true))
            toggleNav();

        //creating classes
        var content = "." + cPage + "-content";
        var cButton = "." + cPage + "-button";
        var nButton = "." + page + "-button";

        //check current page to see what needs to disappear
        $(content).fadeOut(350, function() {
            //hiding the content and un-activating buttons
            $(content).addClass('hidden');
            $(cButton).removeClass('active-page-button');
            $(nButton).addClass('active-page-button');
            //calling the transition in function
            transitionIn(page);
        });
    }

    //check if the product is organic, etc.
    //displays the appropriate icons
    function assignCategory (id) {
        $(".item-category").fadeOut(10);
        if (itemSpecs[id].organic)
            $(".organic").fadeIn();
        if (itemSpecs[id].local)
            $(".local").fadeIn();
        if (itemSpecs[id].protein)
            $(".protein").fadeIn();
    }

    //toggle nav on button click
    $( "#toggle-box" ).on("click", function() {
      toggleNav();
    });

    //logo click brings back to index page
    $( ".logo" ).on('click', function() {
        //only activate if not currently on index
        if (cPage != 'index') {
            //push the url to index.html
            window.history.pushState(cPage, null, 'index.html');
            //open nav
            if (navOpen == false)
                toggleNav();
            makeTransition('index');
            //remove tall calss
            $('.tall').removeClass(cPage + "-tall");
            //assign current page
            cPage = "index";
        }
    });

    //order button click actions
    $( ".order-button" ).on('click', function() {
        if (orderMode == false) {
            //remove order text and replace with cart icon
            $( "#order-text" ).addClass("order-hide").fadeOut(250, function() {
                $( "#cart-icon" ).hide().removeClass("hidden").fadeIn(10).removeClass("order-hide");
                orderMode = true;
            });
        } else {
            //reverse action
            $( "#cart-icon" ).addClass("order-hide").fadeOut(250, function() {
                $( "#order-text" ).hide().removeClass("hidden").fadeIn(10).removeClass("order-hide");
                orderMode = false;
            });
        }
    });

    //menu item selection function
    $(".menu-item").on('click', function()  {
        //assigning variables
        var data = this.getAttribute('data-name'),
            itemID = +this.getAttribute('data-itemID');
            console.log(itemID);
        //if you click on the already selected item, it deselects it
        if (itemID == pItemID) {
            $(".selected-item").removeClass("selected-item");
            $(".item-info").addClass("hide-info");
            itemInfo = false;
            pItemID = null;
        } else {
            //change the menu item and highlight
            //removes selected highlight
            $(".selected-item").removeClass("selected-item");
            //add highlight to current item
            $(this).addClass("selected-item");
            //check if info is open already
            if (itemInfo == false)  {
                //change info name text
                document.getElementById("item-name").innerHTML = data;
                assignCategory(itemID);
                //bring in the info
                $(".item-info").removeClass("hide-info");
                itemInfo = true;
            } else {
                //hide the info
                $(".item-info").addClass("hide-info").fadeOut()
                .fadeIn(10,function(){
                    //change info name text
                    document.getElementById("item-name").innerHTML = data;
                    assignCategory(itemID);
                    //bring it back in
                    $(".item-info").removeClass("hide-info");
                });
            }
            console.log(data + " ItemID = " + itemID);
            pItemID = itemID;
        }
    });

    //event listener for nav buttons
    nav.addEventListener('click', function(e){
        //check if button is to current page
        if(e.target != e.currentTarget && e.target.getAttribute('data-name') != null && e.target.getAttribute('data-name') != cPage){
            e.preventDefault();
            //assign variables for page
            var data = e.target.getAttribute('data-name'),
                url = data + ".html";
            //changing url to current page
            window.history.pushState(data, null, url);
            makeTransition(data);
            //asingnign current page variable
            pPage = cPage;
            cPage = data;
        }
        e.stopPropagation();
    }, false);

    //menu navigation button event listener
    menuNav.addEventListener('click', function(e){
        if(e.target != e.currentTarget && e.target.getAttribute('data-name')){
            e.preventDefault();
            //assinging variable
            var data = e.target.getAttribute('data-name');
            //changing active menu to new selection
            $("." + activeMenu + "-menu").fadeOut(10, function() {
                //hiding current
                $(this).addClass('hidden');
                $("." + activeMenu + "-button").removeClass("active-menu");
                //showing new
                $("." + data + "-menu").hide().removeClass("hidden").fadeIn(200);
                $("." + data + "-button").addClass("active-menu");
                activeMenu = data;
            });
            console.log(data);
        }
        e.stopPropagation();
    }, false);

    //when you click the forward/back buttons
    window.addEventListener('popstate', function(e) {
        if (e.event == null) {
            //makeTransition(e.event);
            console.log(e);
        } else {
            console.log(e);
            window.history.pushState(e.event, null, e.event +'.html');
            cPage = "e.event";
            makeTransition(pPage);
        }
    });




})();
