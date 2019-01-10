! function(a) {
  a.flexslider = function(b, c) {
    var d = a(b);
    d.vars = a.extend({}, a.flexslider.defaults, c);
    var j, e = d.vars.namespace,
      f = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
      g = ("ontouchstart" in window || f || window.DocumentTouch && document instanceof DocumentTouch) && d.vars.touch,
      h = "click touchend MSPointerUp",
      i = "",
      k = "vertical" === d.vars.direction,
      l = d.vars.reverse,
      m = d.vars.itemWidth > 0,
      n = "fade" === d.vars.animation,
      o = "" !== d.vars.asNavFor,
      p = {},
      q = !0;
    a.data(b, "flexslider", d), p = {
      init: function() {
        d.animating = !1, d.currentSlide = parseInt(d.vars.startAt ? d.vars.startAt : 0), isNaN(d.currentSlide) && (d.currentSlide = 0), d.animatingTo = d.currentSlide, d.atEnd = 0 === d.currentSlide || d.currentSlide === d.last, d.containerSelector = d.vars.selector.substr(0, d.vars.selector.search(" ")), d.slides = a(d.vars.selector, d), d.container = a(d.containerSelector, d), d.count = d.slides.length, d.syncExists = a(d.vars.sync).length > 0, "slide" === d.vars.animation && (d.vars.animation = "swing"), d.prop = k ? "top" : "marginLeft", d.args = {}, d.manualPause = !1, d.stopped = !1, d.started = !1, d.startTimeout = null, d.transitions = !d.vars.video && !n && d.vars.useCSS && function() {
          var a = document.createElement("div"),
            b = ["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"];
          for (var c in b)
            if (void 0 !== a.style[b[c]]) return d.pfx = b[c].replace("Perspective", "").toLowerCase(), d.prop = "-" + d.pfx + "-transform", !0;
          return !1
        }(), "" !== d.vars.controlsContainer && (d.controlsContainer = a(d.vars.controlsContainer).length > 0 && a(d.vars.controlsContainer)), "" !== d.vars.manualControls && (d.manualControls = a(d.vars.manualControls).length > 0 && a(d.vars.manualControls)), d.vars.randomize && (d.slides.sort(function() {
          return Math.round(Math.random()) - .5
        }), d.container.empty().append(d.slides)), d.doMath(), d.setup("init"), d.vars.controlNav && p.controlNav.setup(), d.vars.directionNav && p.directionNav.setup(), d.vars.keyboard && (1 === a(d.containerSelector).length || d.vars.multipleKeyboard) && a(document).bind("keyup", function(a) {
          var b = a.keyCode;
          if (!d.animating && (39 === b || 37 === b)) {
            var c = 39 === b ? d.getTarget("next") : 37 === b ? d.getTarget("prev") : !1;
            d.flexAnimate(c, d.vars.pauseOnAction)
          }
        }), d.vars.mousewheel && d.bind("mousewheel", function(a, b) {
          a.preventDefault();
          var f = 0 > b ? d.getTarget("next") : d.getTarget("prev");
          d.flexAnimate(f, d.vars.pauseOnAction)
        }), d.vars.pausePlay && p.pausePlay.setup(), d.vars.slideshow && d.vars.pauseInvisible && p.pauseInvisible.init(), d.vars.slideshow && (d.vars.pauseOnHover && d.hover(function() {
          d.manualPlay || d.manualPause || d.pause()
        }, function() {
          d.manualPause || d.manualPlay || d.stopped || d.play()
        }), d.vars.pauseInvisible && p.pauseInvisible.isHidden() || (d.vars.initDelay > 0 ? d.startTimeout = setTimeout(d.play, d.vars.initDelay) : d.play())), o && p.asNav.setup(), g && d.vars.touch && p.touch(), (!n || n && d.vars.smoothHeight) && a(window).bind("resize orientationchange focus", p.resize), d.find("img").attr("draggable", "false"), setTimeout(function() {
          d.vars.start(d)
        }, 200)
      },
      asNav: {
        setup: function() {
          d.asNav = !0, d.animatingTo = Math.floor(d.currentSlide / d.move), d.currentItem = d.currentSlide, d.slides.removeClass(e + "active-slide").eq(d.currentItem).addClass(e + "active-slide"), f ? (b._slider = d, d.slides.each(function() {
            var b = this;
            b._gesture = new MSGesture, b._gesture.target = b, b.addEventListener("MSPointerDown", function(a) {
              a.preventDefault(), a.currentTarget._gesture && a.currentTarget._gesture.addPointer(a.pointerId)
            }, !1), b.addEventListener("MSGestureTap", function(b) {
              b.preventDefault();
              var c = a(this),
                e = c.index();
              a(d.vars.asNavFor).data("flexslider").animating || c.hasClass("active") || (d.direction = d.currentItem < e ? "next" : "prev", d.flexAnimate(e, d.vars.pauseOnAction, !1, !0, !0))
            })
          })) : d.slides.click(function(b) {
            b.preventDefault();
            var c = a(this),
              f = c.index(),
              g = c.offset().left - a(d).scrollLeft();
            0 >= g && c.hasClass(e + "active-slide") ? d.flexAnimate(d.getTarget("prev"), !0) : a(d.vars.asNavFor).data("flexslider").animating || c.hasClass(e + "active-slide") || (d.direction = d.currentItem < f ? "next" : "prev", d.flexAnimate(f, d.vars.pauseOnAction, !1, !0, !0))
          })
        }
      },
      controlNav: {
        setup: function() {
          d.manualControls ? p.controlNav.setupManual() : p.controlNav.setupPaging()
        },
        setupPaging: function() {
          var f, g, b = "thumbnails" === d.vars.controlNav ? "control-thumbs" : "control-paging",
            c = 1;
          if (d.controlNavScaffold = a('<ol class="' + e + "control-nav " + e + b + '"></ol>'), d.pagingCount > 1)
            for (var j = 0; j < d.pagingCount; j++) {
              if (g = d.slides.eq(j), f = "thumbnails" === d.vars.controlNav ? '<img src="' + g.attr("data-thumb") + '"/>' : "<a>" + c + "</a>", "thumbnails" === d.vars.controlNav && !0 === d.vars.thumbCaptions) {
                var k = g.attr("data-thumbcaption");
                "" != k && void 0 != k && (f += '<span class="' + e + 'caption">' + k + "</span>")
              }
              d.controlNavScaffold.append("<li>" + f + "</li>"), c++
            }
          d.controlsContainer ? a(d.controlsContainer).append(d.controlNavScaffold) : d.append(d.controlNavScaffold), p.controlNav.set(), p.controlNav.active(), d.controlNavScaffold.delegate("a, img", h, function(b) {
            if (b.preventDefault(), "" === i || i === b.type) {
              var c = a(this),
                f = d.controlNav.index(c);
              c.hasClass(e + "active") || (d.direction = f > d.currentSlide ? "next" : "prev", d.flexAnimate(f, d.vars.pauseOnAction))
            }
            "" === i && (i = b.type), p.setToClearWatchedEvent()
          })
        },
        setupManual: function() {
          d.controlNav = d.manualControls, p.controlNav.active(), d.controlNav.bind(h, function(b) {
            if (b.preventDefault(), "" === i || i === b.type) {
              var c = a(this),
                f = d.controlNav.index(c);
              c.hasClass(e + "active") || (d.direction = f > d.currentSlide ? "next" : "prev", d.flexAnimate(f, d.vars.pauseOnAction))
            }
            "" === i && (i = b.type), p.setToClearWatchedEvent()
          })
        },
        set: function() {
          var b = "thumbnails" === d.vars.controlNav ? "img" : "a";
          d.controlNav = a("." + e + "control-nav li " + b, d.controlsContainer ? d.controlsContainer : d)
        },
        active: function() {
          d.controlNav.removeClass(e + "active").eq(d.animatingTo).addClass(e + "active")
        },
        update: function(b, c) {
          d.pagingCount > 1 && "add" === b ? d.controlNavScaffold.append(a("<li><a>" + d.count + "</a></li>")) : 1 === d.pagingCount ? d.controlNavScaffold.find("li").remove() : d.controlNav.eq(c).closest("li").remove(), p.controlNav.set(), d.pagingCount > 1 && d.pagingCount !== d.controlNav.length ? d.update(c, b) : p.controlNav.active()
        }
      },
      directionNav: {
        setup: function() {
          var b = a('<ul class="' + e + 'direction-nav"><li><a class="' + e + 'prev" href="#">' + d.vars.prevText + '</a></li><li><a class="' + e + 'next" href="#">' + d.vars.nextText + "</a></li></ul>");
          d.controlsContainer ? (a(d.controlsContainer).append(b), d.directionNav = a("." + e + "direction-nav li a", d.controlsContainer)) : (d.append(b), d.directionNav = a("." + e + "direction-nav li a", d)), p.directionNav.update(), d.directionNav.bind(h, function(b) {
            b.preventDefault();
            var c;
            ("" === i || i === b.type) && (c = a(this).hasClass(e + "next") ? d.getTarget("next") : d.getTarget("prev"), d.flexAnimate(c, d.vars.pauseOnAction)), "" === i && (i = b.type), p.setToClearWatchedEvent()
          })
        },
        update: function() {
          var a = e + "disabled";
          1 === d.pagingCount ? d.directionNav.addClass(a).attr("tabindex", "-1") : d.vars.animationLoop ? d.directionNav.removeClass(a).removeAttr("tabindex") : 0 === d.animatingTo ? d.directionNav.removeClass(a).filter("." + e + "prev").addClass(a).attr("tabindex", "-1") : d.animatingTo === d.last ? d.directionNav.removeClass(a).filter("." + e + "next").addClass(a).attr("tabindex", "-1") : d.directionNav.removeClass(a).removeAttr("tabindex")
        }
      },
      pausePlay: {
        setup: function() {
          var b = a('<div class="' + e + 'pauseplay"><a></a></div>');
          d.controlsContainer ? (d.controlsContainer.append(b), d.pausePlay = a("." + e + "pauseplay a", d.controlsContainer)) : (d.append(b), d.pausePlay = a("." + e + "pauseplay a", d)), p.pausePlay.update(d.vars.slideshow ? e + "pause" : e + "play"), d.pausePlay.bind(h, function(b) {
            b.preventDefault(), ("" === i || i === b.type) && (a(this).hasClass(e + "pause") ? (d.manualPause = !0, d.manualPlay = !1, d.pause()) : (d.manualPause = !1, d.manualPlay = !0, d.play())), "" === i && (i = b.type), p.setToClearWatchedEvent()
          })
        },
        update: function(a) {
          "play" === a ? d.pausePlay.removeClass(e + "pause").addClass(e + "play").html(d.vars.playText) : d.pausePlay.removeClass(e + "play").addClass(e + "pause").html(d.vars.pauseText)
        }
      },
      touch: function() {
        function r(f) {
          d.animating ? f.preventDefault() : (window.navigator.msPointerEnabled || 1 === f.touches.length) && (d.pause(), g = k ? d.h : d.w, i = Number(new Date), o = f.touches[0].pageX, p = f.touches[0].pageY, e = m && l && d.animatingTo === d.last ? 0 : m && l ? d.limit - (d.itemW + d.vars.itemMargin) * d.move * d.animatingTo : m && d.currentSlide === d.last ? d.limit : m ? (d.itemW + d.vars.itemMargin) * d.move * d.currentSlide : l ? (d.last - d.currentSlide + d.cloneOffset) * g : (d.currentSlide + d.cloneOffset) * g, a = k ? p : o, c = k ? o : p, b.addEventListener("touchmove", s, !1), b.addEventListener("touchend", t, !1))
        }

        function s(b) {
          o = b.touches[0].pageX, p = b.touches[0].pageY, h = k ? a - p : a - o, j = k ? Math.abs(h) < Math.abs(o - c) : Math.abs(h) < Math.abs(p - c);
          var f = 500;
          (!j || Number(new Date) - i > f) && (b.preventDefault(), !n && d.transitions && (d.vars.animationLoop || (h /= 0 === d.currentSlide && 0 > h || d.currentSlide === d.last && h > 0 ? Math.abs(h) / g + 2 : 1), d.setProps(e + h, "setTouch")))
        }

        function t() {
          if (b.removeEventListener("touchmove", s, !1), d.animatingTo === d.currentSlide && !j && null !== h) {
            var k = l ? -h : h,
              m = k > 0 ? d.getTarget("next") : d.getTarget("prev");
            d.canAdvance(m) && (Number(new Date) - i < 550 && Math.abs(k) > 50 || Math.abs(k) > g / 2) ? d.flexAnimate(m, d.vars.pauseOnAction) : n || d.flexAnimate(d.currentSlide, d.vars.pauseOnAction, !0)
          }
          b.removeEventListener("touchend", t, !1), a = null, c = null, h = null, e = null
        }

        function u(a) {
          a.stopPropagation(), d.animating ? a.preventDefault() : (d.pause(), b._gesture.addPointer(a.pointerId), q = 0, g = k ? d.h : d.w, i = Number(new Date), e = m && l && d.animatingTo === d.last ? 0 : m && l ? d.limit - (d.itemW + d.vars.itemMargin) * d.move * d.animatingTo : m && d.currentSlide === d.last ? d.limit : m ? (d.itemW + d.vars.itemMargin) * d.move * d.currentSlide : l ? (d.last - d.currentSlide + d.cloneOffset) * g : (d.currentSlide + d.cloneOffset) * g)
        }

        function v(a) {
          a.stopPropagation();
          var c = a.target._slider;
          if (c) {
            var d = -a.translationX,
              f = -a.translationY;
            return q += k ? f : d, h = q, j = k ? Math.abs(q) < Math.abs(-d) : Math.abs(q) < Math.abs(-f), a.detail === a.MSGESTURE_FLAG_INERTIA ? (setImmediate(function() {
              b._gesture.stop()
            }), void 0) : ((!j || Number(new Date) - i > 500) && (a.preventDefault(), !n && c.transitions && (c.vars.animationLoop || (h = q / (0 === c.currentSlide && 0 > q || c.currentSlide === c.last && q > 0 ? Math.abs(q) / g + 2 : 1)), c.setProps(e + h, "setTouch"))), void 0)
          }
        }

        function w(b) {
          b.stopPropagation();
          var d = b.target._slider;
          if (d) {
            if (d.animatingTo === d.currentSlide && !j && null !== h) {
              var f = l ? -h : h,
                k = f > 0 ? d.getTarget("next") : d.getTarget("prev");
              d.canAdvance(k) && (Number(new Date) - i < 550 && Math.abs(f) > 50 || Math.abs(f) > g / 2) ? d.flexAnimate(k, d.vars.pauseOnAction) : n || d.flexAnimate(d.currentSlide, d.vars.pauseOnAction, !0)
            }
            a = null, c = null, h = null, e = null, q = 0
          }
        }
        var a, c, e, g, h, i, j = !1,
          o = 0,
          p = 0,
          q = 0;
        f ? (b.style.msTouchAction = "none", b._gesture = new MSGesture, b._gesture.target = b, b.addEventListener("MSPointerDown", u, !1), b._slider = d, b.addEventListener("MSGestureChange", v, !1), b.addEventListener("MSGestureEnd", w, !1)) : b.addEventListener("touchstart", r, !1)
      },
      resize: function() {
        !d.animating && d.is(":visible") && (m || d.doMath(), n ? p.smoothHeight() : m ? (d.slides.width(d.computedW), d.update(d.pagingCount), d.setProps()) : k ? (d.viewport.height(d.h), d.setProps(d.h, "setTotal")) : (d.vars.smoothHeight && p.smoothHeight(), d.newSlides.width(d.computedW), d.setProps(d.computedW, "setTotal")))
      },
      smoothHeight: function(a) {
        if (!k || n) {
          var b = n ? d : d.viewport;
          a ? b.animate({
            height: d.slides.eq(d.animatingTo).height()
          }, a) : b.height(d.slides.eq(d.animatingTo).height())
        }
      },
      sync: function(b) {
        var c = a(d.vars.sync).data("flexslider"),
          e = d.animatingTo;
        switch (b) {
          case "animate":
            c.flexAnimate(e, d.vars.pauseOnAction, !1, !0);
            break;
          case "play":
            c.playing || c.asNav || c.play();
            break;
          case "pause":
            c.pause()
        }
      },
      pauseInvisible: {
        visProp: null,
        init: function() {
          var a = ["webkit", "moz", "ms", "o"];
          if ("hidden" in document) return "hidden";
          for (var b = 0; b < a.length; b++) a[b] + "Hidden" in document && (p.pauseInvisible.visProp = a[b] + "Hidden");
          if (p.pauseInvisible.visProp) {
            var c = p.pauseInvisible.visProp.replace(/[H|h]idden/, "") + "visibilitychange";
            document.addEventListener(c, function() {
              p.pauseInvisible.isHidden() ? d.startTimeout ? clearTimeout(d.startTimeout) : d.pause() : d.started ? d.play() : d.vars.initDelay > 0 ? setTimeout(d.play, d.vars.initDelay) : d.play()
            })
          }
        },
        isHidden: function() {
          return document[p.pauseInvisible.visProp] || !1
        }
      },
      setToClearWatchedEvent: function() {
        clearTimeout(j), j = setTimeout(function() {
          i = ""
        }, 3e3)
      }
    }, d.flexAnimate = function(b, c, f, h, i) {
      if (d.vars.animationLoop || b === d.currentSlide || (d.direction = b > d.currentSlide ? "next" : "prev"), o && 1 === d.pagingCount && (d.direction = d.currentItem < b ? "next" : "prev"), !d.animating && (d.canAdvance(b, i) || f) && d.is(":visible")) {
        if (o && h) {
          var j = a(d.vars.asNavFor).data("flexslider");
          if (d.atEnd = 0 === b || b === d.count - 1, j.flexAnimate(b, !0, !1, !0, i), d.direction = d.currentItem < b ? "next" : "prev", j.direction = d.direction, Math.ceil((b + 1) / d.visible) - 1 === d.currentSlide || 0 === b) return d.currentItem = b, d.slides.removeClass(e + "active-slide").eq(b).addClass(e + "active-slide"), !1;
          d.currentItem = b, d.slides.removeClass(e + "active-slide").eq(b).addClass(e + "active-slide"), b = Math.floor(b / d.visible)
        }
        if (d.animating = !0, d.animatingTo = b, c && d.pause(), d.vars.before(d), d.syncExists && !i && p.sync("animate"), d.vars.controlNav && p.controlNav.active(), m || d.slides.removeClass(e + "active-slide").eq(b).addClass(e + "active-slide"), d.atEnd = 0 === b || b === d.last, d.vars.directionNav && p.directionNav.update(), b === d.last && (d.vars.end(d), d.vars.animationLoop || d.pause()), n) g ? (d.slides.eq(d.currentSlide).css({
          opacity: 0,
          zIndex: 1
        }), d.slides.eq(b).css({
          opacity: 1,
          zIndex: 2
        }), d.wrapup(q)) : (d.slides.eq(d.currentSlide).css({
          zIndex: 1
        }).animate({
          opacity: 0
        }, d.vars.animationSpeed, d.vars.easing), d.slides.eq(b).css({
          zIndex: 2
        }).animate({
          opacity: 1
        }, d.vars.animationSpeed, d.vars.easing, d.wrapup));
        else {
          var r, s, t, q = k ? d.slides.filter(":first").height() : d.computedW;
          m ? (r = d.vars.itemMargin, t = (d.itemW + r) * d.move * d.animatingTo, s = t > d.limit && 1 !== d.visible ? d.limit : t) : s = 0 === d.currentSlide && b === d.count - 1 && d.vars.animationLoop && "next" !== d.direction ? l ? (d.count + d.cloneOffset) * q : 0 : d.currentSlide === d.last && 0 === b && d.vars.animationLoop && "prev" !== d.direction ? l ? 0 : (d.count + 1) * q : l ? (d.count - 1 - b + d.cloneOffset) * q : (b + d.cloneOffset) * q, d.setProps(s, "", d.vars.animationSpeed), d.transitions ? (d.vars.animationLoop && d.atEnd || (d.animating = !1, d.currentSlide = d.animatingTo), d.container.unbind("webkitTransitionEnd transitionend"), d.container.bind("webkitTransitionEnd transitionend", function() {
            d.wrapup(q)
          })) : d.container.animate(d.args, d.vars.animationSpeed, d.vars.easing, function() {
            d.wrapup(q)
          })
        }
        d.vars.smoothHeight && p.smoothHeight(d.vars.animationSpeed)
      }
    }, d.wrapup = function(a) {
      n || m || (0 === d.currentSlide && d.animatingTo === d.last && d.vars.animationLoop ? d.setProps(a, "jumpEnd") : d.currentSlide === d.last && 0 === d.animatingTo && d.vars.animationLoop && d.setProps(a, "jumpStart")), d.animating = !1, d.currentSlide = d.animatingTo, d.vars.after(d)
    }, d.animateSlides = function() {
      !d.animating && q && d.flexAnimate(d.getTarget("next"))
    }, d.pause = function() {
      clearInterval(d.animatedSlides), d.animatedSlides = null, d.playing = !1, d.vars.pausePlay && p.pausePlay.update("play"), d.syncExists && p.sync("pause")
    }, d.play = function() {
      d.playing && clearInterval(d.animatedSlides), d.animatedSlides = d.animatedSlides || setInterval(d.animateSlides, d.vars.slideshowSpeed), d.started = d.playing = !0, d.vars.pausePlay && p.pausePlay.update("pause"), d.syncExists && p.sync("play")
    }, d.stop = function() {
      d.pause(), d.stopped = !0
    }, d.canAdvance = function(a, b) {
      var c = o ? d.pagingCount - 1 : d.last;
      return b ? !0 : o && d.currentItem === d.count - 1 && 0 === a && "prev" === d.direction ? !0 : o && 0 === d.currentItem && a === d.pagingCount - 1 && "next" !== d.direction ? !1 : a !== d.currentSlide || o ? d.vars.animationLoop ? !0 : d.atEnd && 0 === d.currentSlide && a === c && "next" !== d.direction ? !1 : d.atEnd && d.currentSlide === c && 0 === a && "next" === d.direction ? !1 : !0 : !1
    }, d.getTarget = function(a) {
      return d.direction = a, "next" === a ? d.currentSlide === d.last ? 0 : d.currentSlide + 1 : 0 === d.currentSlide ? d.last : d.currentSlide - 1
    }, d.setProps = function(a, b, c) {
      var e = function() {
        var c = a ? a : (d.itemW + d.vars.itemMargin) * d.move * d.animatingTo,
          e = function() {
            if (m) return "setTouch" === b ? a : l && d.animatingTo === d.last ? 0 : l ? d.limit - (d.itemW + d.vars.itemMargin) * d.move * d.animatingTo : d.animatingTo === d.last ? d.limit : c;
            switch (b) {
              case "setTotal":
                return l ? (d.count - 1 - d.currentSlide + d.cloneOffset) * a : (d.currentSlide + d.cloneOffset) * a;
              case "setTouch":
                return l ? a : a;
              case "jumpEnd":
                return l ? a : d.count * a;
              case "jumpStart":
                return l ? d.count * a : a;
              default:
                return a
            }
          }();
        return -1 * e + "px"
      }();
      d.transitions && (e = k ? "translate3d(0," + e + ",0)" : "translate3d(" + e + ",0,0)", c = void 0 !== c ? c / 1e3 + "s" : "0s", d.container.css("-" + d.pfx + "-transition-duration", c)), d.args[d.prop] = e, (d.transitions || void 0 === c) && d.container.css(d.args)
    }, d.setup = function(b) {
      if (n) d.slides.css({
        width: "100%",
        "float": "left",
        marginRight: "-100%",
        position: "relative"
      }), "init" === b && (g ? d.slides.css({
        opacity: 0,
        display: "block",
        webkitTransition: "opacity " + d.vars.animationSpeed / 1e3 + "s ease",
        zIndex: 1
      }).eq(d.currentSlide).css({
        opacity: 1,
        zIndex: 2
      }) : d.slides.css({
        opacity: 0,
        display: "block",
        zIndex: 1
      }).eq(d.currentSlide).css({
        zIndex: 2
      }).animate({
        opacity: 1
      }, d.vars.animationSpeed, d.vars.easing)), d.vars.smoothHeight && p.smoothHeight();
      else {
        var c, f;
        "init" === b && (d.viewport = a('<div class="' + e + 'viewport"></div>').css({
          overflow: "hidden",
          position: "relative"
        }).appendTo(d).append(d.container), d.cloneCount = 0, d.cloneOffset = 0, l && (f = a.makeArray(d.slides).reverse(), d.slides = a(f), d.container.empty().append(d.slides))), d.vars.animationLoop && !m && (d.cloneCount = 2, d.cloneOffset = 1, "init" !== b && d.container.find(".clone").remove(), d.container.append(d.slides.first().clone().addClass("clone").attr("aria-hidden", "true")).prepend(d.slides.last().clone().addClass("clone").attr("aria-hidden", "true"))), d.newSlides = a(d.vars.selector, d), c = l ? d.count - 1 - d.currentSlide + d.cloneOffset : d.currentSlide + d.cloneOffset, k && !m ? (d.container.height(200 * (d.count + d.cloneCount) + "%").css("position", "absolute").width("100%"), setTimeout(function() {
          d.newSlides.css({
            display: "block"
          }), d.doMath(), d.viewport.height(d.h), d.setProps(c * d.h, "init")
        }, "init" === b ? 100 : 0)) : (d.container.width(200 * (d.count + d.cloneCount) + "%"), d.setProps(c * d.computedW, "init"), setTimeout(function() {
          d.doMath(), d.newSlides.css({
            width: d.computedW,
            "float": "left",
            display: "block"
          }), d.vars.smoothHeight && p.smoothHeight()
        }, "init" === b ? 100 : 0))
      }
      m || d.slides.removeClass(e + "active-slide").eq(d.currentSlide).addClass(e + "active-slide")
    }, d.doMath = function() {
      var a = d.slides.first(),
        b = d.vars.itemMargin,
        c = d.vars.minItems,
        e = d.vars.maxItems;
      d.w = void 0 === d.viewport ? d.width() : d.viewport.width(), d.h = a.height(), d.boxPadding = a.outerWidth() - a.width(), m ? (d.itemT = d.vars.itemWidth + b, d.minW = c ? c * d.itemT : d.w, d.maxW = e ? e * d.itemT - b : d.w, d.itemW = d.minW > d.w ? (d.w - b * (c - 1)) / c : d.maxW < d.w ? (d.w - b * (e - 1)) / e : d.vars.itemWidth > d.w ? d.w : d.vars.itemWidth, d.visible = Math.floor(d.w / d.itemW), d.move = d.vars.move > 0 && d.vars.move < d.visible ? d.vars.move : d.visible, d.pagingCount = Math.ceil((d.count - d.visible) / d.move + 1), d.last = d.pagingCount - 1, d.limit = 1 === d.pagingCount ? 0 : d.vars.itemWidth > d.w ? d.itemW * (d.count - 1) + b * (d.count - 1) : (d.itemW + b) * d.count - d.w - b) : (d.itemW = d.w, d.pagingCount = d.count, d.last = d.count - 1), d.computedW = d.itemW - d.boxPadding
    }, d.update = function(a, b) {
      d.doMath(), m || (a < d.currentSlide ? d.currentSlide += 1 : a <= d.currentSlide && 0 !== a && (d.currentSlide -= 1), d.animatingTo = d.currentSlide), d.vars.controlNav && !d.manualControls && ("add" === b && !m || d.pagingCount > d.controlNav.length ? p.controlNav.update("add") : ("remove" === b && !m || d.pagingCount < d.controlNav.length) && (m && d.currentSlide > d.last && (d.currentSlide -= 1, d.animatingTo -= 1), p.controlNav.update("remove", d.last))), d.vars.directionNav && p.directionNav.update()
    }, d.addSlide = function(b, c) {
      var e = a(b);
      d.count += 1, d.last = d.count - 1, k && l ? void 0 !== c ? d.slides.eq(d.count - c).after(e) : d.container.prepend(e) : void 0 !== c ? d.slides.eq(c).before(e) : d.container.append(e), d.update(c, "add"), d.slides = a(d.vars.selector + ":not(.clone)", d), d.setup(), d.vars.added(d)
    }, d.removeSlide = function(b) {
      var c = isNaN(b) ? d.slides.index(a(b)) : b;
      d.count -= 1, d.last = d.count - 1, isNaN(b) ? a(b, d.slides).remove() : k && l ? d.slides.eq(d.last).remove() : d.slides.eq(b).remove(), d.doMath(), d.update(c, "remove"), d.slides = a(d.vars.selector + ":not(.clone)", d), d.setup(), d.vars.removed(d)
    }, p.init()
  }, a(window).blur(function() {
    focused = !1
  }).focus(function() {
    focused = !0
  }), a.flexslider.defaults = {
    namespace: "flex-",
    selector: ".slides > li",
    animation: "fade",
    easing: "swing",
    direction: "horizontal",
    reverse: !1,
    animationLoop: !0,
    smoothHeight: !1,
    startAt: 0,
    slideshow: !0,
    slideshowSpeed: 4e3,
    animationSpeed: 600,
    initDelay: 0,
    randomize: !1,
    thumbCaptions: !1,
    pauseOnAction: !1,
    pauseOnHover: !1,
    pauseInvisible: !0,
    useCSS: !0,
    touch: !0,
    video: !1,
    controlNav: !0,
    directionNav: !0,
    prevText: "Previous",
    nextText: "Next",
    keyboard: !0,
    multipleKeyboard: !1,
    mousewheel: !1,
    pausePlay: !1,
    pauseText: "Pause",
    playText: "Play",
    controlsContainer: "",
    manualControls: "",
    sync: "",
    asNavFor: "",
    itemWidth: 0,
    itemMargin: 0,
    minItems: 1,
    maxItems: 0,
    move: 0,
    allowOneSlide: !0,
    start: function() {},
    before: function() {},
    after: function() {},
    end: function() {},
    added: function() {},
    removed: function() {}
  }, a.fn.flexslider = function(b) {
    if (void 0 === b && (b = {}), "object" == typeof b) return this.each(function() {
      var c = a(this),
        d = b.selector ? b.selector : ".slides > li",
        e = c.find(d);
      1 === e.length && b.allowOneSlide === !0 || 0 === e.length ? (e.fadeIn(400), b.start && b.start(c)) : void 0 === c.data("flexslider") && new a.flexslider(this, b)
    });
    var c = a(this).data("flexslider");
    switch (b) {
      case "play":
        c.play();
        break;
      case "pause":
        c.pause();
        break;
      case "stop":
        c.stop();
        break;
      case "next":
        c.flexAnimate(c.getTarget("next"), !0);
        break;
      case "prev":
      case "previous":
        c.flexAnimate(c.getTarget("prev"), !0);
        break;
      default:
        "number" == typeof b && c.flexAnimate(b, !0)
    }
  }
}(jQuery),
function(a) {
  var b = !1,
    c = !1,
    d = {
      isUrl: function(a) {
        var b = new RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$", "i");
        return b.test(a) ? !0 : !1
      },
      loadContent: function(a, b) {
        a.html(b)
      },
      addPrefix: function(a) {
        var b = a.attr("id"),
          c = a.attr("class");
        "string" == typeof b && "" !== b && a.attr("id", b.replace(/([A-Za-z0-9_.\-]+)/g, "sidr-id-$1")), "string" == typeof c && "" !== c && "sidr-inner" !== c && a.attr("class", c.replace(/([A-Za-z0-9_.\-]+)/g, "sidr-class-$1")), a.removeAttr("style")
      },
      execute: function(d, f, g) {
        "function" == typeof f ? (g = f, f = "sidr") : f || (f = "sidr");
        var q, r, s, h = a("#" + f),
          i = a(h.data("body")),
          j = a("html"),
          k = h.outerWidth(!0),
          l = h.data("speed"),
          m = h.data("side"),
          n = h.data("displace"),
          o = h.data("onOpen"),
          p = h.data("onClose"),
          t = "sidr" === f ? "sidr-open" : "sidr-open " + f + "-open";
        if ("open" === d || "toggle" === d && !h.is(":visible")) {
          if (h.is(":visible") || b) return;
          if (c !== !1) return e.close(c, function() {
            e.open(f)
          }), void 0;
          b = !0, "left" === m ? (q = {
            left: k + "px"
          }, r = {
            left: "0px"
          }) : (q = {
            right: k + "px"
          }, r = {
            right: "0px"
          }), i.is("body") && (s = j.scrollTop(), j.css("overflow-x", "hidden").scrollTop(s)), n ? i.addClass("sidr-animating").css({
            width: i.width(),
            position: "absolute"
          }).animate(q, l, function() {
            a(this).addClass(t)
          }) : setTimeout(function() {
            a(this).addClass(t)
          }, l), h.css("display", "block").animate(r, l, function() {
            b = !1, c = f, "function" == typeof g && g(f), i.removeClass("sidr-animating")
          }), o()
        } else {
          if (!h.is(":visible") || b) return;
          b = !0, "left" === m ? (q = {
            left: 0
          }, r = {
            left: "-" + k + "px"
          }) : (q = {
            right: 0
          }, r = {
            right: "-" + k + "px"
          }), i.is("body") && (s = j.scrollTop(), j.removeAttr("style").scrollTop(s)), i.addClass("sidr-animating").animate(q, l).removeClass(t), h.animate(r, l, function() {
            h.removeAttr("style").hide(), i.removeAttr("style"), a("html").removeAttr("style"), b = !1, c = !1, "function" == typeof g && g(f), i.removeClass("sidr-animating")
          }), p()
        }
      }
    },
    e = {
      open: function(a, b) {
        d.execute("open", a, b)
      },
      close: function(a, b) {
        d.execute("close", a, b)
      },
      toggle: function(a, b) {
        d.execute("toggle", a, b)
      },
      toogle: function(a, b) {
        d.execute("toggle", a, b)
      }
    };
  a.sidr = function(b) {
    return e[b] ? e[b].apply(this, Array.prototype.slice.call(arguments, 1)) : "function" != typeof b && "string" != typeof b && b ? (a.error("Method " + b + " does not exist on jQuery.sidr"), void 0) : e.toggle.apply(this, arguments)
  }, a.fn.sidr = function(b) {
    var c = a.extend({
        name: "sidr",
        speed: 200,
        side: "left",
        source: null,
        renaming: !0,
        body: "body",
        displace: !0,
        onOpen: function() {},
        onClose: function() {}
      }, b),
      f = c.name,
      g = a("#" + f);
    if (0 === g.length && (g = a("<div />").attr("id", f).appendTo(a("body"))), g.addClass("sidr").addClass(c.side).data({
        speed: c.speed,
        side: c.side,
        body: c.body,
        displace: c.displace,
        onOpen: c.onOpen,
        onClose: c.onClose
      }), "function" == typeof c.source) {
      var h = c.source(f);
      d.loadContent(g, h)
    } else if ("string" == typeof c.source && d.isUrl(c.source)) a.get(c.source, function(a) {
      d.loadContent(g, a)
    });
    else if ("string" == typeof c.source) {
      var i = "",
        j = c.source.split(",");
      if (a.each(j, function(b, c) {
          i += '<div class="sidr-inner">' + a(c).html() + "</div>"
        }), c.renaming) {
        var k = a("<div />").html(i);
        k.find("*").each(function(b, c) {
          var e = a(c);
          d.addPrefix(e)
        }), i = k.html()
      }
      d.loadContent(g, i)
    } else null !== c.source && a.error("Invalid Sidr Source");
    return this.each(function() {
      var b = a(this),
        c = b.data("sidr");
      c || (b.data("sidr", f), b.click(function(a) {
        a.preventDefault(), e.toggle(f)
      }))
    })
  }
}(jQuery),
function(a, b) {
  function e(b, c) {
    var d, e, g, h = b.nodeName.toLowerCase();
    return "area" === h ? (d = b.parentNode, e = d.name, b.href && e && "map" === d.nodeName.toLowerCase() ? (g = a("img[usemap=#" + e + "]")[0], !!g && f(g)) : !1) : (/input|select|textarea|button|object/.test(h) ? !b.disabled : "a" === h ? b.href || c : c) && f(b)
  }

  function f(b) {
    return a.expr.filters.visible(b) && !a(b).parents().addBack().filter(function() {
      return "hidden" === a.css(this, "visibility")
    }).length
  }
  var c = 0,
    d = /^ui-id-\d+$/;
  a.ui = a.ui || {}, a.extend(a.ui, {
    version: "1.10.3",
    keyCode: {
      BACKSPACE: 8,
      COMMA: 188,
      DELETE: 46,
      DOWN: 40,
      END: 35,
      ENTER: 13,
      ESCAPE: 27,
      HOME: 36,
      LEFT: 37,
      NUMPAD_ADD: 107,
      NUMPAD_DECIMAL: 110,
      NUMPAD_DIVIDE: 111,
      NUMPAD_ENTER: 108,
      NUMPAD_MULTIPLY: 106,
      NUMPAD_SUBTRACT: 109,
      PAGE_DOWN: 34,
      PAGE_UP: 33,
      PERIOD: 190,
      RIGHT: 39,
      SPACE: 32,
      TAB: 9,
      UP: 38
    }
  }), a.fn.extend({
    focus: function(b) {
      return function(c, d) {
        return "number" == typeof c ? this.each(function() {
          var b = this;
          setTimeout(function() {
            a(b).focus(), d && d.call(b)
          }, c)
        }) : b.apply(this, arguments)
      }
    }(a.fn.focus),
    scrollParent: function() {
      var b;
      return b = a.ui.ie && /(static|relative)/.test(this.css("position")) || /absolute/.test(this.css("position")) ? this.parents().filter(function() {
        return /(relative|absolute|fixed)/.test(a.css(this, "position")) && /(auto|scroll)/.test(a.css(this, "overflow") + a.css(this, "overflow-y") + a.css(this, "overflow-x"))
      }).eq(0) : this.parents().filter(function() {
        return /(auto|scroll)/.test(a.css(this, "overflow") + a.css(this, "overflow-y") + a.css(this, "overflow-x"))
      }).eq(0), /fixed/.test(this.css("position")) || !b.length ? a(document) : b
    },
    zIndex: function(c) {
      if (c !== b) return this.css("zIndex", c);
      if (this.length)
        for (var e, f, d = a(this[0]); d.length && d[0] !== document;) {
          if (e = d.css("position"), ("absolute" === e || "relative" === e || "fixed" === e) && (f = parseInt(d.css("zIndex"), 10), !isNaN(f) && 0 !== f)) return f;
          d = d.parent()
        }
      return 0
    },
    uniqueId: function() {
      return this.each(function() {
        this.id || (this.id = "ui-id-" + ++c)
      })
    },
    removeUniqueId: function() {
      return this.each(function() {
        d.test(this.id) && a(this).removeAttr("id")
      })
    }
  }), a.extend(a.expr[":"], {
    data: a.expr.createPseudo ? a.expr.createPseudo(function(b) {
      return function(c) {
        return !!a.data(c, b)
      }
    }) : function(b, c, d) {
      return !!a.data(b, d[3])
    },
    focusable: function(b) {
      return e(b, !isNaN(a.attr(b, "tabindex")))
    },
    tabbable: function(b) {
      var c = a.attr(b, "tabindex"),
        d = isNaN(c);
      return (d || c >= 0) && e(b, !d)
    }
  }), a("<a>").outerWidth(1).jquery || a.each(["Width", "Height"], function(c, d) {
    function h(b, c, d, f) {
      return a.each(e, function() {
        c -= parseFloat(a.css(b, "padding" + this)) || 0, d && (c -= parseFloat(a.css(b, "border" + this + "Width")) || 0), f && (c -= parseFloat(a.css(b, "margin" + this)) || 0)
      }), c
    }
    var e = "Width" === d ? ["Left", "Right"] : ["Top", "Bottom"],
      f = d.toLowerCase(),
      g = {
        innerWidth: a.fn.innerWidth,
        innerHeight: a.fn.innerHeight,
        outerWidth: a.fn.outerWidth,
        outerHeight: a.fn.outerHeight
      };
    a.fn["inner" + d] = function(c) {
      return c === b ? g["inner" + d].call(this) : this.each(function() {
        a(this).css(f, h(this, c) + "px")
      })
    }, a.fn["outer" + d] = function(b, c) {
      return "number" != typeof b ? g["outer" + d].call(this, b) : this.each(function() {
        a(this).css(f, h(this, b, !0, c) + "px")
      })
    }
  }), a.fn.addBack || (a.fn.addBack = function(a) {
    return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
  }), a("<a>").data("a-b", "a").removeData("a-b").data("a-b") && (a.fn.removeData = function(b) {
    return function(c) {
      return arguments.length ? b.call(this, a.camelCase(c)) : b.call(this)
    }
  }(a.fn.removeData)), a.ui.ie = !!/msie [\w.]+/.exec(navigator.userAgent.toLowerCase()), a.support.selectstart = "onselectstart" in document.createElement("div"), a.fn.extend({
    disableSelection: function() {
      return this.bind((a.support.selectstart ? "selectstart" : "mousedown") + ".ui-disableSelection", function(a) {
        a.preventDefault()
      })
    },
    enableSelection: function() {
      return this.unbind(".ui-disableSelection")
    }
  }), a.extend(a.ui, {
    plugin: {
      add: function(b, c, d) {
        var e, f = a.ui[b].prototype;
        for (e in d) f.plugins[e] = f.plugins[e] || [], f.plugins[e].push([c, d[e]])
      },
      call: function(a, b, c) {
        var d, e = a.plugins[b];
        if (e && a.element[0].parentNode && 11 !== a.element[0].parentNode.nodeType)
          for (d = 0; d < e.length; d++) a.options[e[d][0]] && e[d][1].apply(a.element, c)
      }
    },
    hasScroll: function(b, c) {
      if ("hidden" === a(b).css("overflow")) return !1;
      var d = c && "left" === c ? "scrollLeft" : "scrollTop",
        e = !1;
      return b[d] > 0 ? !0 : (b[d] = 1, e = b[d] > 0, b[d] = 0, e)
    }
  })
}(jQuery),
function(a, b) {
  var c = 0,
    d = Array.prototype.slice,
    e = a.cleanData;
  a.cleanData = function(b) {
    for (var d, c = 0; null != (d = b[c]); c++) try {
      a(d).triggerHandler("remove")
    } catch (f) {}
    e(b)
  }, a.widget = function(b, c, d) {
    var e, f, g, h, i = {},
      j = b.split(".")[0];
    b = b.split(".")[1], e = j + "-" + b, d || (d = c, c = a.Widget), a.expr[":"][e.toLowerCase()] = function(b) {
      return !!a.data(b, e)
    }, a[j] = a[j] || {}, f = a[j][b], g = a[j][b] = function(a, b) {
      return this._createWidget ? (arguments.length && this._createWidget(a, b), void 0) : new g(a, b)
    }, a.extend(g, f, {
      version: d.version,
      _proto: a.extend({}, d),
      _childConstructors: []
    }), h = new c, h.options = a.widget.extend({}, h.options), a.each(d, function(b, d) {
      return a.isFunction(d) ? (i[b] = function() {
        var a = function() {
            return c.prototype[b].apply(this, arguments)
          },
          e = function(a) {
            return c.prototype[b].apply(this, a)
          };
        return function() {
          var f, b = this._super,
            c = this._superApply;
          return this._super = a, this._superApply = e, f = d.apply(this, arguments), this._super = b, this._superApply = c, f
        }
      }(), void 0) : (i[b] = d, void 0)
    }), g.prototype = a.widget.extend(h, {
      widgetEventPrefix: f ? h.widgetEventPrefix : b
    }, i, {
      constructor: g,
      namespace: j,
      widgetName: b,
      widgetFullName: e
    }), f ? (a.each(f._childConstructors, function(b, c) {
      var d = c.prototype;
      a.widget(d.namespace + "." + d.widgetName, g, c._proto)
    }), delete f._childConstructors) : c._childConstructors.push(g), a.widget.bridge(b, g)
  }, a.widget.extend = function(c) {
    for (var h, i, e = d.call(arguments, 1), f = 0, g = e.length; g > f; f++)
      for (h in e[f]) i = e[f][h], e[f].hasOwnProperty(h) && i !== b && (c[h] = a.isPlainObject(i) ? a.isPlainObject(c[h]) ? a.widget.extend({}, c[h], i) : a.widget.extend({}, i) : i);
    return c
  }, a.widget.bridge = function(c, e) {
    var f = e.prototype.widgetFullName || c;
    a.fn[c] = function(g) {
      var h = "string" == typeof g,
        i = d.call(arguments, 1),
        j = this;
      return g = !h && i.length ? a.widget.extend.apply(null, [g].concat(i)) : g, h ? this.each(function() {
        var d, e = a.data(this, f);
        return e ? a.isFunction(e[g]) && "_" !== g.charAt(0) ? (d = e[g].apply(e, i), d !== e && d !== b ? (j = d && d.jquery ? j.pushStack(d.get()) : d, !1) : void 0) : a.error("no such method '" + g + "' for " + c + " widget instance") : a.error("cannot call methods on " + c + " prior to initialization; " + "attempted to call method '" + g + "'")
      }) : this.each(function() {
        var b = a.data(this, f);
        b ? b.option(g || {})._init() : a.data(this, f, new e(g, this))
      }), j
    }
  }, a.Widget = function() {}, a.Widget._childConstructors = [], a.Widget.prototype = {
    widgetName: "widget",
    widgetEventPrefix: "",
    defaultElement: "<div>",
    options: {
      disabled: !1,
      create: null
    },
    _createWidget: function(b, d) {
      d = a(d || this.defaultElement || this)[0], this.element = a(d), this.uuid = c++, this.eventNamespace = "." + this.widgetName + this.uuid, this.options = a.widget.extend({}, this.options, this._getCreateOptions(), b), this.bindings = a(), this.hoverable = a(), this.focusable = a(), d !== this && (a.data(d, this.widgetFullName, this), this._on(!0, this.element, {
        remove: function(a) {
          a.target === d && this.destroy()
        }
      }), this.document = a(d.style ? d.ownerDocument : d.document || d), this.window = a(this.document[0].defaultView || this.document[0].parentWindow)), this._create(), this._trigger("create", null, this._getCreateEventData()), this._init()
    },
    _getCreateOptions: a.noop,
    _getCreateEventData: a.noop,
    _create: a.noop,
    _init: a.noop,
    destroy: function() {
      this._destroy(), this.element.unbind(this.eventNamespace).removeData(this.widgetName).removeData(this.widgetFullName).removeData(a.camelCase(this.widgetFullName)), this.widget().unbind(this.eventNamespace).removeAttr("aria-disabled").removeClass(this.widgetFullName + "-disabled " + "ui-state-disabled"), this.bindings.unbind(this.eventNamespace), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")
    },
    _destroy: a.noop,
    widget: function() {
      return this.element
    },
    option: function(c, d) {
      var f, g, h, e = c;
      if (0 === arguments.length) return a.widget.extend({}, this.options);
      if ("string" == typeof c)
        if (e = {}, f = c.split("."), c = f.shift(), f.length) {
          for (g = e[c] = a.widget.extend({}, this.options[c]), h = 0; h < f.length - 1; h++) g[f[h]] = g[f[h]] || {}, g = g[f[h]];
          if (c = f.pop(), d === b) return g[c] === b ? null : g[c];
          g[c] = d
        } else {
          if (d === b) return this.options[c] === b ? null : this.options[c];
          e[c] = d
        }
      return this._setOptions(e), this
    },
    _setOptions: function(a) {
      var b;
      for (b in a) this._setOption(b, a[b]);
      return this
    },
    _setOption: function(a, b) {
      return this.options[a] = b, "disabled" === a && (this.widget().toggleClass(this.widgetFullName + "-disabled ui-state-disabled", !!b).attr("aria-disabled", b), this.hoverable.removeClass("ui-state-hover"), this.focusable.removeClass("ui-state-focus")), this
    },
    enable: function() {
      return this._setOption("disabled", !1)
    },
    disable: function() {
      return this._setOption("disabled", !0)
    },
    _on: function(b, c, d) {
      var e, f = this;
      "boolean" != typeof b && (d = c, c = b, b = !1), d ? (c = e = a(c), this.bindings = this.bindings.add(c)) : (d = c, c = this.element, e = this.widget()), a.each(d, function(d, g) {
        function h() {
          return b || f.options.disabled !== !0 && !a(this).hasClass("ui-state-disabled") ? ("string" == typeof g ? f[g] : g).apply(f, arguments) : void 0
        }
        "string" != typeof g && (h.guid = g.guid = g.guid || h.guid || a.guid++);
        var i = d.match(/^(\w+)\s*(.*)$/),
          j = i[1] + f.eventNamespace,
          k = i[2];
        k ? e.delegate(k, j, h) : c.bind(j, h)
      })
    },
    _off: function(a, b) {
      b = (b || "").split(" ").join(this.eventNamespace + " ") + this.eventNamespace, a.unbind(b).undelegate(b)
    },
    _delay: function(a, b) {
      function c() {
        return ("string" == typeof a ? d[a] : a).apply(d, arguments)
      }
      var d = this;
      return setTimeout(c, b || 0)
    },
    _hoverable: function(b) {
      this.hoverable = this.hoverable.add(b), this._on(b, {
        mouseenter: function(b) {
          a(b.currentTarget).addClass("ui-state-hover")
        },
        mouseleave: function(b) {
          a(b.currentTarget).removeClass("ui-state-hover")
        }
      })
    },
    _focusable: function(b) {
      this.focusable = this.focusable.add(b), this._on(b, {
        focusin: function(b) {
          a(b.currentTarget).addClass("ui-state-focus")
        },
        focusout: function(b) {
          a(b.currentTarget).removeClass("ui-state-focus")
        }
      })
    },
    _trigger: function(b, c, d) {
      var e, f, g = this.options[b];
      if (d = d || {}, c = a.Event(c), c.type = (b === this.widgetEventPrefix ? b : this.widgetEventPrefix + b).toLowerCase(), c.target = this.element[0], f = c.originalEvent)
        for (e in f) e in c || (c[e] = f[e]);
      return this.element.trigger(c, d), !(a.isFunction(g) && g.apply(this.element[0], [c].concat(d)) === !1 || c.isDefaultPrevented())
    }
  }, a.each({
    show: "fadeIn",
    hide: "fadeOut"
  }, function(b, c) {
    a.Widget.prototype["_" + b] = function(d, e, f) {
      "string" == typeof e && (e = {
        effect: e
      });
      var g, h = e ? e === !0 || "number" == typeof e ? c : e.effect || c : b;
      e = e || {}, "number" == typeof e && (e = {
        duration: e
      }), g = !a.isEmptyObject(e), e.complete = f, e.delay && d.delay(e.delay), g && a.effects && a.effects.effect[h] ? d[b](e) : h !== b && d[h] ? d[h](e.duration, e.easing, f) : d.queue(function(c) {
        a(this)[b](), f && f.call(d[0]), c()
      })
    }
  })
}(jQuery),
function(a) {
  var c = !1;
  a(document).mouseup(function() {
    c = !1
  }), a.widget("ui.mouse", {
    version: "1.10.3",
    options: {
      cancel: "input,textarea,button,select,option",
      distance: 1,
      delay: 0
    },
    _mouseInit: function() {
      var b = this;
      this.element.bind("mousedown." + this.widgetName, function(a) {
        return b._mouseDown(a)
      }).bind("click." + this.widgetName, function(c) {
        return !0 === a.data(c.target, b.widgetName + ".preventClickEvent") ? (a.removeData(c.target, b.widgetName + ".preventClickEvent"), c.stopImmediatePropagation(), !1) : void 0
      }), this.started = !1
    },
    _mouseDestroy: function() {
      this.element.unbind("." + this.widgetName), this._mouseMoveDelegate && a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate)
    },
    _mouseDown: function(b) {
      if (!c) {
        this._mouseStarted && this._mouseUp(b), this._mouseDownEvent = b;
        var d = this,
          e = 1 === b.which,
          f = "string" == typeof this.options.cancel && b.target.nodeName ? a(b.target).closest(this.options.cancel).length : !1;
        return e && !f && this._mouseCapture(b) ? (this.mouseDelayMet = !this.options.delay, this.mouseDelayMet || (this._mouseDelayTimer = setTimeout(function() {
          d.mouseDelayMet = !0
        }, this.options.delay)), this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(b) !== !1, !this._mouseStarted) ? (b.preventDefault(), !0) : (!0 === a.data(b.target, this.widgetName + ".preventClickEvent") && a.removeData(b.target, this.widgetName + ".preventClickEvent"), this._mouseMoveDelegate = function(a) {
          return d._mouseMove(a)
        }, this._mouseUpDelegate = function(a) {
          return d._mouseUp(a)
        }, a(document).bind("mousemove." + this.widgetName, this._mouseMoveDelegate).bind("mouseup." + this.widgetName, this._mouseUpDelegate), b.preventDefault(), c = !0, !0)) : !0
      }
    },
    _mouseMove: function(b) {
      return a.ui.ie && (!document.documentMode || document.documentMode < 9) && !b.button ? this._mouseUp(b) : this._mouseStarted ? (this._mouseDrag(b), b.preventDefault()) : (this._mouseDistanceMet(b) && this._mouseDelayMet(b) && (this._mouseStarted = this._mouseStart(this._mouseDownEvent, b) !== !1, this._mouseStarted ? this._mouseDrag(b) : this._mouseUp(b)), !this._mouseStarted)
    },
    _mouseUp: function(b) {
      return a(document).unbind("mousemove." + this.widgetName, this._mouseMoveDelegate).unbind("mouseup." + this.widgetName, this._mouseUpDelegate), this._mouseStarted && (this._mouseStarted = !1, b.target === this._mouseDownEvent.target && a.data(b.target, this.widgetName + ".preventClickEvent", !0), this._mouseStop(b)), !1
    },
    _mouseDistanceMet: function(a) {
      return Math.max(Math.abs(this._mouseDownEvent.pageX - a.pageX), Math.abs(this._mouseDownEvent.pageY - a.pageY)) >= this.options.distance
    },
    _mouseDelayMet: function() {
      return this.mouseDelayMet
    },
    _mouseStart: function() {},
    _mouseDrag: function() {},
    _mouseStop: function() {},
    _mouseCapture: function() {
      return !0
    }
  })
}(jQuery),
function(a) {
  a.widget("ui.draggable", a.ui.mouse, {
    version: "1.10.3",
    widgetEventPrefix: "drag",
    options: {
      addClasses: !0,
      appendTo: "parent",
      axis: !1,
      connectToSortable: !1,
      containment: !1,
      cursor: "auto",
      cursorAt: !1,
      grid: !1,
      handle: !1,
      helper: "original",
      iframeFix: !1,
      opacity: !1,
      refreshPositions: !1,
      revert: !1,
      revertDuration: 500,
      scope: "default",
      scroll: !0,
      scrollSensitivity: 20,
      scrollSpeed: 20,
      snap: !1,
      snapMode: "both",
      snapTolerance: 20,
      stack: !1,
      zIndex: !1,
      drag: null,
      start: null,
      stop: null
    },
    _create: function() {
      "original" !== this.options.helper || /^(?:r|a|f)/.test(this.element.css("position")) || (this.element[0].style.position = "relative"), this.options.addClasses && this.element.addClass("ui-draggable"), this.options.disabled && this.element.addClass("ui-draggable-disabled"), this._mouseInit()
    },
    _destroy: function() {
      this.element.removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"), this._mouseDestroy()
    },
    _mouseCapture: function(b) {
      var c = this.options;
      return this.helper || c.disabled || a(b.target).closest(".ui-resizable-handle").length > 0 ? !1 : (this.handle = this._getHandle(b), this.handle ? (a(c.iframeFix === !0 ? "iframe" : c.iframeFix).each(function() {
        a("<div class='ui-draggable-iframeFix' style='background: #fff;'></div>").css({
          width: this.offsetWidth + "px",
          height: this.offsetHeight + "px",
          position: "absolute",
          opacity: "0.001",
          zIndex: 1e3
        }).css(a(this).offset()).appendTo("body")
      }), !0) : !1)
    },
    _mouseStart: function(b) {
      var c = this.options;
      return this.helper = this._createHelper(b), this.helper.addClass("ui-draggable-dragging"), this._cacheHelperProportions(), a.ui.ddmanager && (a.ui.ddmanager.current = this), this._cacheMargins(), this.cssPosition = this.helper.css("position"), this.scrollParent = this.helper.scrollParent(), this.offsetParent = this.helper.offsetParent(), this.offsetParentCssPosition = this.offsetParent.css("position"), this.offset = this.positionAbs = this.element.offset(), this.offset = {
        top: this.offset.top - this.margins.top,
        left: this.offset.left - this.margins.left
      }, this.offset.scroll = !1, a.extend(this.offset, {
        click: {
          left: b.pageX - this.offset.left,
          top: b.pageY - this.offset.top
        },
        parent: this._getParentOffset(),
        relative: this._getRelativeOffset()
      }), this.originalPosition = this.position = this._generatePosition(b), this.originalPageX = b.pageX, this.originalPageY = b.pageY, c.cursorAt && this._adjustOffsetFromHelper(c.cursorAt), this._setContainment(), this._trigger("start", b) === !1 ? (this._clear(), !1) : (this._cacheHelperProportions(), a.ui.ddmanager && !c.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this._mouseDrag(b, !0), a.ui.ddmanager && a.ui.ddmanager.dragStart(this, b), !0)
    },
    _mouseDrag: function(b, c) {
      if ("fixed" === this.offsetParentCssPosition && (this.offset.parent = this._getParentOffset()), this.position = this._generatePosition(b), this.positionAbs = this._convertPositionTo("absolute"), !c) {
        var d = this._uiHash();
        if (this._trigger("drag", b, d) === !1) return this._mouseUp({}), !1;
        this.position = d.position
      }
      return this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), a.ui.ddmanager && a.ui.ddmanager.drag(this, b), !1
    },
    _mouseStop: function(b) {
      var c = this,
        d = !1;
      return a.ui.ddmanager && !this.options.dropBehaviour && (d = a.ui.ddmanager.drop(this, b)), this.dropped && (d = this.dropped, this.dropped = !1), "original" !== this.options.helper || a.contains(this.element[0].ownerDocument, this.element[0]) ? ("invalid" === this.options.revert && !d || "valid" === this.options.revert && d || this.options.revert === !0 || a.isFunction(this.options.revert) && this.options.revert.call(this.element, d) ? a(this.helper).animate(this.originalPosition, parseInt(this.options.revertDuration, 10), function() {
        c._trigger("stop", b) !== !1 && c._clear()
      }) : this._trigger("stop", b) !== !1 && this._clear(), !1) : !1
    },
    _mouseUp: function(b) {
      return a("div.ui-draggable-iframeFix").each(function() {
        this.parentNode.removeChild(this)
      }), a.ui.ddmanager && a.ui.ddmanager.dragStop(this, b), a.ui.mouse.prototype._mouseUp.call(this, b)
    },
    cancel: function() {
      return this.helper.is(".ui-draggable-dragging") ? this._mouseUp({}) : this._clear(), this
    },
    _getHandle: function(b) {
      return this.options.handle ? !!a(b.target).closest(this.element.find(this.options.handle)).length : !0
    },
    _createHelper: function(b) {
      var c = this.options,
        d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [b])) : "clone" === c.helper ? this.element.clone().removeAttr("id") : this.element;
      return d.parents("body").length || d.appendTo("parent" === c.appendTo ? this.element[0].parentNode : c.appendTo), d[0] === this.element[0] || /(fixed|absolute)/.test(d.css("position")) || d.css("position", "absolute"), d
    },
    _adjustOffsetFromHelper: function(b) {
      "string" == typeof b && (b = b.split(" ")), a.isArray(b) && (b = {
        left: +b[0],
        top: +b[1] || 0
      }), "left" in b && (this.offset.click.left = b.left + this.margins.left), "right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), "top" in b && (this.offset.click.top = b.top + this.margins.top), "bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
    },
    _getParentOffset: function() {
      var b = this.offsetParent.offset();
      return "absolute" === this.cssPosition && this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && a.ui.ie) && (b = {
        top: 0,
        left: 0
      }), {
        top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
        left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
      }
    },
    _getRelativeOffset: function() {
      if ("relative" === this.cssPosition) {
        var a = this.element.position();
        return {
          top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
          left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
        }
      }
      return {
        top: 0,
        left: 0
      }
    },
    _cacheMargins: function() {
      this.margins = {
        left: parseInt(this.element.css("marginLeft"), 10) || 0,
        top: parseInt(this.element.css("marginTop"), 10) || 0,
        right: parseInt(this.element.css("marginRight"), 10) || 0,
        bottom: parseInt(this.element.css("marginBottom"), 10) || 0
      }
    },
    _cacheHelperProportions: function() {
      this.helperProportions = {
        width: this.helper.outerWidth(),
        height: this.helper.outerHeight()
      }
    },
    _setContainment: function() {
      var b, c, d, e = this.options;
      return e.containment ? "window" === e.containment ? (this.containment = [a(window).scrollLeft() - this.offset.relative.left - this.offset.parent.left, a(window).scrollTop() - this.offset.relative.top - this.offset.parent.top, a(window).scrollLeft() + a(window).width() - this.helperProportions.width - this.margins.left, a(window).scrollTop() + (a(window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : "document" === e.containment ? (this.containment = [0, 0, a(document).width() - this.helperProportions.width - this.margins.left, (a(document).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top], void 0) : e.containment.constructor === Array ? (this.containment = e.containment, void 0) : ("parent" === e.containment && (e.containment = this.helper[0].parentNode), c = a(e.containment), d = c[0], d && (b = "hidden" !== c.css("overflow"), this.containment = [(parseInt(c.css("borderLeftWidth"), 10) || 0) + (parseInt(c.css("paddingLeft"), 10) || 0), (parseInt(c.css("borderTopWidth"), 10) || 0) + (parseInt(c.css("paddingTop"), 10) || 0), (b ? Math.max(d.scrollWidth, d.offsetWidth) : d.offsetWidth) - (parseInt(c.css("borderRightWidth"), 10) || 0) - (parseInt(c.css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left - this.margins.right, (b ? Math.max(d.scrollHeight, d.offsetHeight) : d.offsetHeight) - (parseInt(c.css("borderBottomWidth"), 10) || 0) - (parseInt(c.css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top - this.margins.bottom], this.relative_container = c), void 0) : (this.containment = null, void 0)
    },
    _convertPositionTo: function(b, c) {
      c || (c = this.position);
      var d = "absolute" === b ? 1 : -1,
        e = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent;
      return this.offset.scroll || (this.offset.scroll = {
        top: e.scrollTop(),
        left: e.scrollLeft()
      }), {
        top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top) * d,
        left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left) * d
      }
    },
    _generatePosition: function(b) {
      var c, d, e, f, g = this.options,
        h = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
        i = b.pageX,
        j = b.pageY;
      return this.offset.scroll || (this.offset.scroll = {
        top: h.scrollTop(),
        left: h.scrollLeft()
      }), this.originalPosition && (this.containment && (this.relative_container ? (d = this.relative_container.offset(), c = [this.containment[0] + d.left, this.containment[1] + d.top, this.containment[2] + d.left, this.containment[3] + d.top]) : c = this.containment, b.pageX - this.offset.click.left < c[0] && (i = c[0] + this.offset.click.left), b.pageY - this.offset.click.top < c[1] && (j = c[1] + this.offset.click.top), b.pageX - this.offset.click.left > c[2] && (i = c[2] + this.offset.click.left), b.pageY - this.offset.click.top > c[3] && (j = c[3] + this.offset.click.top)), g.grid && (e = g.grid[1] ? this.originalPageY + Math.round((j - this.originalPageY) / g.grid[1]) * g.grid[1] : this.originalPageY, j = c ? e - this.offset.click.top >= c[1] || e - this.offset.click.top > c[3] ? e : e - this.offset.click.top >= c[1] ? e - g.grid[1] : e + g.grid[1] : e, f = g.grid[0] ? this.originalPageX + Math.round((i - this.originalPageX) / g.grid[0]) * g.grid[0] : this.originalPageX, i = c ? f - this.offset.click.left >= c[0] || f - this.offset.click.left > c[2] ? f : f - this.offset.click.left >= c[0] ? f - g.grid[0] : f + g.grid[0] : f)), {
        top: j - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : this.offset.scroll.top),
        left: i - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : this.offset.scroll.left)
      }
    },
    _clear: function() {
      this.helper.removeClass("ui-draggable-dragging"), this.helper[0] === this.element[0] || this.cancelHelperRemoval || this.helper.remove(), this.helper = null, this.cancelHelperRemoval = !1
    },
    _trigger: function(b, c, d) {
      return d = d || this._uiHash(), a.ui.plugin.call(this, b, [c, d]), "drag" === b && (this.positionAbs = this._convertPositionTo("absolute")), a.Widget.prototype._trigger.call(this, b, c, d)
    },
    plugins: {},
    _uiHash: function() {
      return {
        helper: this.helper,
        position: this.position,
        originalPosition: this.originalPosition,
        offset: this.positionAbs
      }
    }
  }), a.ui.plugin.add("draggable", "connectToSortable", {
    start: function(b, c) {
      var d = a(this).data("ui-draggable"),
        e = d.options,
        f = a.extend({}, c, {
          item: d.element
        });
      d.sortables = [], a(e.connectToSortable).each(function() {
        var c = a.data(this, "ui-sortable");
        c && !c.options.disabled && (d.sortables.push({
          instance: c,
          shouldRevert: c.options.revert
        }), c.refreshPositions(), c._trigger("activate", b, f))
      })
    },
    stop: function(b, c) {
      var d = a(this).data("ui-draggable"),
        e = a.extend({}, c, {
          item: d.element
        });
      a.each(d.sortables, function() {
        this.instance.isOver ? (this.instance.isOver = 0, d.cancelHelperRemoval = !0, this.instance.cancelHelperRemoval = !1, this.shouldRevert && (this.instance.options.revert = this.shouldRevert), this.instance._mouseStop(b), this.instance.options.helper = this.instance.options._helper, "original" === d.options.helper && this.instance.currentItem.css({
          top: "auto",
          left: "auto"
        })) : (this.instance.cancelHelperRemoval = !1, this.instance._trigger("deactivate", b, e))
      })
    },
    drag: function(b, c) {
      var d = a(this).data("ui-draggable"),
        e = this;
      a.each(d.sortables, function() {
        var f = !1,
          g = this;
        this.instance.positionAbs = d.positionAbs, this.instance.helperProportions = d.helperProportions, this.instance.offset.click = d.offset.click, this.instance._intersectsWith(this.instance.containerCache) && (f = !0, a.each(d.sortables, function() {
          return this.instance.positionAbs = d.positionAbs, this.instance.helperProportions = d.helperProportions, this.instance.offset.click = d.offset.click, this !== g && this.instance._intersectsWith(this.instance.containerCache) && a.contains(g.instance.element[0], this.instance.element[0]) && (f = !1), f
        })), f ? (this.instance.isOver || (this.instance.isOver = 1, this.instance.currentItem = a(e).clone().removeAttr("id").appendTo(this.instance.element).data("ui-sortable-item", !0), this.instance.options._helper = this.instance.options.helper, this.instance.options.helper = function() {
          return c.helper[0]
        }, b.target = this.instance.currentItem[0], this.instance._mouseCapture(b, !0), this.instance._mouseStart(b, !0, !0), this.instance.offset.click.top = d.offset.click.top, this.instance.offset.click.left = d.offset.click.left, this.instance.offset.parent.left -= d.offset.parent.left - this.instance.offset.parent.left, this.instance.offset.parent.top -= d.offset.parent.top - this.instance.offset.parent.top, d._trigger("toSortable", b), d.dropped = this.instance.element, d.currentItem = d.element, this.instance.fromOutside = d), this.instance.currentItem && this.instance._mouseDrag(b)) : this.instance.isOver && (this.instance.isOver = 0, this.instance.cancelHelperRemoval = !0, this.instance.options.revert = !1, this.instance._trigger("out", b, this.instance._uiHash(this.instance)), this.instance._mouseStop(b, !0), this.instance.options.helper = this.instance.options._helper, this.instance.currentItem.remove(), this.instance.placeholder && this.instance.placeholder.remove(), d._trigger("fromSortable", b), d.dropped = !1)
      })
    }
  }), a.ui.plugin.add("draggable", "cursor", {
    start: function() {
      var b = a("body"),
        c = a(this).data("ui-draggable").options;
      b.css("cursor") && (c._cursor = b.css("cursor")), b.css("cursor", c.cursor)
    },
    stop: function() {
      var b = a(this).data("ui-draggable").options;
      b._cursor && a("body").css("cursor", b._cursor)
    }
  }), a.ui.plugin.add("draggable", "opacity", {
    start: function(b, c) {
      var d = a(c.helper),
        e = a(this).data("ui-draggable").options;
      d.css("opacity") && (e._opacity = d.css("opacity")), d.css("opacity", e.opacity)
    },
    stop: function(b, c) {
      var d = a(this).data("ui-draggable").options;
      d._opacity && a(c.helper).css("opacity", d._opacity)
    }
  }), a.ui.plugin.add("draggable", "scroll", {
    start: function() {
      var b = a(this).data("ui-draggable");
      b.scrollParent[0] !== document && "HTML" !== b.scrollParent[0].tagName && (b.overflowOffset = b.scrollParent.offset())
    },
    drag: function(b) {
      var c = a(this).data("ui-draggable"),
        d = c.options,
        e = !1;
      c.scrollParent[0] !== document && "HTML" !== c.scrollParent[0].tagName ? (d.axis && "x" === d.axis || (c.overflowOffset.top + c.scrollParent[0].offsetHeight - b.pageY < d.scrollSensitivity ? c.scrollParent[0].scrollTop = e = c.scrollParent[0].scrollTop + d.scrollSpeed : b.pageY - c.overflowOffset.top < d.scrollSensitivity && (c.scrollParent[0].scrollTop = e = c.scrollParent[0].scrollTop - d.scrollSpeed)), d.axis && "y" === d.axis || (c.overflowOffset.left + c.scrollParent[0].offsetWidth - b.pageX < d.scrollSensitivity ? c.scrollParent[0].scrollLeft = e = c.scrollParent[0].scrollLeft + d.scrollSpeed : b.pageX - c.overflowOffset.left < d.scrollSensitivity && (c.scrollParent[0].scrollLeft = e = c.scrollParent[0].scrollLeft - d.scrollSpeed))) : (d.axis && "x" === d.axis || (b.pageY - a(document).scrollTop() < d.scrollSensitivity ? e = a(document).scrollTop(a(document).scrollTop() - d.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) < d.scrollSensitivity && (e = a(document).scrollTop(a(document).scrollTop() + d.scrollSpeed))), d.axis && "y" === d.axis || (b.pageX - a(document).scrollLeft() < d.scrollSensitivity ? e = a(document).scrollLeft(a(document).scrollLeft() - d.scrollSpeed) : a(window).width() - (b.pageX - a(document).scrollLeft()) < d.scrollSensitivity && (e = a(document).scrollLeft(a(document).scrollLeft() + d.scrollSpeed)))), e !== !1 && a.ui.ddmanager && !d.dropBehaviour && a.ui.ddmanager.prepareOffsets(c, b)
    }
  }), a.ui.plugin.add("draggable", "snap", {
    start: function() {
      var b = a(this).data("ui-draggable"),
        c = b.options;
      b.snapElements = [], a(c.snap.constructor !== String ? c.snap.items || ":data(ui-draggable)" : c.snap).each(function() {
        var c = a(this),
          d = c.offset();
        this !== b.element[0] && b.snapElements.push({
          item: this,
          width: c.outerWidth(),
          height: c.outerHeight(),
          top: d.top,
          left: d.left
        })
      })
    },
    drag: function(b, c) {
      var d, e, f, g, h, i, j, k, l, m, n = a(this).data("ui-draggable"),
        o = n.options,
        p = o.snapTolerance,
        q = c.offset.left,
        r = q + n.helperProportions.width,
        s = c.offset.top,
        t = s + n.helperProportions.height;
      for (l = n.snapElements.length - 1; l >= 0; l--) h = n.snapElements[l].left, i = h + n.snapElements[l].width, j = n.snapElements[l].top, k = j + n.snapElements[l].height, h - p > r || q > i + p || j - p > t || s > k + p || !a.contains(n.snapElements[l].item.ownerDocument, n.snapElements[l].item) ? (n.snapElements[l].snapping && n.options.snap.release && n.options.snap.release.call(n.element, b, a.extend(n._uiHash(), {
        snapItem: n.snapElements[l].item
      })), n.snapElements[l].snapping = !1) : ("inner" !== o.snapMode && (d = Math.abs(j - t) <= p, e = Math.abs(k - s) <= p, f = Math.abs(h - r) <= p, g = Math.abs(i - q) <= p, d && (c.position.top = n._convertPositionTo("relative", {
        top: j - n.helperProportions.height,
        left: 0
      }).top - n.margins.top), e && (c.position.top = n._convertPositionTo("relative", {
        top: k,
        left: 0
      }).top - n.margins.top), f && (c.position.left = n._convertPositionTo("relative", {
        top: 0,
        left: h - n.helperProportions.width
      }).left - n.margins.left), g && (c.position.left = n._convertPositionTo("relative", {
        top: 0,
        left: i
      }).left - n.margins.left)), m = d || e || f || g, "outer" !== o.snapMode && (d = Math.abs(j - s) <= p, e = Math.abs(k - t) <= p, f = Math.abs(h - q) <= p, g = Math.abs(i - r) <= p, d && (c.position.top = n._convertPositionTo("relative", {
        top: j,
        left: 0
      }).top - n.margins.top), e && (c.position.top = n._convertPositionTo("relative", {
        top: k - n.helperProportions.height,
        left: 0
      }).top - n.margins.top), f && (c.position.left = n._convertPositionTo("relative", {
        top: 0,
        left: h
      }).left - n.margins.left), g && (c.position.left = n._convertPositionTo("relative", {
        top: 0,
        left: i - n.helperProportions.width
      }).left - n.margins.left)), !n.snapElements[l].snapping && (d || e || f || g || m) && n.options.snap.snap && n.options.snap.snap.call(n.element, b, a.extend(n._uiHash(), {
        snapItem: n.snapElements[l].item
      })), n.snapElements[l].snapping = d || e || f || g || m)
    }
  }), a.ui.plugin.add("draggable", "stack", {
    start: function() {
      var b, c = this.data("ui-draggable").options,
        d = a.makeArray(a(c.stack)).sort(function(b, c) {
          return (parseInt(a(b).css("zIndex"), 10) || 0) - (parseInt(a(c).css("zIndex"), 10) || 0)
        });
      d.length && (b = parseInt(a(d[0]).css("zIndex"), 10) || 0, a(d).each(function(c) {
        a(this).css("zIndex", b + c)
      }), this.css("zIndex", b + d.length))
    }
  }), a.ui.plugin.add("draggable", "zIndex", {
    start: function(b, c) {
      var d = a(c.helper),
        e = a(this).data("ui-draggable").options;
      d.css("zIndex") && (e._zIndex = d.css("zIndex")), d.css("zIndex", e.zIndex)
    },
    stop: function(b, c) {
      var d = a(this).data("ui-draggable").options;
      d._zIndex && a(c.helper).css("zIndex", d._zIndex)
    }
  })
}(jQuery),
function(a) {
  function c(a, b, c) {
    return a > b && b + c > a
  }
  a.widget("ui.droppable", {
    version: "1.10.3",
    widgetEventPrefix: "drop",
    options: {
      accept: "*",
      activeClass: !1,
      addClasses: !0,
      greedy: !1,
      hoverClass: !1,
      scope: "default",
      tolerance: "intersect",
      activate: null,
      deactivate: null,
      drop: null,
      out: null,
      over: null
    },
    _create: function() {
      var b = this.options,
        c = b.accept;
      this.isover = !1, this.isout = !0, this.accept = a.isFunction(c) ? c : function(a) {
        return a.is(c)
      }, this.proportions = {
        width: this.element[0].offsetWidth,
        height: this.element[0].offsetHeight
      }, a.ui.ddmanager.droppables[b.scope] = a.ui.ddmanager.droppables[b.scope] || [], a.ui.ddmanager.droppables[b.scope].push(this), b.addClasses && this.element.addClass("ui-droppable")
    },
    _destroy: function() {
      for (var b = 0, c = a.ui.ddmanager.droppables[this.options.scope]; b < c.length; b++) c[b] === this && c.splice(b, 1);
      this.element.removeClass("ui-droppable ui-droppable-disabled")
    },
    _setOption: function(b, c) {
      "accept" === b && (this.accept = a.isFunction(c) ? c : function(a) {
        return a.is(c)
      }), a.Widget.prototype._setOption.apply(this, arguments)
    },
    _activate: function(b) {
      var c = a.ui.ddmanager.current;
      this.options.activeClass && this.element.addClass(this.options.activeClass), c && this._trigger("activate", b, this.ui(c))
    },
    _deactivate: function(b) {
      var c = a.ui.ddmanager.current;
      this.options.activeClass && this.element.removeClass(this.options.activeClass), c && this._trigger("deactivate", b, this.ui(c))
    },
    _over: function(b) {
      var c = a.ui.ddmanager.current;
      c && (c.currentItem || c.element)[0] !== this.element[0] && this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.addClass(this.options.hoverClass), this._trigger("over", b, this.ui(c)))
    },
    _out: function(b) {
      var c = a.ui.ddmanager.current;
      c && (c.currentItem || c.element)[0] !== this.element[0] && this.accept.call(this.element[0], c.currentItem || c.element) && (this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("out", b, this.ui(c)))
    },
    _drop: function(b, c) {
      var d = c || a.ui.ddmanager.current,
        e = !1;
      return d && (d.currentItem || d.element)[0] !== this.element[0] ? (this.element.find(":data(ui-droppable)").not(".ui-draggable-dragging").each(function() {
        var b = a.data(this, "ui-droppable");
        return b.options.greedy && !b.options.disabled && b.options.scope === d.options.scope && b.accept.call(b.element[0], d.currentItem || d.element) && a.ui.intersect(d, a.extend(b, {
          offset: b.element.offset()
        }), b.options.tolerance) ? (e = !0, !1) : void 0
      }), e ? !1 : this.accept.call(this.element[0], d.currentItem || d.element) ? (this.options.activeClass && this.element.removeClass(this.options.activeClass), this.options.hoverClass && this.element.removeClass(this.options.hoverClass), this._trigger("drop", b, this.ui(d)), this.element) : !1) : !1
    },
    ui: function(a) {
      return {
        draggable: a.currentItem || a.element,
        helper: a.helper,
        position: a.position,
        offset: a.positionAbs
      }
    }
  }), a.ui.intersect = function(a, b, d) {
    if (!b.offset) return !1;
    var e, f, g = (a.positionAbs || a.position.absolute).left,
      h = g + a.helperProportions.width,
      i = (a.positionAbs || a.position.absolute).top,
      j = i + a.helperProportions.height,
      k = b.offset.left,
      l = k + b.proportions.width,
      m = b.offset.top,
      n = m + b.proportions.height;
    switch (d) {
      case "fit":
        return g >= k && l >= h && i >= m && n >= j;
      case "intersect":
        return k < g + a.helperProportions.width / 2 && h - a.helperProportions.width / 2 < l && m < i + a.helperProportions.height / 2 && j - a.helperProportions.height / 2 < n;
      case "pointer":
        return e = (a.positionAbs || a.position.absolute).left + (a.clickOffset || a.offset.click).left, f = (a.positionAbs || a.position.absolute).top + (a.clickOffset || a.offset.click).top, c(f, m, b.proportions.height) && c(e, k, b.proportions.width);
      case "touch":
        return (i >= m && n >= i || j >= m && n >= j || m > i && j > n) && (g >= k && l >= g || h >= k && l >= h || k > g && h > l);
      default:
        return !1
    }
  }, a.ui.ddmanager = {
    current: null,
    droppables: {
      "default": []
    },
    prepareOffsets: function(b, c) {
      var d, e, f = a.ui.ddmanager.droppables[b.options.scope] || [],
        g = c ? c.type : null,
        h = (b.currentItem || b.element).find(":data(ui-droppable)").addBack();
      a: for (d = 0; d < f.length; d++)
        if (!(f[d].options.disabled || b && !f[d].accept.call(f[d].element[0], b.currentItem || b.element))) {
          for (e = 0; e < h.length; e++)
            if (h[e] === f[d].element[0]) {
              f[d].proportions.height = 0;
              continue a
            }
          f[d].visible = "none" !== f[d].element.css("display"), f[d].visible && ("mousedown" === g && f[d]._activate.call(f[d], c), f[d].offset = f[d].element.offset(), f[d].proportions = {
            width: f[d].element[0].offsetWidth,
            height: f[d].element[0].offsetHeight
          })
        }
    },
    drop: function(b, c) {
      var d = !1;
      return a.each((a.ui.ddmanager.droppables[b.options.scope] || []).slice(), function() {
        this.options && (!this.options.disabled && this.visible && a.ui.intersect(b, this, this.options.tolerance) && (d = this._drop.call(this, c) || d), !this.options.disabled && this.visible && this.accept.call(this.element[0], b.currentItem || b.element) && (this.isout = !0, this.isover = !1, this._deactivate.call(this, c)))
      }), d
    },
    dragStart: function(b, c) {
      b.element.parentsUntil("body").bind("scroll.droppable", function() {
        b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c)
      })
    },
    drag: function(b, c) {
      b.options.refreshPositions && a.ui.ddmanager.prepareOffsets(b, c), a.each(a.ui.ddmanager.droppables[b.options.scope] || [], function() {
        if (!this.options.disabled && !this.greedyChild && this.visible) {
          var d, e, f, g = a.ui.intersect(b, this, this.options.tolerance),
            h = !g && this.isover ? "isout" : g && !this.isover ? "isover" : null;
          h && (this.options.greedy && (e = this.options.scope, f = this.element.parents(":data(ui-droppable)").filter(function() {
            return a.data(this, "ui-droppable").options.scope === e
          }), f.length && (d = a.data(f[0], "ui-droppable"), d.greedyChild = "isover" === h)), d && "isover" === h && (d.isover = !1, d.isout = !0, d._out.call(d, c)), this[h] = !0, this["isout" === h ? "isover" : "isout"] = !1, this["isover" === h ? "_over" : "_out"].call(this, c), d && "isout" === h && (d.isout = !1, d.isover = !0, d._over.call(d, c)))
        }
      })
    },
    dragStop: function(b, c) {
      b.element.parentsUntil("body").unbind("scroll.droppable"), b.options.refreshPositions || a.ui.ddmanager.prepareOffsets(b, c)
    }
  }
}(jQuery),
function(a) {
  function c(a) {
    return parseInt(a, 10) || 0
  }

  function d(a) {
    return !isNaN(parseInt(a, 10))
  }
  a.widget("ui.resizable", a.ui.mouse, {
    version: "1.10.3",
    widgetEventPrefix: "resize",
    options: {
      alsoResize: !1,
      animate: !1,
      animateDuration: "slow",
      animateEasing: "swing",
      aspectRatio: !1,
      autoHide: !1,
      containment: !1,
      ghost: !1,
      grid: !1,
      handles: "e,s,se",
      helper: !1,
      maxHeight: null,
      maxWidth: null,
      minHeight: 10,
      minWidth: 10,
      zIndex: 90,
      resize: null,
      start: null,
      stop: null
    },
    _create: function() {
      var b, c, d, e, f, g = this,
        h = this.options;
      if (this.element.addClass("ui-resizable"), a.extend(this, {
          _aspectRatio: !!h.aspectRatio,
          aspectRatio: h.aspectRatio,
          originalElement: this.element,
          _proportionallyResizeElements: [],
          _helper: h.helper || h.ghost || h.animate ? h.helper || "ui-resizable-helper" : null
        }), this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i) && (this.element.wrap(a("<div class='ui-wrapper' style='overflow: hidden;'></div>").css({
          position: this.element.css("position"),
          width: this.element.outerWidth(),
          height: this.element.outerHeight(),
          top: this.element.css("top"),
          left: this.element.css("left")
        })), this.element = this.element.parent().data("ui-resizable", this.element.data("ui-resizable")), this.elementIsWrapper = !0, this.element.css({
          marginLeft: this.originalElement.css("marginLeft"),
          marginTop: this.originalElement.css("marginTop"),
          marginRight: this.originalElement.css("marginRight"),
          marginBottom: this.originalElement.css("marginBottom")
        }), this.originalElement.css({
          marginLeft: 0,
          marginTop: 0,
          marginRight: 0,
          marginBottom: 0
        }), this.originalResizeStyle = this.originalElement.css("resize"), this.originalElement.css("resize", "none"), this._proportionallyResizeElements.push(this.originalElement.css({
          position: "static",
          zoom: 1,
          display: "block"
        })), this.originalElement.css({
          margin: this.originalElement.css("margin")
        }), this._proportionallyResize()), this.handles = h.handles || (a(".ui-resizable-handle", this.element).length ? {
          n: ".ui-resizable-n",
          e: ".ui-resizable-e",
          s: ".ui-resizable-s",
          w: ".ui-resizable-w",
          se: ".ui-resizable-se",
          sw: ".ui-resizable-sw",
          ne: ".ui-resizable-ne",
          nw: ".ui-resizable-nw"
        } : "e,s,se"), this.handles.constructor === String)
        for ("all" === this.handles && (this.handles = "n,e,s,w,se,sw,ne,nw"), b = this.handles.split(","), this.handles = {}, c = 0; c < b.length; c++) d = a.trim(b[c]), f = "ui-resizable-" + d, e = a("<div class='ui-resizable-handle " + f + "'></div>"), e.css({
          zIndex: h.zIndex
        }), "se" === d && e.addClass("ui-icon ui-icon-gripsmall-diagonal-se"), this.handles[d] = ".ui-resizable-" + d, this.element.append(e);
      this._renderAxis = function(b) {
        var c, d, e, f;
        b = b || this.element;
        for (c in this.handles) this.handles[c].constructor === String && (this.handles[c] = a(this.handles[c], this.element).show()), this.elementIsWrapper && this.originalElement[0].nodeName.match(/textarea|input|select|button/i) && (d = a(this.handles[c], this.element), f = /sw|ne|nw|se|n|s/.test(c) ? d.outerHeight() : d.outerWidth(), e = ["padding", /ne|nw|n/.test(c) ? "Top" : /se|sw|s/.test(c) ? "Bottom" : /^e$/.test(c) ? "Right" : "Left"].join(""), b.css(e, f), this._proportionallyResize()), a(this.handles[c]).length
      }, this._renderAxis(this.element), this._handles = a(".ui-resizable-handle", this.element).disableSelection(), this._handles.mouseover(function() {
        g.resizing || (this.className && (e = this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)), g.axis = e && e[1] ? e[1] : "se")
      }), h.autoHide && (this._handles.hide(), a(this.element).addClass("ui-resizable-autohide").mouseenter(function() {
        h.disabled || (a(this).removeClass("ui-resizable-autohide"), g._handles.show())
      }).mouseleave(function() {
        h.disabled || g.resizing || (a(this).addClass("ui-resizable-autohide"), g._handles.hide())
      })), this._mouseInit()
    },
    _destroy: function() {
      this._mouseDestroy();
      var b, c = function(b) {
        a(b).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").removeData("ui-resizable").unbind(".resizable").find(".ui-resizable-handle").remove()
      };
      return this.elementIsWrapper && (c(this.element), b = this.element, this.originalElement.css({
        position: b.css("position"),
        width: b.outerWidth(),
        height: b.outerHeight(),
        top: b.css("top"),
        left: b.css("left")
      }).insertAfter(b), b.remove()), this.originalElement.css("resize", this.originalResizeStyle), c(this.originalElement), this
    },
    _mouseCapture: function(b) {
      var c, d, e = !1;
      for (c in this.handles) d = a(this.handles[c])[0], (d === b.target || a.contains(d, b.target)) && (e = !0);
      return !this.options.disabled && e
    },
    _mouseStart: function(b) {
      var d, e, f, g = this.options,
        h = this.element.position(),
        i = this.element;
      return this.resizing = !0, /absolute/.test(i.css("position")) ? i.css({
        position: "absolute",
        top: i.css("top"),
        left: i.css("left")
      }) : i.is(".ui-draggable") && i.css({
        position: "absolute",
        top: h.top,
        left: h.left
      }), this._renderProxy(), d = c(this.helper.css("left")), e = c(this.helper.css("top")), g.containment && (d += a(g.containment).scrollLeft() || 0, e += a(g.containment).scrollTop() || 0), this.offset = this.helper.offset(), this.position = {
        left: d,
        top: e
      }, this.size = this._helper ? {
        width: i.outerWidth(),
        height: i.outerHeight()
      } : {
        width: i.width(),
        height: i.height()
      }, this.originalSize = this._helper ? {
        width: i.outerWidth(),
        height: i.outerHeight()
      } : {
        width: i.width(),
        height: i.height()
      }, this.originalPosition = {
        left: d,
        top: e
      }, this.sizeDiff = {
        width: i.outerWidth() - i.width(),
        height: i.outerHeight() - i.height()
      }, this.originalMousePosition = {
        left: b.pageX,
        top: b.pageY
      }, this.aspectRatio = "number" == typeof g.aspectRatio ? g.aspectRatio : this.originalSize.width / this.originalSize.height || 1, f = a(".ui-resizable-" + this.axis).css("cursor"), a("body").css("cursor", "auto" === f ? this.axis + "-resize" : f), i.addClass("ui-resizable-resizing"), this._propagate("start", b), !0
    },
    _mouseDrag: function(b) {
      var c, d = this.helper,
        e = {},
        f = this.originalMousePosition,
        g = this.axis,
        h = this.position.top,
        i = this.position.left,
        j = this.size.width,
        k = this.size.height,
        l = b.pageX - f.left || 0,
        m = b.pageY - f.top || 0,
        n = this._change[g];
      return n ? (c = n.apply(this, [b, l, m]), this._updateVirtualBoundaries(b.shiftKey), (this._aspectRatio || b.shiftKey) && (c = this._updateRatio(c, b)), c = this._respectSize(c, b), this._updateCache(c), this._propagate("resize", b), this.position.top !== h && (e.top = this.position.top + "px"), this.position.left !== i && (e.left = this.position.left + "px"), this.size.width !== j && (e.width = this.size.width + "px"), this.size.height !== k && (e.height = this.size.height + "px"), d.css(e), !this._helper && this._proportionallyResizeElements.length && this._proportionallyResize(), a.isEmptyObject(e) || this._trigger("resize", b, this.ui()), !1) : !1
    },
    _mouseStop: function(b) {
      this.resizing = !1;
      var c, d, e, f, g, h, i, j = this.options,
        k = this;
      return this._helper && (c = this._proportionallyResizeElements, d = c.length && /textarea/i.test(c[0].nodeName), e = d && a.ui.hasScroll(c[0], "left") ? 0 : k.sizeDiff.height, f = d ? 0 : k.sizeDiff.width, g = {
        width: k.helper.width() - f,
        height: k.helper.height() - e
      }, h = parseInt(k.element.css("left"), 10) + (k.position.left - k.originalPosition.left) || null, i = parseInt(k.element.css("top"), 10) + (k.position.top - k.originalPosition.top) || null, j.animate || this.element.css(a.extend(g, {
        top: i,
        left: h
      })), k.helper.height(k.size.height), k.helper.width(k.size.width), this._helper && !j.animate && this._proportionallyResize()), a("body").css("cursor", "auto"), this.element.removeClass("ui-resizable-resizing"), this._propagate("stop", b), this._helper && this.helper.remove(), !1
    },
    _updateVirtualBoundaries: function(a) {
      var b, c, e, f, g, h = this.options;
      g = {
        minWidth: d(h.minWidth) ? h.minWidth : 0,
        maxWidth: d(h.maxWidth) ? h.maxWidth : 1 / 0,
        minHeight: d(h.minHeight) ? h.minHeight : 0,
        maxHeight: d(h.maxHeight) ? h.maxHeight : 1 / 0
      }, (this._aspectRatio || a) && (b = g.minHeight * this.aspectRatio, e = g.minWidth / this.aspectRatio, c = g.maxHeight * this.aspectRatio, f = g.maxWidth / this.aspectRatio, b > g.minWidth && (g.minWidth = b), e > g.minHeight && (g.minHeight = e), c < g.maxWidth && (g.maxWidth = c), f < g.maxHeight && (g.maxHeight = f)), this._vBoundaries = g
    },
    _updateCache: function(a) {
      this.offset = this.helper.offset(), d(a.left) && (this.position.left = a.left), d(a.top) && (this.position.top = a.top), d(a.height) && (this.size.height = a.height), d(a.width) && (this.size.width = a.width)
    },
    _updateRatio: function(a) {
      var b = this.position,
        c = this.size,
        e = this.axis;
      return d(a.height) ? a.width = a.height * this.aspectRatio : d(a.width) && (a.height = a.width / this.aspectRatio), "sw" === e && (a.left = b.left + (c.width - a.width), a.top = null), "nw" === e && (a.top = b.top + (c.height - a.height), a.left = b.left + (c.width - a.width)), a
    },
    _respectSize: function(a) {
      var b = this._vBoundaries,
        c = this.axis,
        e = d(a.width) && b.maxWidth && b.maxWidth < a.width,
        f = d(a.height) && b.maxHeight && b.maxHeight < a.height,
        g = d(a.width) && b.minWidth && b.minWidth > a.width,
        h = d(a.height) && b.minHeight && b.minHeight > a.height,
        i = this.originalPosition.left + this.originalSize.width,
        j = this.position.top + this.size.height,
        k = /sw|nw|w/.test(c),
        l = /nw|ne|n/.test(c);
      return g && (a.width = b.minWidth), h && (a.height = b.minHeight), e && (a.width = b.maxWidth), f && (a.height = b.maxHeight), g && k && (a.left = i - b.minWidth), e && k && (a.left = i - b.maxWidth), h && l && (a.top = j - b.minHeight), f && l && (a.top = j - b.maxHeight), a.width || a.height || a.left || !a.top ? a.width || a.height || a.top || !a.left || (a.left = null) : a.top = null, a
    },
    _proportionallyResize: function() {
      if (this._proportionallyResizeElements.length) {
        var a, b, c, d, e, f = this.helper || this.element;
        for (a = 0; a < this._proportionallyResizeElements.length; a++) {
          if (e = this._proportionallyResizeElements[a], !this.borderDif)
            for (this.borderDif = [], c = [e.css("borderTopWidth"), e.css("borderRightWidth"), e.css("borderBottomWidth"), e.css("borderLeftWidth")], d = [e.css("paddingTop"), e.css("paddingRight"), e.css("paddingBottom"), e.css("paddingLeft")], b = 0; b < c.length; b++) this.borderDif[b] = (parseInt(c[b], 10) || 0) + (parseInt(d[b], 10) || 0);
          e.css({
            height: f.height() - this.borderDif[0] - this.borderDif[2] || 0,
            width: f.width() - this.borderDif[1] - this.borderDif[3] || 0
          })
        }
      }
    },
    _renderProxy: function() {
      var b = this.element,
        c = this.options;
      this.elementOffset = b.offset(), this._helper ? (this.helper = this.helper || a("<div style='overflow:hidden;'></div>"), this.helper.addClass(this._helper).css({
        width: this.element.outerWidth() - 1,
        height: this.element.outerHeight() - 1,
        position: "absolute",
        left: this.elementOffset.left + "px",
        top: this.elementOffset.top + "px",
        zIndex: ++c.zIndex
      }), this.helper.appendTo("body").disableSelection()) : this.helper = this.element
    },
    _change: {
      e: function(a, b) {
        return {
          width: this.originalSize.width + b
        }
      },
      w: function(a, b) {
        var c = this.originalSize,
          d = this.originalPosition;
        return {
          left: d.left + b,
          width: c.width - b
        }
      },
      n: function(a, b, c) {
        var d = this.originalSize,
          e = this.originalPosition;
        return {
          top: e.top + c,
          height: d.height - c
        }
      },
      s: function(a, b, c) {
        return {
          height: this.originalSize.height + c
        }
      },
      se: function(b, c, d) {
        return a.extend(this._change.s.apply(this, arguments), this._change.e.apply(this, [b, c, d]))
      },
      sw: function(b, c, d) {
        return a.extend(this._change.s.apply(this, arguments), this._change.w.apply(this, [b, c, d]))
      },
      ne: function(b, c, d) {
        return a.extend(this._change.n.apply(this, arguments), this._change.e.apply(this, [b, c, d]))
      },
      nw: function(b, c, d) {
        return a.extend(this._change.n.apply(this, arguments), this._change.w.apply(this, [b, c, d]))
      }
    },
    _propagate: function(b, c) {
      a.ui.plugin.call(this, b, [c, this.ui()]), "resize" !== b && this._trigger(b, c, this.ui())
    },
    plugins: {},
    ui: function() {
      return {
        originalElement: this.originalElement,
        element: this.element,
        helper: this.helper,
        position: this.position,
        size: this.size,
        originalSize: this.originalSize,
        originalPosition: this.originalPosition
      }
    }
  }), a.ui.plugin.add("resizable", "animate", {
    stop: function(b) {
      var c = a(this).data("ui-resizable"),
        d = c.options,
        e = c._proportionallyResizeElements,
        f = e.length && /textarea/i.test(e[0].nodeName),
        g = f && a.ui.hasScroll(e[0], "left") ? 0 : c.sizeDiff.height,
        h = f ? 0 : c.sizeDiff.width,
        i = {
          width: c.size.width - h,
          height: c.size.height - g
        },
        j = parseInt(c.element.css("left"), 10) + (c.position.left - c.originalPosition.left) || null,
        k = parseInt(c.element.css("top"), 10) + (c.position.top - c.originalPosition.top) || null;
      c.element.animate(a.extend(i, k && j ? {
        top: k,
        left: j
      } : {}), {
        duration: d.animateDuration,
        easing: d.animateEasing,
        step: function() {
          var d = {
            width: parseInt(c.element.css("width"), 10),
            height: parseInt(c.element.css("height"), 10),
            top: parseInt(c.element.css("top"), 10),
            left: parseInt(c.element.css("left"), 10)
          };
          e && e.length && a(e[0]).css({
            width: d.width,
            height: d.height
          }), c._updateCache(d), c._propagate("resize", b)
        }
      })
    }
  }), a.ui.plugin.add("resizable", "containment", {
    start: function() {
      var b, d, e, f, g, h, i, j = a(this).data("ui-resizable"),
        k = j.options,
        l = j.element,
        m = k.containment,
        n = m instanceof a ? m.get(0) : /parent/.test(m) ? l.parent().get(0) : m;
      n && (j.containerElement = a(n), /document/.test(m) || m === document ? (j.containerOffset = {
        left: 0,
        top: 0
      }, j.containerPosition = {
        left: 0,
        top: 0
      }, j.parentData = {
        element: a(document),
        left: 0,
        top: 0,
        width: a(document).width(),
        height: a(document).height() || document.body.parentNode.scrollHeight
      }) : (b = a(n), d = [], a(["Top", "Right", "Left", "Bottom"]).each(function(a, e) {
        d[a] = c(b.css("padding" + e))
      }), j.containerOffset = b.offset(), j.containerPosition = b.position(), j.containerSize = {
        height: b.innerHeight() - d[3],
        width: b.innerWidth() - d[1]
      }, e = j.containerOffset, f = j.containerSize.height, g = j.containerSize.width, h = a.ui.hasScroll(n, "left") ? n.scrollWidth : g, i = a.ui.hasScroll(n) ? n.scrollHeight : f, j.parentData = {
        element: n,
        left: e.left,
        top: e.top,
        width: h,
        height: i
      }))
    },
    resize: function(b) {
      var c, d, e, f, g = a(this).data("ui-resizable"),
        h = g.options,
        i = g.containerOffset,
        j = g.position,
        k = g._aspectRatio || b.shiftKey,
        l = {
          top: 0,
          left: 0
        },
        m = g.containerElement;
      m[0] !== document && /static/.test(m.css("position")) && (l = i), j.left < (g._helper ? i.left : 0) && (g.size.width = g.size.width + (g._helper ? g.position.left - i.left : g.position.left - l.left), k && (g.size.height = g.size.width / g.aspectRatio), g.position.left = h.helper ? i.left : 0), j.top < (g._helper ? i.top : 0) && (g.size.height = g.size.height + (g._helper ? g.position.top - i.top : g.position.top), k && (g.size.width = g.size.height * g.aspectRatio), g.position.top = g._helper ? i.top : 0), g.offset.left = g.parentData.left + g.position.left, g.offset.top = g.parentData.top + g.position.top, c = Math.abs((g._helper ? g.offset.left - l.left : g.offset.left - l.left) + g.sizeDiff.width), d = Math.abs((g._helper ? g.offset.top - l.top : g.offset.top - i.top) + g.sizeDiff.height), e = g.containerElement.get(0) === g.element.parent().get(0), f = /relative|absolute/.test(g.containerElement.css("position")), e && f && (c -= g.parentData.left), c + g.size.width >= g.parentData.width && (g.size.width = g.parentData.width - c, k && (g.size.height = g.size.width / g.aspectRatio)), d + g.size.height >= g.parentData.height && (g.size.height = g.parentData.height - d, k && (g.size.width = g.size.height * g.aspectRatio))
    },
    stop: function() {
      var b = a(this).data("ui-resizable"),
        c = b.options,
        d = b.containerOffset,
        e = b.containerPosition,
        f = b.containerElement,
        g = a(b.helper),
        h = g.offset(),
        i = g.outerWidth() - b.sizeDiff.width,
        j = g.outerHeight() - b.sizeDiff.height;
      b._helper && !c.animate && /relative/.test(f.css("position")) && a(this).css({
        left: h.left - e.left - d.left,
        width: i,
        height: j
      }), b._helper && !c.animate && /static/.test(f.css("position")) && a(this).css({
        left: h.left - e.left - d.left,
        width: i,
        height: j
      })
    }
  }), a.ui.plugin.add("resizable", "alsoResize", {
    start: function() {
      var b = a(this).data("ui-resizable"),
        c = b.options,
        d = function(b) {
          a(b).each(function() {
            var b = a(this);
            b.data("ui-resizable-alsoresize", {
              width: parseInt(b.width(), 10),
              height: parseInt(b.height(), 10),
              left: parseInt(b.css("left"), 10),
              top: parseInt(b.css("top"), 10)
            })
          })
        };
      "object" != typeof c.alsoResize || c.alsoResize.parentNode ? d(c.alsoResize) : c.alsoResize.length ? (c.alsoResize = c.alsoResize[0], d(c.alsoResize)) : a.each(c.alsoResize, function(a) {
        d(a)
      })
    },
    resize: function(b, c) {
      var d = a(this).data("ui-resizable"),
        e = d.options,
        f = d.originalSize,
        g = d.originalPosition,
        h = {
          height: d.size.height - f.height || 0,
          width: d.size.width - f.width || 0,
          top: d.position.top - g.top || 0,
          left: d.position.left - g.left || 0
        },
        i = function(b, d) {
          a(b).each(function() {
            var b = a(this),
              e = a(this).data("ui-resizable-alsoresize"),
              f = {},
              g = d && d.length ? d : b.parents(c.originalElement[0]).length ? ["width", "height"] : ["width", "height", "top", "left"];
            a.each(g, function(a, b) {
              var c = (e[b] || 0) + (h[b] || 0);
              c && c >= 0 && (f[b] = c || null)
            }), b.css(f)
          })
        };
      "object" != typeof e.alsoResize || e.alsoResize.nodeType ? i(e.alsoResize) : a.each(e.alsoResize, function(a, b) {
        i(a, b)
      })
    },
    stop: function() {
      a(this).removeData("resizable-alsoresize")
    }
  }), a.ui.plugin.add("resizable", "ghost", {
    start: function() {
      var b = a(this).data("ui-resizable"),
        c = b.options,
        d = b.size;
      b.ghost = b.originalElement.clone(), b.ghost.css({
        opacity: .25,
        display: "block",
        position: "relative",
        height: d.height,
        width: d.width,
        margin: 0,
        left: 0,
        top: 0
      }).addClass("ui-resizable-ghost").addClass("string" == typeof c.ghost ? c.ghost : ""), b.ghost.appendTo(b.helper)
    },
    resize: function() {
      var b = a(this).data("ui-resizable");
      b.ghost && b.ghost.css({
        position: "relative",
        height: b.size.height,
        width: b.size.width
      })
    },
    stop: function() {
      var b = a(this).data("ui-resizable");
      b.ghost && b.helper && b.helper.get(0).removeChild(b.ghost.get(0))
    }
  }), a.ui.plugin.add("resizable", "grid", {
    resize: function() {
      var b = a(this).data("ui-resizable"),
        c = b.options,
        d = b.size,
        e = b.originalSize,
        f = b.originalPosition,
        g = b.axis,
        h = "number" == typeof c.grid ? [c.grid, c.grid] : c.grid,
        i = h[0] || 1,
        j = h[1] || 1,
        k = Math.round((d.width - e.width) / i) * i,
        l = Math.round((d.height - e.height) / j) * j,
        m = e.width + k,
        n = e.height + l,
        o = c.maxWidth && c.maxWidth < m,
        p = c.maxHeight && c.maxHeight < n,
        q = c.minWidth && c.minWidth > m,
        r = c.minHeight && c.minHeight > n;
      c.grid = h, q && (m += i), r && (n += j), o && (m -= i), p && (n -= j), /^(se|s|e)$/.test(g) ? (b.size.width = m, b.size.height = n) : /^(ne)$/.test(g) ? (b.size.width = m, b.size.height = n, b.position.top = f.top - l) : /^(sw)$/.test(g) ? (b.size.width = m, b.size.height = n, b.position.left = f.left - k) : (b.size.width = m, b.size.height = n, b.position.top = f.top - l, b.position.left = f.left - k)
    }
  })
}(jQuery),
function(a) {
  a.widget("ui.selectable", a.ui.mouse, {
    version: "1.10.3",
    options: {
      appendTo: "body",
      autoRefresh: !0,
      distance: 0,
      filter: "*",
      tolerance: "touch",
      selected: null,
      selecting: null,
      start: null,
      stop: null,
      unselected: null,
      unselecting: null
    },
    _create: function() {
      var b, c = this;
      this.element.addClass("ui-selectable"), this.dragged = !1, this.refresh = function() {
        b = a(c.options.filter, c.element[0]), b.addClass("ui-selectee"), b.each(function() {
          var b = a(this),
            c = b.offset();
          a.data(this, "selectable-item", {
            element: this,
            $element: b,
            left: c.left,
            top: c.top,
            right: c.left + b.outerWidth(),
            bottom: c.top + b.outerHeight(),
            startselected: !1,
            selected: b.hasClass("ui-selected"),
            selecting: b.hasClass("ui-selecting"),
            unselecting: b.hasClass("ui-unselecting")
          })
        })
      }, this.refresh(), this.selectees = b.addClass("ui-selectee"), this._mouseInit(), this.helper = a("<div class='ui-selectable-helper'></div>")
    },
    _destroy: function() {
      this.selectees.removeClass("ui-selectee").removeData("selectable-item"), this.element.removeClass("ui-selectable ui-selectable-disabled"), this._mouseDestroy()
    },
    _mouseStart: function(b) {
      var c = this,
        d = this.options;
      this.opos = [b.pageX, b.pageY], this.options.disabled || (this.selectees = a(d.filter, this.element[0]), this._trigger("start", b), a(d.appendTo).append(this.helper), this.helper.css({
        left: b.pageX,
        top: b.pageY,
        width: 0,
        height: 0
      }), d.autoRefresh && this.refresh(), this.selectees.filter(".ui-selected").each(function() {
        var d = a.data(this, "selectable-item");
        d.startselected = !0, b.metaKey || b.ctrlKey || (d.$element.removeClass("ui-selected"), d.selected = !1, d.$element.addClass("ui-unselecting"), d.unselecting = !0, c._trigger("unselecting", b, {
          unselecting: d.element
        }))
      }), a(b.target).parents().addBack().each(function() {
        var d, e = a.data(this, "selectable-item");
        return e ? (d = !b.metaKey && !b.ctrlKey || !e.$element.hasClass("ui-selected"), e.$element.removeClass(d ? "ui-unselecting" : "ui-selected").addClass(d ? "ui-selecting" : "ui-unselecting"), e.unselecting = !d, e.selecting = d, e.selected = d, d ? c._trigger("selecting", b, {
          selecting: e.element
        }) : c._trigger("unselecting", b, {
          unselecting: e.element
        }), !1) : void 0
      }))
    },
    _mouseDrag: function(b) {
      if (this.dragged = !0, !this.options.disabled) {
        var c, d = this,
          e = this.options,
          f = this.opos[0],
          g = this.opos[1],
          h = b.pageX,
          i = b.pageY;
        return f > h && (c = h, h = f, f = c), g > i && (c = i, i = g, g = c), this.helper.css({
          left: f,
          top: g,
          width: h - f,
          height: i - g
        }), this.selectees.each(function() {
          var c = a.data(this, "selectable-item"),
            j = !1;
          c && c.element !== d.element[0] && ("touch" === e.tolerance ? j = !(c.left > h || c.right < f || c.top > i || c.bottom < g) : "fit" === e.tolerance && (j = c.left > f && c.right < h && c.top > g && c.bottom < i), j ? (c.selected && (c.$element.removeClass("ui-selected"), c.selected = !1), c.unselecting && (c.$element.removeClass("ui-unselecting"), c.unselecting = !1), c.selecting || (c.$element.addClass("ui-selecting"), c.selecting = !0, d._trigger("selecting", b, {
            selecting: c.element
          }))) : (c.selecting && ((b.metaKey || b.ctrlKey) && c.startselected ? (c.$element.removeClass("ui-selecting"), c.selecting = !1, c.$element.addClass("ui-selected"), c.selected = !0) : (c.$element.removeClass("ui-selecting"), c.selecting = !1, c.startselected && (c.$element.addClass("ui-unselecting"), c.unselecting = !0), d._trigger("unselecting", b, {
            unselecting: c.element
          }))), c.selected && (b.metaKey || b.ctrlKey || c.startselected || (c.$element.removeClass("ui-selected"), c.selected = !1, c.$element.addClass("ui-unselecting"), c.unselecting = !0, d._trigger("unselecting", b, {
            unselecting: c.element
          })))))
        }), !1
      }
    },
    _mouseStop: function(b) {
      var c = this;
      return this.dragged = !1, a(".ui-unselecting", this.element[0]).each(function() {
        var d = a.data(this, "selectable-item");
        d.$element.removeClass("ui-unselecting"), d.unselecting = !1, d.startselected = !1, c._trigger("unselected", b, {
          unselected: d.element
        })
      }), a(".ui-selecting", this.element[0]).each(function() {
        var d = a.data(this, "selectable-item");
        d.$element.removeClass("ui-selecting").addClass("ui-selected"), d.selecting = !1, d.selected = !0, d.startselected = !0, c._trigger("selected", b, {
          selected: d.element
        })
      }), this._trigger("stop", b), this.helper.remove(), !1
    }
  })
}(jQuery),
function(a) {
  function c(a, b, c) {
    return a > b && b + c > a
  }

  function d(a) {
    return /left|right/.test(a.css("float")) || /inline|table-cell/.test(a.css("display"))
  }
  a.widget("ui.sortable", a.ui.mouse, {
    version: "1.10.3",
    widgetEventPrefix: "sort",
    ready: !1,
    options: {
      appendTo: "parent",
      axis: !1,
      connectWith: !1,
      containment: !1,
      cursor: "auto",
      cursorAt: !1,
      dropOnEmpty: !0,
      forcePlaceholderSize: !1,
      forceHelperSize: !1,
      grid: !1,
      handle: !1,
      helper: "original",
      items: "> *",
      opacity: !1,
      placeholder: !1,
      revert: !1,
      scroll: !0,
      scrollSensitivity: 20,
      scrollSpeed: 20,
      scope: "default",
      tolerance: "intersect",
      zIndex: 1e3,
      activate: null,
      beforeStop: null,
      change: null,
      deactivate: null,
      out: null,
      over: null,
      receive: null,
      remove: null,
      sort: null,
      start: null,
      stop: null,
      update: null
    },
    _create: function() {
      var a = this.options;
      this.containerCache = {}, this.element.addClass("ui-sortable"), this.refresh(), this.floating = this.items.length ? "x" === a.axis || d(this.items[0].item) : !1, this.offset = this.element.offset(), this._mouseInit(), this.ready = !0
    },
    _destroy: function() {
      this.element.removeClass("ui-sortable ui-sortable-disabled"), this._mouseDestroy();
      for (var a = this.items.length - 1; a >= 0; a--) this.items[a].item.removeData(this.widgetName + "-item");
      return this
    },
    _setOption: function(b, c) {
      "disabled" === b ? (this.options[b] = c, this.widget().toggleClass("ui-sortable-disabled", !!c)) : a.Widget.prototype._setOption.apply(this, arguments)
    },
    _mouseCapture: function(b, c) {
      var d = null,
        e = !1,
        f = this;
      return this.reverting ? !1 : this.options.disabled || "static" === this.options.type ? !1 : (this._refreshItems(b), a(b.target).parents().each(function() {
        return a.data(this, f.widgetName + "-item") === f ? (d = a(this), !1) : void 0
      }), a.data(b.target, f.widgetName + "-item") === f && (d = a(b.target)), d ? !this.options.handle || c || (a(this.options.handle, d).find("*").addBack().each(function() {
        this === b.target && (e = !0)
      }), e) ? (this.currentItem = d, this._removeCurrentsFromItems(), !0) : !1 : !1)
    },
    _mouseStart: function(b, c, d) {
      var e, f, g = this.options;
      if (this.currentContainer = this, this.refreshPositions(), this.helper = this._createHelper(b), this._cacheHelperProportions(), this._cacheMargins(), this.scrollParent = this.helper.scrollParent(), this.offset = this.currentItem.offset(), this.offset = {
          top: this.offset.top - this.margins.top,
          left: this.offset.left - this.margins.left
        }, a.extend(this.offset, {
          click: {
            left: b.pageX - this.offset.left,
            top: b.pageY - this.offset.top
          },
          parent: this._getParentOffset(),
          relative: this._getRelativeOffset()
        }), this.helper.css("position", "absolute"), this.cssPosition = this.helper.css("position"), this.originalPosition = this._generatePosition(b), this.originalPageX = b.pageX, this.originalPageY = b.pageY, g.cursorAt && this._adjustOffsetFromHelper(g.cursorAt), this.domPosition = {
          prev: this.currentItem.prev()[0],
          parent: this.currentItem.parent()[0]
        }, this.helper[0] !== this.currentItem[0] && this.currentItem.hide(), this._createPlaceholder(), g.containment && this._setContainment(), g.cursor && "auto" !== g.cursor && (f = this.document.find("body"), this.storedCursor = f.css("cursor"), f.css("cursor", g.cursor), this.storedStylesheet = a("<style>*{ cursor: " + g.cursor + " !important; }</style>").appendTo(f)), g.opacity && (this.helper.css("opacity") && (this._storedOpacity = this.helper.css("opacity")), this.helper.css("opacity", g.opacity)), g.zIndex && (this.helper.css("zIndex") && (this._storedZIndex = this.helper.css("zIndex")), this.helper.css("zIndex", g.zIndex)), this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName && (this.overflowOffset = this.scrollParent.offset()), this._trigger("start", b, this._uiHash()), this._preserveHelperProportions || this._cacheHelperProportions(), !d)
        for (e = this.containers.length - 1; e >= 0; e--) this.containers[e]._trigger("activate", b, this._uiHash(this));
      return a.ui.ddmanager && (a.ui.ddmanager.current = this), a.ui.ddmanager && !g.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b), this.dragging = !0, this.helper.addClass("ui-sortable-helper"), this._mouseDrag(b), !0
    },
    _mouseDrag: function(b) {
      var c, d, e, f, g = this.options,
        h = !1;
      for (this.position = this._generatePosition(b), this.positionAbs = this._convertPositionTo("absolute"), this.lastPositionAbs || (this.lastPositionAbs = this.positionAbs), this.options.scroll && (this.scrollParent[0] !== document && "HTML" !== this.scrollParent[0].tagName ? (this.overflowOffset.top + this.scrollParent[0].offsetHeight - b.pageY < g.scrollSensitivity ? this.scrollParent[0].scrollTop = h = this.scrollParent[0].scrollTop + g.scrollSpeed : b.pageY - this.overflowOffset.top < g.scrollSensitivity && (this.scrollParent[0].scrollTop = h = this.scrollParent[0].scrollTop - g.scrollSpeed), this.overflowOffset.left + this.scrollParent[0].offsetWidth - b.pageX < g.scrollSensitivity ? this.scrollParent[0].scrollLeft = h = this.scrollParent[0].scrollLeft + g.scrollSpeed : b.pageX - this.overflowOffset.left < g.scrollSensitivity && (this.scrollParent[0].scrollLeft = h = this.scrollParent[0].scrollLeft - g.scrollSpeed)) : (b.pageY - a(document).scrollTop() < g.scrollSensitivity ? h = a(document).scrollTop(a(document).scrollTop() - g.scrollSpeed) : a(window).height() - (b.pageY - a(document).scrollTop()) < g.scrollSensitivity && (h = a(document).scrollTop(a(document).scrollTop() + g.scrollSpeed)), b.pageX - a(document).scrollLeft() < g.scrollSensitivity ? h = a(document).scrollLeft(a(document).scrollLeft() - g.scrollSpeed) : a(window).width() - (b.pageX - a(document).scrollLeft()) < g.scrollSensitivity && (h = a(document).scrollLeft(a(document).scrollLeft() + g.scrollSpeed))), h !== !1 && a.ui.ddmanager && !g.dropBehaviour && a.ui.ddmanager.prepareOffsets(this, b)), this.positionAbs = this._convertPositionTo("absolute"), this.options.axis && "y" === this.options.axis || (this.helper[0].style.left = this.position.left + "px"), this.options.axis && "x" === this.options.axis || (this.helper[0].style.top = this.position.top + "px"), c = this.items.length - 1; c >= 0; c--)
        if (d = this.items[c], e = d.item[0], f = this._intersectsWithPointer(d), f && d.instance === this.currentContainer && e !== this.currentItem[0] && this.placeholder[1 === f ? "next" : "prev"]()[0] !== e && !a.contains(this.placeholder[0], e) && ("semi-dynamic" === this.options.type ? !a.contains(this.element[0], e) : !0)) {
          if (this.direction = 1 === f ? "down" : "up", "pointer" !== this.options.tolerance && !this._intersectsWithSides(d)) break;
          this._rearrange(b, d), this._trigger("change", b, this._uiHash());
          break
        }
      return this._contactContainers(b), a.ui.ddmanager && a.ui.ddmanager.drag(this, b), this._trigger("sort", b, this._uiHash()), this.lastPositionAbs = this.positionAbs, !1
    },
    _mouseStop: function(b, c) {
      if (b) {
        if (a.ui.ddmanager && !this.options.dropBehaviour && a.ui.ddmanager.drop(this, b), this.options.revert) {
          var d = this,
            e = this.placeholder.offset(),
            f = this.options.axis,
            g = {};
          f && "x" !== f || (g.left = e.left - this.offset.parent.left - this.margins.left + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollLeft)), f && "y" !== f || (g.top = e.top - this.offset.parent.top - this.margins.top + (this.offsetParent[0] === document.body ? 0 : this.offsetParent[0].scrollTop)), this.reverting = !0, a(this.helper).animate(g, parseInt(this.options.revert, 10) || 500, function() {
            d._clear(b)
          })
        } else this._clear(b, c);
        return !1
      }
    },
    cancel: function() {
      if (this.dragging) {
        this._mouseUp({
          target: null
        }), "original" === this.options.helper ? this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper") : this.currentItem.show();
        for (var b = this.containers.length - 1; b >= 0; b--) this.containers[b]._trigger("deactivate", null, this._uiHash(this)), this.containers[b].containerCache.over && (this.containers[b]._trigger("out", null, this._uiHash(this)), this.containers[b].containerCache.over = 0)
      }
      return this.placeholder && (this.placeholder[0].parentNode && this.placeholder[0].parentNode.removeChild(this.placeholder[0]), "original" !== this.options.helper && this.helper && this.helper[0].parentNode && this.helper.remove(), a.extend(this, {
        helper: null,
        dragging: !1,
        reverting: !1,
        _noFinalSort: null
      }), this.domPosition.prev ? a(this.domPosition.prev).after(this.currentItem) : a(this.domPosition.parent).prepend(this.currentItem)), this
    },
    serialize: function(b) {
      var c = this._getItemsAsjQuery(b && b.connected),
        d = [];
      return b = b || {}, a(c).each(function() {
        var c = (a(b.item || this).attr(b.attribute || "id") || "").match(b.expression || /(.+)[\-=_](.+)/);
        c && d.push((b.key || c[1] + "[]") + "=" + (b.key && b.expression ? c[1] : c[2]))
      }), !d.length && b.key && d.push(b.key + "="), d.join("&")
    },
    toArray: function(b) {
      var c = this._getItemsAsjQuery(b && b.connected),
        d = [];
      return b = b || {}, c.each(function() {
        d.push(a(b.item || this).attr(b.attribute || "id") || "")
      }), d
    },
    _intersectsWith: function(a) {
      var b = this.positionAbs.left,
        c = b + this.helperProportions.width,
        d = this.positionAbs.top,
        e = d + this.helperProportions.height,
        f = a.left,
        g = f + a.width,
        h = a.top,
        i = h + a.height,
        j = this.offset.click.top,
        k = this.offset.click.left,
        l = "x" === this.options.axis || d + j > h && i > d + j,
        m = "y" === this.options.axis || b + k > f && g > b + k,
        n = l && m;
      return "pointer" === this.options.tolerance || this.options.forcePointerForContainers || "pointer" !== this.options.tolerance && this.helperProportions[this.floating ? "width" : "height"] > a[this.floating ? "width" : "height"] ? n : f < b + this.helperProportions.width / 2 && c - this.helperProportions.width / 2 < g && h < d + this.helperProportions.height / 2 && e - this.helperProportions.height / 2 < i
    },
    _intersectsWithPointer: function(a) {
      var b = "x" === this.options.axis || c(this.positionAbs.top + this.offset.click.top, a.top, a.height),
        d = "y" === this.options.axis || c(this.positionAbs.left + this.offset.click.left, a.left, a.width),
        e = b && d,
        f = this._getDragVerticalDirection(),
        g = this._getDragHorizontalDirection();
      return e ? this.floating ? g && "right" === g || "down" === f ? 2 : 1 : f && ("down" === f ? 2 : 1) : !1
    },
    _intersectsWithSides: function(a) {
      var b = c(this.positionAbs.top + this.offset.click.top, a.top + a.height / 2, a.height),
        d = c(this.positionAbs.left + this.offset.click.left, a.left + a.width / 2, a.width),
        e = this._getDragVerticalDirection(),
        f = this._getDragHorizontalDirection();
      return this.floating && f ? "right" === f && d || "left" === f && !d : e && ("down" === e && b || "up" === e && !b)
    },
    _getDragVerticalDirection: function() {
      var a = this.positionAbs.top - this.lastPositionAbs.top;
      return 0 !== a && (a > 0 ? "down" : "up")
    },
    _getDragHorizontalDirection: function() {
      var a = this.positionAbs.left - this.lastPositionAbs.left;
      return 0 !== a && (a > 0 ? "right" : "left")
    },
    refresh: function(a) {
      return this._refreshItems(a), this.refreshPositions(), this
    },
    _connectWith: function() {
      var a = this.options;
      return a.connectWith.constructor === String ? [a.connectWith] : a.connectWith
    },
    _getItemsAsjQuery: function(b) {
      var c, d, e, f, g = [],
        h = [],
        i = this._connectWith();
      if (i && b)
        for (c = i.length - 1; c >= 0; c--)
          for (e = a(i[c]), d = e.length - 1; d >= 0; d--) f = a.data(e[d], this.widgetFullName), f && f !== this && !f.options.disabled && h.push([a.isFunction(f.options.items) ? f.options.items.call(f.element) : a(f.options.items, f.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), f]);
      for (h.push([a.isFunction(this.options.items) ? this.options.items.call(this.element, null, {
          options: this.options,
          item: this.currentItem
        }) : a(this.options.items, this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"), this]), c = h.length - 1; c >= 0; c--) h[c][0].each(function() {
        g.push(this)
      });
      return a(g)
    },
    _removeCurrentsFromItems: function() {
      var b = this.currentItem.find(":data(" + this.widgetName + "-item)");
      this.items = a.grep(this.items, function(a) {
        for (var c = 0; c < b.length; c++)
          if (b[c] === a.item[0]) return !1;
        return !0
      })
    },
    _refreshItems: function(b) {
      this.items = [], this.containers = [this];
      var c, d, e, f, g, h, i, j, k = this.items,
        l = [
          [a.isFunction(this.options.items) ? this.options.items.call(this.element[0], b, {
            item: this.currentItem
          }) : a(this.options.items, this.element), this]
        ],
        m = this._connectWith();
      if (m && this.ready)
        for (c = m.length - 1; c >= 0; c--)
          for (e = a(m[c]), d = e.length - 1; d >= 0; d--) f = a.data(e[d], this.widgetFullName), f && f !== this && !f.options.disabled && (l.push([a.isFunction(f.options.items) ? f.options.items.call(f.element[0], b, {
            item: this.currentItem
          }) : a(f.options.items, f.element), f]), this.containers.push(f));
      for (c = l.length - 1; c >= 0; c--)
        for (g = l[c][1], h = l[c][0], d = 0, j = h.length; j > d; d++) i = a(h[d]), i.data(this.widgetName + "-item", g), k.push({
          item: i,
          instance: g,
          width: 0,
          height: 0,
          left: 0,
          top: 0
        })
    },
    refreshPositions: function(b) {
      this.offsetParent && this.helper && (this.offset.parent = this._getParentOffset());
      var c, d, e, f;
      for (c = this.items.length - 1; c >= 0; c--) d = this.items[c], d.instance !== this.currentContainer && this.currentContainer && d.item[0] !== this.currentItem[0] || (e = this.options.toleranceElement ? a(this.options.toleranceElement, d.item) : d.item, b || (d.width = e.outerWidth(), d.height = e.outerHeight()), f = e.offset(), d.left = f.left, d.top = f.top);
      if (this.options.custom && this.options.custom.refreshContainers) this.options.custom.refreshContainers.call(this);
      else
        for (c = this.containers.length - 1; c >= 0; c--) f = this.containers[c].element.offset(), this.containers[c].containerCache.left = f.left, this.containers[c].containerCache.top = f.top, this.containers[c].containerCache.width = this.containers[c].element.outerWidth(), this.containers[c].containerCache.height = this.containers[c].element.outerHeight();
      return this
    },
    _createPlaceholder: function(b) {
      b = b || this;
      var c, d = b.options;
      d.placeholder && d.placeholder.constructor !== String || (c = d.placeholder, d.placeholder = {
        element: function() {
          var d = b.currentItem[0].nodeName.toLowerCase(),
            e = a("<" + d + ">", b.document[0]).addClass(c || b.currentItem[0].className + " ui-sortable-placeholder").removeClass("ui-sortable-helper");
          return "tr" === d ? b.currentItem.children().each(function() {
            a("<td>&#160;</td>", b.document[0]).attr("colspan", a(this).attr("colspan") || 1).appendTo(e)
          }) : "img" === d && e.attr("src", b.currentItem.attr("src")), c || e.css("visibility", "hidden"), e
        },
        update: function(a, e) {
          (!c || d.forcePlaceholderSize) && (e.height() || e.height(b.currentItem.innerHeight() - parseInt(b.currentItem.css("paddingTop") || 0, 10) - parseInt(b.currentItem.css("paddingBottom") || 0, 10)), e.width() || e.width(b.currentItem.innerWidth() - parseInt(b.currentItem.css("paddingLeft") || 0, 10) - parseInt(b.currentItem.css("paddingRight") || 0, 10)))
        }
      }), b.placeholder = a(d.placeholder.element.call(b.element, b.currentItem)), b.currentItem.after(b.placeholder), d.placeholder.update(b, b.placeholder)
    },
    _contactContainers: function(b) {
      var e, f, g, h, i, j, k, l, m, n, o = null,
        p = null;
      for (e = this.containers.length - 1; e >= 0; e--)
        if (!a.contains(this.currentItem[0], this.containers[e].element[0]))
          if (this._intersectsWith(this.containers[e].containerCache)) {
            if (o && a.contains(this.containers[e].element[0], o.element[0])) continue;
            o = this.containers[e], p = e
          } else this.containers[e].containerCache.over && (this.containers[e]._trigger("out", b, this._uiHash(this)), this.containers[e].containerCache.over = 0);
      if (o)
        if (1 === this.containers.length) this.containers[p].containerCache.over || (this.containers[p]._trigger("over", b, this._uiHash(this)), this.containers[p].containerCache.over = 1);
        else {
          for (g = 1e4, h = null, n = o.floating || d(this.currentItem), i = n ? "left" : "top", j = n ? "width" : "height", k = this.positionAbs[i] + this.offset.click[i], f = this.items.length - 1; f >= 0; f--) a.contains(this.containers[p].element[0], this.items[f].item[0]) && this.items[f].item[0] !== this.currentItem[0] && (!n || c(this.positionAbs.top + this.offset.click.top, this.items[f].top, this.items[f].height)) && (l = this.items[f].item.offset()[i], m = !1, Math.abs(l - k) > Math.abs(l + this.items[f][j] - k) && (m = !0, l += this.items[f][j]), Math.abs(l - k) < g && (g = Math.abs(l - k), h = this.items[f], this.direction = m ? "up" : "down"));
          if (!h && !this.options.dropOnEmpty) return;
          if (this.currentContainer === this.containers[p]) return;
          h ? this._rearrange(b, h, null, !0) : this._rearrange(b, null, this.containers[p].element, !0), this._trigger("change", b, this._uiHash()), this.containers[p]._trigger("change", b, this._uiHash(this)), this.currentContainer = this.containers[p], this.options.placeholder.update(this.currentContainer, this.placeholder), this.containers[p]._trigger("over", b, this._uiHash(this)), this.containers[p].containerCache.over = 1
        }
    },
    _createHelper: function(b) {
      var c = this.options,
        d = a.isFunction(c.helper) ? a(c.helper.apply(this.element[0], [b, this.currentItem])) : "clone" === c.helper ? this.currentItem.clone() : this.currentItem;
      return d.parents("body").length || a("parent" !== c.appendTo ? c.appendTo : this.currentItem[0].parentNode)[0].appendChild(d[0]), d[0] === this.currentItem[0] && (this._storedCSS = {
        width: this.currentItem[0].style.width,
        height: this.currentItem[0].style.height,
        position: this.currentItem.css("position"),
        top: this.currentItem.css("top"),
        left: this.currentItem.css("left")
      }), (!d[0].style.width || c.forceHelperSize) && d.width(this.currentItem.width()), (!d[0].style.height || c.forceHelperSize) && d.height(this.currentItem.height()), d
    },
    _adjustOffsetFromHelper: function(b) {
      "string" == typeof b && (b = b.split(" ")), a.isArray(b) && (b = {
        left: +b[0],
        top: +b[1] || 0
      }), "left" in b && (this.offset.click.left = b.left + this.margins.left), "right" in b && (this.offset.click.left = this.helperProportions.width - b.right + this.margins.left), "top" in b && (this.offset.click.top = b.top + this.margins.top), "bottom" in b && (this.offset.click.top = this.helperProportions.height - b.bottom + this.margins.top)
    },
    _getParentOffset: function() {
      this.offsetParent = this.helper.offsetParent();
      var b = this.offsetParent.offset();
      return "absolute" === this.cssPosition && this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) && (b.left += this.scrollParent.scrollLeft(), b.top += this.scrollParent.scrollTop()), (this.offsetParent[0] === document.body || this.offsetParent[0].tagName && "html" === this.offsetParent[0].tagName.toLowerCase() && a.ui.ie) && (b = {
        top: 0,
        left: 0
      }), {
        top: b.top + (parseInt(this.offsetParent.css("borderTopWidth"), 10) || 0),
        left: b.left + (parseInt(this.offsetParent.css("borderLeftWidth"), 10) || 0)
      }
    },
    _getRelativeOffset: function() {
      if ("relative" === this.cssPosition) {
        var a = this.currentItem.position();
        return {
          top: a.top - (parseInt(this.helper.css("top"), 10) || 0) + this.scrollParent.scrollTop(),
          left: a.left - (parseInt(this.helper.css("left"), 10) || 0) + this.scrollParent.scrollLeft()
        }
      }
      return {
        top: 0,
        left: 0
      }
    },
    _cacheMargins: function() {
      this.margins = {
        left: parseInt(this.currentItem.css("marginLeft"), 10) || 0,
        top: parseInt(this.currentItem.css("marginTop"), 10) || 0
      }
    },
    _cacheHelperProportions: function() {
      this.helperProportions = {
        width: this.helper.outerWidth(),
        height: this.helper.outerHeight()
      }
    },
    _setContainment: function() {
      var b, c, d, e = this.options;
      "parent" === e.containment && (e.containment = this.helper[0].parentNode), ("document" === e.containment || "window" === e.containment) && (this.containment = [0 - this.offset.relative.left - this.offset.parent.left, 0 - this.offset.relative.top - this.offset.parent.top, a("document" === e.containment ? document : window).width() - this.helperProportions.width - this.margins.left, (a("document" === e.containment ? document : window).height() || document.body.parentNode.scrollHeight) - this.helperProportions.height - this.margins.top]), /^(document|window|parent)$/.test(e.containment) || (b = a(e.containment)[0], c = a(e.containment).offset(), d = "hidden" !== a(b).css("overflow"), this.containment = [c.left + (parseInt(a(b).css("borderLeftWidth"), 10) || 0) + (parseInt(a(b).css("paddingLeft"), 10) || 0) - this.margins.left, c.top + (parseInt(a(b).css("borderTopWidth"), 10) || 0) + (parseInt(a(b).css("paddingTop"), 10) || 0) - this.margins.top, c.left + (d ? Math.max(b.scrollWidth, b.offsetWidth) : b.offsetWidth) - (parseInt(a(b).css("borderLeftWidth"), 10) || 0) - (parseInt(a(b).css("paddingRight"), 10) || 0) - this.helperProportions.width - this.margins.left, c.top + (d ? Math.max(b.scrollHeight, b.offsetHeight) : b.offsetHeight) - (parseInt(a(b).css("borderTopWidth"), 10) || 0) - (parseInt(a(b).css("paddingBottom"), 10) || 0) - this.helperProportions.height - this.margins.top])
    },
    _convertPositionTo: function(b, c) {
      c || (c = this.position);
      var d = "absolute" === b ? 1 : -1,
        e = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
        f = /(html|body)/i.test(e[0].tagName);
      return {
        top: c.top + this.offset.relative.top * d + this.offset.parent.top * d - ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : f ? 0 : e.scrollTop()) * d,
        left: c.left + this.offset.relative.left * d + this.offset.parent.left * d - ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : f ? 0 : e.scrollLeft()) * d
      }
    },
    _generatePosition: function(b) {
      var c, d, e = this.options,
        f = b.pageX,
        g = b.pageY,
        h = "absolute" !== this.cssPosition || this.scrollParent[0] !== document && a.contains(this.scrollParent[0], this.offsetParent[0]) ? this.scrollParent : this.offsetParent,
        i = /(html|body)/i.test(h[0].tagName);
      return "relative" !== this.cssPosition || this.scrollParent[0] !== document && this.scrollParent[0] !== this.offsetParent[0] || (this.offset.relative = this._getRelativeOffset()), this.originalPosition && (this.containment && (b.pageX - this.offset.click.left < this.containment[0] && (f = this.containment[0] + this.offset.click.left), b.pageY - this.offset.click.top < this.containment[1] && (g = this.containment[1] + this.offset.click.top), b.pageX - this.offset.click.left > this.containment[2] && (f = this.containment[2] + this.offset.click.left), b.pageY - this.offset.click.top > this.containment[3] && (g = this.containment[3] + this.offset.click.top)), e.grid && (c = this.originalPageY + Math.round((g - this.originalPageY) / e.grid[1]) * e.grid[1], g = this.containment ? c - this.offset.click.top >= this.containment[1] && c - this.offset.click.top <= this.containment[3] ? c : c - this.offset.click.top >= this.containment[1] ? c - e.grid[1] : c + e.grid[1] : c, d = this.originalPageX + Math.round((f - this.originalPageX) / e.grid[0]) * e.grid[0], f = this.containment ? d - this.offset.click.left >= this.containment[0] && d - this.offset.click.left <= this.containment[2] ? d : d - this.offset.click.left >= this.containment[0] ? d - e.grid[0] : d + e.grid[0] : d)), {
        top: g - this.offset.click.top - this.offset.relative.top - this.offset.parent.top + ("fixed" === this.cssPosition ? -this.scrollParent.scrollTop() : i ? 0 : h.scrollTop()),
        left: f - this.offset.click.left - this.offset.relative.left - this.offset.parent.left + ("fixed" === this.cssPosition ? -this.scrollParent.scrollLeft() : i ? 0 : h.scrollLeft())
      }
    },
    _rearrange: function(a, b, c, d) {
      c ? c[0].appendChild(this.placeholder[0]) : b.item[0].parentNode.insertBefore(this.placeholder[0], "down" === this.direction ? b.item[0] : b.item[0].nextSibling), this.counter = this.counter ? ++this.counter : 1;
      var e = this.counter;
      this._delay(function() {
        e === this.counter && this.refreshPositions(!d)
      })
    },
    _clear: function(a, b) {
      this.reverting = !1;
      var c, d = [];
      if (!this._noFinalSort && this.currentItem.parent().length && this.placeholder.before(this.currentItem), this._noFinalSort = null, this.helper[0] === this.currentItem[0]) {
        for (c in this._storedCSS)("auto" === this._storedCSS[c] || "static" === this._storedCSS[c]) && (this._storedCSS[c] = "");
        this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")
      } else this.currentItem.show();
      for (this.fromOutside && !b && d.push(function(a) {
          this._trigger("receive", a, this._uiHash(this.fromOutside))
        }), !this.fromOutside && this.domPosition.prev === this.currentItem.prev().not(".ui-sortable-helper")[0] && this.domPosition.parent === this.currentItem.parent()[0] || b || d.push(function(a) {
          this._trigger("update", a, this._uiHash())
        }), this !== this.currentContainer && (b || (d.push(function(a) {
          this._trigger("remove", a, this._uiHash())
        }), d.push(function(a) {
          return function(b) {
            a._trigger("receive", b, this._uiHash(this))
          }
        }.call(this, this.currentContainer)), d.push(function(a) {
          return function(b) {
            a._trigger("update", b, this._uiHash(this))
          }
        }.call(this, this.currentContainer)))), c = this.containers.length - 1; c >= 0; c--) b || d.push(function(a) {
        return function(b) {
          a._trigger("deactivate", b, this._uiHash(this))
        }
      }.call(this, this.containers[c])), this.containers[c].containerCache.over && (d.push(function(a) {
        return function(b) {
          a._trigger("out", b, this._uiHash(this))
        }
      }.call(this, this.containers[c])), this.containers[c].containerCache.over = 0);
      if (this.storedCursor && (this.document.find("body").css("cursor", this.storedCursor), this.storedStylesheet.remove()), this._storedOpacity && this.helper.css("opacity", this._storedOpacity), this._storedZIndex && this.helper.css("zIndex", "auto" === this._storedZIndex ? "" : this._storedZIndex), this.dragging = !1, this.cancelHelperRemoval) {
        if (!b) {
          for (this._trigger("beforeStop", a, this._uiHash()), c = 0; c < d.length; c++) d[c].call(this, a);
          this._trigger("stop", a, this._uiHash())
        }
        return this.fromOutside = !1, !1
      }
      if (b || this._trigger("beforeStop", a, this._uiHash()), this.placeholder[0].parentNode.removeChild(this.placeholder[0]), this.helper[0] !== this.currentItem[0] && this.helper.remove(), this.helper = null, !b) {
        for (c = 0; c < d.length; c++) d[c].call(this, a);
        this._trigger("stop", a, this._uiHash())
      }
      return this.fromOutside = !1, !0
    },
    _trigger: function() {
      a.Widget.prototype._trigger.apply(this, arguments) === !1 && this.cancel()
    },
    _uiHash: function(b) {
      var c = b || this;
      return {
        helper: c.helper,
        placeholder: c.placeholder || a([]),
        position: c.position,
        originalPosition: c.originalPosition,
        offset: c.positionAbs,
        item: c.currentItem,
        sender: b ? b.element : null
      }
    }
  })
}(jQuery),
function(a, b) {
  var c = "ui-effects-";
  a.effects = {
      effect: {}
    },
    function(a, b) {
      function m(a, b, c) {
        var d = h[b.type] || {};
        return null == a ? c || !b.def ? null : b.def : (a = d.floor ? ~~a : parseFloat(a), isNaN(a) ? b.def : d.mod ? (a + d.mod) % d.mod : 0 > a ? 0 : d.max < a ? d.max : a)
      }

      function n(b) {
        var c = f(),
          d = c._rgba = [];
        return b = b.toLowerCase(), l(e, function(a, e) {
          var f, h = e.re.exec(b),
            i = h && e.parse(h),
            j = e.space || "rgba";
          return i ? (f = c[j](i), c[g[j].cache] = f[g[j].cache], d = c._rgba = f._rgba, !1) : void 0
        }), d.length ? ("0,0,0,0" === d.join() && a.extend(d, k.transparent), c) : k[b]
      }

      function o(a, b, c) {
        return c = (c + 1) % 1, 1 > 6 * c ? a + 6 * (b - a) * c : 1 > 2 * c ? b : 2 > 3 * c ? a + 6 * (b - a) * (2 / 3 - c) : a
      }
      var k, c = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",
        d = /^([\-+])=\s*(\d+\.?\d*)/,
        e = [{
          re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
          parse: function(a) {
            return [a[1], a[2], a[3], a[4]]
          }
        }, {
          re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
          parse: function(a) {
            return [2.55 * a[1], 2.55 * a[2], 2.55 * a[3], a[4]]
          }
        }, {
          re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
          parse: function(a) {
            return [parseInt(a[1], 16), parseInt(a[2], 16), parseInt(a[3], 16)]
          }
        }, {
          re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
          parse: function(a) {
            return [parseInt(a[1] + a[1], 16), parseInt(a[2] + a[2], 16), parseInt(a[3] + a[3], 16)]
          }
        }, {
          re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
          space: "hsla",
          parse: function(a) {
            return [a[1], a[2] / 100, a[3] / 100, a[4]]
          }
        }],
        f = a.Color = function(b, c, d, e) {
          return new a.Color.fn.parse(b, c, d, e)
        },
        g = {
          rgba: {
            props: {
              red: {
                idx: 0,
                type: "byte"
              },
              green: {
                idx: 1,
                type: "byte"
              },
              blue: {
                idx: 2,
                type: "byte"
              }
            }
          },
          hsla: {
            props: {
              hue: {
                idx: 0,
                type: "degrees"
              },
              saturation: {
                idx: 1,
                type: "percent"
              },
              lightness: {
                idx: 2,
                type: "percent"
              }
            }
          }
        },
        h = {
          "byte": {
            floor: !0,
            max: 255
          },
          percent: {
            max: 1
          },
          degrees: {
            mod: 360,
            floor: !0
          }
        },
        i = f.support = {},
        j = a("<p>")[0],
        l = a.each;
      j.style.cssText = "background-color:rgba(1,1,1,.5)", i.rgba = j.style.backgroundColor.indexOf("rgba") > -1, l(g, function(a, b) {
        b.cache = "_" + a, b.props.alpha = {
          idx: 3,
          type: "percent",
          def: 1
        }
      }), f.fn = a.extend(f.prototype, {
        parse: function(c, d, e, h) {
          if (c === b) return this._rgba = [null, null, null, null], this;
          (c.jquery || c.nodeType) && (c = a(c).css(d), d = b);
          var i = this,
            j = a.type(c),
            o = this._rgba = [];
          return d !== b && (c = [c, d, e, h], j = "array"), "string" === j ? this.parse(n(c) || k._default) : "array" === j ? (l(g.rgba.props, function(a, b) {
            o[b.idx] = m(c[b.idx], b)
          }), this) : "object" === j ? (c instanceof f ? l(g, function(a, b) {
            c[b.cache] && (i[b.cache] = c[b.cache].slice())
          }) : l(g, function(b, d) {
            var e = d.cache;
            l(d.props, function(a, b) {
              if (!i[e] && d.to) {
                if ("alpha" === a || null == c[a]) return;
                i[e] = d.to(i._rgba)
              }
              i[e][b.idx] = m(c[a], b, !0)
            }), i[e] && a.inArray(null, i[e].slice(0, 3)) < 0 && (i[e][3] = 1, d.from && (i._rgba = d.from(i[e])))
          }), this) : void 0
        },
        is: function(a) {
          var b = f(a),
            c = !0,
            d = this;
          return l(g, function(a, e) {
            var f, g = b[e.cache];
            return g && (f = d[e.cache] || e.to && e.to(d._rgba) || [], l(e.props, function(a, b) {
              return null != g[b.idx] ? c = g[b.idx] === f[b.idx] : void 0
            })), c
          }), c
        },
        _space: function() {
          var a = [],
            b = this;
          return l(g, function(c, d) {
            b[d.cache] && a.push(c)
          }), a.pop()
        },
        transition: function(a, b) {
          var c = f(a),
            d = c._space(),
            e = g[d],
            i = 0 === this.alpha() ? f("transparent") : this,
            j = i[e.cache] || e.to(i._rgba),
            k = j.slice();
          return c = c[e.cache], l(e.props, function(a, d) {
            var e = d.idx,
              f = j[e],
              g = c[e],
              i = h[d.type] || {};
            null !== g && (null === f ? k[e] = g : (i.mod && (g - f > i.mod / 2 ? f += i.mod : f - g > i.mod / 2 && (f -= i.mod)), k[e] = m((g - f) * b + f, d)))
          }), this[d](k)
        },
        blend: function(b) {
          if (1 === this._rgba[3]) return this;
          var c = this._rgba.slice(),
            d = c.pop(),
            e = f(b)._rgba;
          return f(a.map(c, function(a, b) {
            return (1 - d) * e[b] + d * a
          }))
        },
        toRgbaString: function() {
          var b = "rgba(",
            c = a.map(this._rgba, function(a, b) {
              return null == a ? b > 2 ? 1 : 0 : a
            });
          return 1 === c[3] && (c.pop(), b = "rgb("), b + c.join() + ")"
        },
        toHslaString: function() {
          var b = "hsla(",
            c = a.map(this.hsla(), function(a, b) {
              return null == a && (a = b > 2 ? 1 : 0), b && 3 > b && (a = Math.round(100 * a) + "%"), a
            });
          return 1 === c[3] && (c.pop(), b = "hsl("), b + c.join() + ")"
        },
        toHexString: function(b) {
          var c = this._rgba.slice(),
            d = c.pop();
          return b && c.push(~~(255 * d)), "#" + a.map(c, function(a) {
            return a = (a || 0).toString(16), 1 === a.length ? "0" + a : a
          }).join("")
        },
        toString: function() {
          return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
        }
      }), f.fn.parse.prototype = f.fn, g.hsla.to = function(a) {
        if (null == a[0] || null == a[1] || null == a[2]) return [null, null, null, a[3]];
        var k, l, b = a[0] / 255,
          c = a[1] / 255,
          d = a[2] / 255,
          e = a[3],
          f = Math.max(b, c, d),
          g = Math.min(b, c, d),
          h = f - g,
          i = f + g,
          j = .5 * i;
        return k = g === f ? 0 : b === f ? 60 * (c - d) / h + 360 : c === f ? 60 * (d - b) / h + 120 : 60 * (b - c) / h + 240, l = 0 === h ? 0 : .5 >= j ? h / i : h / (2 - i), [Math.round(k) % 360, l, j, null == e ? 1 : e]
      }, g.hsla.from = function(a) {
        if (null == a[0] || null == a[1] || null == a[2]) return [null, null, null, a[3]];
        var b = a[0] / 360,
          c = a[1],
          d = a[2],
          e = a[3],
          f = .5 >= d ? d * (1 + c) : d + c - d * c,
          g = 2 * d - f;
        return [Math.round(255 * o(g, f, b + 1 / 3)), Math.round(255 * o(g, f, b)), Math.round(255 * o(g, f, b - 1 / 3)), e]
      }, l(g, function(c, e) {
        var g = e.props,
          h = e.cache,
          i = e.to,
          j = e.from;
        f.fn[c] = function(c) {
          if (i && !this[h] && (this[h] = i(this._rgba)), c === b) return this[h].slice();
          var d, e = a.type(c),
            k = "array" === e || "object" === e ? c : arguments,
            n = this[h].slice();
          return l(g, function(a, b) {
            var c = k["object" === e ? a : b.idx];
            null == c && (c = n[b.idx]), n[b.idx] = m(c, b)
          }), j ? (d = f(j(n)), d[h] = n, d) : f(n)
        }, l(g, function(b, e) {
          f.fn[b] || (f.fn[b] = function(f) {
            var k, g = a.type(f),
              h = "alpha" === b ? this._hsla ? "hsla" : "rgba" : c,
              i = this[h](),
              j = i[e.idx];
            return "undefined" === g ? j : ("function" === g && (f = f.call(this, j), g = a.type(f)), null == f && e.empty ? this : ("string" === g && (k = d.exec(f), k && (f = j + parseFloat(k[2]) * ("+" === k[1] ? 1 : -1))), i[e.idx] = f, this[h](i)))
          })
        })
      }), f.hook = function(b) {
        var c = b.split(" ");
        l(c, function(b, c) {
          a.cssHooks[c] = {
            set: function(b, d) {
              var e, g, h = "";
              if ("transparent" !== d && ("string" !== a.type(d) || (e = n(d)))) {
                if (d = f(e || d), !i.rgba && 1 !== d._rgba[3]) {
                  for (g = "backgroundColor" === c ? b.parentNode : b;
                    ("" === h || "transparent" === h) && g && g.style;) try {
                    h = a.css(g, "backgroundColor"), g = g.parentNode
                  } catch (j) {}
                  d = d.blend(h && "transparent" !== h ? h : "_default")
                }
                d = d.toRgbaString()
              }
              try {
                b.style[c] = d
              } catch (j) {}
            }
          }, a.fx.step[c] = function(b) {
            b.colorInit || (b.start = f(b.elem, c), b.end = f(b.end), b.colorInit = !0), a.cssHooks[c].set(b.elem, b.start.transition(b.end, b.pos))
          }
        })
      }, f.hook(c), a.cssHooks.borderColor = {
        expand: function(a) {
          var b = {};
          return l(["Top", "Right", "Bottom", "Left"], function(c, d) {
            b["border" + d + "Color"] = a
          }), b
        }
      }, k = a.Color.names = {
        aqua: "#00ffff",
        black: "#000000",
        blue: "#0000ff",
        fuchsia: "#ff00ff",
        gray: "#808080",
        green: "#008000",
        lime: "#00ff00",
        maroon: "#800000",
        navy: "#000080",
        olive: "#808000",
        purple: "#800080",
        red: "#ff0000",
        silver: "#c0c0c0",
        teal: "#008080",
        white: "#ffffff",
        yellow: "#ffff00",
        transparent: [null, null, null, 0],
        _default: "#ffffff"
      }
    }(jQuery),
    function() {
      function e(b) {
        var c, d, e = b.ownerDocument.defaultView ? b.ownerDocument.defaultView.getComputedStyle(b, null) : b.currentStyle,
          f = {};
        if (e && e.length && e[0] && e[e[0]])
          for (d = e.length; d--;) c = e[d], "string" == typeof e[c] && (f[a.camelCase(c)] = e[c]);
        else
          for (c in e) "string" == typeof e[c] && (f[c] = e[c]);
        return f
      }

      function f(b, c) {
        var f, g, e = {};
        for (f in c) g = c[f], b[f] !== g && (d[f] || (a.fx.step[f] || !isNaN(parseFloat(g))) && (e[f] = g));
        return e
      }
      var c = ["add", "remove", "toggle"],
        d = {
          border: 1,
          borderBottom: 1,
          borderColor: 1,
          borderLeft: 1,
          borderRight: 1,
          borderTop: 1,
          borderWidth: 1,
          margin: 1,
          padding: 1
        };
      a.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], function(b, c) {
        a.fx.step[c] = function(a) {
          ("none" !== a.end && !a.setAttr || 1 === a.pos && !a.setAttr) && (jQuery.style(a.elem, c, a.end), a.setAttr = !0)
        }
      }), a.fn.addBack || (a.fn.addBack = function(a) {
        return this.add(null == a ? this.prevObject : this.prevObject.filter(a))
      }), a.effects.animateClass = function(b, d, g, h) {
        var i = a.speed(d, g, h);
        return this.queue(function() {
          var h, d = a(this),
            g = d.attr("class") || "",
            j = i.children ? d.find("*").addBack() : d;
          j = j.map(function() {
            var b = a(this);
            return {
              el: b,
              start: e(this)
            }
          }), h = function() {
            a.each(c, function(a, c) {
              b[c] && d[c + "Class"](b[c])
            })
          }, h(), j = j.map(function() {
            return this.end = e(this.el[0]), this.diff = f(this.start, this.end), this
          }), d.attr("class", g), j = j.map(function() {
            var b = this,
              c = a.Deferred(),
              d = a.extend({}, i, {
                queue: !1,
                complete: function() {
                  c.resolve(b)
                }
              });
            return this.el.animate(this.diff, d), c.promise()
          }), a.when.apply(a, j.get()).done(function() {
            h(), a.each(arguments, function() {
              var b = this.el;
              a.each(this.diff, function(a) {
                b.css(a, "")
              })
            }), i.complete.call(d[0])
          })
        })
      }, a.fn.extend({
        addClass: function(b) {
          return function(c, d, e, f) {
            return d ? a.effects.animateClass.call(this, {
              add: c
            }, d, e, f) : b.apply(this, arguments)
          }
        }(a.fn.addClass),
        removeClass: function(b) {
          return function(c, d, e, f) {
            return arguments.length > 1 ? a.effects.animateClass.call(this, {
              remove: c
            }, d, e, f) : b.apply(this, arguments)
          }
        }(a.fn.removeClass),
        toggleClass: function(c) {
          return function(d, e, f, g, h) {
            return "boolean" == typeof e || e === b ? f ? a.effects.animateClass.call(this, e ? {
              add: d
            } : {
              remove: d
            }, f, g, h) : c.apply(this, arguments) : a.effects.animateClass.call(this, {
              toggle: d
            }, e, f, g)
          }
        }(a.fn.toggleClass),
        switchClass: function(b, c, d, e, f) {
          return a.effects.animateClass.call(this, {
            add: c,
            remove: b
          }, d, e, f)
        }
      })
    }(),
    function() {
      function d(b, c, d, e) {
        return a.isPlainObject(b) && (c = b, b = b.effect), b = {
          effect: b
        }, null == c && (c = {}), a.isFunction(c) && (e = c, d = null, c = {}), ("number" == typeof c || a.fx.speeds[c]) && (e = d, d = c, c = {}), a.isFunction(d) && (e = d, d = null), c && a.extend(b, c), d = d || c.duration, b.duration = a.fx.off ? 0 : "number" == typeof d ? d : d in a.fx.speeds ? a.fx.speeds[d] : a.fx.speeds._default, b.complete = e || c.complete, b
      }

      function e(b) {
        return !b || "number" == typeof b || a.fx.speeds[b] ? !0 : "string" != typeof b || a.effects.effect[b] ? a.isFunction(b) ? !0 : "object" != typeof b || b.effect ? !1 : !0 : !0
      }
      a.extend(a.effects, {
        version: "1.10.3",
        save: function(a, b) {
          for (var d = 0; d < b.length; d++) null !== b[d] && a.data(c + b[d], a[0].style[b[d]])
        },
        restore: function(a, d) {
          var e, f;
          for (f = 0; f < d.length; f++) null !== d[f] && (e = a.data(c + d[f]), e === b && (e = ""), a.css(d[f], e))
        },
        setMode: function(a, b) {
          return "toggle" === b && (b = a.is(":hidden") ? "show" : "hide"), b
        },
        getBaseline: function(a, b) {
          var c, d;
          switch (a[0]) {
            case "top":
              c = 0;
              break;
            case "middle":
              c = .5;
              break;
            case "bottom":
              c = 1;
              break;
            default:
              c = a[0] / b.height
          }
          switch (a[1]) {
            case "left":
              d = 0;
              break;
            case "center":
              d = .5;
              break;
            case "right":
              d = 1;
              break;
            default:
              d = a[1] / b.width
          }
          return {
            x: d,
            y: c
          }
        },
        createWrapper: function(b) {
          if (b.parent().is(".ui-effects-wrapper")) return b.parent();
          var c = {
              width: b.outerWidth(!0),
              height: b.outerHeight(!0),
              "float": b.css("float")
            },
            d = a("<div></div>").addClass("ui-effects-wrapper").css({
              fontSize: "100%",
              background: "transparent",
              border: "none",
              margin: 0,
              padding: 0
            }),
            e = {
              width: b.width(),
              height: b.height()
            },
            f = document.activeElement;
          try {
            f.id
          } catch (g) {
            f = document.body
          }
          return b.wrap(d), (b[0] === f || a.contains(b[0], f)) && a(f).focus(), d = b.parent(), "static" === b.css("position") ? (d.css({
            position: "relative"
          }), b.css({
            position: "relative"
          })) : (a.extend(c, {
            position: b.css("position"),
            zIndex: b.css("z-index")
          }), a.each(["top", "left", "bottom", "right"], function(a, d) {
            c[d] = b.css(d), isNaN(parseInt(c[d], 10)) && (c[d] = "auto")
          }), b.css({
            position: "relative",
            top: 0,
            left: 0,
            right: "auto",
            bottom: "auto"
          })), b.css(e), d.css(c).show()
        },
        removeWrapper: function(b) {
          var c = document.activeElement;
          return b.parent().is(".ui-effects-wrapper") && (b.parent().replaceWith(b), (b[0] === c || a.contains(b[0], c)) && a(c).focus()), b
        },
        setTransition: function(b, c, d, e) {
          return e = e || {}, a.each(c, function(a, c) {
            var f = b.cssUnit(c);
            f[0] > 0 && (e[c] = f[0] * d + f[1])
          }), e
        }
      }), a.fn.extend({
        effect: function() {
          function g(c) {
            function h() {
              a.isFunction(e) && e.call(d[0]), a.isFunction(c) && c()
            }
            var d = a(this),
              e = b.complete,
              g = b.mode;
            (d.is(":hidden") ? "hide" === g : "show" === g) ? (d[g](), h()) : f.call(d[0], b, h)
          }
          var b = d.apply(this, arguments),
            c = b.mode,
            e = b.queue,
            f = a.effects.effect[b.effect];
          return a.fx.off || !f ? c ? this[c](b.duration, b.complete) : this.each(function() {
            b.complete && b.complete.call(this)
          }) : e === !1 ? this.each(g) : this.queue(e || "fx", g)
        },
        show: function(a) {
          return function(b) {
            if (e(b)) return a.apply(this, arguments);
            var c = d.apply(this, arguments);
            return c.mode = "show", this.effect.call(this, c)
          }
        }(a.fn.show),
        hide: function(a) {
          return function(b) {
            if (e(b)) return a.apply(this, arguments);
            var c = d.apply(this, arguments);
            return c.mode = "hide", this.effect.call(this, c)
          }
        }(a.fn.hide),
        toggle: function(a) {
          return function(b) {
            if (e(b) || "boolean" == typeof b) return a.apply(this, arguments);
            var c = d.apply(this, arguments);
            return c.mode = "toggle", this.effect.call(this, c)
          }
        }(a.fn.toggle),
        cssUnit: function(b) {
          var c = this.css(b),
            d = [];
          return a.each(["em", "px", "%", "pt"], function(a, b) {
            c.indexOf(b) > 0 && (d = [parseFloat(c), b])
          }), d
        }
      })
    }(),
    function() {
      var b = {};
      a.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], function(a, c) {
        b[c] = function(b) {
          return Math.pow(b, a + 2)
        }
      }), a.extend(b, {
        Sine: function(a) {
          return 1 - Math.cos(a * Math.PI / 2)
        },
        Circ: function(a) {
          return 1 - Math.sqrt(1 - a * a)
        },
        Elastic: function(a) {
          return 0 === a || 1 === a ? a : -Math.pow(2, 8 * (a - 1)) * Math.sin((80 * (a - 1) - 7.5) * Math.PI / 15)
        },
        Back: function(a) {
          return a * a * (3 * a - 2)
        },
        Bounce: function(a) {
          for (var b, c = 4; a < ((b = Math.pow(2, --c)) - 1) / 11;);
          return 1 / Math.pow(4, 3 - c) - 7.5625 * Math.pow((3 * b - 2) / 22 - a, 2)
        }
      }), a.each(b, function(b, c) {
        a.easing["easeIn" + b] = c, a.easing["easeOut" + b] = function(a) {
          return 1 - c(1 - a)
        }, a.easing["easeInOut" + b] = function(a) {
          return .5 > a ? c(2 * a) / 2 : 1 - c(-2 * a + 2) / 2
        }
      })
    }()
}(jQuery),
function(a) {
  var c = 0,
    d = {},
    e = {};
  d.height = d.paddingTop = d.paddingBottom = d.borderTopWidth = d.borderBottomWidth = "hide", e.height = e.paddingTop = e.paddingBottom = e.borderTopWidth = e.borderBottomWidth = "show", a.widget("ui.accordion", {
    version: "1.10.3",
    options: {
      active: 0,
      animate: {},
      collapsible: !1,
      event: "click",
      header: "> li > :first-child,> :not(li):even",
      heightStyle: "auto",
      icons: {
        activeHeader: "ui-icon-triangle-1-s",
        header: "ui-icon-triangle-1-e"
      },
      activate: null,
      beforeActivate: null
    },
    _create: function() {
      var b = this.options;
      this.prevShow = this.prevHide = a(), this.element.addClass("ui-accordion ui-widget ui-helper-reset").attr("role", "tablist"), b.collapsible || b.active !== !1 && null != b.active || (b.active = 0), this._processPanels(), b.active < 0 && (b.active += this.headers.length), this._refresh()
    },
    _getCreateEventData: function() {
      return {
        header: this.active,
        panel: this.active.length ? this.active.next() : a(),
        content: this.active.length ? this.active.next() : a()
      }
    },
    _createIcons: function() {
      var b = this.options.icons;
      b && (a("<span>").addClass("ui-accordion-header-icon ui-icon " + b.header).prependTo(this.headers), this.active.children(".ui-accordion-header-icon").removeClass(b.header).addClass(b.activeHeader), this.headers.addClass("ui-accordion-icons"))
    },
    _destroyIcons: function() {
      this.headers.removeClass("ui-accordion-icons").children(".ui-accordion-header-icon").remove()
    },
    _destroy: function() {
      var a;
      this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"), this.headers.removeClass("ui-accordion-header ui-accordion-header-active ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-selected").removeAttr("aria-controls").removeAttr("tabIndex").each(function() {
        /^ui-accordion/.test(this.id) && this.removeAttribute("id")
      }), this._destroyIcons(), a = this.headers.next().css("display", "").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-labelledby").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-state-disabled").each(function() {
        /^ui-accordion/.test(this.id) && this.removeAttribute("id")
      }), "content" !== this.options.heightStyle && a.css("height", "")
    },
    _setOption: function(a, b) {
      return "active" === a ? (this._activate(b), void 0) : ("event" === a && (this.options.event && this._off(this.headers, this.options.event), this._setupEvents(b)), this._super(a, b), "collapsible" !== a || b || this.options.active !== !1 || this._activate(0), "icons" === a && (this._destroyIcons(), b && this._createIcons()), "disabled" === a && this.headers.add(this.headers.next()).toggleClass("ui-state-disabled", !!b), void 0)
    },
    _keydown: function(b) {
      if (!b.altKey && !b.ctrlKey) {
        var c = a.ui.keyCode,
          d = this.headers.length,
          e = this.headers.index(b.target),
          f = !1;
        switch (b.keyCode) {
          case c.RIGHT:
          case c.DOWN:
            f = this.headers[(e + 1) % d];
            break;
          case c.LEFT:
          case c.UP:
            f = this.headers[(e - 1 + d) % d];
            break;
          case c.SPACE:
          case c.ENTER:
            this._eventHandler(b);
            break;
          case c.HOME:
            f = this.headers[0];
            break;
          case c.END:
            f = this.headers[d - 1]
        }
        f && (a(b.target).attr("tabIndex", -1), a(f).attr("tabIndex", 0), f.focus(), b.preventDefault())
      }
    },
    _panelKeyDown: function(b) {
      b.keyCode === a.ui.keyCode.UP && b.ctrlKey && a(b.currentTarget).prev().focus()
    },
    refresh: function() {
      var b = this.options;
      this._processPanels(), b.active === !1 && b.collapsible === !0 || !this.headers.length ? (b.active = !1, this.active = a()) : b.active === !1 ? this._activate(0) : this.active.length && !a.contains(this.element[0], this.active[0]) ? this.headers.length === this.headers.find(".ui-state-disabled").length ? (b.active = !1, this.active = a()) : this._activate(Math.max(0, b.active - 1)) : b.active = this.headers.index(this.active), this._destroyIcons(), this._refresh()
    },
    _processPanels: function() {
      this.headers = this.element.find(this.options.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all"), this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom").filter(":not(.ui-accordion-content-active)").hide()
    },
    _refresh: function() {
      var b, d = this.options,
        e = d.heightStyle,
        f = this.element.parent(),
        g = this.accordionId = "ui-accordion-" + (this.element.attr("id") || ++c);
      this.active = this._findActive(d.active).addClass("ui-accordion-header-active ui-state-active ui-corner-top").removeClass("ui-corner-all"), this.active.next().addClass("ui-accordion-content-active").show(), this.headers.attr("role", "tab").each(function(b) {
        var c = a(this),
          d = c.attr("id"),
          e = c.next(),
          f = e.attr("id");
        d || (d = g + "-header-" + b, c.attr("id", d)), f || (f = g + "-panel-" + b, e.attr("id", f)), c.attr("aria-controls", f), e.attr("aria-labelledby", d)
      }).next().attr("role", "tabpanel"), this.headers.not(this.active).attr({
        "aria-selected": "false",
        tabIndex: -1
      }).next().attr({
        "aria-expanded": "false",
        "aria-hidden": "true"
      }).hide(), this.active.length ? this.active.attr({
        "aria-selected": "true",
        tabIndex: 0
      }).next().attr({
        "aria-expanded": "true",
        "aria-hidden": "false"
      }) : this.headers.eq(0).attr("tabIndex", 0), this._createIcons(), this._setupEvents(d.event), "fill" === e ? (b = f.height(), this.element.siblings(":visible").each(function() {
        var c = a(this),
          d = c.css("position");
        "absolute" !== d && "fixed" !== d && (b -= c.outerHeight(!0))
      }), this.headers.each(function() {
        b -= a(this).outerHeight(!0)
      }), this.headers.next().each(function() {
        a(this).height(Math.max(0, b - a(this).innerHeight() + a(this).height()))
      }).css("overflow", "auto")) : "auto" === e && (b = 0, this.headers.next().each(function() {
        b = Math.max(b, a(this).css("height", "").height())
      }).height(b))
    },
    _activate: function(b) {
      var c = this._findActive(b)[0];
      c !== this.active[0] && (c = c || this.active[0], this._eventHandler({
        target: c,
        currentTarget: c,
        preventDefault: a.noop
      }))
    },
    _findActive: function(b) {
      return "number" == typeof b ? this.headers.eq(b) : a()
    },
    _setupEvents: function(b) {
      var c = {
        keydown: "_keydown"
      };
      b && a.each(b.split(" "), function(a, b) {
        c[b] = "_eventHandler"
      }), this._off(this.headers.add(this.headers.next())), this._on(this.headers, c), this._on(this.headers.next(), {
        keydown: "_panelKeyDown"
      }), this._hoverable(this.headers), this._focusable(this.headers)
    },
    _eventHandler: function(b) {
      var c = this.options,
        d = this.active,
        e = a(b.currentTarget),
        f = e[0] === d[0],
        g = f && c.collapsible,
        h = g ? a() : e.next(),
        i = d.next(),
        j = {
          oldHeader: d,
          oldPanel: i,
          newHeader: g ? a() : e,
          newPanel: h
        };
      b.preventDefault(), f && !c.collapsible || this._trigger("beforeActivate", b, j) === !1 || (c.active = g ? !1 : this.headers.index(e), this.active = f ? a() : e, this._toggle(j), d.removeClass("ui-accordion-header-active ui-state-active"), c.icons && d.children(".ui-accordion-header-icon").removeClass(c.icons.activeHeader).addClass(c.icons.header), f || (e.removeClass("ui-corner-all").addClass("ui-accordion-header-active ui-state-active ui-corner-top"), c.icons && e.children(".ui-accordion-header-icon").removeClass(c.icons.header).addClass(c.icons.activeHeader), e.next().addClass("ui-accordion-content-active")))
    },
    _toggle: function(b) {
      var c = b.newPanel,
        d = this.prevShow.length ? this.prevShow : b.oldPanel;
      this.prevShow.add(this.prevHide).stop(!0, !0), this.prevShow = c, this.prevHide = d, this.options.animate ? this._animate(c, d, b) : (d.hide(), c.show(), this._toggleComplete(b)), d.attr({
        "aria-expanded": "false",
        "aria-hidden": "true"
      }), d.prev().attr("aria-selected", "false"), c.length && d.length ? d.prev().attr("tabIndex", -1) : c.length && this.headers.filter(function() {
        return 0 === a(this).attr("tabIndex")
      }).attr("tabIndex", -1), c.attr({
        "aria-expanded": "true",
        "aria-hidden": "false"
      }).prev().attr({
        "aria-selected": "true",
        tabIndex: 0
      })
    },
    _animate: function(a, b, c) {
      var f, g, h, i = this,
        j = 0,
        k = a.length && (!b.length || a.index() < b.index()),
        l = this.options.animate || {},
        m = k && l.down || l,
        n = function() {
          i._toggleComplete(c)
        };
      return "number" == typeof m && (h = m), "string" == typeof m && (g = m), g = g || m.easing || l.easing, h = h || m.duration || l.duration, b.length ? a.length ? (f = a.show().outerHeight(), b.animate(d, {
        duration: h,
        easing: g,
        step: function(a, b) {
          b.now = Math.round(a)
        }
      }), a.hide().animate(e, {
        duration: h,
        easing: g,
        complete: n,
        step: function(a, c) {
          c.now = Math.round(a), "height" !== c.prop ? j += c.now : "content" !== i.options.heightStyle && (c.now = Math.round(f - b.outerHeight() - j), j = 0)
        }
      }), void 0) : b.animate(d, h, g, n) : a.animate(e, h, g, n)
    },
    _toggleComplete: function(a) {
      var b = a.oldPanel;
      b.removeClass("ui-accordion-content-active").prev().removeClass("ui-corner-top").addClass("ui-corner-all"), b.length && (b.parent()[0].className = b.parent()[0].className), this._trigger("activate", null, a)
    }
  })
}(jQuery),
function(a) {
  var c = 0;
  a.widget("ui.autocomplete", {
    version: "1.10.3",
    defaultElement: "<input>",
    options: {
      appendTo: null,
      autoFocus: !1,
      delay: 300,
      minLength: 1,
      position: {
        my: "left top",
        at: "left bottom",
        collision: "none"
      },
      source: null,
      change: null,
      close: null,
      focus: null,
      open: null,
      response: null,
      search: null,
      select: null
    },
    pending: 0,
    _create: function() {
      var b, c, d, e = this.element[0].nodeName.toLowerCase(),
        f = "textarea" === e,
        g = "input" === e;
      this.isMultiLine = f ? !0 : g ? !1 : this.element.prop("isContentEditable"), this.valueMethod = this.element[f || g ? "val" : "text"], this.isNewMenu = !0, this.element.addClass("ui-autocomplete-input").attr("autocomplete", "off"), this._on(this.element, {
        keydown: function(e) {
          if (this.element.prop("readOnly")) return b = !0, d = !0, c = !0, void 0;
          b = !1, d = !1, c = !1;
          var f = a.ui.keyCode;
          switch (e.keyCode) {
            case f.PAGE_UP:
              b = !0, this._move("previousPage", e);
              break;
            case f.PAGE_DOWN:
              b = !0, this._move("nextPage", e);
              break;
            case f.UP:
              b = !0, this._keyEvent("previous", e);
              break;
            case f.DOWN:
              b = !0, this._keyEvent("next", e);
              break;
            case f.ENTER:
            case f.NUMPAD_ENTER:
              this.menu.active && (b = !0, e.preventDefault(), this.menu.select(e));
              break;
            case f.TAB:
              this.menu.active && this.menu.select(e);
              break;
            case f.ESCAPE:
              this.menu.element.is(":visible") && (this._value(this.term), this.close(e), e.preventDefault());
              break;
            default:
              c = !0, this._searchTimeout(e)
          }
        },
        keypress: function(d) {
          if (b) return b = !1, (!this.isMultiLine || this.menu.element.is(":visible")) && d.preventDefault(), void 0;
          if (!c) {
            var e = a.ui.keyCode;
            switch (d.keyCode) {
              case e.PAGE_UP:
                this._move("previousPage", d);
                break;
              case e.PAGE_DOWN:
                this._move("nextPage", d);
                break;
              case e.UP:
                this._keyEvent("previous", d);
                break;
              case e.DOWN:
                this._keyEvent("next", d)
            }
          }
        },
        input: function(a) {
          return d ? (d = !1, a.preventDefault(), void 0) : (this._searchTimeout(a), void 0)
        },
        focus: function() {
          this.selectedItem = null, this.previous = this._value()
        },
        blur: function(a) {
          return this.cancelBlur ? (delete this.cancelBlur, void 0) : (clearTimeout(this.searching), this.close(a), this._change(a), void 0)
        }
      }), this._initSource(), this.menu = a("<ul>").addClass("ui-autocomplete ui-front").appendTo(this._appendTo()).menu({
        role: null
      }).hide().data("ui-menu"), this._on(this.menu.element, {
        mousedown: function(b) {
          b.preventDefault(), this.cancelBlur = !0, this._delay(function() {
            delete this.cancelBlur
          });
          var c = this.menu.element[0];
          a(b.target).closest(".ui-menu-item").length || this._delay(function() {
            var b = this;
            this.document.one("mousedown", function(d) {
              d.target === b.element[0] || d.target === c || a.contains(c, d.target) || b.close()
            })
          })
        },
        menufocus: function(b, c) {
          if (this.isNewMenu && (this.isNewMenu = !1, b.originalEvent && /^mouse/.test(b.originalEvent.type))) return this.menu.blur(), this.document.one("mousemove", function() {
            a(b.target).trigger(b.originalEvent)
          }), void 0;
          var d = c.item.data("ui-autocomplete-item");
          !1 !== this._trigger("focus", b, {
            item: d
          }) ? b.originalEvent && /^key/.test(b.originalEvent.type) && this._value(d.value) : this.liveRegion.text(d.value)
        },
        menuselect: function(a, b) {
          var c = b.item.data("ui-autocomplete-item"),
            d = this.previous;
          this.element[0] !== this.document[0].activeElement && (this.element.focus(), this.previous = d, this._delay(function() {
            this.previous = d, this.selectedItem = c
          })), !1 !== this._trigger("select", a, {
            item: c
          }) && this._value(c.value), this.term = this._value(), this.close(a), this.selectedItem = c
        }
      }), this.liveRegion = a("<span>", {
        role: "status",
        "aria-live": "polite"
      }).addClass("ui-helper-hidden-accessible").insertBefore(this.element), this._on(this.window, {
        beforeunload: function() {
          this.element.removeAttr("autocomplete")
        }
      })
    },
    _destroy: function() {
      clearTimeout(this.searching), this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete"), this.menu.element.remove(), this.liveRegion.remove()
    },
    _setOption: function(a, b) {
      this._super(a, b), "source" === a && this._initSource(), "appendTo" === a && this.menu.element.appendTo(this._appendTo()), "disabled" === a && b && this.xhr && this.xhr.abort()
    },
    _appendTo: function() {
      var b = this.options.appendTo;
      return b && (b = b.jquery || b.nodeType ? a(b) : this.document.find(b).eq(0)), b || (b = this.element.closest(".ui-front")), b.length || (b = this.document[0].body), b
    },
    _initSource: function() {
      var b, c, d = this;
      a.isArray(this.options.source) ? (b = this.options.source, this.source = function(c, d) {
        d(a.ui.autocomplete.filter(b, c.term))
      }) : "string" == typeof this.options.source ? (c = this.options.source, this.source = function(b, e) {
        d.xhr && d.xhr.abort(), d.xhr = a.ajax({
          url: c,
          data: b,
          dataType: "json",
          success: function(a) {
            e(a)
          },
          error: function() {
            e([])
          }
        })
      }) : this.source = this.options.source
    },
    _searchTimeout: function(a) {
      clearTimeout(this.searching), this.searching = this._delay(function() {
        this.term !== this._value() && (this.selectedItem = null, this.search(null, a))
      }, this.options.delay)
    },
    search: function(a, b) {
      return a = null != a ? a : this._value(), this.term = this._value(), a.length < this.options.minLength ? this.close(b) : this._trigger("search", b) !== !1 ? this._search(a) : void 0
    },
    _search: function(a) {
      this.pending++, this.element.addClass("ui-autocomplete-loading"), this.cancelSearch = !1, this.source({
        term: a
      }, this._response())
    },
    _response: function() {
      var a = this,
        b = ++c;
      return function(d) {
        b === c && a.__response(d), a.pending--, a.pending || a.element.removeClass("ui-autocomplete-loading")
      }
    },
    __response: function(a) {
      a && (a = this._normalize(a)), this._trigger("response", null, {
        content: a
      }), !this.options.disabled && a && a.length && !this.cancelSearch ? (this._suggest(a), this._trigger("open")) : this._close()
    },
    close: function(a) {
      this.cancelSearch = !0, this._close(a)
    },
    _close: function(a) {
      this.menu.element.is(":visible") && (this.menu.element.hide(), this.menu.blur(), this.isNewMenu = !0, this._trigger("close", a))
    },
    _change: function(a) {
      this.previous !== this._value() && this._trigger("change", a, {
        item: this.selectedItem
      })
    },
    _normalize: function(b) {
      return b.length && b[0].label && b[0].value ? b : a.map(b, function(b) {
        return "string" == typeof b ? {
          label: b,
          value: b
        } : a.extend({
          label: b.label || b.value,
          value: b.value || b.label
        }, b)
      })
    },
    _suggest: function(b) {
      var c = this.menu.element.empty();
      this._renderMenu(c, b), this.isNewMenu = !0, this.menu.refresh(), c.show(), this._resizeMenu(), c.position(a.extend({
        of: this.element
      }, this.options.position)), this.options.autoFocus && this.menu.next()
    },
    _resizeMenu: function() {
      var a = this.menu.element;
      a.outerWidth(Math.max(a.width("").outerWidth() + 1, this.element.outerWidth()))
    },
    _renderMenu: function(b, c) {
      var d = this;
      a.each(c, function(a, c) {
        d._renderItemData(b, c)
      })
    },
    _renderItemData: function(a, b) {
      return this._renderItem(a, b).data("ui-autocomplete-item", b)
    },
    _renderItem: function(b, c) {
      return a("<li>").append(a("<a>").text(c.label)).appendTo(b)
    },
    _move: function(a, b) {
      return this.menu.element.is(":visible") ? this.menu.isFirstItem() && /^previous/.test(a) || this.menu.isLastItem() && /^next/.test(a) ? (this._value(this.term), this.menu.blur(), void 0) : (this.menu[a](b), void 0) : (this.search(null, b), void 0)
    },
    widget: function() {
      return this.menu.element
    },
    _value: function() {
      return this.valueMethod.apply(this.element, arguments)
    },
    _keyEvent: function(a, b) {
      (!this.isMultiLine || this.menu.element.is(":visible")) && (this._move(a, b), b.preventDefault())
    }
  }), a.extend(a.ui.autocomplete, {
    escapeRegex: function(a) {
      return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
    },
    filter: function(b, c) {
      var d = new RegExp(a.ui.autocomplete.escapeRegex(c), "i");
      return a.grep(b, function(a) {
        return d.test(a.label || a.value || a)
      })
    }
  }), a.widget("ui.autocomplete", a.ui.autocomplete, {
    options: {
      messages: {
        noResults: "No search results.",
        results: function(a) {
          return a + (a > 1 ? " results are" : " result is") + " available, use up and down arrow keys to navigate."
        }
      }
    },
    __response: function(a) {
      var b;
      this._superApply(arguments), this.options.disabled || this.cancelSearch || (b = a && a.length ? this.options.messages.results(a.length) : this.options.messages.noResults, this.liveRegion.text(b))
    }
  })
}(jQuery),
function(a) {
  var c, d, e, f, g = "ui-button ui-widget ui-state-default ui-corner-all",
    h = "ui-state-hover ui-state-active ",
    i = "ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",
    j = function() {
      var b = a(this);
      setTimeout(function() {
        b.find(":ui-button").button("refresh")
      }, 1)
    },
    k = function(b) {
      var c = b.name,
        d = b.form,
        e = a([]);
      return c && (c = c.replace(/'/g, "\\'"), e = d ? a(d).find("[name='" + c + "']") : a("[name='" + c + "']", b.ownerDocument).filter(function() {
        return !this.form
      })), e
    };
  a.widget("ui.button", {
    version: "1.10.3",
    defaultElement: "<button>",
    options: {
      disabled: null,
      text: !0,
      label: null,
      icons: {
        primary: null,
        secondary: null
      }
    },
    _create: function() {
      this.element.closest("form").unbind("reset" + this.eventNamespace).bind("reset" + this.eventNamespace, j), "boolean" != typeof this.options.disabled ? this.options.disabled = !!this.element.prop("disabled") : this.element.prop("disabled", this.options.disabled), this._determineButtonType(), this.hasTitle = !!this.buttonElement.attr("title");
      var b = this,
        h = this.options,
        i = "checkbox" === this.type || "radio" === this.type,
        l = i ? "" : "ui-state-active",
        m = "ui-state-focus";
      null === h.label && (h.label = "input" === this.type ? this.buttonElement.val() : this.buttonElement.html()), this._hoverable(this.buttonElement), this.buttonElement.addClass(g).attr("role", "button").bind("mouseenter" + this.eventNamespace, function() {
        h.disabled || this === c && a(this).addClass("ui-state-active")
      }).bind("mouseleave" + this.eventNamespace, function() {
        h.disabled || a(this).removeClass(l)
      }).bind("click" + this.eventNamespace, function(a) {
        h.disabled && (a.preventDefault(), a.stopImmediatePropagation())
      }), this.element.bind("focus" + this.eventNamespace, function() {
        b.buttonElement.addClass(m)
      }).bind("blur" + this.eventNamespace, function() {
        b.buttonElement.removeClass(m)
      }), i && (this.element.bind("change" + this.eventNamespace, function() {
        f || b.refresh()
      }), this.buttonElement.bind("mousedown" + this.eventNamespace, function(a) {
        h.disabled || (f = !1, d = a.pageX, e = a.pageY)
      }).bind("mouseup" + this.eventNamespace, function(a) {
        h.disabled || (d !== a.pageX || e !== a.pageY) && (f = !0)
      })), "checkbox" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
        return h.disabled || f ? !1 : void 0
      }) : "radio" === this.type ? this.buttonElement.bind("click" + this.eventNamespace, function() {
        if (h.disabled || f) return !1;
        a(this).addClass("ui-state-active"), b.buttonElement.attr("aria-pressed", "true");
        var c = b.element[0];
        k(c).not(c).map(function() {
          return a(this).button("widget")[0]
        }).removeClass("ui-state-active").attr("aria-pressed", "false")
      }) : (this.buttonElement.bind("mousedown" + this.eventNamespace, function() {
        return h.disabled ? !1 : (a(this).addClass("ui-state-active"), c = this, b.document.one("mouseup", function() {
          c = null
        }), void 0)
      }).bind("mouseup" + this.eventNamespace, function() {
        return h.disabled ? !1 : (a(this).removeClass("ui-state-active"), void 0)
      }).bind("keydown" + this.eventNamespace, function(b) {
        return h.disabled ? !1 : ((b.keyCode === a.ui.keyCode.SPACE || b.keyCode === a.ui.keyCode.ENTER) && a(this).addClass("ui-state-active"), void 0)
      }).bind("keyup" + this.eventNamespace + " blur" + this.eventNamespace, function() {
        a(this).removeClass("ui-state-active")
      }), this.buttonElement.is("a") && this.buttonElement.keyup(function(b) {
        b.keyCode === a.ui.keyCode.SPACE && a(this).click()
      })), this._setOption("disabled", h.disabled), this._resetButton()
    },
    _determineButtonType: function() {
      var a, b, c;
      this.type = this.element.is("[type=checkbox]") ? "checkbox" : this.element.is("[type=radio]") ? "radio" : this.element.is("input") ? "input" : "button", "checkbox" === this.type || "radio" === this.type ? (a = this.element.parents().last(), b = "label[for='" + this.element.attr("id") + "']", this.buttonElement = a.find(b), this.buttonElement.length || (a = a.length ? a.siblings() : this.element.siblings(), this.buttonElement = a.filter(b), this.buttonElement.length || (this.buttonElement = a.find(b))), this.element.addClass("ui-helper-hidden-accessible"), c = this.element.is(":checked"), c && this.buttonElement.addClass("ui-state-active"), this.buttonElement.prop("aria-pressed", c)) : this.buttonElement = this.element
    },
    widget: function() {
      return this.buttonElement
    },
    _destroy: function() {
      this.element.removeClass("ui-helper-hidden-accessible"), this.buttonElement.removeClass(g + " " + h + " " + i).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()), this.hasTitle || this.buttonElement.removeAttr("title")
    },
    _setOption: function(a, b) {
      return this._super(a, b), "disabled" === a ? (b ? this.element.prop("disabled", !0) : this.element.prop("disabled", !1), void 0) : (this._resetButton(), void 0)
    },
    refresh: function() {
      var b = this.element.is("input, button") ? this.element.is(":disabled") : this.element.hasClass("ui-button-disabled");
      b !== this.options.disabled && this._setOption("disabled", b), "radio" === this.type ? k(this.element[0]).each(function() {
        a(this).is(":checked") ? a(this).button("widget").addClass("ui-state-active").attr("aria-pressed", "true") : a(this).button("widget").removeClass("ui-state-active").attr("aria-pressed", "false")
      }) : "checkbox" === this.type && (this.element.is(":checked") ? this.buttonElement.addClass("ui-state-active").attr("aria-pressed", "true") : this.buttonElement.removeClass("ui-state-active").attr("aria-pressed", "false"))
    },
    _resetButton: function() {
      if ("input" === this.type) return this.options.label && this.element.val(this.options.label), void 0;
      var b = this.buttonElement.removeClass(i),
        c = a("<span></span>", this.document[0]).addClass("ui-button-text").html(this.options.label).appendTo(b.empty()).text(),
        d = this.options.icons,
        e = d.primary && d.secondary,
        f = [];
      d.primary || d.secondary ? (this.options.text && f.push("ui-button-text-icon" + (e ? "s" : d.primary ? "-primary" : "-secondary")), d.primary && b.prepend("<span class='ui-button-icon-primary ui-icon " + d.primary + "'></span>"), d.secondary && b.append("<span class='ui-button-icon-secondary ui-icon " + d.secondary + "'></span>"), this.options.text || (f.push(e ? "ui-button-icons-only" : "ui-button-icon-only"), this.hasTitle || b.attr("title", a.trim(c)))) : f.push("ui-button-text-only"), b.addClass(f.join(" "))
    }
  }), a.widget("ui.buttonset", {
    version: "1.10.3",
    options: {
      items: "button, input[type=button], input[type=submit], input[type=reset], input[type=checkbox], input[type=radio], a, :data(ui-button)"
    },
    _create: function() {
      this.element.addClass("ui-buttonset")
    },
    _init: function() {
      this.refresh()
    },
    _setOption: function(a, b) {
      "disabled" === a && this.buttons.button("option", a, b), this._super(a, b)
    },
    refresh: function() {
      var b = "rtl" === this.element.css("direction");
      this.buttons = this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function() {
        return a(this).button("widget")[0]
      }).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(b ? "ui-corner-right" : "ui-corner-left").end().filter(":last").addClass(b ? "ui-corner-left" : "ui-corner-right").end().end()
    },
    _destroy: function() {
      this.element.removeClass("ui-buttonset"), this.buttons.map(function() {
        return a(this).button("widget")[0]
      }).removeClass("ui-corner-left ui-corner-right").end().button("destroy")
    }
  })
}(jQuery),
function(a, b) {
  function e() {
    this._curInst = null, this._keyEvent = !1, this._disabledInputs = [], this._datepickerShowing = !1, this._inDialog = !1, this._mainDivId = "ui-datepicker-div", this._inlineClass = "ui-datepicker-inline", this._appendClass = "ui-datepicker-append", this._triggerClass = "ui-datepicker-trigger", this._dialogClass = "ui-datepicker-dialog", this._disableClass = "ui-datepicker-disabled", this._unselectableClass = "ui-datepicker-unselectable", this._currentClass = "ui-datepicker-current-day", this._dayOverClass = "ui-datepicker-days-cell-over", this.regional = [], this.regional[""] = {
      closeText: "Done",
      prevText: "Prev",
      nextText: "Next",
      currentText: "Today",
      monthNames: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      monthNamesShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      dayNames: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      dayNamesShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      dayNamesMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
      weekHeader: "Wk",
      dateFormat: "mm/dd/yy",
      firstDay: 0,
      isRTL: !1,
      showMonthAfterYear: !1,
      yearSuffix: ""
    }, this._defaults = {
      showOn: "focus",
      showAnim: "fadeIn",
      showOptions: {},
      defaultDate: null,
      appendText: "",
      buttonText: "...",
      buttonImage: "",
      buttonImageOnly: !1,
      hideIfNoPrevNext: !1,
      navigationAsDateFormat: !1,
      gotoCurrent: !1,
      changeMonth: !1,
      changeYear: !1,
      yearRange: "c-10:c+10",
      showOtherMonths: !1,
      selectOtherMonths: !1,
      showWeek: !1,
      calculateWeek: this.iso8601Week,
      shortYearCutoff: "+10",
      minDate: null,
      maxDate: null,
      duration: "fast",
      beforeShowDay: null,
      beforeShow: null,
      onSelect: null,
      onChangeMonthYear: null,
      onClose: null,
      numberOfMonths: 1,
      showCurrentAtPos: 0,
      stepMonths: 1,
      stepBigMonths: 12,
      altField: "",
      altFormat: "",
      constrainInput: !0,
      showButtonPanel: !1,
      autoSize: !1,
      disabled: !1
    }, a.extend(this._defaults, this.regional[""]), this.dpDiv = f(a("<div id='" + this._mainDivId + "' class='ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>"))
  }

  function f(b) {
    var c = "button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";
    return b.delegate(c, "mouseout", function() {
      a(this).removeClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && a(this).removeClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && a(this).removeClass("ui-datepicker-next-hover")
    }).delegate(c, "mouseover", function() {
      a.datepicker._isDisabledDatepicker(d.inline ? b.parent()[0] : d.input[0]) || (a(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"), a(this).addClass("ui-state-hover"), -1 !== this.className.indexOf("ui-datepicker-prev") && a(this).addClass("ui-datepicker-prev-hover"), -1 !== this.className.indexOf("ui-datepicker-next") && a(this).addClass("ui-datepicker-next-hover"))
    })
  }

  function g(b, c) {
    a.extend(b, c);
    for (var d in c) null == c[d] && (b[d] = c[d]);
    return b
  }
  a.extend(a.ui, {
    datepicker: {
      version: "1.10.3"
    }
  });
  var d, c = "datepicker";
  a.extend(e.prototype, {
    markerClassName: "hasDatepicker",
    maxRows: 4,
    _widgetDatepicker: function() {
      return this.dpDiv
    },
    setDefaults: function(a) {
      return g(this._defaults, a || {}), this
    },
    _attachDatepicker: function(b, c) {
      var d, e, f;
      d = b.nodeName.toLowerCase(), e = "div" === d || "span" === d, b.id || (this.uuid += 1, b.id = "dp" + this.uuid), f = this._newInst(a(b), e), f.settings = a.extend({}, c || {}), "input" === d ? this._connectDatepicker(b, f) : e && this._inlineDatepicker(b, f)
    },
    _newInst: function(b, c) {
      var d = b[0].id.replace(/([^A-Za-z0-9_\-])/g, "\\\\$1");
      return {
        id: d,
        input: b,
        selectedDay: 0,
        selectedMonth: 0,
        selectedYear: 0,
        drawMonth: 0,
        drawYear: 0,
        inline: c,
        dpDiv: c ? f(a("<div class='" + this._inlineClass + " ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all'></div>")) : this.dpDiv
      }
    },
    _connectDatepicker: function(b, d) {
      var e = a(b);
      d.append = a([]), d.trigger = a([]), e.hasClass(this.markerClassName) || (this._attachments(e, d), e.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp), this._autoSize(d), a.data(b, c, d), d.settings.disabled && this._disableDatepicker(b))
    },
    _attachments: function(b, c) {
      var d, e, f, g = this._get(c, "appendText"),
        h = this._get(c, "isRTL");
      c.append && c.append.remove(), g && (c.append = a("<span class='" + this._appendClass + "'>" + g + "</span>"), b[h ? "before" : "after"](c.append)), b.unbind("focus", this._showDatepicker), c.trigger && c.trigger.remove(), d = this._get(c, "showOn"), ("focus" === d || "both" === d) && b.focus(this._showDatepicker), ("button" === d || "both" === d) && (e = this._get(c, "buttonText"), f = this._get(c, "buttonImage"), c.trigger = a(this._get(c, "buttonImageOnly") ? a("<img/>").addClass(this._triggerClass).attr({
        src: f,
        alt: e,
        title: e
      }) : a("<button type='button'></button>").addClass(this._triggerClass).html(f ? a("<img/>").attr({
        src: f,
        alt: e,
        title: e
      }) : e)), b[h ? "before" : "after"](c.trigger), c.trigger.click(function() {
        return a.datepicker._datepickerShowing && a.datepicker._lastInput === b[0] ? a.datepicker._hideDatepicker() : a.datepicker._datepickerShowing && a.datepicker._lastInput !== b[0] ? (a.datepicker._hideDatepicker(), a.datepicker._showDatepicker(b[0])) : a.datepicker._showDatepicker(b[0]), !1
      }))
    },
    _autoSize: function(a) {
      if (this._get(a, "autoSize") && !a.inline) {
        var b, c, d, e, f = new Date(2009, 11, 20),
          g = this._get(a, "dateFormat");
        g.match(/[DM]/) && (b = function(a) {
          for (c = 0, d = 0, e = 0; e < a.length; e++) a[e].length > c && (c = a[e].length, d = e);
          return d
        }, f.setMonth(b(this._get(a, g.match(/MM/) ? "monthNames" : "monthNamesShort"))), f.setDate(b(this._get(a, g.match(/DD/) ? "dayNames" : "dayNamesShort")) + 20 - f.getDay())), a.input.attr("size", this._formatDate(a, f).length)
      }
    },
    _inlineDatepicker: function(b, d) {
      var e = a(b);
      e.hasClass(this.markerClassName) || (e.addClass(this.markerClassName).append(d.dpDiv), a.data(b, c, d), this._setDate(d, this._getDefaultDate(d), !0), this._updateDatepicker(d), this._updateAlternate(d), d.settings.disabled && this._disableDatepicker(b), d.dpDiv.css("display", "block"))
    },
    _dialogDatepicker: function(b, d, e, f, h) {
      var i, j, k, l, m, n = this._dialogInst;
      return n || (this.uuid += 1, i = "dp" + this.uuid, this._dialogInput = a("<input type='text' id='" + i + "' style='position: absolute; top: -100px; width: 0px;'/>"), this._dialogInput.keydown(this._doKeyDown), a("body").append(this._dialogInput), n = this._dialogInst = this._newInst(this._dialogInput, !1), n.settings = {}, a.data(this._dialogInput[0], c, n)), g(n.settings, f || {}), d = d && d.constructor === Date ? this._formatDate(n, d) : d, this._dialogInput.val(d), this._pos = h ? h.length ? h : [h.pageX, h.pageY] : null, this._pos || (j = document.documentElement.clientWidth, k = document.documentElement.clientHeight, l = document.documentElement.scrollLeft || document.body.scrollLeft, m = document.documentElement.scrollTop || document.body.scrollTop, this._pos = [j / 2 - 100 + l, k / 2 - 150 + m]), this._dialogInput.css("left", this._pos[0] + 20 + "px").css("top", this._pos[1] + "px"), n.settings.onSelect = e, this._inDialog = !0, this.dpDiv.addClass(this._dialogClass), this._showDatepicker(this._dialogInput[0]), a.blockUI && a.blockUI(this.dpDiv), a.data(this._dialogInput[0], c, n), this
    },
    _destroyDatepicker: function(b) {
      var d, e = a(b),
        f = a.data(b, c);
      e.hasClass(this.markerClassName) && (d = b.nodeName.toLowerCase(), a.removeData(b, c), "input" === d ? (f.append.remove(), f.trigger.remove(), e.removeClass(this.markerClassName).unbind("focus", this._showDatepicker).unbind("keydown", this._doKeyDown).unbind("keypress", this._doKeyPress).unbind("keyup", this._doKeyUp)) : ("div" === d || "span" === d) && e.removeClass(this.markerClassName).empty())
    },
    _enableDatepicker: function(b) {
      var d, e, f = a(b),
        g = a.data(b, c);
      f.hasClass(this.markerClassName) && (d = b.nodeName.toLowerCase(), "input" === d ? (b.disabled = !1, g.trigger.filter("button").each(function() {
        this.disabled = !1
      }).end().filter("img").css({
        opacity: "1.0",
        cursor: ""
      })) : ("div" === d || "span" === d) && (e = f.children("." + this._inlineClass), e.children().removeClass("ui-state-disabled"), e.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !1)), this._disabledInputs = a.map(this._disabledInputs, function(a) {
        return a === b ? null : a
      }))
    },
    _disableDatepicker: function(b) {
      var d, e, f = a(b),
        g = a.data(b, c);
      f.hasClass(this.markerClassName) && (d = b.nodeName.toLowerCase(), "input" === d ? (b.disabled = !0, g.trigger.filter("button").each(function() {
        this.disabled = !0
      }).end().filter("img").css({
        opacity: "0.5",
        cursor: "default"
      })) : ("div" === d || "span" === d) && (e = f.children("." + this._inlineClass), e.children().addClass("ui-state-disabled"), e.find("select.ui-datepicker-month, select.ui-datepicker-year").prop("disabled", !0)), this._disabledInputs = a.map(this._disabledInputs, function(a) {
        return a === b ? null : a
      }), this._disabledInputs[this._disabledInputs.length] = b)
    },
    _isDisabledDatepicker: function(a) {
      if (!a) return !1;
      for (var b = 0; b < this._disabledInputs.length; b++)
        if (this._disabledInputs[b] === a) return !0;
      return !1
    },
    _getInst: function(b) {
      try {
        return a.data(b, c)
      } catch (d) {
        throw "Missing instance data for this datepicker"
      }
    },
    _optionDatepicker: function(c, d, e) {
      var f, h, i, j, k = this._getInst(c);
      return 2 === arguments.length && "string" == typeof d ? "defaults" === d ? a.extend({}, a.datepicker._defaults) : k ? "all" === d ? a.extend({}, k.settings) : this._get(k, d) : null : (f = d || {}, "string" == typeof d && (f = {}, f[d] = e), k && (this._curInst === k && this._hideDatepicker(), h = this._getDateDatepicker(c, !0), i = this._getMinMaxDate(k, "min"), j = this._getMinMaxDate(k, "max"), g(k.settings, f), null !== i && f.dateFormat !== b && f.minDate === b && (k.settings.minDate = this._formatDate(k, i)), null !== j && f.dateFormat !== b && f.maxDate === b && (k.settings.maxDate = this._formatDate(k, j)), "disabled" in f && (f.disabled ? this._disableDatepicker(c) : this._enableDatepicker(c)), this._attachments(a(c), k), this._autoSize(k), this._setDate(k, h), this._updateAlternate(k), this._updateDatepicker(k)), void 0)
    },
    _changeDatepicker: function(a, b, c) {
      this._optionDatepicker(a, b, c)
    },
    _refreshDatepicker: function(a) {
      var b = this._getInst(a);
      b && this._updateDatepicker(b)
    },
    _setDateDatepicker: function(a, b) {
      var c = this._getInst(a);
      c && (this._setDate(c, b), this._updateDatepicker(c), this._updateAlternate(c))
    },
    _getDateDatepicker: function(a, b) {
      var c = this._getInst(a);
      return c && !c.inline && this._setDateFromField(c, b), c ? this._getDate(c) : null
    },
    _doKeyDown: function(b) {
      var c, d, e, f = a.datepicker._getInst(b.target),
        g = !0,
        h = f.dpDiv.is(".ui-datepicker-rtl");
      if (f._keyEvent = !0, a.datepicker._datepickerShowing) switch (b.keyCode) {
        case 9:
          a.datepicker._hideDatepicker(), g = !1;
          break;
        case 13:
          return e = a("td." + a.datepicker._dayOverClass + ":not(." + a.datepicker._currentClass + ")", f.dpDiv), e[0] && a.datepicker._selectDay(b.target, f.selectedMonth, f.selectedYear, e[0]), c = a.datepicker._get(f, "onSelect"), c ? (d = a.datepicker._formatDate(f), c.apply(f.input ? f.input[0] : null, [d, f])) : a.datepicker._hideDatepicker(), !1;
        case 27:
          a.datepicker._hideDatepicker();
          break;
        case 33:
          a.datepicker._adjustDate(b.target, b.ctrlKey ? -a.datepicker._get(f, "stepBigMonths") : -a.datepicker._get(f, "stepMonths"), "M");
          break;
        case 34:
          a.datepicker._adjustDate(b.target, b.ctrlKey ? +a.datepicker._get(f, "stepBigMonths") : +a.datepicker._get(f, "stepMonths"), "M");
          break;
        case 35:
          (b.ctrlKey || b.metaKey) && a.datepicker._clearDate(b.target), g = b.ctrlKey || b.metaKey;
          break;
        case 36:
          (b.ctrlKey || b.metaKey) && a.datepicker._gotoToday(b.target), g = b.ctrlKey || b.metaKey;
          break;
        case 37:
          (b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, h ? 1 : -1, "D"), g = b.ctrlKey || b.metaKey, b.originalEvent.altKey && a.datepicker._adjustDate(b.target, b.ctrlKey ? -a.datepicker._get(f, "stepBigMonths") : -a.datepicker._get(f, "stepMonths"), "M");
          break;
        case 38:
          (b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, -7, "D"), g = b.ctrlKey || b.metaKey;
          break;
        case 39:
          (b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, h ? -1 : 1, "D"), g = b.ctrlKey || b.metaKey, b.originalEvent.altKey && a.datepicker._adjustDate(b.target, b.ctrlKey ? +a.datepicker._get(f, "stepBigMonths") : +a.datepicker._get(f, "stepMonths"), "M");
          break;
        case 40:
          (b.ctrlKey || b.metaKey) && a.datepicker._adjustDate(b.target, 7, "D"), g = b.ctrlKey || b.metaKey;
          break;
        default:
          g = !1
      } else 36 === b.keyCode && b.ctrlKey ? a.datepicker._showDatepicker(this) : g = !1;
      g && (b.preventDefault(), b.stopPropagation())
    },
    _doKeyPress: function(b) {
      var c, d, e = a.datepicker._getInst(b.target);
      return a.datepicker._get(e, "constrainInput") ? (c = a.datepicker._possibleChars(a.datepicker._get(e, "dateFormat")), d = String.fromCharCode(null == b.charCode ? b.keyCode : b.charCode), b.ctrlKey || b.metaKey || " " > d || !c || c.indexOf(d) > -1) : void 0
    },
    _doKeyUp: function(b) {
      var c, d = a.datepicker._getInst(b.target);
      if (d.input.val() !== d.lastVal) try {
        c = a.datepicker.parseDate(a.datepicker._get(d, "dateFormat"), d.input ? d.input.val() : null, a.datepicker._getFormatConfig(d)), c && (a.datepicker._setDateFromField(d), a.datepicker._updateAlternate(d), a.datepicker._updateDatepicker(d))
      } catch (e) {}
      return !0
    },
    _showDatepicker: function(b) {
      if (b = b.target || b, "input" !== b.nodeName.toLowerCase() && (b = a("input", b.parentNode)[0]), !a.datepicker._isDisabledDatepicker(b) && a.datepicker._lastInput !== b) {
        var c, d, e, f, h, i, j;
        c = a.datepicker._getInst(b), a.datepicker._curInst && a.datepicker._curInst !== c && (a.datepicker._curInst.dpDiv.stop(!0, !0), c && a.datepicker._datepickerShowing && a.datepicker._hideDatepicker(a.datepicker._curInst.input[0])), d = a.datepicker._get(c, "beforeShow"), e = d ? d.apply(b, [b, c]) : {}, e !== !1 && (g(c.settings, e), c.lastVal = null, a.datepicker._lastInput = b, a.datepicker._setDateFromField(c), a.datepicker._inDialog && (b.value = ""), a.datepicker._pos || (a.datepicker._pos = a.datepicker._findPos(b), a.datepicker._pos[1] += b.offsetHeight), f = !1, a(b).parents().each(function() {
          return f |= "fixed" === a(this).css("position"), !f
        }), h = {
          left: a.datepicker._pos[0],
          top: a.datepicker._pos[1]
        }, a.datepicker._pos = null, c.dpDiv.empty(), c.dpDiv.css({
          position: "absolute",
          display: "block",
          top: "-1000px"
        }), a.datepicker._updateDatepicker(c), h = a.datepicker._checkOffset(c, h, f), c.dpDiv.css({
          position: a.datepicker._inDialog && a.blockUI ? "static" : f ? "fixed" : "absolute",
          display: "none",
          left: h.left + "px",
          top: h.top + "px"
        }), c.inline || (i = a.datepicker._get(c, "showAnim"), j = a.datepicker._get(c, "duration"), c.dpDiv.zIndex(a(b).zIndex() + 1), a.datepicker._datepickerShowing = !0, a.effects && a.effects.effect[i] ? c.dpDiv.show(i, a.datepicker._get(c, "showOptions"), j) : c.dpDiv[i || "show"](i ? j : null), a.datepicker._shouldFocusInput(c) && c.input.focus(), a.datepicker._curInst = c))
      }
    },
    _updateDatepicker: function(b) {
      this.maxRows = 4, d = b, b.dpDiv.empty().append(this._generateHTML(b)), this._attachHandlers(b), b.dpDiv.find("." + this._dayOverClass + " a").mouseover();
      var c, e = this._getNumberOfMonths(b),
        f = e[1],
        g = 17;
      b.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""), f > 1 && b.dpDiv.addClass("ui-datepicker-multi-" + f).css("width", g * f + "em"), b.dpDiv[(1 !== e[0] || 1 !== e[1] ? "add" : "remove") + "Class"]("ui-datepicker-multi"), b.dpDiv[(this._get(b, "isRTL") ? "add" : "remove") + "Class"]("ui-datepicker-rtl"), b === a.datepicker._curInst && a.datepicker._datepickerShowing && a.datepicker._shouldFocusInput(b) && b.input.focus(), b.yearshtml && (c = b.yearshtml, setTimeout(function() {
        c === b.yearshtml && b.yearshtml && b.dpDiv.find("select.ui-datepicker-year:first").replaceWith(b.yearshtml), c = b.yearshtml = null
      }, 0))
    },
    _shouldFocusInput: function(a) {
      return a.input && a.input.is(":visible") && !a.input.is(":disabled") && !a.input.is(":focus")
    },
    _checkOffset: function(b, c, d) {
      var e = b.dpDiv.outerWidth(),
        f = b.dpDiv.outerHeight(),
        g = b.input ? b.input.outerWidth() : 0,
        h = b.input ? b.input.outerHeight() : 0,
        i = document.documentElement.clientWidth + (d ? 0 : a(document).scrollLeft()),
        j = document.documentElement.clientHeight + (d ? 0 : a(document).scrollTop());
      return c.left -= this._get(b, "isRTL") ? e - g : 0, c.left -= d && c.left === b.input.offset().left ? a(document).scrollLeft() : 0, c.top -= d && c.top === b.input.offset().top + h ? a(document).scrollTop() : 0, c.left -= Math.min(c.left, c.left + e > i && i > e ? Math.abs(c.left + e - i) : 0), c.top -= Math.min(c.top, c.top + f > j && j > f ? Math.abs(f + h) : 0), c
    },
    _findPos: function(b) {
      for (var c, d = this._getInst(b), e = this._get(d, "isRTL"); b && ("hidden" === b.type || 1 !== b.nodeType || a.expr.filters.hidden(b));) b = b[e ? "previousSibling" : "nextSibling"];
      return c = a(b).offset(), [c.left, c.top]
    },
    _hideDatepicker: function(b) {
      var d, e, f, g, h = this._curInst;
      !h || b && h !== a.data(b, c) || this._datepickerShowing && (d = this._get(h, "showAnim"), e = this._get(h, "duration"), f = function() {
        a.datepicker._tidyDialog(h)
      }, a.effects && (a.effects.effect[d] || a.effects[d]) ? h.dpDiv.hide(d, a.datepicker._get(h, "showOptions"), e, f) : h.dpDiv["slideDown" === d ? "slideUp" : "fadeIn" === d ? "fadeOut" : "hide"](d ? e : null, f), d || f(), this._datepickerShowing = !1, g = this._get(h, "onClose"), g && g.apply(h.input ? h.input[0] : null, [h.input ? h.input.val() : "", h]), this._lastInput = null, this._inDialog && (this._dialogInput.css({
        position: "absolute",
        left: "0",
        top: "-100px"
      }), a.blockUI && (a.unblockUI(), a("body").append(this.dpDiv))), this._inDialog = !1)
    },
    _tidyDialog: function(a) {
      a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")
    },
    _checkExternalClick: function(b) {
      if (a.datepicker._curInst) {
        var c = a(b.target),
          d = a.datepicker._getInst(c[0]);
        (c[0].id !== a.datepicker._mainDivId && 0 === c.parents("#" + a.datepicker._mainDivId).length && !c.hasClass(a.datepicker.markerClassName) && !c.closest("." + a.datepicker._triggerClass).length && a.datepicker._datepickerShowing && (!a.datepicker._inDialog || !a.blockUI) || c.hasClass(a.datepicker.markerClassName) && a.datepicker._curInst !== d) && a.datepicker._hideDatepicker()
      }
    },
    _adjustDate: function(b, c, d) {
      var e = a(b),
        f = this._getInst(e[0]);
      this._isDisabledDatepicker(e[0]) || (this._adjustInstDate(f, c + ("M" === d ? this._get(f, "showCurrentAtPos") : 0), d), this._updateDatepicker(f))
    },
    _gotoToday: function(b) {
      var c, d = a(b),
        e = this._getInst(d[0]);
      this._get(e, "gotoCurrent") && e.currentDay ? (e.selectedDay = e.currentDay, e.drawMonth = e.selectedMonth = e.currentMonth, e.drawYear = e.selectedYear = e.currentYear) : (c = new Date, e.selectedDay = c.getDate(), e.drawMonth = e.selectedMonth = c.getMonth(), e.drawYear = e.selectedYear = c.getFullYear()), this._notifyChange(e), this._adjustDate(d)
    },
    _selectMonthYear: function(b, c, d) {
      var e = a(b),
        f = this._getInst(e[0]);
      f["selected" + ("M" === d ? "Month" : "Year")] = f["draw" + ("M" === d ? "Month" : "Year")] = parseInt(c.options[c.selectedIndex].value, 10), this._notifyChange(f), this._adjustDate(e)
    },
    _selectDay: function(b, c, d, e) {
      var f, g = a(b);
      a(e).hasClass(this._unselectableClass) || this._isDisabledDatepicker(g[0]) || (f = this._getInst(g[0]), f.selectedDay = f.currentDay = a("a", e).html(), f.selectedMonth = f.currentMonth = c, f.selectedYear = f.currentYear = d, this._selectDate(b, this._formatDate(f, f.currentDay, f.currentMonth, f.currentYear)))
    },
    _clearDate: function(b) {
      var c = a(b);
      this._selectDate(c, "")
    },
    _selectDate: function(b, c) {
      var d, e = a(b),
        f = this._getInst(e[0]);
      c = null != c ? c : this._formatDate(f), f.input && f.input.val(c), this._updateAlternate(f), d = this._get(f, "onSelect"), d ? d.apply(f.input ? f.input[0] : null, [c, f]) : f.input && f.input.trigger("change"), f.inline ? this._updateDatepicker(f) : (this._hideDatepicker(), this._lastInput = f.input[0], "object" != typeof f.input[0] && f.input.focus(), this._lastInput = null)
    },
    _updateAlternate: function(b) {
      var c, d, e, f = this._get(b, "altField");
      f && (c = this._get(b, "altFormat") || this._get(b, "dateFormat"), d = this._getDate(b), e = this.formatDate(c, d, this._getFormatConfig(b)), a(f).each(function() {
        a(this).val(e)
      }))
    },
    noWeekends: function(a) {
      var b = a.getDay();
      return [b > 0 && 6 > b, ""]
    },
    iso8601Week: function(a) {
      var b, c = new Date(a.getTime());
      return c.setDate(c.getDate() + 4 - (c.getDay() || 7)), b = c.getTime(), c.setMonth(0), c.setDate(1), Math.floor(Math.round((b - c) / 864e5) / 7) + 1
    },
    parseDate: function(b, c, d) {
      if (null == b || null == c) throw "Invalid arguments";
      if (c = "object" == typeof c ? c.toString() : c + "", "" === c) return null;
      var e, f, g, t, h = 0,
        i = (d ? d.shortYearCutoff : null) || this._defaults.shortYearCutoff,
        j = "string" != typeof i ? i : (new Date).getFullYear() % 100 + parseInt(i, 10),
        k = (d ? d.dayNamesShort : null) || this._defaults.dayNamesShort,
        l = (d ? d.dayNames : null) || this._defaults.dayNames,
        m = (d ? d.monthNamesShort : null) || this._defaults.monthNamesShort,
        n = (d ? d.monthNames : null) || this._defaults.monthNames,
        o = -1,
        p = -1,
        q = -1,
        r = -1,
        s = !1,
        u = function(a) {
          var c = e + 1 < b.length && b.charAt(e + 1) === a;
          return c && e++, c
        },
        v = function(a) {
          var b = u(a),
            d = "@" === a ? 14 : "!" === a ? 20 : "y" === a && b ? 4 : "o" === a ? 3 : 2,
            e = new RegExp("^\\d{1," + d + "}"),
            f = c.substring(h).match(e);
          if (!f) throw "Missing number at position " + h;
          return h += f[0].length, parseInt(f[0], 10)
        },
        w = function(b, d, e) {
          var f = -1,
            g = a.map(u(b) ? e : d, function(a, b) {
              return [
                [b, a]
              ]
            }).sort(function(a, b) {
              return -(a[1].length - b[1].length)
            });
          if (a.each(g, function(a, b) {
              var d = b[1];
              return c.substr(h, d.length).toLowerCase() === d.toLowerCase() ? (f = b[0], h += d.length, !1) : void 0
            }), -1 !== f) return f + 1;
          throw "Unknown name at position " + h
        },
        x = function() {
          if (c.charAt(h) !== b.charAt(e)) throw "Unexpected literal at position " + h;
          h++
        };
      for (e = 0; e < b.length; e++)
        if (s) "'" !== b.charAt(e) || u("'") ? x() : s = !1;
        else switch (b.charAt(e)) {
          case "d":
            q = v("d");
            break;
          case "D":
            w("D", k, l);
            break;
          case "o":
            r = v("o");
            break;
          case "m":
            p = v("m");
            break;
          case "M":
            p = w("M", m, n);
            break;
          case "y":
            o = v("y");
            break;
          case "@":
            t = new Date(v("@")), o = t.getFullYear(), p = t.getMonth() + 1, q = t.getDate();
            break;
          case "!":
            t = new Date((v("!") - this._ticksTo1970) / 1e4), o = t.getFullYear(), p = t.getMonth() + 1, q = t.getDate();
            break;
          case "'":
            u("'") ? x() : s = !0;
            break;
          default:
            x()
        }
        if (h < c.length && (g = c.substr(h), !/^\s+/.test(g))) throw "Extra/unparsed characters found in date: " + g;
      if (-1 === o ? o = (new Date).getFullYear() : 100 > o && (o += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (j >= o ? 0 : -100)), r > -1)
        for (p = 1, q = r;;) {
          if (f = this._getDaysInMonth(o, p - 1), f >= q) break;
          p++, q -= f
        }
      if (t = this._daylightSavingAdjust(new Date(o, p - 1, q)), t.getFullYear() !== o || t.getMonth() + 1 !== p || t.getDate() !== q) throw "Invalid date";
      return t
    },
    ATOM: "yy-mm-dd",
    COOKIE: "D, dd M yy",
    ISO_8601: "yy-mm-dd",
    RFC_822: "D, d M y",
    RFC_850: "DD, dd-M-y",
    RFC_1036: "D, d M y",
    RFC_1123: "D, d M yy",
    RFC_2822: "D, d M yy",
    RSS: "D, d M y",
    TICKS: "!",
    TIMESTAMP: "@",
    W3C: "yy-mm-dd",
    _ticksTo1970: 1e7 * 60 * 60 * 24 * (718685 + Math.floor(492.5) - Math.floor(19.7) + Math.floor(4.925)),
    formatDate: function(a, b, c) {
      if (!b) return "";
      var d, e = (c ? c.dayNamesShort : null) || this._defaults.dayNamesShort,
        f = (c ? c.dayNames : null) || this._defaults.dayNames,
        g = (c ? c.monthNamesShort : null) || this._defaults.monthNamesShort,
        h = (c ? c.monthNames : null) || this._defaults.monthNames,
        i = function(b) {
          var c = d + 1 < a.length && a.charAt(d + 1) === b;
          return c && d++, c
        },
        j = function(a, b, c) {
          var d = "" + b;
          if (i(a))
            for (; d.length < c;) d = "0" + d;
          return d
        },
        k = function(a, b, c, d) {
          return i(a) ? d[b] : c[b]
        },
        l = "",
        m = !1;
      if (b)
        for (d = 0; d < a.length; d++)
          if (m) "'" !== a.charAt(d) || i("'") ? l += a.charAt(d) : m = !1;
          else switch (a.charAt(d)) {
            case "d":
              l += j("d", b.getDate(), 2);
              break;
            case "D":
              l += k("D", b.getDay(), e, f);
              break;
            case "o":
              l += j("o", Math.round((new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime() - new Date(b.getFullYear(), 0, 0).getTime()) / 864e5), 3);
              break;
            case "m":
              l += j("m", b.getMonth() + 1, 2);
              break;
            case "M":
              l += k("M", b.getMonth(), g, h);
              break;
            case "y":
              l += i("y") ? b.getFullYear() : (b.getYear() % 100 < 10 ? "0" : "") + b.getYear() % 100;
              break;
            case "@":
              l += b.getTime();
              break;
            case "!":
              l += 1e4 * b.getTime() + this._ticksTo1970;
              break;
            case "'":
              i("'") ? l += "'" : m = !0;
              break;
            default:
              l += a.charAt(d)
          }
          return l
    },
    _possibleChars: function(a) {
      var b, c = "",
        d = !1,
        e = function(c) {
          var d = b + 1 < a.length && a.charAt(b + 1) === c;
          return d && b++, d
        };
      for (b = 0; b < a.length; b++)
        if (d) "'" !== a.charAt(b) || e("'") ? c += a.charAt(b) : d = !1;
        else switch (a.charAt(b)) {
          case "d":
          case "m":
          case "y":
          case "@":
            c += "0123456789";
            break;
          case "D":
          case "M":
            return null;
          case "'":
            e("'") ? c += "'" : d = !0;
            break;
          default:
            c += a.charAt(b)
        }
        return c
    },
    _get: function(a, c) {
      return a.settings[c] !== b ? a.settings[c] : this._defaults[c]
    },
    _setDateFromField: function(a, b) {
      if (a.input.val() !== a.lastVal) {
        var c = this._get(a, "dateFormat"),
          d = a.lastVal = a.input ? a.input.val() : null,
          e = this._getDefaultDate(a),
          f = e,
          g = this._getFormatConfig(a);
        try {
          f = this.parseDate(c, d, g) || e
        } catch (h) {
          d = b ? "" : d
        }
        a.selectedDay = f.getDate(), a.drawMonth = a.selectedMonth = f.getMonth(), a.drawYear = a.selectedYear = f.getFullYear(), a.currentDay = d ? f.getDate() : 0, a.currentMonth = d ? f.getMonth() : 0, a.currentYear = d ? f.getFullYear() : 0, this._adjustInstDate(a)
      }
    },
    _getDefaultDate: function(a) {
      return this._restrictMinMax(a, this._determineDate(a, this._get(a, "defaultDate"), new Date))
    },
    _determineDate: function(b, c, d) {
      var e = function(a) {
          var b = new Date;
          return b.setDate(b.getDate() + a), b
        },
        f = function(c) {
          try {
            return a.datepicker.parseDate(a.datepicker._get(b, "dateFormat"), c, a.datepicker._getFormatConfig(b))
          } catch (d) {}
          for (var e = (c.toLowerCase().match(/^c/) ? a.datepicker._getDate(b) : null) || new Date, f = e.getFullYear(), g = e.getMonth(), h = e.getDate(), i = /([+\-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g, j = i.exec(c); j;) {
            switch (j[2] || "d") {
              case "d":
              case "D":
                h += parseInt(j[1], 10);
                break;
              case "w":
              case "W":
                h += 7 * parseInt(j[1], 10);
                break;
              case "m":
              case "M":
                g += parseInt(j[1], 10), h = Math.min(h, a.datepicker._getDaysInMonth(f, g));
                break;
              case "y":
              case "Y":
                f += parseInt(j[1], 10), h = Math.min(h, a.datepicker._getDaysInMonth(f, g))
            }
            j = i.exec(c)
          }
          return new Date(f, g, h)
        },
        g = null == c || "" === c ? d : "string" == typeof c ? f(c) : "number" == typeof c ? isNaN(c) ? d : e(c) : new Date(c.getTime());
      return g = g && "Invalid Date" === g.toString() ? d : g, g && (g.setHours(0), g.setMinutes(0), g.setSeconds(0), g.setMilliseconds(0)), this._daylightSavingAdjust(g)
    },
    _daylightSavingAdjust: function(a) {
      return a ? (a.setHours(a.getHours() > 12 ? a.getHours() + 2 : 0), a) : null
    },
    _setDate: function(a, b, c) {
      var d = !b,
        e = a.selectedMonth,
        f = a.selectedYear,
        g = this._restrictMinMax(a, this._determineDate(a, b, new Date));
      a.selectedDay = a.currentDay = g.getDate(), a.drawMonth = a.selectedMonth = a.currentMonth = g.getMonth(), a.drawYear = a.selectedYear = a.currentYear = g.getFullYear(), e === a.selectedMonth && f === a.selectedYear || c || this._notifyChange(a), this._adjustInstDate(a), a.input && a.input.val(d ? "" : this._formatDate(a))
    },
    _getDate: function(a) {
      var b = !a.currentYear || a.input && "" === a.input.val() ? null : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
      return b
    },
    _attachHandlers: function(b) {
      var c = this._get(b, "stepMonths"),
        d = "#" + b.id.replace(/\\\\/g, "\\");
      b.dpDiv.find("[data-handler]").map(function() {
        var b = {
          prev: function() {
            a.datepicker._adjustDate(d, -c, "M")
          },
          next: function() {
            a.datepicker._adjustDate(d, +c, "M")
          },
          hide: function() {
            a.datepicker._hideDatepicker()
          },
          today: function() {
            a.datepicker._gotoToday(d)
          },
          selectDay: function() {
            return a.datepicker._selectDay(d, +this.getAttribute("data-month"), +this.getAttribute("data-year"), this), !1
          },
          selectMonth: function() {
            return a.datepicker._selectMonthYear(d, this, "M"), !1
          },
          selectYear: function() {
            return a.datepicker._selectMonthYear(d, this, "Y"), !1
          }
        };
        a(this).bind(this.getAttribute("data-event"), b[this.getAttribute("data-handler")])
      })
    },
    _generateHTML: function(a) {
      var b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, N, O = new Date,
        P = this._daylightSavingAdjust(new Date(O.getFullYear(), O.getMonth(), O.getDate())),
        Q = this._get(a, "isRTL"),
        R = this._get(a, "showButtonPanel"),
        S = this._get(a, "hideIfNoPrevNext"),
        T = this._get(a, "navigationAsDateFormat"),
        U = this._getNumberOfMonths(a),
        V = this._get(a, "showCurrentAtPos"),
        W = this._get(a, "stepMonths"),
        X = 1 !== U[0] || 1 !== U[1],
        Y = this._daylightSavingAdjust(a.currentDay ? new Date(a.currentYear, a.currentMonth, a.currentDay) : new Date(9999, 9, 9)),
        Z = this._getMinMaxDate(a, "min"),
        $ = this._getMinMaxDate(a, "max"),
        _ = a.drawMonth - V,
        ab = a.drawYear;
      if (0 > _ && (_ += 12, ab--), $)
        for (b = this._daylightSavingAdjust(new Date($.getFullYear(), $.getMonth() - U[0] * U[1] + 1, $.getDate())), b = Z && Z > b ? Z : b; this._daylightSavingAdjust(new Date(ab, _, 1)) > b;) _--, 0 > _ && (_ = 11, ab--);
      for (a.drawMonth = _, a.drawYear = ab, c = this._get(a, "prevText"), c = T ? this.formatDate(c, this._daylightSavingAdjust(new Date(ab, _ - W, 1)), this._getFormatConfig(a)) : c, d = this._canAdjustMonth(a, -1, ab, _) ? "<a class='ui-datepicker-prev ui-corner-all' data-handler='prev' data-event='click' title='" + c + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "e" : "w") + "'>" + c + "</span></a>" : S ? "" : "<a class='ui-datepicker-prev ui-corner-all ui-state-disabled' title='" + c + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "e" : "w") + "'>" + c + "</span></a>", e = this._get(a, "nextText"), e = T ? this.formatDate(e, this._daylightSavingAdjust(new Date(ab, _ + W, 1)), this._getFormatConfig(a)) : e, f = this._canAdjustMonth(a, 1, ab, _) ? "<a class='ui-datepicker-next ui-corner-all' data-handler='next' data-event='click' title='" + e + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "w" : "e") + "'>" + e + "</span></a>" : S ? "" : "<a class='ui-datepicker-next ui-corner-all ui-state-disabled' title='" + e + "'><span class='ui-icon ui-icon-circle-triangle-" + (Q ? "w" : "e") + "'>" + e + "</span></a>", g = this._get(a, "currentText"), h = this._get(a, "gotoCurrent") && a.currentDay ? Y : P, g = T ? this.formatDate(g, h, this._getFormatConfig(a)) : g, i = a.inline ? "" : "<button type='button' class='ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all' data-handler='hide' data-event='click'>" + this._get(a, "closeText") + "</button>", j = R ? "<div class='ui-datepicker-buttonpane ui-widget-content'>" + (Q ? i : "") + (this._isInRange(a, h) ? "<button type='button' class='ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all' data-handler='today' data-event='click'>" + g + "</button>" : "") + (Q ? "" : i) + "</div>" : "", k = parseInt(this._get(a, "firstDay"), 10), k = isNaN(k) ? 0 : k, l = this._get(a, "showWeek"), m = this._get(a, "dayNames"), n = this._get(a, "dayNamesMin"), o = this._get(a, "monthNames"), p = this._get(a, "monthNamesShort"), q = this._get(a, "beforeShowDay"), r = this._get(a, "showOtherMonths"), s = this._get(a, "selectOtherMonths"), t = this._getDefaultDate(a), u = "", w = 0; w < U[0]; w++) {
        for (x = "", this.maxRows = 4, y = 0; y < U[1]; y++) {
          if (z = this._daylightSavingAdjust(new Date(ab, _, a.selectedDay)), A = " ui-corner-all", B = "", X) {
            if (B += "<div class='ui-datepicker-group", U[1] > 1) switch (y) {
              case 0:
                B += " ui-datepicker-group-first", A = " ui-corner-" + (Q ? "right" : "left");
                break;
              case U[1] - 1:
                B += " ui-datepicker-group-last", A = " ui-corner-" + (Q ? "left" : "right");
                break;
              default:
                B += " ui-datepicker-group-middle", A = ""
            }
            B += "'>"
          }
          for (B += "<div class='ui-datepicker-header ui-widget-header ui-helper-clearfix" + A + "'>" + (/all|left/.test(A) && 0 === w ? Q ? f : d : "") + (/all|right/.test(A) && 0 === w ? Q ? d : f : "") + this._generateMonthYearHeader(a, _, ab, Z, $, w > 0 || y > 0, o, p) + "</div><table class='ui-datepicker-calendar'><thead>" + "<tr>", C = l ? "<th class='ui-datepicker-week-col'>" + this._get(a, "weekHeader") + "</th>" : "", v = 0; 7 > v; v++) D = (v + k) % 7, C += "<th" + ((v + k + 6) % 7 >= 5 ? " class='ui-datepicker-week-end'" : "") + ">" + "<span title='" + m[D] + "'>" + n[D] + "</span></th>";
          for (B += C + "</tr></thead><tbody>", E = this._getDaysInMonth(ab, _), ab === a.selectedYear && _ === a.selectedMonth && (a.selectedDay = Math.min(a.selectedDay, E)), F = (this._getFirstDayOfMonth(ab, _) - k + 7) % 7, G = Math.ceil((F + E) / 7), H = X ? this.maxRows > G ? this.maxRows : G : G, this.maxRows = H, I = this._daylightSavingAdjust(new Date(ab, _, 1 - F)), J = 0; H > J; J++) {
            for (B += "<tr>", K = l ? "<td class='ui-datepicker-week-col'>" + this._get(a, "calculateWeek")(I) + "</td>" : "", v = 0; 7 > v; v++) L = q ? q.apply(a.input ? a.input[0] : null, [I]) : [!0, ""], M = I.getMonth() !== _, N = M && !s || !L[0] || Z && Z > I || $ && I > $, K += "<td class='" + ((v + k + 6) % 7 >= 5 ? " ui-datepicker-week-end" : "") + (M ? " ui-datepicker-other-month" : "") + (I.getTime() === z.getTime() && _ === a.selectedMonth && a._keyEvent || t.getTime() === I.getTime() && t.getTime() === z.getTime() ? " " + this._dayOverClass : "") + (N ? " " + this._unselectableClass + " ui-state-disabled" : "") + (M && !r ? "" : " " + L[1] + (I.getTime() === Y.getTime() ? " " + this._currentClass : "") + (I.getTime() === P.getTime() ? " ui-datepicker-today" : "")) + "'" + (M && !r || !L[2] ? "" : " title='" + L[2].replace(/'/g, "&#39;") + "'") + (N ? "" : " data-handler='selectDay' data-event='click' data-month='" + I.getMonth() + "' data-year='" + I.getFullYear() + "'") + ">" + (M && !r ? "&#xa0;" : N ? "<span class='ui-state-default'>" + I.getDate() + "</span>" : "<a class='ui-state-default" + (I.getTime() === P.getTime() ? " ui-state-highlight" : "") + (I.getTime() === Y.getTime() ? " ui-state-active" : "") + (M ? " ui-priority-secondary" : "") + "' href='#'>" + I.getDate() + "</a>") + "</td>", I.setDate(I.getDate() + 1), I = this._daylightSavingAdjust(I);
            B += K + "</tr>"
          }
          _++, _ > 11 && (_ = 0, ab++), B += "</tbody></table>" + (X ? "</div>" + (U[0] > 0 && y === U[1] - 1 ? "<div class='ui-datepicker-row-break'></div>" : "") : ""), x += B
        }
        u += x
      }
      return u += j, a._keyEvent = !1, u
    },
    _generateMonthYearHeader: function(a, b, c, d, e, f, g, h) {
      var i, j, k, l, m, n, o, p, q = this._get(a, "changeMonth"),
        r = this._get(a, "changeYear"),
        s = this._get(a, "showMonthAfterYear"),
        t = "<div class='ui-datepicker-title'>",
        u = "";
      if (f || !q) u += "<span class='ui-datepicker-month'>" + g[b] + "</span>";
      else {
        for (i = d && d.getFullYear() === c, j = e && e.getFullYear() === c, u += "<select class='ui-datepicker-month' data-handler='selectMonth' data-event='change'>", k = 0; 12 > k; k++)(!i || k >= d.getMonth()) && (!j || k <= e.getMonth()) && (u += "<option value='" + k + "'" + (k === b ? " selected='selected'" : "") + ">" + h[k] + "</option>");
        u += "</select>"
      }
      if (s || (t += u + (!f && q && r ? "" : "&#xa0;")), !a.yearshtml)
        if (a.yearshtml = "", f || !r) t += "<span class='ui-datepicker-year'>" + c + "</span>";
        else {
          for (l = this._get(a, "yearRange").split(":"), m = (new Date).getFullYear(), n = function(a) {
              var b = a.match(/c[+\-].*/) ? c + parseInt(a.substring(1), 10) : a.match(/[+\-].*/) ? m + parseInt(a, 10) : parseInt(a, 10);
              return isNaN(b) ? m : b
            }, o = n(l[0]), p = Math.max(o, n(l[1] || "")), o = d ? Math.max(o, d.getFullYear()) : o, p = e ? Math.min(p, e.getFullYear()) : p, a.yearshtml += "<select class='ui-datepicker-year' data-handler='selectYear' data-event='change'>"; p >= o; o++) a.yearshtml += "<option value='" + o + "'" + (o === c ? " selected='selected'" : "") + ">" + o + "</option>";
          a.yearshtml += "</select>", t += a.yearshtml, a.yearshtml = null
        }
      return t += this._get(a, "yearSuffix"), s && (t += (!f && q && r ? "" : "&#xa0;") + u), t += "</div>"
    },
    _adjustInstDate: function(a, b, c) {
      var d = a.drawYear + ("Y" === c ? b : 0),
        e = a.drawMonth + ("M" === c ? b : 0),
        f = Math.min(a.selectedDay, this._getDaysInMonth(d, e)) + ("D" === c ? b : 0),
        g = this._restrictMinMax(a, this._daylightSavingAdjust(new Date(d, e, f)));
      a.selectedDay = g.getDate(), a.drawMonth = a.selectedMonth = g.getMonth(), a.drawYear = a.selectedYear = g.getFullYear(), ("M" === c || "Y" === c) && this._notifyChange(a)
    },
    _restrictMinMax: function(a, b) {
      var c = this._getMinMaxDate(a, "min"),
        d = this._getMinMaxDate(a, "max"),
        e = c && c > b ? c : b;
      return d && e > d ? d : e
    },
    _notifyChange: function(a) {
      var b = this._get(a, "onChangeMonthYear");
      b && b.apply(a.input ? a.input[0] : null, [a.selectedYear, a.selectedMonth + 1, a])
    },
    _getNumberOfMonths: function(a) {
      var b = this._get(a, "numberOfMonths");
      return null == b ? [1, 1] : "number" == typeof b ? [1, b] : b
    },
    _getMinMaxDate: function(a, b) {
      return this._determineDate(a, this._get(a, b + "Date"), null)
    },
    _getDaysInMonth: function(a, b) {
      return 32 - this._daylightSavingAdjust(new Date(a, b, 32)).getDate()
    },
    _getFirstDayOfMonth: function(a, b) {
      return new Date(a, b, 1).getDay()
    },
    _canAdjustMonth: function(a, b, c, d) {
      var e = this._getNumberOfMonths(a),
        f = this._daylightSavingAdjust(new Date(c, d + (0 > b ? b : e[0] * e[1]), 1));
      return 0 > b && f.setDate(this._getDaysInMonth(f.getFullYear(), f.getMonth())), this._isInRange(a, f)
    },
    _isInRange: function(a, b) {
      var c, d, e = this._getMinMaxDate(a, "min"),
        f = this._getMinMaxDate(a, "max"),
        g = null,
        h = null,
        i = this._get(a, "yearRange");
      return i && (c = i.split(":"), d = (new Date).getFullYear(), g = parseInt(c[0], 10), h = parseInt(c[1], 10), c[0].match(/[+\-].*/) && (g += d), c[1].match(/[+\-].*/) && (h += d)), (!e || b.getTime() >= e.getTime()) && (!f || b.getTime() <= f.getTime()) && (!g || b.getFullYear() >= g) && (!h || b.getFullYear() <= h)
    },
    _getFormatConfig: function(a) {
      var b = this._get(a, "shortYearCutoff");
      return b = "string" != typeof b ? b : (new Date).getFullYear() % 100 + parseInt(b, 10), {
        shortYearCutoff: b,
        dayNamesShort: this._get(a, "dayNamesShort"),
        dayNames: this._get(a, "dayNames"),
        monthNamesShort: this._get(a, "monthNamesShort"),
        monthNames: this._get(a, "monthNames")
      }
    },
    _formatDate: function(a, b, c, d) {
      b || (a.currentDay = a.selectedDay, a.currentMonth = a.selectedMonth, a.currentYear = a.selectedYear);
      var e = b ? "object" == typeof b ? b : this._daylightSavingAdjust(new Date(d, c, b)) : this._daylightSavingAdjust(new Date(a.currentYear, a.currentMonth, a.currentDay));
      return this.formatDate(this._get(a, "dateFormat"), e, this._getFormatConfig(a))
    }
  }), a.fn.datepicker = function(b) {
    if (!this.length) return this;
    a.datepicker.initialized || (a(document).mousedown(a.datepicker._checkExternalClick), a.datepicker.initialized = !0), 0 === a("#" + a.datepicker._mainDivId).length && a("body").append(a.datepicker.dpDiv);
    var c = Array.prototype.slice.call(arguments, 1);
    return "string" != typeof b || "isDisabled" !== b && "getDate" !== b && "widget" !== b ? "option" === b && 2 === arguments.length && "string" == typeof arguments[1] ? a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [this[0]].concat(c)) : this.each(function() {
      "string" == typeof b ? a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [this].concat(c)) : a.datepicker._attachDatepicker(this, b)
    }) : a.datepicker["_" + b + "Datepicker"].apply(a.datepicker, [this[0]].concat(c))
  }, a.datepicker = new e, a.datepicker.initialized = !1, a.datepicker.uuid = (new Date).getTime(), a.datepicker.version = "1.10.3"
}(jQuery),
function(a) {
  var c = {
      buttons: !0,
      height: !0,
      maxHeight: !0,
      maxWidth: !0,
      minHeight: !0,
      minWidth: !0,
      width: !0
    },
    d = {
      maxHeight: !0,
      maxWidth: !0,
      minHeight: !0,
      minWidth: !0
    };
  a.widget("ui.dialog", {
    version: "1.10.3",
    options: {
      appendTo: "body",
      autoOpen: !0,
      buttons: [],
      closeOnEscape: !0,
      closeText: "close",
      dialogClass: "",
      draggable: !0,
      hide: null,
      height: "auto",
      maxHeight: null,
      maxWidth: null,
      minHeight: 150,
      minWidth: 150,
      modal: !1,
      position: {
        my: "center",
        at: "center",
        of: window,
        collision: "fit",
        using: function(b) {
          var c = a(this).css(b).offset().top;
          0 > c && a(this).css("top", b.top - c)
        }
      },
      resizable: !0,
      show: null,
      title: null,
      width: 300,
      beforeClose: null,
      close: null,
      drag: null,
      dragStart: null,
      dragStop: null,
      focus: null,
      open: null,
      resize: null,
      resizeStart: null,
      resizeStop: null
    },
    _create: function() {
      this.originalCss = {
        display: this.element[0].style.display,
        width: this.element[0].style.width,
        minHeight: this.element[0].style.minHeight,
        maxHeight: this.element[0].style.maxHeight,
        height: this.element[0].style.height
      }, this.originalPosition = {
        parent: this.element.parent(),
        index: this.element.parent().children().index(this.element)
      }, this.originalTitle = this.element.attr("title"), this.options.title = this.options.title || this.originalTitle, this._createWrapper(), this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(this.uiDialog), this._createTitlebar(), this._createButtonPane(), this.options.draggable && a.fn.draggable && this._makeDraggable(), this.options.resizable && a.fn.resizable && this._makeResizable(), this._isOpen = !1
    },
    _init: function() {
      this.options.autoOpen && this.open()
    },
    _appendTo: function() {
      var b = this.options.appendTo;
      return b && (b.jquery || b.nodeType) ? a(b) : this.document.find(b || "body").eq(0)
    },
    _destroy: function() {
      var a, b = this.originalPosition;
      this._destroyOverlay(), this.element.removeUniqueId().removeClass("ui-dialog-content ui-widget-content").css(this.originalCss).detach(), this.uiDialog.stop(!0, !0).remove(), this.originalTitle && this.element.attr("title", this.originalTitle), a = b.parent.children().eq(b.index), a.length && a[0] !== this.element[0] ? a.before(this.element) : b.parent.append(this.element)
    },
    widget: function() {
      return this.uiDialog
    },
    disable: a.noop,
    enable: a.noop,
    close: function(b) {
      var c = this;
      this._isOpen && this._trigger("beforeClose", b) !== !1 && (this._isOpen = !1, this._destroyOverlay(), this.opener.filter(":focusable").focus().length || a(this.document[0].activeElement).blur(), this._hide(this.uiDialog, this.options.hide, function() {
        c._trigger("close", b)
      }))
    },
    isOpen: function() {
      return this._isOpen
    },
    moveToTop: function() {
      this._moveToTop()
    },
    _moveToTop: function(a, b) {
      var c = !!this.uiDialog.nextAll(":visible").insertBefore(this.uiDialog).length;
      return c && !b && this._trigger("focus", a), c
    },
    open: function() {
      var b = this;
      return this._isOpen ? (this._moveToTop() && this._focusTabbable(), void 0) : (this._isOpen = !0, this.opener = a(this.document[0].activeElement), this._size(), this._position(), this._createOverlay(), this._moveToTop(null, !0), this._show(this.uiDialog, this.options.show, function() {
        b._focusTabbable(), b._trigger("focus")
      }), this._trigger("open"), void 0)
    },
    _focusTabbable: function() {
      var a = this.element.find("[autofocus]");
      a.length || (a = this.element.find(":tabbable")), a.length || (a = this.uiDialogButtonPane.find(":tabbable")), a.length || (a = this.uiDialogTitlebarClose.filter(":tabbable")), a.length || (a = this.uiDialog), a.eq(0).focus()
    },
    _keepFocus: function(b) {
      function c() {
        var b = this.document[0].activeElement,
          c = this.uiDialog[0] === b || a.contains(this.uiDialog[0], b);
        c || this._focusTabbable()
      }
      b.preventDefault(), c.call(this), this._delay(c)
    },
    _createWrapper: function() {
      this.uiDialog = a("<div>").addClass("ui-dialog ui-widget ui-widget-content ui-corner-all ui-front " + this.options.dialogClass).hide().attr({
        tabIndex: -1,
        role: "dialog"
      }).appendTo(this._appendTo()), this._on(this.uiDialog, {
        keydown: function(b) {
          if (this.options.closeOnEscape && !b.isDefaultPrevented() && b.keyCode && b.keyCode === a.ui.keyCode.ESCAPE) return b.preventDefault(), this.close(b), void 0;
          if (b.keyCode === a.ui.keyCode.TAB) {
            var c = this.uiDialog.find(":tabbable"),
              d = c.filter(":first"),
              e = c.filter(":last");
            b.target !== e[0] && b.target !== this.uiDialog[0] || b.shiftKey ? b.target !== d[0] && b.target !== this.uiDialog[0] || !b.shiftKey || (e.focus(1), b.preventDefault()) : (d.focus(1), b.preventDefault())
          }
        },
        mousedown: function(a) {
          this._moveToTop(a) && this._focusTabbable()
        }
      }), this.element.find("[aria-describedby]").length || this.uiDialog.attr({
        "aria-describedby": this.element.uniqueId().attr("id")
      })
    },
    _createTitlebar: function() {
      var b;
      this.uiDialogTitlebar = a("<div>").addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(this.uiDialog), this._on(this.uiDialogTitlebar, {
        mousedown: function(b) {
          a(b.target).closest(".ui-dialog-titlebar-close") || this.uiDialog.focus()
        }
      }), this.uiDialogTitlebarClose = a("<button></button>").button({
        label: this.options.closeText,
        icons: {
          primary: "ui-icon-closethick"
        },
        text: !1
      }).addClass("ui-dialog-titlebar-close").appendTo(this.uiDialogTitlebar), this._on(this.uiDialogTitlebarClose, {
        click: function(a) {
          a.preventDefault(), this.close(a)
        }
      }), b = a("<span>").uniqueId().addClass("ui-dialog-title").prependTo(this.uiDialogTitlebar), this._title(b), this.uiDialog.attr({
        "aria-labelledby": b.attr("id")
      })
    },
    _title: function(a) {
      this.options.title || a.html("&#160;"), a.text(this.options.title)
    },
    _createButtonPane: function() {
      this.uiDialogButtonPane = a("<div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"), this.uiButtonSet = a("<div>").addClass("ui-dialog-buttonset").appendTo(this.uiDialogButtonPane), this._createButtons()
    },
    _createButtons: function() {
      var b = this,
        c = this.options.buttons;
      return this.uiDialogButtonPane.remove(), this.uiButtonSet.empty(), a.isEmptyObject(c) || a.isArray(c) && !c.length ? (this.uiDialog.removeClass("ui-dialog-buttons"), void 0) : (a.each(c, function(c, d) {
        var e, f;
        d = a.isFunction(d) ? {
          click: d,
          text: c
        } : d, d = a.extend({
          type: "button"
        }, d), e = d.click, d.click = function() {
          e.apply(b.element[0], arguments)
        }, f = {
          icons: d.icons,
          text: d.showText
        }, delete d.icons, delete d.showText, a("<button></button>", d).button(f).appendTo(b.uiButtonSet)
      }), this.uiDialog.addClass("ui-dialog-buttons"), this.uiDialogButtonPane.appendTo(this.uiDialog), void 0)
    },
    _makeDraggable: function() {
      function d(a) {
        return {
          position: a.position,
          offset: a.offset
        }
      }
      var b = this,
        c = this.options;
      this.uiDialog.draggable({
        cancel: ".ui-dialog-content, .ui-dialog-titlebar-close",
        handle: ".ui-dialog-titlebar",
        containment: "document",
        start: function(c, e) {
          a(this).addClass("ui-dialog-dragging"), b._blockFrames(), b._trigger("dragStart", c, d(e))
        },
        drag: function(a, c) {
          b._trigger("drag", a, d(c))
        },
        stop: function(e, f) {
          c.position = [f.position.left - b.document.scrollLeft(), f.position.top - b.document.scrollTop()], a(this).removeClass("ui-dialog-dragging"), b._unblockFrames(), b._trigger("dragStop", e, d(f))
        }
      })
    },
    _makeResizable: function() {
      function g(a) {
        return {
          originalPosition: a.originalPosition,
          originalSize: a.originalSize,
          position: a.position,
          size: a.size
        }
      }
      var b = this,
        c = this.options,
        d = c.resizable,
        e = this.uiDialog.css("position"),
        f = "string" == typeof d ? d : "n,e,s,w,se,sw,ne,nw";
      this.uiDialog.resizable({
        cancel: ".ui-dialog-content",
        containment: "document",
        alsoResize: this.element,
        maxWidth: c.maxWidth,
        maxHeight: c.maxHeight,
        minWidth: c.minWidth,
        minHeight: this._minHeight(),
        handles: f,
        start: function(c, d) {
          a(this).addClass("ui-dialog-resizing"), b._blockFrames(), b._trigger("resizeStart", c, g(d))
        },
        resize: function(a, c) {
          b._trigger("resize", a, g(c))
        },
        stop: function(d, e) {
          c.height = a(this).height(), c.width = a(this).width(), a(this).removeClass("ui-dialog-resizing"), b._unblockFrames(), b._trigger("resizeStop", d, g(e))
        }
      }).css("position", e)
    },
    _minHeight: function() {
      var a = this.options;
      return "auto" === a.height ? a.minHeight : Math.min(a.minHeight, a.height)
    },
    _position: function() {
      var a = this.uiDialog.is(":visible");
      a || this.uiDialog.show(), this.uiDialog.position(this.options.position), a || this.uiDialog.hide()
    },
    _setOptions: function(b) {
      var e = this,
        f = !1,
        g = {};
      a.each(b, function(a, b) {
        e._setOption(a, b), a in c && (f = !0), a in d && (g[a] = b)
      }), f && (this._size(), this._position()), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", g)
    },
    _setOption: function(a, b) {
      var c, d, e = this.uiDialog;
      "dialogClass" === a && e.removeClass(this.options.dialogClass).addClass(b), "disabled" !== a && (this._super(a, b), "appendTo" === a && this.uiDialog.appendTo(this._appendTo()), "buttons" === a && this._createButtons(), "closeText" === a && this.uiDialogTitlebarClose.button({
        label: "" + b
      }), "draggable" === a && (c = e.is(":data(ui-draggable)"), c && !b && e.draggable("destroy"), !c && b && this._makeDraggable()), "position" === a && this._position(), "resizable" === a && (d = e.is(":data(ui-resizable)"), d && !b && e.resizable("destroy"), d && "string" == typeof b && e.resizable("option", "handles", b), d || b === !1 || this._makeResizable()), "title" === a && this._title(this.uiDialogTitlebar.find(".ui-dialog-title")))
    },
    _size: function() {
      var a, b, c, d = this.options;
      this.element.show().css({
        width: "auto",
        minHeight: 0,
        maxHeight: "none",
        height: 0
      }), d.minWidth > d.width && (d.width = d.minWidth), a = this.uiDialog.css({
        height: "auto",
        width: d.width
      }).outerHeight(), b = Math.max(0, d.minHeight - a), c = "number" == typeof d.maxHeight ? Math.max(0, d.maxHeight - a) : "none", "auto" === d.height ? this.element.css({
        minHeight: b,
        maxHeight: c,
        height: "auto"
      }) : this.element.height(Math.max(0, d.height - a)), this.uiDialog.is(":data(ui-resizable)") && this.uiDialog.resizable("option", "minHeight", this._minHeight())
    },
    _blockFrames: function() {
      this.iframeBlocks = this.document.find("iframe").map(function() {
        var b = a(this);
        return a("<div>").css({
          position: "absolute",
          width: b.outerWidth(),
          height: b.outerHeight()
        }).appendTo(b.parent()).offset(b.offset())[0]
      })
    },
    _unblockFrames: function() {
      this.iframeBlocks && (this.iframeBlocks.remove(), delete this.iframeBlocks)
    },
    _allowInteraction: function(b) {
      return a(b.target).closest(".ui-dialog").length ? !0 : !!a(b.target).closest(".ui-datepicker").length
    },
    _createOverlay: function() {
      if (this.options.modal) {
        var b = this,
          c = this.widgetFullName;
        a.ui.dialog.overlayInstances || this._delay(function() {
          a.ui.dialog.overlayInstances && this.document.bind("focusin.dialog", function(d) {
            b._allowInteraction(d) || (d.preventDefault(), a(".ui-dialog:visible:last .ui-dialog-content").data(c)._focusTabbable())
          })
        }), this.overlay = a("<div>").addClass("ui-widget-overlay ui-front").appendTo(this._appendTo()), this._on(this.overlay, {
          mousedown: "_keepFocus"
        }), a.ui.dialog.overlayInstances++
      }
    },
    _destroyOverlay: function() {
      this.options.modal && this.overlay && (a.ui.dialog.overlayInstances--, a.ui.dialog.overlayInstances || this.document.unbind("focusin.dialog"), this.overlay.remove(), this.overlay = null)
    }
  }), a.ui.dialog.overlayInstances = 0, a.uiBackCompat !== !1 && a.widget("ui.dialog", a.ui.dialog, {
    _position: function() {
      var e, b = this.options.position,
        c = [],
        d = [0, 0];
      b ? (("string" == typeof b || "object" == typeof b && "0" in b) && (c = b.split ? b.split(" ") : [b[0], b[1]], 1 === c.length && (c[1] = c[0]), a.each(["left", "top"], function(a, b) {
        +c[a] === c[a] && (d[a] = c[a], c[a] = b)
      }), b = {
        my: c[0] + (d[0] < 0 ? d[0] : "+" + d[0]) + " " + c[1] + (d[1] < 0 ? d[1] : "+" + d[1]),
        at: c.join(" ")
      }), b = a.extend({}, a.ui.dialog.prototype.options.position, b)) : b = a.ui.dialog.prototype.options.position, e = this.uiDialog.is(":visible"), e || this.uiDialog.show(), this.uiDialog.position(b), e || this.uiDialog.hide()
    }
  })
}(jQuery),
function(a) {
  var c = /up|down|vertical/,
    d = /up|left|vertical|horizontal/;
  a.effects.effect.blind = function(b, e) {
    var p, q, r, f = a(this),
      g = ["position", "top", "bottom", "left", "right", "height", "width"],
      h = a.effects.setMode(f, b.mode || "hide"),
      i = b.direction || "up",
      j = c.test(i),
      k = j ? "height" : "width",
      l = j ? "top" : "left",
      m = d.test(i),
      n = {},
      o = "show" === h;
    f.parent().is(".ui-effects-wrapper") ? a.effects.save(f.parent(), g) : a.effects.save(f, g), f.show(), p = a.effects.createWrapper(f).css({
      overflow: "hidden"
    }), q = p[k](), r = parseFloat(p.css(l)) || 0, n[k] = o ? q : 0, m || (f.css(j ? "bottom" : "right", 0).css(j ? "top" : "left", "auto").css({
      position: "absolute"
    }), n[l] = o ? r : q + r), o && (p.css(k, 0), m || p.css(l, r + q)), p.animate(n, {
      duration: b.duration,
      easing: b.easing,
      queue: !1,
      complete: function() {
        "hide" === h && f.hide(), a.effects.restore(f, g), a.effects.removeWrapper(f), e()
      }
    })
  }
}(jQuery),
function(a) {
  a.effects.effect.bounce = function(b, c) {
    var q, r, s, d = a(this),
      e = ["position", "top", "bottom", "left", "right", "height", "width"],
      f = a.effects.setMode(d, b.mode || "effect"),
      g = "hide" === f,
      h = "show" === f,
      i = b.direction || "up",
      j = b.distance,
      k = b.times || 5,
      l = 2 * k + (h || g ? 1 : 0),
      m = b.duration / l,
      n = b.easing,
      o = "up" === i || "down" === i ? "top" : "left",
      p = "up" === i || "left" === i,
      t = d.queue(),
      u = t.length;
    for ((h || g) && e.push("opacity"), a.effects.save(d, e), d.show(), a.effects.createWrapper(d), j || (j = d["top" === o ? "outerHeight" : "outerWidth"]() / 3), h && (s = {
        opacity: 1
      }, s[o] = 0, d.css("opacity", 0).css(o, p ? 2 * -j : 2 * j).animate(s, m, n)), g && (j /= Math.pow(2, k - 1)), s = {}, s[o] = 0, q = 0; k > q; q++) r = {}, r[o] = (p ? "-=" : "+=") + j, d.animate(r, m, n).animate(s, m, n), j = g ? 2 * j : j / 2;
    g && (r = {
      opacity: 0
    }, r[o] = (p ? "-=" : "+=") + j, d.animate(r, m, n)), d.queue(function() {
      g && d.hide(), a.effects.restore(d, e), a.effects.removeWrapper(d), c()
    }), u > 1 && t.splice.apply(t, [1, 0].concat(t.splice(u, l + 1))), d.dequeue()
  }
}(jQuery),
function(a) {
  a.effects.effect.clip = function(b, c) {
    var m, n, o, d = a(this),
      e = ["position", "top", "bottom", "left", "right", "height", "width"],
      f = a.effects.setMode(d, b.mode || "hide"),
      g = "show" === f,
      h = b.direction || "vertical",
      i = "vertical" === h,
      j = i ? "height" : "width",
      k = i ? "top" : "left",
      l = {};
    a.effects.save(d, e), d.show(), m = a.effects.createWrapper(d).css({
      overflow: "hidden"
    }), n = "IMG" === d[0].tagName ? m : d, o = n[j](), g && (n.css(j, 0), n.css(k, o / 2)), l[j] = g ? o : 0, l[k] = g ? 0 : o / 2, n.animate(l, {
      queue: !1,
      duration: b.duration,
      easing: b.easing,
      complete: function() {
        g || d.hide(), a.effects.restore(d, e), a.effects.removeWrapper(d), c()
      }
    })
  }
}(jQuery),
function(a) {
  a.effects.effect.drop = function(b, c) {
    var l, d = a(this),
      e = ["position", "top", "bottom", "left", "right", "opacity", "height", "width"],
      f = a.effects.setMode(d, b.mode || "hide"),
      g = "show" === f,
      h = b.direction || "left",
      i = "up" === h || "down" === h ? "top" : "left",
      j = "up" === h || "left" === h ? "pos" : "neg",
      k = {
        opacity: g ? 1 : 0
      };
    a.effects.save(d, e), d.show(), a.effects.createWrapper(d), l = b.distance || d["top" === i ? "outerHeight" : "outerWidth"](!0) / 2, g && d.css("opacity", 0).css(i, "pos" === j ? -l : l), k[i] = (g ? "pos" === j ? "+=" : "-=" : "pos" === j ? "-=" : "+=") + l, d.animate(k, {
      queue: !1,
      duration: b.duration,
      easing: b.easing,
      complete: function() {
        "hide" === f && d.hide(), a.effects.restore(d, e), a.effects.removeWrapper(d), c()
      }
    })
  }
}(jQuery),
function(a) {
  a.effects.effect.explode = function(b, c) {
    function s() {
      l.push(this), l.length === d * e && t()
    }

    function t() {
      f.css({
        visibility: "visible"
      }), a(l).remove(), h || f.hide(), c()
    }
    var m, n, o, p, q, r, d = b.pieces ? Math.round(Math.sqrt(b.pieces)) : 3,
      e = d,
      f = a(this),
      g = a.effects.setMode(f, b.mode || "hide"),
      h = "show" === g,
      i = f.show().css("visibility", "hidden").offset(),
      j = Math.ceil(f.outerWidth() / e),
      k = Math.ceil(f.outerHeight() / d),
      l = [];
    for (m = 0; d > m; m++)
      for (p = i.top + m * k, r = m - (d - 1) / 2, n = 0; e > n; n++) o = i.left + n * j, q = n - (e - 1) / 2, f.clone().appendTo("body").wrap("<div></div>").css({
        position: "absolute",
        visibility: "visible",
        left: -n * j,
        top: -m * k
      }).parent().addClass("ui-effects-explode").css({
        position: "absolute",
        overflow: "hidden",
        width: j,
        height: k,
        left: o + (h ? q * j : 0),
        top: p + (h ? r * k : 0),
        opacity: h ? 0 : 1
      }).animate({
        left: o + (h ? 0 : q * j),
        top: p + (h ? 0 : r * k),
        opacity: h ? 1 : 0
      }, b.duration || 500, b.easing, s)
  }
}(jQuery),
function(a) {
  a.effects.effect.fade = function(b, c) {
    var d = a(this),
      e = a.effects.setMode(d, b.mode || "toggle");
    d.animate({
      opacity: e
    }, {
      queue: !1,
      duration: b.duration,
      easing: b.easing,
      complete: c
    })
  }
}(jQuery),
function(a) {
  a.effects.effect.fold = function(b, c) {
    var o, p, d = a(this),
      e = ["position", "top", "bottom", "left", "right", "height", "width"],
      f = a.effects.setMode(d, b.mode || "hide"),
      g = "show" === f,
      h = "hide" === f,
      i = b.size || 15,
      j = /([0-9]+)%/.exec(i),
      k = !!b.horizFirst,
      l = g !== k,
      m = l ? ["width", "height"] : ["height", "width"],
      n = b.duration / 2,
      q = {},
      r = {};
    a.effects.save(d, e), d.show(), o = a.effects.createWrapper(d).css({
      overflow: "hidden"
    }), p = l ? [o.width(), o.height()] : [o.height(), o.width()], j && (i = parseInt(j[1], 10) / 100 * p[h ? 0 : 1]), g && o.css(k ? {
      height: 0,
      width: i
    } : {
      height: i,
      width: 0
    }), q[m[0]] = g ? p[0] : i, r[m[1]] = g ? p[1] : 0, o.animate(q, n, b.easing).animate(r, n, b.easing, function() {
      h && d.hide(), a.effects.restore(d, e), a.effects.removeWrapper(d), c()
    })
  }
}(jQuery),
function(a) {
  a.effects.effect.highlight = function(b, c) {
    var d = a(this),
      e = ["backgroundImage", "backgroundColor", "opacity"],
      f = a.effects.setMode(d, b.mode || "show"),
      g = {
        backgroundColor: d.css("backgroundColor")
      };
    "hide" === f && (g.opacity = 0), a.effects.save(d, e), d.show().css({
      backgroundImage: "none",
      backgroundColor: b.color || "#ffff99"
    }).animate(g, {
      queue: !1,
      duration: b.duration,
      easing: b.easing,
      complete: function() {
        "hide" === f && d.hide(), a.effects.restore(d, e), c()
      }
    })
  }
}(jQuery),
function(a) {
  a.effects.effect.pulsate = function(b, c) {
    var n, d = a(this),
      e = a.effects.setMode(d, b.mode || "show"),
      f = "show" === e,
      g = "hide" === e,
      h = f || "hide" === e,
      i = 2 * (b.times || 5) + (h ? 1 : 0),
      j = b.duration / i,
      k = 0,
      l = d.queue(),
      m = l.length;
    for ((f || !d.is(":visible")) && (d.css("opacity", 0).show(), k = 1), n = 1; i > n; n++) d.animate({
      opacity: k
    }, j, b.easing), k = 1 - k;
    d.animate({
      opacity: k
    }, j, b.easing), d.queue(function() {
      g && d.hide(), c()
    }), m > 1 && l.splice.apply(l, [1, 0].concat(l.splice(m, i + 1))), d.dequeue()
  }
}(jQuery),
function(a) {
  a.effects.effect.puff = function(b, c) {
    var d = a(this),
      e = a.effects.setMode(d, b.mode || "hide"),
      f = "hide" === e,
      g = parseInt(b.percent, 10) || 150,
      h = g / 100,
      i = {
        height: d.height(),
        width: d.width(),
        outerHeight: d.outerHeight(),
        outerWidth: d.outerWidth()
      };
    a.extend(b, {
      effect: "scale",
      queue: !1,
      fade: !0,
      mode: e,
      complete: c,
      percent: f ? g : 100,
      from: f ? i : {
        height: i.height * h,
        width: i.width * h,
        outerHeight: i.outerHeight * h,
        outerWidth: i.outerWidth * h
      }
    }), d.effect(b)
  }, a.effects.effect.scale = function(b, c) {
    var d = a(this),
      e = a.extend(!0, {}, b),
      f = a.effects.setMode(d, b.mode || "effect"),
      g = parseInt(b.percent, 10) || (0 === parseInt(b.percent, 10) ? 0 : "hide" === f ? 0 : 100),
      h = b.direction || "both",
      i = b.origin,
      j = {
        height: d.height(),
        width: d.width(),
        outerHeight: d.outerHeight(),
        outerWidth: d.outerWidth()
      },
      k = {
        y: "horizontal" !== h ? g / 100 : 1,
        x: "vertical" !== h ? g / 100 : 1
      };
    e.effect = "size", e.queue = !1, e.complete = c, "effect" !== f && (e.origin = i || ["middle", "center"], e.restore = !0), e.from = b.from || ("show" === f ? {
      height: 0,
      width: 0,
      outerHeight: 0,
      outerWidth: 0
    } : j), e.to = {
      height: j.height * k.y,
      width: j.width * k.x,
      outerHeight: j.outerHeight * k.y,
      outerWidth: j.outerWidth * k.x
    }, e.fade && ("show" === f && (e.from.opacity = 0, e.to.opacity = 1), "hide" === f && (e.from.opacity = 1, e.to.opacity = 0)), d.effect(e)
  }, a.effects.effect.size = function(b, c) {
    var d, e, f, g = a(this),
      h = ["position", "top", "bottom", "left", "right", "width", "height", "overflow", "opacity"],
      i = ["position", "top", "bottom", "left", "right", "overflow", "opacity"],
      j = ["width", "height", "overflow"],
      k = ["fontSize"],
      l = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"],
      m = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"],
      n = a.effects.setMode(g, b.mode || "effect"),
      o = b.restore || "effect" !== n,
      p = b.scale || "both",
      q = b.origin || ["middle", "center"],
      r = g.css("position"),
      s = o ? h : i,
      t = {
        height: 0,
        width: 0,
        outerHeight: 0,
        outerWidth: 0
      };
    "show" === n && g.show(), d = {
      height: g.height(),
      width: g.width(),
      outerHeight: g.outerHeight(),
      outerWidth: g.outerWidth()
    }, "toggle" === b.mode && "show" === n ? (g.from = b.to || t, g.to = b.from || d) : (g.from = b.from || ("show" === n ? t : d), g.to = b.to || ("hide" === n ? t : d)), f = {
      from: {
        y: g.from.height / d.height,
        x: g.from.width / d.width
      },
      to: {
        y: g.to.height / d.height,
        x: g.to.width / d.width
      }
    }, ("box" === p || "both" === p) && (f.from.y !== f.to.y && (s = s.concat(l), g.from = a.effects.setTransition(g, l, f.from.y, g.from), g.to = a.effects.setTransition(g, l, f.to.y, g.to)), f.from.x !== f.to.x && (s = s.concat(m), g.from = a.effects.setTransition(g, m, f.from.x, g.from), g.to = a.effects.setTransition(g, m, f.to.x, g.to))), ("content" === p || "both" === p) && f.from.y !== f.to.y && (s = s.concat(k).concat(j), g.from = a.effects.setTransition(g, k, f.from.y, g.from), g.to = a.effects.setTransition(g, k, f.to.y, g.to)), a.effects.save(g, s), g.show(), a.effects.createWrapper(g), g.css("overflow", "hidden").css(g.from), q && (e = a.effects.getBaseline(q, d), g.from.top = (d.outerHeight - g.outerHeight()) * e.y, g.from.left = (d.outerWidth - g.outerWidth()) * e.x, g.to.top = (d.outerHeight - g.to.outerHeight) * e.y, g.to.left = (d.outerWidth - g.to.outerWidth) * e.x), g.css(g.from), ("content" === p || "both" === p) && (l = l.concat(["marginTop", "marginBottom"]).concat(k), m = m.concat(["marginLeft", "marginRight"]), j = h.concat(l).concat(m), g.find("*[width]").each(function() {
      var c = a(this),
        d = {
          height: c.height(),
          width: c.width(),
          outerHeight: c.outerHeight(),
          outerWidth: c.outerWidth()
        };
      o && a.effects.save(c, j), c.from = {
        height: d.height * f.from.y,
        width: d.width * f.from.x,
        outerHeight: d.outerHeight * f.from.y,
        outerWidth: d.outerWidth * f.from.x
      }, c.to = {
        height: d.height * f.to.y,
        width: d.width * f.to.x,
        outerHeight: d.height * f.to.y,
        outerWidth: d.width * f.to.x
      }, f.from.y !== f.to.y && (c.from = a.effects.setTransition(c, l, f.from.y, c.from), c.to = a.effects.setTransition(c, l, f.to.y, c.to)), f.from.x !== f.to.x && (c.from = a.effects.setTransition(c, m, f.from.x, c.from), c.to = a.effects.setTransition(c, m, f.to.x, c.to)), c.css(c.from), c.animate(c.to, b.duration, b.easing, function() {
        o && a.effects.restore(c, j)
      })
    })), g.animate(g.to, {
      queue: !1,
      duration: b.duration,
      easing: b.easing,
      complete: function() {
        0 === g.to.opacity && g.css("opacity", g.from.opacity), "hide" === n && g.hide(), a.effects.restore(g, s), o || ("static" === r ? g.css({
          position: "relative",
          top: g.to.top,
          left: g.to.left
        }) : a.each(["top", "left"], function(a, b) {
          g.css(b, function(b, c) {
            var d = parseInt(c, 10),
              e = a ? g.to.left : g.to.top;
            return "auto" === c ? e + "px" : d + e + "px"
          })
        })), a.effects.removeWrapper(g), c()
      }
    })
  }
}(jQuery),
function(a) {
  a.effects.effect.shake = function(b, c) {
    var q, d = a(this),
      e = ["position", "top", "bottom", "left", "right", "height", "width"],
      f = a.effects.setMode(d, b.mode || "effect"),
      g = b.direction || "left",
      h = b.distance || 20,
      i = b.times || 3,
      j = 2 * i + 1,
      k = Math.round(b.duration / j),
      l = "up" === g || "down" === g ? "top" : "left",
      m = "up" === g || "left" === g,
      n = {},
      o = {},
      p = {},
      r = d.queue(),
      s = r.length;
    for (a.effects.save(d, e), d.show(), a.effects.createWrapper(d), n[l] = (m ? "-=" : "+=") + h, o[l] = (m ? "+=" : "-=") + 2 * h, p[l] = (m ? "-=" : "+=") + 2 * h, d.animate(n, k, b.easing), q = 1; i > q; q++) d.animate(o, k, b.easing).animate(p, k, b.easing);
    d.animate(o, k, b.easing).animate(n, k / 2, b.easing).queue(function() {
      "hide" === f && d.hide(), a.effects.restore(d, e), a.effects.removeWrapper(d), c()
    }), s > 1 && r.splice.apply(r, [1, 0].concat(r.splice(s, j + 1))), d.dequeue()
  }
}(jQuery),
function(a) {
  a.effects.effect.slide = function(b, c) {
    var k, d = a(this),
      e = ["position", "top", "bottom", "left", "right", "width", "height"],
      f = a.effects.setMode(d, b.mode || "show"),
      g = "show" === f,
      h = b.direction || "left",
      i = "up" === h || "down" === h ? "top" : "left",
      j = "up" === h || "left" === h,
      l = {};
    a.effects.save(d, e), d.show(), k = b.distance || d["top" === i ? "outerHeight" : "outerWidth"](!0), a.effects.createWrapper(d).css({
      overflow: "hidden"
    }), g && d.css(i, j ? isNaN(k) ? "-" + k : -k : k), l[i] = (g ? j ? "+=" : "-=" : j ? "-=" : "+=") + k, d.animate(l, {
      queue: !1,
      duration: b.duration,
      easing: b.easing,
      complete: function() {
        "hide" === f && d.hide(), a.effects.restore(d, e), a.effects.removeWrapper(d), c()
      }
    })
  }
}(jQuery),
function(a) {
  a.effects.effect.transfer = function(b, c) {
    var d = a(this),
      e = a(b.to),
      f = "fixed" === e.css("position"),
      g = a("body"),
      h = f ? g.scrollTop() : 0,
      i = f ? g.scrollLeft() : 0,
      j = e.offset(),
      k = {
        top: j.top - h,
        left: j.left - i,
        height: e.innerHeight(),
        width: e.innerWidth()
      },
      l = d.offset(),
      m = a("<div class='ui-effects-transfer'></div>").appendTo(document.body).addClass(b.className).css({
        top: l.top - h,
        left: l.left - i,
        height: d.innerHeight(),
        width: d.innerWidth(),
        position: f ? "fixed" : "absolute"
      }).animate(k, b.duration, b.easing, function() {
        m.remove(), c()
      })
  }
}(jQuery),
function(a) {
  a.widget("ui.menu", {
    version: "1.10.3",
    defaultElement: "<ul>",
    delay: 300,
    options: {
      icons: {
        submenu: "ui-icon-carat-1-e"
      },
      menus: "ul",
      position: {
        my: "left top",
        at: "right top"
      },
      role: "menu",
      blur: null,
      focus: null,
      select: null
    },
    _create: function() {
      this.activeMenu = this.element, this.mouseHandled = !1, this.element.uniqueId().addClass("ui-menu ui-widget ui-widget-content ui-corner-all").toggleClass("ui-menu-icons", !!this.element.find(".ui-icon").length).attr({
        role: this.options.role,
        tabIndex: 0
      }).bind("click" + this.eventNamespace, a.proxy(function(a) {
        this.options.disabled && a.preventDefault()
      }, this)), this.options.disabled && this.element.addClass("ui-state-disabled").attr("aria-disabled", "true"), this._on({
        "mousedown .ui-menu-item > a": function(a) {
          a.preventDefault()
        },
        "click .ui-state-disabled > a": function(a) {
          a.preventDefault()
        },
        "click .ui-menu-item:has(a)": function(b) {
          var c = a(b.target).closest(".ui-menu-item");
          !this.mouseHandled && c.not(".ui-state-disabled").length && (this.mouseHandled = !0, this.select(b), c.has(".ui-menu").length ? this.expand(b) : this.element.is(":focus") || (this.element.trigger("focus", [!0]), this.active && 1 === this.active.parents(".ui-menu").length && clearTimeout(this.timer)))
        },
        "mouseenter .ui-menu-item": function(b) {
          var c = a(b.currentTarget);
          c.siblings().children(".ui-state-active").removeClass("ui-state-active"), this.focus(b, c)
        },
        mouseleave: "collapseAll",
        "mouseleave .ui-menu": "collapseAll",
        focus: function(a, b) {
          var c = this.active || this.element.children(".ui-menu-item").eq(0);
          b || this.focus(a, c)
        },
        blur: function(b) {
          this._delay(function() {
            a.contains(this.element[0], this.document[0].activeElement) || this.collapseAll(b)
          })
        },
        keydown: "_keydown"
      }), this.refresh(), this._on(this.document, {
        click: function(b) {
          a(b.target).closest(".ui-menu").length || this.collapseAll(b), this.mouseHandled = !1
        }
      })
    },
    _destroy: function() {
      this.element.removeAttr("aria-activedescendant").find(".ui-menu").addBack().removeClass("ui-menu ui-widget ui-widget-content ui-corner-all ui-menu-icons").removeAttr("role").removeAttr("tabIndex").removeAttr("aria-labelledby").removeAttr("aria-expanded").removeAttr("aria-hidden").removeAttr("aria-disabled").removeUniqueId().show(), this.element.find(".ui-menu-item").removeClass("ui-menu-item").removeAttr("role").removeAttr("aria-disabled").children("a").removeUniqueId().removeClass("ui-corner-all ui-state-hover").removeAttr("tabIndex").removeAttr("role").removeAttr("aria-haspopup").children().each(function() {
        var b = a(this);
        b.data("ui-menu-submenu-carat") && b.remove()
      }), this.element.find(".ui-menu-divider").removeClass("ui-menu-divider ui-widget-content")
    },
    _keydown: function(b) {
      function i(a) {
        return a.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
      }
      var c, d, e, f, g, h = !0;
      switch (b.keyCode) {
        case a.ui.keyCode.PAGE_UP:
          this.previousPage(b);
          break;
        case a.ui.keyCode.PAGE_DOWN:
          this.nextPage(b);
          break;
        case a.ui.keyCode.HOME:
          this._move("first", "first", b);
          break;
        case a.ui.keyCode.END:
          this._move("last", "last", b);
          break;
        case a.ui.keyCode.UP:
          this.previous(b);
          break;
        case a.ui.keyCode.DOWN:
          this.next(b);
          break;
        case a.ui.keyCode.LEFT:
          this.collapse(b);
          break;
        case a.ui.keyCode.RIGHT:
          this.active && !this.active.is(".ui-state-disabled") && this.expand(b);
          break;
        case a.ui.keyCode.ENTER:
        case a.ui.keyCode.SPACE:
          this._activate(b);
          break;
        case a.ui.keyCode.ESCAPE:
          this.collapse(b);
          break;
        default:
          h = !1, d = this.previousFilter || "", e = String.fromCharCode(b.keyCode), f = !1, clearTimeout(this.filterTimer), e === d ? f = !0 : e = d + e, g = new RegExp("^" + i(e), "i"), c = this.activeMenu.children(".ui-menu-item").filter(function() {
            return g.test(a(this).children("a").text())
          }), c = f && -1 !== c.index(this.active.next()) ? this.active.nextAll(".ui-menu-item") : c, c.length || (e = String.fromCharCode(b.keyCode), g = new RegExp("^" + i(e), "i"), c = this.activeMenu.children(".ui-menu-item").filter(function() {
            return g.test(a(this).children("a").text())
          })), c.length ? (this.focus(b, c), c.length > 1 ? (this.previousFilter = e, this.filterTimer = this._delay(function() {
            delete this.previousFilter
          }, 1e3)) : delete this.previousFilter) : delete this.previousFilter
      }
      h && b.preventDefault()
    },
    _activate: function(a) {
      this.active.is(".ui-state-disabled") || (this.active.children("a[aria-haspopup='true']").length ? this.expand(a) : this.select(a))
    },
    refresh: function() {
      var b, c = this.options.icons.submenu,
        d = this.element.find(this.options.menus);
      d.filter(":not(.ui-menu)").addClass("ui-menu ui-widget ui-widget-content ui-corner-all").hide().attr({
        role: this.options.role,
        "aria-hidden": "true",
        "aria-expanded": "false"
      }).each(function() {
        var b = a(this),
          d = b.prev("a"),
          e = a("<span>").addClass("ui-menu-icon ui-icon " + c).data("ui-menu-submenu-carat", !0);
        d.attr("aria-haspopup", "true").prepend(e), b.attr("aria-labelledby", d.attr("id"))
      }), b = d.add(this.element), b.children(":not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role", "presentation").children("a").uniqueId().addClass("ui-corner-all").attr({
        tabIndex: -1,
        role: this._itemRole()
      }), b.children(":not(.ui-menu-item)").each(function() {
        var b = a(this);
        /[^\-\u2014\u2013\s]/.test(b.text()) || b.addClass("ui-widget-content ui-menu-divider")
      }), b.children(".ui-state-disabled").attr("aria-disabled", "true"), this.active && !a.contains(this.element[0], this.active[0]) && this.blur()
    },
    _itemRole: function() {
      return {
        menu: "menuitem",
        listbox: "option"
      }[this.options.role]
    },
    _setOption: function(a, b) {
      "icons" === a && this.element.find(".ui-menu-icon").removeClass(this.options.icons.submenu).addClass(b.submenu), this._super(a, b)
    },
    focus: function(a, b) {
      var c, d;
      this.blur(a, a && "focus" === a.type), this._scrollIntoView(b), this.active = b.first(), d = this.active.children("a").addClass("ui-state-focus"), this.options.role && this.element.attr("aria-activedescendant", d.attr("id")), this.active.parent().closest(".ui-menu-item").children("a:first").addClass("ui-state-active"), a && "keydown" === a.type ? this._close() : this.timer = this._delay(function() {
        this._close()
      }, this.delay), c = b.children(".ui-menu"), c.length && /^mouse/.test(a.type) && this._startOpening(c), this.activeMenu = b.parent(), this._trigger("focus", a, {
        item: b
      })
    },
    _scrollIntoView: function(b) {
      var c, d, e, f, g, h;
      this._hasScroll() && (c = parseFloat(a.css(this.activeMenu[0], "borderTopWidth")) || 0, d = parseFloat(a.css(this.activeMenu[0], "paddingTop")) || 0, e = b.offset().top - this.activeMenu.offset().top - c - d, f = this.activeMenu.scrollTop(), g = this.activeMenu.height(), h = b.height(), 0 > e ? this.activeMenu.scrollTop(f + e) : e + h > g && this.activeMenu.scrollTop(f + e - g + h))
    },
    blur: function(a, b) {
      b || clearTimeout(this.timer), this.active && (this.active.children("a").removeClass("ui-state-focus"), this.active = null, this._trigger("blur", a, {
        item: this.active
      }))
    },
    _startOpening: function(a) {
      clearTimeout(this.timer), "true" === a.attr("aria-hidden") && (this.timer = this._delay(function() {
        this._close(), this._open(a)
      }, this.delay))
    },
    _open: function(b) {
      var c = a.extend({
        of: this.active
      }, this.options.position);
      clearTimeout(this.timer), this.element.find(".ui-menu").not(b.parents(".ui-menu")).hide().attr("aria-hidden", "true"), b.show().removeAttr("aria-hidden").attr("aria-expanded", "true").position(c)
    },
    collapseAll: function(b, c) {
      clearTimeout(this.timer), this.timer = this._delay(function() {
        var d = c ? this.element : a(b && b.target).closest(this.element.find(".ui-menu"));
        d.length || (d = this.element), this._close(d), this.blur(b), this.activeMenu = d
      }, this.delay)
    },
    _close: function(a) {
      a || (a = this.active ? this.active.parent() : this.element), a.find(".ui-menu").hide().attr("aria-hidden", "true").attr("aria-expanded", "false").end().find("a.ui-state-active").removeClass("ui-state-active")
    },
    collapse: function(a) {
      var b = this.active && this.active.parent().closest(".ui-menu-item", this.element);
      b && b.length && (this._close(), this.focus(a, b))
    },
    expand: function(a) {
      var b = this.active && this.active.children(".ui-menu ").children(".ui-menu-item").first();
      b && b.length && (this._open(b.parent()), this._delay(function() {
        this.focus(a, b)
      }))
    },
    next: function(a) {
      this._move("next", "first", a)
    },
    previous: function(a) {
      this._move("prev", "last", a)
    },
    isFirstItem: function() {
      return this.active && !this.active.prevAll(".ui-menu-item").length
    },
    isLastItem: function() {
      return this.active && !this.active.nextAll(".ui-menu-item").length
    },
    _move: function(a, b, c) {
      var d;
      this.active && (d = "first" === a || "last" === a ? this.active["first" === a ? "prevAll" : "nextAll"](".ui-menu-item").eq(-1) : this.active[a + "All"](".ui-menu-item").eq(0)), d && d.length && this.active || (d = this.activeMenu.children(".ui-menu-item")[b]()), this.focus(c, d)
    },
    nextPage: function(b) {
      var c, d, e;
      return this.active ? (this.isLastItem() || (this._hasScroll() ? (d = this.active.offset().top, e = this.element.height(), this.active.nextAll(".ui-menu-item").each(function() {
        return c = a(this), c.offset().top - d - e < 0
      }), this.focus(b, c)) : this.focus(b, this.activeMenu.children(".ui-menu-item")[this.active ? "last" : "first"]())), void 0) : (this.next(b), void 0)
    },
    previousPage: function(b) {
      var c, d, e;
      return this.active ? (this.isFirstItem() || (this._hasScroll() ? (d = this.active.offset().top, e = this.element.height(), this.active.prevAll(".ui-menu-item").each(function() {
        return c = a(this), c.offset().top - d + e > 0
      }), this.focus(b, c)) : this.focus(b, this.activeMenu.children(".ui-menu-item").first())), void 0) : (this.next(b), void 0)
    },
    _hasScroll: function() {
      return this.element.outerHeight() < this.element.prop("scrollHeight")
    },
    select: function(b) {
      this.active = this.active || a(b.target).closest(".ui-menu-item");
      var c = {
        item: this.active
      };
      this.active.has(".ui-menu").length || this.collapseAll(b, !0), this._trigger("select", b, c)
    }
  })
}(jQuery),
function(a, b) {
  function m(a, b, c) {
    return [parseFloat(a[0]) * (k.test(a[0]) ? b / 100 : 1), parseFloat(a[1]) * (k.test(a[1]) ? c / 100 : 1)]
  }

  function n(b, c) {
    return parseInt(a.css(b, c), 10) || 0
  }

  function o(b) {
    var c = b[0];
    return 9 === c.nodeType ? {
      width: b.width(),
      height: b.height(),
      offset: {
        top: 0,
        left: 0
      }
    } : a.isWindow(c) ? {
      width: b.width(),
      height: b.height(),
      offset: {
        top: b.scrollTop(),
        left: b.scrollLeft()
      }
    } : c.preventDefault ? {
      width: 0,
      height: 0,
      offset: {
        top: c.pageY,
        left: c.pageX
      }
    } : {
      width: b.outerWidth(),
      height: b.outerHeight(),
      offset: b.offset()
    }
  }
  a.ui = a.ui || {};
  var c, d = Math.max,
    e = Math.abs,
    f = Math.round,
    g = /left|center|right/,
    h = /top|center|bottom/,
    i = /[\+\-]\d+(\.[\d]+)?%?/,
    j = /^\w+/,
    k = /%$/,
    l = a.fn.position;
  a.position = {
      scrollbarWidth: function() {
        if (c !== b) return c;
        var d, e, f = a("<div style='display:block;width:50px;height:50px;overflow:hidden;'><div style='height:100px;width:auto;'></div></div>"),
          g = f.children()[0];
        return a("body").append(f), d = g.offsetWidth, f.css("overflow", "scroll"), e = g.offsetWidth, d === e && (e = f[0].clientWidth), f.remove(), c = d - e
      },
      getScrollInfo: function(b) {
        var c = b.isWindow ? "" : b.element.css("overflow-x"),
          d = b.isWindow ? "" : b.element.css("overflow-y"),
          e = "scroll" === c || "auto" === c && b.width < b.element[0].scrollWidth,
          f = "scroll" === d || "auto" === d && b.height < b.element[0].scrollHeight;
        return {
          width: f ? a.position.scrollbarWidth() : 0,
          height: e ? a.position.scrollbarWidth() : 0
        }
      },
      getWithinInfo: function(b) {
        var c = a(b || window),
          d = a.isWindow(c[0]);
        return {
          element: c,
          isWindow: d,
          offset: c.offset() || {
            left: 0,
            top: 0
          },
          scrollLeft: c.scrollLeft(),
          scrollTop: c.scrollTop(),
          width: d ? c.width() : c.outerWidth(),
          height: d ? c.height() : c.outerHeight()
        }
      }
    }, a.fn.position = function(b) {
      if (!b || !b.of) return l.apply(this, arguments);
      b = a.extend({}, b);
      var c, k, p, q, r, s, t = a(b.of),
        u = a.position.getWithinInfo(b.within),
        v = a.position.getScrollInfo(u),
        w = (b.collision || "flip").split(" "),
        x = {};
      return s = o(t), t[0].preventDefault && (b.at = "left top"), k = s.width, p = s.height, q = s.offset, r = a.extend({}, q), a.each(["my", "at"], function() {
        var c, d, a = (b[this] || "").split(" ");
        1 === a.length && (a = g.test(a[0]) ? a.concat(["center"]) : h.test(a[0]) ? ["center"].concat(a) : ["center", "center"]), a[0] = g.test(a[0]) ? a[0] : "center", a[1] = h.test(a[1]) ? a[1] : "center", c = i.exec(a[0]), d = i.exec(a[1]), x[this] = [c ? c[0] : 0, d ? d[0] : 0], b[this] = [j.exec(a[0])[0], j.exec(a[1])[0]]
      }), 1 === w.length && (w[1] = w[0]), "right" === b.at[0] ? r.left += k : "center" === b.at[0] && (r.left += k / 2), "bottom" === b.at[1] ? r.top += p : "center" === b.at[1] && (r.top += p / 2), c = m(x.at, k, p), r.left += c[0], r.top += c[1], this.each(function() {
        var g, h, i = a(this),
          j = i.outerWidth(),
          l = i.outerHeight(),
          o = n(this, "marginLeft"),
          s = n(this, "marginTop"),
          y = j + o + n(this, "marginRight") + v.width,
          z = l + s + n(this, "marginBottom") + v.height,
          A = a.extend({}, r),
          B = m(x.my, i.outerWidth(), i.outerHeight());
        "right" === b.my[0] ? A.left -= j : "center" === b.my[0] && (A.left -= j / 2), "bottom" === b.my[1] ? A.top -= l : "center" === b.my[1] && (A.top -= l / 2), A.left += B[0], A.top += B[1], a.support.offsetFractions || (A.left = f(A.left), A.top = f(A.top)), g = {
          marginLeft: o,
          marginTop: s
        }, a.each(["left", "top"], function(d, e) {
          a.ui.position[w[d]] && a.ui.position[w[d]][e](A, {
            targetWidth: k,
            targetHeight: p,
            elemWidth: j,
            elemHeight: l,
            collisionPosition: g,
            collisionWidth: y,
            collisionHeight: z,
            offset: [c[0] + B[0], c[1] + B[1]],
            my: b.my,
            at: b.at,
            within: u,
            elem: i
          })
        }), b.using && (h = function(a) {
          var c = q.left - A.left,
            f = c + k - j,
            g = q.top - A.top,
            h = g + p - l,
            m = {
              target: {
                element: t,
                left: q.left,
                top: q.top,
                width: k,
                height: p
              },
              element: {
                element: i,
                left: A.left,
                top: A.top,
                width: j,
                height: l
              },
              horizontal: 0 > f ? "left" : c > 0 ? "right" : "center",
              vertical: 0 > h ? "top" : g > 0 ? "bottom" : "middle"
            };
          j > k && e(c + f) < k && (m.horizontal = "center"), l > p && e(g + h) < p && (m.vertical = "middle"), m.important = d(e(c), e(f)) > d(e(g), e(h)) ? "horizontal" : "vertical", b.using.call(this, a, m)
        }), i.offset(a.extend(A, {
          using: h
        }))
      })
    }, a.ui.position = {
      fit: {
        left: function(a, b) {
          var j, c = b.within,
            e = c.isWindow ? c.scrollLeft : c.offset.left,
            f = c.width,
            g = a.left - b.collisionPosition.marginLeft,
            h = e - g,
            i = g + b.collisionWidth - f - e;
          b.collisionWidth > f ? h > 0 && 0 >= i ? (j = a.left + h + b.collisionWidth - f - e, a.left += h - j) : a.left = i > 0 && 0 >= h ? e : h > i ? e + f - b.collisionWidth : e : h > 0 ? a.left += h : i > 0 ? a.left -= i : a.left = d(a.left - g, a.left)
        },
        top: function(a, b) {
          var j, c = b.within,
            e = c.isWindow ? c.scrollTop : c.offset.top,
            f = b.within.height,
            g = a.top - b.collisionPosition.marginTop,
            h = e - g,
            i = g + b.collisionHeight - f - e;
          b.collisionHeight > f ? h > 0 && 0 >= i ? (j = a.top + h + b.collisionHeight - f - e, a.top += h - j) : a.top = i > 0 && 0 >= h ? e : h > i ? e + f - b.collisionHeight : e : h > 0 ? a.top += h : i > 0 ? a.top -= i : a.top = d(a.top - g, a.top)
        }
      },
      flip: {
        left: function(a, b) {
          var n, o, c = b.within,
            d = c.offset.left + c.scrollLeft,
            f = c.width,
            g = c.isWindow ? c.scrollLeft : c.offset.left,
            h = a.left - b.collisionPosition.marginLeft,
            i = h - g,
            j = h + b.collisionWidth - f - g,
            k = "left" === b.my[0] ? -b.elemWidth : "right" === b.my[0] ? b.elemWidth : 0,
            l = "left" === b.at[0] ? b.targetWidth : "right" === b.at[0] ? -b.targetWidth : 0,
            m = -2 * b.offset[0];
          0 > i ? (n = a.left + k + l + m + b.collisionWidth - f - d, (0 > n || n < e(i)) && (a.left += k + l + m)) : j > 0 && (o = a.left - b.collisionPosition.marginLeft + k + l + m - g, (o > 0 || e(o) < j) && (a.left += k + l + m))
        },
        top: function(a, b) {
          var o, p, c = b.within,
            d = c.offset.top + c.scrollTop,
            f = c.height,
            g = c.isWindow ? c.scrollTop : c.offset.top,
            h = a.top - b.collisionPosition.marginTop,
            i = h - g,
            j = h + b.collisionHeight - f - g,
            k = "top" === b.my[1],
            l = k ? -b.elemHeight : "bottom" === b.my[1] ? b.elemHeight : 0,
            m = "top" === b.at[1] ? b.targetHeight : "bottom" === b.at[1] ? -b.targetHeight : 0,
            n = -2 * b.offset[1];
          0 > i ? (p = a.top + l + m + n + b.collisionHeight - f - d, a.top + l + m + n > i && (0 > p || p < e(i)) && (a.top += l + m + n)) : j > 0 && (o = a.top - b.collisionPosition.marginTop + l + m + n - g, a.top + l + m + n > j && (o > 0 || e(o) < j) && (a.top += l + m + n))
        }
      },
      flipfit: {
        left: function() {
          a.ui.position.flip.left.apply(this, arguments), a.ui.position.fit.left.apply(this, arguments)
        },
        top: function() {
          a.ui.position.flip.top.apply(this, arguments), a.ui.position.fit.top.apply(this, arguments)
        }
      }
    },
    function() {
      var b, c, d, e, f, g = document.getElementsByTagName("body")[0],
        h = document.createElement("div");
      b = document.createElement(g ? "div" : "body"), d = {
        visibility: "hidden",
        width: 0,
        height: 0,
        border: 0,
        margin: 0,
        background: "none"
      }, g && a.extend(d, {
        position: "absolute",
        left: "-1000px",
        top: "-1000px"
      });
      for (f in d) b.style[f] = d[f];
      b.appendChild(h), c = g || document.documentElement, c.insertBefore(b, c.firstChild), h.style.cssText = "position: absolute; left: 10.7432222px;", e = a(h).offset().left, a.support.offsetFractions = e > 10 && 11 > e, b.innerHTML = "", c.removeChild(b)
    }()
}(jQuery),
function(a, b) {
  a.widget("ui.progressbar", {
    version: "1.10.3",
    options: {
      max: 100,
      value: 0,
      change: null,
      complete: null
    },
    min: 0,
    _create: function() {
      this.oldValue = this.options.value = this._constrainedValue(), this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({
        role: "progressbar",
        "aria-valuemin": this.min
      }), this.valueDiv = a("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element), this._refreshValue()
    },
    _destroy: function() {
      this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.valueDiv.remove()
    },
    value: function(a) {
      return a === b ? this.options.value : (this.options.value = this._constrainedValue(a), this._refreshValue(), void 0)
    },
    _constrainedValue: function(a) {
      return a === b && (a = this.options.value), this.indeterminate = a === !1, "number" != typeof a && (a = 0), this.indeterminate ? !1 : Math.min(this.options.max, Math.max(this.min, a))
    },
    _setOptions: function(a) {
      var b = a.value;
      delete a.value, this._super(a), this.options.value = this._constrainedValue(b), this._refreshValue()
    },
    _setOption: function(a, b) {
      "max" === a && (b = Math.max(this.min, b)), this._super(a, b)
    },
    _percentage: function() {
      return this.indeterminate ? 100 : 100 * (this.options.value - this.min) / (this.options.max - this.min)
    },
    _refreshValue: function() {
      var b = this.options.value,
        c = this._percentage();
      this.valueDiv.toggle(this.indeterminate || b > this.min).toggleClass("ui-corner-right", b === this.options.max).width(c.toFixed(0) + "%"), this.element.toggleClass("ui-progressbar-indeterminate", this.indeterminate), this.indeterminate ? (this.element.removeAttr("aria-valuenow"), this.overlayDiv || (this.overlayDiv = a("<div class='ui-progressbar-overlay'></div>").appendTo(this.valueDiv))) : (this.element.attr({
        "aria-valuemax": this.options.max,
        "aria-valuenow": b
      }), this.overlayDiv && (this.overlayDiv.remove(), this.overlayDiv = null)), this.oldValue !== b && (this.oldValue = b, this._trigger("change")), b === this.options.max && this._trigger("complete")
    }
  })
}(jQuery),
function(a) {
  var c = 5;
  a.widget("ui.slider", a.ui.mouse, {
    version: "1.10.3",
    widgetEventPrefix: "slide",
    options: {
      animate: !1,
      distance: 0,
      max: 100,
      min: 0,
      orientation: "horizontal",
      range: !1,
      step: 1,
      value: 0,
      values: null,
      change: null,
      slide: null,
      start: null,
      stop: null
    },
    _create: function() {
      this._keySliding = !1, this._mouseSliding = !1, this._animateOff = !0, this._handleIndex = null, this._detectOrientation(), this._mouseInit(), this.element.addClass("ui-slider ui-slider-" + this.orientation + " ui-widget" + " ui-widget-content" + " ui-corner-all"), this._refresh(), this._setOption("disabled", this.options.disabled), this._animateOff = !1
    },
    _refresh: function() {
      this._createRange(), this._createHandles(), this._setupEvents(), this._refreshValue()
    },
    _createHandles: function() {
      var b, c, d = this.options,
        e = this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),
        f = "<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",
        g = [];
      for (c = d.values && d.values.length || 1, e.length > c && (e.slice(c).remove(), e = e.slice(0, c)), b = e.length; c > b; b++) g.push(f);
      this.handles = e.add(a(g.join("")).appendTo(this.element)), this.handle = this.handles.eq(0), this.handles.each(function(b) {
        a(this).data("ui-slider-handle-index", b)
      })
    },
    _createRange: function() {
      var b = this.options,
        c = "";
      b.range ? (b.range === !0 && (b.values ? b.values.length && 2 !== b.values.length ? b.values = [b.values[0], b.values[0]] : a.isArray(b.values) && (b.values = b.values.slice(0)) : b.values = [this._valueMin(), this._valueMin()]), this.range && this.range.length ? this.range.removeClass("ui-slider-range-min ui-slider-range-max").css({
        left: "",
        bottom: ""
      }) : (this.range = a("<div></div>").appendTo(this.element), c = "ui-slider-range ui-widget-header ui-corner-all"), this.range.addClass(c + ("min" === b.range || "max" === b.range ? " ui-slider-range-" + b.range : ""))) : this.range = a([])
    },
    _setupEvents: function() {
      var a = this.handles.add(this.range).filter("a");
      this._off(a), this._on(a, this._handleEvents), this._hoverable(a), this._focusable(a)
    },
    _destroy: function() {
      this.handles.remove(), this.range.remove(), this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-widget ui-widget-content ui-corner-all"), this._mouseDestroy()
    },
    _mouseCapture: function(b) {
      var c, d, e, f, g, h, i, j, k = this,
        l = this.options;
      return l.disabled ? !1 : (this.elementSize = {
        width: this.element.outerWidth(),
        height: this.element.outerHeight()
      }, this.elementOffset = this.element.offset(), c = {
        x: b.pageX,
        y: b.pageY
      }, d = this._normValueFromMouse(c), e = this._valueMax() - this._valueMin() + 1, this.handles.each(function(b) {
        var c = Math.abs(d - k.values(b));
        (e > c || e === c && (b === k._lastChangedValue || k.values(b) === l.min)) && (e = c, f = a(this), g = b)
      }), h = this._start(b, g), h === !1 ? !1 : (this._mouseSliding = !0, this._handleIndex = g, f.addClass("ui-state-active").focus(), i = f.offset(), j = !a(b.target).parents().addBack().is(".ui-slider-handle"), this._clickOffset = j ? {
        left: 0,
        top: 0
      } : {
        left: b.pageX - i.left - f.width() / 2,
        top: b.pageY - i.top - f.height() / 2 - (parseInt(f.css("borderTopWidth"), 10) || 0) - (parseInt(f.css("borderBottomWidth"), 10) || 0) + (parseInt(f.css("marginTop"), 10) || 0)
      }, this.handles.hasClass("ui-state-hover") || this._slide(b, g, d), this._animateOff = !0, !0))
    },
    _mouseStart: function() {
      return !0
    },
    _mouseDrag: function(a) {
      var b = {
          x: a.pageX,
          y: a.pageY
        },
        c = this._normValueFromMouse(b);
      return this._slide(a, this._handleIndex, c), !1
    },
    _mouseStop: function(a) {
      return this.handles.removeClass("ui-state-active"), this._mouseSliding = !1, this._stop(a, this._handleIndex), this._change(a, this._handleIndex), this._handleIndex = null, this._clickOffset = null, this._animateOff = !1, !1
    },
    _detectOrientation: function() {
      this.orientation = "vertical" === this.options.orientation ? "vertical" : "horizontal"
    },
    _normValueFromMouse: function(a) {
      var b, c, d, e, f;
      return "horizontal" === this.orientation ? (b = this.elementSize.width, c = a.x - this.elementOffset.left - (this._clickOffset ? this._clickOffset.left : 0)) : (b = this.elementSize.height, c = a.y - this.elementOffset.top - (this._clickOffset ? this._clickOffset.top : 0)), d = c / b, d > 1 && (d = 1), 0 > d && (d = 0), "vertical" === this.orientation && (d = 1 - d), e = this._valueMax() - this._valueMin(), f = this._valueMin() + d * e, this._trimAlignValue(f)
    },
    _start: function(a, b) {
      var c = {
        handle: this.handles[b],
        value: this.value()
      };
      return this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._trigger("start", a, c)
    },
    _slide: function(a, b, c) {
      var d, e, f;
      this.options.values && this.options.values.length ? (d = this.values(b ? 0 : 1), 2 === this.options.values.length && this.options.range === !0 && (0 === b && c > d || 1 === b && d > c) && (c = d), c !== this.values(b) && (e = this.values(), e[b] = c, f = this._trigger("slide", a, {
        handle: this.handles[b],
        value: c,
        values: e
      }), d = this.values(b ? 0 : 1), f !== !1 && this.values(b, c, !0))) : c !== this.value() && (f = this._trigger("slide", a, {
        handle: this.handles[b],
        value: c
      }), f !== !1 && this.value(c))
    },
    _stop: function(a, b) {
      var c = {
        handle: this.handles[b],
        value: this.value()
      };
      this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._trigger("stop", a, c)
    },
    _change: function(a, b) {
      if (!this._keySliding && !this._mouseSliding) {
        var c = {
          handle: this.handles[b],
          value: this.value()
        };
        this.options.values && this.options.values.length && (c.value = this.values(b), c.values = this.values()), this._lastChangedValue = b, this._trigger("change", a, c)
      }
    },
    value: function(a) {
      return arguments.length ? (this.options.value = this._trimAlignValue(a), this._refreshValue(), this._change(null, 0), void 0) : this._value()
    },
    values: function(b, c) {
      var d, e, f;
      if (arguments.length > 1) return this.options.values[b] = this._trimAlignValue(c), this._refreshValue(), this._change(null, b), void 0;
      if (!arguments.length) return this._values();
      if (!a.isArray(arguments[0])) return this.options.values && this.options.values.length ? this._values(b) : this.value();
      for (d = this.options.values, e = arguments[0], f = 0; f < d.length; f += 1) d[f] = this._trimAlignValue(e[f]), this._change(null, f);
      this._refreshValue()
    },
    _setOption: function(b, c) {
      var d, e = 0;
      switch ("range" === b && this.options.range === !0 && ("min" === c ? (this.options.value = this._values(0), this.options.values = null) : "max" === c && (this.options.value = this._values(this.options.values.length - 1), this.options.values = null)), a.isArray(this.options.values) && (e = this.options.values.length), a.Widget.prototype._setOption.apply(this, arguments), b) {
        case "orientation":
          this._detectOrientation(), this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-" + this.orientation), this._refreshValue();
          break;
        case "value":
          this._animateOff = !0, this._refreshValue(), this._change(null, 0), this._animateOff = !1;
          break;
        case "values":
          for (this._animateOff = !0, this._refreshValue(), d = 0; e > d; d += 1) this._change(null, d);
          this._animateOff = !1;
          break;
        case "min":
        case "max":
          this._animateOff = !0, this._refreshValue(), this._animateOff = !1;
          break;
        case "range":
          this._animateOff = !0, this._refresh(), this._animateOff = !1
      }
    },
    _value: function() {
      var a = this.options.value;
      return a = this._trimAlignValue(a)
    },
    _values: function(a) {
      var b, c, d;
      if (arguments.length) return b = this.options.values[a], b = this._trimAlignValue(b);
      if (this.options.values && this.options.values.length) {
        for (c = this.options.values.slice(), d = 0; d < c.length; d += 1) c[d] = this._trimAlignValue(c[d]);
        return c
      }
      return []
    },
    _trimAlignValue: function(a) {
      if (a <= this._valueMin()) return this._valueMin();
      if (a >= this._valueMax()) return this._valueMax();
      var b = this.options.step > 0 ? this.options.step : 1,
        c = (a - this._valueMin()) % b,
        d = a - c;
      return 2 * Math.abs(c) >= b && (d += c > 0 ? b : -b), parseFloat(d.toFixed(5))
    },
    _valueMin: function() {
      return this.options.min
    },
    _valueMax: function() {
      return this.options.max
    },
    _refreshValue: function() {
      var b, c, d, e, f, g = this.options.range,
        h = this.options,
        i = this,
        j = this._animateOff ? !1 : h.animate,
        k = {};
      this.options.values && this.options.values.length ? this.handles.each(function(d) {
        c = 100 * ((i.values(d) - i._valueMin()) / (i._valueMax() - i._valueMin())), k["horizontal" === i.orientation ? "left" : "bottom"] = c + "%", a(this).stop(1, 1)[j ? "animate" : "css"](k, h.animate), i.options.range === !0 && ("horizontal" === i.orientation ? (0 === d && i.range.stop(1, 1)[j ? "animate" : "css"]({
          left: c + "%"
        }, h.animate), 1 === d && i.range[j ? "animate" : "css"]({
          width: c - b + "%"
        }, {
          queue: !1,
          duration: h.animate
        })) : (0 === d && i.range.stop(1, 1)[j ? "animate" : "css"]({
          bottom: c + "%"
        }, h.animate), 1 === d && i.range[j ? "animate" : "css"]({
          height: c - b + "%"
        }, {
          queue: !1,
          duration: h.animate
        }))), b = c
      }) : (d = this.value(), e = this._valueMin(), f = this._valueMax(), c = f !== e ? 100 * ((d - e) / (f - e)) : 0, k["horizontal" === this.orientation ? "left" : "bottom"] = c + "%", this.handle.stop(1, 1)[j ? "animate" : "css"](k, h.animate), "min" === g && "horizontal" === this.orientation && this.range.stop(1, 1)[j ? "animate" : "css"]({
        width: c + "%"
      }, h.animate), "max" === g && "horizontal" === this.orientation && this.range[j ? "animate" : "css"]({
        width: 100 - c + "%"
      }, {
        queue: !1,
        duration: h.animate
      }), "min" === g && "vertical" === this.orientation && this.range.stop(1, 1)[j ? "animate" : "css"]({
        height: c + "%"
      }, h.animate), "max" === g && "vertical" === this.orientation && this.range[j ? "animate" : "css"]({
        height: 100 - c + "%"
      }, {
        queue: !1,
        duration: h.animate
      }))
    },
    _handleEvents: {
      keydown: function(b) {
        var d, e, f, g, h = a(b.target).data("ui-slider-handle-index");
        switch (b.keyCode) {
          case a.ui.keyCode.HOME:
          case a.ui.keyCode.END:
          case a.ui.keyCode.PAGE_UP:
          case a.ui.keyCode.PAGE_DOWN:
          case a.ui.keyCode.UP:
          case a.ui.keyCode.RIGHT:
          case a.ui.keyCode.DOWN:
          case a.ui.keyCode.LEFT:
            if (b.preventDefault(), !this._keySliding && (this._keySliding = !0, a(b.target).addClass("ui-state-active"), d = this._start(b, h), d === !1)) return
        }
        switch (g = this.options.step, e = f = this.options.values && this.options.values.length ? this.values(h) : this.value(), b.keyCode) {
          case a.ui.keyCode.HOME:
            f = this._valueMin();
            break;
          case a.ui.keyCode.END:
            f = this._valueMax();
            break;
          case a.ui.keyCode.PAGE_UP:
            f = this._trimAlignValue(e + (this._valueMax() - this._valueMin()) / c);
            break;
          case a.ui.keyCode.PAGE_DOWN:
            f = this._trimAlignValue(e - (this._valueMax() - this._valueMin()) / c);
            break;
          case a.ui.keyCode.UP:
          case a.ui.keyCode.RIGHT:
            if (e === this._valueMax()) return;
            f = this._trimAlignValue(e + g);
            break;
          case a.ui.keyCode.DOWN:
          case a.ui.keyCode.LEFT:
            if (e === this._valueMin()) return;
            f = this._trimAlignValue(e - g)
        }
        this._slide(b, h, f)
      },
      click: function(a) {
        a.preventDefault()
      },
      keyup: function(b) {
        var c = a(b.target).data("ui-slider-handle-index");
        this._keySliding && (this._keySliding = !1, this._stop(b, c), this._change(b, c), a(b.target).removeClass("ui-state-active"))
      }
    }
  })
}(jQuery),
function(a) {
  function b(a) {
    return function() {
      var b = this.element.val();
      a.apply(this, arguments), this._refresh(), b !== this.element.val() && this._trigger("change")
    }
  }
  a.widget("ui.spinner", {
    version: "1.10.3",
    defaultElement: "<input>",
    widgetEventPrefix: "spin",
    options: {
      culture: null,
      icons: {
        down: "ui-icon-triangle-1-s",
        up: "ui-icon-triangle-1-n"
      },
      incremental: !0,
      max: null,
      min: null,
      numberFormat: null,
      page: 10,
      step: 1,
      change: null,
      spin: null,
      start: null,
      stop: null
    },
    _create: function() {
      this._setOption("max", this.options.max), this._setOption("min", this.options.min), this._setOption("step", this.options.step), this._value(this.element.val(), !0), this._draw(), this._on(this._events), this._refresh(), this._on(this.window, {
        beforeunload: function() {
          this.element.removeAttr("autocomplete")
        }
      })
    },
    _getCreateOptions: function() {
      var b = {},
        c = this.element;
      return a.each(["min", "max", "step"], function(a, d) {
        var e = c.attr(d);
        void 0 !== e && e.length && (b[d] = e)
      }), b
    },
    _events: {
      keydown: function(a) {
        this._start(a) && this._keydown(a) && a.preventDefault()
      },
      keyup: "_stop",
      focus: function() {
        this.previous = this.element.val()
      },
      blur: function(a) {
        return this.cancelBlur ? (delete this.cancelBlur, void 0) : (this._stop(), this._refresh(), this.previous !== this.element.val() && this._trigger("change", a), void 0)
      },
      mousewheel: function(a, b) {
        if (b) {
          if (!this.spinning && !this._start(a)) return !1;
          this._spin((b > 0 ? 1 : -1) * this.options.step, a), clearTimeout(this.mousewheelTimer), this.mousewheelTimer = this._delay(function() {
            this.spinning && this._stop(a)
          }, 100), a.preventDefault()
        }
      },
      "mousedown .ui-spinner-button": function(b) {
        function d() {
          var a = this.element[0] === this.document[0].activeElement;
          a || (this.element.focus(), this.previous = c, this._delay(function() {
            this.previous = c
          }))
        }
        var c;
        c = this.element[0] === this.document[0].activeElement ? this.previous : this.element.val(), b.preventDefault(), d.call(this), this.cancelBlur = !0, this._delay(function() {
          delete this.cancelBlur, d.call(this)
        }), this._start(b) !== !1 && this._repeat(null, a(b.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, b)
      },
      "mouseup .ui-spinner-button": "_stop",
      "mouseenter .ui-spinner-button": function(b) {
        return a(b.currentTarget).hasClass("ui-state-active") ? this._start(b) === !1 ? !1 : (this._repeat(null, a(b.currentTarget).hasClass("ui-spinner-up") ? 1 : -1, b), void 0) : void 0
      },
      "mouseleave .ui-spinner-button": "_stop"
    },
    _draw: function() {
      var a = this.uiSpinner = this.element.addClass("ui-spinner-input").attr("autocomplete", "off").wrap(this._uiSpinnerHtml()).parent().append(this._buttonHtml());
      this.element.attr("role", "spinbutton"), this.buttons = a.find(".ui-spinner-button").attr("tabIndex", -1).button().removeClass("ui-corner-all"), this.buttons.height() > Math.ceil(.5 * a.height()) && a.height() > 0 && a.height(a.height()), this.options.disabled && this.disable()
    },
    _keydown: function(b) {
      var c = this.options,
        d = a.ui.keyCode;
      switch (b.keyCode) {
        case d.UP:
          return this._repeat(null, 1, b), !0;
        case d.DOWN:
          return this._repeat(null, -1, b), !0;
        case d.PAGE_UP:
          return this._repeat(null, c.page, b), !0;
        case d.PAGE_DOWN:
          return this._repeat(null, -c.page, b), !0
      }
      return !1
    },
    _uiSpinnerHtml: function() {
      return "<span class='ui-spinner ui-widget ui-widget-content ui-corner-all'></span>"
    },
    _buttonHtml: function() {
      return "<a class='ui-spinner-button ui-spinner-up ui-corner-tr'><span class='ui-icon " + this.options.icons.up + "'>&#9650;</span>" + "</a>" + "<a class='ui-spinner-button ui-spinner-down ui-corner-br'>" + "<span class='ui-icon " + this.options.icons.down + "'>&#9660;</span>" + "</a>"
    },
    _start: function(a) {
      return this.spinning || this._trigger("start", a) !== !1 ? (this.counter || (this.counter = 1), this.spinning = !0, !0) : !1
    },
    _repeat: function(a, b, c) {
      a = a || 500, clearTimeout(this.timer), this.timer = this._delay(function() {
        this._repeat(40, b, c)
      }, a), this._spin(b * this.options.step, c)
    },
    _spin: function(a, b) {
      var c = this.value() || 0;
      this.counter || (this.counter = 1), c = this._adjustValue(c + a * this._increment(this.counter)), this.spinning && this._trigger("spin", b, {
        value: c
      }) === !1 || (this._value(c), this.counter++)
    },
    _increment: function(b) {
      var c = this.options.incremental;
      return c ? a.isFunction(c) ? c(b) : Math.floor(b * b * b / 5e4 - b * b / 500 + 17 * b / 200 + 1) : 1
    },
    _precision: function() {
      var a = this._precisionOf(this.options.step);
      return null !== this.options.min && (a = Math.max(a, this._precisionOf(this.options.min))), a
    },
    _precisionOf: function(a) {
      var b = a.toString(),
        c = b.indexOf(".");
      return -1 === c ? 0 : b.length - c - 1
    },
    _adjustValue: function(a) {
      var b, c, d = this.options;
      return b = null !== d.min ? d.min : 0, c = a - b, c = Math.round(c / d.step) * d.step, a = b + c, a = parseFloat(a.toFixed(this._precision())), null !== d.max && a > d.max ? d.max : null !== d.min && a < d.min ? d.min : a
    },
    _stop: function(a) {
      this.spinning && (clearTimeout(this.timer), clearTimeout(this.mousewheelTimer), this.counter = 0, this.spinning = !1, this._trigger("stop", a))
    },
    _setOption: function(a, b) {
      if ("culture" === a || "numberFormat" === a) {
        var c = this._parse(this.element.val());
        return this.options[a] = b, this.element.val(this._format(c)), void 0
      }("max" === a || "min" === a || "step" === a) && "string" == typeof b && (b = this._parse(b)), "icons" === a && (this.buttons.first().find(".ui-icon").removeClass(this.options.icons.up).addClass(b.up), this.buttons.last().find(".ui-icon").removeClass(this.options.icons.down).addClass(b.down)), this._super(a, b), "disabled" === a && (b ? (this.element.prop("disabled", !0), this.buttons.button("disable")) : (this.element.prop("disabled", !1), this.buttons.button("enable")))
    },
    _setOptions: b(function(a) {
      this._super(a), this._value(this.element.val())
    }),
    _parse: function(a) {
      return "string" == typeof a && "" !== a && (a = window.Globalize && this.options.numberFormat ? Globalize.parseFloat(a, 10, this.options.culture) : +a), "" === a || isNaN(a) ? null : a
    },
    _format: function(a) {
      return "" === a ? "" : window.Globalize && this.options.numberFormat ? Globalize.format(a, this.options.numberFormat, this.options.culture) : a
    },
    _refresh: function() {
      this.element.attr({
        "aria-valuemin": this.options.min,
        "aria-valuemax": this.options.max,
        "aria-valuenow": this._parse(this.element.val())
      })
    },
    _value: function(a, b) {
      var c;
      "" !== a && (c = this._parse(a), null !== c && (b || (c = this._adjustValue(c)), a = this._format(c))), this.element.val(a), this._refresh()
    },
    _destroy: function() {
      this.element.removeClass("ui-spinner-input").prop("disabled", !1).removeAttr("autocomplete").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"), this.uiSpinner.replaceWith(this.element)
    },
    stepUp: b(function(a) {
      this._stepUp(a)
    }),
    _stepUp: function(a) {
      this._start() && (this._spin((a || 1) * this.options.step), this._stop())
    },
    stepDown: b(function(a) {
      this._stepDown(a)
    }),
    _stepDown: function(a) {
      this._start() && (this._spin((a || 1) * -this.options.step), this._stop())
    },
    pageUp: b(function(a) {
      this._stepUp((a || 1) * this.options.page)
    }),
    pageDown: b(function(a) {
      this._stepDown((a || 1) * this.options.page)
    }),
    value: function(a) {
      return arguments.length ? (b(this._value).call(this, a), void 0) : this._parse(this.element.val())
    },
    widget: function() {
      return this.uiSpinner
    }
  })
}(jQuery),
function(a, b) {
  function e() {
    return ++c
  }

  function f(a) {
    return a.hash.length > 1 && decodeURIComponent(a.href.replace(d, "")) === decodeURIComponent(location.href.replace(d, ""))
  }
  var c = 0,
    d = /#.*$/;
  a.widget("ui.tabs", {
    version: "1.10.3",
    delay: 300,
    options: {
      active: null,
      collapsible: !1,
      event: "click",
      heightStyle: "content",
      hide: null,
      show: null,
      activate: null,
      beforeActivate: null,
      beforeLoad: null,
      load: null
    },
    _create: function() {
      var b = this,
        c = this.options;
      this.running = !1, this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all").toggleClass("ui-tabs-collapsible", c.collapsible).delegate(".ui-tabs-nav > li", "mousedown" + this.eventNamespace, function(b) {
        a(this).is(".ui-state-disabled") && b.preventDefault()
      }).delegate(".ui-tabs-anchor", "focus" + this.eventNamespace, function() {
        a(this).closest("li").is(".ui-state-disabled") && this.blur()
      }), this._processTabs(), c.active = this._initialActive(), a.isArray(c.disabled) && (c.disabled = a.unique(c.disabled.concat(a.map(this.tabs.filter(".ui-state-disabled"), function(a) {
        return b.tabs.index(a)
      }))).sort()), this.active = this.options.active !== !1 && this.anchors.length ? this._findActive(c.active) : a(), this._refresh(), this.active.length && this.load(c.active)
    },
    _initialActive: function() {
      var b = this.options.active,
        c = this.options.collapsible,
        d = location.hash.substring(1);
      return null === b && (d && this.tabs.each(function(c, e) {
        return a(e).attr("aria-controls") === d ? (b = c, !1) : void 0
      }), null === b && (b = this.tabs.index(this.tabs.filter(".ui-tabs-active"))), (null === b || -1 === b) && (b = this.tabs.length ? 0 : !1)), b !== !1 && (b = this.tabs.index(this.tabs.eq(b)), -1 === b && (b = c ? !1 : 0)), !c && b === !1 && this.anchors.length && (b = 0), b
    },
    _getCreateEventData: function() {
      return {
        tab: this.active,
        panel: this.active.length ? this._getPanelForTab(this.active) : a()
      }
    },
    _tabKeydown: function(b) {
      var c = a(this.document[0].activeElement).closest("li"),
        d = this.tabs.index(c),
        e = !0;
      if (!this._handlePageNav(b)) {
        switch (b.keyCode) {
          case a.ui.keyCode.RIGHT:
          case a.ui.keyCode.DOWN:
            d++;
            break;
          case a.ui.keyCode.UP:
          case a.ui.keyCode.LEFT:
            e = !1, d--;
            break;
          case a.ui.keyCode.END:
            d = this.anchors.length - 1;
            break;
          case a.ui.keyCode.HOME:
            d = 0;
            break;
          case a.ui.keyCode.SPACE:
            return b.preventDefault(), clearTimeout(this.activating), this._activate(d), void 0;
          case a.ui.keyCode.ENTER:
            return b.preventDefault(), clearTimeout(this.activating), this._activate(d === this.options.active ? !1 : d), void 0;
          default:
            return
        }
        b.preventDefault(), clearTimeout(this.activating), d = this._focusNextTab(d, e), b.ctrlKey || (c.attr("aria-selected", "false"), this.tabs.eq(d).attr("aria-selected", "true"), this.activating = this._delay(function() {
          this.option("active", d)
        }, this.delay))
      }
    },
    _panelKeydown: function(b) {
      this._handlePageNav(b) || b.ctrlKey && b.keyCode === a.ui.keyCode.UP && (b.preventDefault(), this.active.focus())
    },
    _handlePageNav: function(b) {
      return b.altKey && b.keyCode === a.ui.keyCode.PAGE_UP ? (this._activate(this._focusNextTab(this.options.active - 1, !1)), !0) : b.altKey && b.keyCode === a.ui.keyCode.PAGE_DOWN ? (this._activate(this._focusNextTab(this.options.active + 1, !0)), !0) : void 0
    },
    _findNextTab: function(b, c) {
      function e() {
        return b > d && (b = 0), 0 > b && (b = d), b
      }
      for (var d = this.tabs.length - 1; - 1 !== a.inArray(e(), this.options.disabled);) b = c ? b + 1 : b - 1;
      return b
    },
    _focusNextTab: function(a, b) {
      return a = this._findNextTab(a, b), this.tabs.eq(a).focus(), a
    },
    _setOption: function(a, b) {
      return "active" === a ? (this._activate(b), void 0) : "disabled" === a ? (this._setupDisabled(b), void 0) : (this._super(a, b), "collapsible" === a && (this.element.toggleClass("ui-tabs-collapsible", b), b || this.options.active !== !1 || this._activate(0)), "event" === a && this._setupEvents(b), "heightStyle" === a && this._setupHeightStyle(b), void 0)
    },
    _tabId: function(a) {
      return a.attr("aria-controls") || "ui-tabs-" + e()
    },
    _sanitizeSelector: function(a) {
      return a ? a.replace(/[!"$%&'()*+,.\/:;<=>?@\[\]\^`{|}~]/g, "\\$&") : ""
    },
    refresh: function() {
      var b = this.options,
        c = this.tablist.children(":has(a[href])");
      b.disabled = a.map(c.filter(".ui-state-disabled"), function(a) {
        return c.index(a)
      }), this._processTabs(), b.active !== !1 && this.anchors.length ? this.active.length && !a.contains(this.tablist[0], this.active[0]) ? this.tabs.length === b.disabled.length ? (b.active = !1, this.active = a()) : this._activate(this._findNextTab(Math.max(0, b.active - 1), !1)) : b.active = this.tabs.index(this.active) : (b.active = !1, this.active = a()), this._refresh()
    },
    _refresh: function() {
      this._setupDisabled(this.options.disabled), this._setupEvents(this.options.event), this._setupHeightStyle(this.options.heightStyle), this.tabs.not(this.active).attr({
        "aria-selected": "false",
        tabIndex: -1
      }), this.panels.not(this._getPanelForTab(this.active)).hide().attr({
        "aria-expanded": "false",
        "aria-hidden": "true"
      }), this.active.length ? (this.active.addClass("ui-tabs-active ui-state-active").attr({
        "aria-selected": "true",
        tabIndex: 0
      }), this._getPanelForTab(this.active).show().attr({
        "aria-expanded": "true",
        "aria-hidden": "false"
      })) : this.tabs.eq(0).attr("tabIndex", 0)
    },
    _processTabs: function() {
      var b = this;
      this.tablist = this._getList().addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").attr("role", "tablist"), this.tabs = this.tablist.find("> li:has(a[href])").addClass("ui-state-default ui-corner-top").attr({
        role: "tab",
        tabIndex: -1
      }), this.anchors = this.tabs.map(function() {
        return a("a", this)[0]
      }).addClass("ui-tabs-anchor").attr({
        role: "presentation",
        tabIndex: -1
      }), this.panels = a(), this.anchors.each(function(c, d) {
        var e, g, h, i = a(d).uniqueId().attr("id"),
          j = a(d).closest("li"),
          k = j.attr("aria-controls");
        f(d) ? (e = d.hash, g = b.element.find(b._sanitizeSelector(e))) : (h = b._tabId(j), e = "#" + h, g = b.element.find(e), g.length || (g = b._createPanel(h), g.insertAfter(b.panels[c - 1] || b.tablist)), g.attr("aria-live", "polite")), g.length && (b.panels = b.panels.add(g)), k && j.data("ui-tabs-aria-controls", k), j.attr({
          "aria-controls": e.substring(1),
          "aria-labelledby": i
        }), g.attr("aria-labelledby", i)
      }), this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").attr("role", "tabpanel")
    },
    _getList: function() {
      return this.element.find("ol,ul").eq(0)
    },
    _createPanel: function(b) {
      return a("<div>").attr("id", b).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").data("ui-tabs-destroy", !0)
    },
    _setupDisabled: function(b) {
      a.isArray(b) && (b.length ? b.length === this.anchors.length && (b = !0) : b = !1);
      for (var d, c = 0; d = this.tabs[c]; c++) b === !0 || -1 !== a.inArray(c, b) ? a(d).addClass("ui-state-disabled").attr("aria-disabled", "true") : a(d).removeClass("ui-state-disabled").removeAttr("aria-disabled");
      this.options.disabled = b
    },
    _setupEvents: function(b) {
      var c = {
        click: function(a) {
          a.preventDefault()
        }
      };
      b && a.each(b.split(" "), function(a, b) {
        c[b] = "_eventHandler"
      }), this._off(this.anchors.add(this.tabs).add(this.panels)), this._on(this.anchors, c), this._on(this.tabs, {
        keydown: "_tabKeydown"
      }), this._on(this.panels, {
        keydown: "_panelKeydown"
      }), this._focusable(this.tabs), this._hoverable(this.tabs)
    },
    _setupHeightStyle: function(b) {
      var c, d = this.element.parent();
      "fill" === b ? (c = d.height(), c -= this.element.outerHeight() - this.element.height(), this.element.siblings(":visible").each(function() {
        var b = a(this),
          d = b.css("position");
        "absolute" !== d && "fixed" !== d && (c -= b.outerHeight(!0))
      }), this.element.children().not(this.panels).each(function() {
        c -= a(this).outerHeight(!0)
      }), this.panels.each(function() {
        a(this).height(Math.max(0, c - a(this).innerHeight() + a(this).height()))
      }).css("overflow", "auto")) : "auto" === b && (c = 0, this.panels.each(function() {
        c = Math.max(c, a(this).height("").height())
      }).height(c))
    },
    _eventHandler: function(b) {
      var c = this.options,
        d = this.active,
        e = a(b.currentTarget),
        f = e.closest("li"),
        g = f[0] === d[0],
        h = g && c.collapsible,
        i = h ? a() : this._getPanelForTab(f),
        j = d.length ? this._getPanelForTab(d) : a(),
        k = {
          oldTab: d,
          oldPanel: j,
          newTab: h ? a() : f,
          newPanel: i
        };
      b.preventDefault(), f.hasClass("ui-state-disabled") || f.hasClass("ui-tabs-loading") || this.running || g && !c.collapsible || this._trigger("beforeActivate", b, k) === !1 || (c.active = h ? !1 : this.tabs.index(f), this.active = g ? a() : f, this.xhr && this.xhr.abort(), j.length || i.length || a.error("jQuery UI Tabs: Mismatching fragment identifier."), i.length && this.load(this.tabs.index(f), b), this._toggle(b, k))
    },
    _toggle: function(b, c) {
      function g() {
        d.running = !1, d._trigger("activate", b, c)
      }

      function h() {
        c.newTab.closest("li").addClass("ui-tabs-active ui-state-active"), e.length && d.options.show ? d._show(e, d.options.show, g) : (e.show(), g())
      }
      var d = this,
        e = c.newPanel,
        f = c.oldPanel;
      this.running = !0, f.length && this.options.hide ? this._hide(f, this.options.hide, function() {
        c.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), h()
      }) : (c.oldTab.closest("li").removeClass("ui-tabs-active ui-state-active"), f.hide(), h()), f.attr({
        "aria-expanded": "false",
        "aria-hidden": "true"
      }), c.oldTab.attr("aria-selected", "false"), e.length && f.length ? c.oldTab.attr("tabIndex", -1) : e.length && this.tabs.filter(function() {
        return 0 === a(this).attr("tabIndex")
      }).attr("tabIndex", -1), e.attr({
        "aria-expanded": "true",
        "aria-hidden": "false"
      }), c.newTab.attr({
        "aria-selected": "true",
        tabIndex: 0
      })
    },
    _activate: function(b) {
      var c, d = this._findActive(b);
      d[0] !== this.active[0] && (d.length || (d = this.active), c = d.find(".ui-tabs-anchor")[0], this._eventHandler({
        target: c,
        currentTarget: c,
        preventDefault: a.noop
      }))
    },
    _findActive: function(b) {
      return b === !1 ? a() : this.tabs.eq(b)
    },
    _getIndex: function(a) {
      return "string" == typeof a && (a = this.anchors.index(this.anchors.filter("[href$='" + a + "']"))), a
    },
    _destroy: function() {
      this.xhr && this.xhr.abort(), this.element.removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible"), this.tablist.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all").removeAttr("role"), this.anchors.removeClass("ui-tabs-anchor").removeAttr("role").removeAttr("tabIndex").removeUniqueId(), this.tabs.add(this.panels).each(function() {
        a.data(this, "ui-tabs-destroy") ? a(this).remove() : a(this).removeClass("ui-state-default ui-state-active ui-state-disabled ui-corner-top ui-corner-bottom ui-widget-content ui-tabs-active ui-tabs-panel").removeAttr("tabIndex").removeAttr("aria-live").removeAttr("aria-busy").removeAttr("aria-selected").removeAttr("aria-labelledby").removeAttr("aria-hidden").removeAttr("aria-expanded").removeAttr("role")
      }), this.tabs.each(function() {
        var b = a(this),
          c = b.data("ui-tabs-aria-controls");
        c ? b.attr("aria-controls", c).removeData("ui-tabs-aria-controls") : b.removeAttr("aria-controls")
      }), this.panels.show(), "content" !== this.options.heightStyle && this.panels.css("height", "")
    },
    enable: function(c) {
      var d = this.options.disabled;
      d !== !1 && (c === b ? d = !1 : (c = this._getIndex(c), d = a.isArray(d) ? a.map(d, function(a) {
        return a !== c ? a : null
      }) : a.map(this.tabs, function(a, b) {
        return b !== c ? b : null
      })), this._setupDisabled(d))
    },
    disable: function(c) {
      var d = this.options.disabled;
      if (d !== !0) {
        if (c === b) d = !0;
        else {
          if (c = this._getIndex(c), -1 !== a.inArray(c, d)) return;
          d = a.isArray(d) ? a.merge([c], d).sort() : [c]
        }
        this._setupDisabled(d)
      }
    },
    load: function(b, c) {
      b = this._getIndex(b);
      var d = this,
        e = this.tabs.eq(b),
        g = e.find(".ui-tabs-anchor"),
        h = this._getPanelForTab(e),
        i = {
          tab: e,
          panel: h
        };
      f(g[0]) || (this.xhr = a.ajax(this._ajaxSettings(g, c, i)), this.xhr && "canceled" !== this.xhr.statusText && (e.addClass("ui-tabs-loading"), h.attr("aria-busy", "true"), this.xhr.success(function(a) {
        setTimeout(function() {
          h.html(a), d._trigger("load", c, i)
        }, 1)
      }).complete(function(a, b) {
        setTimeout(function() {
          "abort" === b && d.panels.stop(!1, !0), e.removeClass("ui-tabs-loading"), h.removeAttr("aria-busy"), a === d.xhr && delete d.xhr
        }, 1)
      })))
    },
    _ajaxSettings: function(b, c, d) {
      var e = this;
      return {
        url: b.attr("href"),
        beforeSend: function(b, f) {
          return e._trigger("beforeLoad", c, a.extend({
            jqXHR: b,
            ajaxSettings: f
          }, d))
        }
      }
    },
    _getPanelForTab: function(b) {
      var c = a(b).attr("aria-controls");
      return this.element.find(this._sanitizeSelector("#" + c))
    }
  })
}(jQuery),
function(a) {
  function c(b, c) {
    var d = (b.attr("aria-describedby") || "").split(/\s+/);
    d.push(c), b.data("ui-tooltip-id", c).attr("aria-describedby", a.trim(d.join(" ")))
  }

  function d(b) {
    var c = b.data("ui-tooltip-id"),
      d = (b.attr("aria-describedby") || "").split(/\s+/),
      e = a.inArray(c, d); - 1 !== e && d.splice(e, 1), b.removeData("ui-tooltip-id"), d = a.trim(d.join(" ")), d ? b.attr("aria-describedby", d) : b.removeAttr("aria-describedby")
  }
  var b = 0;
  a.widget("ui.tooltip", {
    version: "1.10.3",
    options: {
      content: function() {
        var b = a(this).attr("title") || "";
        return a("<a>").text(b).html()
      },
      hide: !0,
      items: "[title]:not([disabled])",
      position: {
        my: "left top+15",
        at: "left bottom",
        collision: "flipfit flip"
      },
      show: !0,
      tooltipClass: null,
      track: !1,
      close: null,
      open: null
    },
    _create: function() {
      this._on({
        mouseover: "open",
        focusin: "open"
      }), this.tooltips = {}, this.parents = {}, this.options.disabled && this._disable()
    },
    _setOption: function(b, c) {
      var d = this;
      return "disabled" === b ? (this[c ? "_disable" : "_enable"](), this.options[b] = c, void 0) : (this._super(b, c), "content" === b && a.each(this.tooltips, function(a, b) {
        d._updateContent(b)
      }), void 0)
    },
    _disable: function() {
      var b = this;
      a.each(this.tooltips, function(c, d) {
        var e = a.Event("blur");
        e.target = e.currentTarget = d[0], b.close(e, !0)
      }), this.element.find(this.options.items).addBack().each(function() {
        var b = a(this);
        b.is("[title]") && b.data("ui-tooltip-title", b.attr("title")).attr("title", "")
      })
    },
    _enable: function() {
      this.element.find(this.options.items).addBack().each(function() {
        var b = a(this);
        b.data("ui-tooltip-title") && b.attr("title", b.data("ui-tooltip-title"))
      })
    },
    open: function(b) {
      var c = this,
        d = a(b ? b.target : this.element).closest(this.options.items);
      d.length && !d.data("ui-tooltip-id") && (d.attr("title") && d.data("ui-tooltip-title", d.attr("title")), d.data("ui-tooltip-open", !0), b && "mouseover" === b.type && d.parents().each(function() {
        var d, b = a(this);
        b.data("ui-tooltip-open") && (d = a.Event("blur"), d.target = d.currentTarget = this, c.close(d, !0)), b.attr("title") && (b.uniqueId(), c.parents[this.id] = {
          element: this,
          title: b.attr("title")
        }, b.attr("title", ""))
      }), this._updateContent(d, b))
    },
    _updateContent: function(a, b) {
      var c, d = this.options.content,
        e = this,
        f = b ? b.type : null;
      return "string" == typeof d ? this._open(b, a, d) : (c = d.call(a[0], function(c) {
        a.data("ui-tooltip-open") && e._delay(function() {
          b && (b.type = f), this._open(b, a, c)
        })
      }), c && this._open(b, a, c), void 0)
    },
    _open: function(b, d, e) {
      function j(a) {
        i.of = a, f.is(":hidden") || f.position(i)
      }
      var f, g, h, i = a.extend({}, this.options.position);
      if (e) {
        if (f = this._find(d), f.length) return f.find(".ui-tooltip-content").html(e), void 0;
        d.is("[title]") && (b && "mouseover" === b.type ? d.attr("title", "") : d.removeAttr("title")), f = this._tooltip(d), c(d, f.attr("id")), f.find(".ui-tooltip-content").html(e), this.options.track && b && /^mouse/.test(b.type) ? (this._on(this.document, {
          mousemove: j
        }), j(b)) : f.position(a.extend({
          of: d
        }, this.options.position)), f.hide(), this._show(f, this.options.show), this.options.show && this.options.show.delay && (h = this.delayedShow = setInterval(function() {
          f.is(":visible") && (j(i.of), clearInterval(h))
        }, a.fx.interval)), this._trigger("open", b, {
          tooltip: f
        }), g = {
          keyup: function(b) {
            if (b.keyCode === a.ui.keyCode.ESCAPE) {
              var c = a.Event(b);
              c.currentTarget = d[0], this.close(c, !0)
            }
          },
          remove: function() {
            this._removeTooltip(f)
          }
        }, b && "mouseover" !== b.type || (g.mouseleave = "close"), b && "focusin" !== b.type || (g.focusout = "close"), this._on(!0, d, g)
      }
    },
    close: function(b) {
      var c = this,
        e = a(b ? b.currentTarget : this.element),
        f = this._find(e);
      this.closing || (clearInterval(this.delayedShow), e.data("ui-tooltip-title") && e.attr("title", e.data("ui-tooltip-title")), d(e), f.stop(!0), this._hide(f, this.options.hide, function() {
        c._removeTooltip(a(this))
      }), e.removeData("ui-tooltip-open"), this._off(e, "mouseleave focusout keyup"), e[0] !== this.element[0] && this._off(e, "remove"), this._off(this.document, "mousemove"), b && "mouseleave" === b.type && a.each(this.parents, function(b, d) {
        a(d.element).attr("title", d.title), delete c.parents[b]
      }), this.closing = !0, this._trigger("close", b, {
        tooltip: f
      }), this.closing = !1)
    },
    _tooltip: function(c) {
      var d = "ui-tooltip-" + b++,
        e = a("<div>").attr({
          id: d,
          role: "tooltip"
        }).addClass("ui-tooltip ui-widget ui-corner-all ui-widget-content " + (this.options.tooltipClass || ""));
      return a("<div>").addClass("ui-tooltip-content").appendTo(e), e.appendTo(this.document[0].body), this.tooltips[d] = c, e
    },
    _find: function(b) {
      var c = b.data("ui-tooltip-id");
      return c ? a("#" + c) : a()
    },
    _removeTooltip: function(a) {
      a.remove(), delete this.tooltips[a.attr("id")]
    },
    _destroy: function() {
      var b = this;
      a.each(this.tooltips, function(c, d) {
        var e = a.Event("blur");
        e.target = e.currentTarget = d[0], b.close(e, !0), a("#" + c).remove(), d.data("ui-tooltip-title") && (d.attr("title", d.data("ui-tooltip-title")), d.removeData("ui-tooltip-title"))
      })
    }
  })
}(jQuery),
function(a, b, c, d) {
  "use strict";
  var e = c("html"),
    f = c(a),
    g = c(b),
    h = c.fancybox = function() {
      h.open.apply(this, arguments)
    },
    i = navigator.userAgent.match(/msie/i),
    j = null,
    k = b.createTouch !== d,
    l = function(a) {
      return a && a.hasOwnProperty && a instanceof c
    },
    m = function(a) {
      return a && "string" === c.type(a)
    },
    n = function(a) {
      return m(a) && a.indexOf("%") > 0
    },
    o = function(a) {
      return a && !(a.style.overflow && "hidden" === a.style.overflow) && (a.clientWidth && a.scrollWidth > a.clientWidth || a.clientHeight && a.scrollHeight > a.clientHeight)
    },
    p = function(a, b) {
      var c = parseInt(a, 10) || 0;
      return b && n(a) && (c = h.getViewport()[b] / 100 * c), Math.ceil(c)
    },
    q = function(a, b) {
      return p(a, b) + "px"
    };
  c.extend(h, {
    version: "2.1.5",
    defaults: {
      padding: 15,
      margin: 20,
      width: 800,
      height: 600,
      minWidth: 100,
      minHeight: 100,
      maxWidth: 9999,
      maxHeight: 9999,
      pixelRatio: 1,
      autoSize: !0,
      autoHeight: !1,
      autoWidth: !1,
      autoResize: !0,
      autoCenter: !k,
      fitToView: !0,
      aspectRatio: !1,
      topRatio: .5,
      leftRatio: .5,
      scrolling: "auto",
      wrapCSS: "",
      arrows: !0,
      closeBtn: !0,
      closeClick: !1,
      nextClick: !1,
      mouseWheel: !0,
      autoPlay: !1,
      playSpeed: 3e3,
      preload: 3,
      modal: !1,
      loop: !0,
      ajax: {
        dataType: "html",
        headers: {
          "X-fancyBox": !0
        }
      },
      iframe: {
        scrolling: "auto",
        preload: !0
      },
      swf: {
        wmode: "transparent",
        allowfullscreen: "true",
        allowscriptaccess: "always"
      },
      keys: {
        next: {
          13: "left",
          34: "up",
          39: "left",
          40: "up"
        },
        prev: {
          8: "right",
          33: "down",
          37: "right",
          38: "down"
        },
        close: [27],
        play: [32],
        toggle: [70]
      },
      direction: {
        next: "left",
        prev: "right"
      },
      scrollOutside: !0,
      index: 0,
      type: null,
      href: null,
      content: null,
      title: null,
      tpl: {
        wrap: '<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',
        image: '<img class="fancybox-image" src="{href}" alt="" />',
        iframe: '<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen' + (i ? ' allowtransparency="true"' : "") + "></iframe>",
        error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
        closeBtn: '<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',
        next: '<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',
        prev: '<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'
      },
      openEffect: "fade",
      openSpeed: 250,
      openEasing: "swing",
      openOpacity: !0,
      openMethod: "zoomIn",
      closeEffect: "fade",
      closeSpeed: 250,
      closeEasing: "swing",
      closeOpacity: !0,
      closeMethod: "zoomOut",
      nextEffect: "elastic",
      nextSpeed: 250,
      nextEasing: "swing",
      nextMethod: "changeIn",
      prevEffect: "elastic",
      prevSpeed: 250,
      prevEasing: "swing",
      prevMethod: "changeOut",
      helpers: {
        overlay: !0,
        title: !0
      },
      onCancel: c.noop,
      beforeLoad: c.noop,
      afterLoad: c.noop,
      beforeShow: c.noop,
      afterShow: c.noop,
      beforeChange: c.noop,
      beforeClose: c.noop,
      afterClose: c.noop
    },
    group: {},
    opts: {},
    previous: null,
    coming: null,
    current: null,
    isActive: !1,
    isOpen: !1,
    isOpened: !1,
    wrap: null,
    skin: null,
    outer: null,
    inner: null,
    player: {
      timer: null,
      isActive: !1
    },
    ajaxLoad: null,
    imgPreload: null,
    transitions: {},
    helpers: {},
    open: function(a, b) {
      return a && (c.isPlainObject(b) || (b = {}), !1 !== h.close(!0)) ? (c.isArray(a) || (a = l(a) ? c(a).get() : [a]), c.each(a, function(e, f) {
        var i, j, k, n, o, p, q, g = {};
        "object" === c.type(f) && (f.nodeType && (f = c(f)), l(f) ? (g = {
          href: f.data("fancybox-href") || f.attr("href"),
          title: f.data("fancybox-title") || f.attr("title"),
          isDom: !0,
          element: f
        }, c.metadata && c.extend(!0, g, f.metadata())) : g = f), i = b.href || g.href || (m(f) ? f : null), j = b.title !== d ? b.title : g.title || "", k = b.content || g.content, n = k ? "html" : b.type || g.type, !n && g.isDom && (n = f.data("fancybox-type"), n || (o = f.prop("class").match(/fancybox\.(\w+)/), n = o ? o[1] : null)), m(i) && (n || (h.isImage(i) ? n = "image" : h.isSWF(i) ? n = "swf" : "#" === i.charAt(0) ? n = "inline" : m(f) && (n = "html", k = f)), "ajax" === n && (p = i.split(/\s+/, 2), i = p.shift(), q = p.shift())), k || ("inline" === n ? i ? k = c(m(i) ? i.replace(/.*(?=#[^\s]+$)/, "") : i) : g.isDom && (k = f) : "html" === n ? k = i : n || i || !g.isDom || (n = "inline", k = f)), c.extend(g, {
          href: i,
          type: n,
          content: k,
          title: j,
          selector: q
        }), a[e] = g
      }), h.opts = c.extend(!0, {}, h.defaults, b), b.keys !== d && (h.opts.keys = b.keys ? c.extend({}, h.defaults.keys, b.keys) : !1), h.group = a, h._start(h.opts.index)) : void 0
    },
    cancel: function() {
      var a = h.coming;
      a && !1 !== h.trigger("onCancel") && (h.hideLoading(), h.ajaxLoad && h.ajaxLoad.abort(), h.ajaxLoad = null, h.imgPreload && (h.imgPreload.onload = h.imgPreload.onerror = null), a.wrap && a.wrap.stop(!0, !0).trigger("onReset").remove(), h.coming = null, h.current || h._afterZoomOut(a))
    },
    close: function(a) {
      h.cancel(), !1 !== h.trigger("beforeClose") && (h.unbindEvents(), h.isActive && (h.isOpen && a !== !0 ? (h.isOpen = h.isOpened = !1, h.isClosing = !0, c(".fancybox-item, .fancybox-nav").remove(), h.wrap.stop(!0, !0).removeClass("fancybox-opened"), h.transitions[h.current.closeMethod]()) : (c(".fancybox-wrap").stop(!0).trigger("onReset").remove(), h._afterZoomOut())))
    },
    play: function(a) {
      var b = function() {
          clearTimeout(h.player.timer)
        },
        c = function() {
          b(), h.current && h.player.isActive && (h.player.timer = setTimeout(h.next, h.current.playSpeed))
        },
        d = function() {
          b(), g.unbind(".player"), h.player.isActive = !1, h.trigger("onPlayEnd")
        },
        e = function() {
          h.current && (h.current.loop || h.current.index < h.group.length - 1) && (h.player.isActive = !0, g.bind({
            "onCancel.player beforeClose.player": d,
            "onUpdate.player": c,
            "beforeLoad.player": b
          }), c(), h.trigger("onPlayStart"))
        };
      a === !0 || !h.player.isActive && a !== !1 ? e() : d()
    },
    next: function(a) {
      var b = h.current;
      b && (m(a) || (a = b.direction.next), h.jumpto(b.index + 1, a, "next"))
    },
    prev: function(a) {
      var b = h.current;
      b && (m(a) || (a = b.direction.prev), h.jumpto(b.index - 1, a, "prev"))
    },
    jumpto: function(a, b, c) {
      var e = h.current;
      e && (a = p(a), h.direction = b || e.direction[a >= e.index ? "next" : "prev"], h.router = c || "jumpto", e.loop && (0 > a && (a = e.group.length + a % e.group.length), a %= e.group.length), e.group[a] !== d && (h.cancel(), h._start(a)))
    },
    reposition: function(a, b) {
      var f, d = h.current,
        e = d ? d.wrap : null;
      e && (f = h._getPosition(b), a && "scroll" === a.type ? (delete f.position, e.stop(!0, !0).animate(f, 200)) : (e.css(f), d.pos = c.extend({}, d.dim, f)))
    },
    update: function(a) {
      var b = a && a.type,
        c = !b || "orientationchange" === b;
      c && (clearTimeout(j), j = null), h.isOpen && !j && (j = setTimeout(function() {
        var d = h.current;
        d && !h.isClosing && (h.wrap.removeClass("fancybox-tmp"), (c || "load" === b || "resize" === b && d.autoResize) && h._setDimension(), "scroll" === b && d.canShrink || h.reposition(a), h.trigger("onUpdate"), j = null)
      }, c && !k ? 0 : 300))
    },
    toggle: function(a) {
      h.isOpen && (h.current.fitToView = "boolean" === c.type(a) ? a : !h.current.fitToView, k && (h.wrap.removeAttr("style").addClass("fancybox-tmp"), h.trigger("onUpdate")), h.update())
    },
    hideLoading: function() {
      g.unbind(".loading"), c("#fancybox-loading").remove()
    },
    showLoading: function() {
      var a, b;
      h.hideLoading(), a = c('<div id="fancybox-loading"><div></div></div>').click(h.cancel).appendTo("body"), g.bind("keydown.loading", function(a) {
        27 === (a.which || a.keyCode) && (a.preventDefault(), h.cancel())
      }), h.defaults.fixed || (b = h.getViewport(), a.css({
        position: "absolute",
        top: .5 * b.h + b.y,
        left: .5 * b.w + b.x
      }))
    },
    getViewport: function() {
      var b = h.current && h.current.locked || !1,
        c = {
          x: f.scrollLeft(),
          y: f.scrollTop()
        };
      return b ? (c.w = b[0].clientWidth, c.h = b[0].clientHeight) : (c.w = k && a.innerWidth ? a.innerWidth : f.width(), c.h = k && a.innerHeight ? a.innerHeight : f.height()), c
    },
    unbindEvents: function() {
      h.wrap && l(h.wrap) && h.wrap.unbind(".fb"), g.unbind(".fb"), f.unbind(".fb")
    },
    bindEvents: function() {
      var b, a = h.current;
      a && (f.bind("orientationchange.fb" + (k ? "" : " resize.fb") + (a.autoCenter && !a.locked ? " scroll.fb" : ""), h.update), b = a.keys, b && g.bind("keydown.fb", function(e) {
        var f = e.which || e.keyCode,
          g = e.target || e.srcElement;
        return 27 === f && h.coming ? !1 : (e.ctrlKey || e.altKey || e.shiftKey || e.metaKey || g && (g.type || c(g).is("[contenteditable]")) || c.each(b, function(b, g) {
          return a.group.length > 1 && g[f] !== d ? (h[b](g[f]), e.preventDefault(), !1) : c.inArray(f, g) > -1 ? (h[b](), e.preventDefault(), !1) : void 0
        }), void 0)
      }), c.fn.mousewheel && a.mouseWheel && h.wrap.bind("mousewheel.fb", function(b, d, e, f) {
        for (var g = b.target || null, i = c(g), j = !1; i.length && !(j || i.is(".fancybox-skin") || i.is(".fancybox-wrap"));) j = o(i[0]), i = c(i).parent();
        0 === d || j || h.group.length > 1 && !a.canShrink && (f > 0 || e > 0 ? h.prev(f > 0 ? "down" : "left") : (0 > f || 0 > e) && h.next(0 > f ? "up" : "right"), b.preventDefault())
      }))
    },
    trigger: function(a, b) {
      var d, e = b || h.coming || h.current;
      if (e) {
        if (c.isFunction(e[a]) && (d = e[a].apply(e, Array.prototype.slice.call(arguments, 1))), d === !1) return !1;
        e.helpers && c.each(e.helpers, function(b, d) {
          d && h.helpers[b] && c.isFunction(h.helpers[b][a]) && h.helpers[b][a](c.extend(!0, {}, h.helpers[b].defaults, d), e)
        }), g.trigger(a)
      }
    },
    isImage: function(a) {
      return m(a) && a.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)
    },
    isSWF: function(a) {
      return m(a) && a.match(/\.(swf)((\?|#).*)?$/i)
    },
    _start: function(a) {
      var d, e, f, g, i, b = {};
      if (a = p(a), d = h.group[a] || null, !d) return !1;
      if (b = c.extend(!0, {}, h.opts, d), g = b.margin, i = b.padding, "number" === c.type(g) && (b.margin = [g, g, g, g]), "number" === c.type(i) && (b.padding = [i, i, i, i]), b.modal && c.extend(!0, b, {
          closeBtn: !1,
          closeClick: !1,
          nextClick: !1,
          arrows: !1,
          mouseWheel: !1,
          keys: null,
          helpers: {
            overlay: {
              closeClick: !1
            }
          }
        }), b.autoSize && (b.autoWidth = b.autoHeight = !0), "auto" === b.width && (b.autoWidth = !0), "auto" === b.height && (b.autoHeight = !0), b.group = h.group, b.index = a, h.coming = b, !1 === h.trigger("beforeLoad")) return h.coming = null, void 0;
      if (f = b.type, e = b.href, !f) return h.coming = null, h.current && h.router && "jumpto" !== h.router ? (h.current.index = a, h[h.router](h.direction)) : !1;
      if (h.isActive = !0, ("image" === f || "swf" === f) && (b.autoHeight = b.autoWidth = !1, b.scrolling = "visible"), "image" === f && (b.aspectRatio = !0), "iframe" === f && k && (b.scrolling = "scroll"), b.wrap = c(b.tpl.wrap).addClass("fancybox-" + (k ? "mobile" : "desktop") + " fancybox-type-" + f + " fancybox-tmp " + b.wrapCSS).appendTo(b.parent || "body"), c.extend(b, {
          skin: c(".fancybox-skin", b.wrap),
          outer: c(".fancybox-outer", b.wrap),
          inner: c(".fancybox-inner", b.wrap)
        }), c.each(["Top", "Right", "Bottom", "Left"], function(a, c) {
          b.skin.css("padding" + c, q(b.padding[a]))
        }), h.trigger("onReady"), "inline" === f || "html" === f) {
        if (!b.content || !b.content.length) return h._error("content")
      } else if (!e) return h._error("href");
      "image" === f ? h._loadImage() : "ajax" === f ? h._loadAjax() : "iframe" === f ? h._loadIframe() : h._afterLoad()
    },
    _error: function(a) {
      c.extend(h.coming, {
        type: "html",
        autoWidth: !0,
        autoHeight: !0,
        minWidth: 0,
        minHeight: 0,
        scrolling: "no",
        hasError: a,
        content: h.coming.tpl.error
      }), h._afterLoad()
    },
    _loadImage: function() {
      var a = h.imgPreload = new Image;
      a.onload = function() {
        this.onload = this.onerror = null, h.coming.width = this.width / h.opts.pixelRatio, h.coming.height = this.height / h.opts.pixelRatio, h._afterLoad()
      }, a.onerror = function() {
        this.onload = this.onerror = null, h._error("image")
      }, a.src = h.coming.href, a.complete !== !0 && h.showLoading()
    },
    _loadAjax: function() {
      var a = h.coming;
      h.showLoading(), h.ajaxLoad = c.ajax(c.extend({}, a.ajax, {
        url: a.href,
        error: function(a, b) {
          h.coming && "abort" !== b ? h._error("ajax", a) : h.hideLoading()
        },
        success: function(b, c) {
          "success" === c && (a.content = b, h._afterLoad())
        }
      }))
    },
    _loadIframe: function() {
      var a = h.coming,
        b = c(a.tpl.iframe.replace(/\{rnd\}/g, (new Date).getTime())).attr("scrolling", k ? "auto" : a.iframe.scrolling).attr("src", a.href);
      c(a.wrap).bind("onReset", function() {
        try {
          c(this).find("iframe").hide().attr("src", "//about:blank").end().empty()
        } catch (a) {}
      }), a.iframe.preload && (h.showLoading(), b.one("load", function() {
        c(this).data("ready", 1), k || c(this).bind("load.fb", h.update), c(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show(), h._afterLoad()
      })), a.content = b.appendTo(a.inner), a.iframe.preload || h._afterLoad()
    },
    _preloadImages: function() {
      var e, f, a = h.group,
        b = h.current,
        c = a.length,
        d = b.preload ? Math.min(b.preload, c - 1) : 0;
      for (f = 1; d >= f; f += 1) e = a[(b.index + f) % c], "image" === e.type && e.href && ((new Image).src = e.href)
    },
    _afterLoad: function() {
      var e, f, g, i, j, k, a = h.coming,
        b = h.current,
        d = "fancybox-placeholder";
      if (h.hideLoading(), a && h.isActive !== !1) {
        if (!1 === h.trigger("afterLoad", a, b)) return a.wrap.stop(!0).trigger("onReset").remove(), h.coming = null, void 0;
        switch (b && (h.trigger("beforeChange", b), b.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove()), h.unbindEvents(), e = a, f = a.content, g = a.type, i = a.scrolling, c.extend(h, {
          wrap: e.wrap,
          skin: e.skin,
          outer: e.outer,
          inner: e.inner,
          current: e,
          previous: b
        }), j = e.href, g) {
          case "inline":
          case "ajax":
          case "html":
            e.selector ? f = c("<div>").html(f).find(e.selector) : l(f) && (f.data(d) || f.data(d, c('<div class="' + d + '"></div>').insertAfter(f).hide()), f = f.show().detach(), e.wrap.bind("onReset", function() {
              c(this).find(f).length && f.hide().replaceAll(f.data(d)).data(d, !1)
            }));
            break;
          case "image":
            f = e.tpl.image.replace("{href}", j);
            break;
          case "swf":
            f = '<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="' + j + '"></param>', k = "", c.each(e.swf, function(a, b) {
              f += '<param name="' + a + '" value="' + b + '"></param>', k += " " + a + '="' + b + '"'
            }), f += '<embed src="' + j + '" type="application/x-shockwave-flash" width="100%" height="100%"' + k + "></embed></object>"
        }
        l(f) && f.parent().is(e.inner) || e.inner.append(f), h.trigger("beforeShow"), e.inner.css("overflow", "yes" === i ? "scroll" : "no" === i ? "hidden" : i), h._setDimension(), h.reposition(), h.isOpen = !1, h.coming = null, h.bindEvents(), h.isOpened ? b.prevMethod && h.transitions[b.prevMethod]() : c(".fancybox-wrap").not(e.wrap).stop(!0).trigger("onReset").remove(), h.transitions[h.isOpened ? e.nextMethod : e.openMethod](), h._preloadImages()
      }
    },
    _setDimension: function() {
      var y, z, A, B, C, D, E, F, G, H, I, J, K, L, M, a = h.getViewport(),
        b = 0,
        d = !1,
        e = !1,
        f = h.wrap,
        g = h.skin,
        i = h.inner,
        j = h.current,
        k = j.width,
        l = j.height,
        m = j.minWidth,
        o = j.minHeight,
        r = j.maxWidth,
        s = j.maxHeight,
        t = j.scrolling,
        u = j.scrollOutside ? j.scrollbarWidth : 0,
        v = j.margin,
        w = p(v[1] + v[3]),
        x = p(v[0] + v[2]);
      if (f.add(g).add(i).width("auto").height("auto").removeClass("fancybox-tmp"), y = p(g.outerWidth(!0) - g.width()), z = p(g.outerHeight(!0) - g.height()), A = w + y, B = x + z, C = n(k) ? (a.w - A) * p(k) / 100 : k, D = n(l) ? (a.h - B) * p(l) / 100 : l, "iframe" === j.type) {
        if (L = j.content, j.autoHeight && 1 === L.data("ready")) try {
          L[0].contentWindow.document.location && (i.width(C).height(9999), M = L.contents().find("body"), u && M.css("overflow-x", "hidden"), D = M.outerHeight(!0))
        } catch (N) {}
      } else(j.autoWidth || j.autoHeight) && (i.addClass("fancybox-tmp"), j.autoWidth || i.width(C), j.autoHeight || i.height(D), j.autoWidth && (C = i.width()), j.autoHeight && (D = i.height()), i.removeClass("fancybox-tmp"));
      if (k = p(C), l = p(D), G = C / D, m = p(n(m) ? p(m, "w") - A : m), r = p(n(r) ? p(r, "w") - A : r), o = p(n(o) ? p(o, "h") - B : o), s = p(n(s) ? p(s, "h") - B : s), E = r, F = s, j.fitToView && (r = Math.min(a.w - A, r), s = Math.min(a.h - B, s)), J = a.w - w, K = a.h - x, j.aspectRatio ? (k > r && (k = r, l = p(k / G)), l > s && (l = s, k = p(l * G)), m > k && (k = m, l = p(k / G)), o > l && (l = o, k = p(l * G))) : (k = Math.max(m, Math.min(k, r)), j.autoHeight && "iframe" !== j.type && (i.width(k), l = i.height()), l = Math.max(o, Math.min(l, s))), j.fitToView)
        if (i.width(k).height(l), f.width(k + y), H = f.width(), I = f.height(), j.aspectRatio)
          for (;
            (H > J || I > K) && k > m && l > o && !(b++ > 19);) l = Math.max(o, Math.min(s, l - 10)), k = p(l * G), m > k && (k = m, l = p(k / G)), k > r && (k = r, l = p(k / G)), i.width(k).height(l), f.width(k + y), H = f.width(), I = f.height();
        else k = Math.max(m, Math.min(k, k - (H - J))), l = Math.max(o, Math.min(l, l - (I - K)));
      u && "auto" === t && D > l && J > k + y + u && (k += u), i.width(k).height(l), f.width(k + y), H = f.width(), I = f.height(), d = (H > J || I > K) && k > m && l > o, e = j.aspectRatio ? E > k && F > l && C > k && D > l : (E > k || F > l) && (C > k || D > l), c.extend(j, {
        dim: {
          width: q(H),
          height: q(I)
        },
        origWidth: C,
        origHeight: D,
        canShrink: d,
        canExpand: e,
        wPadding: y,
        hPadding: z,
        wrapSpace: I - g.outerHeight(!0),
        skinSpace: g.height() - l
      }), !L && j.autoHeight && l > o && s > l && !e && i.height("auto")
    },
    _getPosition: function(a) {
      var b = h.current,
        c = h.getViewport(),
        d = b.margin,
        e = h.wrap.width() + d[1] + d[3],
        f = h.wrap.height() + d[0] + d[2],
        g = {
          position: "absolute",
          top: d[0],
          left: d[3]
        };
      return b.autoCenter && b.fixed && !a && f <= c.h && e <= c.w ? g.position = "fixed" : b.locked || (g.top += c.y, g.left += c.x), g.top = q(Math.max(g.top, g.top + (c.h - f) * b.topRatio)), g.left = q(Math.max(g.left, g.left + (c.w - e) * b.leftRatio)), g
    },
    _afterZoomIn: function() {
      var a = h.current;
      a && (h.isOpen = h.isOpened = !0, h.wrap.css("overflow", "visible").addClass("fancybox-opened"), h.update(), (a.closeClick || a.nextClick && h.group.length > 1) && h.inner.css("cursor", "pointer").bind("click.fb", function(b) {
        c(b.target).is("a") || c(b.target).parent().is("a") || (b.preventDefault(), h[a.closeClick ? "close" : "next"]())
      }), a.closeBtn && c(a.tpl.closeBtn).appendTo(h.skin).bind("click.fb", function(a) {
        a.preventDefault(), h.close()
      }), a.arrows && h.group.length > 1 && ((a.loop || a.index > 0) && c(a.tpl.prev).appendTo(h.outer).bind("click.fb", h.prev), (a.loop || a.index < h.group.length - 1) && c(a.tpl.next).appendTo(h.outer).bind("click.fb", h.next)), h.trigger("afterShow"), a.loop || a.index !== a.group.length - 1 ? h.opts.autoPlay && !h.player.isActive && (h.opts.autoPlay = !1, h.play()) : h.play(!1))
    },
    _afterZoomOut: function(a) {
      a = a || h.current, c(".fancybox-wrap").trigger("onReset").remove(), c.extend(h, {
        group: {},
        opts: {},
        router: !1,
        current: null,
        isActive: !1,
        isOpened: !1,
        isOpen: !1,
        isClosing: !1,
        wrap: null,
        skin: null,
        outer: null,
        inner: null
      }), h.trigger("afterClose", a)
    }
  }), h.transitions = {
    getOrigPosition: function() {
      var a = h.current,
        b = a.element,
        c = a.orig,
        d = {},
        e = 50,
        f = 50,
        g = a.hPadding,
        i = a.wPadding,
        j = h.getViewport();
      return !c && a.isDom && b.is(":visible") && (c = b.find("img:first"), c.length || (c = b)), l(c) ? (d = c.offset(), c.is("img") && (e = c.outerWidth(), f = c.outerHeight())) : (d.top = j.y + (j.h - f) * a.topRatio, d.left = j.x + (j.w - e) * a.leftRatio), ("fixed" === h.wrap.css("position") || a.locked) && (d.top -= j.y, d.left -= j.x), d = {
        top: q(d.top - g * a.topRatio),
        left: q(d.left - i * a.leftRatio),
        width: q(e + i),
        height: q(f + g)
      }
    },
    step: function(a, b) {
      var c, d, e, f = b.prop,
        g = h.current,
        i = g.wrapSpace,
        j = g.skinSpace;
      ("width" === f || "height" === f) && (c = b.end === b.start ? 1 : (a - b.start) / (b.end - b.start), h.isClosing && (c = 1 - c), d = "width" === f ? g.wPadding : g.hPadding, e = a - d, h.skin[f](p("width" === f ? e : e - i * c)), h.inner[f](p("width" === f ? e : e - i * c - j * c)))
    },
    zoomIn: function() {
      var a = h.current,
        b = a.pos,
        d = a.openEffect,
        e = "elastic" === d,
        f = c.extend({
          opacity: 1
        }, b);
      delete f.position, e ? (b = this.getOrigPosition(), a.openOpacity && (b.opacity = .1)) : "fade" === d && (b.opacity = .1), h.wrap.css(b).animate(f, {
        duration: "none" === d ? 0 : a.openSpeed,
        easing: a.openEasing,
        step: e ? this.step : null,
        complete: h._afterZoomIn
      })
    },
    zoomOut: function() {
      var a = h.current,
        b = a.closeEffect,
        c = "elastic" === b,
        d = {
          opacity: .1
        };
      c && (d = this.getOrigPosition(), a.closeOpacity && (d.opacity = .1)), h.wrap.animate(d, {
        duration: "none" === b ? 0 : a.closeSpeed,
        easing: a.closeEasing,
        step: c ? this.step : null,
        complete: h._afterZoomOut
      })
    },
    changeIn: function() {
      var g, a = h.current,
        b = a.nextEffect,
        c = a.pos,
        d = {
          opacity: 1
        },
        e = h.direction,
        f = 200;
      c.opacity = .1, "elastic" === b && (g = "down" === e || "up" === e ? "top" : "left", "down" === e || "right" === e ? (c[g] = q(p(c[g]) - f), d[g] = "+=" + f + "px") : (c[g] = q(p(c[g]) + f), d[g] = "-=" + f + "px")), "none" === b ? h._afterZoomIn() : h.wrap.css(c).animate(d, {
        duration: a.nextSpeed,
        easing: a.nextEasing,
        complete: h._afterZoomIn
      })
    },
    changeOut: function() {
      var a = h.previous,
        b = a.prevEffect,
        d = {
          opacity: .1
        },
        e = h.direction,
        f = 200;
      "elastic" === b && (d["down" === e || "up" === e ? "top" : "left"] = ("up" === e || "left" === e ? "-" : "+") + "=" + f + "px"), a.wrap.animate(d, {
        duration: "none" === b ? 0 : a.prevSpeed,
        easing: a.prevEasing,
        complete: function() {
          c(this).trigger("onReset").remove()
        }
      })
    }
  }, h.helpers.overlay = {
    defaults: {
      closeClick: !0,
      speedOut: 200,
      showEarly: !0,
      css: {},
      locked: !k,
      fixed: !0
    },
    overlay: null,
    fixed: !1,
    el: c("html"),
    create: function(a) {
      a = c.extend({}, this.defaults, a), this.overlay && this.close(), this.overlay = c('<div class="fancybox-overlay"></div>').appendTo(h.coming ? h.coming.parent : a.parent), this.fixed = !1, a.fixed && h.defaults.fixed && (this.overlay.addClass("fancybox-overlay-fixed"), this.fixed = !0)
    },
    open: function(a) {
      var b = this;
      a = c.extend({}, this.defaults, a), this.overlay ? this.overlay.unbind(".overlay").width("auto").height("auto") : this.create(a), this.fixed || (f.bind("resize.overlay", c.proxy(this.update, this)), this.update()), a.closeClick && this.overlay.bind("click.overlay", function(a) {
        return c(a.target).hasClass("fancybox-overlay") ? (h.isActive ? h.close() : b.close(), !1) : void 0
      }), this.overlay.css(a.css).show()
    },
    close: function() {
      var a, b;
      f.unbind("resize.overlay"), this.el.hasClass("fancybox-lock") && (c(".fancybox-margin").removeClass("fancybox-margin"), a = f.scrollTop(), b = f.scrollLeft(), this.el.removeClass("fancybox-lock"), f.scrollTop(a).scrollLeft(b)), c(".fancybox-overlay").remove().hide(), c.extend(this, {
        overlay: null,
        fixed: !1
      })
    },
    update: function() {
      var c, a = "100%";
      this.overlay.width(a).height("100%"), i ? (c = Math.max(b.documentElement.offsetWidth, b.body.offsetWidth), g.width() > c && (a = g.width())) : g.width() > f.width() && (a = g.width()), this.overlay.width(a).height(g.height())
    },
    onReady: function(a, b) {
      var d = this.overlay;
      c(".fancybox-overlay").stop(!0, !0), d || this.create(a), a.locked && this.fixed && b.fixed && (d || (this.margin = g.height() > f.height() ? c("html").css("margin-right").replace("px", "") : !1), b.locked = this.overlay.append(b.wrap), b.fixed = !1), a.showEarly === !0 && this.beforeShow.apply(this, arguments)
    },
    beforeShow: function(a, b) {
      var d, e;
      b.locked && (this.margin !== !1 && (c("*").filter(function() {
        return "fixed" === c(this).css("position") && !c(this).hasClass("fancybox-overlay") && !c(this).hasClass("fancybox-wrap")
      }).addClass("fancybox-margin"), this.el.addClass("fancybox-margin")), d = f.scrollTop(), e = f.scrollLeft(), this.el.addClass("fancybox-lock"), f.scrollTop(d).scrollLeft(e)), this.open(a)
    },
    onUpdate: function() {
      this.fixed || this.update()
    },
    afterClose: function(a) {
      this.overlay && !h.coming && this.overlay.fadeOut(a.speedOut, c.proxy(this.close, this))
    }
  }, h.helpers.title = {
    defaults: {
      type: "float",
      position: "bottom"
    },
    beforeShow: function(a) {
      var f, g, b = h.current,
        d = b.title,
        e = a.type;
      if (c.isFunction(d) && (d = d.call(b.element, b)), m(d) && "" !== c.trim(d)) {
        switch (f = c('<div class="fancybox-title fancybox-title-' + e + '-wrap">' + d + "</div>"), e) {
          case "inside":
            g = h.skin;
            break;
          case "outside":
            g = h.wrap;
            break;
          case "over":
            g = h.inner;
            break;
          default:
            g = h.skin, f.appendTo("body"), i && f.width(f.width()), f.wrapInner('<span class="child"></span>'), h.current.margin[2] += Math.abs(p(f.css("margin-bottom")))
        }
        f["top" === a.position ? "prependTo" : "appendTo"](g)
      }
    }
  }, c.fn.fancybox = function(a) {
    var b, d = c(this),
      e = this.selector || "",
      f = function(f) {
        var j, k, g = c(this).blur(),
          i = b;
        f.ctrlKey || f.altKey || f.shiftKey || f.metaKey || g.is(".fancybox-wrap") || (j = a.groupAttr || "data-fancybox-group", k = g.attr(j), k || (j = "rel", k = g.get(0)[j]), k && "" !== k && "nofollow" !== k && (g = e.length ? c(e) : d, g = g.filter("[" + j + '="' + k + '"]'), i = g.index(this)), a.index = i, h.open(g, a) !== !1 && f.preventDefault())
      };
    return a = a || {}, b = a.index || 0, e && a.live !== !1 ? g.undelegate(e, "click.fb-start").delegate(e + ":not('.fancybox-item, .fancybox-nav')", "click.fb-start", f) : d.unbind("click.fb-start").bind("click.fb-start", f), this.filter("[data-fancybox-start=1]").trigger("click"), this
  }, g.ready(function() {
    var b, f;
    c.scrollbarWidth === d && (c.scrollbarWidth = function() {
      var a = c('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),
        b = a.children(),
        d = b.innerWidth() - b.height(99).innerWidth();
      return a.remove(), d
    }), c.support.fixedPosition === d && (c.support.fixedPosition = function() {
      var a = c('<div style="position:fixed;top:20px;"></div>').appendTo("body"),
        b = 20 === a[0].offsetTop || 15 === a[0].offsetTop;
      return a.remove(), b
    }()), c.extend(h.defaults, {
      scrollbarWidth: c.scrollbarWidth(),
      fixed: c.support.fixedPosition,
      parent: c("body")
    }), b = c(a).width(), e.addClass("fancybox-lock-test"), f = c(a).width(), e.removeClass("fancybox-lock-test"), c("<style type='text/css'>.fancybox-margin{margin-right:" + (f - b) + "px;}</style>").appendTo("head")
  })
}(window, document, jQuery),
function(a) {
  "use strict";
  var b = a.fancybox,
    c = function(b, c, d) {
      return d = d || "", "object" === a.type(d) && (d = a.param(d, !0)), a.each(c, function(a, c) {
        b = b.replace("$" + a, c || "")
      }), d.length && (b += (b.indexOf("?") > 0 ? "&" : "?") + d), b
    };
  b.helpers.media = {
    defaults: {
      youtube: {
        matcher: /(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(watch\?v=|v\/|u\/|embed\/?)?(videoseries\?list=(.*)|[\w-]{11}|\?listType=(.*)&list=(.*)).*/i,
        params: {
          autoplay: 1,
          autohide: 1,
          fs: 1,
          rel: 0,
          hd: 1,
          wmode: "opaque",
          enablejsapi: 1
        },
        type: "iframe",
        url: "//www.youtube.com/embed/$3"
      },
      vimeo: {
        matcher: /(?:vimeo(?:pro)?.com)\/(?:[^\d]+)?(\d+)(?:.*)/,
        params: {
          autoplay: 1,
          hd: 1,
          show_title: 1,
          show_byline: 1,
          show_portrait: 0,
          fullscreen: 1
        },
        type: "iframe",
        url: "//player.vimeo.com/video/$1"
      },
      metacafe: {
        matcher: /metacafe.com\/(?:watch|fplayer)\/([\w\-]{1,10})/,
        params: {
          autoPlay: "yes"
        },
        type: "swf",
        url: function(b, c, d) {
          return d.swf.flashVars = "playerVars=" + a.param(c, !0), "//www.metacafe.com/fplayer/" + b[1] + "/.swf"
        }
      },
      dailymotion: {
        matcher: /dailymotion.com\/video\/(.*)\/?(.*)/,
        params: {
          additionalInfos: 0,
          autoStart: 1
        },
        type: "swf",
        url: "//www.dailymotion.com/swf/video/$1"
      },
      twitvid: {
        matcher: /twitvid\.com\/([a-zA-Z0-9_\-\?\=]+)/i,
        params: {
          autoplay: 0
        },
        type: "iframe",
        url: "//www.twitvid.com/embed.php?guid=$1"
      },
      twitpic: {
        matcher: /twitpic\.com\/(?!(?:place|photos|events)\/)([a-zA-Z0-9\?\=\-]+)/i,
        type: "image",
        url: "//twitpic.com/show/full/$1/"
      },
      instagram: {
        matcher: /(instagr\.am|instagram\.com)\/p\/([a-zA-Z0-9_\-]+)\/?/i,
        type: "image",
        url: "//$1/p/$2/media/?size=l"
      },
      google_maps: {
        matcher: /maps\.google\.([a-z]{2,3}(\.[a-z]{2})?)\/(\?ll=|maps\?)(.*)/i,
        type: "iframe",
        url: function(a) {
          return "//maps.google." + a[1] + "/" + a[3] + a[4] + "&output=" + (a[4].indexOf("layer=c") > 0 ? "svembed" : "embed")
        }
      }
    },
    beforeLoad: function(b, d) {
      var g, h, i, j, e = d.href || "",
        f = !1;
      for (g in b)
        if (b.hasOwnProperty(g) && (h = b[g], i = e.match(h.matcher))) {
          f = h.type, j = a.extend(!0, {}, h.params, d[g] || (a.isPlainObject(b[g]) ? b[g].params : null)), e = "function" === a.type(h.url) ? h.url.call(this, i, j, d) : c(h.url, i, j);
          break
        }
      f && (d.href = e, d.type = f, d.autoHeight = !1)
    }
  }
}(jQuery);
! function(a, b) {
  "use strict";
  var c = ["localStorage", "sessionStorage"],
    d = [];
  b.each(c, function(c, e) {
    try {
      d[e] = e in a && null !== a[e]
    } catch (f) {
      d[e] = !1
    }
    b[e] = {
      settings: {
        cookiePrefix: "html5fallback:" + e + ":",
        cookieOptions: {
          path: "/",
          domain: document.domain,
          expires: "localStorage" === e ? {
            expires: 365
          } : void 0
        }
      },
      getItem: function(c) {
        var f;
        return f = d[e] ? a[e].getItem(c) : b.cookie(this.settings.cookiePrefix + c)
      },
      setItem: function(c, f) {
        return d[e] ? a[e].setItem(c, f) : b.cookie(this.settings.cookiePrefix + c, f, this.settings.cookieOptions)
      },
      removeItem: function(c) {
        if (d[e]) return a[e].removeItem(c);
        var f = b.extend(this.settings.cookieOptions, {
          expires: -1
        });
        return b.cookie(this.settings.cookiePrefix + c, null, f)
      },
      clear: function() {
        if (d[e]) return a[e].clear();
        var c = new RegExp("^" + this.settings.cookiePrefix, ""),
          f = b.extend(this.settings.cookieOptions, {
            expires: -1
          });
        document.cookie && "" !== document.cookie && b.each(document.cookie.split(";"), function(a, d) {
          c.test(d = b.trim(d)) && b.cookie(d.substr(0, d.indexOf("=")), null, f)
        })
      }
    }
  })
}(window, jQuery),
function(a) {
  var b = {
    init: function(c) {
      return this.each(function() {
        b.destroy.call(this), this.opt = a.extend(!0, {}, a.fn.raty.defaults, c);
        var d = a(this),
          e = ["number", "readOnly", "score", "scoreName"];
        b._callback.call(this, e), this.opt.precision && b._adjustPrecision.call(this), this.opt.number = b._between(this.opt.number, 0, this.opt.numberMax), this.opt.path = this.opt.path || "", this.opt.path && "/" !== this.opt.path.charAt(this.opt.path.length - 1) && (this.opt.path += "/"), this.stars = b._createStars.call(this), this.score = b._createScore.call(this), b._apply.call(this, this.opt.score);
        var f = this.opt.space ? 4 : 0,
          g = this.opt.width || this.opt.number * this.opt.size + this.opt.number * f;
        this.opt.cancel && (this.cancel = b._createCancel.call(this), g += this.opt.size + f), this.opt.readOnly ? b._lock.call(this) : (d.css("cursor", "pointer"), b._binds.call(this)), this.opt.width !== !1 && d.css("width", g), b._target.call(this, this.opt.score), d.data({
          settings: this.opt,
          raty: !0
        })
      })
    },
    _adjustPrecision: function() {
      this.opt.targetType = "score", this.opt.half = !0
    },
    _apply: function(a) {
      a && a > 0 && (a = b._between(a, 0, this.opt.number), this.score.val(a)), b._fill.call(this, a), a && b._roundStars.call(this, a)
    },
    _between: function(a, b, c) {
      return Math.min(Math.max(parseFloat(a), b), c)
    },
    _binds: function() {
      this.cancel && b._bindCancel.call(this), b._bindClick.call(this), b._bindOut.call(this), b._bindOver.call(this)
    },
    _bindCancel: function() {
      b._bindClickCancel.call(this), b._bindOutCancel.call(this), b._bindOverCancel.call(this)
    },
    _bindClick: function() {
      var b = this,
        c = a(b);
      b.stars.on("click.raty", function(a) {
        b.score.val(b.opt.half || b.opt.precision ? c.data("score") : this.alt), b.opt.click && b.opt.click.call(b, parseFloat(b.score.val()), a)
      })
    },
    _bindClickCancel: function() {
      var a = this;
      a.cancel.on("click.raty", function(b) {
        a.score.removeAttr("value"), a.opt.click && a.opt.click.call(a, null, b)
      })
    },
    _bindOut: function() {
      var c = this;
      a(this).on("mouseleave.raty", function(a) {
        var d = parseFloat(c.score.val()) || void 0;
        b._apply.call(c, d), b._target.call(c, d, a), c.opt.mouseout && c.opt.mouseout.call(c, d, a)
      })
    },
    _bindOutCancel: function() {
      var b = this;
      b.cancel.on("mouseleave.raty", function(c) {
        a(this).attr("src", b.opt.path + b.opt.cancelOff), b.opt.mouseout && b.opt.mouseout.call(b, b.score.val() || null, c)
      })
    },
    _bindOverCancel: function() {
      var c = this;
      c.cancel.on("mouseover.raty", function(d) {
        a(this).attr("src", c.opt.path + c.opt.cancelOn), c.stars.attr("src", c.opt.path + c.opt.starOff), b._target.call(c, null, d), c.opt.mouseover && c.opt.mouseover.call(c, null)
      })
    },
    _bindOver: function() {
      var c = this,
        d = a(c),
        e = c.opt.half ? "mousemove.raty" : "mouseover.raty";
      c.stars.on(e, function(e) {
        var f = parseInt(this.alt, 10);
        if (c.opt.half) {
          var g = parseFloat((e.pageX - a(this).offset().left) / c.opt.size),
            h = g > .5 ? 1 : .5;
          f = f - 1 + h, b._fill.call(c, f), c.opt.precision && (f = f - h + g), b._roundStars.call(c, f), d.data("score", f)
        } else b._fill.call(c, f);
        b._target.call(c, f, e), c.opt.mouseover && c.opt.mouseover.call(c, f, e)
      })
    },
    _callback: function(a) {
      for (var b in a) "function" == typeof this.opt[a[b]] && (this.opt[a[b]] = this.opt[a[b]].call(this))
    },
    _createCancel: function() {
      var b = a(this),
        c = this.opt.path + this.opt.cancelOff,
        d = a("<img />", {
          src: c,
          alt: "x",
          title: this.opt.cancelHint,
          "class": "raty-cancel"
        });
      return "left" == this.opt.cancelPlace ? b.prepend("&#160;").prepend(d) : b.append("&#160;").append(d), d
    },
    _createScore: function() {
      return a("<input />", {
        type: "hidden",
        name: this.opt.scoreName
      }).appendTo(this)
    },
    _createStars: function() {
      for (var c = a(this), d = 1; d <= this.opt.number; d++) {
        var e = b._getHint.call(this, d),
          f = this.opt.score && this.opt.score >= d ? "starOn" : "starOff";
        f = this.opt.path + this.opt[f], a("<img />", {
          src: f,
          alt: d,
          title: e
        }).appendTo(this), this.opt.space && c.append(d < this.opt.number ? "&#160;" : "")
      }
      return c.children("img")
    },
    _error: function(b) {
      a(this).html(b), a.error(b)
    },
    _fill: function(a) {
      for (var b = this, c = 0, d = 1; d <= b.stars.length; d++) {
        var e = b.stars.eq(d - 1),
          f = b.opt.single ? d == a : a >= d;
        if (b.opt.iconRange && b.opt.iconRange.length > c) {
          var g = b.opt.iconRange[c],
            h = g.on || b.opt.starOn,
            i = g.off || b.opt.starOff,
            j = f ? h : i;
          d <= g.range && e.attr("src", b.opt.path + j), d == g.range && c++
        } else {
          var j = f ? "starOn" : "starOff";
          e.attr("src", this.opt.path + this.opt[j])
        }
      }
    },
    _getHint: function(a) {
      var b = this.opt.hints[a - 1];
      return "" === b ? "" : b || a
    },
    _lock: function() {
      var c = parseInt(this.score.val(), 10),
        d = c ? b._getHint.call(this, c) : this.opt.noRatedMsg;
      a(this).data("readonly", !0).css("cursor", "").attr("title", d), this.score.attr("readonly", "readonly"), this.stars.attr("title", d), this.cancel && this.cancel.hide()
    },
    _roundStars: function(a) {
      var b = (a - Math.floor(a)).toFixed(2);
      if (b > this.opt.round.down) {
        var c = "starOn";
        this.opt.halfShow && b < this.opt.round.up ? c = "starHalf" : b < this.opt.round.full && (c = "starOff"), this.stars.eq(Math.ceil(a) - 1).attr("src", this.opt.path + this.opt[c])
      }
    },
    _target: function(c, d) {
      if (this.opt.target) {
        var e = a(this.opt.target);
        0 === e.length && b._error.call(this, "Target selector invalid or missing!"), this.opt.targetFormat.indexOf("{score}") < 0 && b._error.call(this, 'Template "{score}" missing!');
        var f = d && "mouseover" == d.type;
        void 0 === c ? c = this.opt.targetText : null === c ? c = f ? this.opt.cancelHint : this.opt.targetText : ("hint" == this.opt.targetType ? c = b._getHint.call(this, Math.ceil(c)) : this.opt.precision && (c = parseFloat(c).toFixed(1)), f || this.opt.targetKeep || (c = this.opt.targetText)), c && (c = this.opt.targetFormat.toString().replace("{score}", c)), e.is(":input") ? e.val(c) : e.html(c)
      }
    },
    _unlock: function() {
      a(this).data("readonly", !1).css("cursor", "pointer").removeAttr("title"), this.score.removeAttr("readonly", "readonly");
      for (var c = 0; c < this.opt.number; c++) this.stars.eq(c).attr("title", b._getHint.call(this, c + 1));
      this.cancel && this.cancel.css("display", "")
    },
    cancel: function(c) {
      return this.each(function() {
        a(this).data("readonly") !== !0 && (b[c ? "click" : "score"].call(this, null), this.score.removeAttr("value"))
      })
    },
    click: function(c) {
      return a(this).each(function() {
        a(this).data("readonly") !== !0 && (b._apply.call(this, c), this.opt.click || b._error.call(this, 'You must add the "click: function(score, evt) { }" callback.'), this.opt.click.call(this, c, a.Event("click")), b._target.call(this, c))
      })
    },
    destroy: function() {
      return a(this).each(function() {
        var b = a(this),
          c = b.data("raw");
        c ? b.off(".raty").empty().css({
          cursor: c.style.cursor,
          width: c.style.width
        }).removeData("readonly") : b.data("raw", b.clone()[0])
      })
    },
    getScore: function() {
      var c, b = [];
      return a(this).each(function() {
        c = this.score.val(), b.push(c ? parseFloat(c) : void 0)
      }), b.length > 1 ? b : b[0]
    },
    readOnly: function(c) {
      return this.each(function() {
        var d = a(this);
        d.data("readonly") !== c && (c ? (d.off(".raty").children("img").off(".raty"), b._lock.call(this)) : (b._binds.call(this), b._unlock.call(this)), d.data("readonly", c))
      })
    },
    reload: function() {
      return b.set.call(this, {})
    },
    score: function() {
      return arguments.length ? b.setScore.apply(this, arguments) : b.getScore.call(this)
    },
    set: function(b) {
      return this.each(function() {
        var c = a(this),
          d = c.data("settings"),
          e = a.extend({}, d, b);
        c.raty(e)
      })
    },
    setScore: function(c) {
      return a(this).each(function() {
        a(this).data("readonly") !== !0 && (b._apply.call(this, c), b._target.call(this, c))
      })
    }
  };
  a.fn.raty = function(c) {
    return b[c] ? b[c].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof c && c ? (a.error("Method " + c + " does not exist!"), void 0) : b.init.apply(this, arguments)
  }, a.fn.raty.defaults = {
    cancel: !1,
    cancelHint: "Cancel this rating!",
    cancelOff: "images/cancel-off.png",
    cancelOn: "images/cancel-on.png",
    cancelPlace: "left",
    click: void 0,
    half: !1,
    halfShow: !0,
    hints: ["bad", "poor", "regular", "good", "gorgeous"],
    iconRange: void 0,
    mouseout: void 0,
    mouseover: void 0,
    noRatedMsg: "Not rated yet!",
    number: 5,
    numberMax: 20,
    path: "",
    precision: !1,
    readOnly: !1,
    round: {
      down: .25,
      full: .6,
      up: .76
    },
    score: void 0,
    scoreName: "score",
    single: !1,
    size: 16,
    space: !0,
    starHalf: "/Sitefinity/WebSiteTemplates/ParkwayTemplate/App_Themes/ParkwayTheme/Images/star-half.png",
    starOff: "/Sitefinity/WebSiteTemplates/ParkwayTemplate/App_Themes/ParkwayTheme/Images/star-off.png",
    starOn: "/Sitefinity/WebSiteTemplates/ParkwayTemplate/App_Themes/ParkwayTheme/Images/star-on.png",
    target: void 0,
    targetFormat: "{score}",
    targetKeep: !1,
    targetText: "",
    targetType: "hint",
    width: void 0
  }
}(jQuery), ! function(a, b, c, d) {
  var e = a(b);
  a.fn.lazyload = function(f) {
    function g() {
      var b = 0;
      i.each(function() {
        var c = a(this);
        if (!j.skip_invisible || c.is(":visible"))
          if (a.abovethetop(this, j) || a.leftofbegin(this, j));
          else if (a.belowthefold(this, j) || a.rightoffold(this, j)) {
          if (++b > j.failure_limit) return !1
        } else c.trigger("appear"), b = 0
      })
    }
    var h, i = this,
      j = {
        threshold: 0,
        failure_limit: 0,
        event: "scroll",
        effect: "show",
        container: b,
        data_attribute: "original",
        skip_invisible: !0,
        appear: null,
        load: null,
        placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
      };
    return f && (d !== f.failurelimit && (f.failure_limit = f.failurelimit, delete f.failurelimit), d !== f.effectspeed && (f.effect_speed = f.effectspeed, delete f.effectspeed), a.extend(j, f)), h = j.container === d || j.container === b ? e : a(j.container), 0 === j.event.indexOf("scroll") && h.bind(j.event, function() {
      return g()
    }), this.each(function() {
      var b = this,
        c = a(b);
      b.loaded = !1, (c.attr("src") === d || c.attr("src") === !1) && c.is("img") && c.attr("src", j.placeholder), c.one("appear", function() {
        if (!this.loaded) {
          if (j.appear) {
            var d = i.length;
            j.appear.call(b, d, j)
          }
          a("<img />").bind("load", function() {
            var d = c.attr("data-" + j.data_attribute);
            c.hide(), c.is("img") ? c.attr("src", d) : c.css("background-image", "url('" + d + "')"), c[j.effect](j.effect_speed), b.loaded = !0;
            var e = a.grep(i, function(a) {
              return !a.loaded
            });
            if (i = a(e), j.load) {
              var f = i.length;
              j.load.call(b, f, j)
            }
          }).attr("src", c.attr("data-" + j.data_attribute))
        }
      }), 0 !== j.event.indexOf("scroll") && c.bind(j.event, function() {
        b.loaded || c.trigger("appear")
      })
    }), e.bind("resize", function() {
      g()
    }), /(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && e.bind("pageshow", function(b) {
      b.originalEvent && b.originalEvent.persisted && i.each(function() {
        a(this).trigger("appear")
      })
    }), a(c).ready(function() {
      g()
    }), this
  }, a.belowthefold = function(c, f) {
    var g;
    return g = f.container === d || f.container === b ? (b.innerHeight ? b.innerHeight : e.height()) + e.scrollTop() : a(f.container).offset().top + a(f.container).height(), g <= a(c).offset().top - f.threshold
  }, a.rightoffold = function(c, f) {
    var g;
    return g = f.container === d || f.container === b ? e.width() + e.scrollLeft() : a(f.container).offset().left + a(f.container).width(), g <= a(c).offset().left - f.threshold
  }, a.abovethetop = function(c, f) {
    var g;
    return g = f.container === d || f.container === b ? e.scrollTop() : a(f.container).offset().top, g >= a(c).offset().top + f.threshold + a(c).height()
  }, a.leftofbegin = function(c, f) {
    var g;
    return g = f.container === d || f.container === b ? e.scrollLeft() : a(f.container).offset().left, g >= a(c).offset().left + f.threshold + a(c).width()
  }, a.inviewport = function(b, c) {
    return !(a.rightoffold(b, c) || a.leftofbegin(b, c) || a.belowthefold(b, c) || a.abovethetop(b, c))
  }, a.extend(a.expr[":"], {
    "below-the-fold": function(b) {
      return a.belowthefold(b, {
        threshold: 0
      })
    },
    "above-the-top": function(b) {
      return !a.belowthefold(b, {
        threshold: 0
      })
    },
    "right-of-screen": function(b) {
      return a.rightoffold(b, {
        threshold: 0
      })
    },
    "left-of-screen": function(b) {
      return !a.rightoffold(b, {
        threshold: 0
      })
    },
    "in-viewport": function(b) {
      return a.inviewport(b, {
        threshold: 0
      })
    },
    "above-the-fold": function(b) {
      return !a.belowthefold(b, {
        threshold: 0
      })
    },
    "right-of-fold": function(b) {
      return a.rightoffold(b, {
        threshold: 0
      })
    },
    "left-of-fold": function(b) {
      return !a.rightoffold(b, {
        threshold: 0
      })
    }
  })
}(jQuery, window, document),
function(a, b, c) {
  function l(a) {
    var b = {},
      d = /^jQuery\d+$/;
    return c.each(a.attributes, function(a, c) {
      c.specified && !d.test(c.name) && (b[c.name] = c.value)
    }), b
  }

  function m(a, b) {
    var d = this,
      e = c(d);
    if (d.value == e.attr("placeholder") && e.hasClass("placeholder"))
      if (e.data("placeholder-password")) {
        if (e = e.hide().next().show().attr("id", e.removeAttr("id").data("placeholder-id")), a === !0) return e[0].value = b;
        e.focus()
      } else d.value = "", e.removeClass("placeholder"), d == o() && d.select()
  }

  function n() {
    var a, b = this,
      d = c(b),
      e = this.id;
    if ("" == b.value) {
      if ("password" == b.type) {
        if (!d.data("placeholder-textinput")) {
          try {
            a = d.clone().attr({
              type: "text"
            })
          } catch (f) {
            a = c("<input>").attr(c.extend(l(this), {
              type: "text"
            }))
          }
          a.removeAttr("name").data({
            "placeholder-password": d,
            "placeholder-id": e
          }).bind("focus.placeholder", m), d.data({
            "placeholder-textinput": a,
            "placeholder-id": e
          }).before(a)
        }
        d = d.removeAttr("id").hide().prev().attr("id", e).show()
      }
      d.addClass("placeholder"), d[0].value = d.attr("placeholder")
    } else d.removeClass("placeholder")
  }

  function o() {
    try {
      return b.activeElement
    } catch (a) {}
  }
  var j, k, d = "[object OperaMini]" == Object.prototype.toString.call(a.operamini),
    e = "placeholder" in b.createElement("input") && !d,
    f = "placeholder" in b.createElement("textarea") && !d,
    g = c.fn,
    h = c.valHooks,
    i = c.propHooks;
  e && f ? (k = g.placeholder = function() {
    return this
  }, k.input = k.textarea = !0) : (k = g.placeholder = function() {
    var a = this;
    return a.filter((e ? "textarea" : ":input") + "[placeholder]").not(".placeholder").bind({
      "focus.placeholder": m,
      "blur.placeholder": n
    }).data("placeholder-enabled", !0).trigger("blur.placeholder"), a
  }, k.input = e, k.textarea = f, j = {
    get: function(a) {
      var b = c(a),
        d = b.data("placeholder-password");
      return d ? d[0].value : b.data("placeholder-enabled") && b.hasClass("placeholder") ? "" : a.value
    },
    set: function(a, b) {
      var d = c(a),
        e = d.data("placeholder-password");
      return e ? e[0].value = b : d.data("placeholder-enabled") ? ("" == b ? (a.value = b, a != o() && n.call(a)) : d.hasClass("placeholder") ? m.call(a, !0, b) || (a.value = b) : a.value = b, d) : a.value = b
    }
  }, e || (h.input = j, i.value = j), f || (h.textarea = j, i.value = j), c(function() {
    c(b).delegate("form", "submit.placeholder", function() {
      var a = c(".placeholder", this).each(m);
      setTimeout(function() {
        a.each(n)
      }, 10)
    })
  }), c(a).bind("beforeunload.placeholder", function() {
    c(".placeholder").each(function() {
      this.value = ""
    })
  }))
}(this, document, jQuery);
(function(c) {
  var b = {
      init: function(e) {
        var f = {
            set_width: false,
            set_height: false,
            horizontalScroll: false,
            scrollInertia: 950,
            mouseWheel: true,
            mouseWheelPixels: "auto",
            autoDraggerLength: true,
            autoHideScrollbar: false,
            snapAmount: null,
            snapOffset: 0,
            scrollButtons: {
              enable: false,
              scrollType: "continuous",
              scrollSpeed: "auto",
              scrollAmount: 40
            },
            advanced: {
              updateOnBrowserResize: true,
              updateOnContentResize: false,
              autoExpandHorizontalScroll: false,
              autoScrollOnFocus: true,
              normalizeMouseWheelDelta: false
            },
            contentTouchScroll: true,
            callbacks: {
              onScrollStart: function() {},
              onScroll: function() {},
              onTotalScroll: function() {},
              onTotalScrollBack: function() {},
              onTotalScrollOffset: 0,
              onTotalScrollBackOffset: 0,
              whileScrolling: function() {}
            },
            theme: "light"
          },
          e = c.extend(true, f, e);
        return this.each(function() {
          var m = c(this);
          if (e.set_width) {
            m.css("width", e.set_width)
          }
          if (e.set_height) {
            m.css("height", e.set_height)
          }
          if (!c(document).data("mCustomScrollbar-index")) {
            c(document).data("mCustomScrollbar-index", "1")
          } else {
            var t = parseInt(c(document).data("mCustomScrollbar-index"));
            c(document).data("mCustomScrollbar-index", t + 1)
          }
          m.wrapInner("<div class='mCustomScrollBox mCS-" + e.theme + "' id='mCSB_" + c(document).data("mCustomScrollbar-index") + "' style='position:relative; height:100%; overflow:hidden; max-width:100%;' />").addClass("mCustomScrollbar _mCS_" + c(document).data("mCustomScrollbar-index"));
          var g = m.children(".mCustomScrollBox");
          if (e.horizontalScroll) {
            g.addClass("mCSB_horizontal").wrapInner("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />");
            var k = g.children(".mCSB_h_wrapper");
            k.wrapInner("<div class='mCSB_container' style='position:absolute; left:0;' />").children(".mCSB_container").css({
              width: k.children().outerWidth(),
              position: "relative"
            }).unwrap()
          } else {
            g.wrapInner("<div class='mCSB_container' style='position:relative; top:0;' />")
          }
          var o = g.children(".mCSB_container");
          if (c.support.touch) {
            o.addClass("mCS_touch")
          }
          o.after("<div class='mCSB_scrollTools' style='position:absolute;'><div class='mCSB_draggerContainer'><div class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' style='position:relative;'></div></div><div class='mCSB_draggerRail'></div></div></div>");
          var l = g.children(".mCSB_scrollTools"),
            h = l.children(".mCSB_draggerContainer"),
            q = h.children(".mCSB_dragger");
          if (e.horizontalScroll) {
            q.data("minDraggerWidth", q.width())
          } else {
            q.data("minDraggerHeight", q.height())
          }
          if (e.scrollButtons.enable) {
            if (e.horizontalScroll) {
              l.prepend("<a class='mCSB_buttonLeft' oncontextmenu='return false;'></a>").append("<a class='mCSB_buttonRight' oncontextmenu='return false;'></a>")
            } else {
              l.prepend("<a class='mCSB_buttonUp' oncontextmenu='return false;'></a>").append("<a class='mCSB_buttonDown' oncontextmenu='return false;'></a>")
            }
          }
          g.bind("scroll", function() {
            if (!m.is(".mCS_disabled")) {
              g.scrollTop(0).scrollLeft(0)
            }
          });
          m.data({
            mCS_Init: true,
            mCustomScrollbarIndex: c(document).data("mCustomScrollbar-index"),
            horizontalScroll: e.horizontalScroll,
            scrollInertia: e.scrollInertia,
            scrollEasing: "mcsEaseOut",
            mouseWheel: e.mouseWheel,
            mouseWheelPixels: e.mouseWheelPixels,
            autoDraggerLength: e.autoDraggerLength,
            autoHideScrollbar: e.autoHideScrollbar,
            snapAmount: e.snapAmount,
            snapOffset: e.snapOffset,
            scrollButtons_enable: e.scrollButtons.enable,
            scrollButtons_scrollType: e.scrollButtons.scrollType,
            scrollButtons_scrollSpeed: e.scrollButtons.scrollSpeed,
            scrollButtons_scrollAmount: e.scrollButtons.scrollAmount,
            autoExpandHorizontalScroll: e.advanced.autoExpandHorizontalScroll,
            autoScrollOnFocus: e.advanced.autoScrollOnFocus,
            normalizeMouseWheelDelta: e.advanced.normalizeMouseWheelDelta,
            contentTouchScroll: e.contentTouchScroll,
            onScrollStart_Callback: e.callbacks.onScrollStart,
            onScroll_Callback: e.callbacks.onScroll,
            onTotalScroll_Callback: e.callbacks.onTotalScroll,
            onTotalScrollBack_Callback: e.callbacks.onTotalScrollBack,
            onTotalScroll_Offset: e.callbacks.onTotalScrollOffset,
            onTotalScrollBack_Offset: e.callbacks.onTotalScrollBackOffset,
            whileScrolling_Callback: e.callbacks.whileScrolling,
            bindEvent_scrollbar_drag: false,
            bindEvent_content_touch: false,
            bindEvent_scrollbar_click: false,
            bindEvent_mousewheel: false,
            bindEvent_buttonsContinuous_y: false,
            bindEvent_buttonsContinuous_x: false,
            bindEvent_buttonsPixels_y: false,
            bindEvent_buttonsPixels_x: false,
            bindEvent_focusin: false,
            bindEvent_autoHideScrollbar: false,
            mCSB_buttonScrollRight: false,
            mCSB_buttonScrollLeft: false,
            mCSB_buttonScrollDown: false,
            mCSB_buttonScrollUp: false
          });
          if (e.horizontalScroll) {
            if (m.css("max-width") !== "none") {
              if (!e.advanced.updateOnContentResize) {
                e.advanced.updateOnContentResize = true
              }
            }
          } else {
            if (m.css("max-height") !== "none") {
              var s = false,
                r = parseInt(m.css("max-height"));
              if (m.css("max-height").indexOf("%") >= 0) {
                s = r, r = m.parent().height() * s / 100
              }
              m.css("overflow", "hidden");
              g.css("max-height", r)
            }
          }
          m.mCustomScrollbar("update");
          if (e.advanced.updateOnBrowserResize) {
            var i, j = c(window).width(),
              u = c(window).height();
            c(window).bind("resize." + m.data("mCustomScrollbarIndex"), function() {
              if (i) {
                clearTimeout(i)
              }
              i = setTimeout(function() {
                if (!m.is(".mCS_disabled") && !m.is(".mCS_destroyed")) {
                  var w = c(window).width(),
                    v = c(window).height();
                  if (j !== w || u !== v) {
                    if (m.css("max-height") !== "none" && s) {
                      g.css("max-height", m.parent().height() * s / 100)
                    }
                    m.mCustomScrollbar("update");
                    j = w;
                    u = v
                  }
                }
              }, 150)
            })
          }
          if (e.advanced.updateOnContentResize) {
            var p;
            if (e.horizontalScroll) {
              var n = o.outerWidth()
            } else {
              var n = o.outerHeight()
            }
            p = setInterval(function() {
              if (e.horizontalScroll) {
                if (e.advanced.autoExpandHorizontalScroll) {
                  o.css({
                    position: "absolute",
                    width: "auto"
                  }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
                    width: o.outerWidth(),
                    position: "relative"
                  }).unwrap()
                }
                var v = o.outerWidth()
              } else {
                var v = o.outerHeight()
              }
              if (v != n) {
                m.mCustomScrollbar("update");
                n = v
              }
            }, 300)
          }
        })
      },
      update: function() {
        var n = c(this),
          k = n.children(".mCustomScrollBox"),
          q = k.children(".mCSB_container");
        q.removeClass("mCS_no_scrollbar");
        n.removeClass("mCS_disabled mCS_destroyed");
        k.scrollTop(0).scrollLeft(0);
        var y = k.children(".mCSB_scrollTools"),
          o = y.children(".mCSB_draggerContainer"),
          m = o.children(".mCSB_dragger");
        if (n.data("horizontalScroll")) {
          var A = y.children(".mCSB_buttonLeft"),
            t = y.children(".mCSB_buttonRight"),
            f = k.width();
          if (n.data("autoExpandHorizontalScroll")) {
            q.css({
              position: "absolute",
              width: "auto"
            }).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({
              width: q.outerWidth(),
              position: "relative"
            }).unwrap()
          }
          var z = q.outerWidth()
        } else {
          var w = y.children(".mCSB_buttonUp"),
            g = y.children(".mCSB_buttonDown"),
            r = k.height(),
            i = q.outerHeight()
        }
        if (i > r && !n.data("horizontalScroll")) {
          y.css("display", "block");
          var s = o.height();
          if (n.data("autoDraggerLength")) {
            var u = Math.round(r / i * s),
              l = m.data("minDraggerHeight");
            if (u <= l) {
              m.css({
                height: l
              })
            } else {
              if (u >= s - 10) {
                var p = s - 10;
                m.css({
                  height: p
                })
              } else {
                m.css({
                  height: u
                })
              }
            }
            m.children(".mCSB_dragger_bar").css({
              "line-height": m.height() + "px"
            })
          }
          var B = m.height(),
            x = (i - r) / (s - B);
          n.data("scrollAmount", x).mCustomScrollbar("scrolling", k, q, o, m, w, g, A, t);
          var D = Math.abs(q.position().top);
          n.mCustomScrollbar("scrollTo", D, {
            scrollInertia: 0,
            trigger: "internal"
          })
        } else {
          if (z > f && n.data("horizontalScroll")) {
            y.css("display", "block");
            var h = o.width();
            if (n.data("autoDraggerLength")) {
              var j = Math.round(f / z * h),
                C = m.data("minDraggerWidth");
              if (j <= C) {
                m.css({
                  width: C
                })
              } else {
                if (j >= h - 10) {
                  var e = h - 10;
                  m.css({
                    width: e
                  })
                } else {
                  m.css({
                    width: j
                  })
                }
              }
            }
            var v = m.width(),
              x = (z - f) / (h - v);
            n.data("scrollAmount", x).mCustomScrollbar("scrolling", k, q, o, m, w, g, A, t);
            var D = Math.abs(q.position().left);
            n.mCustomScrollbar("scrollTo", D, {
              scrollInertia: 0,
              trigger: "internal"
            })
          } else {
            k.unbind("mousewheel focusin");
            if (n.data("horizontalScroll")) {
              m.add(q).css("left", 0)
            } else {
              m.add(q).css("top", 0)
            }
            y.css("display", "none");
            q.addClass("mCS_no_scrollbar");
            n.data({
              bindEvent_mousewheel: false,
              bindEvent_focusin: false
            })
          }
        }
      },
      scrolling: function(h, p, m, j, w, e, A, v) {
        var k = c(this);
        if (!k.data("bindEvent_scrollbar_drag")) {
          var n, o;
          if (c.support.msPointer) {
            j.bind("MSPointerDown", function(H) {
              H.preventDefault();
              k.data({
                on_drag: true
              });
              j.addClass("mCSB_dragger_onDrag");
              var G = c(this),
                J = G.offset(),
                F = H.originalEvent.pageX - J.left,
                I = H.originalEvent.pageY - J.top;
              if (F < G.width() && F > 0 && I < G.height() && I > 0) {
                n = I;
                o = F
              }
            });
            c(document).bind("MSPointerMove." + k.data("mCustomScrollbarIndex"), function(H) {
              H.preventDefault();
              if (k.data("on_drag")) {
                var G = j,
                  J = G.offset(),
                  F = H.originalEvent.pageX - J.left,
                  I = H.originalEvent.pageY - J.top;
                D(n, o, I, F)
              }
            }).bind("MSPointerUp." + k.data("mCustomScrollbarIndex"), function(x) {
              k.data({
                on_drag: false
              });
              j.removeClass("mCSB_dragger_onDrag")
            })
          } else {
            j.bind("mousedown touchstart", function(H) {
              H.preventDefault();
              H.stopImmediatePropagation();
              var G = c(this),
                K = G.offset(),
                F, J;
              if (H.type === "touchstart") {
                var I = H.originalEvent.touches[0] || H.originalEvent.changedTouches[0];
                F = I.pageX - K.left;
                J = I.pageY - K.top
              } else {
                k.data({
                  on_drag: true
                });
                j.addClass("mCSB_dragger_onDrag");
                F = H.pageX - K.left;
                J = H.pageY - K.top
              }
              if (F < G.width() && F > 0 && J < G.height() && J > 0) {
                n = J;
                o = F
              }
            }).bind("touchmove", function(H) {
              H.preventDefault();
              H.stopImmediatePropagation();
              var K = H.originalEvent.touches[0] || H.originalEvent.changedTouches[0],
                G = c(this),
                J = G.offset(),
                F = K.pageX - J.left,
                I = K.pageY - J.top;
              D(n, o, I, F)
            });
            c(document).bind("mousemove." + k.data("mCustomScrollbarIndex"), function(H) {
              if (k.data("on_drag")) {
                var G = j,
                  J = G.offset(),
                  F = H.pageX - J.left,
                  I = H.pageY - J.top;
                D(n, o, I, F)
              }
            }).bind("mouseup." + k.data("mCustomScrollbarIndex"), function(x) {
              k.data({
                on_drag: false
              });
              j.removeClass("mCSB_dragger_onDrag")
            })
          }
          k.data({
            bindEvent_scrollbar_drag: true
          })
        }

        function D(G, H, I, F) {
          if (k.data("horizontalScroll")) {
            k.mCustomScrollbar("scrollTo", (j.position().left - (H)) + F, {
              moveDragger: true,
              trigger: "internal"
            })
          } else {
            k.mCustomScrollbar("scrollTo", (j.position().top - (G)) + I, {
              moveDragger: true,
              trigger: "internal"
            })
          }
        }
        if (c.support.touch && k.data("contentTouchScroll")) {
          if (!k.data("bindEvent_content_touch")) {
            var l, B, r, s, u, C, E;
            p.bind("touchstart", function(x) {
              x.stopImmediatePropagation();
              l = x.originalEvent.touches[0] || x.originalEvent.changedTouches[0];
              B = c(this);
              r = B.offset();
              u = l.pageX - r.left;
              s = l.pageY - r.top;
              C = s;
              E = u
            });
            p.bind("touchmove", function(x) {
              x.preventDefault();
              x.stopImmediatePropagation();
              l = x.originalEvent.touches[0] || x.originalEvent.changedTouches[0];
              B = c(this).parent();
              r = B.offset();
              u = l.pageX - r.left;
              s = l.pageY - r.top;
              if (k.data("horizontalScroll")) {
                k.mCustomScrollbar("scrollTo", E - u, {
                  trigger: "internal"
                })
              } else {
                k.mCustomScrollbar("scrollTo", C - s, {
                  trigger: "internal"
                })
              }
            })
          }
        }
        if (!k.data("bindEvent_scrollbar_click")) {
          m.bind("click", function(F) {
            var x = (F.pageY - m.offset().top) * k.data("scrollAmount"),
              y = c(F.target);
            if (k.data("horizontalScroll")) {
              x = (F.pageX - m.offset().left) * k.data("scrollAmount")
            }
            if (y.hasClass("mCSB_draggerContainer") || y.hasClass("mCSB_draggerRail")) {
              k.mCustomScrollbar("scrollTo", x, {
                trigger: "internal",
                scrollEasing: "draggerRailEase"
              })
            }
          });
          k.data({
            bindEvent_scrollbar_click: true
          })
        }
        if (k.data("mouseWheel")) {
          if (!k.data("bindEvent_mousewheel")) {
            h.bind("mousewheel", function(H, J) {
              var G, F = k.data("mouseWheelPixels"),
                x = Math.abs(p.position().top),
                I = j.position().top,
                y = m.height() - j.height();
              if (k.data("normalizeMouseWheelDelta")) {
                if (J < 0) {
                  J = -1
                } else {
                  J = 1
                }
              }
              if (F === "auto") {
                F = 100 + Math.round(k.data("scrollAmount") / 2)
              }
              if (k.data("horizontalScroll")) {
                I = j.position().left;
                y = m.width() - j.width();
                x = Math.abs(p.position().left)
              }
              if ((J > 0 && I !== 0) || (J < 0 && I !== y)) {
                H.preventDefault();
                H.stopImmediatePropagation()
              }
              G = x - (J * F);
              k.mCustomScrollbar("scrollTo", G, {
                trigger: "internal"
              })
            });
            k.data({
              bindEvent_mousewheel: true
            })
          }
        }
        if (k.data("scrollButtons_enable")) {
          if (k.data("scrollButtons_scrollType") === "pixels") {
            if (k.data("horizontalScroll")) {
              v.add(A).unbind("mousedown touchstart MSPointerDown mouseup MSPointerUp mouseout MSPointerOut touchend", i, g);
              k.data({
                bindEvent_buttonsContinuous_x: false
              });
              if (!k.data("bindEvent_buttonsPixels_x")) {
                v.bind("click", function(x) {
                  x.preventDefault();
                  q(Math.abs(p.position().left) + k.data("scrollButtons_scrollAmount"))
                });
                A.bind("click", function(x) {
                  x.preventDefault();
                  q(Math.abs(p.position().left) - k.data("scrollButtons_scrollAmount"))
                });
                k.data({
                  bindEvent_buttonsPixels_x: true
                })
              }
            } else {
              e.add(w).unbind("mousedown touchstart MSPointerDown mouseup MSPointerUp mouseout MSPointerOut touchend", i, g);
              k.data({
                bindEvent_buttonsContinuous_y: false
              });
              if (!k.data("bindEvent_buttonsPixels_y")) {
                e.bind("click", function(x) {
                  x.preventDefault();
                  q(Math.abs(p.position().top) + k.data("scrollButtons_scrollAmount"))
                });
                w.bind("click", function(x) {
                  x.preventDefault();
                  q(Math.abs(p.position().top) - k.data("scrollButtons_scrollAmount"))
                });
                k.data({
                  bindEvent_buttonsPixels_y: true
                })
              }
            }

            function q(x) {
              if (!j.data("preventAction")) {
                j.data("preventAction", true);
                k.mCustomScrollbar("scrollTo", x, {
                  trigger: "internal"
                })
              }
            }
          } else {
            if (k.data("horizontalScroll")) {
              v.add(A).unbind("click");
              k.data({
                bindEvent_buttonsPixels_x: false
              });
              if (!k.data("bindEvent_buttonsContinuous_x")) {
                v.bind("mousedown touchstart MSPointerDown", function(y) {
                  y.preventDefault();
                  var x = z();
                  k.data({
                    mCSB_buttonScrollRight: setInterval(function() {
                      k.mCustomScrollbar("scrollTo", Math.abs(p.position().left) + x, {
                        trigger: "internal",
                        scrollEasing: "easeOutCirc"
                      })
                    }, 17)
                  })
                });
                var i = function(x) {
                  x.preventDefault();
                  clearInterval(k.data("mCSB_buttonScrollRight"))
                };
                v.bind("mouseup touchend MSPointerUp mouseout MSPointerOut", i);
                A.bind("mousedown touchstart MSPointerDown", function(y) {
                  y.preventDefault();
                  var x = z();
                  k.data({
                    mCSB_buttonScrollLeft: setInterval(function() {
                      k.mCustomScrollbar("scrollTo", Math.abs(p.position().left) - x, {
                        trigger: "internal",
                        scrollEasing: "easeOutCirc"
                      })
                    }, 17)
                  })
                });
                var g = function(x) {
                  x.preventDefault();
                  clearInterval(k.data("mCSB_buttonScrollLeft"))
                };
                A.bind("mouseup touchend MSPointerUp mouseout MSPointerOut", g);
                k.data({
                  bindEvent_buttonsContinuous_x: true
                })
              }
            } else {
              e.add(w).unbind("click");
              k.data({
                bindEvent_buttonsPixels_y: false
              });
              if (!k.data("bindEvent_buttonsContinuous_y")) {
                e.bind("mousedown touchstart MSPointerDown", function(y) {
                  y.preventDefault();
                  var x = z();
                  k.data({
                    mCSB_buttonScrollDown: setInterval(function() {
                      k.mCustomScrollbar("scrollTo", Math.abs(p.position().top) + x, {
                        trigger: "internal",
                        scrollEasing: "easeOutCirc"
                      })
                    }, 17)
                  })
                });
                var t = function(x) {
                  x.preventDefault();
                  clearInterval(k.data("mCSB_buttonScrollDown"))
                };
                e.bind("mouseup touchend MSPointerUp mouseout MSPointerOut", t);
                w.bind("mousedown touchstart MSPointerDown", function(y) {
                  y.preventDefault();
                  var x = z();
                  k.data({
                    mCSB_buttonScrollUp: setInterval(function() {
                      k.mCustomScrollbar("scrollTo", Math.abs(p.position().top) - x, {
                        trigger: "internal",
                        scrollEasing: "easeOutCirc"
                      })
                    }, 17)
                  })
                });
                var f = function(x) {
                  x.preventDefault();
                  clearInterval(k.data("mCSB_buttonScrollUp"))
                };
                w.bind("mouseup touchend MSPointerUp mouseout MSPointerOut", f);
                k.data({
                  bindEvent_buttonsContinuous_y: true
                })
              }
            }

            function z() {
              var x = k.data("scrollButtons_scrollSpeed");
              if (k.data("scrollButtons_scrollSpeed") === "auto") {
                x = Math.round((k.data("scrollInertia") + 100) / 40)
              }
              return x
            }
          }
        }
        if (k.data("autoScrollOnFocus")) {
          if (!k.data("bindEvent_focusin")) {
            h.bind("focusin", function() {
              h.scrollTop(0).scrollLeft(0);
              var x = c(document.activeElement);
              if (x.is("input,textarea,select,button,a[tabindex],area,object")) {
                var G = p.position().top,
                  y = x.position().top,
                  F = h.height() - x.outerHeight();
                if (k.data("horizontalScroll")) {
                  G = p.position().left;
                  y = x.position().left;
                  F = h.width() - x.outerWidth()
                }
                if (G + y < 0 || G + y > F) {
                  k.mCustomScrollbar("scrollTo", y, {
                    trigger: "internal"
                  })
                }
              }
            });
            k.data({
              bindEvent_focusin: true
            })
          }
        }
        if (k.data("autoHideScrollbar")) {
          if (!k.data("bindEvent_autoHideScrollbar")) {
            h.bind("mouseenter", function(x) {
              h.addClass("mCS-mouse-over");
              d.showScrollbar.call(h.children(".mCSB_scrollTools"))
            }).bind("mouseleave touchend", function(x) {
              h.removeClass("mCS-mouse-over");
              if (x.type === "mouseleave") {
                d.hideScrollbar.call(h.children(".mCSB_scrollTools"))
              }
            });
            k.data({
              bindEvent_autoHideScrollbar: true
            })
          }
        }
      },
      scrollTo: function(e, f) {
        var i = c(this),
          o = {
            moveDragger: false,
            trigger: "external",
            callbacks: true,
            scrollInertia: i.data("scrollInertia"),
            scrollEasing: i.data("scrollEasing")
          },
          f = c.extend(o, f),
          p, g = i.children(".mCustomScrollBox"),
          k = g.children(".mCSB_container"),
          r = g.children(".mCSB_scrollTools"),
          j = r.children(".mCSB_draggerContainer"),
          h = j.children(".mCSB_dragger"),
          t = draggerSpeed = f.scrollInertia,
          q, s, m, l;
        if (!k.hasClass("mCS_no_scrollbar")) {
          i.data({
            mCS_trigger: f.trigger
          });
          if (i.data("mCS_Init")) {
            f.callbacks = false
          }
          if (e || e === 0) {
            if (typeof(e) === "number") {
              if (f.moveDragger) {
                p = e;
                if (i.data("horizontalScroll")) {
                  e = h.position().left * i.data("scrollAmount")
                } else {
                  e = h.position().top * i.data("scrollAmount")
                }
                draggerSpeed = 0
              } else {
                p = e / i.data("scrollAmount")
              }
            } else {
              if (typeof(e) === "string") {
                var v;
                if (e === "top") {
                  v = 0
                } else {
                  if (e === "bottom" && !i.data("horizontalScroll")) {
                    v = k.outerHeight() - g.height()
                  } else {
                    if (e === "left") {
                      v = 0
                    } else {
                      if (e === "right" && i.data("horizontalScroll")) {
                        v = k.outerWidth() - g.width()
                      } else {
                        if (e === "first") {
                          v = i.find(".mCSB_container").find(":first")
                        } else {
                          if (e === "last") {
                            v = i.find(".mCSB_container").find(":last")
                          } else {
                            v = i.find(e)
                          }
                        }
                      }
                    }
                  }
                }
                if (v.length === 1) {
                  if (i.data("horizontalScroll")) {
                    e = v.position().left
                  } else {
                    e = v.position().top
                  }
                  p = e / i.data("scrollAmount")
                } else {
                  p = e = v
                }
              }
            }
            if (i.data("horizontalScroll")) {
              if (i.data("onTotalScrollBack_Offset")) {
                s = -i.data("onTotalScrollBack_Offset")
              }
              if (i.data("onTotalScroll_Offset")) {
                l = g.width() - k.outerWidth() + i.data("onTotalScroll_Offset")
              }
              if (p < 0) {
                p = e = 0;
                clearInterval(i.data("mCSB_buttonScrollLeft"));
                if (!s) {
                  q = true
                }
              } else {
                if (p >= j.width() - h.width()) {
                  p = j.width() - h.width();
                  e = g.width() - k.outerWidth();
                  clearInterval(i.data("mCSB_buttonScrollRight"));
                  if (!l) {
                    m = true
                  }
                } else {
                  e = -e
                }
              }
              var n = i.data("snapAmount");
              if (n) {
                e = Math.round(e / n) * n - i.data("snapOffset")
              }
              d.mTweenAxis.call(this, h[0], "left", Math.round(p), draggerSpeed, f.scrollEasing);
              d.mTweenAxis.call(this, k[0], "left", Math.round(e), t, f.scrollEasing, {
                onStart: function() {
                  if (f.callbacks && !i.data("mCS_tweenRunning")) {
                    u("onScrollStart")
                  }
                  if (i.data("autoHideScrollbar")) {
                    d.showScrollbar.call(r)
                  }
                },
                onUpdate: function() {
                  if (f.callbacks) {
                    u("whileScrolling")
                  }
                },
                onComplete: function() {
                  if (f.callbacks) {
                    u("onScroll");
                    if (q || (s && k.position().left >= s)) {
                      u("onTotalScrollBack")
                    }
                    if (m || (l && k.position().left <= l)) {
                      u("onTotalScroll")
                    }
                  }
                  h.data("preventAction", false);
                  i.data("mCS_tweenRunning", false);
                  if (i.data("autoHideScrollbar")) {
                    if (!g.hasClass("mCS-mouse-over")) {
                      d.hideScrollbar.call(r)
                    }
                  }
                }
              })
            } else {
              if (i.data("onTotalScrollBack_Offset")) {
                s = -i.data("onTotalScrollBack_Offset")
              }
              if (i.data("onTotalScroll_Offset")) {
                l = g.height() - k.outerHeight() + i.data("onTotalScroll_Offset")
              }
              if (p < 0) {
                p = e = 0;
                clearInterval(i.data("mCSB_buttonScrollUp"));
                if (!s) {
                  q = true
                }
              } else {
                if (p >= j.height() - h.height()) {
                  p = j.height() - h.height();
                  e = g.height() - k.outerHeight();
                  clearInterval(i.data("mCSB_buttonScrollDown"));
                  if (!l) {
                    m = true
                  }
                } else {
                  e = -e
                }
              }
              var n = i.data("snapAmount");
              if (n) {
                e = Math.round(e / n) * n - i.data("snapOffset")
              }
              d.mTweenAxis.call(this, h[0], "top", Math.round(p), draggerSpeed, f.scrollEasing);
              d.mTweenAxis.call(this, k[0], "top", Math.round(e), t, f.scrollEasing, {
                onStart: function() {
                  if (f.callbacks && !i.data("mCS_tweenRunning")) {
                    u("onScrollStart")
                  }
                  if (i.data("autoHideScrollbar")) {
                    d.showScrollbar.call(r)
                  }
                },
                onUpdate: function() {
                  if (f.callbacks) {
                    u("whileScrolling")
                  }
                },
                onComplete: function() {
                  if (f.callbacks) {
                    u("onScroll");
                    if (q || (s && k.position().top >= s)) {
                      u("onTotalScrollBack")
                    }
                    if (m || (l && k.position().top <= l)) {
                      u("onTotalScroll")
                    }
                  }
                  h.data("preventAction", false);
                  i.data("mCS_tweenRunning", false);
                  if (i.data("autoHideScrollbar")) {
                    if (!g.hasClass("mCS-mouse-over")) {
                      d.hideScrollbar.call(r)
                    }
                  }
                }
              })
            }
            if (i.data("mCS_Init")) {
              i.data({
                mCS_Init: false
              })
            }
          }
        }

        function u(w) {
          this.mcs = {
            top: k.position().top,
            left: k.position().left,
            draggerTop: h.position().top,
            draggerLeft: h.position().left,
            topPct: Math.round((100 * Math.abs(k.position().top)) / Math.abs(k.outerHeight() - g.height())),
            leftPct: Math.round((100 * Math.abs(k.position().left)) / Math.abs(k.outerWidth() - g.width()))
          };
          switch (w) {
            case "onScrollStart":
              i.data("mCS_tweenRunning", true).data("onScrollStart_Callback").call(i, this.mcs);
              break;
            case "whileScrolling":
              i.data("whileScrolling_Callback").call(i, this.mcs);
              break;
            case "onScroll":
              i.data("onScroll_Callback").call(i, this.mcs);
              break;
            case "onTotalScrollBack":
              i.data("onTotalScrollBack_Callback").call(i, this.mcs);
              break;
            case "onTotalScroll":
              i.data("onTotalScroll_Callback").call(i, this.mcs);
              break
          }
        }
      },
      stop: function() {
        var g = c(this),
          e = g.children().children(".mCSB_container"),
          f = g.children().children().children().children(".mCSB_dragger");
        d.mTweenAxisStop.call(this, e[0]);
        d.mTweenAxisStop.call(this, f[0])
      },
      disable: function(e) {
        var j = c(this),
          f = j.children(".mCustomScrollBox"),
          h = f.children(".mCSB_container"),
          g = f.children(".mCSB_scrollTools"),
          i = g.children().children(".mCSB_dragger");
        f.unbind("mousewheel focusin mouseenter mouseleave touchend");
        h.unbind("touchstart touchmove");
        if (e) {
          if (j.data("horizontalScroll")) {
            i.add(h).css("left", 0)
          } else {
            i.add(h).css("top", 0)
          }
        }
        g.css("display", "none");
        h.addClass("mCS_no_scrollbar");
        j.data({
          bindEvent_mousewheel: false,
          bindEvent_focusin: false,
          bindEvent_content_touch: false,
          bindEvent_autoHideScrollbar: false
        }).addClass("mCS_disabled")
      },
      destroy: function() {
        var e = c(this);
        e.removeClass("mCustomScrollbar _mCS_" + e.data("mCustomScrollbarIndex")).addClass("mCS_destroyed").children().children(".mCSB_container").unwrap().children().unwrap().siblings(".mCSB_scrollTools").remove();
        c(document).unbind("mousemove." + e.data("mCustomScrollbarIndex") + " mouseup." + e.data("mCustomScrollbarIndex") + " MSPointerMove." + e.data("mCustomScrollbarIndex") + " MSPointerUp." + e.data("mCustomScrollbarIndex"));
        c(window).unbind("resize." + e.data("mCustomScrollbarIndex"))
      }
    },
    d = {
      showScrollbar: function() {
        this.stop().animate({
          opacity: 1
        }, "fast")
      },
      hideScrollbar: function() {
        this.stop().animate({
          opacity: 0
        }, "fast")
      },
      mTweenAxis: function(g, i, h, f, o, y) {
        var y = y || {},
          v = y.onStart || function() {},
          p = y.onUpdate || function() {},
          w = y.onComplete || function() {};
        var n = t(),
          l, j = 0,
          r = g.offsetTop,
          s = g.style;
        if (i === "left") {
          r = g.offsetLeft
        }
        var m = h - r;
        q();
        e();

        function t() {
          if (window.performance && window.performance.now) {
            return window.performance.now()
          } else {
            if (window.performance && window.performance.webkitNow) {
              return window.performance.webkitNow()
            } else {
              if (Date.now) {
                return Date.now()
              } else {
                return new Date().getTime()
              }
            }
          }
        }

        function x() {
          if (!j) {
            v.call()
          }
          j = t() - n;
          u();
          if (j >= g._time) {
            g._time = (j > g._time) ? j + l - (j - g._time) : j + l - 1;
            if (g._time < j + 1) {
              g._time = j + 1
            }
          }
          if (g._time < f) {
            g._id = _request(x)
          } else {
            w.call()
          }
        }

        function u() {
          if (f > 0) {
            g.currVal = k(g._time, r, m, f, o);
            s[i] = Math.round(g.currVal) + "px"
          } else {
            s[i] = h + "px"
          }
          p.call()
        }

        function e() {
          l = 1000 / 60;
          g._time = j + l;
          _request = (!window.requestAnimationFrame) ? function(z) {
            u();
            return setTimeout(z, 0.01)
          } : window.requestAnimationFrame;
          g._id = _request(x)
        }

        function q() {
          if (g._id == null) {
            return
          }
          if (!window.requestAnimationFrame) {
            clearTimeout(g._id)
          } else {
            window.cancelAnimationFrame(g._id)
          }
          g._id = null
        }

        function k(B, A, F, E, C) {
          switch (C) {
            case "linear":
              return F * B / E + A;
              break;
            case "easeOutQuad":
              B /= E;
              return -F * B * (B - 2) + A;
              break;
            case "easeInOutQuad":
              B /= E / 2;
              if (B < 1) {
                return F / 2 * B * B + A
              }
              B--;
              return -F / 2 * (B * (B - 2) - 1) + A;
              break;
            case "easeOutCubic":
              B /= E;
              B--;
              return F * (B * B * B + 1) + A;
              break;
            case "easeOutQuart":
              B /= E;
              B--;
              return -F * (B * B * B * B - 1) + A;
              break;
            case "easeOutQuint":
              B /= E;
              B--;
              return F * (B * B * B * B * B + 1) + A;
              break;
            case "easeOutCirc":
              B /= E;
              B--;
              return F * Math.sqrt(1 - B * B) + A;
              break;
            case "easeOutSine":
              return F * Math.sin(B / E * (Math.PI / 2)) + A;
              break;
            case "easeOutExpo":
              return F * (-Math.pow(2, -10 * B / E) + 1) + A;
              break;
            case "mcsEaseOut":
              var D = (B /= E) * B,
                z = D * B;
              return A + F * (0.499999999999997 * z * D + -2.5 * D * D + 5.5 * z + -6.5 * D + 4 * B);
              break;
            case "draggerRailEase":
              B /= E / 2;
              if (B < 1) {
                return F / 2 * B * B * B + A
              }
              B -= 2;
              return F / 2 * (B * B * B + 2) + A;
              break
          }
        }
      },
      mTweenAxisStop: function(e) {
        if (e._id == null) {
          return
        }
        if (!window.requestAnimationFrame) {
          clearTimeout(e._id)
        } else {
          window.cancelAnimationFrame(e._id)
        }
        e._id = null
      },
      rafPolyfill: function() {
        var f = ["ms", "moz", "webkit", "o"],
          e = f.length;
        while (--e > -1 && !window.requestAnimationFrame) {
          window.requestAnimationFrame = window[f[e] + "RequestAnimationFrame"];
          window.cancelAnimationFrame = window[f[e] + "CancelAnimationFrame"] || window[f[e] + "CancelRequestAnimationFrame"]
        }
      }
    };
  d.rafPolyfill.call();
  c.support.touch = !!("ontouchstart" in window);
  c.support.msPointer = window.navigator.msPointerEnabled;
  var a = ("https:" == document.location.protocol) ? "https:" : "http:";
  c.event.special.mousewheel || document.write('<script src="' + a + '//cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.0.6/jquery.mousewheel.min.js"><\/script>');
  c.fn.mCustomScrollbar = function(e) {
    if (b[e]) {
      return b[e].apply(this, Array.prototype.slice.call(arguments, 1))
    } else {
      if (typeof e === "object" || !e) {
        return b.init.apply(this, arguments)
      } else {
        c.error("Method " + e + " does not exist")
      }
    }
  }
})(jQuery);