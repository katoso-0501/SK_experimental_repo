// JavaScript Document
var procedures = $('.for-m-dialogue li');
for(var a=0;a<procedures.length;a++){
	var b = 'pros-'+(a+1);
	$(procedures[a]).addClass(b);
}

if(window_width>768){
	resizeBoxHeight([$('.pros-1'),$('.pros-2'),$('.pros-3'),$('.pros-4')]);resizeBoxHeight([$('.pros-8'),$('.pros-9')]);resizeBoxHeight([$('.pros-10'),$('.pros-11'),$('.pros-12'),$('.pros-13')]);resizeBoxHeight([$('.pros-14'),$('.pros-15'),$('.pros-16'),$('.pros-17'),$('.pros-18'),$('.pros-19')]);resizeBoxHeight([$('.pros-20'),$('.pros-21'),$('.pros-22')]);
}else{
	$('.for-m-dialogue li').removeAttr('style');
}
function resizeBoxHeight(subjects){
	'use strict';
	var subjects_l = [];
	for(var b in subjects){
		subjects_l.push($(subjects[b]).innerHeight());
	}
	var c = getTheHighestHeight(subjects_l)+'px';
	for(var b in subjects){
		
		$(subjects[b]).css({'height':c,'paddingBottom':0});
	}	
}

function getTheHighestHeight(vs){
	'use strict';
	var hg=0;
	for(var a=0;a<vs.length;a++){
		if(vs[a]>hg){
			hg=vs[a];
		}
	}
	return hg;
}