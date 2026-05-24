/** * MongoDB store for managing gallery post data.
 *
 * This module defines the `galleryMongoStore` object, which provides methods for interacting with the MongoDB database to perform CRUD operations on gallery post data. It includes methods to retrieve all posts, add a new post, get a post by its ID, add a comment to a post, delete a comment from a post, and delete a post. The store uses Mongoose models to interact with the MongoDB collection for gallery posts.
 * 
 */ 

import { GalleryPost } from "./gallery.js";

// MongoDB store object for managing gallery post data
export const galleryMongoStore = {
  async getAllPosts() {
    return GalleryPost.find().lean();
  },

  async addPost(post) {
    const newPost = new GalleryPost(post);
    return newPost.save();
  },

  async getPostById(id) {
    return GalleryPost.findById(id).lean();
  },

  async addComment(postId, comment) {
    return GalleryPost.findByIdAndUpdate(
      postId,
      { $push: { comments: comment } },
      { new: true }
    );
  },

  async deleteComment(postId, commentId) {
    return GalleryPost.findByIdAndUpdate(
      postId,
      { $pull: { comments: { _id: commentId } } },
      { new: true }
    );
  },

  async deletePost(id) {
    return GalleryPost.deleteOne({ _id: id });
  },
};