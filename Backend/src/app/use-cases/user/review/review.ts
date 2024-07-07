// src/app/use-cases/user/review/review.ts
import { ReviewDbRepositoryInterface } from '../../../interfaces/reviewDbRepository';

export const createReview = async (
  review: any, 
  reviewDbRepository: ReviewDbRepositoryInterface
) => {
  const newReview = await reviewDbRepository.createReview(review);
  return newReview;
};



export const checkReviewExists = async (
  appointment:string,
  reviewDbRepository: ReviewDbRepositoryInterface
) => await reviewDbRepository.reviewExists(appointment);
  

export const getAllReviews = async (
  doctorId: string, 
  reviewDbRepository: ReviewDbRepositoryInterface
) => {
  const reviews = await reviewDbRepository.getAllReviews(doctorId);
  return reviews;
};

export const getAllTheReviews = async ( 
  reviewDbRepository: ReviewDbRepositoryInterface
) => {
  const reviews = await reviewDbRepository.getAllTheReviews();
  return reviews;
};

export const RemoveReview = async (
  reviewId: string,
  reviewDbRepository: ReviewDbRepositoryInterface
) => await reviewDbRepository.deleteReview(reviewId);

export const submitReply = async (
  reviewId: string, 
  replyText: string, 
  reviewDbRepository: ReviewDbRepositoryInterface
) => {
  const updatedReview = await reviewDbRepository.submitReply(reviewId, replyText);
  return updatedReview;
};
