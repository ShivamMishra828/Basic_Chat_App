const socket = io();

let userName;

do {
  userName = prompt("Please Enter Your Name:- ");
} while (!userName);

let textarea = document.querySelector("#textarea");
textarea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

function sendMessage(message) {
  let msg = {
    user: userName,
    message: message.trim(),
  };

  appendMessage(msg, "outgoing");
  textarea.value = "";
  scrollToBottom();

  socket.emit("message", msg);
}

let messageArea = document.querySelector(".message-area");
function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  let className = type;
  mainDiv.classList.add(className, "message");
  let markUp = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
  `;

  mainDiv.innerHTML = markUp;
  messageArea.appendChild(mainDiv);
}

socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
  scrollToBottom();
});

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
