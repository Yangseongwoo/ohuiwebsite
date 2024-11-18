// throttle 함수 정의
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

document.addEventListener('DOMContentLoaded', function() {
    const section = document.querySelector('.story-section');
    const images = document.querySelectorAll('.background-image');
    const verticalScrollBar = document.querySelector('.vertical-scroll-bar');

    // 필수 요소 확인
    if (!section || !verticalScrollBar || images.length === 0) {
        console.error('필수 요소가 없습니다.');
        return;
    }

    // 초기 이미지 위치 설정
    function initializeImages() {
        images.forEach((image) => {
            image.style.transform = 'translateY(100vh)';
            image.style.opacity = '0';
        });
    }

    // 페이지 로드 시 초기화
    initializeImages();

    // 스크롤 진행률 계산 함수
    function calculateScrollProgress() {
        const sectionTop = section.offsetTop;
        const scrollPosition = window.pageYOffset - sectionTop;
        const sectionHeight = section.offsetHeight - window.innerHeight;
        return scrollPosition / sectionHeight;
    }

    // 이미지 위치 업데이트 함수
    function updateImagePosition(image, imageScrollProgress) {
        const moveAmount = Math.min(Math.max(imageScrollProgress, 0), 1);
        const translateY = 100 - (moveAmount * 200);
        
        image.style.transform = `translateY(${translateY}vh)`;
        image.style.opacity = imageScrollProgress > 0 && imageScrollProgress < 1 ? 1 : 0;
    }

    // 스크롤 이벤트 핸들러
    const handleScroll = throttle(function() {
        const scrollProgress = calculateScrollProgress();
        
        // 스크롤바 업데이트
        verticalScrollBar.style.height = `${Math.max(0, Math.min(100, scrollProgress * 100))}%`;
        
        // 이미지 애니메이션
        const totalImages = images.length;
        const scrollPerImage = 0.8 / totalImages;

        images.forEach((image, index) => {
            const startProgress = index * scrollPerImage;
            const imageScrollProgress = (scrollProgress - startProgress) / scrollPerImage;
            updateImagePosition(image, imageScrollProgress);
        });
    }, 16); // 약 60fps

    window.addEventListener('scroll', handleScroll);
});
