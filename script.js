// SCROLL LAYOUT WITH EASING
var ScrollLayout = (function () {

    // cache and initialize some values
    var config = {
        // the cbp-fbscroller's sections
        $sections: $('#msl > section'),
        // the navigation links
        $navlinks: $('#msl > nav > a'),
        // custom: homenav
        $homenav: $('#top-nav > a'),
        // index of current link / section
        currentLink: 0,
        // index of current link / section
        $body: $('html, body'),
        // the body animation speed
        animspeed: 1050,
        // the body animation easing (jquery easing)
        animeasing: 'easeInOutExpo'
    };

    function init() {

        // custom: homenav
        config.$homenav.on('click', function () {
            scrollAnim(config.$sections.eq($(this).index()).offset().top);
            return false;
        });

        // click on a navigation link: the body is scrolled to the position of the respective section
        config.$navlinks.on('click', function () {
            scrollAnim(config.$sections.eq($(this).index()).offset().top);
            return false;
        });

        var waypoints = $('#sec2').waypoint({
            handler: function (direction) {
                $('#navbar').fadeToggle("fast", "linear");
            },
            offset: '50%'
        });
    }

    // function to scroll / animate the body
    function scrollAnim(myTop) {
        config.$body.stop().animate({
            scrollTop: myTop
        }, config.animspeed, config.animeasing);
    }

    return {
        init: init
    };

})();


// ADDITIONAL FEATURES
$(document).ready(function () {
    // SECTIONS HEIGHT BASED ON VIEWPORT
    resizeDiv();

    // SLICK SLIDER
    $('.portfolio-slider').slick({
        arrows: false,
        dots: true,
        infinite: false,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });

});

window.onresize = function (event) {
    resizeDiv();
};

function resizeDiv() {
    vpw = $(window).width();
    vph = $(window).height();
    $('.page-sections').css({
        'min-height': vph + 'px'
    });
};

$(function () {
    ScrollLayout.init();
});



// ____________________________ Cache selectors
var lastId,
    topMenu = $("#navbar"),
    topMenuHeight = topMenu.outerHeight() + 15,
    // All list items
    menuItems = topMenu.find("a"),
    // Anchors corresponding to menu items
    scrollItems = menuItems.map(function () {
        var item = $($(this).attr("href"));
        if (item.length) {
            return item;
        }
    });

// Bind click handler to menu items
// so we can get a fancy scroll animation
menuItems.click(function (e) {
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top - topMenuHeight + 1;
    $('html, body').stop().animate({
        scrollTop: offsetTop
    }, 300);
    e.preventDefault();
});

// Bind to scroll
$(window).scroll(function () {
    // Get container scroll position
    var fromTop = $(this).scrollTop() + topMenuHeight;

    // Get id of current scroll item
    var cur = scrollItems.map(function () {
        if ($(this).offset().top < fromTop)
            return this;
    });
    // Get the id of the current element
    cur = cur[cur.length - 1];
    var id = cur && cur.length ? cur[0].id : "";

    if (lastId !== id) {
        lastId = id;
        // Set/remove active class
        menuItems
            .parent().removeClass("active")
            .end().filter("[href='#" + id + "']").parent().addClass("active");
    }
});

/* =========== GRAPHS ===================*/

