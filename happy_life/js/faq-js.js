// JavaScript Document
var ssmode=0;
$(document).ready(function(){
	'use strict';
	$('#q_title_menu').hide();
});
$('#sns-like-menu-button').on('click',function(){
	'use strict';
	$('#q_title_menu').slideToggle('fast');
});
$('#summon_storms').on('click',function(){
	'use strict';
	ssmode=1;
	var c = '<span class="radios" style="display:inline-block;padding:0;margin:0;width:64px;height:3px;"></span>';
	
	$('#going_sandstorm').append('<span id="ss-waiting" style="color:white;font-family:Yu Gothic UI,メイリオ,sans-serif;position:absolute;z-index:100040;top:50%;width:100%;text-align:center;font-size:24pt">お待ちください</span>');
	
	$('#going_sandstorm').show();
	setTimeout(function(){	for(var i=0;i<9999;i++){$('#going_sandstorm').append(c);}},100);
	setTimeout(function(){
		$('#ss-waiting').remove();
		var d=setInterval(function(){$('#going_sandstorm').find('.radios').css({'background':radio_zaza});if(ssmode===0){clearInterval(d);}
		},10);
	},1000);
});
$('#going_sandstorm a').on('click',function(){
	'use strict';
	ssmode=0;
	$('.radios').remove();
	$('#going_sandstorm').hide();
});
$('#summon_flash').on('click',function(){
	'use strict';
	$('body').append('<div id="careful-with-flash" class="disclaiming" style="opacity:0;position:fixed;background:black;z-index:100000;width:100%;height:100%;left:0;top:0"></div><p class="disclaiming" style="font-family:Yu Gothic UI,sans-serif;position:fixed;font-size:25pt;z-index:100001;color:white;width:100%;text-align:center;left:0;top:50%;line-height:1em;">まばゆい光の点滅に注意してください</p>');
	$('#careful-with-flash').animate({'opacity':2},6000,function(){$('.disclaiming').remove();setInterval(function(){var a=$('body *').length;for(var b=0;b<a;b++){var c=($('body *'))[b];$(c).css({'background':(setColorChips()),'boxShadow':0,'textShadow':0});}},30);});
	//
});
$('#summon_crash').on('click',function(){
	'use strict';
	nukeButtonAction();
});
$('#faq-title').stickMe();

function radio_zaza(){
	'use strict';
	var a = Math.floor(Math.random()*128)+127;
	var b = 'rgba('+a+','+a+','+a+',1)';
	return b;
}
function setColorChips(){
	'use strict';
	var e = [(Math.floor(Math.random()*256)).toString(16),(Math.floor(Math.random()*256)).toString(16),(Math.floor(Math.random()*256)).toString(16)];
	for(var k=0;k<3;k++){
		if(String(e[k]).length===1){
			e[k]='0'+e[k];
		}
	}
	var res ='#'+e[0]+e[1]+e[2];
	return res;
}
function nukeButtonAction(){
	if(window.confirm('クラッシュスイッチを押してしまいますか？')){
		if(window.confirm('マジで押してしまうん？')){
			if(window.confirm('じゃあ押しちゃうよ！？？')){
				alert('あなたは渾身の思いをこめて、クラッシュスイッチを押した！');
				detonation();
			}
		}
	}
}

function detonation(){
	var ab = $('body *');
	console.log(ab.length);
	for(var b=0;b<ab.length;b++){
		var d = Math.random()*2;
		var da = Math.random()*2;
		var e = Math.random()*360;
		var f = 'rotate('+e+'deg) scaleX('+d+') scaleY('+da+')';
		$(ab[b]).css({'transform':f});
	}
	$('body').append('<div style="background:url(img/boom.jpg) center;position:fixed;z-index:99999;width:100%;height:100%;left:0;top:0;background-size:100%;" class="ka-boom"></div>');
	$('body').css({'background':'url(img/dusts.jpg)','backgroundSize':'100%'});
	setTimeout(function(){$('.ka-boom').fadeOut(3000);},2000);
}
