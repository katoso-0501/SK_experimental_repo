// JavaScript Document

var d,e=0,f,g=0,s_pos=0,window_width,index_margin,j;
$(document).on('scroll',function(){
	'use strict';
	s_pos = $(document).scrollTop();
	window_width = $('body').innerWidth();
	if(window_width>768){
		g=810;
	}else if(window_width<=768 && window_width>512){
		g=1000;
	}else{
		index_margin = (window_width/2)-140;
		g=650;
	}
});
d = setInterval(function(){
	'use strict';
	var c = $('#side-bar');
	e += ((s_pos-(g))-e)/12;
	f = e+"px";
	if(s_pos>=1280){
		if(window_width>512){
			$(c).css({'top':f});
		}else{
			j = index_margin+'px';
			console.log(j);
			$(c).css({'top':'60px','position':'fixed','left':j});	
		}
		console.log(f);
	}else{
		if(window_width>768){
			$(c).css({'top':0});
		}else if(window_width<=768 && window_width>512){
			$(c).css({'top':-50});
		}else{
			j = (index_margin-7)+'px';
			console.log(j);
			$(c).css({'top':'-50px','position':'absolute','left':j});
		}
	}		
},17);
$('#side-bar').on('click',function(){
	'use strict';
	if(window_width<=768){
		$('#side-bar dl').slideToggle();
	}
});
/*

var local_href=[];
for(var a=0;a<$('#side-bar dl *').length;a++){
	local_href.push(get_hrefid($('#side-bar * a')[a].href));
	var b=$('#side-bar dl * a')[a];
	assign_anchor(a);
	console.log(b);
}

function assign_anchor(arr){
	var b=$('#side-bar dl * a')[arr];
	$(b).on('click',function(){goTo(local_href[arr]);});
	$(b).attr('href','#');
}
function goTo(values){
	var s = $(values).offset().top;
	console.log(s);
	toggleSmpMenu(1);
	var b=0;
	var c=setInterval(function(){
		b++;
		if(b>=10){$('html,body').animate({'scrollTop':s},600);clearInterval(c);}
		},17);
}
function get_hrefid(targets){
	var tgt_string = "",mode=0;
	for(var b=0;b<targets.length;b++){
		if(targets[b]==="#"){mode=1;}
		if(mode===1){
			tgt_string+=targets[b];
		}
	}
	return tgt_string;
}

*/