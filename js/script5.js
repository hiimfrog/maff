// 미디어 사진

$(document).ready(function() {
    var currentPage = 1;
    var maxPage = 2; // 총 2페이지

    function goToPage(pageNum) {
        currentPage = pageNum;

        $('.page_content').removeClass('active');
        $('#page_' + currentPage).addClass('active');

        $('.page_numbers li').removeClass('active');
        $('.page_numbers li').eq(currentPage - 1).addClass('active');
    }

    $('.page_numbers li').click(function(e) {
        e.preventDefault(); 
        var clickedNum = $(this).index() + 1;
        goToPage(clickedNum);
    });

    $('.pagination .prev').click(function(e) {
        e.preventDefault();
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    });

    $('.pagination .next').click(function(e) {
        e.preventDefault();
        if (currentPage < maxPage) {
            goToPage(currentPage + 1);
        }
    });
});

// 모달

$('.photo img').click(function() {
        let imgSrc = $(this).attr('src'); 
        $('.modal-img').attr('src', imgSrc); 
        $('.image-modal').fadeIn(300); 
    });

    // 모달창(까만 배경)을 클릭했을 때
    $('.image-modal').click(function() {
        $(this).fadeOut(300); // 0.
    });