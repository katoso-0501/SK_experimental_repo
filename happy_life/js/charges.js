// JavaScript Document
var animated=[0,0,0];

$(document).ready(function(){
	'use strict';
	$('#tours-ceremony-costs h4,#tours-ceremony-costs h5,#tours-ceremony-costs p').css({'opacity':0});
	$('#supports').fixedBG();
});
$(document).on('scroll',function(){
	'use strict';
	if(scroll_height>=($('#tours-ceremony-costs').offset().top-300) && animated[0] === 0){
		initiate_anime(0);
		animated[0]=1;
	}
	
});

function initiate_anime(anime_no){
	'use strict';
	switch(anime_no){
		case 0:
			var a = $('#tours-ceremony-costs *'),pixels=0,kf=0;
			$(a).css({'textShadow':'0 0 4px'});
			$(a).animate({'opacity':1},500);
			var b;
			var c;
			var spd=-0.2;
			b = setInterval(function(){
				kf++;
				
				
				if(kf>=7&&kf<=120){
					pixels+=(25-pixels)/10;
					c = '0 0 '+pixels+'px';
					$(a).css({'textShadow':c});
				}
				if(kf>=121){
					pixels+=spd;
					c = '0 0 '+pixels+'px';
					$(a).css({'textShadow':c});
					if(pixels<=1||pixels>=26){spd*=-1;}
				}
			},33);
		break;
	}
}