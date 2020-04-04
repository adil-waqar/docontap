const ReviewModel = require('./../models').Review;

const createReview = async (review) => {
    try {
        const newReview = await ReviewModel.create({
            ...review
        });
        return {success: true, data: newReview};
    }   
    catch (err) {
        return {success: false, data: err};
    }
}

const listReviews = async () => {   
    try {
        const reviews = await ReviewModel.findAll();
        return { success:true, data: reviews };
    }
    catch(err) {
        return { success: false, data: err };
    }
}

const getReviewById = async (reviewId) => {
    try {
        const review = await ReviewModel.findByPk(reviewId);
        if(review) {
            return {success:true, data: review};
        }
        else {
            return {success:true, message: "Not FOund"}
        }
    }
    catch(err) {
        return { success: false, data: err};
    }
}

const updateReview = async (reviewId,reviewUpdate) => {
    try {
        const review = await ReviewModel.findByPk(reviewId);
        if(review) {
            try {
                const updatedReview = await review.update( reviewUpdate,{fields: Object.keys(reviewUpdate) });
                return { success: true, data: updatedReview };
            }
            catch (err) {
                return { success: false, data: err};   
            }
        }
        else {
            return { success: true, data: "Review Not Found"};
        }
    }
    catch (err) {
        return { success: false, data: err};
    }
}

const destroyReview = async (reviewId) => {
    try {
      const review = await ReviewModel.findByPk(reviewId);
      if(review) {
        await review.destroy();
        return {success :true, data: "Resource Deleted"};
      }
      else {
          return {success: false, data: "Review Not Found"};
      }
    } 
    catch (err) {
      return { success: false, data: err };
    }
}

module.exports = {
    createReview,
    listReviews,
    getReviewById,
    updateReview,
    destroyReview
}