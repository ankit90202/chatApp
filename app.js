const express = require("express");
const socket = require("socket.io");

const app = express();
app.use(express.static("public"));

const port = 3000;
const server = app.listen(port, () => console.log(`Server is listing to port ${port}`));

const io = socket(server);

var connectedClient = 0;

io.on("connection", (socket) => {
  connectedClient++;

  io.emit("client_connect", connectedClient);

  socket.on("disconnect", () => {
    connectedClient--;
    io.emit("client_connect", connectedClient);
  });

  socket.on("chat", (data) => {
    io.sockets.emit("chat", data);
  });
});
