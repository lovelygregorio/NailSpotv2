/**
 * Database Configuration
 *
 * Provides a unified interface for accessing data stores.
 * Supports switching between in-memory stores and MongoDB stores.
 */

import { userMemStore } from "./mem/user-mem-store.js";
import { salonMemStore } from "./mem/salon-mem-store.js";
import { serviceMemStore } from "./mem/service-mem-store.js";
import { categoryMemStore } from "./mem/category-mem-store.js";

import { userMongoStore } from "./mongo/user-mongo-store.js";
import { salonMongoStore } from "./mongo/salon-mongo-store.js";
import { serviceMongoStore } from "./mongo/service-mongo-store.js";
import { categoryMongoStore } from "./mongo/category-mongo-store.js";

import { connectMongo } from "./mongo/connect.js";
import { reviewMongoStore } from "./mongo/review-mongo-store.js";
import { galleryMongoStore } from "./mongo/gallery-mongo-store.js";
import { bookingMongoStore } from "./mongo/booking-mongo-store.js";

// Exported object containing the database configuration and methods to initialize the data stores
export const db = {

  // Default to in-memory stores for users, salons, services, and categories
  userStore: userMongoStore,
  salonStore: salonMongoStore,
  serviceStore: serviceMongoStore,
  categoryStore: categoryMongoStore,
  reviewStore: reviewMongoStore,
  galleryStore: galleryMongoStore,
  bookingStore: bookingMongoStore,
  // Initialize the data stores based on the specified store type 
  async init(storeType) {
    switch (storeType) {
      case "mongo":
        
        // Set the data store properties to use the MongoDB implementations for users, salons, services, and categories
        this.userStore = userMongoStore;
        this.salonStore = salonMongoStore;
        this.serviceStore = serviceMongoStore;
        this.categoryStore = categoryMongoStore;

        // Connect to the MongoDB database to ensure that the data stores can interact with the database
        await connectMongo();
        break;

    
      case "mem": 
      default:

      // Use in-memory stores (for testing/development)
        this.userStore = userMemStore;
        this.salonStore = salonMemStore;
        this.serviceStore = serviceMemStore;
        this.categoryStore = categoryMemStore;
        break;
    }
  },
};