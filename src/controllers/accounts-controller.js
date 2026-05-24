/**
 * Accounts Controller
 *
 * Handles user account functionality including signup, login, logout,
 * and account management. Uses Joi validation and cookie-based authentication.
 */

import { UserSpec, UserCredentialsSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

// Controller object containing all account-related handlers
export const accountsController = {
  
  // Render the home page
  index: {
    auth: false,
    handler: function (request, h) {
      return h.view("main", { title: "Welcome to NailSpot Dublin" });
    },
  },

  // Render the signup page
  showSignup: {
    auth: false,
    handler: function (request, h) {
      return h.view("signup-view", { title: "Create your NailSpot account" });
    },
  },

  // Handle user signup
  signup: {
    auth: false,
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      
      // If validation fails, re-render the signup page with error messages
      failAction: function (request, h, error) {
        return h.view("signup-view", {
          title: "Sign up error",
          errors: error.details,
        }).takeover().code(400);
      },
    },

    // Handler function to process the signup form submission
    handler: async function (request, h) {
      const existingUser = await db.userStore.getUserByEmail(request.payload.email);

      // If a user with the same email already exists, return an error
      if (existingUser) {
        return h.view("signup-view", {
          title: "Sign up error",
          errors: [{ message: "Email already registered" }],
        }).takeover().code(400);
      }
       
      // Create a new user in the database and redirect to the login page
      await db.userStore.addUser(request.payload);
      return h.redirect("/login");
    },
  },

  // Render the login page
  showLogin: {
    auth: false, // Allow access to the login page without authentication
    handler: function (request, h) {
      return h.view("login-view", { title: "Login to NailSpot Dublin" });
    },
  },


  // Handle user login
  login: {
    auth: false,
    validate: {
      payload: UserCredentialsSpec,
      options: { abortEarly: false },
      
      // If validation fails, re-render the login page with error messages
      failAction: function (request, h, error) {
        return h.view("login-view", {
          title: "Login error",
          errors: error.details,
        }).takeover().code(400);
      },
    },

    handler: async function (request, h) {
      const user = await db.userStore.getUserByEmail(request.payload.email);

       if (!user) {
       return h.view("login-view", {
      title: "Login failed",
      errors: [{ message: "Invalid email or password" }],
    }).takeover().code(401);
  }

      if (String(user.password) !== String(request.payload.password)) {
       return h.view("login-view", {
      title: "Login failed",
      errors: [{ message: "Invalid email or password" }],
     }).takeover().code(401);
    }


      // Set the user credentials in the cookie for authentication and redirect to the dashboard
      request.cookieAuth.set({
        _id: user._id.toString(),
        email: user.email,
      });

      // If the user is an admin, redirect to the admin dashboard; otherwise, redirect to the public salons page
      if (user.isAdmin) {
    return h.redirect("/dashboard");
  }

      return h.redirect("/public-salons");
    },
  },

  // Handle user logout
  logout: {
    handler: function (request, h) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  // Render the account settings page
  showAccount: {
    handler: async function (request, h) {
      const loggedInUser = await db.userStore.getUserById(request.auth.credentials._id);

      // If no user is found in the database, clear the authentication cookie and redirect to the login page
      if (!loggedInUser) {
        request.cookieAuth.clear();
        return h.redirect("/login");
      }

      // Render the account settings view with the logged-in user's information
      return h.view("account-view", {
        title: "Account Settings",
        user: loggedInUser,
      });
    },
  },

  // Handle account updates
  updateAccount: {
    validate: {
      payload: UserSpec,
      options: { abortEarly: false },
      
      // If validation fails, re-render the account settings page with error messages
      failAction: async function (request, h, error) {
        const loggedInUser = await db.userStore.getUserById(request.auth.credentials._id);

        return h.view("account-view", {
          title: "Account Settings",
          user: loggedInUser,
          errors: error.details,
        }).takeover().code(400);
      },
    },

    handler: async function (request, h) {
      const loggedInUser = await db.userStore.getUserById(request.auth.credentials._id);

      if (!loggedInUser) {
        request.cookieAuth.clear();
        return h.redirect("/login");
      }

      // Update the user's account information in the database
      const updatedUser = {
        firstName: request.payload.firstName,
        lastName: request.payload.lastName,
        email: request.payload.email,
        password: request.payload.password,
      };

      // Update the user in the database and refresh the authentication cookie with the new information
      await db.userStore.updateUser(loggedInUser._id, updatedUser);

      const refreshedUser = await db.userStore.getUserById(loggedInUser._id);

      // Update the authentication cookie with the refreshed user information
      request.cookieAuth.set({
        _id: refreshedUser._id.toString(),
        email: refreshedUser.email,
      });

      return h.redirect("/account");
    },
  },

  // Validate the user's session for authentication
  validate: async function (request, session) {
    if (!session || !session._id) {
      return { isValid: false };
    }

    // Retrieve the user from the database using the session ID
    const user = await db.userStore.getUserById(session._id); 

    // If no user is found, the session is invalid
    if (!user) {
      return { isValid: false };
    }

    // If a user is found, the session is valid and return the user credentials
    return {
      isValid: true,
      credentials: user, // Return the user object as credentials for use in authenticated routes
    };
  },
};