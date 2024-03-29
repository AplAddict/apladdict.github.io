/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/

jQuery(document).ready(function ($) {

   /*----------------------------------------------------*/
   /* FitText Settings
   ------------------------------------------------------ */

   setTimeout(function () {
      $('h1.responsive-headline').fitText(1, { minFontSize: '20px', maxFontSize: '90px' });
   }, 100);


   /*----------------------------------------------------*/
   /* Smooth Scrolling
   ------------------------------------------------------ */

   $('.smoothscroll').on('click', function (e) {
      e.preventDefault();

      var target = this.hash,
         $target = $(target);

      $('html, body').stop().animate({
         'scrollTop': $target.offset().top
      }, 800, 'swing', function () {
         window.location.hash = target;
      });
   });


   /*----------------------------------------------------*/
   /* Highlight the current section in the navigation bar
   ------------------------------------------------------*/

   var sections = $("section");
   var navigation_links = $("#nav-wrap a");

   sections.waypoint({

      handler: function (event, direction) {

         var active_section;

         active_section = $(this);
         if (direction === "up") active_section = active_section.prev();

         var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');

         navigation_links.parent().removeClass("current");
         active_link.parent().addClass("current");

      },
      offset: '35%'

   });


   /*----------------------------------------------------*/
   /*	Make sure that #header-background-image height is
   /* equal to the browser height.
   ------------------------------------------------------ */

   $('header').css({ 'height': $(window).height() });
   $(window).on('resize', function () {

      $('header').css({ 'height': $(window).height() });
      $('body').css({ 'width': $(window).width() })
   });


   /*----------------------------------------------------*/
   /*	Fade In/Out Primary Navigation
   ------------------------------------------------------*/

   $(window).on('scroll', function () {

      var h = $('header').height();
      var y = $(window).scrollTop();
      var nav = $('#nav-wrap');

      if ((y > h * .20) && (y < h) && ($(window).outerWidth() > 768)) {
         nav.fadeOut('fast');
      }
      else {
         if (y < h * .20) {
            nav.removeClass('opaque').fadeIn('fast');
         }
         else {
            nav.addClass('opaque').fadeIn('fast');
         }
      }

   });


   /*----------------------------------------------------*/
   /*	Modal Popup
   ------------------------------------------------------*/

   $('.item-wrap a').magnificPopup({

      type: 'inline',
      fixedContentPos: false,
      removalDelay: 200,
      showCloseBtn: false,
      mainClass: 'mfp-fade'

   });

   $(document).on('click', '.popup-modal-dismiss', function (e) {
      e.preventDefault();
      $.magnificPopup.close();
   });


   /*----------------------------------------------------*/
   /*	Flexslider
   /*----------------------------------------------------*/
   $('.flexslider').flexslider({
      namespace: "flex-",
      controlsContainer: ".flex-container",
      animation: 'slide',
      controlNav: true,
      directionNav: false,
      smoothHeight: true,
      slideshowSpeed: 7000,
      animationSpeed: 600,
      randomize: false,
   });

   /*----------------------------------------------------*/
   /*	contact form
   ------------------------------------------------------*/

   $('form#contactForm button.submit').click(function () {

      $('#image-loader').fadeIn();

      var contactName = $('#contactForm #contactName').val();
      var contactEmail = $('#contactForm #contactEmail').val();
      var contactSubject = $('#contactForm #contactSubject').val();
      var contactMessage = $('#contactForm #contactMessage').val();

      var data = 'contactName=' + contactName + '&contactEmail=' + contactEmail +
         '&contactSubject=' + contactSubject + '&contactMessage=' + contactMessage;

      $.ajax({

         type: "POST",
         url: "inc/sendEmail.php",
         data: data,
         success: function (msg) {

            // Message was sent
            if (msg == 'OK') {
               $('#image-loader').fadeOut();
               $('#message-warning').hide();
               $('#contactForm').fadeOut();
               $('#message-success').fadeIn();
            }
            // There was an error
            else {
               $('#image-loader').fadeOut();
               $('#message-warning').html(msg);
               $('#message-warning').fadeIn();
            }

         }

      });
      return false;
   });


});

/*----------------------------------------------------*/
/*	Collapse
------------------------------------------------------*/

function collapse() {
   var moreless = document.getElementById('moreless')
   var content = document.getElementById('collapse-content')
   if (content.style.maxHeight) {
      content.style.maxHeight = null;
      moreless.innerHTML = "more"
   } else {
      content.style.maxHeight = content.scrollHeight + "px";
      moreless.innerHTML = "less"
   }
}

/*----------------------------------------------------*/
/*	Hide/Show
------------------------------------------------------*/
window.addEventListener('hashchange', () => {
   hide();
});

function hide() {
   if (window.location.href.indexOf("btw285") > -1) {
      document.getElementById('about').style.display = "none";
      document.getElementById('resume').style.display = "none";
      document.getElementById('projects').style.display = "none";
      document.getElementById('designReport').style.display = "none";
      document.getElementById('btw285').style.display = "block";
      document.getElementById('btw2852').style.display = "block";
      document.getElementById('portfolio').style.display = "block";
   } else if (window.location.href.indexOf("designReport") > -1) {
      document.getElementById('about').style.display = "none";
      document.getElementById('portfolio').style.display = "none";
      document.getElementById('resume').style.display = "none";
      document.getElementById('projects').style.display = "none";
      document.getElementById('designReport').style.display = "block";
      document.getElementById('btw285').style.display = "none";
      document.getElementById('btw2852').style.display = "none";
   } else {
      document.getElementById('about').style.display = "block";
      document.getElementById('resume').style.display = "block";
      document.getElementById('projects').style.display = "block";
      document.getElementById('designReport').style.display = "none";
      document.getElementById('btw285').style.display = "none";
      document.getElementById('btw2852').style.display = "none";
      document.getElementById('portfolio').style.display = "block";
   }
}