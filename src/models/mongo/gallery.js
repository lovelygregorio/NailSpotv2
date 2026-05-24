/** * MongoDB model for gallery post data
 *
 * This module defines the MongoDB store for managing gallery post data in the NailSpot application. It provides methods to interact with the MongoDB database to perform CRUD operations on gallery post data, including retrieving all posts, adding a new post, getting a post by its ID, adding a comment to a post, deleting a comment from a post, and deleting a post. The store uses Mongoose models to interact with the MongoDB collection for gallery posts.
 * */

import Mongoose from "mongoose";

const { Schema } = Mongoose;

// MongoDB store object for managing gallery post data
const gallerySchema = new Schema({
    title: String,
    image: String,
    caption: String,
    style: String,
    salonName: String,

userid: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
 comments: [
    {
      username: String,
      comment: String,
    },
 ]

});

export const GalleryPost = Mongoose.model("GalleryPost", gallerySchema);    
