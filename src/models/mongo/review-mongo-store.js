import { Review } from '../review.js';

export const reviewMongoStore = { // Define the reviewMongoStore object
    async addReview(review) { // Method to add a new review
        const newReview = new Review(review);
        return await newReview.save();
    }
};

aync getReviewsBySalonId(salonId) { // Method to get reviews by salon ID
    return await Review.find({ salonid: salonId }).populate('user', 'name'); // Populate the user field with the user's name
};

aync deleteReviewById(reviewId) { // Method to delete a review by ID
    await Review.deleteOne({ _id: id });
},

async deleteReviewsBySalonId(salonId) { // Method to delete reviews by salon ID
    await Review.deleteMany({ salonid: salonId });
},
};



