// JavaScript Document
	var a = 'headShake',b = $('.h'),wsize;
	document.querySelector('#price-details aside .excluded-things').onclick = function(){'use strict'; return false;}
	document.querySelector('#price-details aside .included-things').onclick = function(){'use strict'; return false;}

	$('#price-details li,#price-details aside a').addClass('animated');
	$('#price-details li').addClass('bounceIn');

	setInterval(function(){
		wsize =  ($('html,body').innerWidth());
	},20);
	
	$('#price-details aside .included-things').on('click',function(){
		'use strict';
		
		showingCurtain('料金に含まれるもの');
		$('#price-details aside .included-things').addClass('selected');
		$('#price-details aside .excluded-things').removeClass('selected');
		
		$('#price-details article.included-things').addClass('selected');
		$('#price-details article.excluded-things').removeClass('selected');
		
		$('#price-details aside .included-things').addClass(a);
		$('#price-details aside .excluded-things').removeClass(a);
	});
	
	$('#price-details aside .excluded-things').on('click',function(){
		'use strict';
		
		showingCurtain('料金に含まれないもの');
		$('#price-details aside .excluded-things').addClass('selected');
		$('#price-details aside .included-things').removeClass('selected');
		
		$('#price-details article.excluded-things').addClass('selected');
		$('#price-details article.included-things').removeClass('selected');
		
		$('#price-details aside .excluded-things').addClass(a);
		$('#price-details aside .included-things').removeClass(a);
	});

function showingCurtain(paragraphs){
	if(wsize<=768){
		$('#price-details #main').append('<div class="blue-curtain">'+paragraphs+'</div>');
		setTimeout(function(){
			$('.blue-curtain').fadeOut(400,function(){$(this).remove();});
		},500);
	}
}