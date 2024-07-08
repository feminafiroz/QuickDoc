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
const adminDepartment_1 = require("../app/use-cases/Admin/adminDepartment");
const Profile_1 = require("../app/use-cases/Doctor/ReadnUpdate/Profile");
const authDoctor_1 = require("../app/use-cases/Doctor/authDoctor");
const doctorRead_1 = require("../app/use-cases/Doctor/doctorRead");
const timeSlot_1 = require("../app/use-cases/Doctor/timeSlot");
const prescriptionUseCase_1 = require("../app/use-cases/Prescription/prescriptionUseCase");
const httpStatus_1 = require("../types/httpStatus");
const doctorController = (authServiceInterface, authServiceImpl, userDbRepository, userRepositoryImpl, doctorDbRepository, doctorDbRepositoryImpl, timeSlotDbRepository, timeSlotDbRepositoryImpl, departmentDbRepository, bookingDbRepository, bookingDbRepositoryImpl, departmentDbRepositoryImpl, prescriptionDbRepository, prescriptionDbRepositoryImpl) => {
    const authService = authServiceInterface(authServiceImpl());
    const dbRepositoryUser = userDbRepository(userRepositoryImpl());
    const dbRepositoryDoctor = doctorDbRepository(doctorDbRepositoryImpl());
    const dbTimeSlotRepository = timeSlotDbRepository(timeSlotDbRepositoryImpl());
    const dbDepartmentRepository = departmentDbRepository(departmentDbRepositoryImpl());
    const dbBookingRepository = bookingDbRepository(bookingDbRepositoryImpl());
    const dbPrescriptionRepository = prescriptionDbRepository(prescriptionDbRepositoryImpl());
    //doctor signup - post
    const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const doctordata = req.body;
            const registerDoctor = yield (0, authDoctor_1.addNewDoctor)(doctordata, dbRepositoryDoctor, authService);
            if (registerDoctor) {
                return res.status(httpStatus_1.HttpStatus.OK).json({
                    success: true,
                    message: "Registration success, please verify your email that we sent to your mail",
                });
            }
        }
        catch (error) {
            next(error);
        }
    });
    //verify ac - post
    const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { token } = req.params;
            const verifying = yield (0, authDoctor_1.verifyAccount)(token, dbRepositoryDoctor);
            if (verifying) {
                return res.status(httpStatus_1.HttpStatus.OK).json({
                    success: true,
                    message: "Account is verified ,go n login",
                });
            }
        }
        catch (error) {
            next(error);
        }
    });
    // doctor login - post
    const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            // Assuming doctorLogin, dbRepositoryDoctor, and authService are defined elsewhere
            const { accessToken, refreshToken, isEmailExist } = yield (0, authDoctor_1.doctorLogin)(email, password, dbRepositoryDoctor, authService);
            return res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "Login successful",
                doctor: isEmailExist,
                access_token: accessToken,
                refresh_token: refreshToken,
            });
        }
        catch (error) {
            next(error);
        }
    });
    //google authen - post
    const googleSignIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const doctorData = req.body.doctor;
            const { accessToken, refreshToken, isEmailExist, createdUser } = yield (0, authDoctor_1.authenticateGoogleSignInDoctor)(doctorData, dbRepositoryDoctor, authService);
            const user = isEmailExist ? isEmailExist : createdUser;
            res
                .status(httpStatus_1.HttpStatus.OK)
                .json({ message: "login success",
                user,
                access_token: accessToken,
                refresh_token: refreshToken });
        }
        catch (error) {
            next(error);
        }
    });
    //doctor profile - get
    const doctorProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const doctorId = req.doctor;
            const doctor = yield (0, Profile_1.getDoctorProfile)(doctorId, dbRepositoryDoctor);
            res.status(200).json({ success: true, doctor });
        }
        catch (error) {
            next(error);
        }
    });
    /*
    * * METHOD :patch
    * update doctor profile.
    */
    const updateDoctorInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const doctorId = req.doctor;
            const updateData = req.body;
            const doctor = yield (0, Profile_1.updateDoctor)(doctorId, updateData, dbRepositoryDoctor);
            res
                .status(200)
                .json({ success: true, doctor, message: "KYC updated successfully" });
        }
        catch (error) {
            next(error);
        }
    });
    /*
     * * METHOD :GET
     * retrieve doctor status.
     */
    const doctorStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const doctorId = req.doctor;
            const doctor = yield (0, Profile_1.getDoctorProfile)(doctorId, dbRepositoryDoctor);
            res.status(200).json({ success: true, doctor });
        }
        catch (error) {
            next(error);
        }
    });
    /*
    * * METHOD :GET
    * lists a department by ID.
    */
    const listDepartmentsHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const departments = yield (0, adminDepartment_1.listDepartments)(dbDepartmentRepository);
            return res.status(httpStatus_1.HttpStatus.OK).json({ success: true, departments });
        }
        catch (error) {
            next(error);
        }
    });
    /*
    * * METHOD :POST
    * adding a time slot
    */
    const scheduleTime = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const doctorId = req.doctor;
            const { slotTime, date } = req.body; // Destructure time and date from req.body
            const newTimeSlot = yield (0, timeSlot_1.addTimeSlot)(doctorId, {
                slotTime, date,
                isAvailable: true,
            }, // Pass time and date as an object
            dbTimeSlotRepository);
            res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "Time slot added successfully",
                newTimeSlot,
            });
        }
        catch (error) {
            next(error);
        }
    });
    /*
   * * METHOD :GET
   * return all time slot to the doctor
   */
    const getTimeSlots = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const doctorId = req.doctor;
            // const { date } = req.params; 
            const timeSlots = yield (0, timeSlot_1.getTimeSlotsByDoctorId)(doctorId, 
            // date,
            dbTimeSlotRepository);
            res.status(httpStatus_1.HttpStatus.OK).json({ success: true, timeSlots });
        }
        catch (error) {
            next(error);
        }
    });
    /*
 * * METHOD :DELETE
 * removing the timeslot to the doctor
 */
    const removeTimeSlot = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            yield (0, timeSlot_1.deleteTimeSlot)(id, dbTimeSlotRepository);
            res
                .status(httpStatus_1.HttpStatus.OK)
                .json({ success: true, message: "Slot deleted successfully" });
        }
        catch (error) {
            next(error);
        }
    });
    /*
 * * METHOD :GET
 * get the paitent list to the doctor
 */
    const getPatientList = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const patients = yield (0, doctorRead_1.getPatients)(dbBookingRepository);
            return res.status(httpStatus_1.HttpStatus.OK).json({ success: true, patients });
        }
        catch (error) {
            next(error);
        }
    });
    /*
     * * METHOD :GET
     * get the one paitent detail to the doctor
     */
    const getPatientDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const patient = yield (0, doctorRead_1.getPatientFullDetails)(id, dbBookingRepository);
            return res.status(httpStatus_1.HttpStatus.OK).json({ success: true, patient });
        }
        catch (error) {
            next(error);
        }
    });
    /*
* * METHOD :GET
* get the user details to the doctor
*/
    const userDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const user = yield (0, doctorRead_1.getSingleUser)(id, dbRepositoryUser);
            return res.status(httpStatus_1.HttpStatus.OK).json({ success: true, user });
        }
        catch (error) {
            next(error);
        }
    });
    /* method post - add prescription */
    const addPrescription = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { appointmentId, prescriptionDate, medicines } = req.body;
            const data = { appointmentId, prescriptionDate, medicines };
            const response = yield (0, prescriptionUseCase_1.addPrescriptionToUser)(data, dbPrescriptionRepository);
            res
                .status(httpStatus_1.HttpStatus.OK)
                .json({ success: true, message: "add Prescription successfully", response });
        }
        catch (error) {
            next(error);
        }
    });
    /**get Method fetch Prescription */
    const fetchPrescription = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const data = id;
            const response = yield (0, prescriptionUseCase_1.fetchPrescriptionForDoctor)(data, dbPrescriptionRepository);
            res.status(httpStatus_1.HttpStatus.OK).json({ sucess: true, response });
        }
        catch (error) {
            next(error);
        }
    });
    /**method delete - delete prescription */
    const deletePrescription = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const prescriptionId = req.params.id;
            const response = yield (0, prescriptionUseCase_1.deletePrescriptionData)(prescriptionId, dbPrescriptionRepository);
            res.status(httpStatus_1.HttpStatus.OK).json({ sucess: true, response });
        }
        catch (error) {
            next(error);
        }
    });
    return {
        signup,
        verifyToken,
        googleSignIn,
        login,
        doctorProfile,
        updateDoctorInfo,
        doctorStatus,
        listDepartmentsHandler,
        scheduleTime,
        getTimeSlots,
        removeTimeSlot,
        getPatientList,
        getPatientDetails,
        userDetails,
        addPrescription,
        deletePrescription,
        fetchPrescription,
    };
};
exports.default = doctorController;
