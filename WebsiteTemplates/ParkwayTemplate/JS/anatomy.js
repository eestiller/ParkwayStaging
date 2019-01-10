$(document).ready(function(){
	var original_width = 0;
	var original_height = 0;
	$(".magnify").mousemove(function(e){
		if(!original_width && !original_height){
			var image_obj = new Image();
			image_obj.src = $(".scan-small").attr("src");
			original_width = image_obj.width;
			original_height = image_obj.height;
		}else{
			var magnify_offset = $(this).offset();
			var mx = e.pageX - magnify_offset.left;
			var my = e.pageY - magnify_offset.top;
			if(my >= 10 && my <= 60){
				// $('.anatomy-panel').hide();
				// $('#zone1').show();					
			}else if(my >= 130 && my <= 150){
				$('.anatomy-panel').hide();
				$('#zone2').show();	
			}else if(my >= 190 && my <= 210){
				$('.anatomy-panel').hide();
				$('#zone3').show();	
			}else if(my >= 240 && my <= 260){
				$('.anatomy-panel').hide();
				$('#zone4').show();	
			}
			if(mx < $(this).width() && my < $(this).height() && mx > 0 && my > 0){
				$(".scan-large").fadeIn(100);
			}else{
				$(".scan-large").fadeOut(100);
			}
			if($(".scan-large").is(":visible")){
				var rx = Math.round(mx/$(".scan-small").width()*original_width - $(".scan-large").width()/2)*-1;
				var ry = Math.round(my/$(".scan-small").height()*original_height - $(".scan-large").height()/2)*-1;
				var bgp = rx + "px " + ry + "px";
				var px = mx - $(".scan-large").width()/2;
				var py = my - $(".scan-large").height()/2;
				$(".scan-large").css({left: px, top: py, backgroundPosition: bgp});
			}
		}
	});
	$('.anatomy-item').on('click','.anatomy-label',function(){
		$(this).parent().toggleClass('active');
		$('.anatomy-overlay').toggleClass('open');
	});
});