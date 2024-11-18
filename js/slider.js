const productData = [
    {
        title: 'New Product',
        subtitle: 'THE FIRST GENITURE',
        description: '피부 근본으로부터 다시 깨어나는 변화 <br> 영원히 빛나는 아름다움',
        image: 'images/New product.png'
    },
    {
        title: 'New Product 2',
        subtitle: 'SECOND GENITURE',
        description: '또 다른 혁신적인 제품 <br> 시간을 뛰어넘는 아름다움',
        image: 'images/New product2.png'
    },
    {
        title: 'New Product 3',
        subtitle: 'THIRD GENITURE',
        description: '혁신과 지속 가능성을 겸비한 새로운 제품 <br> 미래로 가는 아름다움',
        image: 'images/New product3.png'
    },
    {
        title: 'New Product 4',
        subtitle: 'FOURTH GENITURE',
        description: '자연의 힘으로 만들어진 특별한 제품 <br> 자연 그대로의 아름다움',
        image: 'images/New product4.png'
    }
];

const titleEl = document.getElementById('product-title');
const subtitleEl = document.getElementById('product-subtitle');
const descriptionEl = document.getElementById('product-description');
const imageEl = document.getElementById('product-image');
const progressBar = document.querySelector('.progress');
const progressLabelLeft = document.querySelectorAll('.progress-label')[0];
const progressLabelRight = document.querySelectorAll('.progress-label')[1];
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

let currentIndex = 0;
const slideDuration = 6000; // 3초
let slideInterval;

function updateContent() {
    const data = productData[currentIndex];
    
    // 텍스트와 이미지 업데이트
    titleEl.textContent = data.title;
    subtitleEl.textContent = data.subtitle;
    descriptionEl.innerHTML = data.description; // HTML 포맷 유지
    imageEl.src = data.image;

    // 진행 바 숫자 업데이트
    progressLabelLeft.textContent = `0${currentIndex + 1}`;
    progressLabelRight.textContent = `0${(currentIndex + 2) <= productData.length ? currentIndex + 2 : 1}`; // 마지막 슬라이드 넘으면 01로 다시
}

function startProgress() {
    // 재생 바를 0으로 초기화하고 시작
    progressBar.style.transition = 'none'; // 트랜지션 중단
    progressBar.style.width = `0%`; // 바 초기화
    setTimeout(() => {
        progressBar.style.transition = 'width 3s linear'; // 다시 트랜지션 추가
        progressBar.style.width = `100%`; // 3초 동안 채우기
    }, 50); // 짧은 딜레이 후 다시 트랜지션 적용
    
    // 자동 슬라이드 타이머 시작
    slideInterval = setTimeout(() => {
        nextSlide(); // 다음 슬라이드로 전환
    }, slideDuration);
}

// 다음 슬라이드
function nextSlide() {
    currentIndex = (currentIndex + 1) % productData.length; // 다음 인덱스로 전환
    updateContent(); // 다음 슬라이드 업데이트
    startProgress(); // 다음 슬라이드 진행
}

// 이전 슬라이드
function prevSlide() {
    currentIndex = (currentIndex - 1 + productData.length) % productData.length; // 이전 인덱스로 전환
    updateContent(); // 이전 슬라이드 업데이트
    startProgress(); // 다음 슬라이드 진행
}

// 첫 슬라이드 시작
updateContent();
startProgress();

// 화살표 클릭 이벤트 추가
nextBtn.addEventListener('click', () => {
    clearTimeout(slideInterval); // 현재 진행 중인 타이머 제거
    nextSlide(); // 다음 슬라이드로 전환
});

prevBtn.addEventListener('click', () => {
    clearTimeout(slideInterval); // 현재 진행 중인 타이머 제거
    prevSlide(); // 이전 슬라이드로 전환
});


