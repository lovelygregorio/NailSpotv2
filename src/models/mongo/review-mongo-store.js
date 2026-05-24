/** * MongoDB store for managing review data.
 *
 * This module defines the `reviewMongoStore` object, which provides methods for interacting with the MongoDB database to perform CRUD operations on review data. It includes methods to add a new review, get reviews by salon ID, delete a review by ID, and delete reviews by salon ID. The store uses Mongoose models to interact with the MongoDB collection for reviews.
 * 
 */
import { Review } from './review.js';

export const reviewMongoStore = { // Define the reviewMongoStore object
    async addReview(review) { // Method to add a new review
        const newReview = new Review(review);
        await newReview.save();
        return newReview;
    },

    async getReviewsBySalonId(salonId) { // Method to get reviews by salon ID
        return await Review.find({ salonid: salonId }).lean(); // Populate the user field with the user's name
    },

    async deleteReviewById(reviewId) { // Method to delete a review by ID
        await Review.deleteOne({ _id: reviewId });
    },

    async deleteReviewsBySalonId(salonId) { // Method to delete reviews by salon ID
        await Review.deleteMany({ salonid: salonId });
    }
};



