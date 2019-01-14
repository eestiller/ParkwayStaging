function accordionMobileNav() {
    $(".sidr-class-sub-nav").hide(), $(".sidr-class-accordion-nav > ul > li > span").unbind("click").bind("click", function(e) {
        $(this).parent().hasClass("active") ? ($(this).next().slideUp(), $(this).parent().removeClass("active")) : ($(".sidr-class-sub-nav").hide(), $(".sidr-class-accordion-nav > ul > li").removeClass("active"), $(this).next().slideDown(), $(this).parent().addClass("active"))
    }), $(".sidr-class-accordion-nav > ul > li > a.sidr-class-nolink").unbind("click").bind("click", function(e) {
        e.preventDefault(), $(this).siblings().trigger("click")
    })
}

function deskMenu() {
    $(".main-nav ul li").find(".sub-main-nav").hide(), $(".main-nav ul li").hover(function() {
        $(this).find(".sub-main-nav").show(), $(this).addClass("active"), $("html,body").width() <= 959 ? $(".sub-main-nav > div").css("height", "auto") : $(".main-nav ul li.active .sub-main-nav > div").setAllToMaxHeight()
    }, function() {
        $(this).find(".sub-main-nav").hide(), $(this).removeClass("active")
    })
}

function tabletMenu() {
    $(".main-nav ul li").find(".sub-main-nav").hide(), $(".main-nav ul li a").click(function() {
        var e = $(this).parent();
        return e.hasClass("active") ? (e.find(".sub-main-nav").toggle(), e.removeClass("active"), !0) : ($(".main-nav ul li").find(".sub-main-nav").hide(), $(".main-nav ul li").removeClass("active"), e.find(".sub-main-nav").length > 0 ? (e.find(".sub-main-nav").toggle(), e.addClass("active"), !1) : (e.addClass("active"), !0))
    }), $(document).bind("click touchstart", function(e) {
        0 == $(".main-nav").has(e.target).length && ($(".sub-main-nav").hide(), $(".main-nav ul li").removeClass("active"))
    })
}

function navMobile() {
    $(".title-nav-m li").each(function(e) {
        var t = $(this);
        t.find("a").on("click", function() {
            if ($(".detail-nav-m").find("li").hide(), $(".title-nav-m").find("li").removeClass("active"), t.addClass("active"), 0 == e || 1 == e || 2 == e || 3 == e) return !0;
            event.preventDefault(), $(".detail-nav-m li").eq(e).slideToggle({
                direction: "up"
            }, 300)
        })
    })
}

function submitSearch() {
    window.location.origin || (window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "")), $("#search").keyup(function(e) {
        if (13 == e.keyCode) {
            var t = $("#search").val();
            window.open(window.location.origin + "/search-results#" + t, "_blank")
        }
    }), $(".fake-btn").click(function() {
        var e = $("#search").val();
        window.open(window.location.origin + "/search-results#" + e, "_blank")
    }), $("#sidr-id-search-m").keyup(function(e) {
        if (13 == e.keyCode) {
            var t = $("#sidr-id-search-m").val();
            window.open(window.location.origin + "/search-results#" + t, "_blank")
        }
    }), $(".sidr-class-btn-primary").click(function() {
        var e = $("#sidr-id-search-m").val();
        window.open(window.location.origin + "/search-results#" + e, "_blank")
    })
}

function loadPlaceholer() {
    $(".form-1 .form-group").each(function() {
        var e = $(this).find("label").html();
        $(".control-1").parent().parent().find("label").hide();
        var t = $(e.split('<span class="required">'));
        "*</span>" == t[1] ? $(this).find(".control-1").attr("placeholder", t[0] + "*") : $(this).find(".control-1").attr("placeholder", t[0]), $(this).find("select").addClass("select-2")
    })
}

