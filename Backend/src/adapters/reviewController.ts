// src/adapters/reviewController.ts
import { NextFunction, Request, Response } from 'express';
import { ReviewDbRepositoryInterface } from '../app/interfaces/reviewDbRepository';
import { RemoveReview, checkReviewExists, createReview, getAllReviews, getAllTheReviews, submitReply } from '../app/use-cases/user/review/review';
import { reviewRepositoryMongodbType } from '../frameworks/database/repositories/reviewRepositoryMongodb';
import { HttpStatus } from '../types/httpStatus';

const reviewController = (
    reviewDbRepository: (repository: ReturnType<reviewRepositoryMongodbType>) => ReviewDbRepositoryInterface,
    reviewDbRepositoryImpl: reviewRepositoryMongodbType
) => {
    const dbReviewRepository = reviewDbRepository(reviewDbRepositoryImpl());

    const createReviewHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { rating, reviewText, user, doctor,appoinment } = req.body.review;
            const newReview = await createReview({ rating, reviewText, user, doctor,appoinment }, dbReviewRepository);
            return res.status(200).json({ success: true, message: "Review submitted", data: newReview });
        } catch (error) {
            next(error);
        }
    };

    const getAllReviewsHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const doctorId = req.params.id;
            const reviews = await getAllReviews(doctorId, dbReviewRepository);
            return res.status(200).json({ success: true, message: "Successful", data: reviews });
        } catch (error) {
            next(error);
        }
    };

    const submitReplyHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reviewId = req.params.id;
            const { replyText } = req.body;
            const updatedReview = await submitReply(reviewId, replyText, dbReviewRepository);
            return res.status(200).json({ success: true, message: "Reply submitted successfully", data: updatedReview });
        } catch (error) {
            next(error);
        }
    };

    const checkReviewExistsHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
        const appointment = req.query.appointment as string
        console.log(appointment,"$$$$$$$$$$$$$$$$$$$$$$$$$$$$$@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
        const reviewExists = await checkReviewExists(appointment, dbReviewRepository);
        console.log(reviewExists)
        return res.status(HttpStatus.OK).json({ reviewExists });
        } catch (error) {
            next(error);
        }
    };

    const getAllTheReviewsHandler = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reviews = await getAllTheReviews( dbReviewRepository);
            console.log(reviews,"reviewsreviewsreviewsreviewsreviews")
            return res.status(HttpStatus.OK).json({ success: true, message: "Successful", reviews });
        } catch (error) {
            next(error);
        }
    }

    /* METHOD:DELETE
    * Remove banner
    */
   const removeReviewHandler = async (
     req: Request,
     res: Response,
     next: NextFunction
   ) => {
     try {
       const { reviewId } = req.params;
       console.log(reviewId,"@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@iamherefeminaa..................")

 
       await RemoveReview(reviewId, dbReviewRepository);
 
       res.status(HttpStatus.OK).json({
         success: true,
         message: "Review deleted successfully",
       });
     } catch (error) {
       next(error);
     }
   };

    return {
        createReviewHandler,
        checkReviewExistsHandler,
        getAllReviewsHandler,
        submitReplyHandler,
        getAllTheReviewsHandler,
        removeReviewHandler
    };
};

export default reviewController;
