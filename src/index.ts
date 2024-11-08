import app from "./app";
import { v2 as cloudinary } from "cloudinary";
import { connectDatabase } from "@config/database.config";
import { port } from "@config/server.config";
import { cloudConfig } from "@config/cloudinary.config";

cloudinary.config({
  cloud_name: cloudConfig.CLOUD_NAME,
  api_key: cloudConfig.API_KEY,
  api_secret: cloudConfig.API_SECRET,
});

// connect database.
connectDatabase();

// run server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
