(function($) {
	// 기본 값 설정
	$.defaultOptions = {
	}

	$.fn.fullScreen = function(options){
		// 값이 있을 경우 설정, 없을 시 기본 값
		options = $.extend(null, $.defaultOptions, options);

		this.each(function(){
			 var fullScreen = new FullScreen($(this));
		})

		return this;
	}


	function FullScreen(obj){
		this.init(obj);
		this.initEvent(obj);
	}

	FullScreen.prototype.init = function(obj){
		this.$obj = obj;
		this.obj_width = $(window).width();
		this.obj_height = $(window).height();

		this.setSize(this.obj_width, this.obj_height);
	}

	FullScreen.prototype.initEvent = function(){
		var objThis = this;

		$( window ).resize( function() {
			var width = $(this).width();
			var height = $(this).height();

			objThis.setSize(width, height);

		});
	}

	FullScreen.prototype.setSize = function(w, h){
		// 크기 지정
		$(this.$obj).css({
			width:  w,
			height:  h
		})
	}


})(jQuery);
