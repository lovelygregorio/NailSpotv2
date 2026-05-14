/**
 * Server Configuration
 *
 * Sets up and starts the Hapi server.
 * Registers plugins, configures views, authentication,
 * database connection, and application routes.
 */
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import Hapi from "@hapi/hapi";
import Cookie from "@hapi/cookie";
import dotenv from "dotenv";
import path from "path";
import Joi from "joi";
import jwt from "hapi-auth-jwt2";
import HapiSwagger from "hapi-swagger";
import { fileURLToPath } from "url";
import Handlebars from "handlebars";

import { webRoutes } from "./web-routes.js";
import { apiRoutes } from "./api-routes.js";
import { db } from "./models/db.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { validate } from "./api/jwt-utils.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config();

// Swagger configuration for API documentation
const swaggerOptions = {
  info: {
    title: "NailSpot API",
    version: "1.0",
  },
};

// Initialize and configure the Hapi server
export async function init() {
  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: "0.0.0.0",
  });

  //  Register authentication plugins: Cookie for session management and JWT for token-based authentication
  await server.register(Cookie);
  await server.register(jwt);

  // Register additional plugins: Inert for static file handling, Vision for view rendering, and HapiSwagger for API documentation
  await server.register([
    Inert,
    Vision,
    { plugin: HapiSwagger, options: swaggerOptions },
  ]);

  server.validator(Joi);

  // Configure Handlebars as the view engine for rendering HTML templates
  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/layouts",
    partialsPath: "./views/partials",
    layout:"layout",
    isCached: false,
  });

  // Define authentication strategies
  server.auth.strategy("session", "cookie", {
    cookie: {
      name: process.env.cookie_name,
      password: process.env.cookie_password,
      isSecure: false,
    },
    redirectTo: "/login",
    validate: accountsController.validate,
  });

  // JWT strategy for API authentication 
  server.auth.strategy("jwt", "jwt", {
    key: process.env.JWT_SECRET || process.env.cookie_password,  // use jwt secret from the env, if not avi use passwrod isntaead
    validate,
    verifyOptions: {
      algorithms: ["HS256"],
    },
  });

  // Set the default authentication strategy to "session" for web routes
  server.auth.default("session");

  await db.init("mongo"); 

  server.route(webRoutes);
  server.route(apiRoutes);

  return server;
}

// Start the server and log the running server URL in the console 
async function start() {
  const server = await init();
  await server.start();
  console.log("Server running on", server.info.uri);
}

// Start the server if this file is run directly (not imported as a module)
if (process.env.NODE_ENV !== "test") { // only run this code if the app is NOT in test mode
  start().catch((err) => {
    console.log(err);
    process.exit(1);
  });
}
