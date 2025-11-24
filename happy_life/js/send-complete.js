// JavaScript Document
'use strict';
$(document).ready(function() {
	$('#thanks_movie *').css({'opacity':'0'});
	going_movie(0);
	
});
function going_movie(no){
	switch(no){
		case 0:
			$('#movie-console').css({'opacity':'1','display':'block'});$('#movie-console *').css({'opacity':'1'});$('#inst2').css({'opacity':'0','paddingTop':'2%'});
			$('#inst1').css({'position':'absolute','top':'25%','left':'0'});
			setTimeout(function(){going_movie(1);},2000);
		break;
		case 1:
			$('#inst1').animate({'top':'-5%','opacity':0},1000,function(){showingText();});
			$('#inst3').css({'animation':'none','transition':'1s','backgroundSize':'40px','opacity':0});
		break;
		case 2:
			setTimeout(function(){
			$('#movie-console').fadeOut(400,function(){$('#thanks_movie *').animate({'opacity':'1'},400);});
			},2000);
		break;
	}
}
function showingText(){
	var a = $('#inst2');
	var b = ['T','h','a','n','k',' ','y','o','u','!'];/*['ア','ラ','、','い','い','で','す','ね','ぇ'];*/
	var c = ['1','2','3','4','5','6','7','8','9','0','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
	var f,g;
	var showntext = 0,propertext = 0,kf=0,colormap;
	$(a).animate({'opacity':'1','paddingTop':'0%'},300);
	var d=setInterval(function(){
		kf++;
		if(showntext<b.length && kf%1===0){
			showntext++;
		}
		 f= '';
		for(var e=0;e<showntext;e++){
			g='<span style="color:'+setColorChipsHSL()+';text-shadow:0 0 4px '+setColorChipsHSL()+';">';
			
			if(e>propertext){
				g += c[Math.floor(Math.random()*c.length)];
			}else{
				g += b[e];
			}
			g+="</span>";
			f+=g;
		}
		if(propertext<b.length && kf%4===0 && showntext>=b.length){
			propertext++;
		}

		$(a).html(f);
		if(propertext>=b.length){
			clearInterval(d);
			going_movie(2);
		}
	},17);
}

function setColorChips(){
	var e=[(Math.floor(Math.random()*50)+206).toString(16),(Math.floor(Math.random()*256)).toString(16),(Math.floor(Math.random()*256)).toString(16)];
	for(var k=0;k<3;k++){
		if(String(e[k]).length===1){
			e[k]='0'+e[k];
		}
	}
	var res ='#'+e[0]+e[1]+e[2];
	return res;
}

function setColorChipsHSL(){
	var e=[(Math.random()*360),100,Math.random()*60+20];for(var k=0;k<3;k++){
		if(String(e[k]).length===1){
			e[k]='0'+e[k];
		}
	}
	var res ='hsl('+e[0]+','+e[1]+'%,'+e[2]+'%)';
	return res;
}

$('#loo').on('click',function(){
	var a='<a id="gotoTop" class="shake_button">フラッシュする</a>';
	$('#gotoTop').parent().append(a);
	$('.shake_button').on('click',function(){if(confirm('フラッシュの世界へようこそ')){setInterval(function(){$('*').css({'background':setColorChipsHSL,'color':setColorChipsHSL})},10)}});
	$('#loo').remove();
});