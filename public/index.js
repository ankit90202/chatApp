$(document).ready(function () {
  const btn = document.getElementById("btn");
  const title = document.getElementById("title");
  const message = document.getElementById("message");
  const messageWrapper = document.getElementById("message_container");

  const socket = io("127.0.0.1:3000");

  socket.on("client_connect", (data) => {
    $(".useronline").text(`${data} users online`);
  });

  btn.addEventListener("click", () => {
    socket.emit("chat", {
      title: $("#title").val(),
      message: $("#message").val(),
    });
  });
  socket.on("chat", (data) => {
    messageWrapper.innerHTML += `<div class="user"><p class="title">${data.title}</p><p class="message">${data.message}</p></div>`;
  });
});
