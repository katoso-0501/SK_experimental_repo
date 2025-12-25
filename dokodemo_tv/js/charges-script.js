// JavaScript Document
var initial_cost = 0;
var subtotal = 0;
var periodic_total=[0,0,0,0];
var active_total = 0;
var active_periodic_total=[0,0,0,0];
var scrollY= 0;
var selected_status={};
resetAllSettings();
var simulation_area = [($('#index').outerHeight()+$('#vpn-accounts').outerHeight()),2000];

$('.totals,.mon1,.mon6,.mon12,.mon24').text('0');
$('#domestic_menu,#abroad_menu,div.garapon_alternatives,div.surveillances').hide();

// Region Selections

$('#regions_tokai-kanto-kansai').on('click',function(){
	'use strict';
	resetAllSettings();
	selected_status.regions="3cities";
});
$('#regions_other-honshu').on('click',function(){
	'use strict';
	resetAllSettings();
	selected_status.regions="honshu";
});
$('#regions_distant').on('click',function(){
	'use strict';
	resetAllSettings();
	selected_status.regions="distant";
});
$('#regions_tokai-kanto-kansai, #regions_other-honshu, #regions_distant').on('click',function(){
	'use strict';
	$('#domestic_menu').slideDown(400);
	$('#abroad_menu').slideUp(400);
	$('#abroad_menu a').removeClass('selected');
	updateSituations();
});
$('#regions_overseas').on('click',function(){
	'use strict';
	resetAllSettings();
	$('#abroad_menu').slideDown(400);
	$('#domestic_menu').slideUp(400);
	$('#domestic_menu a').removeClass('selected');
	selected_status.regions="abroad";
	updateSituations();
});
$('.regions a').on('click', function () {
	"use strict";
	$('.regions a').removeClass('selected');
	$(this).addClass('selected');
});
// Domestic Menus
$('#tuners_garapon_premium').on('click',function(){
	'use strict';
	selected_status.dom_tuner_plan=1;
	$('a.garapon_alternatives').show();
 });
$('#tuners_arecx6').on('click',function(){
	'use strict';
	selected_status.dom_tuner_plan=2;
	$('a.garapon_alternatives').hide();
	$('div.garapon_alternatives').hide();
	$('a.garapon_alternatives,div.garapon_alternatives').removeClass('selected');
	selected_status.dom_alternative_placements=[0,0,0,0,0,0];
});
$('.home-tuners a').on('click', function () {
	"use strict";
	$('.home-tuners a').removeClass('selected');
	$(this).addClass('selected');
	updateSituations();
});

