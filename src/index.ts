import { connectDatabase } from "./config/database.config";
import { port } from "./config/server.config";

import app from "./app";

// connect database.
connectDatabase();

// run server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
