import { db } from "../models/db.js";

export const galleryController = {

  index: {
    auth: false,

    handler: async function (request, h) {

      const posts = await db.galleryStore.getAllPosts();

      return h.view("gallery-view", {
        title: "Community Nail Gallery",
        posts,
      });
    },
  },

  addPost: {
    handler: async function (request, h) {

      const loggedInUser = request.auth.credentials;

      const post = {
        title: request.payload.title,
        image: request.payload.image,
        caption: request.payload.caption,
        style: request.payload.style,
        salonName: request.payload.salonName,
        userid: loggedInUser._id,
      };

      await db.galleryStore.addPost(post);

      return h.redirect("/gallery");
    },
  },
};