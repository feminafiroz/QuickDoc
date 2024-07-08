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
exports.doctorRepositoryMongodb = void 0;
const doctor_1 = __importDefault(require("../models/doctor"));
const timeSlots_1 = __importDefault(require("../models/timeSlots"));
const Booking_1 = __importDefault(require("../models/Booking"));
const doctorRepositoryMongodb = () => {
    const getDoctorById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const doc = yield doctor_1.default.findById(id).populate('department').select("-password -isVerified -isApproved -verificationToken").exec();
            return doc;
        }
        catch (error) {
            console.error(`Error fetching doctor with ID ${id}:`, error);
            throw error;
        }
    });
    const getDoctorByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const doctor = yield doctor_1.default.findOne({
            email
        });
        return doctor;
    });
    const addDoctor = (doctorData) => __awaiter(void 0, void 0, void 0, function* () {
        const newDoctor = new doctor_1.default({
            doctorName: doctorData.getDoctorName(),
            email: doctorData.getEmail(),
            password: doctorData.getPassword(),
            verificationToken: doctorData.getVerificationToken()
        });
        return yield newDoctor.save();
    });
    const verifyDoctor = (token) => __awaiter(void 0, void 0, void 0, function* () {
        return yield doctor_1.default.findOneAndUpdate({ verificationToken: token }, { isVerified: true, verificationToken: null });
    });
    const updateDoctorInfo = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
        const doc = yield doctor_1.default.findByIdAndUpdate(id, updateData, { new: true });
        return doc;
    });
    const getDoctorByIdUpdate = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
        return yield doctor_1.default.findByIdAndUpdate(id, { status: status, isApproved: true }).select("-password -isVerified -isApproved -verificationToken");
    });
    const updateDoctorBlock = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
        yield doctor_1.default.findByIdAndUpdate(id, { isBlocked: status });
    });
    const getAllDoctors = () => __awaiter(void 0, void 0, void 0, function* () { return yield doctor_1.default.find({ isVerified: true }); });
    const getDoctorByIdUpdateRejected = (id, status, reason) => __awaiter(void 0, void 0, void 0, function* () { return yield doctor_1.default.findByIdAndUpdate(id, { status: status, isApproved: false, rejectedReason: reason }).select("-password -isVerified -isApproved -verificationToken"); });
    const registerGoogleSignedDoctor = (doctor) => __awaiter(void 0, void 0, void 0, function* () {
        return yield doctor_1.default.create({
            doctorName: doctor.doctorName(),
            email: doctor.email(),
            profileImage: doctor.picture(),
            isVerified: doctor.email_verified(),
        });
    });
    const getAllAppoinments = () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield Booking_1.default.find({
            appoinmentStatus: { $in: ["Booked", "Consulted"] }
        });
        return res;
    });
    const getFilteredDoctors = (_a) => __awaiter(void 0, [_a], void 0, function* ({ searchQuery, department, selectedDate, selectedTimeSlot, page, limit, }) {
        let query = {};
        if (searchQuery) {
            query.doctorName = { $regex: searchQuery, $options: 'i' };
        }
        if (department) {
            query.department = department;
        }
        // Initialize an array to hold doctor IDs matching date and/or time slot criteria
        let doctorIds = [];
        // Find doctor IDs with available time slots on the selected date
        if (selectedDate) {
            const date = new Date(selectedDate);
            const dateFilteredTimeSlots = yield timeSlots_1.default.find({
                date: date,
                available: true,
            }).select('doctorId');
            doctorIds = dateFilteredTimeSlots.map((slot) => slot.doctorId.toString());
            // If no doctor IDs are found for the selected date, return an empty result
            if (doctorIds.length === 0) {
                return { total: 0, doctors: [] };
            }
        }
        // Find doctor IDs with available time slots at the selected time slot
        if (selectedTimeSlot) {
            // Find time slots that match the selected time slot
            const timeFilteredTimeSlots = yield timeSlots_1.default.find({
                available: true,
                slotTime: selectedTimeSlot,
            }).select('doctorId');
            const timeFilteredDoctorIds = timeFilteredTimeSlots.map((slot) => slot.doctorId.toString());
            // Combine doctor IDs if both date and time slot filters are provided
            if (selectedDate) {
                doctorIds = doctorIds.filter(id => timeFilteredDoctorIds.includes(id));
            }
            else {
                doctorIds = timeFilteredDoctorIds;
            }
            // If doctor IDs list becomes empty after filtering by time slot, return an empty result
            if (doctorIds.length === 0) {
                return { total: 0, doctors: [] };
            }
        }
        // Add doctor IDs to the query if there are any filtered by date/time slot
        if (doctorIds.length > 0) {
            query._id = { $in: doctorIds };
        }
        const total = yield doctor_1.default.countDocuments(query);
        const doctors = yield doctor_1.default.find(query)
            .skip((page - 1) * limit)
            .limit(limit);
        return { total, doctors };
    });
    return {
        getDoctorById,
        getDoctorByEmail,
        addDoctor,
        verifyDoctor,
        updateDoctorInfo,
        getDoctorByIdUpdate,
        updateDoctorBlock,
        getAllDoctors,
        registerGoogleSignedDoctor,
        getDoctorByIdUpdateRejected,
        getFilteredDoctors,
        getAllAppoinments
    };
};
exports.doctorRepositoryMongodb = doctorRepositoryMongodb;
