/**
 * User Mongo Store
 *
 * MongoDB data store for users using Mongoose.
 * Handles CRUD operations for user data.
 */
import { User } from "./user.js";

// Exported object containing methods to interact with the user data in MongoDB
export const userMongoStore = {
  async getAllUsers() {
    return await User.find().lean();
  },

  // Add a new user to the MongoDB collection and return it with its assigned ID
   async addUser(user) {
    const newUser = new User(user);
    return await newUser.save();
  },

  // Retrieve a specific user by their unique ID from the MongoDB collection
  async getUserById(id) {
    if (!id) return null;
    try {
      return await User.findOne({ _id: id }).lean();
    } catch {
    return null;
    }
  },

// Retrieve a specific user by their email address from the MongoDB collection
  async getUserByEmail(email) {
     if (!email) return null;
    return await User.findOne({ email }).lean();
  },

  // Update a specific user's details based on their unique ID
  async updateUser(id, updatedUser) {
    try {
      const user = await User.findOne({ _id: id });
      if (user) {
        user.firstName = updatedUser.firstName;
        user.lastName = updatedUser.lastName;
        user.email = updatedUser.email;
        user.password = updatedUser.password;
        await user.save();
      }
    } catch (error) {
      console.log("bad user id");
    }
  },

  // Delete a specific user by their unique ID from the MongoDB collection
  async deleteUserById(id) {
    try {
      await User.deleteOne({ _id: id });
    } catch (error) {
      console.log("bad user id");
    }
  },

  // Delete all users from the MongoDB collection (used for testing or resetting data)
 async deleteAll() {
    await User.deleteMany({});// ignore bad ids
  },

  // Add a salon to the user's list of favourite salons by their unique IDs
async addFavourite(userId, salonId) {
  const user = await User.findById(userId);

  if (!user.favourites) {
    user.favourites = [];
  }

  if (!user.favourites.includes(salonId)) {
    user.favourites.push(salonId);
  }

  await user.save();
},

// Retrieve the list of favourite salons for a specific user by their unique ID
async getFavourites(userId) {
  const user = await User.findById(userId)
    .populate("favourites")
    .lean();

  return user.favourites || [];
},

};
