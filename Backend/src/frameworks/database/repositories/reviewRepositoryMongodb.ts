// src/frameworks/database/repositories/reviewRepositoryMongodb.ts
import Review from '../../database/models/Review';
import Doctor from '../../database/models/doctor';
import { ReviewInterface } from '../../../types/reviewInterface';
import doctor from '../../database/models/doctor';

export const reviewRepositoryMongodb = () => {
  const createReview = async (review: Partial<ReviewInterface>) => {
    const newReview = new Review(review);
    const savedReview = await newReview.save();
    await Doctor.findByIdAndUpdate(review.doctor, {
      $push: { reviews: savedReview._id },
    });
    return savedReview;
  };

  const getAllReviews = async (doctorId: string) => {
    return await Review.find({ doctor: doctorId });
  };

  const getAllTheReviews = async () => {
    return await Review.find().sort({ createdAt: -1 });
  };
  
  const reviewExists = async ( appointment:string ) => {
    const review = await Review.findOne({
      appoinment:appointment});
    if(review){
      return true
    }else{
      return false
    }
};

const deleteReview = async (reviewId: string) =>{
  const result = await Review.findByIdAndDelete({_id : reviewId});
  const doc = await Doctor.findOneAndUpdate(
    { reviews: reviewId },
    { $pull: { reviews: reviewId } },
    { new: true }
  );
  return result
}


  const submitReply = async (reviewId: string, replyText: string) => {
    const review = await Review.findById(reviewId);
    if (!review) {
      throw new Error('Review not found');
    }
    // review.replyText = replyText;
    return await review.save();
  };

  return {
    createReview,
    getAllReviews,
    getAllTheReviews,
    submitReply,
    reviewExists,
    deleteReview
  };
};

export type reviewRepositoryMongodbType = typeof reviewRepositoryMongodb;
