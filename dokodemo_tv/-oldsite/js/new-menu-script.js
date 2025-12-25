'use strict';
var seenflag = [0,0,0];
$('#to-start img,#new-to-start li').css('opacity',0);	$('#awesome-all-recording li').find('h3,p').css({'opacity':0});$('#awesome-all-recording li:last-child *').css({'opacity':1});
$('#service-vpn-price h3  .no-1.price,#service-vpn-price h3  .no-2.price,#service-vpn-price h3  .no-3.price').text('0');$('#service-vpn-price h3  .no-1.price,#service-vpn-price h3  .no-2.price,#service-vpn-price h3  .no-3.price').hide();

$(document).ready(function(){
	
	$('#prototype-notification').fadeIn(1000);
});
$('#prototype-notification').on('click',function(){
	$(this).fadeOut(600,function(){this.remove();});
});
function initiate_process_animation(anime_no){
	switch(anime_no){
		case 0:
		var a=[$('#awesome-all-recording li:nth-child(1)'),$('#awesome-all-recording li:nth-child(2)'),$('#awesome-all-recording li:nth-child(3)')], b=0;
		var c=setInterval(function(){
			b++;
			if(b===1){
				a[0].find('h3').animate({'opacity':'1'},600);
			}
			if(b===15){
				a[0].find('p').animate({'opacity':'1'},600);
			}
			if(b===30){
				a[1].find('h3').animate({'opacity':'1'},600);
			}
			if(b===45){
				a[1].find('p').animate({'opacity':'1'},600);
			}
			if(b===60){
				a[2].find('h3').animate({'opacity':'1'},600);
			}
			if(b===75){
				a[2].find('p').animate({'opacity':'1'},600);
				clearInterval(c);
			}
		},17);
		break;
		
		case 1:
		var a=0, c=[$('#to-start-img1,#new-to-start li:nth-child(1)'),$('#to-start-img2,#new-to-start li:nth-child(2)'),$('#to-start-img3,#new-to-start li:nth-child(3)'),$('#to-start-img4,#new-to-start li:nth-child(4)'),$('#to-start-img5,#to-start-img5-ver,#new-to-start li:nth-child(5)')];
		var b=setInterval(function(){
			a+=3;c[0].css('opacity',(a/100));c[1].css('opacity',((a-60)/100));c[2].css('opacity',((a-120)/100));c[3].css('opacity',((a-180)/100));c[4].css('opacity',((a-240)/100));if(a>=400){$('#to-start img').css('opacity',1);clearInterval(b);}
		},17);
		break;
		
		case 2:
		var a=[[0,980],[0,5000],[0,8000]];
		var b=setInterval(function(){
			a[0][0]+=((a[0][1]-a[0][0])/10);
			a[1][0]+=((a[1][1]-a[1][0])/10);
			a[2][0]+=((a[2][1]-a[2][0])/10);
			$('#service-vpn-price h3  .no-1.price').text(Math.round(a[0][0]));$('#service-vpn-price h3  .no-2.price').text(Math.round(a[1][0]));$('#service-vpn-price h3  .no-3.price').text(Math.round(a[2][0]));
			if(a[2][0]>=7999.9){clearInterval(b);}
		},17);
		break;
	}
}

$(document).on('scroll',function(){
	if($(this).scrollTop()>=$('#awesome-all-recording').offset().top-400&&seenflag[0]===0){seenflag[0]=1;initiate_process_animation(0);}
	if($(this).scrollTop()>=$('#new-to-start').offset().top-220&&seenflag[1]===0){seenflag[1]=1;initiate_process_animation(1);}
	if($(this).scrollTop()>=$('#service-vpn-price').offset().top-220&&seenflag[2]===0){seenflag[2]=1;$('#service-vpn-price h3 .price').slideToggle(300,'linear',function(){initiate_process_animation(2);});}
});