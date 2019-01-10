(function(e,t,n){var r=e["jQuery"]||e["Zepto"]||e["ender"]||e["elo"];if(typeof module!="undefined"&&module["exports"]){module["exports"]=n(r)}else{e[t]=n(r)}})(this,"Response",function(e){function V(e){throw new TypeError(e?i+"."+e:i)}function $(e){return typeof e=="number"&&e===e}function J(e){return typeof e=="string"?G(e.split(" ")):g(e)?G(e):[]}function K(e,t,n){if(null==e){return e}var r=0,i=e.length;while(r<i){t.call(n||e[r],e[r],r++,e)}return e}function Q(e,t,n){var r=[],i=e.length,s=0,o;t=t||"";n=n||"";while(s<i){o=e[s++];null==o||r.push(t+o+n)}return r}function G(e,t,n){var r,i=0,s=0,o,u=[],a,f=typeof t=="function";if(!e){return u}n=(a=true===n)?null:n;for(r=e.length;s<r;s++){o=e[s];a===!(f?t.call(n,o,s,e):t?typeof o===t:o)&&(u[i++]=o)}return u}function Y(e,t){var n,r;if(!e||!t){return e}if(typeof t!="function"&&$(r=t.length)){for(n=0;n<r;n++){void 0===t[n]||(e[n]=t[n])}e.length>n||(e.length=n)}else{for(n in t){p.call(t,n)&&void 0!==t[n]&&(e[n]=t[n])}}return e}function Z(e,t,n){if(null==e){return e}if(typeof e=="object"&&!e.nodeType&&$(e.length)){K(e,t,n)}else{t.call(n||e,e)}return e}function et(e){return function(t,n){var r=e();t=r>=(t||0);return n?t&&r<=n:t}}function tt(e){var t=u.devicePixelRatio;if(null==e){return t||(tt(2)?2:tt(1.5)?1.5:tt(1)?1:0)}if(!isFinite(e)){return false}if(t&&t>0){return t>=e}e="only all and (min--moz-device-pixel-ratio:"+e+")";if(z(e).matches){return true}return!!z(e.replace("-moz-","")).matches}function nt(e){return e.replace(F,"$1").replace(j,function(e,t){return t.toUpperCase()})}function rt(e){return"data-"+(e?e.replace(F,"$1").replace(B,"$1-$2").toLowerCase():e)}function it(e){var t;return!e||typeof e!="string"?e:"true"===e?true:"false"===e?false:"undefined"===e?t:"null"===e?null:(t=parseFloat(e))===+t?t:e}function st(e){return!e?false:e.nodeType===1?e:e[0]&&e[0].nodeType===1?e[0]:false}function ot(e,t){var n=arguments.length,r=st(this),i={},s=false,o;if(n){if(g(e)){s=true;e=e[0]}if(typeof e==="string"){e=rt(e);if(1===n){i=r.getAttribute(e);return s?it(i):i}if(this===r||2>(o=this.length||1)){r.setAttribute(e,t)}else{while(o--){if(o in this){ot.apply(this[o],arguments)}}}}else if(e instanceof Object){for(o in e){e.hasOwnProperty(o)&&ot.call(this,o,e[o])}}return this}if(r.dataset&&DOMStringMap){return r.dataset}K(r.attributes,function(e){if(e&&(o=String(e.name).match(F))){i[nt(o[1])]=e.value}});return i}function ut(e){if(this&&typeof e==="string"){e=J(e);Z(this,function(t){K(e,function(e){if(e){t.removeAttribute(rt(e))}})})}return this}function at(e,t,n){return ot.apply(e,d.call(arguments,1))}function ft(e,t){return ut.call(e,t)}function lt(e){var t,n=[],r=0,i=e.length;while(r<i){(t=e[r++])&&n.push("["+rt(t.replace(H,"").replace(".","\\."))+"]")}return n.join()}function ct(t){return e(lt(J(t)))}function ht(){return window.pageXOffset||f.scrollLeft}function pt(){return window.pageYOffset||f.scrollTop}function dt(e,t){var n=e.getBoundingClientRect?e.getBoundingClientRect():{};t=typeof t=="number"?t||0:0;return{top:(n.top||0)-t,left:(n.left||0)-t,bottom:(n.bottom||0)+t,right:(n.right||0)+t}}function vt(e,t){var n=dt(st(e),t);return!!n&&n.right>=0&&n.left<=W()}function mt(e,t){var n=dt(st(e),t);return!!n&&n.bottom>=0&&n.top<=X()}function gt(e,t){var n=dt(st(e),t);return!!n&&n.bottom>=0&&n.top<=X()&&n.right>=0&&n.left<=W()}function yt(e){var t={img:1,input:1,source:3,embed:3,track:3,iframe:5,audio:5,video:5,script:5},n=t[e.nodeName.toLowerCase()]||-1;return 4>n?n:null!=e.getAttribute("src")?5:-5}function bt(e,t,r){var i;if(!e||null==t){V("store")}r=typeof r=="string"&&r;Z(e,function(e){if(r){i=e.getAttribute(r)}else if(0<yt(e)){i=e.getAttribute("src")}else{i=e.innerHTML}null==i?ft(e,t):at(e,t,i)});return n}function wt(e,t){var n=[];e&&t&&K(J(t),function(t,r){n.push(at(e,t))},e);return n}function Et(e,t){if(typeof e=="string"&&typeof t=="function"){T[e]=t;N[e]=1}return n}function St(e){c.on("resize",e);return n}function xt(e,t){var r,i,s=R.crossover;if(typeof e=="function"){r=t;t=e;e=r}i=e?""+e+s:s;c.on(i,t);return n}function Tt(e){Z(e,function(e){l(e);St(e)});return n}function Nt(e){Z(e,function(e){typeof e=="object"||V("create @args");var t=I(w).configure(e),n,r=t.verge,i=t.breakpoints,s=q("scroll"),o=q("resize");if(!i.length){return}n=i[0]||i[1]||false;l(function(){function u(){t.reset();K(t.$e,function(e,n){t[n].decideValue().updateDOM()}).trigger(e)}function a(){K(t.$e,function(e,n){if(gt(t[n].$e,r)){t[n].updateDOM()}})}var e=R.allLoaded,i=!!t.lazy;K(t.target().$e,function(e,n){t[n]=I(t).prepareData(e);if(!i||gt(t[n].$e,r)){t[n].updateDOM()}});if(t.dynamic&&(t.custom||n<O)){St(u,o)}if(!i){return}c.on(s,a);t.$e.one(e,function(){c.off(s,a)})})});return n}function Ct(e){if(r[i]===n){r[i]=s}if(typeof e=="function"){e.call(r,n)}return n}function kt(e,t,r){K(["inX","inY","inViewport"],function(i){(r||!t[i])&&(t[i]=function(t,r){return e(G(this,function(e){return!!e&&!r===n[i](e,t)}))})})}function Lt(e,t){if(typeof e=="function"&&e.fn){if(t||void 0===e.fn.dataset){e.fn.dataset=ot}if(t||void 0===e.fn.deletes){e.fn.deletes=ut}kt(e,e.fn,t)}return n}function At(t,n){t=arguments.length?t:e;return Lt(t,n)}if(typeof e!="function"){try{console.log("Response was unable to run due to missing dependency.")}catch(t){}}var n,r=this,i="Response",s=r[i],o="init"+i,u=window,a=document,f=a.documentElement,l=e.domReady||e,c=e(u),h=u.screen,p={}.hasOwnProperty,d=[].slice,v=[].concat,m=[].map,g=Array.isArray||function(e){return e instanceof Array},y=m?function(e,t,n){return m.call(e,t,n)}:function(e,t,n){var r,i=e.length,s=[];for(r=0;r<i;r++){r in e&&(s[r]=t.call(n,e[r],r,e))}return s},b={width:[0,320,481,641,961,1025,1281],height:[0,481],ratio:[1,1.5,2]},w,E,S,x={},T={},N={},C={all:[]},k=1,L=h.width,A=h.height,O=L>A?L:A,M=L+A-O,_=function(){return L},D=function(){return A},P=/[^a-z0-9_\-\.]/gi,H=/^[\W\s]+|[\W\s]+$|/g,B=/([a-z])([A-Z])/g,j=/-(.)/g,F=/^data-(.+)$/,I=Object.create||function(e){function t(){}t.prototype=e;return new t},q=function(e,t){t=t||i;return e.replace(H,"")+"."+t.replace(H,"")},R={allLoaded:q("allLoaded"),crossover:q("crossover")},U=u.matchMedia||u.msMatchMedia,z=U||function(){return{}},W=function(e,t,n){var r=t["clientWidth"],i=e["innerWidth"];return n&&r<i&&true===n("(min-width:"+i+"px)")["matches"]?function(){return e["innerWidth"]}:function(){return t["clientWidth"]}}(u,f,U),X=function(e,t,n){var r=t["clientHeight"],i=e["innerHeight"];return n&&r<i&&true===n("(min-height:"+i+"px)")["matches"]?function(){return e["innerHeight"]}:function(){return t["clientHeight"]}}(u,f,U);E=et(W);S=et(X);x.band=et(_);x.wave=et(D);w=function(){function r(e){return typeof e=="string"?e.toLowerCase().replace(P,""):""}var t=R.crossover,n=Math.min;return{$e:0,mode:0,breakpoints:null,prefix:null,prop:"width",keys:[],dynamic:null,custom:0,values:[],fn:0,verge:null,newValue:0,currValue:1,aka:null,lazy:null,i:0,uid:null,reset:function(){var e=this.breakpoints,n=e.length,r=0;while(!r&&n--){this.fn(e[n])&&(r=n)}if(r!==this.i){c.trigger(t).trigger(this.prop+t);this.i=r||0}return this},configure:function(e){Y(this,e);var t,i,s,o,u=true,a,f=this.prop;this.uid=k++;this.verge=isFinite(this.verge)?this.verge:n(O,500);this.fn=T[f]||V("create @fn");if(typeof this.dynamic!="boolean"){this.dynamic=!!("device"!==f.substring(0,6))}this.custom=N[f];i=this.prefix?G(y(J(this.prefix),r)):["min-"+f+"-"];s=1<i.length?i.slice(1):0;this.prefix=i[0];a=this.breakpoints;if(g(a)){K(a,function(e){if(!e&&e!==0){throw"invalid breakpoint"}u=u&&isFinite(e)});a=u?a.sort(function(e,t){return e-t}):a;a.length||V("create @breakpoints")}else{a=b[f]||b[f.split("-").pop()]||V("create @prop")}this.breakpoints=u?G(a,function(e){return e<=O}):a;this.keys=Q(this.breakpoints,this.prefix);this.aka=null;if(s){o=[];t=s.length;while(t--){o.push(Q(this.breakpoints,s[t]))}this.aka=o;this.keys=v.apply(this.keys,o)}C.all=C.all.concat(C[this.uid]=this.keys);return this},target:function(){this.$e=e(lt(C[this.uid]));bt(this.$e,o);this.keys.push(o);return this},decideValue:function(){var e=null,t=this.breakpoints,n=t.length,r=n;while(e==null&&r--){this.fn(t[r])&&(e=this.values[r])}this.newValue=typeof e==="string"?e:this.values[n];return this},prepareData:function(t){this.$e=e(t);this.mode=yt(t);this.values=wt(this.$e,this.keys);if(this.aka){var n=this.aka.length;while(n--){this.values=Y(this.values,wt(this.$e,this.aka[n]))}}return this.decideValue()},updateDOM:function(){if(this.currValue===this.newValue){return this}this.currValue=this.newValue;if(0<this.mode){this.$e[0].setAttribute("src",this.newValue)}else if(null==this.newValue){this.$e.empty&&this.$e.empty()}else{if(this.$e.html){this.$e.html(this.newValue)}else{this.$e.empty&&this.$e.empty();this.$e[0].innerHTML=this.newValue}}return this}}}();T["width"]=E;T["height"]=S;T["device-width"]=x.band;T["device-height"]=x.wave;T["device-pixel-ratio"]=tt;n={deviceMin:function(){return M},deviceMax:function(){return O},noConflict:Ct,chain:At,bridge:Lt,create:Nt,addTest:Et,datatize:rt,camelize:nt,render:it,store:bt,access:wt,target:ct,object:I,crossover:xt,action:Tt,resize:St,ready:l,affix:Q,sift:G,dpr:tt,deletes:ft,scrollX:ht,scrollY:pt,deviceW:_,deviceH:D,device:x,inX:vt,inY:mt,route:Z,merge:Y,media:z,wave:S,band:E,map:y,each:K,inViewport:gt,dataset:at,viewportH:X,viewportW:W};l(function(){var t,n=at(a.body,"responsejs");if(n){t=!!u.JSON&&JSON.parse;if(t){n=t(n)}else if(e.parseJSON){n=e.parseJSON(n)}n&&n.create&&Nt(n.create)}f.className=f.className.replace(/(^|\s)(no-)?responsejs(\s|$)/,"$1$3")+" responsejs "});return n})