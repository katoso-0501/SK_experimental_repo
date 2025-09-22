// JavaScript Document
$(document).ready(function(){
	'use strict';
	console.log('Done Loading!');
	$('.smp-menu').hide();
});
$('.smp-menu-btn').on('click',function(){
	'use strict';
	smartphoneMenu(0);
	return false;
});
$('.smp-menu-close').on('click',function(){
	'use strict';
	smartphoneMenu(1);
	return false;
});
$(document).on('scroll',function(){
	'use strict';
	var a = $('body,html').innerWidth();
	if(a>960){
		$('.smp-menu').hide();
	}
});
function smartphoneMenu(act){
	'use strict';
	if(act===0){
		$('.smp-menu').show();
		$('.smp-menu .contents').css('right','-256px');
		$('.smp-menu .contents').animate({'right':0},300);
	}
	if(act===1){
		$('.smp-menu .contents').css('right','0');
		$('.smp-menu .contents').animate({'right':'-256px'},300,function(){
			$('.smp-menu').hide();
		});
	}
}