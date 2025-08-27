# 💬 Multi-User Real-Time Chat (WebSocket + jQuery Challenge)


**Goal**: Build a **multi-user real-time chat application** where each user connects with a chosen username, sees who is online, and can send messages to everyone in real time — without HTTP polling.

---

## 📌 Requirements

Create a WebSocket-powered chat app where:

1. **User connects with a name**
   - On clicking **Start Chat** button, ask for the username via `prompt()` or an input field.
   - Use this username for all future messages from that user.

2. **Broadcast join/leave events**
   - When a user connects, all clients see:
     ```
     Abhishek has joined the chat.
     ```
   - When a user disconnects, all clients see:
     ```
     Snehal has left the chat.
     ```

3. **Real-time messaging**
   - Messages should appear for all connected users in the format:
     ```
     Abhishek: Hi
     Snehal: Hi, how are you?
     ```

4. **List of online users**
   - Display all currently connected usernames in a sidebar or top bar.

---

## 🧩 Functional Breakdown

### ✅ Start Chat
- UI: **Start Chat** button
- On click:
  - Ask for username.
  - Establish WebSocket connection.
  - Send a “join” event to the server with the username.

### ✅ Broadcast User List
- Server maintains an array of connected usernames.
- Whenever a user joins/leaves:
  - Update all clients with the new user list.

### ✅ Send/Receive Messages
- Input field + **Send** button:
  - Sends `{ username, message }` to server.
  - Server broadcasts it to all connected clients.

### ✅ Display in Chat Window
- Join/leave messages in **italic system message** style.
- User messages in `username: text` format.

---

## 📚 Learning Objectives
- Using **WebSockets** for multi-user real-time communication.
- Broadcasting messages to all connected clients.
- Managing **user sessions** without page reload.
- Updating DOM in **jQuery** based on server events.

---

## 🎯 Bonus Challenges
- Show timestamps for messages.
- Allow private messages (`/w username message` command).
- Highlight your own messages differently.
- Add "User is typing..." indicator.
