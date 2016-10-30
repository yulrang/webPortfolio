(function($) {
	 $.fn.slide = function($full){
		 return this.each(function(){
			 var container = $(this);
			 var list_wrap = $(this).children('ul');
			 var list = $(list_wrap).children('li');
			 var list_num = $(list).length;
			 var btn_left = $(this).find('.slide_btn_left');
			 var btn_right = $(this).find('.slide_btn_right');

			 var $width = $(container).width();
			 var $moveAmount = $(list).outerWidth();
			 var $height = $(list_wrap).height();

			 console.log($moveAmount);

			 setWidth();
			 $(list).last().prependTo(list_wrap);

			 $(btn_left).on('click', function(){
				 moveLeft();
			 });
			 $(btn_right).on('click', function(){
				 moveRight();
			 });

			 function setWidth(){
				 if( $full == 'full'){
					$(list).css({
						width:  $width,
						height: $height
					});
			   	 }

				 $(container).css({
					 overflow:'hidden'
				 });

				 // 크기 지정


				 $(list_wrap).css({
					 width:  $width * list_num,
					 height:  $height,
					 marginLeft: - $width
				 })
			 }

			 function moveLeft() {
				 $moveAmount = $(list_wrap).children('li:last-child').outerWidth();

				$(list_wrap).animate({
		            marginLeft: '+=' + $moveAmount +'px'
		        }, 200, function () {
		            $(list_wrap).children('li:last-child').prependTo(list_wrap);
					$(list_wrap).css({
						marginLeft: - $width
					});
		        });
		    };

		    function moveRight() {
				$moveAmount = $(list_wrap).children('li:first-child').outerWidth();

		        $(list_wrap).animate({
		            marginLeft: '-=' + $moveAmount +'px'
		        }, 200, function () {
		            $(list_wrap).children('li:first-child').appendTo(list_wrap);
		            $(list_wrap).css({
						marginLeft: - $width
					});
		        });
				console.log($moveAmount);
		    };


			$( window ).resize( function() {


				if( $full == 'full' ){
					$height = $(window).height();
					$width = $(window).width();

					setWidth();
				}
			});

		 })
	 }
})(jQuery);
