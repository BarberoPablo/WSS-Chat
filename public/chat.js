/* <script src="/socket.io/socket.io.js" charset="utf-8"></script>
  gives me the var "io" wich I cant use in the whole html
*/

//  Inside io() I shall put the domain when deploying
const socket = io();

//  DOM elements
let message = document.getElementById("message");
let username = document.getElementById("username");
let button = document.getElementById("send");
let output = document.getElementById("output");
let actions = document.getElementById("actions");

//  Creating an event "chat:message" for the button
button.addEventListener("click", () => {
  socket.emit("chat:message", {
    username: username.value,
    message: message.value,
  });
});

//  Catching the response to the "chat:message" event
socket.on("chat:message", (data) => {
  output.innerHTML += `<p>
    <strong>${data.username}</strong>: ${data.message}
  </p>`;
});

message.addEventListener("keypress", () => {
  socket.emit("chat:typing", username.value);
});

socket.on("chat:typing", (data) => {
  actions.innerHTML = "";
  actions.innerHTML += `<p>
  <em>${data} is typing.</em>
</p>`;
});
