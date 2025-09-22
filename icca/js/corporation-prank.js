// JavaScript Document

var a = new Array();
$(".to-secret-command").on('click',function(){
	var c= $('#incorporated li');
	$('#incorporated ul').css({'position':'relative'});
	$(c).css({'position':'absolute'});
	for(var b=0;b<$(c).length;b++){
		a.push([0,(b*40)]);
		$(c[b]).css({'top' : a[b][1] });
	}
	var d = setInterval(function(){
		for(var b=0;b<$(c).length;b++){
		a[b][0]+=Math.random()*5-2.5;
		a[b][1]+=Math.random()*5-2.5;
		$(c[b]).animate({'left' : a[b][0] , 'top' : a[b][1] },40);
	}
	},40);
	});