function accordionMobileNav() {
    $(".sidr-class-sub-nav").hide(), $(".sidr-class-accordion-nav > ul > li > span").unbind("click").bind("click", function(t) {
        $(this).parent().hasClass("active") ? ($(this).next().slideUp(), $(this).parent().removeClass("active")) : ($(".sidr-class-sub-nav").hide(), $(".sidr-class-accordion-nav > ul > li").removeClass("active"), $(this).next().slideDown(), $(this).parent().addClass("active"))
    }), $(".sidr-class-accordion-nav > ul > li > a.sidr-class-nolink").unbind("click").bind("click", function(t) {
        t.preventDefault(), $(this).siblings().trigger("click")
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
        var t = $(this).parent();
        return t.hasClass("active") ? (t.find(".sub-main-nav").toggle(), t.removeClass("active"), !0) : ($(".main-nav ul li").find(".sub-main-nav").hide(), $(".main-nav ul li").removeClass("active"), t.find(".sub-main-nav").length > 0 ? (t.find(".sub-main-nav").toggle(), t.addClass("active"), !1) : (t.addClass("active"), !0))
    }), $(document).bind("click touchstart", function(t) {
        0 == $(".main-nav").has(t.target).length && ($(".sub-main-nav").hide(), $(".main-nav ul li").removeClass("active"))
    })
}

function getMobileOperatingSystem() {
    1 != isMobile() ? $(".whatsapp-number.vcf").attr({
        href: "javascript:void(0);",
        style: "cursor:default;"
    }) : $(".whatsapp-number.vcf").each(function() {
        var t = $(this).data("number");
        $(this).attr({
            href: "tel:" + t,
            rel: "nofollow"
        })
    });
    var t = navigator.userAgent || navigator.vendor || window.opera;
    /iPad|iPhone|iPod/.test(t) && !window.MSStream && $(".whatsapp-number.vcf").each(function() {
        "novena" == $(this).data("type") ? $(this).attr("href", "/custom/asserts/mount-elizabeth-novena.vcf") : $(this).attr("href", "/custom/asserts/mount-elizabeth-orchard.vcf")
    })
}

function navMobile() {
    $(".title-nav-m li").each(function(t) {
        var e = $(this);
        $(this).find("a").on("click", function() {
            if ($(".detail-nav-m").find("li").hide(), $(".title-nav-m").find("li").removeClass("active"), e.addClass("active"), 3 != t) return !0;
            event.preventDefault(), $(".detail-nav-m li").eq(t).slideToggle({
                direction: "up"
            }, 300)
        })
    })
}

function submitSearch() {
    window.location.origin || (window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ":" + window.location.port : "")), $("#search").keyup(function(t) {
        var e = $(this);
        if (13 == t.keyCode) {
            var i = e.val(),
                a = e.attr("locale");
            a = "en" === a ? "" : "/" + a, window.open(window.location.origin + a + "/search-results?q=" + i, "_self")
        }
    }), $(".fake-btn").click(function() {
        var t = $("#search"),
            e = t.val(),
            i = t.attr("locale");
        i = "en" === i ? "" : "/" + i, window.open(window.location.origin + i + "/search-results?q=" + e, "_self")
    }), $("#sidr-id-search-m").keyup(function(t) {
        if (13 == t.keyCode) {
            var e = $("#sidr-id-search-m"),
                i = e.val(),
                a = e.attr("locale");
            a = "en" === a ? "" : "/" + a, window.open(window.location.origin + a + "/search-results?q=" + i, "_self")
        }
    }), $(".sidr-class-btn-primary").click(function() {
        var t = $("#sidr-id-search-m"),
            e = t.val(),
            i = t.attr("locale");
        i = "en" === i ? "" : "/" + i, window.open(window.location.origin + i + "/search-results?q=" + e, "_self")
    })
}

