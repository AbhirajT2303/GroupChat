$(document).ready(function () {
  var socket = null;
  var username = "";

  $("#startChatBtn").click(function () {
    username = $("#username").val();
    if (!username) {
      alert("please enter a username");
      return;
    }
    socket = new WebSocket("wss://groupchat-3-92wz.onrender.com");

    socket.onopen = function () {
      console.log("Connected to server.");
      socket.send(JSON.stringify({ type: "join", username: username }));
      $("#title").hide();
      $("#chatScreen").show();
      $("#chatScreen").val("");
    };
    socket.onmessage = function (event) {
      var msg = JSON.parse(event.data);

      if (msg.type === "system") {
        $("#messages").append(
          "<div class='system-message'><mark>" + msg.text + "</mark></div>"
        );
      }
      if (msg.type === "chat") {
        $("#messages").append(
          "<div><strong>" + msg.username + ":</strong> " + msg.text + "</div>"
        );
      }
      if (msg.type === "userList") {
        $("#userList").empty();
        for (var i = 0; i < msg.users.length; i++) {
          $("#userList").append("<li>" + msg.users[i] + "</li>");
        }
      }
      $("#messages").scrollTop($("#messages")[0].scrollHeight);
    };

    socket.onclose = function () {
      $("#title").show();
      $("#messages").empty();

      $("#username").val("");
      $("#chatScreen").hide();
    };

    socket.onerror = function (err) {
      console.error("WebSocket error", err);
    };
  });
  $("#sendBtn").click(function () {
    var text = $("#message").val().trim();
    if (!text) {
      alert("please type a message!");
    }
    if (text && socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ type: "chat", text: text }));
      $("#message").val("");
    }
  });
  $("#message").on("keypress", function (e) {
    if (e.which === 13) {
      e.preventDefault();
      $("#sendBtn").click();
    }
  });
  $("#username").on("keypress", function (e) {
    if (e.which === 13) {
      e.preventDefault();
      $("#startChatBtn").click();
    }
  });
  $("#disconnectBtn").click(function () {
    socket.close();
  });
});
