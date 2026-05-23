/**
 * Web Routes
 *
 * Defines all frontend (web) routes for the NailSpot application.
 * Each route maps a URL path to a controller handler.
 * Handles navigation, authentication, dashboard, salons, categories, and services.
 */

import { aboutController } from "./controllers/about-controller.js";
import { accountsController } from "./controllers/accounts-controller.js";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { salonController } from "./controllers/salon-controller.js";
import { allsalonsController } from "./controllers/allsalons-controller.js";
import { serviceController } from "./controllers/service-controller.js";
import { categoryController } from "./controllers/category-controller.js";
import { publicSalonController } from "./controllers/public-salon-controller.js";
import { galleryController } from "./controllers/gallery-controller.js";

//
export const webRoutes = [
  // Account-related routes for home, signup, login, logout, and account management
  { method: "GET", path: "/", config: accountsController.index },
  { method: "GET", path: "/signup", config: accountsController.showSignup },
  { method: "GET", path: "/login", config: accountsController.showLogin },
  { method: "GET", path: "/logout", config: accountsController.logout },
  { method: "POST", path: "/register", config: accountsController.signup },
  { method: "POST", path: "/authenticate", config: accountsController.login },

  // Account management routes for viewing and updating user account details
  { method: "GET", path: "/account", config: accountsController.showAccount },
  { method: "POST", path: "/account/update", config: accountsController.updateAccount },

  { method: "GET", path: "/about", config: aboutController.index },

  // Dashboard routes for managing salons and categories, including adding, updating, and deleting salons
  { method: "GET", path: "/dashboard", config: dashboardController.index },
  { method: "POST", path: "/dashboard/addsalon", config: dashboardController.addSalon },
  { method: "GET", path: "/dashboard/load-demo", config: dashboardController.loadDemoData },
  { method: "GET", path: "/dashboard/deletesalon/{id}", config: dashboardController.deleteSalon },

  // Category management routes for viewing categories, adding new categories, deleting categories, and showing category details
  { method: "GET", path: "/categories", config: categoryController.index },
  { method: "POST", path: "/categories/add", config: categoryController.addCategory },
  { method: "GET", path: "/categories/delete/{id}", config: categoryController.deleteCategory },
  { method: "GET", path: "/categories/{id}", config: categoryController.show },
  { method: "POST", path: "/categories/{id}/addsalon", config: salonController.addSalon },

  // Salon-related routes for viewing all salons, viewing salon details, updating salon information, adding services to a salon, and deleting services from a salon
  { method: "GET", path: "/salons", config: allsalonsController.index },
  { method: "GET", path: "/salon/{id}", config: salonController.index },
  { method: "POST", path: "/salon/{id}/updatesalon", config: salonController.updateSalon },
  { method: "POST", path: "/salon/{id}/addservice", config: salonController.addService },
  { method: "GET", path: "/salon/{id}/deleteservice/{serviceid}", config: salonController.deleteService },

  // Service-related routes for viewing service details and updating service information
  { method: "GET", path: "/service/{id}/edit/{serviceid}", config: serviceController.index },
  { method: "POST", path: "/service/{id}/update/{serviceid}", config: serviceController.updateService },

  // Review-related route for adding a review to a salon
  { method: "POST", path: "/salon/{id}/addreview", config: salonController.addReview },
  { method: "GET", path: "/salon/{id}/deletereview/{reviewid}", config: salonController.deleteReview },
  
  // Public-facing route for viewing salon details
  { method: "GET", path: "/public-salons", config: publicSalonController.index,},
  { method: "GET", path: "/public-salon/{id}", config: publicSalonController.viewSalon, },
  { method: "POST", path: "/public-salon/{id}/addreview", config: publicSalonController.addReview,},

  // Favourite-related routes for adding a salon to favourites and viewing the list of favourite salons
  { method: "GET", path: "/salon/{id}/favourite", config: publicSalonController.addFavourite, },
  { method: "GET", path: "/favourites", config: publicSalonController.favourites,},
  { method: "GET", path: "/salon/{id}/remove-favourite", config: publicSalonController.removeFavourite, },

  // Gallery-related routes for adding a photo to a salon's gallery and deleting a photo from the gallery
  { method: "GET", path: "/gallery", config: galleryController.index, },
  { method: "POST", path: "/gallery/add", config: galleryController.addPost, },
  { method: "POST", path: "/gallery/delete/{id}", config: galleryController.deletePost,},
  { method: "POST", path: "/gallery/comment/{id}", config: galleryController.addComment,},
  { method: "POST", path: "/gallery/comment/delete/{postId}/{commentId}", options: { auth: "session",},handler: galleryController.deleteComment.handler,},
  
  // Static file serving route for any paths not matched by the above routes, serving files from the "public" directory
  { method: "GET", path: "/{param*}", handler: { directory: { path: "./public" }, }, options: { auth: false },},
];