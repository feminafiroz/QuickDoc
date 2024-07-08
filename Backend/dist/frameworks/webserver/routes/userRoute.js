"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookingController_1 = __importDefault(require("../../../adapters/bookingController"));
const reviewController_1 = __importDefault(require("../../../adapters/reviewController"));
const userController_1 = __importDefault(require("../../../adapters/userController"));
const AdminDbRepository_1 = __importDefault(require("../../../app/interfaces/AdminDbRepository"));
const bookingDbRepository_1 = require("../../../app/interfaces/bookingDbRepository");
const departmentRepositoryInterface_1 = require("../../../app/interfaces/departmentRepositoryInterface");
const doctorDBRepository_1 = require("../../../app/interfaces/doctorDBRepository");
const prescriptionDbRepository_1 = require("../../../app/interfaces/prescriptionDbRepository");
const reviewDbRepository_1 = require("../../../app/interfaces/reviewDbRepository");
const timeSlotDbRepository_1 = require("../../../app/interfaces/timeSlotDbRepository");
const userDbRepository_1 = require("../../../app/interfaces/userDbRepository");
const authServiceInterface_1 = require("../../../app/service-interface/authServiceInterface");
const AdminRepositoryMongodb_1 = require("../../database/repositories/AdminRepositoryMongodb");
const BookingRepositoryMongodb_1 = require("../../database/repositories/BookingRepositoryMongodb");
const departmentRepositoryMongodb_1 = require("../../database/repositories/departmentRepositoryMongodb");
const doctorRepositoryMongodb_1 = require("../../database/repositories/doctorRepositoryMongodb");
const prescriptionRepositoryMongodb_1 = require("../../database/repositories/prescriptionRepositoryMongodb");
const reviewRepositoryMongodb_1 = require("../../database/repositories/reviewRepositoryMongodb");
const timeSlotRepositoryMongodb_1 = require("../../database/repositories/timeSlotRepositoryMongodb");
const userRepositoryMongodb_1 = require("../../database/repositories/userRepositoryMongodb");
const authService_1 = require("../../services/authService");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const userRoutes = () => {
    const router = express_1.default.Router();
    const controller = (0, userController_1.default)(authServiceInterface_1.authServiceInterface, authService_1.authService, userDbRepository_1.userDbRepository, userRepositoryMongodb_1.userRepositoryMongodb, doctorDBRepository_1.doctorDbRepository, doctorRepositoryMongodb_1.doctorRepositoryMongodb, departmentRepositoryInterface_1.departmentDbRepository, departmentRepositoryMongodb_1.departmentRepositoryMongodb, timeSlotDbRepository_1.timeSlotDbRepository, timeSlotRepositoryMongodb_1.timeSlotRepositoryMongodb, AdminDbRepository_1.default, AdminRepositoryMongodb_1.adminRepositoryMongodb, prescriptionDbRepository_1.prescriptionDbRepository, prescriptionRepositoryMongodb_1.prescriptionRepositoryMongodb);
    const _bookingController = (0, bookingController_1.default)(userDbRepository_1.userDbRepository, userRepositoryMongodb_1.userRepositoryMongodb, doctorDBRepository_1.doctorDbRepository, doctorRepositoryMongodb_1.doctorRepositoryMongodb, timeSlotDbRepository_1.timeSlotDbRepository, timeSlotRepositoryMongodb_1.timeSlotRepositoryMongodb, bookingDbRepository_1.bookingDbRepository, BookingRepositoryMongodb_1.bookingRepositoryMongodb);
    const _reviewController = (0, reviewController_1.default)(reviewDbRepository_1.reviewDbRepository, reviewRepositoryMongodb_1.reviewRepositoryMongodb);
    router.post('/register', controller.registerUser);
    router.post('/verify_otp', controller.verifyOtp);
    router.post("/resend_otp", controller.resendOtp);
    router.post("/login", controller.userLogin);
    router.post("/forgot_password", controller.forgotPassword);
    router.post("/reset_password/:token", controller.resetPassword);
    router.post("/google_signIn", controller.googleSignIn);
    router.get("/doctors", controller.doctorPage);
    router.get("/doctor/:id", controller.doctorDetails);
    router.get("/user/:id", controller.userDetails);
    router.get('/department/list', controller.listDepartmentsHandler);
    router.get("/profile", authMiddleware_1.default, controller.userProfile);
    router.patch("/profile/edit", authMiddleware_1.default, controller.updateUserInfo);
    router.get("/time-slots/:id", authMiddleware_1.default, controller.getTimeslots);
    router.get("/time-slots/:id/dates", authMiddleware_1.default, controller.getDateSlots);
    router.get("/fetchWallet/:id", authMiddleware_1.default, controller.getWallet);
    router.get("/transactions", authMiddleware_1.default, controller.getTransactions);
    router.get("/banners", controller.getBanners);
    router.post("/fetchPrescription", authMiddleware_1.default, controller.fetchPrescription);
    router.post("/appointments", authMiddleware_1.default, _bookingController.BookAppoinment); //last booking ......
    router.get("/allAppoinments", authMiddleware_1.default, _bookingController.getAllAppoinments);
    router.patch("/payment/status/:id", authMiddleware_1.default, _bookingController.updatePaymentStatus);
    router.post("/walletPayment", authMiddleware_1.default, _bookingController.walletPayment);
    router.put("/updateWallet", authMiddleware_1.default, _bookingController.changeWalletAmount);
    router.get("/bookingdetails/:id", authMiddleware_1.default, _bookingController.getBookingDetails); //id-bookingid
    router.get("/bookings/:id", authMiddleware_1.default, _bookingController.getAllBookingDetails);
    router.put("/bookingdetails/:id", authMiddleware_1.default, _bookingController.cancelAppoinment);
    router.post("/createreviews", authMiddleware_1.default, _reviewController.createReviewHandler);
    router.get("/reviewexists", authMiddleware_1.default, _reviewController.checkReviewExistsHandler);
    router.get("/getallreviews/:id", authMiddleware_1.default, _reviewController.getAllReviewsHandler); //:id =doctorId
    router.get('/getallreviews', authMiddleware_1.default, _reviewController.getAllTheReviewsHandler);
    router.post('/submitreply/:id', authMiddleware_1.default, _reviewController.submitReplyHandler); //:id=reviewId
    return router;
};
exports.default = userRoutes;
