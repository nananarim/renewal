window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});


$('.carousel').carousel()

// 자세히보기 hover
$('.hover').mouseenter(function(){
  $('.hover').css('background-color', 'white');
  $('.hover').css('color', 'black');
});
$('.hover').mouseleave(function(){
  $('.hover').css('background-color', 'transparent');
  $('.hover').css('color', 'white');
});

// swiper

window.onload = function(){
	
	var $window = $(window) ;

  var sec3SwiperNum = $('.sec3-swiper .swiper-slide').length;
  var sec3Swiper = new Swiper(".sec3-swiper", { 
      slidesPerView: 1.38, 
      allowTouchMove:true, 
      loop:true , 
      spaceBetween: 15, 
      centeredSlides: true, 
      autoplay: {
          delay: 4000,
          disableOnInteraction: false
      },
      pagination: {
        el:'.sec3-slider .swiper-pagination', 
        clickable:true, 
        renderBullet:function(index, className){
            return '<a class="' + className + '">0'+(index + 1)+'</a>';
        },
      },
      breakpoints: {
        991: {
          slidesPerView: "auto", 
          //allowTouchMove:false,
          centeredSlides: false, 
          spaceBetween: 30, 
          navigation: {
            nextEl: ".sec3-button-next",
            prevEl: ".sec3-button-prev",
          },
        },
      },
      on:{
          init:function(){ 
              //$('.main-sec3 .space-swiper-pn>i').css('width',1/sec3SwiperNum*100+'%');  
              $('.main-sec3 .space-swiper-pn>i').removeClass('progressing') ;
			  console.log('sect3');
          }, 
          slideChangeTransitionStart: function(){  
            var loadHtml1 = $('.sec3-slider .swiper-slide-active .part1>p').html(); 
            var loadHtml2 = $('.sec3-slider .swiper-slide-active .part2').html();  
            $('.main-sec3 .load-cont .part1>p').html(loadHtml1) ;
            $('.main-sec3 .load-cont .part2').html(loadHtml2) ;
            $('.main-sec3 .space-swiper-pn>i').removeClass('progressing') ;
          },
          slideChange: function(e){  
              //$('.main-sec3 .space-swiper-pn>i').css('margin-left',(this.realIndex)/sec3SwiperNum*100+'%');  
            var pn = e.realIndex + 1 ;
            $('.sec3-slider .swiper-pagination a').eq(0).text("0"+pn ) ; 
              setTimeout(function(){
                $('.main-sec3 .space-swiper-pn>i').addClass('progressing') ;
              },500);
          },
      },
  });
  sec3Swiper.autoplay.stop(); 

  

  $window.scroll(function(){ 
    var sec3top = $('.sec3-swiper').offset().top; // console.log(($window.scrollTop() + $window.height()) ,sec3top ) ;
    if ( ($window.scrollTop() + $window.height()) >= sec3top ) {
      sec3Swiper.autoplay.start();
    } 
  }).trigger('scroll');
  
 
 // $window.resize(function(){ 
//	  console.log('?');
//	sec3Swiper.update();
 // });
  

  
} ;


// footer

$("#footer .footer_contents .info_cont .relation_svc").bind("click",langSelectClickListener);
$("#footer .footer_contents .info_cont .relation_svc .list_relation").bind("mouseleave",familySelectMouseOutListener);

function langSelectClickListener(){
  //console.log($(this).hasClass("active"))
  if($(this).hasClass("active")){
      $(this).removeClass("active");
  }else{
      $(this).addClass("active");
  }
}
function langselectMouseOutListener(){
  if($("#gnb .gnb_right .select_lang").hasClass("active")){
      $("#gnb .gnb_right .select_lang").removeClass("active");
  }
}
function familySelectMouseOutListener(){
  if($("#footer .footer_contents .info_cont .relation_svc").hasClass("active")){
      $("#footer .footer_contents .info_cont .relation_svc").removeClass("active");
  }

}


// slider

