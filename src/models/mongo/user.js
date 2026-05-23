/**
 * User Model
 *
 * Defines the schema for User documents in MongoDB.
 * Includes helper methods for authentication.
 */
import Mongoose from "mongoose";
import Boom from "@hapi/boom";

//  Define the schema for the User collection in MongoDB
const { Schema } = Mongoose;

// Schema for the User model, including fields for first name, last name, email, and password
const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,

  isAdmin: {
    type: Boolean,
    default: false,
  },
  
  favourites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Salon",
    },
  ],
});

// Static method to find a user by their email address
userSchema.statics.findByEmail = function (email) {
  return this.findOne({ email: email });
};

// Instance method to compare a candidate password with the stored password for authentication
userSchema.methods.comparePassword = function (candidatePassword) {
  const isMatch = this.password === candidatePassword;

  // If the passwords do not match, throw an unauthorized error using Boom
  if (!isMatch) {

    // Throw an unauthorized error if the password does not match, providing a clear message for authentication failure
    throw Boom.unauthorized("Password mismatch"); 
  }
  return this; // Return the user instance if the password matches, allowing for successful authentication
};

// Create and export the User model based on the defined schema
export const User = Mongoose.model("User", userSchema);
