(function($) {
	// 기본 값 설정
	$.defaultOptions = {
		slide_num : 1
	}

	$.fn.slide = function(options){
		// 값이 있을 경우 설정, 없을 시 기본 값
		opts = $.extend(null, $.defaultOptions, options);

		this.each(function(){
			 var slide = new Slide(
				 $(this),
				 opts.setScreen,
				 opts.slide_type,
				 opts.slide_num,
				 opts.setAuto,
				 opts.nonAuto_txt,
				 opts.auto_speed
			 );
		 })

		return this;
	}


	function Slide($selector, setScreen, slide_type, slide_num, setAuto, nonAuto_txt, auto_speed){
		this.container = $selector;
		this.list_wrap = this.container.children('ul');
		this.list = this.list_wrap.children('li');
		this.btn_left = this.container.find('.slide_btn_left');
		this.btn_right = this.container.find('.slide_btn_right');
		this.btn_auto = this.container.find('.slide_auto');
		this.btn_auto_txt = this.container.find('.slide_auto_txt');
		this.slide_page = this.container.find('.slide_page');

		this.isAuto = setAuto;
		this.auto_txt = this.btn_auto_txt.text();
		this.nonAuto_txt = nonAuto_txt;
		this.setScreen = setScreen;
		this.auto_speed = auto_speed;

		this.slide_type = slide_type;
		this.slide_num = slide_num;
		this.list_num = this.list.length;
		this.slide_width = this.container.width();
		this.slide_height = this.list_wrap.height();
		this.page_now = this.slide_num;

		this.auto = null;

		this.init();
		this.initEvent();
	}

	Slide.prototype.init = function(){
		this.setWidth(this.slide_width, this.slide_height);
		if( this.slide_type == 'mono' )
			$(this.list).last().prependTo(this.list_wrap);

		if( this.slide_type == 'multi' ){
			for (var i=0; i < this.slide_num; i++){
				$(this.list_wrap).children().last().prependTo(this.list_wrap);
			}
		}

		 // auto 일 때, 슬라이드 자동 넘기기
		 if(this.isAuto)
		 	this.moveAuto(true);

	}

	Slide.prototype.initEvent = function(){
		var objThis = this;
		var toggle_auto = this.isAuto;

		$( window ).resize( function() {
			if( objThis.setScreen == 'full' ){
				objThis.slide_width = $(window).width();
				objThis.slide_height = $(window).height();

				objThis.setWidth(objThis.slide_width, objThis.slide_height);
			}
		});

		$(this.btn_left).on('click', function(){
			objThis.moveLeft();
		});
		$(this.btn_right).on('click', function(){
			objThis.moveRight();
		});
		$(this.btn_auto).on('click', function(){
			toggle_auto = !toggle_auto;
			objThis.moveAuto(toggle_auto);
		});
	}

	Slide.prototype.setWidth = function(width, height){
		var objThis = this;

		if( this.setScreen == 'full'){
		   $(this.list).css({
			   width:  width,
			   height: height
		   });
		}

		$(this.container).css({
			overflow:'hidden'
		});

		// 크기 지정
		$(this.list_wrap).css({
			width:  width * objThis.list_num,
			height:  height,
			marginLeft: - width
		})
	}

	Slide.prototype.moveLeft = function(){
		var objThis = this;
		var moveAmount = $(this.list_wrap).children('li:last-child').outerWidth();

	   $(this.list_wrap).animate({
		   marginLeft: '+=' + moveAmount +'px'
	   }, 200, function () {
		   $(objThis.list_wrap).children('li:last-child').prependTo(objThis.list_wrap);
		   $(objThis.list_wrap).css({
			   marginLeft: - objThis.slide_width
		   });
	   });
	   this.setPage('prev');
	}

	Slide.prototype.moveRight = function(){
		var objThis = this;
		var moveAmount = $(this.list_wrap).children('li:first-child').outerWidth(true);

		$(objThis.list_wrap).animate({
			marginLeft: '-=' + moveAmount +'px'
		}, 200, function () {
			$(objThis.list_wrap).children('li:first-child').appendTo(objThis.list_wrap);
			$(objThis.list_wrap).css({
				marginLeft: - objThis.slide_width
			});
		});
		this.setPage('next');
	}
	Slide.prototype.moveAuto = function(toggle_auto){
		var objThis = this;

		if(toggle_auto){
			$(this.btn_auto).addClass('on');
			$(this.btn_auto_txt).text(this.nonAuto_txt);

			objThis.auto = setInterval(function() {
				objThis.moveRight();
			}, objThis.auto_speed);
		}
		else{
			$(this.btn_auto).removeClass('on');
			$(this.btn_auto_txt).text(this.auto_txt);
			clearInterval(objThis.auto);
		}


	}
	Slide.prototype.setPage = function(direction){
		if( direction == 'next'){
			this.page_now = (this.page_now >= this.list_num) ? 1 : this.page_now + 1;
		}
		else if( direction == 'prev'){
			this.page_now = (this.page_now <= 1) ? this.list_num : this.page_now - 1;
		}
		$(this.slide_page).text(this.page_now + "/" + this.list_num);
	}


})(jQuery);
