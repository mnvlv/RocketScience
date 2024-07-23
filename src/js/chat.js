import elements from './ui-elements.js';

const { userChat, adminChat, messages } = elements.chat;

export function addMessage(sender, message) {
    const messageObj = {
        sender,
        message,
        timestamp: new Date(),
    };
    messages.push(messageObj);
    renderMessages(messages);
}

function formatDate(timestamp) {
    const now = new Date();
    const messageDate = new Date(timestamp);
    const diffTime = now - messageDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) {
        return `Сегодня в ${messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffDays === 1) {
        return `Вчера в ${messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
        return `${messageDate.toLocaleDateString()} ${messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    }
}

function renderMessages(messages) {
    const userMessagesContainer = document.getElementById('user-messages');
    const adminMessagesContainer = document.getElementById('admin-messages');
    const chatWindowScroll = document.querySelector('.chat-window');

    userMessagesContainer.innerHTML = '';
    adminMessagesContainer.innerHTML = '';
    
    messages.forEach((msg) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', msg.sender === 'user' ? 'user' : 'admin');

        const srcImage = msg.sender === 'user' ? './image/iconChat/user-img.svg' : './image/iconChat/admin-img.svg';
        const formattedDate = formatDate(msg.timestamp);

        messageElement.innerHTML = `
            <img src="${srcImage}" alt="" />
            <div class="message-content">
                ${msg.message}
                <div class="timestamp">${formattedDate}</div>
            </div>
        `;

        userMessagesContainer.appendChild(messageElement.cloneNode(true));
        adminMessagesContainer.appendChild(messageElement);

        chatWindowScroll.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'end' });
    });

    userChat.scrollTop = userChat.scrollHeight;
    adminChat.scrollTop = adminChat.scrollHeight;
}