var piesiteFired = 0;
$(document).ready(function () {
    var $win = $(window),
        $win_height = $(window).height(),
        // - A multiple of viewport height - The higher this number the sooner triggered.
        windowPercentage = $(window).height() * 0.9;
    $win.on("scroll", scrollReveal);

    function scrollReveal() {
        var scrolled = $win.scrollTop();

        ///////////////////////////////////////
        // Bar Charts scroll activate, looking for .trigger class to fire.
        $(".trigger").each(function () {
            var $this = $(this),
                offsetTop = $this.offset().top;
            if (
                scrolled + windowPercentage > offsetTop ||
                $win_height > offsetTop
            ) {
                $(this).each(function (key, bar) {
                    var percentage = $(this).data("percentage");
                    $(this).css("height", percentage + "%");

                    ///////////////////////////////////////
                    //        Animated numbers
                    $(this).prop("Counter", 0).animate({
                        Counter: $(this).data("percentage")
                    }, {
                        duration: 2000,
                        easing: "swing",
                        step: function (now) {
                            $(this).text(Math.ceil(now));
                        }
                    });
                    //        Animated numbers
                    ///////////////////////////////////////
                });

            } else {
                ///////////////////////////////////////
                // To keep them triggered, lose this block.
                $(this).each(function (key, bar) {
                    $(this).css("height", 0);
                });
            }

        });

        ///////////////////////////////////////
        // Horizontal Chart
        $(".chartBarsHorizontal .bar").each(function () {
            var $this = $(this),
                offsetTop = $this.offset().top;
            if (
                scrolled + windowPercentage > offsetTop ||
                $win_height > offsetTop
            ) {
                $(this).each(function (key, bar) {
                    var percentage = $(this).data("percentage");
                    $(this).css("width", percentage + "%");
                    ///////////////////////////////////////
                    //        Animated numbers
                    $(this).prop("Counter", 0).animate({
                        Counter: $(this).data("percentage")
                    }, {
                        duration: 2000,
                        easing: "swing",
                        step: function (now) {
                            $(this).text(Math.ceil(now));
                        }
                    });
                    //        Animated numbers
                    ///////////////////////////////////////
                });

            } else {
                ///////////////////////////////////////
                // To keep them triggered, lose this block.
                $(this).each(function (key, bar) {
                    $(this).css("width", 0);
                });
            }

        });

        ///////////////////////////////////////
        // Radial Graphs - scroll activate
        $(".piesite").each(function () {
            var $this = $(this),
                offsetTop = $this.offset().top;
            if (
                scrolled + windowPercentage > offsetTop ||
                $win_height > offsetTop
            ) {
                if (piesiteFired == 0) {
                    timerSeconds = 3;
                    timerFinish = new Date().getTime() + timerSeconds * 1000;
                    $(".piesite").each(function (a) {
                        pie = $("#pie_" + a).data("pie");
                        timer = setInterval(
                            "stoppie(" + a + ", " + pie + ")",
                            0
                        );
                    });
                    piesiteFired = 1;
                }
            } else {
                // To keep them triggered, lose this block.
                $(".piesite").each(function () {
                    piesiteFired = 0;
                });
            }
        });
    }
    scrollReveal();
});

///////////////////////////////////////
//        The Radial Graphs
///////////////////////////////////////

var timer;
var timerFinish;
var timerSeconds;

function drawTimer(c, a) {
    $("#pie_" + c).html(
        '<div class="percent"></div><div id="slice"' +
        (a > 50 ? ' class="gt50"' : "") +
        '><div class="pie"></div>' +
        (a > 50 ? '<div class="pie fill"></div>' : "") +
        "</div>"
    );
    var b = 360 / 100 * a;
    $("#pie_" + c + " #slice .pie").css({
        "-moz-transform": "rotate(" + b + "deg)",
        "-webkit-transform": "rotate(" + b + "deg)",
        "-o-transform": "rotate(" + b + "deg)",
        transform: "rotate(" + b + "deg)"
    });
    a = Math.floor(a * 100) / 100;
    arr = a.toString().split(".");
    intPart = arr[0];
    $("#pie_" + c + " .percent").html(
        '<span class="int">' +
        intPart +
        "</span>" +
        '<span class="symbol">%</span>'
    );
}

function stoppie(d, b) {
    var c = (timerFinish - new Date().getTime()) / 1000;
    var a = 100 - c / timerSeconds * 100;
    a = Math.floor(a * 100) / 100;
    if (a <= b) {
        drawTimer(d, a);
    } else {
        b = $("#pie_" + d).data("pie");
        arr = b.toString().split(".");
        $("#pie_" + d + " .percent .int").html(arr[0]);
    }
}

