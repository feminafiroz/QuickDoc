"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const review_1 = require("../app/use-cases/user/review/review");
const httpStatus_1 = require("../types/httpStatus");
const reviewController = (reviewDbRepository, reviewDbRepositoryImpl) => {
    const dbReviewRepository = reviewDbRepository(reviewDbRepositoryImpl());
    const createReviewHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { rating, reviewText, user, doctor, appoinment } = req.body.review;
            const newReview = yield (0, review_1.createReview)({ rating, reviewText, user, doctor, appoinment }, dbReviewRepository);
            return res.status(200).json({ success: true, message: "Review submitted", data: newReview });
        }
        catch (error) {
            next(error);
        }
    });
    const getAllReviewsHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const doctorId = req.params.id;
            const reviews = yield (0, review_1.getAllReviews)(doctorId, dbReviewRepository);
            return res.status(200).json({ success: true, message: "Successful", data: reviews });
        }
        catch (error) {
            next(error);
        }
    });
    const submitReplyHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const reviewId = req.params.id;
            const { replyText } = req.body;
            const updatedReview = yield (0, review_1.submitReply)(reviewId, replyText, dbReviewRepository);
            return res.status(200).json({ success: true, message: "Reply submitted successfully", data: updatedReview });
        }
        catch (error) {
            next(error);
        }
    });
    const checkReviewExistsHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const appointment = req.query.appointment;
            const reviewExists = yield (0, review_1.checkReviewExists)(appointment, dbReviewRepository);
            return res.status(httpStatus_1.HttpStatus.OK).json({ reviewExists });
        }
        catch (error) {
            next(error);
        }
    });
    const getAllTheReviewsHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const reviews = yield (0, review_1.getAllTheReviews)(dbReviewRepository);
            return res.status(httpStatus_1.HttpStatus.OK).json({ success: true, message: "Successful", reviews });
        }
        catch (error) {
            next(error);
        }
    });
    /* METHOD:DELETE
    * Remove banner
    */
    const removeReviewHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { reviewId } = req.params;
            yield (0, review_1.RemoveReview)(reviewId, dbReviewRepository);
            res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "Review deleted successfully",
            });
        }
        catch (error) {
            next(error);
        }
    });
    return {
        createReviewHandler,
        checkReviewExistsHandler,
        getAllReviewsHandler,
        submitReplyHandler,
        getAllTheReviewsHandler,
        removeReviewHandler
    };
};
exports.default = reviewController;
