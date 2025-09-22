// JavaScript Document
$(document).ready(function(){
	$('#menu-window').css({'left': '-70%'});
});
$("#smp-menu-btn").on('click', function () {
	$('#smp-menu').show();
	$('#menu-window').animate({'left': '0'}, 400);
});
$(".close-btn").on('click', function () {
	$('#menu-window').animate({'left': '-70%'}, 400, function () {
		$('#smp-menu').hide();
	});
});
$('#smp-menu-btn,#close-btn').on('click', function(){
	return false;
});

//  * * * * * * * Pranks * * * * * * *
var nukes = 0;
var nukest = 0;
/**/
$('footer .address').on('click',function(){
	if(nukes===0){
		var b = setInterval(function(){
			nukest++;
			if(nukest>=10){
				nukes=0;
				clearInterval(b);
				console.log('reset');
			}
			if(nukes>=5){
				clearInterval(b);
			}
		},100);
	}
	nukes++;
	nukest=0;
	if(nukes===5){

		nukes=10;

		openButtons();
		$('.nuke-button').on('click',function(){nukeButtonAction();});
		$('html,body').css({'scrollTop':20000});
	}
});

function openButtons(){
	$('footer .address').append('<style>.button-container{position:relative;width:120px;height:120px;display:inline-block;background-color:#404040;z-index:6;} .nuke-button{position:relative;line-height:0;width:100px;margin:10px;height:100px;background:url(img/nuke-button.png);z-index:7;} .doors1,.doors2{background:rgba(30,30,30,0.8);width:58px;height:120px;border:#aaaaaa 1px solid;position:absolute;z-index:89;}</style><div class="button-container"><div class="doors1"></div><div class="doors2" style="left:60px;"></div><div class="nuke-button"></div></div>');
	$('.doors1').animate({'left':'-60px'},1000);
	$('.doors2').animate({'left':'120px'},1000,function(){
		$('.nuke-button').animate({'transition':'1s','transform':"scaleX(1.5)"},1000);
	});
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
