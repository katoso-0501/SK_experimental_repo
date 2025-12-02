// JavaScript Document

$(function() {
	'use strict';
	var showFlag = false;
	var pagetop = $('#pagetop');
	pagetop.css({'bottom':'-120px','position':'fixed'});
	pagetop.hide();
	$(window).scroll(function () {
		if ($(this).scrollTop() > 100) {
			if (showFlag === false) {
				showFlag = true;pagetop.stop().animate({'bottom':'5px'},200);
			}
		}else{
			if(showFlag){showFlag = false;pagetop.stop().animate({'bottom' : '-120px'}, 200);
		}
	}
});
pagetop.click(function () {
	$('body,html').animate({
		scrollTop: 0}, 500);return false;
	});
});
$('.menu-trigger').on('click',function(){
	'use strict';
	$('.smp-menu').fadeToggle(200);
});