function removePlaceholer() {
    $(".form-1 .form-group").each(function(e) {
        $(".control-1").parent().parent().find("label").show(), $(".control-1").attr("placeholder", ""), $(this).find("select").removeClass("select-2")
    })
}

function toolbars() {
    $.browser.msie && 8 === parseInt($.browser.version, 10) ? $(".print").on("click", function() {
        return window.print(), window.document.close(), !1
    }) : $(".print").on("click", function() {
        return window.print(), window.close(), !1
    }), $(".text-big").on("click", function() {
        return $(".tools-bar .col-sm-4 ul li a").removeClass("active"), $(this).addClass("active"), $("html,body").css("font-size", "110%"), $.localStorage.setItem("currentFontSizeZoom", "big"), editheight(), !1
    }), $(".text-mid").on("click", function() {
        return $(".tools-bar .col-sm-4 ul li a").removeClass("active"), $(this).addClass("active"), $("html,body").css("font-size", "100%"), $.localStorage.setItem("currentFontSizeZoom", "mid"), editheight(), !1
    }), $(".text-sm").on("click", function() {
        return $(".tools-bar .col-sm-4 ul li a").removeClass("active"), $(this).addClass("active"), $("html,body").css("font-size", "88.9%"), $.localStorage.setItem("currentFontSizeZoom", "sm"), editheight(), !1
    });
    var e;
    (e = $.localStorage.getItem("currentFontSizeZoom")) ? $(".text-" + e).click().addClass("active"): ($("html,body").css("font-size", "100%"), $(".text-mid").addClass("active"))
}

function editheight() {
    var e = $(window).width() + 17;
    if (768 <= e && e <= 959) {
        $(".list-item li").css("height", "auto"), $(".news-item h4").css("height", "auto"), $(".news-item").css("height", "auto"), $(".list-item li").removeClass();
        var t = $(".list-item").length,
            a = 1;
        for (i = 0; i < t; i++) $(".list-item").eq(i).find("li").each(function(e) {
            e >= 3 * a && a++, $(this).addClass("group-" + i + "-" + a), $(".group-" + i + "-" + a).setAllToMaxHeight()
        });
        $(".news-item h4").setAllToMaxHeight(), $(".news-item").setAllToMaxHeight()
    } else if (e >= 960) {
        $(".list-item li").css("height", "auto"), $(".news-item h4").css("height", "auto"), $(".news-item").css("height", "auto"), $(".list-item li").removeClass();
        var t = $(".list-item").length,
            a = 1;
        for (i = 0; i < t; i++) $(".list-item").eq(i).find("li").each(function(e) {
            e >= 4 * a && a++, $(this).addClass("group-" + i + "-" + a), $(".group-" + i + "-" + a).setAllToMaxHeight()
        });
        $(".news-item h4").setAllToMaxHeight(), $(".news-item").setAllToMaxHeight()
    } else $(".list-item li").css("height", "auto"), $(".news-item h4").css("height", "auto"), $(".news-item").css("height", "auto"), $(".list-item li").removeClass()
}

function scrollToElement(e, t, i) {
    t = void 0 !== t ? t : 1e3, i = void 0 !== i ? i : 0, element = $(e), offset = element.offset(), offsetTop = offset.top + i, $("html, body").animate({
        scrollTop: offsetTop
    }, t)
}

function addCookie(e, t, i) {
    if (i) {
        var a = new Date;
        a.setTime(a.getTime() + 24 * i * 60 * 60 * 1e3);
        n = "; expires=" + a.toGMTString()
    } else var n = "";
    document.cookie = e + "=" + t + n + "; path=/"
}

function checkCookie(e) {
    for (var t = e + "=", i = document.cookie.split(";"), a = 0; a < i.length; a++) {
        for (var n = i[a];
            " " == n.charAt(0);) n = n.substring(1, n.length);
        if (0 == n.indexOf(t)) return n.substring(t.length, n.length)
    }
    return null
}

function deleteCookie(e) {
    addCookie(e, "", -1)
}

