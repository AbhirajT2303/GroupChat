var Logger = {
  info: function (message) {
    console.log("[INFO] " + message);
  },
  error: function (message) {
    console.error("[ERROR] " + message);
  },
};

module.exports = Logger;
