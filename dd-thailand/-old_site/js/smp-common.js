// JavaScript Document
var RTPcount = 0;
$(document).ready(function(){
	'use strict';
	$(".smp-menu").hide();
});
$('.smp-menu-btn').on('click',function(){
	'use strict';
	$(".smp-menu").slideDown(300);
	return false;
});
$('.smp-menu-close a').on('click',function(){
	'use strict';
	$(".smp-menu").slideUp(300);
	return false;
});
$('.goTopOfPage').on('click',function(){
	'use strict';
	RTPcount++;
	$('body,html').animate({'scrollTop':0},500);
	if(RTPcount>=255){
		emergencyWarning();
	}
	return false;
});
function emergencyWarning(){
	'use strict';
	$('header,#main-content,footer').remove();
	$('body').html('<div style="position:relative;padding:50% 0;" class="blinker"><h1 style="color:red; text-align:center;">EMERGENCY<br>WARNING</h1></div>');
	var c = $('body');
	var b = 0;
	setInterval(function(){
		switch(b){
		case 0:
			$(c).css({background:'#0000ff'});
			b=1;
				break;
		case 1:
			$(c).css({background:'#000000'});
			b=0;
		}
	},355);
}