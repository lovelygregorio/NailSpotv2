import { db } from "../models/db.js";

export const publicSalonController = {

  // PUBLIC SALON LIST
  index: {
    auth: false,

    handler: async function (request, h) {

      const salons = await db.salonStore.getAllSalons();

      return h.view("public-salons-view", {
        title: "Explore Dublin Nail Salons",
        salons,
      });
    },
  },

  // SINGLE PUBLIC SALON VIEW
  viewSalon: {
    auth: false,

    handler: async function (request, h) {

      const salon =
        await db.salonStore.getSalonById(request.params.id);

      const reviews =
        await db.reviewStore.getReviewsBySalonId(salon._id);

      return h.view("public-salon-view", {
        title: salon.name,
        salon,
        reviews,
      });
    },
  },

  // PUBLIC REVIEW
  addReview: {
    auth: false,

    handler: async function (request, h) {

      const salon =
        await db.salonStore.getSalonById(request.params.id);

      const newReview = {
        salonid: salon._id,
        rating: Number(request.payload.rating),
        comment: request.payload.comment,
      };

      await db.reviewStore.addReview(newReview);

      return h.redirect(`/public-salon/${request.params.id}`);
    },
  },

};