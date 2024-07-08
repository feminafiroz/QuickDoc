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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const adminBanner_1 = require("../app/use-cases/Admin/adminBanner");
const adminDepartment_1 = require("../app/use-cases/Admin/adminDepartment");
const adminRead_1 = require("../app/use-cases/Admin/adminRead");
const timeSlot_1 = require("../app/use-cases/Doctor/timeSlot");
const prescriptionUseCase_1 = require("../app/use-cases/Prescription/prescriptionUseCase");
const userAuth_1 = require("../app/use-cases/user/auth/userAuth");
const profile_1 = require("../app/use-cases/user/readnupdate/profile");
const httpStatus_1 = require("../types/httpStatus");
const userController = (authServiceInterface, authServiceImpl, userDbRepository, userRepositoryImpl, doctorDbRepository, doctorDbRepositoryImpl, departmentDbRepository, departmentDbRepositoryImpl, timeSlotDbRepository, timeSlotDbRepositoryImpl, adminDbRepository, adminDbRepositoryImpl, prescriptionDbRepository, prescriptionDbRepositoryImpl) => {
    const dbRepositoryUser = userDbRepository(userRepositoryImpl());
    const authService = authServiceInterface(authServiceImpl());
    const dbDoctorRepository = doctorDbRepository(doctorDbRepositoryImpl());
    const dbDepartmentRepository = departmentDbRepository(departmentDbRepositoryImpl());
    const dbTimeSlotRepository = timeSlotDbRepository(timeSlotDbRepositoryImpl());
    const adminRepository = adminDbRepository(adminDbRepositoryImpl());
    const dbPrescriptionRepository = prescriptionDbRepository(prescriptionDbRepositoryImpl());
    // Register User POST - Method
    const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = req.body;
            const newUser = yield (0, userAuth_1.userRegister)(user, dbRepositoryUser, authService);
            res.json({
                message: "User registration successful,please verify your email",
                newUser,
            });
        }
        catch (error) {
            next(error);
        }
    });
    // Verify Otp Method POSt
    const verifyOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { otp, userId } = req.body;
            const isVerified = yield (0, userAuth_1.verifyOtpUser)(otp, userId, dbRepositoryUser);
            if (isVerified) {
                return res.status(httpStatus_1.HttpStatus.OK)
                    .json({ message: "User account verified, please login" });
            }
        }
        catch (error) {
            next(error);
        }
    });
    //Resend Otp method : POST
    const resendOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId } = req.body;
            yield (0, userAuth_1.deleteOtp)(userId, dbRepositoryUser, authService);
            res.json({ message: "New otp sent to mail" });
        }
        catch (error) {
            next(error);
        }
    });
    // user login method: Post
    const userLogin = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { accessToken, refreshToken, isEmailExist } = yield (0, userAuth_1.login)(req.body, dbRepositoryUser, authService);
            res
                .status(httpStatus_1.HttpStatus.OK)
                .json({ message: "login success", user: isEmailExist,
                access_token: accessToken,
                refresh_token: refreshToken,
            });
        }
        catch (error) {
            next(error);
        }
    }));
    //user forgot password : post
    const forgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email } = req.body;
            yield (0, userAuth_1.sendResetVerificationCode)(email, dbRepositoryUser, authService);
            return res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "Reset password is send to your email,check it"
            });
        }
        catch (error) {
            next(error);
        }
    });
    //user reset password : post
    const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { password } = req.body;
            const { token } = req.params;
            yield (0, userAuth_1.verifyTokenAndRestPassword)(token, password, dbRepositoryUser, authService);
            return res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "Reset password success,you can login with your new password",
            });
        }
        catch (error) {
            next(error);
        }
    });
    //google sign : post
    const googleSignIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userData = req.body.user;
            const { accessToken, refreshToken, isEmailExist, createdUser } = yield (0, userAuth_1.authenticateGoogleSignInUser)(userData, dbRepositoryUser, authService);
            const user = isEmailExist ? isEmailExist : createdUser; //isEmailExist is truthy (an existing user is found), user is set to isEmailExist.Otherwise, user is set to createdUser (the newly created user).
            res.status(httpStatus_1.HttpStatus.OK).json({ message: "login success", user, access_token: accessToken, refresh_token: refreshToken });
        }
        catch (error) {
            next(error);
        }
    });
    //retrieve all doctors from db : get 
    // const doctorPage = async(re:Request,res:Response,next:NextFunction) => {
    //   try {
    //       const doctors = await getDoctors(dbDoctorRepository);
    //       return res.status(HttpStatus.OK).json({success:true,doctors})
    //   } catch (error) {
    //       next(error)
    //   }
    // }
    const doctorPage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { searchQuery, department, selectedDate, selectedTimeSlot } = req.query;
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 8;
            const searchQueryStr = searchQuery;
            const departmentStr = department;
            const selectedDateStr = selectedDate;
            const selectedTimeSlotStr = selectedTimeSlot;
            const doctors = yield (0, adminRead_1.getDoctors)({
                searchQuery: searchQueryStr,
                department: departmentStr,
                selectedDate: selectedDateStr,
                selectedTimeSlot: selectedTimeSlotStr,
                page,
                limit,
            }, dbDoctorRepository);
            return res.status(200).json(Object.assign({ success: true }, doctors));
        }
        catch (error) {
            next(error);
        }
    });
    //doctor details : get
    const doctorDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const doctor = yield (0, adminRead_1.getSingleDoctor)(id, dbDoctorRepository);
            return res.status(httpStatus_1.HttpStatus.OK).json({ success: true, doctor });
        }
        catch (error) {
            next(error);
        }
    });
    // get : lists a department by ID.
    const listDepartmentsHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const departments = yield (0, adminDepartment_1.listDepartments)(dbDepartmentRepository);
            return res.status(httpStatus_1.HttpStatus.OK).json({ success: true, departments });
        }
        catch (error) {
            next(error);
        }
    });
    //get : retrieve user profile 
    const userProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.user;
            const user = yield (0, profile_1.getUserProfile)(userId, dbRepositoryUser);
            res.status(200).json({ success: true, user });
        }
        catch (error) {
            next(error);
        }
    });
    //patch : update user profile 
    const updateUserInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.user;
            const updateData = req.body;
            const user = yield (0, profile_1.updateUser)(userId, updateData, dbRepositoryUser);
            res
                .status(200)
                .json({ success: true, user, message: "Profile updated successfully" });
        }
        catch (error) {
            next(error);
        }
    });
    //get : get time slot by doctor Id
    const getTimeslots = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { date } = req.query;
            const timeSlots = yield (0, timeSlot_1.getTimeSlotsByDoctorId)(id, dbTimeSlotRepository);
            res.status(httpStatus_1.HttpStatus.OK).json({ success: true, timeSlots });
        }
        catch (error) {
            next(error);
        }
    });
    //get : get date slot by doctor Id 
    const getDateSlots = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { date } = req.query;
            const dateString = date;
            if (date) {
                // Fetch time slots for a specific date
                const timeSlots = yield (0, timeSlot_1.getTimeSlotsByDoctorIdAndDate)(id, dateString, dbTimeSlotRepository);
                return res.status(httpStatus_1.HttpStatus.OK).json({ success: true, timeSlots });
            }
            else {
                // Fetch all dates
                const dateSlots = yield (0, timeSlot_1.getDateSlotsByDoctorId)(id, dbTimeSlotRepository);
                return res.status(httpStatus_1.HttpStatus.OK).json({ success: true, dateSlots });
            }
        }
        catch (error) {
            next(error);
        }
    });
    /**
     * * METHOD :GET
     * * Retrieve  user wallet
     */
    const getWallet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const getWallet = yield (0, profile_1.getWalletUser)(id, dbRepositoryUser);
            res.status(200).json({ success: true, getWallet });
        }
        catch (error) {
            next(error);
        }
    });
    /**Method Get fetch transactions */
    const getTransactions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.user;
            const transaction = yield (0, profile_1.WalletTransactions)(userId, dbRepositoryUser);
            res.status(200).json({
                success: true,
                transaction,
                message: "Transactions fetched successfully",
            });
        }
        catch (error) {
            next(error);
        }
    });
    /**
   * * METHOD:GET
   * * Get banners for home page
   */
    const getBanners = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const banners = yield (0, adminBanner_1.getAllBanners)({ isActive: true }, adminRepository);
            res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "Banners fetched successfully",
                banners,
            });
        }
        catch (error) {
            next(error);
        }
    });
    /**get Method fetch Prescription */
    const fetchPrescription = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { appoinmentId } = req.body;
            const data = { appoinmentId };
            const response = yield (0, prescriptionUseCase_1.fetchPrescriptionUsecase)(data, dbPrescriptionRepository);
            res.status(httpStatus_1.HttpStatus.OK).json({ sucess: true, response });
        }
        catch (error) {
            next(error);
        }
    });
    // userdetails : get
    const userDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const user = yield (0, profile_1.getUserProfile)(id, dbRepositoryUser);
            return res.status(httpStatus_1.HttpStatus.OK).json({ success: true, user });
        }
        catch (error) {
            next(error);
        }
    });
    return {
        registerUser,
        verifyOtp,
        userLogin,
        resendOtp,
        forgotPassword,
        resetPassword,
        googleSignIn,
        doctorPage,
        doctorDetails,
        listDepartmentsHandler,
        userProfile,
        updateUserInfo,
        getTimeslots,
        getDateSlots,
        getTransactions,
        getWallet,
        getBanners,
        fetchPrescription,
        userDetails
    };
};
exports.default = userController;
