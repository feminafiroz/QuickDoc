import express from 'express'
import bookingController from '../../../adapters/bookingController'
import doctorController from '../../../adapters/doctorController'
import { bookingDbRepository } from '../../../app/interfaces/bookingDbRepository'
import { departmentDbRepository } from "../../../app/interfaces/departmentRepositoryInterface"
import { doctorDbRepository } from '../../../app/interfaces/doctorDBRepository'
import { prescriptionDbRepository } from '../../../app/interfaces/prescriptionDbRepository'
import { timeSlotDbRepository } from '../../../app/interfaces/timeSlotDbRepository'
import { userDbRepository } from "../../../app/interfaces/userDbRepository"
import { authServiceInterface } from '../../../app/service-interface/authServiceInterface'
import { bookingRepositoryMongodb } from '../../database/repositories/BookingRepositoryMongodb'
import { departmentRepositoryMongodb } from "../../database/repositories/departmentRepositoryMongodb"
import { doctorRepositoryMongodb } from '../../database/repositories/doctorRepositoryMongodb'
import { prescriptionRepositoryMongodb } from '../../database/repositories/prescriptionRepositoryMongodb'
import { timeSlotRepositoryMongodb } from '../../database/repositories/timeSlotRepositoryMongodb'
import { userRepositoryMongodb } from '../../database/repositories/userRepositoryMongodb'
import { authService } from '../../services/authService'
import { authenticateDoctor } from '../middlewares/authMiddleware'



const doctorRoutes = () => {
    const router = express.Router();
    const controller = doctorController(
        authServiceInterface,
        authService,
        userDbRepository,
        userRepositoryMongodb,
        doctorDbRepository,
        doctorRepositoryMongodb,
        timeSlotDbRepository,
        timeSlotRepositoryMongodb,
        departmentDbRepository,
        bookingDbRepository,
        bookingRepositoryMongodb,
        departmentRepositoryMongodb,
        prescriptionDbRepository,
        prescriptionRepositoryMongodb,
    )

    const _bookingController = bookingController(
        userDbRepository,
        userRepositoryMongodb,
        doctorDbRepository,
        doctorRepositoryMongodb,
        timeSlotDbRepository,
        timeSlotRepositoryMongodb,
        bookingDbRepository,
        bookingRepositoryMongodb,
    )
    console.log("in doc rot")
    router.post('/register',controller.signup);
    router.post('/verify-token/:token',controller.verifyToken);
    router.post("/google_signIn", controller.googleSignIn);
    router.post('/login',controller.login);

    router.get("/profile",authenticateDoctor,controller.doctorProfile);
    router.get('/department/list', controller.listDepartmentsHandler);
    router.patch("/profile/edit",authenticateDoctor,controller.updateDoctorInfo);
    router.get("/status",authenticateDoctor,controller.doctorStatus);

    router.post("/schedule",authenticateDoctor,controller.scheduleTime);
    router.get("/timeslots",authenticateDoctor,controller.getTimeSlots)
    router.delete("/deleteTime/:id",authenticateDoctor,controller.removeTimeSlot)
    router.get("/patients",authenticateDoctor,controller.getPatientList);
    router.get("/patients/:id",authenticateDoctor,controller.getPatientDetails);
    router.get("/user/:id", authenticateDoctor,controller.userDetails);

    router.get("/bookingdetails/:id",authenticateDoctor,_bookingController.getAppoinmentList)
    router.put("/bookingdetails/:id",authenticateDoctor,_bookingController.appoinmentStatus)//bookingid

    router.post("/addPrescription",authenticateDoctor,controller.addPrescription);
    router.get("/prescription/:id",authenticateDoctor,controller.fetchPrescription);
    router.delete("/prescription/:id",authenticateDoctor,controller.deletePrescription);

    

    return router
} 

export default doctorRoutes