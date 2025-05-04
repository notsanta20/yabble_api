const { PrismaClient } = require("../prisma/generated/prisma/client");
const prisma = new PrismaClient();

async function users(req, res) {
  try {
    const data = await prisma.user.findMany({
      where: {
        NOT: {
          id: "29702e8f-5b0d-4cd0-9c52-24005008d084",
        },
      },
      include: {
        userRequests: {
          where: {
            userAID: "29702e8f-5b0d-4cd0-9c52-24005008d084",
          },
        },
        myFriends: {
          where: {
            userBID: "29702e8f-5b0d-4cd0-9c52-24005008d084",
          },
        },
      },
    });

    const filteredData = data.filter((user) => {
      if (user.myFriends.length === 0) {
        return user;
      }
    });

    res.json({ message: "all users", data: filteredData });
  } catch (error) {
    res.status(503).json({ error: "Internal server error" });
  }
}

module.exports = users;
