const { PrismaClient } = require("../prisma/generated/prisma/client");
const prisma = new PrismaClient();

async function addFriend(req, res) {
  const { requestId } = req.body;
  const id1 = "100b1539-21a7-40e2-8367-d3a271541c21";

  if (typeof requestId === "undefined") {
    res.status(400).json({
      status: "failed",
      message: "received invalid credentials",
      data: null,
    });
    return;
  }

  try {
    const checkFriendsList = await prisma.friendsList.findFirst({
      where: {
        OR: [
          {
            userAId: id1,
            userBId: requestId,
          },
          {
            userAId: requestId,
            userBId: id1,
          },
        ],
      },
    });

    if (checkFriendsList) {
      res.status(403).json({
        status: "failed",
        message: "user is already available in the friends list",
        data: null,
      });
      return;
    }

    const deleteRequest = await prisma.requests.findFirst({
      where: {
        userAId: id1,
        userBId: requestId,
      },
    });

    if (!deleteRequest) {
      res.status(403).json({
        status: "failed",
        message: "send request to add user to friends list",
        data: null,
      });
      return;
    }

    await prisma.requests.delete({
      where: {
        id: deleteRequest.id,
      },
    });

    const data = await prisma.friendsList.create({
      data: {
        userAId: id1,
        userBId: requestId,
      },
    });

    res.json({
      status: "success",
      message: "User added to friends list",
      data: data,
    });
  } catch (error) {
    console.log(error);

    res
      .status(503)
      .json({ status: "failed", message: "Internal server error", data: null });
  }
}

module.exports = addFriend;
