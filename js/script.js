// 상영작추천 !!! 넘겨지는 포스터

$(document).ready(function() {
  var activeIndex = 0; // 현재 중앙에 위치한 포스터의 인덱스 (0~4)
  var totalItems = $('.poster-item').length; // 총 영화 개수 (5개)

  // 슬라이더 클래스 순환 배치 함수
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

  // 이전/다음으로 넘기는 공통 로직 함수
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


  // 오작동 방지 안전장치가 추가된 스와이프 로직 
  var startX = 0;
  var isDragging = false;
  var hasSwiped = false; // ★ 중요: 한 번의 드래그 동작 동안 이미 회전했는지 여부를 체크하는 잠금장치
  var threshold = 40;    // 민감도 (40px 이상 밀면 바로 이동)

  // 터치 및 마우스 시작 시점
  function handleSwipeStart(e) {
    isDragging = true;
    hasSwiped = false; // 드래그를 새로 시작할 때 잠금장치 해제
    startX = e.type === 'touchstart' ? e.originalEvent.touches[0].clientX : e.clientX;
  }

  // 터치 및 마우스 이동 중 (움직이는 실시간 시점)
  function handleSwipeMove(e) {
    if (!isDragging || hasSwiped) return; // ★ 이미 한 번 넘어갔다면 마우스를 뗄 때까지 이 함수를 완전히 무시합니다.

    var currentX = e.type === 'touchmove' ? e.originalEvent.touches[0].clientX : e.clientX;
    var diffX = startX - currentX;

    // 설정한 민감도(40px) 이상 밀리는 순간 즉시 1칸만 이동시킵니다.
    if (Math.abs(diffX) > threshold) {
      hasSwiped = true; // ★ 즉시 잠금장치를 걸어 연속으로 도는 현상을 원천 차단합니다.
      
      if (diffX > 0) {
        moveNext(); // 왼쪽으로 밀었을 때 -> 다음 영화
      } else {
        movePrev(); // 오른쪽으로 밀었을 때 -> 이전 영화
      }
    }
  }

  // 터치 및 마우스가 끝났을 때 완전히 초기화
  function handleSwipeEnd() {
    isDragging = false;
    hasSwiped = false;
  }

  // 카러셀 영역전체(.carousel-container)에 스와이프 이벤트 바인딩
  $('.recommend').on({
    'touchstart mousedown': handleSwipeStart,
    'touchmove mousemove': handleSwipeMove,
    'touchend mouseup mouseleave': handleSwipeEnd
  });

  // 드래그 도중 이미지 자체를 잡고 흔들 때 생기는 브라우저 기본 드래그 현상 방지
  $('.recommend img').on('dragstart', function(e) {
    e.preventDefault();
  });

  // 웹페이지 최초 실행 시 초기 배치
  updateCarousel();
});





// qna 아코디언 !!!!

$(document).ready(function() {
    $('.faq_title').click(function() {
        // 클릭한 타이틀 바로 다음의 .faq_content를 선택
        var $content = $(this).next('.faq_content');
        // 클릭한 타이틀의 부모 li를 선택
        var $parentLi = $(this).parent('li');

        // 1. 클릭한 항목 토글 (부드럽게 열리거나 닫힘)
        $content.slideToggle(300); // 300ms(0.3초) 동안 애니메이션
        $parentLi.toggleClass('active'); // 화살표 회전용 클래스 토글

        // 2. 내가 클릭한 것 외에 '이미 열려있는 다른 항목들'은 자동으로 닫기
        $('.faq_content').not($content).slideUp(300);
        $('.faq_title').parent('li').not($parentLi).removeClass('active');
    });
});


// MEDIA (배우들) !!

$(document).ready(function() {
    // 슬라이더 넘기기 기능
    let currentGroup = 0; // 0이면 첫 번째 3장, 1이면 두 번째 3장
    
    // (420 너비 + 30 간격) * 3개 = 한 번에 넘어갈 거리(1350px)
    let moveDist = 1350; 

    // 다음 버튼 클릭
    $('.media-next').click(function() {
        if (currentGroup === 0) { // 첫 페이지일 때만 넘기기
            currentGroup = 1;
            $('.media-track').css('transform', `translateX(-${moveDist}px)`);
        }
    });

    // 이전 버튼 클릭
    $('.media-prev').click(function() {
        if (currentGroup === 1) { // 두 번째 페이지일 때만 돌아오기
            currentGroup = 0;
            $('.media-track').css('transform', `translateX(0px)`);
        }
    });


    // 사진 클릭 시 모달 팝업 !!
    
    // 사진을 클릭했을 때
    $('.media-item img').click(function() {
        let imgSrc = $(this).attr('src'); // 클릭한 사진의 src 주소를 가져옴
        $('.modal-img').attr('src', imgSrc); // 모달창 안의 img 태그에 주소 복사
        $('.image-modal').fadeIn(300); // 0.3초 동안 부드럽게 모달창 띄우기
    });

    // 모달창(까만 배경)을 클릭했을 때
    $('.image-modal').click(function() {
        $(this).fadeOut(300); // 0.3초 동안 부드럽게 모달창 닫기
    });
});

// AOS 애니메이션 !!
AOS.init({
    duration: 1000, // 애니메이션 속도 (1초)
    once: true     // 한번만 실행, 계속하려면 false로 변경
});


