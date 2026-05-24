/** * API for GALLERY posts */

import Boom from "@hapi/boom";
import { db } from "../models/db.js";

export const galleryApi = {
  find: {
    auth: false,
    handler: async function () {
      return await db.galleryStore.getAllPosts();
    },
  },

  findOne: {
    auth: false,
    handler: async function (request) {
      const post = await db.galleryStore.getPostById(request.params.id);
      if (!post) {
        return Boom.notFound("No gallery post with this id");
      }
      return post;
    },
  },

  create: {
    auth: false,
    handler: async function (request, h) {
      const post = await db.galleryStore.addPost(request.payload);
      return h.response(post).code(201);
    },
  },

  deleteAll: {
    auth: false,
    handler: async function () {
      await db.galleryStore.deleteAllPosts();
      return { success: true };
    },
  },

  deleteOne: {
    auth: false,
    handler: async function (request) {
      await db.galleryStore.deletePostById(request.params.id);
      return { success: true };
    },
  },

  addComment: {
    auth: false,
    handler: async function (request) {
      const comment = await db.galleryStore.addComment(request.params.id, request.payload);
      return comment;
    },
  },
};