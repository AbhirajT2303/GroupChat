var logger = require("./utils/logger");
var WebSocketServer = require("./Server/webSocketServer");

var PORT = 4545;
new WebSocketServer(PORT);

logger.info("WebSocket server is running on ws://localhost:" + PORT);
