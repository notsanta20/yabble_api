const { PrismaClient } = require("../prisma/generated/prisma/client");
const prisma = new PrismaClient();

async function addFriend(req, res) {
  const { requestId } = req.body;

  try {
    const deleteRequest = await prisma.requests.findFirst({
      where: {
        userAID: "29702e8f-5b0d-4cd0-9c52-24005008d084",
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
        userAID: requestId,
        userBID: "29702e8f-5b0d-4cd0-9c52-24005008d084",
      },
    });

    res.json({ message: "all users", data: data });
  } catch (error) {
    console.log(error);

    res.status(503).json({ error: "Internal server error" });
  }
}

module.exports = addFriend;