function getCookie(e) {
    for (var t = e + "=", i = document.cookie.split(";"), a = 0; a < i.length; a++) {
        for (var n = i[a];
            " " == n.charAt(0);) n = n.substring(1);
        if (0 == n.indexOf(t)) return n.substring(t.length, n.length)
    }
    return ""
}

function storeSalesForceParams(e) {
    var t = "",
        i = $.QueryString.pwsrc;
    if (void 0 != i && "" != i) {
        void 0 == (t = getCookie("pwsrc")) || "" == t ? t = i : -1 == ("," + t + ",").indexOf("," + i + ",") && (t = t + "," + i);
        var a = new Date,
            n = a.getTime() + 864e5 * e;
        a.setTime(n), document.cookie = "pwsrc=" + t + ";expires=" + a.toGMTString() + ";path=/"
    }
}

function youtubePlay() {
    if ($(".youtube-play").length > 0) {
        var e = $(".youtube-play").attr("data-src");
        $(".youtube-play").replaceWith("<iframe width='560' height='315' src=" + e + " frameborder='0' allowfullscreen=''></iframe>")
    }
}

function getMobileOperatingSystem() {
    if (1 != isMobile()) {
        var e = $(".contact-number .phone-number").text();
        $(".contact-number .phone-number").remove(), $(".contact-number .phone").append('<a class="phone-number" href="https://api.whatsapp.com/send?phone=6581119777&amp;text=Hi I was on your Gleneagles website, and I want to make an appointment.">' + e + "</a>")
    } else {
        var t = (e = $(".contact-number span.phone-number").text()).match(/\d/g);
        t = t.join(""), $(".contact-number span.phone-number").remove(), $(".contact-number .phone").append('<a class="phone-number" href="whatsapp://send?text= &phone=+' + t + '">' + e + "</a>")
    }
}

function showBannerPopup() {
    var e = $("#html_tag").attr("lang");
    $.post("/api/ContentApi/GetPopupBannerByPage?culture=" + e, function(e) {
        if ("OK" == e.Result && null != e.Data) {
            var t = e.Data.ExpireDay;
            externallink = e.Data.Link, isFirstLoad = e.Data.IsFirstLoad, mobileLandscape = e.Data.MobileLandscape, mobilePortrait = e.Data.MobilePortrait, tableLandscape = e.Data.TableLandscape, tablePortrait = e.Data.TablePortrait, initHTML(externallink, mobileLandscape, mobilePortrait, tableLandscape, tablePortrait, function() {
                if (1 == isFirstLoad) {
                    var e = new Date;
                    if (null == checkCookie("cookiePopupBanner")) {
                        a = 0;
                        $("#popupBanner img").each(function() {
                            var e = new Image;
                            e.onload = function() {
                                ++a == $("#popupBanner img").length && showPopup()
                            }, e.src = this.src
                        })
                    }
                    e.setDate(e.getDate() + t);
                    var i = "; expires=" + e.toGMTString();
                    document.cookie = "cookiePopupBanner=1" + i + "; path=/"
                } else {
                    var a = 0;
                    $("#popupBanner img").each(function() {
                        var e = new Image;
                        e.onload = function() {
                            ++a == $("#popupBanner img").length && showPopup()
                        }, e.src = this.src
                    })
                }
            })
        } else void 0 !== e.Message && alert(e.Message)
    })
}

function showPopup() {
    $.fancybox({
        href: "#popupBanner",
        padding: 0,
        autoSize: !0,
        fitToView: !0,
        autoCenter: !0,
        autoResize: !0,
        maxWidth: 1e3,
        tpl: {
            closeBtn: '<a class="fancybox-item fancybox-close">&times;</a>'
        },
        afterLoad: function() {
            setTimeout(function() {
                $(".fancybox-skin").css("width", $("#popupBanner img:not(:hidden)").width()).addClass("show")
            }, 350)
        },
        beforeShow: function() {
            $(".fancybox-wrap").addClass("popup-banner")
        }
    })
}

