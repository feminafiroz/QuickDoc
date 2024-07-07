// src/app/interfaces/reviewDbRepository.ts
import { reviewRepositoryMongodbType } from '../../frameworks/database/repositories/reviewRepositoryMongodb';
import { ReviewInterface } from '../../types/reviewInterface';

export const reviewDbRepository = (repository: ReturnType<reviewRepositoryMongodbType>) => {

  const createReview = async (review: Partial<ReviewInterface>) => await repository.createReview(review);

  const reviewExists = async (appointment: string) => await repository.reviewExists(appointment);

  const getAllReviews = async (doctorId: string) => await repository.getAllReviews(doctorId);

  const getAllTheReviews = async () => await repository.getAllTheReviews();

  const deleteReview = async (reviewId: string) => await repository.deleteReview(reviewId);

  const submitReply = async (reviewId: string, replyText: string) => await repository.submitReply(reviewId, replyText);

  return {
    createReview,
    getAllReviews,
    getAllTheReviews,
    submitReply,
    reviewExists,
    deleteReview
  };
};

export type ReviewDbRepositoryInterface = ReturnType<typeof reviewDbRepository>;
