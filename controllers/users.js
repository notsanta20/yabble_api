const { PrismaClient } = require("../prisma/generated/prisma/client");
const prisma = new PrismaClient();

async function users(req, res) {
  const id1 = "1af38ddf-b90f-4816-b0c3-594300b31ae8";
  const id2 = "c2909452-a894-4fcd-89bf-0ccfe60192d8";
  try {
    const data = await prisma.user.findMany({
      where: {
        NOT: {
          id: id2,
        },
      },
      include: {
        userRequests: {
          where: {
            userBID: id2,
          },
        },
        myRequests: {
          where: {
            userAID: id2,
          },
        },
        myFriends: {
          where: {
            userBID: id2,
          },
        },
        followers: {
          where: {
            userAID: id2,
          },
        },
      },
    });

    const filteredData = data.filter((user) => {
      if (user.myFriends.length === 0 && user.followers.length === 0) {
        return user;
      }
    });

    res.json({ message: "all users", data: filteredData });
  } catch (error) {
    res.status(503).json({ error: "Internal server error" });
  }
}

module.exports = users;
