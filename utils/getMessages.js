const database = require("../database/databaseQueries");

async function getMessages(userId, receiverId) {
  const contact = await database.checkFriendsList(userId, receiverId);
  const receiverData = await database.getSingleUser(receiverId, userId);

  if (!contact) {
    return contact;
  }

  const data = await database.getMessages(contact);
  return { data, receiverData };
}

module.exports = getMessages;
