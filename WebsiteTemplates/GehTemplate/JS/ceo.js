function showthankpopup(){$.fancybox({href:"#thankyouPop",bottom:0,leftRatio:1,autoSize:!0,closeBtn:!0,scrolling:"no",autoCenter:!1,helpers:{overlay:{locked:!1,css:{background:"transparent"}}},iframe:{preload:!0},afterShow:function(){$(".fancybox-wrap").addClass("rightside")}})}function showpopup(){var a,b,c;$(window).width()<767?(a="auto",b=!0,c=!0):(a=400,b=!1,c=!1),$.fancybox({href:"#contact",bottom:0,leftRatio:1,autoSize:b,width:a,height:"auto",fitToView:c,closeBtn:!0,autoCenter:!1,helpers:{overlay:{locked:!1,css:{background:"transparent"},closeClick:!1}},afterShow:function(){$("html").addClass("popup-mode"),$(".fancybox-wrap").addClass("rightside"),$(".fancybox-wrap").addClass("actionClose"),$(".fancybox-overlay").addClass("hidden-index"),$(".actionClose .fancybox-close").click(function(a){a.stopPropagation(),a.preventDefault(),sessionStorage.setItem("popupshow","hide"),$("html").removeClass("popup-mode")})}})}function initFormHTML(){var a='<div id="contact" class="contact-popup" style="display:none"><div name="formContact" id="formContact"><h2 class="head-line">Questions on Heart Health?</h2><h3 class="sub-text">Leave us your contact details and we will get back to you.</h3><div class="row form-group"> <label class="col-md-4">Name:</label><div class="col-md-8"> <input id="txtRightName" name="name" value="" class="form-control"  /><div id="errRightName" class="error" style="display:none;">Please Enter Name</div></div></div><div class="row form-group"> <label class="col-md-4">Email:</label><div class="col-md-8"> <input id="txtRightEmail" name="email"  value="" class="form-control"><div id="errRightEmail" class="error" style="display:none;">Please Enter Valid Email</div><div id="invRightEmail" class="error" style="display:none;">Please Enter Valid Email</div></div></div><div class="row form-group"> <label class="col-md-4">Telephone No.:</label><div class="col-md-8"> <input id="txtRightTel" name="contact" class="form-control" value=""   /><div id="errRightTel" class="error" style="display:none;">Please Enter Valid Telephone No.</div></div></div><div class="row form-group"> <input class="btn btn-primary full-btn" id="btnSendMail" type="button" value="Submit" name="Button" />  </div></div></div>';$("body").append(a)}function initThankyouHTML(){var a='<div id="thankyouPop" class="thank-popup" style="display:none"><p class="thank-message">Thank you for your submission. We will contact you to follow up with your query.</p></div>';$("body").append(a)}function validateForm(){var a=!0,b=$("#txtRightName").val(),c=b.trim(),d=$("#txtRightEmail").val(),e=d.trim(),f=$("#txtRightTel").val(),g=f.trim();return null==c||""==c?($("#errRightName").show(),a=!1):$("#errRightName").hide(),null==e||""==e?($("#errRightEmail").show(),a=!1):0==validEmail(e)?($("#errRightEmail").show(),a=!1):$("#errRightEmail").hide(),IsNumeric(g)&&""!=g?$("#errRightTel").hide():($("#errRightTel").show(),a=!1),a}function validateName(){var a=!0;null==$("#txtRightName").val()||""==$("#txtRightName").val()?($("#errRightName").show(),a=!1):$("#errRightName").hide()}function validEmail(a){var b=/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;return b.test(a)}function validateEmail(){var a=!0;if(null==$("#txtRightEmail").val()||""==$("#txtRightEmail").val())$("#errRightEmail").show(),a=!1;else{var b=$("#txtRightEmail").val();0==validEmail(b)?($("#errRightEmail").show(),a=!1):$("#errRightEmail").hide()}return a}function validateTel(){IsNumeric($("#txtRightTel").val())?$("#errRightTel").hide():$("#errRightTel").show()}function IsNumeric(a){var c,b="0123456789.-",d=!0;if(0==a.length)return!1;for(i=0;i<a.length&&1==d;i++)c=a.charAt(i),b.indexOf(c)==-1&&(d=!1);return d}var scroll=!1,cookieHideCEOPopup=null,cookieSubmittedCEOPopup=null,show=!1,windowwidth=$(window).width(),widgetFixedMenu=$(".widget-fixed-menu"),topEl=widgetFixedMenu.offset().top;$(document).ready(function(a){!isMobile()&&windowwidth>992&&a("#widgetMenu .widget-menu-child").addClass("show"),a("#widgetMenu .widget-ico-menu-desktop").on("click",function(b){a("html").toggleClass("show-menu-widget"),b.stopPropagation(),b.preventDefault(),a(this).parent().find(".widget-menu-child").toggleClass("show")}),a("#widgetMenu .widget-ico-menu").on("click",function(b){a("html").toggleClass("show-menu-widget"),b.stopPropagation(),b.preventDefault(),a(this).parent().find(".widget-menu-child").toggleClass("show"),parseInt(widgetFixedMenu.css("top"))>0&&widgetFixedMenu.removeAttr("style"),isMobile()&&widgetFixedMenu.hasClass("show")&&widgetFixedMenu.css({top:"0px",position:"fixed"})}),a(".widget-menu-child").hasClass("show")&&(a("html").hasClass("show-menu-widget")||a("html").addClass("show-menu-widget")),a("#widgetMenu .has-sub > a").on("click",function(b){var c=a(this).parents(".widget-menu-child");b.stopPropagation(),a(this).parent().siblings().hasClass("open")&&a(this).parent().siblings().removeClass("open"),a(this).parent().toggleClass("open"),a(window).height()<700&&(c.css({overflow:"scroll",height:"auto"}),c.height()>500?c.css({overflow:"scroll",height:"550"}):c.css({overflow:"auto",height:"auto"}))}),windowwidth>=768?a(".fb-hearthealth").fancybox({transitionIn:"elastic",transitionOut:"elastic",speedIn:600,speedOut:200,overlayShow:!1}):a(".fb-hearthealth").on("click",function(a){a.preventDefault()}),a(".scrollto").on("click",function(){return a("body, html").animate({scrollTop:a(".scrollcontent").offset().top},1),!1})}),$(window).resize(function(){$(".widget-menu-child").hasClass("show")&&($("html").hasClass("show-menu-widget")||$("html").addClass("show-menu-widget"));var a=null;$(".widget-menu-child").hasClass("show")&&(clearTimeout(a),a=setTimeout(function(){$(window).width()<992||$(window).scrollTop()>topEl?widgetFixedMenu.css({position:"fixed",top:0}):widgetFixedMenu.css({position:"absolute",top:50})},300))}),$(window).scroll(function(a){$(this).scrollTop()>topEl?(widgetFixedMenu.css({position:"fixed",top:0}),scroll=!0):(widgetFixedMenu.css({position:"absolute",top:50}),scroll=!1);$(document).height(),$(window).height()+$(window).scrollTop();if($(".showpopup").length>0&&$(window).scrollTop()+$(window).height()>=$(document).height()){var d=checkCookie("c_ceoMailForm");null!=d||"hide"==sessionStorage.getItem("popupshow")||$("html").hasClass("popup-mode")||(0==$("#contact").length&&initFormHTML(),showpopup())}!isMobile()&&windowwidth>992&&($("#widgetMenu .widget-menu-child").removeClass("show"),$("html").removeClass("show-menu-widget"))}),$(window).load(function(){if($(".showpopup").length>0){initFormHTML(),initThankyouHTML();$("body").on("click","#btnSendMail",function(){if(validateForm()){var a={Email:$("#txtRightEmail").val(),Name:$("#txtRightName").val(),ContactNumber:$("#txtRightTel").val()};$.fancybox.close(),addCookie("c_ceoMailForm",!0,"30"),showthankpopup(),$.post("/api/AppointmentApi/SendMailHeartHealth",a,function(a){a.Result?show=!0:alert(a.Message)})}})}});