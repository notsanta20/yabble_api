const database = require("../database/databaseQueries");

async function getFriendsList(userId) {
  const data = await database.getFriendsList(userId);
  return data;
}

module.exports = getFriendsList;
