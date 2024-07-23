import { openModal, closeModal, showNextImage, showPrevImage } from './utils.js';
import elements from './ui-elements.js';
import { updateSlider } from './slider.js';
import { addMessage } from './chat.js';

function handleClickOnWindow(event) {
    if (event.target === elements.modal) {
        closeModal();
    }
}

function handleKeyDown(event) {
    if (event.key === 'ArrowLeft') {
        showPrevImage();
    } else if (event.key === 'ArrowRight') {
        showNextImage();
    } else if (event.key === 'Escape') {
        closeModal();
    }
}

function handleSendMessageUser() {
    const message = elements.chat.userMessageInput.value.trim();
    if (message) {
        addMessage('admin', message);
        elements.chat.userMessageInput.value = '';
    }
}

function handleSendMessageAdmin() {
    const message = elements.chat.adminMessageInput.value.trim();
    if (message) {
        addMessage('user', message);
        elements.chat.adminMessageInput.value = '';
    }
}

function handleSendMessageOnKeyPress(e, sender) {
    if (e.key === 'Enter') {
        if (sender === 'user') {
            handleSendMessageUser();
        } else if (sender === 'admin') {
            handleSendMessageAdmin();
        }
    }
}

elements.images.forEach((img, index) => {
    img.addEventListener('click', () => openModal(index));
});

window.addEventListener('click', handleClickOnWindow);
document.addEventListener('keydown', handleKeyDown);
elements.closeBtn.addEventListener('click', closeModal);
elements.prevBtn.addEventListener('click', showPrevImage);
elements.nextBtn.addEventListener('click', showNextImage);

elements.slider.dots.forEach((dot, index) => {
    dot.addEventListener('click', () => updateSlider(index));
});

elements.chat.sendUserButton.addEventListener('click', handleSendMessageUser);
elements.chat.sendAdminButton.addEventListener('click', handleSendMessageAdmin);
elements.chat.userMessageInput.addEventListener('keypress', (e) => handleSendMessageOnKeyPress(e, 'user'));
elements.chat.adminMessageInput.addEventListener('keypress', (e) => handleSendMessageOnKeyPress(e, 'admin'));
