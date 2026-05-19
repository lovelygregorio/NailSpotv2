/**
 * Salon Controller
 *
 * Handles salon-related views and actions.
 * Includes displaying salon details, adding and updating salons,
 * and managing services linked to a salon.
 */

import { db } from "../models/db.js";

// Controller object containing handlers for salon-related operations  
export const salonController = {

  // Handler function to display details of a specific salon
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const salon = await db.salonStore.getSalonById(request.params.id);

      // Redirect if salon does not exist or does not belong to the logged-in user
      if (!salon) {
        return h.redirect("/dashboard");
      }

      // Ensure the salon belongs to the logged-in user before displaying details
      if (String(salon.userid) !== String(loggedInUser._id)) {
        return h.redirect("/dashboard");
      }
      
       const reviews = await db.reviewStore.getReviewsBySalonId(salon._id);

      // Render the salon details view with the retrieved salon information
      return h.view("salon-view", {
        title: "Salon Details",
        salon,
        reviews,
      });
    },
  },

  // Handler function to update the details of a specific salon
  addSalon: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const category = await db.categoryStore.getCategoryById(request.params.id);

      // Redirect if category does not exist or does not belong to the logged-in user
      if (!category) {
        return h.redirect("/categories");
      }

      // Only allow access if the category belongs to the logged-in user
      if (String(category.userid) !== String(loggedInUser._id)) {
        return h.redirect("/categories");
      }

      // Build a new salon object from the submitted form data
      const newSalon = {
        name: request.payload.name,
        area: request.payload.area,
        address: request.payload.address,
        services: request.payload.services,
        rating: Number(request.payload.rating || 4),
        notes: request.payload.notes,
        latitude: Number(request.payload.latitude || 53.3498),
        longitude: Number(request.payload.longitude || -6.2603),
        categoryid: category._id,
        image: request.payload.image,
        userid: loggedInUser._id,
      };

      await db.salonStore.addSalon(newSalon);
      return h.redirect(`/categories/${request.params.id}`);
    },
  },

  // Handler function to update the details of a specific salon
  updateSalon: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const salon = await db.salonStore.getSalonById(request.params.id);

      // Redirect if salon does not exist or does not belong to the logged-in user
      if (!salon) {
        return h.redirect("/dashboard");
      }

      // Ensure the salon belongs to the logged-in user before allowing updates
      if (String(salon.userid) !== String(loggedInUser._id)) {
        return h.redirect("/dashboard");
      }

      // Build an updated salon object from the submitted form data
      const updatedSalon = {
        name: request.payload.name,
        area: request.payload.area,
        address: request.payload.address,
        services: request.payload.services,
        rating: Number(request.payload.rating || 4),
        notes: request.payload.notes,
        latitude: Number(request.payload.latitude || 53.3498),
        longitude: Number(request.payload.longitude || -6.2603),
        categoryid: salon.categoryid,
        userid: salon.userid,
        image: request.payload.image,
      };
      
      // Update the salon in the database with the new details
      await db.salonStore.updateSalon(salon, updatedSalon);
      return h.redirect(`/salon/${request.params.id}`);
    },
  },

  // Handler function to delete a specific salon and its associated services
  addService: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const salon = await db.salonStore.getSalonById(request.params.id);

      // Redirect if salon does not exist or does not belong to the logged-in user
      if (!salon) {
        return h.redirect("/dashboard");
      }

      // Ensure the salon belongs to the logged-in user before allowing service additions
      if (String(salon.userid) !== String(loggedInUser._id)) {
        return h.redirect("/dashboard");
      }

      // Build a new service object from the submitted form data
      const newService = {
        salonid: salon._id,
        title: request.payload.title,
        category: request.payload.category,
        price: Number(request.payload.price),
      };

      // Add the new service to the database and associate it with the salon
      await db.serviceStore.addService(newService);
      return h.redirect(`/salon/${request.params.id}`);
    },
  },

  // Handler function to add a review to a salon
  addReview: {
  handler: async function (request, h) {
    const loggedInUser = request.auth.credentials;
    const salon = await db.salonStore.getSalonById(request.params.id);

    if (!salon) {
      return h.redirect("/dashboard");
    }

    if (String(salon.userid) !== String(loggedInUser._id)) {
      return h.redirect("/dashboard");
    }

    const newReview = {
      salonid: salon._id,
      rating: Number(request.payload.rating),
      comment: request.payload.comment,
      user: loggedInUser._id,
    };

    await db.reviewStore.addReview(newReview);

    return h.redirect(`/salon/${request.params.id}`);
  },
},
  
  // Handler function to delete a specific service from a salon
  deleteService: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const salon = await db.salonStore.getSalonById(request.params.id);

      // Redirect if salon does not exist or does not belong to the logged-in user
      if (!salon) {
        return h.redirect("/dashboard");
      }

      if (String(salon.userid) !== String(loggedInUser._id)) {
        return h.redirect("/dashboard");
      }

      // Delete the specified service from the database
      await db.serviceStore.deleteServiceById(request.params.serviceid);
      return h.redirect(`/salon/${request.params.id}`);
    },
  },
  deleteReview: {
  handler: async function (request, h) {
    const loggedInUser = request.auth.credentials;
    const salon = await db.salonStore.getSalonById(request.params.id);

    if (!salon) {
      return h.redirect("/dashboard");
    }

    if (String(salon.userid) !== String(loggedInUser._id)) {
      return h.redirect("/dashboard");
    }

    await db.reviewStore.deleteReviewById(request.params.reviewid);

    return h.redirect(`/salon/${request.params.id}`);
  },
},
};