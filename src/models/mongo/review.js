/** * MongoDB store for managing review data.
 *
 * This module defines the `reviewMongoStore` object, which provides methods for interacting with the MongoDB database to perform CRUD operations on review data. It includes methods to add a new review, get reviews by salon ID, delete a review by ID, and delete reviews by salon ID. The store uses Mongoose models to interact with the MongoDB collection for reviews.
 * 
 */

import mongoose from "mongoose"; // Import Mongoose for MongoDB interactions

const reviewSchema = new mongoose.Schema({ // Define the Review schema
    comment: {
        type: String,
        required: true,
    },  
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    salonid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Salon',
    },
    });

    export const Review = mongoose.model('Review', reviewSchema); // Export the Review model