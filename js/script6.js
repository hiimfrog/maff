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

$(document).ready(function() {
    var reviewIndex = 0; 
    var reviewItems = $('.review-item');
    var totalReviews = reviewItems.length; // 총 3개

    function updateReviewCarousel() {
        reviewItems.removeClass('prev center next');

        // 딱 3개이므로 [이전, 현재, 다음] 계산이 매우 단순해집니다.
        var rPrev = (reviewIndex - 1 + totalReviews) % totalReviews;
        var rCenter = reviewIndex;
        var rNext = (reviewIndex + 1) % totalReviews;

        reviewItems.eq(rPrev).addClass('prev');
        reviewItems.eq(rCenter).addClass('center');
        reviewItems.eq(rNext).addClass('next');
    }

    function reviewMovePrev() {
        reviewIndex = (reviewIndex - 1 + totalReviews) % totalReviews;
        updateReviewCarousel();
    }

    function reviewMoveNext() {
        reviewIndex = (reviewIndex + 1) % totalReviews;
        updateReviewCarousel();
    }

    // 화살표 버튼 클릭
    $(document).on('click', '.review-prev-btn', function() {
        reviewMovePrev();
    });
    $(document).on('click', '.review-next-btn', function() {
        reviewMoveNext();
    });

    // 스와이프 로직 (3개짜리 버전)
    var rStartX = 0;
    var rIsDragging = false;
    var rHasSwiped = false; 
    var rThreshold = 40;    

    function rSwipeStart(e) {
        rIsDragging = true;
        rHasSwiped = false; 
        rStartX = e.type === 'touchstart' ? e.originalEvent.touches[0].clientX : e.clientX;
    }

    function rSwipeMove(e) {
        if (!rIsDragging || rHasSwiped) return; 

        var currentX = e.type === 'touchmove' ? e.originalEvent.touches[0].clientX : e.clientX;
        var diffX = rStartX - currentX;

        if (Math.abs(diffX) > rThreshold) {
            rHasSwiped = true; 
            if (diffX > 0) {
                reviewMoveNext(); 
            } else {
                reviewMovePrev(); 
            }
        }
    }

    function rSwipeEnd() {
        rIsDragging = false;
        rHasSwiped = false;
    }

    $('.review_carousel').on({
        'touchstart mousedown': rSwipeStart,
        'touchmove mousemove': rSwipeMove,
        'touchend mouseup mouseleave': rSwipeEnd
    });

    $('.review_carousel img').on('dragstart', function(e) {
        e.preventDefault();
    });

    // 초기 실행
    updateReviewCarousel();
});