function loadPlaceholer() {
    $(".form-1 .form-group").each(function() {
        var t = $(this).find("label").html();
        $(".control-1").parent().parent().find("label").hide();
        var e = $(t.split('<span class="required">'));
        "*</span>" == e[1] ? $(this).find(".control-1").attr("placeholder", e[0] + "*") : $(this).find(".control-1").attr("placeholder", e[0]), $(this).find("select").addClass("select-2")
    })
}

function removePlaceholer() {
    $(".form-1 .form-group").each(function(t) {
        $(".control-1").parent().parent().find("label").show(), $(".control-1").attr("placeholder", ""), $(this).find("select").removeClass("select-2")
    })
}

function toolbars() {
    $.browser.msie && 8 === parseInt($.browser.version, 10) ? $(".print").on("click", function() {
        return window.print(), window.document.close(), !1
    }) : $(".print").on("click", function() {
        return window.print(), window.close(), !1
    }), $(".text-big").on("click", function() {
        return $(".ico-we-block").addClass("big"), $(".tools-bar .col-sm-4 ul li a").removeClass("active"), $(this).addClass("active"), $("html,body").css("font-size", "110%"), $.localStorage.setItem("currentFontSizeZoom", "big"), editheight(), !1
    }), $(".text-mid").on("click", function() {
        return $(".ico-we-block").removeClass("big"), $(".tools-bar .col-sm-4 ul li a").removeClass("active"), $(this).addClass("active"), $("html,body").css("font-size", "100%"), $.localStorage.setItem("currentFontSizeZoom", "mid"), editheight(), !1
    }), $(".text-sm").on("click", function() {
        return $(".ico-we-block").removeClass("big"), $(".tools-bar .col-sm-4 ul li a").removeClass("active"), $(this).addClass("active"), $("html,body").css("font-size", "88.9%"), $.localStorage.setItem("currentFontSizeZoom", "sm"), editheight(), !1
    });
    var t;
    (t = $.localStorage.getItem("currentFontSizeZoom")) ? $(".text-" + t).click().addClass("active"): ($("html,body").css("font-size", "100%"), $(".text-mid").addClass("active"))
}

function editheight() {
    var t = window.innerWidth;
    if (768 <= t && t <= 959) {
        $(".list-item li").css("height", "auto"), $(".news-item h4").css("height", "auto"), $(".news-item").css("height", "auto"), $(".list-item li").removeClass();
        var e = $(".list-item").length,
            a = 1;
        for (i = 0; i < e; i++) $(".five.list-item").length > 0 ? $(".list-item").eq(i).find("li").each(function(t) {
            t >= 4 * a && a++, $(this).addClass("group-" + i + "-" + a), $(".group-" + i + "-" + a).setAllToMaxHeight()
        }) : $(".list-item").eq(i).find("li").each(function(t) {
            t >= 3 * a && a++, $(this).addClass("group-" + i + "-" + a), $(".group-" + i + "-" + a).setAllToMaxHeight()
        });
        $(".news-item h4").setAllToMaxHeight(), $(".news-item").setAllToMaxHeight()
    } else if (t >= 960) {
        $(".list-item li").css("height", "auto"), $(".news-item h4").css("height", "auto"), $(".news-item").css("height", "auto"), $(".list-item li").removeClass();
        var e = $(".list-item").length,
            a = 1;
        for (i = 0; i < e; i++) $(".five.list-item").length > 0 ? $(".list-item").eq(i).find("li").each(function(t) {
            t >= 5 * a && a++, $(this).addClass("group-" + i + "-" + a), $(".group-" + i + "-" + a).setAllToMaxHeight()
        }) : $(".list-item").eq(i).find("li").each(function(t) {
            t >= 4 * a && a++, $(this).addClass("group-" + i + "-" + a), $(".group-" + i + "-" + a).setAllToMaxHeight()
        });
        $(".news-item h4").setAllToMaxHeight(), $(".news-item").setAllToMaxHeight()
    } else $(".list-item li").css("height", "auto"), $(".news-item h4").css("height", "auto"), $(".news-item").css("height", "auto"), $(".list-item li").removeClass()
}