function initHTML(e, t, i, a, n, o) {
    var s = "javascript: void(0)",
        l = "",
        r = "";
    "" != e && validateURL(s = e) && (l = "target ='_blank'", r = "rel= 'nofollow'");
    var c = '<a id="popupBanner" style="display:none" href="' + s + '" ' + l + r + '><img class="mobile_landscape" src="' + t + '" alt="" /><img class="mobile_portrait" src="' + i + '" alt="" /><img class="tablet_landscape" src="' + a + '" alt="" /><img class="tablet_portrait" src="' + n + '" alt="" /></a>';
    $("body").append(c), $.isFunction(o) && o()
}

function validateURL(e) {
    return /^(https|http|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/.test(e)
}
jQuery(document).ready(function(e) {
        e("a[data-parent]").removeAttr("data-parent"), e(".scroll").mCustomScrollbar({
            scrollButtons: {
                enable: !1
            },
            advanced: {
                updateOnContentResize: !0
            }
        }), e("img.lazy").lazyload({
            effect: "fadeIn",
            threshold: 200
        }), isMobile() ? tabletMenu() : deskMenu(), e(".list-dr-post, #AreaQuestionsByDoctor, #AreaQuestionDetails, #AreaQuestionBySpecialty").on("click", ".post-main p.style-2 a", function(t) {
            t.preventDefault();
            var i = e(this);
            i.hasClass("active") ? (i.removeClass("active"), i.parent().next().slideUp()) : (i.addClass("active"), i.parent().next().slideDown())
        });
        var t = document.URL.substr(document.URL.indexOf("#") + 1, 8),
            i = e(".panel-heading .active");
			e("a[data-internal-accor]").click(function(t) {
            t.preventDefault();
            var i = e(this).attr("href"),
                a = e("a[href=" + i + "][data-toggle]"),
                n = e(a).parent("h2"),
                o = n.offset().top;
            n.next().hasClass("panel-collapse in") || e(a).click(), e("html, body").animate({
                scrollTop: o - 10
            }, 1e3)
        }), e("#accordion").find("h3").each(function(t) {
            var i = e(this);
            "&nbsp" == i.html() && i.addClass("hideMobile")
        }), e("input, textarea").placeholder(), navMobile(), toolbars(), e(".rate").raty({
            width: "165px",
            numberMax: 5,
            number: 5,
            score: function() {
                return e(this).attr("data-rating")
            },
            click: function(t) {
                var i = e(this).attr("articleid").trim(),
                    a = checkCookie("CookieArticle"),
                    n = !0;
                if (null != a) {
                    for (var o = a.split(","), s = 0; s < o.length; s++) o[s] == i && (n = !1);
                    n ? addCookie("CookieArticle", a += "," + i, "30") : e('.rate[articleid="' + i + '"]').raty("readOnly", !0)
                } else n = !0, addCookie("CookieArticle", a = i, "30");
                n && e.post("/api/SharedArticlesListApi/SaveSharedArticleRating?score=" + t + "&articleid=" + i, function(t) {
                    "OK" == t.Result && (e(".number[articleid='" + i + "']").text("(" + t.NumberUserRating + ")"), e('.rate[articleid="' + i + '"]').raty("score", t.AverageRating), e('.rate[articleid="' + i + '"]').raty("readOnly", !0))
                }, "json")
            },
            readOnly: function() {
                var t = e(this).attr("articleid").trim(),
                    i = checkCookie("CookieArticle");
                if (null != i)
                    for (var a = i.split(","), n = 0; n < a.length; n++)
                        if (a[n] == t) return !0;
                return !1
            }
        }), e(".flexslider").flexslider({
            animation: "fade",
            directionNav: !1,
            slideshowSpeed: 7e3,
            move: 1,
            start: function(t) {
                e("body").removeClass("loading"), e(".flex-control-nav").wrap("<div class='container slide-paging'><div class='row'><div class='col-md-12'></div></div></div>")
            },
            before: function() {
                e(".flexslider").resize()
            }
        }), e(".flexslider-1").flexslider({
            animation: "slide",
            directionNav: !1
        });
        var a = e("#hidTotalClinicPhoto").val();
        void 0 === a || isNaN(a) ? e(".flexslider-2").flexslider({
            animation: "slide",
            directionNav: !0,
            animationLoop: !1,
            minItems: 1,
            maxItems: 4,
            move: 1,
            itemWidth: 258,
            itemMargin: 30
        }) : (a = parseInt(a)) <= 3 ? (e(".flexslider-2").removeData("flexslider"), e(".flexslider-2").flexslider({
            animation: "slide",
            slideshow: !1,
            directionNav: !1,
            animationLoop: !1,
            itemWidth: 258,
            itemMargin: 30
        })) : e(".flexslider-2").flexslider({
            animation: "slide",
            directionNav: !0,
            animationLoop: !1,
            minItems: 1,
            maxItems: 4,
            move: 1,
            itemWidth: 258,
            itemMargin: 30
        }), e("#responsive-menu-button").sidr({
            name: "sidr-main",
            source: "#navigation",
            side: "right",
            onOpen: function() {
                e(".nav-m").css("left", "-260px")
            },
            onClose: function() {
                e(".nav-m").css("left", "0")
            }
        }), e("#responsive-search-button").sidr({
            name: "sidr-second",
            source: "#search-mobile",
            side: "right",
            onOpen: function() {
                e(".nav-m").css("left", "-260px")
            },
            onClose: function() {
                e(".nav-m").css("left", "0")
            },
			renaming: false
        }), accordionMobileNav(), e(".datepicker").datepicker({
            dateFormat: "dd-mm-yy",
            changeMonth: !0,
            changeYear: !0,
            yearRange: "1930:+0"
        }), e("#date_from").datepicker({
            numberOfMonths: 1,
            firstDay: 1,
            defaultDate: "+1w",
            dateFormat: "dd-mm-yy",
            minDate: "0",
            maxDate: "+2Y",
            onSelect: function(t) {
                var i = e(this).datepicker("getDate");
                i.setDate(i.getDate() + 0);
                var a = e(this).datepicker("getDate");
                a.setDate(a.getDate() + 30), e("#date_to").datepicker("setDate", null), e("#date_to").datepicker("option", "minDate", i), e("#date_to").datepicker("option", "maxDate", a)
            }
        }), e("#date_to").datepicker({
            numberOfMonths: 1,
            firstDay: 1,
            defaultDate: "+1w",
            dateFormat: "dd-mm-yy",
            minDate: "0",
            maxDate: "+2Y",
            onClose: function(t) {
                e("#from").datepicker("option", "maxDate", t)
            }
        }), e(".fancybox").fancybox({
            helpers: {
                title: null
            },
            transitionIn: "none",
            transitionOut: "none",
            autoScale: !1,
            centerOnScroll: !0,
            autoDimensions: !1,
            padding: 30,
            maxWidth: "800"
        }), e(".fancybox-gallery").fancybox({
            helpers: {
                title: null
            },
            transitionIn: "none",
            transitionOut: "none",
            prevEffect: "none",
            nextEffect: "none",
            padding: 10,
            beforeShow: function() {
                e(".fancybox-skin").addClass("style-2")
            }
        }), e(".fancybox-media").click(function() {
            return e.fancybox({
                padding: 20,
                transitionIn: "none",
                transitionOut: "none",
                title: this.title,
                width: "500",
                height: "400",
                href: this.href.replace(new RegExp("youtu.be", "i"), "www.youtube.com/embed").replace(new RegExp("watch\\?v=([a-z0-9_-]+)(&|\\?)?(.*)", "i"), "embed/$1?version=3&$3"),
                type: "iframe",
                afterShow: function() {
                    e(".fancybox-skin").addClass("video-popup")
                }
            }), !1
        }), submitSearch(), e("#accordion .panel-heading").find("a").click(function() {
            var t = e(this);
            setTimeout(function() {
                e("html, body").animate({
                    scrollTop: t.offset().top - 10
                }, 300)
            }, 500);
            setTimeout(function() {
                editheight()
            }, 500), setTimeout(function() {
                var t = e(".flexslider-1").data("flexslider");
                t && t.resize()
            }, 100)
        }), isMobile() ? (e(".switch").bind("touchstart", function() {
            var t = e(this);
            t.hasClass("active") ? (t.removeClass("active"), t.parent().find(".anatomy").css("margin-left", "0")) : (t.addClass("active"), t.parent().find(".anatomy").css("margin-left", "-285px"))
        }), e(".gotop").bind("touchstart", function() {
            scrollToElement(".anatomy", "slow", 0)
        })) : (e(".switch").bind("click", function() {
            var t = e(this);
            t.hasClass("active") ? (t.removeClass("active"), t.parent().find(".anatomy").css("margin-left", "0")) : (t.addClass("active"), t.parent().find(".anatomy").css("margin-left", "-285px"))
        }), e(".gotop").bind("click", function() {
            scrollToElement(".anatomy", "slow", 0)
        })), e(".panel-direct").on("click", function(t) {
            t.preventDefault();
            var i = e(this);
            i.closest("li.panel").find(".panel-collapse").removeClass("in"), i.closest("li.panel").find(".panel-heading a").removeClass("active");
            var a = i.attr("href");
            e(".panel-collapse").not(a).removeClass("in"), e(".panel-collapse").not(a).siblings().find("a").removeClass("active"), a.addClass("in"), a.siblings().find("a").addClass("active"), e("#accordion li.panel:first-child h2 a").addClass("active");
            var n = a.siblings("h2").height() + 12;
            a.css("height", "auto"), e("html, body").animate({
                scrollTop: a.offset().top - n
            }, 1e3)
        }), e("#btnScrollTop").on("click", function(t) {
            t.preventDefault(), e("body,html").animate({
                scrollTop: 0
            }, 600)
        })
    }), $(window).bind("load", function() {
        editheight(), showBannerPopup(), youtubePlay()
    }), $.fn.setAllToMaxHeight = function() {
        return this.height(Math.max.apply(this, $.map(this, function(e) {
            return $(e).height()
        })))
    }, jQuery(window).resize(function() {
        var e = $("html,body"),
            t = e.width();
        t <= 767 ? loadPlaceholer() : (removePlaceholer(), e.hasClass("sidr-main-open") && $("#responsive-menu-button").trigger("click"), e.hasClass("sidr-second-open") && $("#responsive-search-button").trigger("click")), t <= 959 ? $(".sub-main-nav > div").css("height", "auto") : $(".main-nav ul li.active .sub-main-nav > div").setAllToMaxHeight(), editheight(), setTimeout(function() {
            var e = $(".flexslider-1").data("flexslider");
            e && e.resize()
        }, 200), $(".anatomy").css("margin-left", "0")
    }).trigger("resize"), $(window).scroll(function() {
        $(this).scrollTop() > 100 ? $("#btnScrollTop").fadeIn() : $("#btnScrollTop").fadeOut()
    }),
    function(e) {
        e.QueryString = function(e) {
            if ("" == e) return {};
            for (var t = {}, i = 0; i < e.length; ++i) {
                var a = e[i].split("=");
                2 == a.length && (t[a[0]] = decodeURIComponent(a[1].replace(/\+/g, " ")))
            }
            return t
        }(window.location.search.substr(1).split("&"))
    }(jQuery), jQuery(window).resize(function() {
        $(window).width();
        $("html,body").width() <= 767 ? loadPlaceholer() : removePlaceholer(), $("html,body").width() <= 959 ? $(".sub-main-nav > div").css("height", "auto") : $(".main-nav ul li.active .sub-main-nav > div").setAllToMaxHeight(), editheight(), setTimeout(function() {
            var e = $(".flexslider-1").data("flexslider");
            e && e.resize()
        }, 200), $(".anatomy").css("margin-left", "0")
    }).trigger("resize"), WebFontConfig = {
        google: {
            families: ["Lato:100,300,400,700,900"]
        }
    },
    function() {
        var e = document.createElement("script");
        e.src = ("https:" == document.location.protocol ? "https" : "http") + "://ajax.googleapis.com/ajax/libs/webfont/1.6.16/webfont.js", e.type = "text/javascript", e.async = "true";
        var t = document.getElementsByTagName("script")[0];
        t.parentNode.insertBefore(e, t)
    }();
	
/* SWIFTtype SEARCH */	
(function(w,d,t,u,n,s,e){w['SwiftypeObject']=n;w[n]=w[n]||function(){
(w[n].q=w[n].q||[]).push(arguments);};s=d.createElement(t);
e=d.getElementsByTagName(t)[0];s.async=1;s.src=u;e.parentNode.insertBefore(s,e);
})(window,document,'script','//s.swiftypecdn.com/install/v2/st.js','_st');


$.urlParam = function(name){
    var results = new RegExp('[\?#&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results==null){
       return null;
    }
    else{
       return decodeURI(results[1]) || 0;
    }
}

$(document).ready(function(){
	var lang = $('meta.swiftype').attr('content');
	
	_st('install','xH_5j6MrsGBWUF5sZdam','2.0.0', {
	install: {
	hooks: {
	query_filter: function(query) {
	query.setFilterDataByDocumentTypeSlugAndFilterField('page', 'lang', { values: [lang], type: "and" });
	return query;
	}
	}
	}})
	
	
	$('button.swiftbtn_submit').click(function(e){
		e.preventDefault();
		var q = $('.st-default-search-input').val();
		if(q.length > 0) {
			var input = $('.st-default-search-input').val();
			var lang = $('.st-default-search-input').attr('data-lang');
			var loc = '/'+lang+'/search-results#stq='+input+'&stp=1';
			window.location = loc;
		}
	})
	
	$('.swft-wrap span.swiftbtn').on('click',function(){
		$('.swiftbtn_submit').click();
	})
	
	$(window).on('hashchange',function(e){
		e.preventDefault();
		var q = $.urlParam('stq');
		if($.urlParam('stp') === '1') {
			var lang = $('.st-default-search-input').attr('data-lang');
			if(lang != 'en' && lang != "undefined" && lang != "" ){
				var loc = '/'+lang+'/search-results#'+location.hash.slice(1);
				window.location = loc;
			}else{
				var loc = '/search-results#'+location.hash.slice(1);
				window.location = loc;
			}
		}
	});
});

/* Chatbox script */
var kr_settings = {
  "server": "https://keyreply-parkway.azurewebsites.net",
initialState: {
      hospital: 'GEH',
hospitalRoot: 'https://www.gleneagles.com.sg',
hospitalName: 'Gleneagles Hospital',
    },
    id: "25406c0954",
botIcon: "https://keyreplyparkwayprod.blob.core.windows.net/files/images/gleneagles.svg",
headerBorderColor: "#648bc8",
agentBubbleColor: "#fff",
agentTextColor: "#595a5c",
userBubbleColor: "#c2cee9",
};


$(window).load(function(){

	var lang = $('html').attr('lang');
	
	if(lang == 'en'){
        $.getScript('https://cdn.polyfill.io/v2/polyfill.min.js');
		$.getScript('https://files.keyreply.com/live/static/js/app.js');

	}
})