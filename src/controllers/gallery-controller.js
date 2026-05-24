/** * Controller for handling gallery-related operations.
 * This controller manages the gallery functionality, including displaying posts,
 * adding new posts, deleting posts, adding comments, and deleting comments.
 * It interacts with the database to retrieve and manipulate gallery data,
 **/

import { db } from "../models/db.js";

// Controller object containing all gallery-related handlers
export const galleryController = {
  index: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const posts = await db.galleryStore.getAllPosts();

      const postsWithOwnership = posts.map((post) => ({
        ...post,
        canDelete: 
         String(post.userid?._id || post.userid) === String(loggedInUser._id),

        comments: (post.comments || []).map((comment) => ({
          ...comment,
          canDeleteComment:
            String(comment.userid?._id || comment.userid) ===
            String(loggedInUser._id),
        })),
      }));

      return h.view("gallery-view", {
        title: "Community Nail Gallery",
        posts: postsWithOwnership,
        user: loggedInUser,
      });
    },
  },

  // Handler function to add a new post to the gallery for the logged-in user
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

  // Handler function to delete a post from the gallery for the logged-in user
  deletePost: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const post = await db.galleryStore.getPostById(request.params.id);

      if (!post) {
        return h.redirect("/gallery");
      }

      if (
        String(post.userid?._id || post.userid) !== String(loggedInUser._id)
      ) {
        return h.redirect("/gallery");
      }

      await db.galleryStore.deletePost(request.params.id);

      return h.redirect("/gallery");
    },
  },

  // Handler function to add a comment to a post in the gallery for the logged-in user
  addComment: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;

      if (!request.payload.comment || request.payload.comment.trim() === "") {
        return h.redirect("/gallery");
      }

      const comment = {
        userid: loggedInUser._id,
        username: loggedInUser.firstName,
        comment: request.payload.comment.trim(),
      };

      await db.galleryStore.addComment(request.params.id, comment);

      return h.redirect("/gallery");
    },
  },

  // Handler function to delete a comment from a post in the gallery for the logged-in user
  deleteComment: {
    handler: async function (request, h) {
      const loggedInUser = request.auth.credentials;
      const post = await db.galleryStore.getPostById(request.params.postId);

      if (!post) {
        return h.redirect("/gallery");
      }

      const comment = post.comments.find(
        (comment) => String(comment._id) === String(request.params.commentId)
      );

      if (
        comment &&
        String(comment.userid?._id || comment.userid) ===
          String(loggedInUser._id)
      ) {
        await db.galleryStore.deleteComment(
          request.params.postId,
          request.params.commentId
        );
      }

      return h.redirect("/gallery");
    },
  },
};