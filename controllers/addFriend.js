const { PrismaClient } = require("../prisma/generated/prisma/client");
const prisma = new PrismaClient();

async function addFriend(req, res) {
  const { requestId } = req.body;
  const id1 = "1af38ddf-b90f-4816-b0c3-594300b31ae8";

  try {
    const deleteRequest = await prisma.requests.findFirst({
      where: {
        userAID: id1,
        userBID: requestId,
      },
    });

    await prisma.requests.delete({
      where: {
        id: deleteRequest.id,
      },
    });

    const data = await prisma.friendsList.create({
      data: {
        userAID: id1,
        userBID: requestId,
      },
    });

    res.json({ message: "all users", data: data });
  } catch (error) {
    console.log(error);

    res.status(503).json({ error: "Internal server error" });
  }
}

module.exports = addFriend;
