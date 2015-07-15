// you can enter your JS here!
$("document").ready(function() {

    
    
//SLIDER begin 
  var currentIndex = 0;
  var items = $('.slider .container .imgSlider');
  var itemsSlider = $('.photos ul li');
  var itemAmt = itemsSlider.length;
  var slidetime = 2500; // slide time

// create images

    $('.photos li').each(function() {
      var imageCaption  = $(this).find('img').attr('alt');
      var imgSrc = $(this).find('a').attr('href');
         $('.slider .container').append('<div class=imgSlider><h2 class=desc>'+imageCaption+'</h2><img src='+imgSrc+'></div>');
    });    
    


    function cycleItems() {
        var item = $('.slider .container .imgSlider').eq(currentIndex);
        $('.slider .container .imgSlider').hide();
        item.fadeIn('slow');
        }
    
    $('.slider .container .imgSlider').eq(0).show();
    
    var autoSlide = setInterval(function() {
    currentIndex += 1;
    if (currentIndex > itemAmt - 1) {
        currentIndex = 0;
        }
        cycleItems();
    }, slidetime);
					

    // thumb nav

    $('.one_photo').click(function(e) {
    e.preventDefault();
    clearInterval(autoSlide);
    currentIndex = $(this).prevAll().length;
    cycleItems();


    });

// next nav
    $('.next').click(function() {
    clearInterval(autoSlide);
    currentIndex += 1;
    if (currentIndex > itemAmt - 1) {
        currentIndex = 0;
    }
        cycleItems();
    });

// prev nav
    $('.prev').click(function() {
    clearInterval(autoSlide);
    currentIndex -= 1;
    if (currentIndex < 0) {
        currentIndex = itemAmt - 1;
    }
        cycleItems();
    });

// END SLIDER


// Sort Room Table
	var sortStatus;


	function sortTableRoom(table, order) {
        var tbody = table.find('tbody');
		
        tbody.find('tr:not(.accordion)').sort(function(a, b) {
             return $('td:first', a).text().localeCompare($('td:first', b).text());
             
        }).appendTo(tbody);
    }
	
	function sortOcupancy(table, order) {
        var asc   = order === 'asc',
            tbody = table.find('tbody');
		
        tbody.find('tr').sort(function(a, b) {
            if (asc) {
                return $('td:nth-child(2)', a).text().localeCompare($('td:nth-child(2)', b).text());
            } else {
                return $('td:nth-child(2)', b).text().localeCompare($('td:nth-child(2)', a).text());
            }
        }).appendTo(tbody);
    }	

// Sort room name
	// Auto sort alphabetical order on load document
	sortTableRoom($('.rooms_table'));                        ////////////////

	// Sort ocupancy
    $('thead').find('.room_occupancy span').click(function(){
        if (sortStatus != 'asc' || sortStatus =='' ){
		sortOcupancy($('.rooms_table'),'asc');
		sortStatus = 'asc';
		} else {
		sortOcupancy($('.rooms_table'),'desc');
		sortStatus = 'desc';
		}
       });


var sortStatus2 = false;
    
	// Sort price
    $('thead').find('.room_price span').click(function(){
     var $table  = $('.rooms_table'),            // cache the target table DOM element
         $rows   = $('tbody > tr', $table);     // cache all rows from the target table body

    $rows.sort(function(a, b) {

        var keyA = parseFloat($('td.room_price',a).text().replace(/€/g, ''));
        var keyB = parseFloat($('td.room_price',b).text().replace(/€/g, ''));

        return keyA - keyB;

        
        });
        $rows.each(function(index, row){
        $table.append(row);                    // append rows after sort
        });
    });    
    
    

 
    
// Price calc
	$('.total').text('');

    $('.room_quantity').find('select').change(function() {
        update_amounts();
    });

function update_amounts() {
    var sum = 0.0;
    $('.rooms_table > tbody  > tr').each(function() {
        var qty = $(this).find('option:selected').text();
        var price = $(this).find('.room_price').text().replace(/€/g, '');
		var amount = (qty*price);
        sum+=amount;
        $('.rooms_table').find('.total').text('€'+sum.toFixed(2));
	});
	}	

// More detail

	 $('.rooms_table tbody').find('.room_name').hover(function(){

        var title = $(this).attr('title');
        $(this).data('tipText', title).removeAttr('title');
        $('<p class="tooltip"></p>')
        .text(title)
        .appendTo('body')
        .fadeIn('slow');
}, function() {
        // Hover out code
        $(this).attr('title', $(this).data('tipText'));
        $('.tooltip').remove();
        }).mousemove(function(e) {
        var mousex = e.pageX + 20;
        var mousey = e.pageY - 95;
         $('.tooltip').css({ top: mousey, left: mousex })
        });

// Pagination
    var sizesplit = 5; // Size of pagination
    var totalPagSize = Math.ceil($('.reviews_list li').size()/sizesplit);
    var pagPosition = 1;
    
    function showPagNav() {
        if (pagPosition==1) {
                $('.prev_').hide();
                $('.separator').hide();
        } else if (pagPosition > 1 && pagPosition < totalPagSize) 
        {
                $('.prev_').show();
                $('.separator').show();
                $('.next_').show();
        } else if (pagPosition==totalPagSize){
                $('.next_').hide();
                $('.separator').hide();
        }
    }
    $('.reviews').each(function () {
        var foo = $(this);
        $(this).find('h2').append('<span class="pag_nav"><a class="prev_">prev</a><span class="separator"> | </span> <a class="next_">next</a></span>');
        $(this).find('ul li:gt('+(sizesplit - 1)+')').hide();

        
        $(this).find('.next_').click(function () {
            var last = $('ul',foo).children('li:visible:last');
            last.nextAll(':lt('+sizesplit+')').show();
            last.next().prevAll().hide();
            pagPosition += 1;
            showPagNav();
        });

        $(this).find('.prev_').click(function () {
            var first = $('ul',foo).children('li:visible:first');
            first.prevAll(':lt('+sizesplit+')').show();
            first.prev().nextAll().hide();
            pagPosition -= 1;
            showPagNav();
        });

    });
    showPagNav();

    
//Feed JSON    
    $.getJSON('data.json', function(data) {
    var jsonURL = 'data.json';
      $.getJSON(jsonURL, function (json){
        var imgList= '';
        $.each(json.Hotels, function () {
          imgList += '<li><div class="image"><img src= "' + this.imgPath + '"></div><div class="title">'+this.name+'</div><div class="content">'+this.desc+'</div></li>';
        });
       $('#showdata').append(imgList);
      });

    });
    
// MAPS

    $(".mark img").hover(function(e){
        x=e.pageX;
		y=e.pageY;
      var pos   = $(this).position();
      var elPos = { X:pos.left , Y:pos.top };
      var mPos  = { X:e.clientX-elPos.X, Y:e.clientY-elPos.Y };

        $("#mapImg").css({'left':mPos.X - 50+'px','top':mPos.Y - 100+'px'})
                         .html("<img src="+ $(this).attr("alt") +" alt='Large Image' /><br/>"+$(this).attr("rel"))
                         .fadeIn("slow");
		}, function(){
			$("#mapImg").fadeOut("fast");
		});	
	

    
    
});     // END DOCUMENT
    
 
