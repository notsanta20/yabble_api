const database = require("../database/databaseQueries");

async function sendMessage(userId, receiverId, message, image) {
  const contact = await database.checkFriendsList(userId, receiverId);
  if (!contact) {
    return contact;
  }

  const data = await database.createMessage(
    userId,
    receiverId,
    contact,
    message,
    image
  );
  return data;
}

module.exports = sendMessage;
