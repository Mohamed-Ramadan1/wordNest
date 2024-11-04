import { connectDatabase } from "./config/database.config";
import { port } from "./config/server.config";
import { app } from "./app";

connectDatabase();

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
