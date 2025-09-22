// JavaScript Document

var pop_count = 0;
setInterval(function () {
	/**/
	if (Math.random() * 25 <= 1) {
		attachPopup();
	}
}, 17);

function attachPopup() {
	pop_count++;
	$('.moving5').append('<div class="ripple count' + pop_count + '">A</div>');

	var b = $('.count' + pop_count);
	var c = [((Math.random() * 30) + 60) + '%',((Math.random() * 90) + 5) + '%'];
	$(b).css({top:c[0],left:c[1]});
	
	c = "scale("+(Math.random()*29+2)+")";
	setTimeout(function(){$(b).css({transform:c,'opacity':0.1});},20);
	setTimeout(function(){$(b).remove();},2000);
	return 0;
}
