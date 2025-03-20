import { Container } from "inversify";

// import("@config/inversify.config").then((mod) => {
//   console.log("Dynamically imported container:", mod.container);
// });

// the static import for container not working for some reason
// so I used the dynamic import inside function to return the container for me until fixed the problem
// import { initContainer } from "@utils/returnDIContainer";
// let container: Container;

// Define an async function to initialize the container
// async function initializeContainer() {
//   container = await initContainer(); // Await the promise to get the actual Container instance
// }

// Initialize the container when the application starts
// initializeContainer();
