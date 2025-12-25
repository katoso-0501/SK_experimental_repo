// JavaScript Document
"use strict";
var a='写真は..........<br> オペレーター<br> - 素材辞典 13:HE053, HE055, HE051, HE091, HE092, HE094, HE095<br><br>外国の社員たち<br> - 素材辞典 8:FE176, FE186, FE196<br>- 素材辞典 7:EY067, EY070<br>- 素材辞典 5:DL037, DL044, DZ186, DZ189';

function showSecretMessage(){$('body').html(a);}
function toggleMenus(){	$('#header-menu,#header-menu a').toggleClass("change");	$('#navigation-menu').fadeToggle('fast');}

//それぞれのボタンを指定
$('#header-menu a,nav a').on('click', function(){toggleMenus();});

$('.to_toppage').on('click',function(){goTo('nadir');});
$('.to_service').on('click',function(){goTo('service');});
$('.to_consulting').on('click',function(){goTo('consulting');});
$('.to_charges').on('click',function(){goTo('charges');});
$('.to_achieved').on('click',function(){goTo('achieved');});
$('.to_faq').on('click',function(){goTo('faq');});
$('.to_contact').on('click',function(){goTo('contact');});
$('.to_aboutus').on('click',function(){goTo('aboutus');});

$('#as-the-time-goes').on('click',function(){$('.secret-to-you').slideToggle(10000,'linear');});

//指定された場所へ行く
function goTo(sect){var a=$('#'+sect),b=a.offset().top;$('html,body').animate({scrollTop:b},1000);return false;}
