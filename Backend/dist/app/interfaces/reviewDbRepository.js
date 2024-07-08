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
exports.reviewDbRepository = void 0;
const reviewDbRepository = (repository) => {
    const createReview = (review) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.createReview(review); });
    const reviewExists = (appointment) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.reviewExists(appointment); });
    const getAllReviews = (doctorId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllReviews(doctorId); });
    const getAllTheReviews = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllTheReviews(); });
    const deleteReview = (reviewId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.deleteReview(reviewId); });
    const submitReply = (reviewId, replyText) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.submitReply(reviewId, replyText); });
    return {
        createReview,
        getAllReviews,
        getAllTheReviews,
        submitReply,
        reviewExists,
        deleteReview
    };
};
exports.reviewDbRepository = reviewDbRepository;
