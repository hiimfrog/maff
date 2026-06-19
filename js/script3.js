$(function() {
  const moveAmount = 1380; // 한 번에 이동할 거리
  const transitionTime = 500; // 넘어가는 시간 0.5초 (500ms)
  let isAnimating = false; // 광클 방지용

  const $track = $('.slider-track');
  const $dots = $('.dot');

  // ★ 1단계: 눈속임을 위한 '복제본(Clone)' 만들기 ★
  const $slides = $('.slide'); // 원본 9개의 사진
  
  // 맨 뒤에 붙일 1페이지 복제본 (1, 2번째 사진)
  const $firstPageClone = $slides.slice(0, 2).clone();
  // 맨 앞에 붙일 마지막 페이지 복제본 (9번째 사진)
  const $lastItemClone = $slides.eq(8).clone();
  // 9번째 사진은 한 장이라 옆자리가 비어있으므로, 투명한 빈 슬라이드를 만들어 짝을 맞춤
  const $emptySlide = $('<div class="slide" style="visibility: hidden;"></div>');

  // ★ 2단계: 트랙 앞뒤에 복제본 몰래 붙여넣기 ★
  // 뒤쪽에 9번 사진 옆 빈칸 추가, 그 뒤에 1페이지 복제본 추가
  $track.append($emptySlide.clone()); 
  $track.append($firstPageClone);

  // 앞쪽에 9번 사진 옆 빈칸 추가, 그 앞에 9번 사진 복제본 추가
  $track.prepend($emptySlide.clone());
  $track.prepend($lastItemClone);

  // ★ 3단계: 시작 위치 조정 ★
  // 맨 앞에 복제본 1페이지 분량이 들어갔으므로, 시작 위치를 한 칸(-1380px) 밀어줍니다.
  $track.css({
    'transition': 'none',
    'transform': `translateX(-${moveAmount}px)`
  });

  // 이제 진짜 1페이지의 인덱스는 0이 아니라 1이 되었습니다!
  let currentIndex = 1; 
  const totalPages = 5; // 실제 페이지 수

  // 슬라이더 이동 함수
  function updateSlider(animate = true) {
    if (animate) {
      $track.css('transition', `transform ${transitionTime}ms ease-in-out`);
    } else {
      $track.css('transition', 'none'); // 몰래 순간이동할 때는 애니메이션 끄기!
    }
    $track.css('transform', `translateX(-${currentIndex * moveAmount}px)`);

    // 점 색상 맞추기 (인덱스 1~5를 점 0~4에 매칭)
    let dotIndex = currentIndex - 1;
    if (dotIndex < 0) dotIndex = totalPages - 1;
    if (dotIndex >= totalPages) dotIndex = 0;

    $dots.removeClass('active');
    $dots.eq(dotIndex).addClass('active');
  }

  // '다음' 버튼 클릭
  $('.btn-next').on('click', function() {
    if (isAnimating) return;
    isAnimating = true;
    
    currentIndex++;
    updateSlider(true); // 애니메이션 켜고 다음으로 이동

    // 만약 방금 도착한 곳이 맨 뒤에 만들어둔 '가짜 1페이지'라면?
    if (currentIndex === totalPages + 1) {
      setTimeout(function() {
        currentIndex = 1; // 변수를 '진짜 1페이지'로 바꾸고
        updateSlider(false); // 애니메이션 없이 0.001초만에 진짜 위치로 순간이동!
        isAnimating = false;
      }, transitionTime); // 슬라이드 이동이 끝난 직후(0.5초 뒤)에 실행
    } else {
      setTimeout(function() { isAnimating = false; }, transitionTime);
    }
  });

  // '이전' 버튼 클릭
  $('.btn-prev').on('click', function() {
    if (isAnimating) return;
    isAnimating = true;

    currentIndex--;
    updateSlider(true);

    // 만약 방금 도착한 곳이 맨 앞에 만들어둔 '가짜 마지막 페이지'라면?
    if (currentIndex === 0) {
      setTimeout(function() {
        currentIndex = totalPages; // 변수를 '진짜 마지막 페이지'로 바꾸고
        updateSlider(false); // 몰래 순간이동!
        isAnimating = false;
      }, transitionTime);
    } else {
      setTimeout(function() { isAnimating = false; }, transitionTime);
    }
  });

  // 하단 점 클릭
  $dots.on('click', function() {
    if (isAnimating) return;
    currentIndex = $(this).index() + 1; // 점 번호에 +1 하면 트랙 번호가 됨
    updateSlider(true);
  });
});

