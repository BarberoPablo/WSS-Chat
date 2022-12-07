const express = require("express");
const app = express();
const path = require("path");

const SocketIO = require("socket.io");

//  Settings
app.set("port", process.env.PORT || 3000);

//  Static files
app.use(express.static(path.join(__dirname, "public")));
console.log(__dirname, "public");
//  Start the server
const server = app.listen(app.get("port"), () => console.log(`Server on port: ${app.get("port")}`));

//  WebSockets events, io is the connection with all the clients
const io = SocketIO(server);

io.on("connection", (socket) => {
  console.log("New connection", socket.id);

  socket.on("chat:message", (data) => {
    console.log("@@", data);
    io.sockets.emit("chat:message", data);
  });

  socket.on("chat:typing", (data) => {
    socket.broadcast.emit("chat:typing", data);
  });
});
