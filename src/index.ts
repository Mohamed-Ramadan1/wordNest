import { EventEmitter } from "events";
EventEmitter.defaultMaxListeners = 50;

import app from "./app";
import { v2 as cloudinary } from "cloudinary";
import { connectDatabase } from "@config/database.config";
import { port } from "@config/server.config";
import { cloudConfig } from "@config/cloudinary.config";
import { createSocket } from "@config/socketIO.config";
import { createServer, Server as HttpServer } from "http"; // Import createServer from http

// Create HTTP server
const server: HttpServer = createServer(app);

// Initialize Socket.IO using the reusable function
export const io = createSocket(server);

cloudinary.config({
  cloud_name: cloudConfig.CLOUD_NAME,
  api_key: cloudConfig.API_KEY,
  api_secret: cloudConfig.API_SECRET,
  timeout: 60000,
});
// connect database.
connectDatabase();

// run server
server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
