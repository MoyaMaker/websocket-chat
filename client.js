const socket = new WebSocket('ws://localhost:8080');

socket.addEventListener('open', function (event) {
  console.log('Conexión establecida');
});

socket.addEventListener('message', function (event) {
  const message = event.data;

  if (message instanceof Blob) {
    // El mensaje es un objeto Blob, así que lo leemos como texto
    const reader = new FileReader();
    reader.onload = function () {
      const text = reader.result;
      console.log('Mensaje recibido:', text);
      displayMessage(text); // función para mostrar el mensaje en la interfaz de usuario
    };
    reader.readAsText(message);
  } else {
    // El mensaje es una cadena de texto
    console.log('Mensaje recibido:', message);
    displayMessage(message); // función para mostrar el mensaje en la interfaz de usuario
  }
});

const messageForm = document.getElementById('message-form');
messageForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const messageInput = document.getElementById('message-input');
  const message = messageInput.value;

  socket.send(message);

  displayMessage(message);

  messageInput.value = '';
});

function displayMessage(message) {
  const messagesContainer = document.getElementById('messages');
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  messagesContainer.appendChild(messageElement);
}
