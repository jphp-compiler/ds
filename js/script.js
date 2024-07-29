$(document).ready(function() {
	$('#page-content').corner("5px top cc:#B8B8B8");
	$('#footer').corner("5px bottom cc:#B8B8B8");
	
	$('.left-content').corner("5px bl");
	$('.center-content').corner("5px br");
	
	$('#scroller').corner("5px cc:#B8B8B8");	
	$('#scroller-other').corner("5px cc:#B8B8B8");	
	$('#top-menu').corner("5px left cc:#970000");	

	//$('#at_frm_bitrix').corner("5px");	
	
	$('.indexDownload h4').corner("5px top cc:#252525");
	$('.indexDownload').corner("5px cc:#252525");

	// Set correct height for content div
	var content_height = ($('td.center-column').height())+'px';
	$('div.center-content, div.left-content').css('height', content_height);
	
	$("div.gallery a").fancybox({
		//'titleShow'		: false
	});
	
	
	$('#a a')
		.css( {backgroundPosition: "-20px 35px"} )
		.mouseover(function(){
			$(this).stop().animate({backgroundPosition:"(-20px 94px)"}, {duration:500})
		}).mouseout(function(){
			$(this).stop().animate({backgroundPosition:"(40px 35px)"}, {duration:200, complete:function(){
				$(this).css({backgroundPosition: "-20px 35px"})
			}})
	});
	
  var currentPosition = 0;
  var slideWidth = 560;
  var slides = $('.slide');
  var numberOfSlides = slides.length;

  // Remove scrollbar in JS
  $('#slidesContainer').css('overflow', 'hidden');

  // Wrap all .slides with #slideInner div
  slides
    .wrapAll('<div id="slideInner"></div>')
    // Float left to display horizontally, readjust .slides width
	.css({
      'float' : 'left',
      'width' : slideWidth
    });

  // Set #slideInner width equal to total width of all slides
  $('#slideInner').css('width', slideWidth * numberOfSlides);

  // Insert controls in the DOM
  $('#slideshow')
    .prepend('<span class="control" id="leftControl">Clicking moves left</span><span class="control-not-active" id="leftControl-not-active" style="display:none;">&nbsp</span>')
    .append('<span class="control" id="rightControl">Clicking moves right</span><span class="control-not-active" id="rightControl-not-active" style="display:none;">&nbsp</span>');

  // Hide left arrow control on first load
  manageControls(currentPosition);

  // Create event listeners for .controls clicks
  $('.control')
    .bind('click', function(){
    // Determine new position
	currentPosition = ($(this).attr('id')=='rightControl') ? currentPosition+1 : currentPosition-1;

	// Hide / show controls
    manageControls(currentPosition);
	manageButtonControls(currentPosition);
	
    // Move slideInner using margin-left
    $('#slideInner').animate({
      'marginLeft' : slideWidth*(-currentPosition)
    });
  });

  // manageControls: Hides and Shows controls depending on currentPosition
  function manageControls(position){
    // Hide left arrow if position is first slide
	if(position==0){
		$('#leftControl').hide();
		$('#leftControl-not-active').show();
	} else{
		$('#leftControl').show();
		$('#leftControl-not-active').hide();
	}
	// Hide right arrow if position is last slide
    if(position==numberOfSlides-1){
    	$('#rightControl').hide();
    	$('#rightControl-not-active').show();
    } else{
    	$('#rightControl').show();
    	$('#rightControl-not-active').hide();
    }
  }	
  
  
  // CUSTOM SOULSTREAM
  
	function manageButtonControls(position){
		$("#slideshow-control div").removeClass("selected");
		$("#slideshow-control").children("div").eq(position).addClass("selected");
	}
  
	/*function ShowSlide(position){
		// Determine new position
		currentPosition = position;
		
		// Hide / show controls
		manageControls(currentPosition);
		manageButtonControls(currentPosition);
		
		// Move slideInner using margin-left
		$('#slideInner').animate({
			'marginLeft' : slideWidth*(-currentPosition)
		});
	}*/

	$("#slideshow-control div").click(function(){
	var obj = $(this).parent("div").children("div");
	
		// Determine new position
		currentPosition = obj.index(this);
		
		obj.removeClass("selected");
		$(this).addClass("selected");
		
		// Hide / show controls
		manageControls(currentPosition);
		
		// Move slideInner using margin-left
		$('#slideInner').animate({
			'marginLeft' : slideWidth*(-currentPosition)
		});
	});
	$("#slideshow-control div").eq(0).addClass("selected");
});
