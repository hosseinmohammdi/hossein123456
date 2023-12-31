(function ($) {
    "use strict";
	
	var $window = $(window);
	
	/*****************
	    - Banner -
	******************/
	//Image background
	if ($(".banner.image-bg").length>0) {
		$(".banner.image-bg").backstretch("images/image/bg.jpg");
	}
	
	//Image background / blog
	if ($(".main-title.blog-bg").length>0) {
		$(".main-title.blog-bg").backstretch("images/image/blog.jpg");
	}
	
	//Slide background
	if ($(".banner.slide-bg").length>0) {
		$(".banner.slide-bg").backstretch([
			"images/slide/1.jpg", 
			"images/slide/2.jpg", 
			"images/slide/3.jpg"
		], {duration:3000, fade:750});
	}
	
	//Video background
	if ($(".banner.video-bg").length>0) {
		//Hide player on mobile
		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
			$(".player").hide();
			$(".player-controls").hide();
		}
		
		//Youtube player
		$(".player").mb_YTPlayer();
    
		//Player controls
		$("#play").on("click", function() {
			$(".player").playYTP();
		});
	
		$("#pause").on("click", function() {
			$(".player").pauseYTP();
		});
	}
	
	/********************
	    - Preloader -
	********************/
	$(window).on("load", function() {
	    $(".preloader").fadeOut(600);
    });
	
	/**************************
	    - Parallax effect -
	**************************/
	var $parallax = $(".parallax");
	
	if ($parallax.length>0) {
		$parallax.parallax("50%", 0.5);
	}
	
	if ($(".parallax-bg").length>0) {
		$(".parallax-bg").each(function() {
			var $parallaxBg = $(this);
			$parallaxBg.css({backgroundImage:"url('"+$parallaxBg.attr("data-bg")+"')"});
		});
	}
	
	/******************************
	    - Animate with wow js -
	******************************/
    new WOW().init(); 
	
	/********************
	    - Slick nav -
	********************/
	$("#main-menu").slicknav({
		prependTo:"#responsive-menu", 
		label:"", 
		closeOnClick:true
	});
		
	/******************
	    - Submenu -
	******************/
	$(".nav li").on("mouseenter", function() {
		$(this).children("ul").stop().slideDown(200);
	});
	
	$(".nav li").on("mouseleave", function() {
		$(this).children("ul").stop().slideUp(200);
	});
	
	/**********************
	    - Header menu -
	**********************/
	$(document).on("click", "#navigation ul li a, #responsive-menu ul li a", function() {
		var id = $(this).attr("href");
		var h = parseFloat($(id).offset().top);
		var offset = parseInt($("body").data("offset"), 10);
		
		$("body, html").stop().animate({
			scrollTop:(h-offset)
		}, 800);
		
		return false;
	});
	
	/*****************
	    - To top -
	*****************/
	$(".to-top").on("click", function() {
		$(window).scrollTo($("body"), 1500, {offset:{top:0, left:0}});
	});
		
	/******************
	    - Counter -
	******************/
    $(".number-count").counterUp({
		delay:4, 
		time:1000
	});
	
	/***********************
	    - Testimonials -
	***********************/
	$(".testimonial-slider").slick({
		slidesToShow:1,
		slidesToScroll:1,
		arrows:false,
		fade:true,
		asNavFor:".testimonial-nav"
	});
	
	$(".testimonial-nav").slick({
		slidesToShow:5,
		slidesToScroll:1,
		asNavFor:".testimonial-slider",
		dots:false,
		centerMode:true,
		focusOnSelect:true,
		variableWidth:false,
		arrows:false,
		responsive:[
			{
			  	breakpoint:991,
			  	settings:{
					slidesToShow:3
			  	}
			},
			{
			  	breakpoint:480,
			  	settings:{
					slidesToShow:1
			  	}
			}
		]
	});
		
	/************************
	    - Header slider -
	************************/
	$("#header-slider-carousel").owlCarousel({
		loop:true,
		items:1,
		margin:10,
		responsiveClass:true,
		nav:false,
		dots:true,
		autoplay:true,
		autoplaySpeed:1000
	});
	
	/**********************
	    - Screenshots -
	**********************/
	$(".screenshot-slider").owlCarousel({
		loop:false,
		margin:30,
		responsiveClass:true,
		responsive:{
			0:{
				items:1,
				nav:true,
				dots:false
			},			 
			768:{
				items:3,
				nav:true,
				dots:false
			},			
			960 : {
				items:4
			},			
			1024 : {
				items:5
			}
		},
		nav:false,
		navText:['<i class="fas fa-angle-left"></i>','<i class="fas fa-angle-right"></i>'],
		dots:true,
		autoplay:true,
		autoplaySpeed:1000
	});
		
	/****************************
	    - Sticky navigation -
	****************************/
	$window.scroll(function() {
    	if ($window.scrollTop()>200) {
			$(".navbar").addClass("sticky-header");
		} else {
			$(".navbar").removeClass("sticky-header");
		}
	});
	
	/**********************
	    - Popup video -
	**********************/
	$(".popup-video").magnificPopup({
        type:"iframe",
        preloader:true
    });
	
	/**************************
	    - Zoom screenshot -
	**************************/
	$(".zoom-screenshot").magnificPopup({
		delegate:"a",
		type:"image",
		closeOnContentClick:false,
		closeBtnInside:false,
		mainClass:"mfp-with-zoom",
		image:{verticalFit:true},
		gallery:{enabled:true},
		zoom:{
			enabled:true,
			duration:300, // Don't forget to change the duration also in CSS
			opener:function(element) {
			  	return element.find("img");
			}
		}
	});
	
	/*********************
	    - Popup page -
	*********************/
	$(".has-popup").magnificPopup({
		type:"inline",
		fixedContentPos:true,
        fixedBgPos:true,
		overflowY:"auto",
		closeBtnInside:true,
		mainClass:"mfp-with-zoom",
		zoom:{
			enabled:true,
			duration:300
		}
	});
	
	/********************
	    - Subscribe -
	********************/
	//Subscribe form validator
	var $subscribeform = $("#subscribeForm");
	
	$subscribeform.validator({focus:false}).on("submit", function(e) {
		if (!e.isDefaultPrevented()) {
			e.preventDefault();
			submitSubscribeForm();
		}
	});

	//Submit subscribe form
	function submitSubscribeForm() {
		//Form fields
		var email = $("#emailsubscribe").val();

		$.ajax({
			type:"POST",
			url:"php/subscribe.php",
			data:"email="+email,
			dataType:"json",
			success:function(data) {
				var layer = "#subscribeSubmit";
				
				if (data.status==="success") {
					$subscribeform[0].reset();
					formResult(layer, true, "Thanks for subscribing to our newsletter!");
				} else {
					formResult(layer, false, "Subscription failed!");
				}
			}
		});
	}
	
	/***********************
	    - Contact form -
	***********************/
	//Contact form validator
	var $contactform = $("#contactForm");
	
	$contactform.validator({focus:false}).on("submit", function(e) {
		if (!e.isDefaultPrevented()) {
			e.preventDefault();
			submitContactForm();
		}
	});

	//Submit contact form
	function submitContactForm() {
		//Form fields
		var name = 		$("#name").val();
		var email = 	$("#email").val();
		var subject = 	$("#subject").val();
		var message = 	$("#message").val();
		
		$.ajax({
			type:"POST",
			url:"php/contact.php",
			data:"name="+name+"&email="+email+"&subject="+subject+"&message="+message,
			success:function(data) {
				var layer = "#msgSubmit";
				
				if (data==="success") {
					$contactform[0].reset();
					formResult(layer, true, "Message Sent Successfully!");
				} else {
					formResult(layer, false, data);
				}
			}
		});
	}

	/**********************
	    - Form result -
	**********************/
	function formResult(layer, valid, msg) {
		var cls;
		
		if (valid) {
			cls = "h3 text-center text-success";
		} else {
			cls = "h3 text-center text-danger";
		}
		
		$(layer).removeClass().addClass(cls).text(msg);
	}
	
})(jQuery);