$(function (){   
	'use strict';
	var $window = $(window),
    $hd = $('header'),hdTatget = $hd.height(),
		$gnb = $('.gnb'),
		$wrap = $('#wrap'),
		$body = $('body'), tD = 0; 
  
  var visualSwiperNum = $('.visual-swiper .swiper-slide').length;
  var visualSwiper = new Swiper(".visual-swiper", {  
      //effect: 'fade',
      loop: true, 
      autoplay: {
          delay: 8000,
          disableOnInteraction: false
      },
      navigation: {
        nextEl: ".visual-button-next",
        prevEl: ".visual-button-prev",
      },
      pagination: {
          el:'.main-visual .swiper-pagination',
          clickable:true,
          renderBullet:function(index, className){
              return '<a class="' + className + '">0'+(index + 1)+'</a>';
          },
      },
      on:{
          init:function(){  
              var titleText = $('.main-visual .swiper-slide-active').find('span.title').text();
              var titleLink = $('.main-visual .swiper-slide-active').find('span.link').text();
              $('.main-visual .swiper-control p.title').text(titleText); 
              $('.main-visual article .more a').attr('href',titleLink); 
			  if(titleLink) { $('.main-visual article .more').css({'opacity':1}) ; } else { $('.main-visual article .more').css({'opacity':0}) ; }

              $('.main-visual .space-swiper-pn>i').removeClass('progressing') ;
              playVideo($('.main-visual .swiper-slide-active'));
          },
          slideChangeTransitionStart: function(e){ 
              var titleText = $('.main-visual .swiper-slide-active').find('span.title').text();
              var titleLink = $('.main-visual .swiper-slide-active').find('span.link').text();
              $('.main-visual .swiper-control p.title').text(titleText); 
              $('.main-visual article .more a').attr('href',titleLink); 
			  if(titleLink) { $('.main-visual article .more').css({'opacity':1}) ; } else { $('.main-visual article .more').css({'opacity':0}) ; }

              $('.main-visual .space-swiper-pn>i').removeClass('progressing') ;
              var pn = e.realIndex + 1 ; 
              $('.main-visual .swiper-pagination a').eq(0).text("0"+pn ) ; 
          },
          slideChangeTransitionEnd: function(e){   
              setTimeout(function(){
                $('.main-visual .space-swiper-pn>i').addClass('progressing') ;
                playVideo($('.main-visual .swiper-slide-active'));
              },500);
          },
      },
  }); 

  function playVideo (ele) {
    $('video')[0].pause()
    if (ele.find('video').length) {
      ele.find('video')[0].play()
    }
  }
   
  var sec1Swiper = new Swiper(".sec1-swiper", { 
      slidesPerView: 1.3,
      spaceBetween: 15, 
      centeredSlides: true, 
      autoplay: {
          delay: 4000,
          disableOnInteraction: false
      },
      // pagination: {
      //     el:'.sec1-slider .swiper-pagination', 
      // },
      pagination: {
          el:'.sec1-slider .swiper-pagination',
          clickable:true,
          renderBullet:function(index, className){
              return '<a class="' + className + '">0'+(index + 1)+'</a>';
          },
      },
      breakpoints: {
        991: { 
          autoplay: false,
          slidesPerView: 3,
          spaceBetween: 40,
          centeredSlides: false, 
          allowTouchMove:false,
        },
      },
      
      on:{
        init:function(){   
            $('.sec1-slider .space-swiper-pn>i').addClass('progressing') ; 
        },
        slideChangeTransitionStart: function(e){    
          var pn = e.realIndex + 1 ;
          $('.sec1-slider .space-swiper-pn>i').removeClass('progressing') ;
          $('.sec1-slider .swiper-pagination a').eq(0).text("0"+pn ) ; 
        },
        slideChangeTransitionEnd: function(){   
            setTimeout(function(){
              $('.sec1-slider .space-swiper-pn>i').addClass('progressing') ; 
            },200);
        },
    },

  });
 
  if($window.width() > 991 ) {
  var sec2html= '<div class="swiper-slide only-pc">'
    +'  <div class="box-pc" style="background-image:url(image/icon/bg5.png)">'
    +'      <p class="obj ani ani-delay05" style="background-image:url(image/icon/png6.png)"></p>'
    +'      <div class="wrap"> '
    +'      </div>'
    +'  </div> '
    +'</div>';
  $('.sec2-swiper .swiper-wrapper').prepend(sec2html);
}

  var sec2Swiper = new Swiper(".sec2-swiper", { 
      slidesPerView: 1,  
      loop:true ,
      // loop:true ,   
      // pagination: {
      //     el:'.sec2-slider .swiper-pagination-mo', 
      //     clickable:true,
      // },
      autoplay: {
        delay: 4000,
        disableOnInteraction: false
      },
      pagination: {
        el:'.sec2-slider .swiper-pagination-mo',
        clickable:true,
        renderBullet:function(index, className){
            return '<a class="' + className + '">0'+(index + 1)+'</a>';
        },
      },
      breakpoints: {
        991: { 
            effect:'fade', 
            // loop:false ,   
            pagination: {
                el:'.sec2-slider .swiper-pagination', 
                clickable:true,
                renderBullet:function(index, className){ 
                  var pnText=$('.sec2-swiper .swiper-slide').eq(index+1).find('h4').html() ;
                  return '<a class="' + className + '">'+pnText+'</a>'; 
                },
            }, 
        },
      },

      on:{
        init:function(){   
          if( $(window).window>991 ) { 
            $('.sec2-swiper .swiper-slide').each(function(e){  
              var pnText=$('.sec2-swiper .swiper-slide').eq(e).find('h4').html() ;
              $('.sec2-swiper-thumb .swiper-slide').eq(e).html(pnText) ;
            });
          }
            $('.sec2-slider .space-swiper-pn>i').addClass('progressing') ; 
        },
        slideChangeTransitionStart: function(e){ 
          $('.sec2-slider .space-swiper-pn>i').removeClass('progressing') ;
        },
        slideChangeTransitionEnd: function(e){  
          // var pn = e.activeIndex ? e.activeIndex : e.realIndex;
          var pn = e.realIndex + 1 ;
          $('.sec2-slider .swiper-pagination-mo a').eq(0).text("0"+pn ) ; 
            setTimeout(function(){
              $('.sec2-slider .space-swiper-pn>i').addClass('progressing') ; 
            },200);
        }, 
      },
  });
});