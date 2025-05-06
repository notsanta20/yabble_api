const database = require("../database/databaseQueries");

async function users(req, res) {
  const id1 = "100b1539-21a7-40e2-8367-d3a271541c21";
  const id2 = "c4ab95a0-2347-4901-8403-8415690b4a08";

  try {
    const data = await database.getUsers(id1);

    const filteredData = data.filter((user) => {
      if (user.myFriends.length === 0 && user.followers.length === 0) {
        return user;
      }
    });

    res.json({ status: "success", message: "all users", data: filteredData });
  } catch (error) {
    console.log(error);

    res
      .status(503)
      .json({ status: "failed", message: "Internal server error", data: null });
  }
}

module.exports = users;
