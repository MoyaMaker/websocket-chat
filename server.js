const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8080 }); // Define el puerto en el que se ejecutará el servidor WebSocket

wss.on("connection", function connection(ws) {
  console.log("Nueva conexión establecida.");

  ws.on("message", function incoming(message) {
    console.log("Mensaje recibido:", message);
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on("close", function close() {
    console.log("Conexión cerrada.");
  });
});
