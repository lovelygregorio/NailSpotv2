import { GalleryPost } from "./gallery.js";

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