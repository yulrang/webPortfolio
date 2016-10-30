$('document').ready(function(){
	$('.visual, .section').fullScreen();
	$('.visual').slide({
		setScreen : "full",
		slide_type : 'mono',
		setAuto : true,
		nonAuto_txt : "자동재생 끔",
		auto_speed : 2000
	});
	$('#live_slide').slide({
		slide_type : 'multi',
		slide_num : 3
	});
	$('#value_slide').slide({
		slide_type : 'mono'
	});
})

// 버튼 토글
function clickToggle(obj) {
	var button = obj;
	$(button).toggleClass('on');

	if( $(button).attr('aria-selected') == 'false')
		$(button).attr('aria-selected','true');
	else if( $(button).attr('aria-selected') == 'true')
		$(button).attr('aria-selected','false');
}

// 여러개의 버튼이 있을 때, 한 버튼이 눌리면 다른 버튼은 눌림 해제 됨
// [!] IE8 이하에서 버튼 토글 시, 탭 이하 콘텐츠를 숨김/보임처리 하기 위해 CSS를 작성하였으나, CSS redraw가 되지 않음. (윈도우 resize를 하니 정상 작동)
function tabToggle(obj) {
	var button = obj;
	$(button).siblings().removeClass('on');
	$(button).siblings().attr('aria-selected','false');

	$(button).addClass('on');
	$(button).attr('aria-selected','true');
}
