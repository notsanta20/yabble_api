const { PrismaClient } = require("../prisma/generated/prisma/client");
const prisma = new PrismaClient();

async function message(req, res) {
  let { receiverId, message, image } = req.body;
  const id1 = "c4ab95a0-2347-4901-8403-8415690b4a08";

  if (typeof receiverId === "undefined") {
    res.status(400).json({
      status: "failed",
      message: "received invalid credentials",
      data: null,
    });
    return;
  }

  if (typeof message === "undefined" && typeof image === "undefined") {
    res.status(400).json({
      status: "failed",
      message: "Cannot send empty message",
      data: null,
    });
    return;
  }

  if (typeof message === "undefined") {
    message = null;
  }

  if (typeof image === "undefined") {
    message = null;
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

    const data = await prisma.messages.create({
      data: {
        senderId: id1,
        receiverId: receiverId,
        contactId: contactId.id,
      },
    });

    res.json({
      status: "success",
      message: "message sent successfully",
      data: data,
    });
  } catch (error) {
    console.log(error);

    res
      .status(503)
      .json({ status: "failed", message: "Internal server error", data: null });
  }
}

module.exports = message;
