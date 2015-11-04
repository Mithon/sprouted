(function()    {
    "use strict";

    var navOpen = false,
        cPage = 'index',
        pPage = '',
        activeMenu = 'dinner',
        itemInfo = true,
        orderMode = false,
        pItemID = 7,
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
        uniqueStart = false,
        path = window.location.pathname,
        pageName = path.split("/").pop(),
        pageName = pageName.slice(0, -5);

    if (pageName != "" && pageName != "index")  {
        uniqueStart = true;
        makeTransition(pageName);
    }

    if (pageName != "") {
        cPage = pageName;
    }

    if (navOpen == false && cPage == "index") {
        toggleNav();
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
        navOpen ? ( $('.st8').css("fill", "#3CE6AD") )
            : ( $('.st8').css("fill", "#fff") );
    }

    function transitionIn(page) {
        //check new page to see what needs to appear
        var newContent = "." + page + "-content";
        uniqueStart = false;
        $('.tall').addClass(page + "-tall");
        $(newContent).hide().removeClass('hidden').fadeIn();

    }

    function makeTransition(page) {
        if (uniqueStart == false && (page != 'index' && navOpen == true))
            toggleNav();

        var content = "." + cPage + "-content";
        var cButton = "." + cPage + "-button";
        var nButton = "." + page + "-button";

        //check current page to see what needs to disappear
        $(content).fadeOut(350, function() {
            $(content).addClass('hidden');
            $(cButton).removeClass('active-page-button');
            $(nButton).addClass('active-page-button');
            transitionIn(page);
        });
    }

    function assignCategory (id) {
        $(".item-category").fadeOut(10);
        if (itemSpecs[id].organic)
            $(".organic").fadeIn();
        if (itemSpecs[id].local)
            $(".local").fadeIn();
        if (itemSpecs[id].protein)
            $(".protein").fadeIn();
    }

    $( "#toggle-box" ).on("click", function() {
      toggleNav();
    });


    $( ".logo" ).on('click', function() {
        if (cPage != 'index') {
            window.history.pushState(cPage, null, 'index.html');
            if (navOpen == false)
                toggleNav();
            makeTransition('index');
            $('.tall').removeClass(cPage + "-tall");
            cPage = "index";
        }
    });

    $( ".order-button" ).on('click', function() {
        if (orderMode == false) {
            $( "#order-text" ).addClass("order-hide").fadeOut(250, function() {
                $( "#cart-icon" ).hide().removeClass("hidden").fadeIn(10).removeClass("order-hide");
                orderMode = true;
            });
        } else {
            //open cart
        }
    });


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

    menuNav.addEventListener('click', function(e){
        if(e.target != e.currentTarget && e.target.getAttribute('data-name')){
            e.preventDefault();
            var data = e.target.getAttribute('data-name');
            $("." + activeMenu + "-menu").fadeOut(10, function() {
                $(this).addClass('hidden');
                $("." + activeMenu + "-button").removeClass("active-menu");
                $("." + data + "-menu").hide().removeClass("hidden").fadeIn(200);
                $("." + data + "-button").addClass("active-menu");
                activeMenu = data;
            });
            console.log(data);
        }
        e.stopPropagation();
    }, false);

    $(".menu-item").on('click', function(){
        var data = this.getAttribute('data-name'),
            itemID = +this.getAttribute('data-itemID');
            console.log(itemID);
        if (itemID == pItemID) {
            $(".selected-item").removeClass("selected-item");
            $(".item-info").addClass("hide-info");
            itemInfo = false;
            pItemID = null;
        } else {
            $(".selected-item").removeClass("selected-item");
            $(this).addClass("selected-item");
            if (itemInfo == false)  {
                document.getElementById("item-name").innerHTML = data;
                assignCategory(itemID);
                $(".item-info").removeClass("hide-info");
                itemInfo = true;
            } else {
                $(".item-info").addClass("hide-info").fadeOut()
                .fadeIn(10,function(){
                    document.getElementById("item-name").innerHTML = data;
                    assignCategory(itemID);
                    $(".item-info").removeClass("hide-info");
                });
            }
            console.log(data + " ItemID = " + itemID);
            pItemID = itemID;
        }
    });


})();
