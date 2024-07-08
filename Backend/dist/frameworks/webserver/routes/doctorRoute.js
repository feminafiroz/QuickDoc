"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookingController_1 = __importDefault(require("../../../adapters/bookingController"));
const doctorController_1 = __importDefault(require("../../../adapters/doctorController"));
const bookingDbRepository_1 = require("../../../app/interfaces/bookingDbRepository");
const departmentRepositoryInterface_1 = require("../../../app/interfaces/departmentRepositoryInterface");
const doctorDBRepository_1 = require("../../../app/interfaces/doctorDBRepository");
const prescriptionDbRepository_1 = require("../../../app/interfaces/prescriptionDbRepository");
const timeSlotDbRepository_1 = require("../../../app/interfaces/timeSlotDbRepository");
const userDbRepository_1 = require("../../../app/interfaces/userDbRepository");
const authServiceInterface_1 = require("../../../app/service-interface/authServiceInterface");
const BookingRepositoryMongodb_1 = require("../../database/repositories/BookingRepositoryMongodb");
const departmentRepositoryMongodb_1 = require("../../database/repositories/departmentRepositoryMongodb");
const doctorRepositoryMongodb_1 = require("../../database/repositories/doctorRepositoryMongodb");
const prescriptionRepositoryMongodb_1 = require("../../database/repositories/prescriptionRepositoryMongodb");
const timeSlotRepositoryMongodb_1 = require("../../database/repositories/timeSlotRepositoryMongodb");
const userRepositoryMongodb_1 = require("../../database/repositories/userRepositoryMongodb");
const authService_1 = require("../../services/authService");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const doctorRoutes = () => {
    const router = express_1.default.Router();
    const controller = (0, doctorController_1.default)(authServiceInterface_1.authServiceInterface, authService_1.authService, userDbRepository_1.userDbRepository, userRepositoryMongodb_1.userRepositoryMongodb, doctorDBRepository_1.doctorDbRepository, doctorRepositoryMongodb_1.doctorRepositoryMongodb, timeSlotDbRepository_1.timeSlotDbRepository, timeSlotRepositoryMongodb_1.timeSlotRepositoryMongodb, departmentRepositoryInterface_1.departmentDbRepository, bookingDbRepository_1.bookingDbRepository, BookingRepositoryMongodb_1.bookingRepositoryMongodb, departmentRepositoryMongodb_1.departmentRepositoryMongodb, prescriptionDbRepository_1.prescriptionDbRepository, prescriptionRepositoryMongodb_1.prescriptionRepositoryMongodb);
    const _bookingController = (0, bookingController_1.default)(userDbRepository_1.userDbRepository, userRepositoryMongodb_1.userRepositoryMongodb, doctorDBRepository_1.doctorDbRepository, doctorRepositoryMongodb_1.doctorRepositoryMongodb, timeSlotDbRepository_1.timeSlotDbRepository, timeSlotRepositoryMongodb_1.timeSlotRepositoryMongodb, bookingDbRepository_1.bookingDbRepository, BookingRepositoryMongodb_1.bookingRepositoryMongodb);
    router.post('/register', controller.signup);
    router.post('/verify-token/:token', controller.verifyToken);
    router.post("/google_signIn", controller.googleSignIn);
    router.post('/login', controller.login);
    router.get("/profile", authMiddleware_1.authenticateDoctor, controller.doctorProfile);
    router.get('/department/list', controller.listDepartmentsHandler);
    router.patch("/profile/edit", authMiddleware_1.authenticateDoctor, controller.updateDoctorInfo);
    router.get("/status", authMiddleware_1.authenticateDoctor, controller.doctorStatus);
    router.post("/schedule", authMiddleware_1.authenticateDoctor, controller.scheduleTime);
    router.get("/timeslots", authMiddleware_1.authenticateDoctor, controller.getTimeSlots);
    router.delete("/deleteTime/:id", authMiddleware_1.authenticateDoctor, controller.removeTimeSlot);
    router.get("/patients", authMiddleware_1.authenticateDoctor, controller.getPatientList);
    router.get("/patients/:id", authMiddleware_1.authenticateDoctor, controller.getPatientDetails);
    router.get("/user/:id", authMiddleware_1.authenticateDoctor, controller.userDetails);
    router.get("/bookingdetails/:id", authMiddleware_1.authenticateDoctor, _bookingController.getAppoinmentList);
    router.put("/bookingdetails/:id", authMiddleware_1.authenticateDoctor, _bookingController.appoinmentStatus); //bookingid
    router.post("/addPrescription", authMiddleware_1.authenticateDoctor, controller.addPrescription);
    router.get("/prescription/:id", authMiddleware_1.authenticateDoctor, controller.fetchPrescription);
    router.delete("/prescription/:id", authMiddleware_1.authenticateDoctor, controller.deletePrescription);
    return router;
};
exports.default = doctorRoutes;
