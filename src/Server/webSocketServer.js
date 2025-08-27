var WebSocket = require("ws");
var User = require("../models/user");
var ChatService = require("../services/chatService");

function WebSocketServer(port) {
  this.port = port;
  this.chatService = new ChatService();
  this.wss = new WebSocket.Server({ port: port });

  var self = this;

  this.wss.on("connection", function (socket) {
    var currentUser = null;
    socket.on("message", function (raw) {
      try {
        var msg = JSON.parse(raw);
        if (msg.type === "join") {
          currentUser = new User(msg.username, socket);
          self.chatService.addUser(currentUser);
          // console.log(currentUser);
        }
        if (msg.type === "chat") {
          self.chatService.broadcastChat(currentUser.username, msg.text);
        }
        console.log(currentUser);
      } catch (err) {
        console.error("Invalid message", err);
      }
    });

    socket.on("close", function () {
      if (currentUser) {
        self.chatService.removeUser(currentUser.username);
      }
    });
  });
}
module.exports = WebSocketServer;