/* =================== brand images slideshow [Row 1] ==================== */

var timer = 4000;

var i = 0;
var max = $('#c > li').length;

$("#c > li").eq(i).addClass('active').css('left', '0');
$("#c > li").eq(i + 1).addClass('active').css('left', '25%');
$("#c > li").eq(i + 2).addClass('active').css('left', '50%');
$("#c > li").eq(i + 3).addClass('active').css('left', '75%');


setInterval(function () {

    $("#c > li").removeClass('active');

    $("#c > li").eq(i).css('transition-delay', '0.25s');
    $("#c > li").eq(i + 1).css('transition-delay', '0.5s');
    $("#c > li").eq(i + 2).css('transition-delay', '0.75s');
    $("#c > li").eq(i + 3).css('transition-delay', '1s');

    if (i < max - 4) {
        i = i + 4;
    } else {
        i = 0;
    }

    $("#c > li").eq(i).css('left', '0').addClass('active').css('transition-delay', '1.25s');
    $("#c > li").eq(i + 1).css('left', '25%').addClass('active').css('transition-delay', '1.5s');
    $("#c > li").eq(i + 2).css('left', '50%').addClass('active').css('transition-delay', '1.75s');
    $("#c > li").eq(i + 3).css('left', '75%').addClass('active').css('transition-delay', '2s');

}, timer);

/* ===================================Row 2==================================== */

var timer2 = 4000;

var i2 = 0;
var max2 = $('#c > li').length;

$("#d > li").eq(i).addClass('active').css('left', '0');
$("#d > li").eq(i + 1).addClass('active').css('left', '25%');
$("#d > li").eq(i + 2).addClass('active').css('left', '50%');
$("#d > li").eq(i + 3).addClass('active').css('left', '75%');


setInterval(function () {

    $("#d > li").removeClass('active');

    $("#d > li").eq(i).css('transition-delay', '0.25s');
    $("#d > li").eq(i + 1).css('transition-delay', '0.5s');
    $("#d > li").eq(i + 2).css('transition-delay', '0.75s');
    $("#d > li").eq(i + 3).css('transition-delay', '1s');

    if (i2 < max2 - 4) {
        i2 = i2 + 4;
    } else {
        i2 = 0;
    }

    $("#d > li").eq(i).css('left', '0').addClass('active').css('transition-delay', '1.25s');
    $("#d > li").eq(i + 1).css('left', '25%').addClass('active').css('transition-delay', '1.5s');
    $("#d > li").eq(i + 2).css('left', '50%').addClass('active').css('transition-delay', '1.75s');
    $("#d > li").eq(i + 3).css('left', '75%').addClass('active').css('transition-delay', '2s');

}, timer2);

/* ============================ */

var imageSlides = [
    "https://developer.spotify.com/assets/branding-guidelines/icon4@2x.png",
    "https://wynk.in/assets/icons/icon-192x192.png",
    "https://www.customercarecontactnumber.in/wp-content/uploads/2017/09/Hungama.com-Customer-Care-Number.png",
    "https://a10.gaanacdn.com/images/social/gaana_social.jpg",
    "https://lh3.googleusercontent.com/proxy/2AspWVMmiZffwQXqNOYffK8WiTlYMgZQJZn2PHRwiHHGzCMjmhHj4HeZ2F1R9Pv1j43DQdvTSsFJnPsOkIwphRR5T5H2",
    "https://pbs.twimg.com/profile_images/956411671148249088/bk5AA4uR_400x400.jpg"
];
$(function () {
    var i = 0;
    $("#brandImg").css("background-image", "url(" + imageSlides[i] + ")");
    setInterval(function () {
        i++;
        if (i == imageSlides.length) {
            i = 0;
        }
        $("#brandImg").fadeOut("slow", function () {
            $(this).css("background-image", "url(" + imageSlides[i] + ")");
            $(this).fadeIn("slow");
        });
    }, 2000);
});