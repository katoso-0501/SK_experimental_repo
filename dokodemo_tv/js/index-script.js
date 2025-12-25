// JavaScript Document

$('#index h2').css('opacity', 0);
var pop_count = 0;
var building_position = 0;
setInterval(function () {

	building_position--;
	var a = building_position + 'px bottom';
	$('#moving_bg').css('backgroundPosition', a);

	if (Math.random() * 95 <= 1) {
		attachPopup();
	}
}, 17);
$(document).ready(function () {
	setTimeout(function () {
		$('#index h2').animate({
			'opacity': 1
		}, 1000);
	}, 300);
});

function attachPopup() {
	pop_count++;
	$('#index').append('<div class="popup count' + pop_count + '"></div>');

	var b = $('.count' + pop_count);

	var c = (Math.random() * 100) + '%';
	$(b).css({
		'top': '95%',
		'left': c
	});

	var c = 'url(img/index_pop_' + Math.floor(Math.random() * 7 + 1) + '.png) center no-repeat';
	$(b).css({
		'background': c
	});

	c = ((Math.random() * 50) + 5) + '%';
	$(b).animate({
		'top': c
	}, 700, function () {
		setTimeout(function () {
			$(b).fadeOut(200, function () {
				$(b).remove()
			});
		}, 2000);
	});
	return 0;
}