$('#vpn_1month').on('click',function(){'use strict';selected_status.dom_vpn=[980,1];});
$('#vpn_6month').on('click',function(){'use strict';selected_status.dom_vpn=[5000,6];});
$('#vpn_12month').on('click',function(){'use strict';selected_status.dom_vpn=[8000,12];});
$('.home-vpn a').on('click', function () {
	"use strict";
	$('.home-vpn a').removeClass('selected');
	$(this).addClass('selected');
	updateSituations();
});
$('div.surveillances a').on('click', function () {
	"use strict";
	$('div.surveillances a').removeClass('selected');
	$(this).addClass('selected');
});
// Garapon Alternative placements
$("a.garapon_alternatives").on('click', function () {
	"use strict";
	selected_status.dom_alternative_placements[0] = toggling(selected_status.dom_alternative_placements[0]);
	for(var i=1;i<=5;i++){
		selected_status.dom_alternative_placements[i] = 0;
	}
	$('div.garapon_alternatives').slideToggle(400);
	$('div.garapon_alternatives a.checker').removeClass('selected');
	updateSituations();
});
$('#alternative_lan_extend').on('click',function(){
	'use strict';
	selected_status.dom_alternative_placements[1]=toggling(selected_status.dom_alternative_placements[1]);
});
$('#alternative_antenna').on('click',function(){
	'use strict';
	selected_status.dom_alternative_placements[2]=toggling(selected_status.dom_alternative_placements[2]);
});
$('#alternative_heatsink').on('click',function(){
	'use strict';
	selected_status.dom_alternative_placements[3]=toggling(selected_status.dom_alternative_placements[3]);
});
$('#alternative_hdd').on('click',function(){
	'use strict';
	selected_status.dom_alternative_placements[4]=toggling(selected_status.dom_alternative_placements[4]);
});
$('#alternative_booster').on('click',function(){
	'use strict';
	selected_status.dom_alternative_placements[5]=toggling(selected_status.dom_alternative_placements[5]);
});
$("a.checker").on('click', function () {
	"use strict";
	$(this).toggleClass('selected');
	updateSituations();
});
// Domestic Surveillance Camera system 
$("a.surveillances").on('click', function () {
	"use strict";
	$('div.surveillances').slideToggle(400);
	selected_status.dom_surveillance = 0;
	$('div.surveillances a').removeClass('selected');
	updateSituations();
});
$('#surveil_a').on('click',function(){'use strict';selected_status.dom_surveillance=1;updateSituations();});
$('#surveil_b').on('click',function(){'use strict';selected_status.dom_surveillance=2;updateSituations();});
$('#surveil_ab').on('click',function(){'use strict';selected_status.dom_surveillance=3;updateSituations();});
// Abroad Menus
$('#hostings_yearlyA').on('click',function(){'use strict';selected_status.abr_plans=1;});
$('#hostings_halfA').on('click',function(){'use strict';selected_status.abr_plans=2;});
$('#hostings_3monthA').on('click',function(){'use strict';selected_status.abr_plans=3;});
$('#hostings_yearlyB').on('click',function(){'use strict';selected_status.abr_plans=4;});
$('#hostings_halfB').on('click',function(){'use strict';selected_status.abr_plans=5;});
$('#hostings_3monthB').on('click',function(){'use strict';selected_status.abr_plans=6;});
$('div.abroad-tuners a').on('click', function () {
	"use strict";
	$('div.abroad-tuners a').removeClass('selected');
	$(this).addClass('selected');
	updateSituations();
});
$('#host_extension_0').on('click',function(){'use strict';selected_status.abr_extension=[0,0];});
$('#host_extension_3').on('click',function(){'use strict';selected_status.abr_extension=[12000,3];});
$('#host_extension_6').on('click',function(){'use strict';selected_status.abr_extension=[18000,6];});
$('#host_extension_12').on('click',function(){'use strict';selected_status.abr_extension=[25000,12];});
$('div.abroad-extensions a').on('click', function () {
	"use strict";
	$('div.abroad-extensions a').removeClass('selected');
	$(this).addClass('selected');
	updateSituations();
});


$(".rst_button").on('click',function(){
	"use strict";
	if(confirm('RESET?')){
		resetAllSettings();
		var a= simulation_area[0];
		$('body,html').animate({'scrollTop':a},2000);
	}
});
setInterval(function(){
	'use strict';
	fixingAmounts();
	scrollY= $('body,html').scrollTop();
	active_total += (subtotal-active_total)/6;
	for(var i=0;i<4;i++){
		active_periodic_total[i]+=(periodic_total[i]-active_periodic_total[i])/6;
	}
	$('.mon1').text(conversionWithComma(Math.round(active_periodic_total[0]*1)));
	$('.mon6').text(conversionWithComma(Math.round(active_periodic_total[1]*1)));
	$('.mon12').text(conversionWithComma(Math.round(active_periodic_total[2]*1)));
	$('.mon24').text(conversionWithComma(Math.round(active_periodic_total[3]*1)));
	$('.totals').text(conversionWithComma(Math.round(active_total*1)));
},17);

