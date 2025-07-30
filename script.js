const wrapper = document.querySelector('.wrapper');
const slides = document.querySelectorAll('.slide'); // updated selector
const next = document.getElementById('next');
const prev = document.getElementById('prev');
const dots = document.querySelectorAll('.dots li');
let currentIndex = 0;
let totalSlides = slides.length;
let autoSlideInterval;
function updateSlider() {
    const slideWidth = slides[0].clientWidth;
    wrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    document.querySelector('.dots li.active')?.classList.remove('active');
    dots[currentIndex].classList.add('active');
}
function startAutoSlide() {
    autoSlideInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlider();
    }, 3000);
}
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}
function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}
next.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalSlides;
    updateSlider();
    resetAutoSlide();
});
prev.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
    updateSlider();
    resetAutoSlide();
});
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentIndex = index;
        updateSlider();
        resetAutoSlide();
    });
});
slides.forEach(slide => {
    slide.addEventListener('mouseenter', () => {
        stopAutoSlide();
    });
    slide.addEventListener('mouseleave', () => {
        startAutoSlide();
    });
});
window.addEventListener('resize', updateSlider);
updateSlider();
startAutoSlide();
