/**
 * @typedef {Object} IMessage
 * @property {string} type - ("join" | "chat" | "system" | "userlist")
 * @property {string} [username] - Sender username
 * @property {string} [text] - Message text
 * @property {Array<string>} [users] - List of usernames (for "userlist")
 */
