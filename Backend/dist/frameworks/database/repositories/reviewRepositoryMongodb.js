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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRepositoryMongodb = void 0;
// src/frameworks/database/repositories/reviewRepositoryMongodb.ts
const Review_1 = __importDefault(require("../../database/models/Review"));
const doctor_1 = __importDefault(require("../../database/models/doctor"));
const reviewRepositoryMongodb = () => {
    const createReview = (review) => __awaiter(void 0, void 0, void 0, function* () {
        const newReview = new Review_1.default(review);
        const savedReview = yield newReview.save();
        yield doctor_1.default.findByIdAndUpdate(review.doctor, {
            $push: { reviews: savedReview._id },
        });
        return savedReview;
    });
    const getAllReviews = (doctorId) => __awaiter(void 0, void 0, void 0, function* () {
        return yield Review_1.default.find({ doctor: doctorId });
    });
    const getAllTheReviews = () => __awaiter(void 0, void 0, void 0, function* () {
        return yield Review_1.default.find().sort({ createdAt: -1 });
    });
    const reviewExists = (appointment) => __awaiter(void 0, void 0, void 0, function* () {
        const review = yield Review_1.default.findOne({
            appoinment: appointment
        });
        if (review) {
            return true;
        }
        else {
            return false;
        }
    });
    const deleteReview = (reviewId) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield Review_1.default.findByIdAndDelete({ _id: reviewId });
        const doc = yield doctor_1.default.findOneAndUpdate({ reviews: reviewId }, { $pull: { reviews: reviewId } }, { new: true });
        return result;
    });
    const submitReply = (reviewId, replyText) => __awaiter(void 0, void 0, void 0, function* () {
        const review = yield Review_1.default.findById(reviewId);
        if (!review) {
            throw new Error('Review not found');
        }
        // review.replyText = replyText;
        return yield review.save();
    });
    return {
        createReview,
        getAllReviews,
        getAllTheReviews,
        submitReply,
        reviewExists,
        deleteReview
    };
};
exports.reviewRepositoryMongodb = reviewRepositoryMongodb;
