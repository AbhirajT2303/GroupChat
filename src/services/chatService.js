function ChatService() {
  this.users = [];
}

ChatService.prototype.addUser = function (user) {
  this.users.push(user);
  this.broadcastSystem(user.username + " has joined chat");
  this.updateUserList();
};

ChatService.prototype.removeUser = function (username) {
  this.users = this.users.filter(function (u) {
    return u.username !== username;
  });
  this.updateUserList();
  this.broadcastSystem(username + " has left the chat.");
};

ChatService.prototype.broadcastChat = function (username, text) {
  this.broadcast({ type: "chat", username: username, text: text });
};

ChatService.prototype.broadcastSystem = function (text) {
  this.broadcast({ type: "system", text: text });
};

ChatService.prototype.updateUserList = function () {
  var usernames = this.users.map(function (u) {
    return u.username;
  });
  this.broadcast({ type: "userList", users: usernames });
};

ChatService.prototype.broadcast = function (data) {
  var message = JSON.stringify(data);
  console.log(message);
  this.users.forEach(function (u) {
    u.socket.send(message);
  });
};

module.exports = ChatService;
