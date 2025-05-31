const { PrismaClient } = require("../prisma/generated/prisma/client");
const prisma = new PrismaClient();

async function getUsers(userId) {
  const data = await prisma.user.findMany({
    where: {
      NOT: {
        id: userId,
      },
    },
    select: {
      id: true,
      username: true,
      profilePic: true,
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

async function checkUser(username) {
  const data = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });

  return data;
}

async function getCurrentUser(userId) {
  const data = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      id: true,
      username: true,
      profilePic: true,
      bio: true,
      Posts: {
        include: {
          _count: {
            select: { Likes: true, Comments: true },
          },
          user: {
            select: {
              id: true,
              username: true,
              profilePic: true,
            },
          },
          Likes: {
            where: {
              userId: userId,
            },
          },
        },
      },
      Likes: {
        include: {
          Posts: {
            include: {
              _count: {
                select: { Likes: true, Comments: true },
              },
              user: {
                select: {
                  id: true,
                  username: true,
                  profilePic: true,
                },
              },
              Likes: {
                where: {
                  userId: userId,
                },
              },
            },
          },
        },
      },
      Comments: {
        include: {
          Posts: {
            include: {
              _count: {
                select: { Likes: true, Comments: true },
              },
              user: {
                select: {
                  id: true,
                  username: true,
                  profilePic: true,
                },
              },
              Likes: {
                where: {
                  userId: userId,
                },
              },
            },
          },
        },
      },
    },
  });

  return data;
}

async function getSingleUser(userId, currentUser) {
  const data = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      id: true,
      username: true,
      profilePic: true,
      bio: true,
      myRequests: {
        where: {
          userBId: currentUser,
        },
      },
      userRequests: {
        where: {
          userAId: currentUser,
        },
      },
      myFriends: {
        where: {
          userBId: currentUser,
        },
      },
      followers: {
        where: {
          userAId: currentUser,
        },
      },
      Posts: {
        include: {
          _count: {
            select: { Likes: true, Comments: true },
          },
          user: {
            select: {
              id: true,
              username: true,
              profilePic: true,
            },
          },
          Likes: {
            where: {
              userId: userId,
            },
          },
        },
      },
      Likes: {
        include: {
          Posts: {
            include: {
              _count: {
                select: { Likes: true, Comments: true },
              },
              user: {
                select: {
                  id: true,
                  username: true,
                  profilePic: true,
                },
              },
              Likes: {
                where: {
                  userId: userId,
                },
              },
            },
          },
        },
      },
      Comments: {
        include: {
          Posts: {
            include: {
              _count: {
                select: { Likes: true, Comments: true },
              },
              user: {
                select: {
                  id: true,
                  username: true,
                  profilePic: true,
                },
              },
              Likes: {
                where: {
                  userId: userId,
                },
              },
            },
          },
        },
      },
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

async function createMessage(userId, receiverId, contact, message, image) {
  const data = await prisma.messages.create({
    data: {
      senderId: userId,
      receiverId: receiverId,
      contactId: contact.id,
      message: message,
      image: image,
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
    },
  });

  return data;
}

async function createPost(title, description, image, userId) {
  const data = await prisma.posts.create({
    data: {
      title: title,
      description: description,
      image: image,
      userId: userId,
    },
  });

  return data;
}

async function getAllPosts(userId) {
  const data = await prisma.posts.findMany({
    include: {
      _count: {
        select: { Likes: true, Comments: true },
      },
      user: {
        select: {
          id: true,
          username: true,
          profilePic: true,
        },
      },
      Likes: {
        where: {
          userId: userId,
        },
      },
    },
  });

  return data;
}

async function getPost(postId, userId) {
  const data = await prisma.posts.findFirst({
    where: {
      id: postId,
    },
    include: {
      _count: {
        select: { Likes: true, Comments: true },
      },
      Comments: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              profilePic: true,
            },
          },
        },
      },
      user: {
        select: {
          id: true,
          username: true,
          profilePic: true,
        },
      },
      Likes: {
        where: {
          userId: userId,
        },
      },
    },
  });

  return data;
}

async function checkLike(userId, postId) {
  const data = await prisma.likes.findFirst({
    where: {
      userId: userId,
      postId: postId,
    },
  });

  return data;
}

async function addLike(userId, postId) {
  const data = await prisma.likes.create({
    data: {
      userId: userId,
      postId: postId,
    },
  });

  return data;
}

async function removeLike(likeId) {
  const data = await prisma.likes.delete({
    where: {
      id: likeId,
    },
  });

  return data;
}

async function addComment(comment, userId, postId) {
  const data = await prisma.comments.create({
    data: {
      comment: comment,
      userId: userId,
      postId: postId,
    },
  });

  return data;
}

async function getActiveUsers(userId, time) {
  const data = await prisma.session.findMany({
    where: {
      NOT: {
        userId: userId,
      },
      time: {
        gte: time,
      },
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          profilePic: true,
        },
      },
    },
  });

  return data;
}

async function getFriendsList(userId) {
  const data = await prisma.user.findMany({
    where: {
      id: userId,
    },
    select: {
      followers: {
        include: {
          userA: {
            select: {
              id: true,
              username: true,
              profilePic: true,
            },
          },
        },
      },
      myFriends: {
        include: {
          userB: {
            select: {
              id: true,
              username: true,
              profilePic: true,
            },
          },
        },
      },
    },
  });
  return data;
}

async function EditBio(userId, bio, image) {
  const data = await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      bio: bio,
      profilePic: image,
    },
  });

  return data;
}

async function createSession(userId) {
  const data = await prisma.session.create({
    data: {
      userId: userId,
    },
  });

  return data;
}

async function updateSession(userId, time) {
  const data = await prisma.session.update({
    where: {
      userId: userId,
    },
    data: {
      time: time,
    },
  });

  return data;
}

module.exports = {
  getUsers,
  checkUser,
  getCurrentUser,
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
  createPost,
  getAllPosts,
  getPost,
  checkLike,
  addLike,
  removeLike,
  addComment,
  getActiveUsers,
  getFriendsList,
  EditBio,
  createSession,
  updateSession,
};
