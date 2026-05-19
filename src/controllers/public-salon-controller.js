import { db } from "../models/db.js";

export const publicSalonController = {

  // PUBLIC SALON LIST
  index: {
    auth: false,

    handler: async function (request, h) {

let salons = await db.salonStore.getAllSalons();

const search = request.query.search || "";
const area = request.query.area || "";

if (search) {
  salons = salons.filter((salon) =>
    salon.name.toLowerCase().includes(search.toLowerCase())
  );
}

if (area) {
  salons = salons.filter((salon) => salon.area === area);
}

      return h.view("public-salons-view", {
        title: "Explore Dublin Nail Salons",
        salons,
        search,
        area, 
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
addFavourite: {
  handler: async function (request, h) {
    const loggedInUser = request.auth.credentials;

    await db.userStore.addFavourite(loggedInUser._id, request.params.id);

    return h.redirect("/public-salons");
  },
},

favourites: {
  handler: async function (request, h) {
    const loggedInUser = request.auth.credentials;

    const favourites = await db.userStore.getFavourites(loggedInUser._id);

    return h.view("favourites-view", {
      title: "My Favourite Salons",
      favourites,
    });
  },
},

};