function scrollToElement(t, e, i) {
    e = void 0 !== e ? e : 1e3, i = void 0 !== i ? i : 0, element = $(t), offset = element.offset(), offsetTop = offset.top + i, $("html, body").animate({
        scrollTop: offsetTop
    }, e)
}

function addCookie(t, e, i) {
    if (i) {
        var a = new Date;
        a.setTime(a.getTime() + 24 * i * 60 * 60 * 1e3);
        o = "; expires=" + a.toGMTString()
    } else var o = "";
    document.cookie = t + "=" + e + o + "; path=/"
}

function checkCookie(t) {
    for (var e = t + "=", i = document.cookie.split(";"), a = 0; a < i.length; a++) {
        for (var o = i[a];
            " " == o.charAt(0);) o = o.substring(1, o.length);
        if (0 == o.indexOf(e)) return o.substring(e.length, o.length)
    }
    return null
}

function deleteCookie(t) {
    addCookie(t, "", -1)
}

function getCookie(t) {
    for (var e = t + "=", i = document.cookie.split(";"), a = 0; a < i.length; a++) {
        for (var o = i[a];
            " " == o.charAt(0);) o = o.substring(1);
        if (0 == o.indexOf(e)) return o.substring(e.length, o.length)
    }
    return ""
}

function storeSalesForceParams(t) {
    var e = "",
        i = $.QueryString.pwsrc;
    if (void 0 != i && "" != i) {
        void 0 == (e = getCookie("pwsrc")) || "" == e ? e = i : -1 == ("," + e + ",").indexOf("," + i + ",") && (e = e + "," + i);
        var a = new Date,
            o = a.getTime() + 6e4 * t;
        a.setTime(o), document.cookie = "pwsrc=" + e + ";expires=" + a.toGMTString() + ";path=/"
    }
}

function youtubePlay() {
    if ($(".youtube-play").length > 0) {
        var t = $(".youtube-play").attr("data-src");
        $(".youtube-play").replaceWith("<iframe width='560' height='315' src=" + t + " frameborder='0' allowfullscreen=''></iframe>")
    }
}

