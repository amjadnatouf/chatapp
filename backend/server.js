// const socket = require("socket.io");
// const app = require("./app");
// const mongoose = require("mongoose");
// require("dotenv").config();

// const PORT = process.env.PORT || 8800;
// const mongoURI = process.env.MONGO_URI;
// const serverURI = "http://localhost:" + PORT;

// const startServer = async () => {
//   try {
//     app.listen(PORT, () => console.log("Server listening at: " + serverURI));
//     mongoose.set("strictQuery", false);
//     if (!mongoURI) {
//       throw new Error("No environment variable found for MongoDB connection.");
//     }
//     await mongoose.connect(mongoURI);
//     console.log("Connected to MongoDB");
//   } catch (error) {
//     console.error("Error starting the server:", error);
//   }
// };

// const io = socket(8080, {
//   cors: {
//     origin: "*",
//   },
// });

// let users = [];

// const addUser = (userId, socketId) => {
//   !users.some((user) => user.userId === userId) &&
//     users.push({ userId, socketId });
// };

// const removeUser = (socketId) => {
//   users = users.filter((user) => user.socketId !== socketId);
// };

// const getUser = (userId) => {
//   return users.find((user) => user.userId === userId);
// };

// io.on("connection", (socket) => {
//   //when ceonnect
//   console.log("a user connected.");

//   //take userId and socketId from user
//   socket.on("addUser", (userId) => {
//     addUser(userId, socket.id);
//     io.emit("getUsers", users);
//   });

//   //send and get message
//   socket.on("sendMessage", ({ senderId, receiverId, text }) => {
//     const user = getUser(receiverId);
//     // io.to(user?.socketId).emit("getMessage", {
//     //   senderId,
//     //   text,
//     // });
//     io.to(user?.socketId).emit("getMessage", {
//       senderId,
//       text,
//     });
//   });

//   //when disconnect
//   socket.on("disconnect", () => {
//     console.log("a user disconnected!");
//     removeUser(socket.id);
//     io.emit("getUsers", users);
//   });
// });

// startServer();

const socketIO = require("socket.io");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");

dotenv.config();

const PORT = process.env.PORT || 8800;
const MONGO_URI = process.env.MONGO_URI;
const SERVER_URI = `http://localhost:${PORT}`;

const startServer = async () => {
  try {
    const server = app.listen(PORT, () =>
      console.log(`Server listening at: ${SERVER_URI}`)
    );

    mongoose.set("strictQuery", false);
    if (!MONGO_URI) {
      throw new Error("No environment variable found for MongoDB connection.");
    }
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    const io = socketIO(server, {
      cors: {
        origin: "*",
      },
    });

    const users = [];

    const addUser = (userId, socketId) => {
      if (!users.some((user) => user.userId === userId)) {
        users.push({ userId, socketId });
      }
    };

    const removeUser = (socketId) => {
      users.filter((user) => user.socketId !== socketId);
    };

    const getUser = (userId) => {
      return users.find((user) => user.userId === userId);
    };

    io.on("connection", (socket) => {
      console.log("connected to socket.");

      socket.on("addUser", (userId) => {
        addUser(userId, socket.id);
        io.emit("getUsers", users);
      });

      socket.on("sendMessage", ({ senderId, receiverId, text }) => {
        const user = getUser(receiverId);
        io.to(user?.socketId).emit("getMessage", {
          senderId,
          text,
        });
      });

      socket.on("disconnect", () => {
        console.log("A user disconnected!");
        removeUser(socket.id);
        io.emit("getUsers", users);
      });
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

startServer();
