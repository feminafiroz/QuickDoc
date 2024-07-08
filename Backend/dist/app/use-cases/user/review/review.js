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
exports.submitReply = exports.RemoveReview = exports.getAllTheReviews = exports.getAllReviews = exports.checkReviewExists = exports.createReview = void 0;
const createReview = (review, reviewDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const newReview = yield reviewDbRepository.createReview(review);
    return newReview;
});
exports.createReview = createReview;
const checkReviewExists = (appointment, reviewDbRepository) => __awaiter(void 0, void 0, void 0, function* () { return yield reviewDbRepository.reviewExists(appointment); });
exports.checkReviewExists = checkReviewExists;
const getAllReviews = (doctorId, reviewDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield reviewDbRepository.getAllReviews(doctorId);
    return reviews;
});
exports.getAllReviews = getAllReviews;
const getAllTheReviews = (reviewDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const reviews = yield reviewDbRepository.getAllTheReviews();
    return reviews;
});
exports.getAllTheReviews = getAllTheReviews;
const RemoveReview = (reviewId, reviewDbRepository) => __awaiter(void 0, void 0, void 0, function* () { return yield reviewDbRepository.deleteReview(reviewId); });
exports.RemoveReview = RemoveReview;
const submitReply = (reviewId, replyText, reviewDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedReview = yield reviewDbRepository.submitReply(reviewId, replyText);
    return updatedReview;
});
exports.submitReply = submitReply;
