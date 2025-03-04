import "reflect-metadata";
import { Container } from "inversify";
import * as path from "path";
import * as fs from "fs";
import favoritesModule from "@features/favorites/module/favorites.module";
import authModule from "@features/auth/modules/auth.module";
import interactionsModule from "@features/interactions/modules/interactions.module";

// Create an IoC container
const container = new Container();

// features existing on the application (if new feature added add it to the lest).
const featureCategories = ["auth", "features", "interactions"];

// Dynamically load and register modules
// featureCategories.forEach((category) => {
//   const modulesPath = path.join(__dirname, `../features/${category}/modules`);

//   // Ensure the directory exists
//   if (fs.existsSync(modulesPath)) {
//     // Read all files in the `modules` directory
//     fs.readdirSync(modulesPath).forEach((moduleFile) => {
//       if (moduleFile.endsWith(".module.ts")) {
//         const modulePath = `${modulesPath}/${moduleFile}`;
//         // Dynamically load the module and register bindings
//         const { default: module } = require(modulePath);
//         container.load(module);
//         console.log(`Loaded module: ${moduleFile}`);
//       }
//     });
//   }
// });

container.load(favoritesModule,authModule,interactionsModule);
export { container };
