// JavaScript Document

$('header .for-pc a.for-smp').on('click',function(){
	'use strict';
	$('.smp-menu').show();
	$('.smp-menu div.first').css({/*'position':'absolute',*/'marginLeft':'-240px'});
	$('.smp-menu > .first').animate({'marginLeft':0},300);
	return false;
});
$('.smp-menu .second').on('click',function(){
	'use strict';
	$('.smp-menu').hide();
	return false;
});