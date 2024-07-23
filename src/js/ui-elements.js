const elements = {
    modal: document.querySelector('#myModal'),
    closeBtn: document.querySelector('.close'),
    prevBtn: document.querySelector('.prev'),
    nextBtn: document.querySelector('.next'),
    images: Array.from(document.querySelectorAll('.review-card img')),
    modalImg: document.querySelector('#modal-img'),

    slider: {
        slider: document.querySelector('.reviews-slider'),
        slides: Array.from(document.querySelectorAll('.slide')),
        dots: Array.from(document.querySelectorAll('.dot')),
    },

    chat: {
        userChat: document.querySelector('#chat-user'),
        adminChat: document.querySelector('#chat-admin'),
        userMessageInput: document.querySelector('#user-message'),
        adminMessageInput: document.querySelector('#admin-message'),
        sendUserButton: document.querySelector('#send-user'),
        sendAdminButton: document.querySelector('#send-admin'),
        messages: [],
    },
};

export default elements;
