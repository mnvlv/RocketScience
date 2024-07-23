import elements from './ui-elements.js';

export function updateSlider(index) {
    elements.slider.slides.forEach(slide => slide.style.transform = `translateX(-${index * 100}%)`);
    elements.slider.dots.forEach(dot => dot.classList.remove('active'));
    elements.slider.dots[index].classList.add('active');
}
