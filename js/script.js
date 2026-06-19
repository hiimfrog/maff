// 상영작추천 !!! 넘겨지는 포스터

$(document).ready(function() {
  var activeIndex = 0; 
  var totalItems = $('.poster-item').length; // 총 영화 개수 (5개)

  function updateCarousel() {
    $('.poster-item').removeClass('hidden-left prev center next hidden-right');

    var p2 = (activeIndex - 1 + totalItems) % totalItems; // 왼쪽(prev)
    var p1 = (activeIndex - 2 + totalItems) % totalItems; // 왼쪽 밖 숨김
    var p3 = activeIndex;                                  // 중앙(center)
    var p4 = (activeIndex + 1) % totalItems;               // 오른쪽(next)
    var p5 = (activeIndex + 2) % totalItems;               // 오른쪽 밖 숨김

    $('.poster-item').eq(p1).addClass('hidden-left');
    $('.poster-item').eq(p2).addClass('prev');
    $('.poster-item').eq(p3).addClass('center');
    $('.poster-item').eq(p4).addClass('next');
    $('.poster-item').eq(p5).addClass('hidden-right');
  }

  function movePrev() {
    activeIndex = (activeIndex - 1 + totalItems) % totalItems;
    updateCarousel();
  }

  function moveNext() {
    activeIndex = (activeIndex + 1) % totalItems;
    updateCarousel();
  }

  // 고정 화살표 버튼 클릭 이벤트
  $(document).on('click', '.prev-btn', function() {
    movePrev();
  });

  $(document).on('click', '.next-btn', function() {
    moveNext();
  });


  // 오작동 방지 
  var startX = 0;
  var isDragging = false;
  var hasSwiped = false; 
  var threshold = 40;    

  // 터치 및 마우스 시작 시점
  function handleSwipeStart(e) {
    isDragging = true;
    hasSwiped = false; 
    startX = e.type === 'touchstart' ? e.originalEvent.touches[0].clientX : e.clientX;
  }

  // 터치 및 마우스 이동 중 (움직이는 실시간 시점)
  function handleSwipeMove(e) {
    if (!isDragging || hasSwiped) return; 

    var currentX = e.type === 'touchmove' ? e.originalEvent.touches[0].clientX : e.clientX;
    var diffX = startX - currentX;

    if (Math.abs(diffX) > threshold) {
      hasSwiped = true; 
      
      if (diffX > 0) {
        moveNext(); // 왼쪽으로 밀었을 때 -> 다음 영화
      } else {
        movePrev(); // 오른쪽으로 밀었을 때 -> 이전 영화
      }
    }
  }

  function handleSwipeEnd() {
    isDragging = false;
    hasSwiped = false;
  }

  $('.recommend').on({
    'touchstart mousedown': handleSwipeStart,
    'touchmove mousemove': handleSwipeMove,
    'touchend mouseup mouseleave': handleSwipeEnd
  });


  $('.recommend img').on('dragstart', function(e) {
    e.preventDefault();
  });

  updateCarousel();
});





// qna 아코디언 !!!!

$(document).ready(function() {
    $('.faq_title').click(function() {

        var $content = $(this).next('.faq_content');
    
        var $parentLi = $(this).parent('li');

        // 1. 클릭한 항목 토글 (부드럽게 열리거나 닫힘)
        $content.slideToggle(300); 
        $parentLi.toggleClass('active'); 


        $('.faq_content').not($content).slideUp(300);
        $('.faq_title').parent('li').not($parentLi).removeClass('active');
    });
});


// MEDIA (배우들) !!

$(document).ready(function() {
    // 슬라이더 넘기기 기능
    let currentGroup = 0; 
  
    let moveDist = 1350; 

    // 다음 버튼 클릭
    $('.media-next').click(function() {
        if (currentGroup === 0) { 
            currentGroup = 1;
            $('.media-track').css('transform', `translateX(-${moveDist}px)`);
        }
    });

    // 이전 버튼 클릭
    $('.media-prev').click(function() {
        if (currentGroup === 1) { 
            currentGroup = 0;
            $('.media-track').css('transform', `translateX(0px)`);
        }
    });


    // 사진 클릭 시 모달 팝업 !!
    
    // 사진을 클릭했을 때
    $('.media-item img').click(function() {
        let imgSrc = $(this).attr('src'); 
        $('.modal-img').attr('src', imgSrc); 
        $('.image-modal').fadeIn(300); 
    });

    // 모달창 클릭했을 때
    $('.image-modal').click(function() {
        $(this).fadeOut(300); 
    });
});

// AOS 애니메이션 !!
AOS.init({
    duration: 1000, // 애니메이션 속도 (1초)
    once: true     // 한번만 실행, 계속하려면 false로 변경
    
});


