/**
 * Dashboard Controller
 *
 * Handles dashboard-related functionality for the logged-in user.
 * Includes displaying salons and categories, adding new salons,
 * loading demo salon data, and deleting salons.
 */

import { SalonSpec } from "../models/joi-schemas.js";
import { db } from "../models/db.js";

// Sample salon data for Dublin to populate the dashboard with demo data
const dublinDemoSalons = [
  {
    name: "Tropical Nails",
    area: "Central Dublin",
    address: "24 Henry St, Dublin 1",
    services: "Gel, Acrylic",
    rating: 4,
    notes: "Friendly staff and central location.",
    latitude: 53.35031,
    longitude: -6.2612,
    image: "/images/tropical.png",
    categoryTitle: "Acrylic",
  },
  {
    name: "5th Avenue Nails",
    area: "Central Dublin",
    address: "Grafton Street, Dublin 2",
    services: "Manicure, Pedicure",
    rating: 4,
    notes: "Great for quick city centre appointments.",
    latitude: 53.34185,
    longitude: -6.25973,
    image: "/images/5thave.png",
    categoryTitle: "Manicure",
  },
  {
    name: "Nail Botique Station",
    area: "South Dublin",
    address: "Dundrum Town Centre, Dublin 16",
    services: "BIAB, Gel",
    rating: 4,
    notes: "Popular BIAB option for south Dublin.",
    latitude: 53.28666,
    longitude: -6.24252,
    image: "/images/nails.jpg",
    categoryTitle: "BIAB",
  },
  {
    name: "Mint Nails",
    area: "South Dublin",
    address: "Rathmines Road Lower, Dublin 6",
    services: "Gel Polish",
    rating: 4,
    notes: "Student-friendly salon with good value.",
    latitude: 53.32269,
    longitude: -6.26556,
    image: "/images/mint.png",
    categoryTitle: "Gel Nails",
  },
  {
    name: "Orchid Nails",
    area: "Central Dublin",
    address: "Temple Bar, Dublin 2",
    services: "Nail Art",
    rating: 4,
    notes: "Known for detailed nail art designs.",
    latitude: 53.34545,
    longitude: -6.26472,
    image: "/images/orchid.png",
    categoryTitle: "Nail Art",
  },
];

// Helper function to build the dashboard view data for the logged-in user
async function buildDashboardView(loggedInUser) {
  const salons = await db.salonStore.getUserSalons(loggedInUser._id);
  const categories = await db.categoryStore.getUserCategories(loggedInUser._id);

  return {
    title: "NailSpot Dublin Dashboard",
    user: loggedInUser,
    salons,
    categories,
    salonsJson: JSON.stringify(salons),
  };
}

// Find an existing category or create it if it does not exist
async function getOrCreateCategory(userid, title) {
  const categories = await db.categoryStore.getUserCategories(userid);
  let category = categories.find((c) => c.title === title);

  if (!category) {
    category = await db.categoryStore.addCategory({
      title,
      userid,
    });
  }

  return category;
}

// Controller object containing handlers for dashboard-related functionality
export const dashboardController = {

  // Handler function to display the dashboard view for the logged-in user
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const viewData = await buildDashboardView(loggedInUser);
      return h.view("dashboard-view", viewData);
    },
  },


  // Handler function to add a new salon for the logged-in user
  addSalon: {
    validate: {
      payload: SalonSpec,
      options: { abortEarly: false },

      //
      failAction: async function (request, h, error) {
        const loggedInUser = request.auth.credentials;
        const viewData = await buildDashboardView(loggedInUser);
        viewData.errors = error.details;
        return h.view("dashboard-view", viewData).takeover().code(400);
      },
    },

    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;


      // Build salon object from submitted form data
      const salonData = {
        name: request.payload.name,
        area: request.payload.area,
        address: request.payload.address,
        services: request.payload.services,
        rating: Number(request.payload.rating || 4),
        notes: request.payload.notes,
        latitude: Number(request.payload.latitude || 53.3498),
        longitude: Number(request.payload.longitude || -6.2603),
        categoryid: request.payload.categoryid,
        userid: loggedInUser._id,
      };

      await db.salonStore.addSalon(salonData);
      return h.redirect("/dashboard");
    },
  },

  // Handler function to load demo salon data for the logged-in user
  loadDemoData: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const existingSalons = await db.salonStore.getUserSalons(loggedInUser._id);

      for (const salon of dublinDemoSalons) {
        const alreadyExists = existingSalons.find(
          (existingSalon) => existingSalon.name === salon.name
        );

        if (!alreadyExists) {
          // Get or create the matching category for this demo salo
          // eslint-disable-next-line no-await-in-loop
          const category = await getOrCreateCategory(loggedInUser._id, salon.categoryTitle);

          const salonData = {
            name: salon.name,
            area: salon.area,
            address: salon.address,
            services: salon.services,
            rating: salon.rating,
            notes: salon.notes,
            latitude: salon.latitude,
            longitude: salon.longitude,
            categoryid: category._id,
            userid: loggedInUser._id,
          };

          
          // add the salon to the database if it doesn't already exist for the user
          await db.salonStore.addSalon(salonData);
        }
      }

      return h.redirect("/salons");
    },
  },

  //delete a salon and its associated services from the database
  deleteSalon: {
    handler: async function (request, h) {

      // Delete all services associated with the salon before deleting the salon itself
      await db.serviceStore.deleteServicesBySalonId(request.params.id);
      await db.salonStore.deleteSalonById(request.params.id);
      return h.redirect("/dashboard");
    },
  },
};