function showBannerPopup() {
    var t = $("#html_tag").attr("lang");
    $.post("/api/ContentApi/GetPopupBannerByPage?culture=" + t, function(t) {
        if ("OK" == t.Result && null != t.Data) {
            var e = t.Data.ExpireDay;
            externallink = t.Data.Link, isFirstLoad = t.Data.IsFirstLoad, mobileLandscape = t.Data.MobileLandscape, mobilePortrait = t.Data.MobilePortrait, tableLandscape = t.Data.TableLandscape, tablePortrait = t.Data.TablePortrait, initHTML(externallink, mobileLandscape, mobilePortrait, tableLandscape, tablePortrait, function() {
                if (1 == isFirstLoad) {
                    var t = new Date;
                    if (null == checkCookie("cookiePopupBanner")) {
                        a = 0;
                        $("#popupBanner img").each(function() {
                            var t = new Image;
                            t.onload = function() {
                                ++a == $("#popupBanner img").length && showPopup()
                            }, t.src = this.src
                        })
                    }
                    t.setDate(t.getDate() + e);
                    var i = "; expires=" + t.toGMTString();
                    document.cookie = "cookiePopupBanner=1" + i + "; path=/"
                } else {
                    var a = 0;
                    $("#popupBanner img").each(function() {
                        var t = new Image;
                        t.onload = function() {
                            ++a == $("#popupBanner img").length && showPopup()
                        }, t.src = this.src
                    })
                }
            })
        } else void 0 !== t.Message && alert(t.Message)
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
            closeBtn: '<a class="fancybox-item fancybox-close">Proceed to Site</a>'
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

function initHTML(t, e, i, a, o, n) {
    var s = "javascript: void(0)",
        l = "",
        r = "";
    "" != t && validateURL(s = t) && (l = "target ='_blank'", r = "rel= 'nofollow'");
    var c = '<a id="popupBanner" style="display:none" href="' + s + '" ' + l + r + '><img class="mobile_landscape" src="' + e + '" alt="" /><img class="mobile_portrait" src="' + i + '" alt="" /><img class="tablet_landscape" src="' + a + '" alt="" /><img class="tablet_portrait" src="' + o + '" alt="" /></a>';
    $("body").append(c), $.isFunction(n) && n()
}

function validateURL(t) {
    return /^(https|http|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/.test(t)
}

function editCheckerHeight() {
    $(".symptom-checker .checker").setAllToMaxHeight()
}

function groupArrayForDesktopAndTablet() {
    $(window).innerWidth;
    var t = $(".list-direction li"),
        e = [],
        i = [],
        a = [],
        o = [];
    a.push(t[0]), o.push(t[0]);
    for (var n = 1, s = t.length; n < s; n++) n % 2 != 0 ? (a.push(t[n]), n == s - 1 && e.push(a)) : (e.push(a), (a = []).push(t[n]), n == s - 1 && e.push(a)), n % 3 != 0 ? (o.push(t[n]), n == s - 1 && i.push(o)) : (i.push(o), (o = []).push(t[n]), n == s - 1 && i.push(o));
    if (window.innerWidth < 992)
        for (var n = 0, s = e.length; n < s; n++) doEqualHeight($(e[n]));
    else if (window.innerWidth >= 992)
        for (var n = 0, s = i.length; n < s; n++) doEqualHeight($(i[n]))
}

function doEqualHeight(t) {
    t.css("height", "auto"), t.setAllToMaxHeight()
}

function checker() {
    $(".symptom-checker .checker").on("click", function(t) {
        t.preventDefault();
        var e = $(this).attr("href");
        $(".cta");
        $(this).hasClass("collapsed") ? ($(this).removeClass("collapsed"), $(e).addClass("check")) : ($(this).addClass("collapsed"), $(e).removeClass("check")), $("#option2").hasClass("in") && $("#option3").hasClass("in") ? $(".samedata").addClass("hide") : $(".samedata").removeClass("hide")
    })
}

function checkAll() {
    $(".check-all").on("click", function(t) {
        t.preventDefault();
        var e, i = $(".cta"),
            a = 0,
            o = $(".option-panel").offset().top;
        $("html, body").animate({
            scrollTop: o - 10
        }, 1e3), $(".option-panel .option.collapse").each(function() {
            var t = $(this);
            t.is(".check") ? t.addClass("in") : t.removeClass("in")
        }), $("#option2").hasClass("in") && $("#option3").hasClass("in") ? $(".samedata").length > 0 && ($(".samedata").addClass("hide"), a += 1) : $(".samedata").length > 0 && $(".samedata").removeClass("hide"), e = ($(".samedata.hide").length = 0) ? $(".option-panel .option.check.in .box-8").length : $(".option-panel .option.check.in .box-8").length - a, $(".option-panel .option.check.in .box-8").length > 1 ? $(".plural").removeClass("hide") : $(".plural").addClass("hide"), 0 === $(".option-panel .option.check.in .box-8").length ? ($(".condition").addClass("hide"), i.removeClass("show").addClass("hide")) : (i.removeClass("hide").addClass("show"), $(".condition").removeClass("hide"), $(".condition .number-condition").text(e))
    })
}

function sportSelect() {
    var t = jQuery("[data-dropdown]"),
        e = jQuery(t.data("wrap")),
        i = t.height(),
        a = t.offset(),
        o = t.find(".sports-select__control"),
        n = jQuery("#sport-list"),
        s = jQuery(window),
        l = jQuery(document);
    o.on("click", function(e) {
        e.stopPropagation(), n.is(".active") ? n.removeClass("active").removeAttr("style") : (i = t.height(), a = t.offset(), n.addClass("active").css({
            top: a.top + i + 1 + "px",
            left: a.left + "px",
            width: t.width() + "px"
        }))
    }), n.find("li").on("click", function() {
        var t = jQuery(this),
            i = jQuery(t.data("target"));
        e.find(">:not(.collapse)").addClass("collapse"), i.removeClass("collapse"), jQuery("html, body").stop().animate({
            scrollTop: i.offset().top
        }, 500, "swing", function() {}), s.scrollTop(i.offset().top), o.text(t.text()), o.trigger("click")
    }), s.on("resize", function() {
        i = t.height(), a = t.offset(), n.is(".active") && n.css({
            top: a.top + i + 1 + "px",
            left: a.left + "px",
            width: t.width() + "px"
        })
    }), l.on("click", function(t) {
        var e = $(t.target);
        n.is(":visible") && !e.parents("#sport-list").length && o.trigger("click")
    })
}
jQuery(document).ready(function(t) {
        t("a[data-parent]").removeAttr("data-parent"), t(".open-accordion").bind("click", function(e) {
            var i = t(this);
            t('.panel-heading a[href="' + i.attr("href") + '"]').click()
        }), t(".scroll").mCustomScrollbar({
            scrollButtons: {
                enable: !1
            },
            advanced: {
                updateOnContentResize: !0
            }
        }), t("img.lazy").lazyload({
            effect: "fadeIn",
            threshold: 200
        }), isMobile() ? tabletMenu() : deskMenu(), t(".list-dr-post, #AreaQuestionsByDoctor, #AreaQuestionDetails, #AreaQuestionBySpecialty").on("click", ".post-main p.style-2 a", function(e) {
            e.preventDefault(), t(this).hasClass("active") ? (t(this).removeClass("active"), t(this).parent().next().slideUp()) : (t(this).addClass("active"), t(this).parent().next().slideDown())
        }), t("#accordion").find("h3").each(function(e) {
            var i = t(this);
            "&nbsp" == i.html() && i.addClass("hideMobile")
        }), t("input, textarea").placeholder(), navMobile(), toolbars(), t(".rate").raty({
            width: "165px",
            numberMax: 5,
            number: 5,
            score: function() {
                return t(this).attr("data-rating")
            },
            click: function(e) {
                var i = t(this).attr("articleid").trim(),
                    a = checkCookie("CookieArticle"),
                    o = !0;
                if (null != a) {
                    for (var n = a.split(","), s = 0; s < n.length; s++) n[s] == i && (o = !1);
                    o ? addCookie("CookieArticle", a += "," + i, "30") : t('.rate[articleid="' + i + '"]').raty("readOnly", !0)
                } else o = !0, addCookie("CookieArticle", a = i, "30");
                o && t.post("/api/SharedArticlesListApi/SaveSharedArticleRating?score=" + e + "&articleid=" + i, function(e) {
                    "OK" == e.Result && (t(".number[articleid='" + i + "']").text("(" + e.NumberUserRating + ")"), t('.rate[articleid="' + i + '"]').raty("score", e.AverageRating), t('.rate[articleid="' + i + '"]').raty("readOnly", !0))
                }, "json")
            },
            readOnly: function() {
                var e = t(this).attr("articleid").trim(),
                    i = checkCookie("CookieArticle");
                if (null != i)
                    for (var a = i.split(","), o = 0; o < a.length; o++)
                        if (a[o] == e) return !0;
                return !1
            }
        }), t(".flexslider").flexslider({
            animation: "fade",
            directionNav: !1,
            slideshowSpeed: 6e3,
            start: function(e) {
                t("body").removeClass("loading"), t(".flex-control-nav").wrap("<div class='container slide-paging'><div class='row'><div class='col-md-12'></div></div></div>")
            },
            before: function() {
                t(".flexslider").resize()
            }
        }), t(".flexslider-1").each(function(e) {
            t(this).find("li").length > 1 && t(this).flexslider({
                animation: "slide",
                directionNav: !1
            })
        });
        var e = t("#hidTotalClinicPhoto").val();
        void 0 === e || isNaN(e) ? t(".flexslider-2").flexslider({
            animation: "slide",
            directionNav: !0,
            animationLoop: !1,
            minItems: 1,
            maxItems: 4,
            move: 1,
            itemWidth: 258,
            itemMargin: 30
        }) : (e = parseInt(e)) <= 3 ? (t(".flexslider-2").removeData("flexslider"), t(".flexslider-2").flexslider({
            animation: "slide",
            slideshow: !1,
            directionNav: !1,
            animationLoop: !1,
            itemWidth: 258,
            itemMargin: 30
        })) : t(".flexslider-2").flexslider({
            animation: "slide",
            directionNav: !0,
            animationLoop: !1,
            minItems: 1,
            maxItems: 4,
            move: 1,
            itemWidth: 258,
            itemMargin: 30
        }), t("#responsive-menu-button").sidr({
            name: "sidr-main",
            source: "#navigation",
            side: "right",
            onOpen: function() {
                t("body").css("width", "100%"), t(".nav-m").css("left", "-260px")
            },
            onClose: function() {
                t("body").css("width", ""), t(".nav-m").css("left", "0")
            }
        }), t("#responsive-search-button").sidr({
            name: "sidr-second",
            source: "#search-mobile",
            side: "right",
            onOpen: function() {
                t("body").css("width", "100%"), t(".nav-m").css("left", "-260px")
            },
            onClose: function() {
                t("body").css("width", ""), t(".nav-m").css("left", "0")
            },
			renaming: false
        }), accordionMobileNav(), t(".datepicker").datepicker({
            dateFormat: "dd-mm-yy",
            changeMonth: !0,
            changeYear: !0,
            yearRange: "1930:+0"
        }), t("#date_from").datepicker({
            numberOfMonths: 1,
            firstDay: 1,
            defaultDate: "+1w",
            dateFormat: "dd-mm-yy",
            minDate: "0",
            maxDate: "+2Y",
            onSelect: function(e) {
                var i = t(this).datepicker("getDate");
                i.setDate(i.getDate() + 0);
                var a = t(this).datepicker("getDate");
                a.setDate(a.getDate() + 30), t("#date_to").datepicker("setDate", null), t("#date_to").datepicker("option", "minDate", i), t("#date_to").datepicker("option", "maxDate", a)
            }
        }), t("#date_to").datepicker({
            numberOfMonths: 1,
            firstDay: 1,
            defaultDate: "+1w",
            dateFormat: "dd-mm-yy",
            minDate: "0",
            maxDate: "+2Y",
            onClose: function(e) {
                t("#from").datepicker("option", "maxDate", e)
            }
        }), t(".fancybox").fancybox({
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
        }), t(".fancybox-gallery").fancybox({
            helpers: {
                title: null
            },
            transitionIn: "none",
            transitionOut: "none",
            prevEffect: "none",
            nextEffect: "none",
            padding: 10,
            beforeShow: function() {
                t(".fancybox-skin").addClass("style-2")
            }
        }), t(".fancybox-media").click(function() {
            return t.fancybox({
                padding: 20,
                transitionIn: "none",
                transitionOut: "none",
                title: this.title,
                width: "500",
                height: "400",
                href: this.href.replace(new RegExp("youtu.be", "i"), "www.youtube.com/embed").replace(new RegExp("watch\\?v=([a-z0-9_-]+)(&|\\?)?(.*)", "i"), "embed/$1?version=3&$3"),
                type: "iframe",
                afterShow: function() {
                    t(".fancybox-skin").addClass("video-popup")
                }
            }), !1
        }), submitSearch(), t("#accordion .panel-heading").find("a").bind("click", function() {
            var e = t(this);
            setTimeout(function() {
                t("html, body").animate({
                    scrollTop: e.offset().top - 10
                }, 300)
            }, 500);
            setTimeout(function() {
                editheight()
            }, 500), setTimeout(function() {
                var e = t(".flexslider-1").data("flexslider");
                e && e.resize()
            }, 100)
        }), isMobile() ? (t(".switch").bind("touchstart", function() {
            t(this).hasClass("active") ? (t(this).removeClass("active"), t(this).parent().find(".anatomy").css("margin-left", "0")) : (t(this).addClass("active"), t(this).parent().find(".anatomy").css("margin-left", "-285px"))
        }), t(".gotop").bind("touchstart", function() {
            scrollToElement(".anatomy", "slow", 0)
        })) : (t(".switch").bind("click", function() {
            t(this).hasClass("active") ? (t(this).removeClass("active"), t(this).parent().find(".anatomy").css("margin-left", "0")) : (t(this).addClass("active"), t(this).parent().find(".anatomy").css("margin-left", "-285px"))
        }), t(".gotop").bind("click", function() {
            scrollToElement(".anatomy", "slow", 0)
        })), t("a").each(function(e) {
            if (void 0 !== t(this).attr("href")) {
                var i = t(this).attr("href").split("/"),
                    a = i.length;
                if (a > 1 && "makeappointment" == i[a - 1].toLowerCase()) {
                    var o = t("html").attr("lang");
                    "en" !== o ? t(this).attr("href", "/" + o + "/make-appointment") : t(this).attr("href", "/make-appointment")
                }
            }
        }), t(".panel-direct").on("click", function(e) {
            e.preventDefault();
            var i = t(this).attr("href");
            t(i).addClass("in"), t(i).siblings().find("a").addClass("active"), t("#accordion li.panel:first-child h2 a").addClass("active");
            var a = t(i).siblings("h2").height() + 12;
            t(i).css("height", "auto"), t("html, body").animate({
                scrollTop: t(i).offset().top - a
            }, 1e3)
        }), t("#btnScrollTop").on("click", function(e) {
            e.preventDefault(), t("body,html").animate({
                scrollTop: 0
            }, 600)
        }), t("#btnSystomScrollTop").on("click", function(e) {
            e.preventDefault();
            var i = t(t(this).data("target")).offset().top;
            t("body,html").animate({
                scrollTop: i - 10
            }, 600)
        }), getMobileOperatingSystem();
        var a = t(window),
            o = t(".nav-m.is-mobile").is(":visible");
        a.on("resize.footer", function() {
            t(".homepage").length && (t(".container.block-1").height() < 100 && t(".container.list-news").height() < 100 && isMobile() && (o ? a.width() < 480 ? a.height() > 480 && t(".footer").css({
                position: "fixed",
                bottom: t(".nav-m.is-mobile").height(),
                "margin-bottom": 0
            }) : t(".footer").css({
                position: "static",
                bottom: 0,
                "margin-bottom": 76
            }) : a.width() < 992 ? t(".footer").css({
                position: "fixed",
                bottom: 0
            }) : t(".footer").css({
                position: "relative",
                bottom: 0
            })), t(".container.block-1").height() < 100 && t(".container.list-news").height() < 100 && !isMobile() && t(".footer").css({
                position: "fixed",
                bottom: 0,
                width: "100%"
            }))
        }).trigger("resize.footer"), editCheckerHeight(), checkAll(), checker(), sportSelect()
    }), $(window).scroll(function() {
        clearTimeout($.data(this, "scrollTimerBottom")), $.data(this, "scrollTimerBottom", setTimeout(function() {
            $(this).scrollTop() > 100 ? $("#btnScrollTop").fadeIn() : $("#btnScrollTop").fadeOut()
        }, 250)), clearTimeout($.data(this, "scrollSystemBottom")), $.data(this, "scrollSystemBottom", setTimeout(function() {
            $(this).scrollTop() > 100 ? $("#btnSystomScrollTop").fadeIn() : $("#btnSystomScrollTop").fadeOut()
        }, 250))
    }), $(window).bind("load", function() {
        editheight(), storeSalesForceParams(30), showBannerPopup(), youtubePlay(), groupArrayForDesktopAndTablet()
    }), $.fn.setAllToMaxHeight = function() {
        return this.height(Math.max.apply(this, $.map(this, function(t) {
            return $(t).height()
        })))
    }, jQuery(window).resize(function() {
        $(window).width();
        var t = $("html,body");
        $("html,body").width() <= 767 ? loadPlaceholer() : (removePlaceholer(), t.hasClass("sidr-main-open") && $("#responsive-menu-button").trigger("click"), t.hasClass("sidr-second-open") && $("#responsive-search-button").trigger("click")), $("html,body").width() <= 959 ? $(".sub-main-nav > div").css("height", "auto") : $(".main-nav ul li.active .sub-main-nav > div").setAllToMaxHeight(), editheight(), $(".anatomy").css("margin-left", "0"), groupArrayForDesktopAndTablet()
    }).trigger("resize"),
    function(t) {
        t.QueryString = function(t) {
            if ("" == t) return {};
            for (var e = {}, i = 0; i < t.length; ++i) {
                var a = t[i].split("=");
                2 == a.length && (e[a[0]] = decodeURIComponent(a[1].replace(/\+/g, " ")))
            }
            return e
        }(window.location.search.substr(1).split("&"))
    }(jQuery);
	
	
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
	
	_st('install','B5Ksiu3oJgnTucJn3F5c','2.0.0', {
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
$(window).load(function(){
	var lang = $('html').attr('lang');
	
	if(lang == 'en'){
		$.getScript('https://cdn.polyfill.io/v2/polyfill.min.js');
		$.getScript('https://files.keyreply.com/live/static/js/app.js');
		
		// window.kr_settings = {
		// 	initialState: {
		// 	  hospital: 'PEH',
		// 	  hospitalRoot: 'https://www.parkwayeast.com.sg',
		// 	  hospitalName: 'Parkway East Hospital',
		// 	},
		// 	id: "25406c0954",
		// 	logo: "https://keyreplyparkwayprod.blob.core.windows.net/files/images/pam-icon.svg",
		// 	botIcon: "https://keyreplyparkwayprod.blob.core.windows.net/files/images/parkway-east.svg",
		// 	headerBorderColor: "#f79021",
		// 	agentBubbleColor: "#fff",
		// 	agentTextColor: "#595a5c",
		// 	userBubbleColor: "#fed4a9"
        // }
        window.kr_settings = {
            initialState: {
              hospital: 'PEH',
              hospitalRoot: 'https://www.parkwayeast.com.sg',
              hospitalName: 'Parkway East Hospital',
            },
            id: "25406c0954",
            logo: "https://keyreplyparkwayprod.blob.core.windows.net/files/images/pam-icon.svg",
            botIcon: "https://keyreplyparkwayprod.blob.core.windows.net/files/images/parkway-east.svg",
            headerBorderColor: "#f79021",
            agentBubbleColor: "#fff",
            agentTextColor: "#595a5c",
            userBubbleColor: "#fed4a9"
          }   
	}
	
})


/* Doctor Readmore script */
function expandPanel() {
    $(".dr-qa #collapseOne").hasClass("collapse") && ($(".dr-qa #collapseOne").removeClass("collapse"), $(".dr-qa #collapseOne").addClass("in"), $(".dr-qa #collapseOne").removeAttr("style"), $(".heading-qa .getting-know").removeClass("collapsed"))
}

function toggleAnswer() {
    $(".dr-qa .fck").each(function() {
        var a = $(this).html().trim(),
            b = "",
            c = a.indexOf("#readmore");
        c > 0 ? (b = a.substring(0, c - 1), $(this).html(b)) : ($(this).html(a), $(this).next().hide()), $(this).next().find(".more").click(function(b) {
            b.preventDefault(b), $(this).parent().prev().html(a.replace("#readmore", "")), $(this).next().show(), $(this).hide()
        }), $(this).next().find(".less").click(function(a) {
            a.preventDefault(a), $(this).parent().prev().html(b), $(this).prev().show(), $(this).hide()
        })
    })
}
$(document).ready(function(){
	toggleAnswer();
})
