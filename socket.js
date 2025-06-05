const { Server } = require("socket.io");
const getMessages = require("./utils/getMessages");
const getFriendsList = require("./utils/getFriendsList");
const sendMessage = require("./utils/sendMessage");
const getUserDetails = require("./utils/getUserDetails");
const { validateData } = require("./config/validateInputs");

let io;

module.exports = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  //middleware to get user details from token
  io.use((socket, next) => {
    const { token } = socket.handshake.auth;
    const userData = getUserDetails(token);

    if (typeof userData === "undefined") {
      return next(new Error("invalid credentials"));
    }

    socket.userName = userData.userName;
    socket.userId = userData.userId;
    next();
  });

  io.on("connection", async (socket) => {
    console.log(
      `${socket.userName} connected with ${socket.userId}`,
      socket.id
    );

    socket.join(socket.userId);

    socket.on("getUsers", async () => {
      try {
        const users = await getFriendsList(socket.userId);
        const listOne = users[0].followers;
        const listTwo = users[0].myFriends;

        //get all socket users, filter with current user's friend's list to check online status
        const socketUsers = [];
        const friends = [];
        for (let [id, innerSocket] of io.of("/").sockets) {
          socketUsers.push(innerSocket.userId);
        }

        listOne.map((user) => {
          let status;
          if (socketUsers.includes(user.userA.id)) {
            status = true;
          } else {
            status = false;
          }
          friends.push({
            id: user.userA.id,
            username: user.userA.username,
            profilePic: user.userA.profilePic,
            isOnline: status,
          });
        });

        listTwo.forEach((user) => {
          let status;
          if (socketUsers.includes(user.userB.id)) {
            status = true;
          } else {
            status = false;
          }
          friends.push({
            id: user.userB.id,
            username: user.userB.username,
            profilePic: user.userB.profilePic,
            isOnline: status,
          });
        });

        //emit friends list to client
        socket.emit("users", friends);
      } catch (error) {
        socket.emit("error", "failed to fetch users");
      }
    });

    //get all messages
    socket.on("getMessage", async (receiverId) => {
      try {
        const { data, receiverData } = await getMessages(
          socket.userId,
          receiverId
        );

        //emit messages to client
        socket.emit("receiveMessages", data, receiverData);
      } catch (error) {
        socket.emit("error", "failed to fetch messages");
      }
    });

    //send message, add to database
    socket.on("sendMessage", async ({ userId, text, image }) => {
      let message = text.message;
      let img = image;
      if (
        typeof userId === "undefined" ||
        (typeof message === "undefined" && typeof img === "undefined")
      ) {
        socket.emit("error", "received invalid credentials");
      }

      if (typeof message === "undefined") {
        message = null;
      }

      if (typeof img === "undefined") {
        img = null;
      }

      try {
        const validateMessage = validateData({ data: message });

        if (validateMessage) {
          socket.emit("error", "received invalid inputs");
        } else {
          const messageData = await sendMessage(
            socket.userId,
            userId,
            message,
            image
          );

          //emit saved message to client
          if (messageData) {
            socket.to(userId).to(socket.id).emit("receive", messageData);
          }
        }
      } catch (error) {
        socket.emit("error", "failed to send message, try again");
      }
    });

    socket.on("disconnect", () => {
      console.log(`${socket.userName} disconnected`);
    });
  });

  return io;
};
