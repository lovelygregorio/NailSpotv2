import Mongoose from "mongoose";

const { Schema } = Mongoose;

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
