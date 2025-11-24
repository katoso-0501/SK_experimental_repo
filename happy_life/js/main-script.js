// Change window-width value by resizing
var window_width = $('body').innerWidth(),scroll_height = 0;
$(document).on('scroll',function(){
	'use strict';
	window_width = $('body').innerWidth();
	scroll_height = $(document).scrollTop();
});
// Assign smartphone menu
var d=$('#smp-menu');
$(d).on('click',function(){"use strict";$('header nav').slideToggle(350,'swing');$(this).toggleClass('hamachong');});
// Assign Go-to-top Button on footer 
var d=$('#go-to-top a');

$(d).removeAttr('href');
$(d).css('cursor','pointer');

$(d).on('click',function(){
	"use strict";
	$(d).css({'transition':'none'});
	$(d).animate({'top':'-2500px'},600,function(){
		$(d).css({'opacity':0});
		$('body,html').animate({'scrollTop':0},600,function(){
			$(d).removeAttr('style');
			$(d).css('cursor','pointer');
		});
	});
});


$('#opener-to-secret-link').on('click',function(){
	'use strict';
	$('#secret-link').fadeToggle(500);
});