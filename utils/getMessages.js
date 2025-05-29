const database = require("../database/databaseQueries");

async function getMessages(userId, receiverId) {
  const contact = await database.checkFriendsList(userId, receiverId);

  if (!contact) {
    return contact;
  }

  const data = await database.getMessages(contact);
  return data;
}

module.exports = getMessages;