function updateSituations(){
	'use strict';
	subtotal=0;
	initial_cost=0;
	periodic_total=[0,0,0,0];
	subtotal += (selected_status.dom_tuner_plan===1 ? 1350 : 0);
	initial_cost += (selected_status.dom_tuner_plan===2 ? 16000 : 0);
	subtotal += selected_status.dom_vpn[0];
	if(selected_status.dom_alternative_placements[0]===1){
		var c = selected_status.regions;
		var d="";
		if(c==='honshu'){
			d='主要3都市圏以外の本州地域では、<br><strong>7,000</strong>円の追加料金がかかります';
			initial_cost+=7000;
		}
		if(c==='distant'){
			d='北海道・九州では、<br><strong>9,000</strong>円の追加料金がかかります';
			initial_cost+=9000;
		}
		//console.log(d);
		$('div.garapon_alternatives p').html(d);
	}
	
	initial_cost += (selected_status.regions === 'abroad' ? 15000 : 0);
	
	initial_cost += (selected_status.dom_alternative_placements[0] === 1 ? 28000 : 0);
	initial_cost += (selected_status.dom_alternative_placements[1] === 1 ? 3000 : 0);
	initial_cost += (selected_status.dom_alternative_placements[2] === 1 ? 2000 : 0);
	initial_cost += (selected_status.dom_alternative_placements[3] === 1 ? 1800 : 0);
	initial_cost += (selected_status.dom_alternative_placements[4] === 1 ? 3000 : 0);
	initial_cost += (selected_status.dom_alternative_placements[5] === 1 ? 8000 : 0);
	var ve = selected_status.dom_surveillance;
	switch(ve){
		case 1:
			initial_cost+=19800;
			break;
		case 2:
			initial_cost+=29000;
			break;
		case 3:
			initial_cost+=44500;
			break;
	 }
	subtotal+=initial_cost;
	for(var i=0;i<4;i++){periodic_total[i]+=initial_cost;}
	
	//Calcurate running costs
	//Garapon
	if(selected_status.dom_tuner_plan===1){
		periodic_total[0]+= 1350;
		periodic_total[1]+= 1350 * 6;
		periodic_total[2] += 1350 * 12;
		periodic_total[3] += 1350 * 24;
	}
	//Domestic vpns

	var dd = selected_status.dom_vpn;
	if(dd[0]>0){
		periodic_total[0] += dd[0] * (1 / dd[1]);
		periodic_total[1] += dd[0] * (6 / dd[1]);
		periodic_total[2] += dd[0] * (12 / dd[1]);
		periodic_total[3] += dd[0] * (24 / dd[1]);
	}
	// Abroad Planning	
	var ee = 0,pr=1;
	switch(selected_status.abr_plans){
		case 1:
			ee=82250;
			pr=12;
			break;
		case 2:
			ee = 72000;
			pr=6;
			break;
		case 3:
			ee = 68000;
			pr=3;
			break;
		case 4:
			ee = 59800;
			pr=12;
			break;
		case 5:
			ee = 49800;
			pr=6;
			break;
		case 6:
			ee = 42800;
			pr=3;
			break;
	}
	subtotal += ee;
	periodic_total[0] += ee * (1 / pr);
	periodic_total[1] += ee * (6 / pr);
	periodic_total[2] += ee * (12 / pr);
	periodic_total[3] += ee * (24 / pr);
	
	//Abroad VPN extensions
	dd = selected_status.abr_extension;
	subtotal += selected_status.abr_extension[0];
	if(dd[0]>0){
		periodic_total[0] += dd[0] * (1 / dd[1]);
		periodic_total[1] += dd[0] * (6 / dd[1]);
		periodic_total[2] += dd[0] * (12 / dd[1]);
		periodic_total[3] += dd[0] * (24 / dd[1]);
	}
	//fixingAmounts();
}

function fixingAmounts(){
	'use strict';
	//var a = $('body,html').scrollTop();
	var b = $('div.for-smp.total_amount'),c,d;
	if(scrollY>(simulation_area[0]-300)&&scrollY<(simulation_area[1])){
		$('body,html').css('position','relative');
		$(b).css({'position':'fixed','bottom':'0','zIndex':2000});
		c=$('#payment-simulation').outerHeight();
		d=(simulation_area[0]+(c-600));
		simulation_area[1]=d;
	}else{
		$(b).css({'position':'static'});
	}
}
function resetAllSettings(){
	'use strict';
	$('.radios a,.checker').removeClass('selected');
	$('div.garapon_alternatives,div.surveillances').hide();
	$('#domestic_menu,#abroad_menu').slideUp(400);
	subtotal=0;
	periodic_total=[0,0,0,0];
	selected_status={regions:'',dom_tuner_plan:0,dom_vpn:[0,0],dom_alternative_placements:[0,0,0,0,0,0],dom_surveillance:0,abr_plans:0,abr_extension:[0,0]};
	updateSituations();
}
function toggling(togtgt){
	'use strict';
	switch(togtgt){
		case 0:
			togtgt=1;
			break;
		case 1:
			togtgt=0;
	}
	return togtgt;
}
function conversionWithComma(subjects){
	'use strict';
	var ar = subjects,digits = String(ar).length;
	if(digits>=4){
		var broken_num=(subjects%1000);
		if(broken_num<10){
			broken_num = '00'+broken_num;
		}else if(broken_num<100){
			broken_num = '0'+broken_num;
		}
		//console.log(broken_num);
		ar = Math.floor(subjects/1000)+","+broken_num;
	}
	return ar;
}