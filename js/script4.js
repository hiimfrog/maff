// 모바일 예매
$(document).ready(function() {
    var currentIdx = 0; 

    // 1. 마우스 올렸을 때
    $('.how_text ul li').mouseenter(function() {
        var idx = $(this).index() + 1; // 디폴트 이미지가 0번이므로 +1을 해줍니다.
        $('.how_phone img').eq(idx).addClass('active').siblings().removeClass('active');
    });

    // 2. 오른쪽 글 상자를 완전히 벗어났을 때 
    $('.how_text').mouseleave(function() {
        $('.how_phone img').eq(currentIdx).addClass('active').siblings().removeClass('active');
    });

    // 3. 클릭했을 때 고정
    $('.how_text ul li').click(function() {
        var idx = $(this).index() + 1;
        currentIdx = idx; 
        $('.how_phone img').eq(idx).addClass('active').siblings().removeClass('active');
        $(this).addClass('active').siblings().removeClass('active');
    });
});