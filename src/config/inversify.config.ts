import "reflect-metadata";
import { Container } from "inversify";
import * as path from "path";
import * as fs from "fs";

// Create an IoC container
const container = new Container();

// features existing on the application (if new feature added add it to the lest).
const featureCategories = ["auth", "interactions"];

// Dynamically load and register modules
featureCategories.forEach((category) => {
  const modulesPath = path.join(__dirname, `../features/${category}/modules`);

  // Ensure the directory exists
  if (fs.existsSync(modulesPath)) {
    // Read all files in the `modules` directory
    fs.readdirSync(modulesPath).forEach((moduleFile) => {
      if (moduleFile.endsWith(".module.ts")) {
        const modulePath = `${modulesPath}/${moduleFile}`;
        // Dynamically load the module and register bindings
        const { default: module } = require(modulePath);
        container.load(module);
        console.log(`Loaded module: ${moduleFile}`);
      }
    });
  }
});

export { container };
