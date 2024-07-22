// lightbox.option({
//   resizeDuration: 200,
//   wrapAround: true,
// });

// document.querySelectorAll(".more-images").forEach((item) => {
//   item.addEventListener("click", (event) => {
//     alert("Открыть галерею");
//   });
// });

// Слайдер
const slider = document.querySelector(".reviews-slider");
const dots = document.querySelectorAll(".dot");

let currentIndex = 0;

function updateSlider(index) {
  slider.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach((dot) => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    updateSlider(index);
    currentIndex = index;
  });
});

let startX, scrollLeft, isDown = false;

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  slider.classList.add("active");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener("mouseleave", () => {
  isDown = false;
  slider.classList.remove("active");
});

slider.addEventListener("mouseup", () => {
  isDown = false;
  slider.classList.remove("active");
  const index = Math.round(slider.scrollLeft / slider.clientWidth);
  updateSlider(index);
  currentIndex = index;
});

slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 3; //scroll-fast
  slider.scrollLeft = scrollLeft - walk;
});
























///////////////////////////////////////////////
const userChat = document.getElementById("chat-user");
const adminChat = document.getElementById("chat-admin");
const userMessageInput = document.getElementById("user-message");
    const adminMessageInput = document.getElementById("admin-message");
    const sendUserButton = document.getElementById("send-user");
    const sendAdminButton = document.getElementById("send-admin");

    const messages = [];

    // Функция для добавления сообщения в чат
    function addMessage(sender, message) {
      const messageObj = {
        sender,
        message,
        timestamp: new Date(),
      };
      messages.push(messageObj);
      renderMessages(messages);
    }

    // Новая функция для форматирования даты
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
        return messageDate.toLocaleDateString() + " " + messageDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
    }

    // Функция для отображения сообщений в обоих чатах
    function renderMessages(messages) {

      const userMessagesContainer = document.getElementById("user-messages");
      const adminMessagesContainer = document.getElementById("admin-messages");
    
      userMessagesContainer.innerHTML = "";
      adminMessagesContainer.innerHTML = "";
      messages.forEach((msg) => {
        const messageElement = document.createElement("div");
        messageElement.classList.add("chat-message");
        messageElement.classList.add(msg.sender === "user" ? "user" : "admin");

        const formattedDate = formatDate(msg.timestamp);
        messageElement.innerHTML = `
          <div class="avatar"></div>
          <div class="message-content">
            ${msg.message}
            <div class="timestamp">${formattedDate}</div>
          </div>
        `;

        userMessagesContainer.appendChild(messageElement.cloneNode(true));
        adminMessagesContainer.appendChild(messageElement);
      });

      // Автоматическая прокрутка к последнему сообщению
      userChat.scrollTop = userChat.scrollHeight;
      adminChat.scrollTop = adminChat.scrollHeight;
    }

    // Обработчик для кнопки отправки сообщения пользователем
    sendUserButton.addEventListener("click", () => {
      const message = userMessageInput.value.trim();
      if (message) {
        addMessage("admin", message);
        userMessageInput.value = "";
      }
    });

    // Обработчик для кнопки отправки сообщения администратором
    sendAdminButton.addEventListener("click", () => {
      const message = adminMessageInput.value.trim();
      if (message) {
        addMessage("user", message);
        adminMessageInput.value = "";
      }
    });

    // Обработчик для отправки сообщения по нажатию Enter
    userMessageInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendUserButton.click();
      }
    });

    adminMessageInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        sendAdminButton.click();
      }
    });