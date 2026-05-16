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