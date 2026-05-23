import { db } from "../models/db.js";

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