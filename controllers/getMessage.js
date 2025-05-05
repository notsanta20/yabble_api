const { PrismaClient } = require("../prisma/generated/prisma/client");
const prisma = new PrismaClient();

async function getMessage(req, res) {
  const { receiverId } = req.params;
  const id1 = "c4ab95a0-2347-4901-8403-8415690b4a08";

  if (typeof receiverId === "undefined") {
    res.status(400).json({
      status: "failed",
      message: "received invalid credentials",
      data: null,
    });
    return;
  }

  try {
    const contactId = await prisma.friendsList.findFirst({
      where: {
        OR: [
          {
            userAId: id1,
            userBId: receiverId,
          },
          {
            userAId: receiverId,
            userBId: id1,
          },
        ],
      },
    });

    if (!contactId) {
      res.status(403).json({
        status: "failed",
        message: "User is not in your friend list, send request to message",
      });
      return;
    }

    const data = await prisma.messages.findMany({
      where: {
        contactId: contactId.id,
      },
    });

    res.json({
      status: "success",
      message: "message fetched successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);

    res
      .status(503)
      .json({ status: "failed", message: "Internal server error", data: null });
  }
}

module.exports = getMessage;
