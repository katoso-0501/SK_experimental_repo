// Go to The toppage
"use strict";
$(function() {var showFlag = false;var pagetop = $('#pagetop img');pagetop.css('bottom', '-120px');$(window).scroll(function () {if ($(this).scrollTop() > 100) {if (showFlag == false) {showFlag = true;pagetop.stop().animate({'bottom':'5px'},200); }}else{if(showFlag){showFlag = false;pagetop.stop().animate({'bottom' : '-120px'}, 200); }}});pagetop.click(function () {$('body,html').animate({scrollTop: 0}, 500);		return false;});});
$(document).ready(function(){ judge_there_is_q_a();});

$('#header-menu').stickMe();$('#header-menu ul').hide();
$('#resp-menu-button').on('click',function(){$('#header-menu .menu-list').slideToggle(200);});
$('#resp-faq-button,#pc-faq-button').on('click',function(){$('.faq-menu').slideToggle(200);});

$('a[id!="resp-faq-button"]').on('click',function(){$('#header-menu .menu-list').hide();});

//それぞれのボタンを指定
$('.to_index').on('click',function(){goTo('index');});
$('.to_service').on('click',function(){goTo('new-service');});
$('.to_charges').on('click',function(){goTo('charges');});
$('.to_inquiry').on('click',function(){goTo('inquiry');});
$('.to_aboutus').on('click',function(){goTo('aboutus');});

//指定された場所へ行く
function goTo(sect){
	var a = $('#'+sect);
	var b = a.offset().top;
	$('html,body').animate({scrollTop:b},700);
	return false;
}

//FAQがあるかないか判断
function judge_there_is_q_a(){
	var a = $('.faq-q').length;
	if(a>=1){
		console.log('FAQの数:'+a);
		$('.faq-a').hide();
		$('.faq-q').toggleClass('q-hidden');
		$('.faq-q').on('click',function(){
			$(this).toggleClass('q-hidden');$(this).next().slideToggle(600,'easeOutBounce');
			$('.help-balloon').fadeOut(1000);
		});
	}
	return 0;
}