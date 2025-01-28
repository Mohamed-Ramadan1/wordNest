import { Server } from "socket.io";
import { Server as HttpServer } from "http";

export function createSocket(server: HttpServer) {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL || "*", // Use environment variable for frontend URL
      methods: ["GET", "POST"],
    },
  });

  // Socket.IO error handler
  io.on("error", (error) => {
    console.error("Socket.IO error:", error);
  });

  // Socket.IO connection handler
  io.on("connection", (socket) => {
    console.log("A user connected");

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected");
    });

    // Example: Handle a custom event
    socket.on("sendNotification", (data) => {
      console.log("Notification received:", data);
      // Broadcast the notification to all connected clients
      io.emit("receiveNotification", data);
    });

    // Example: Join a room
    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`User joined room: ${roomId}`);
    });

    // Example: Send a message to a room
    socket.on("sendMessage", ({ roomId, message }) => {
      io.to(roomId).emit("receiveMessage", message);
    });
  });

  return io;
}
