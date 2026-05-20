import { GalleryPost } from "./gallery.js";

export const galleryMongoStore = {


  async getAllPosts() {
    return GalleryPost.find().lean();
  },

  async addPost(post) {
    const newPost = new GalleryPost(post);
    return newPost.save();
  },

  async deletePost(id) {
    try {
      await GalleryPost.deleteOne({ _id: id });
    } catch {
      console.log("bad id");
    }
  },
};
