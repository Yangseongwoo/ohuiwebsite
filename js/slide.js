document.addEventListener('DOMContentLoaded', function() {
    const slidesContainer = document.querySelector('.ohui-slides-container');
    const slides = document.querySelectorAll('.ohui-product-panel');
    const prevButton = document.querySelector('.ohui-prev');
    const nextButton = document.querySelector('.ohui-next');
    let currentSlide = 0;

    function updateSlider() {
        slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
    }

    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);
});