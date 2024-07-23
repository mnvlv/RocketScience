import elements from './ui-elements.js';

let currIndex = 0;

export function openModal(index) {
    elements.modal.style.display = 'flex';
    elements.modalImg.src = elements.images[index].src;
    currIndex = index;
}

export function closeModal() {
    elements.modal.style.display = 'none';
}

export function showNextImage() {
    currIndex = (currIndex + 1) % elements.images.length;
    elements.modalImg.src = elements.images[currIndex].src;
}

export function showPrevImage() {
    currIndex = (currIndex - 1 + elements.images.length) % elements.images.length;
    elements.modalImg.src = elements.images[currIndex].src;
}
