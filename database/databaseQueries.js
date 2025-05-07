const { PrismaClient } = require("../prisma/generated/prisma/client");
const prisma = new PrismaClient();

async function getUsers(userId) {
  const data = await prisma.user.findMany({
    where: {
      NOT: {
        id: userId,
      },
    },
    include: {
      myRequests: {
        where: {
          userBId: userId,
        },
      },
      userRequests: {
        where: {
          userAId: userId,
        },
      },
      myFriends: {
        where: {
          userBId: userId,
        },
      },
      followers: {
        where: {
          userAId: userId,
        },
      },
    },
  });

  return data;
}

async function getSingleUser(userId) {
  const data = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      userRequests: true,
    },
  });

  return data;
}

async function getLoginUser(username) {
  const data = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });
  return data;
}

async function checkFriendsList(userId, requestId) {
  const data = await prisma.friendsList.findFirst({
    where: {
      OR: [
        {
          userAId: userId,
          userBId: requestId,
        },
        {
          userAId: requestId,
          userBId: userId,
        },
      ],
    },
  });

  return data;
}

async function addFriend(userId, requestId) {
  const data = await prisma.friendsList.create({
    data: {
      userAId: userId,
      userBId: requestId,
    },
  });
  return data;
}

async function checkRequest(userId, requestId) {
  const data = await prisma.requests.findFirst({
    where: {
      OR: [
        {
          userAId: userId,
          userBId: requestId,
        },
        {
          userAId: requestId,
          userBId: userId,
        },
      ],
    },
  });

  return data;
}

async function createRequest(userId, requestId) {
  const data = await prisma.requests.create({
    data: {
      userAId: userId,
      userBId: requestId,
    },
  });
  return data;
}

async function deleteRequest(request) {
  const data = await prisma.requests.delete({
    where: {
      id: request.id,
    },
  });

  return data;
}

async function getMessages(contact) {
  const data = await prisma.messages.findMany({
    where: {
      contactId: contact.id,
    },
  });

  return data;
}

async function createMessage(userId, receiverId, contact) {
  const data = await prisma.messages.create({
    data: {
      senderId: userId,
      receiverId: receiverId,
      contactId: contact.id,
    },
  });
  return data;
}

async function createUser(username, email, salt, hash) {
  const data = await prisma.user.create({
    data: {
      username: username,
      email: email,
      salt: salt,
      hash: hash,
      isActive: false,
    },
  });

  return data;
}

async function updateOnlineStatus(userId, isActive) {
  const data = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      isActive: isActive,
    },
  });

  return data;
}

module.exports = {
  getUsers,
  getSingleUser,
  getLoginUser,
  checkFriendsList,
  addFriend,
  checkRequest,
  createRequest,
  deleteRequest,
  getMessages,
  createMessage,
  createUser,
  updateOnlineStatus,
};
