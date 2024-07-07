import { Router } from "express";
import adminController from "../../../adapters/adminController";
import reviewController from "../../../adapters/reviewController";
import adminDbRepository from "../../../app/interfaces/AdminDbRepository";
import { departmentDbRepository } from "../../../app/interfaces/departmentRepositoryInterface";
import { doctorDbRepository } from "../../../app/interfaces/doctorDBRepository";
import { reviewDbRepository } from "../../../app/interfaces/reviewDbRepository";
import { userDbRepository } from "../../../app/interfaces/userDbRepository";
import { authServiceInterface } from "../../../app/service-interface/authServiceInterface";
import { adminRepositoryMongodb } from "../../database/repositories/AdminRepositoryMongodb";
import { departmentRepositoryMongodb } from "../../database/repositories/departmentRepositoryMongodb";
import { doctorRepositoryMongodb } from "../../database/repositories/doctorRepositoryMongodb";
import { reviewRepositoryMongodb } from "../../database/repositories/reviewRepositoryMongodb";
import { userRepositoryMongodb } from "../../database/repositories/userRepositoryMongodb";
import { authService } from "../../services/authService";
import { authenticateAdmin } from "../middlewares/authMiddleware";



export default () => {
    const router = Router ();

    const controller = adminController(
        authServiceInterface,
        authService,
        userDbRepository,
        userRepositoryMongodb,
        doctorDbRepository,
        doctorRepositoryMongodb,
        adminDbRepository,
        adminRepositoryMongodb,
        departmentDbRepository,
        departmentRepositoryMongodb,
    );

    const _reviewController = reviewController(
      reviewDbRepository,
      reviewRepositoryMongodb
  );

    router.post('/login',controller.adminLogin)
    router.get("/users",authenticateAdmin, controller.getAllUser);
    router.patch("/block_user/:id",authenticateAdmin, controller.userBlock);
    router.get("/doctors",authenticateAdmin, controller.getAllDoctors);
    router.patch("/block_doctor/:id",authenticateAdmin, controller.doctorBlock);
    router.get("/doctors/:id",authenticateAdmin, controller.doctorDetails);
    router.patch("/update_doctor/:id",authenticateAdmin, controller.updateDoctor);
    router.patch("/verify_doctor_rejection/:id",authenticateAdmin,controller.rejectionDoctor);
    router.get("/appoinments",authenticateAdmin, controller.getAllAppoinments);


    // departmentManagement--- 
    router.get('/department',authenticateAdmin, controller.getAllDepartmentsHandler);
    router.post('/addDepartment',authenticateAdmin, controller.addDepartmentHandler);
    router.get('/department/list',authenticateAdmin, controller.listDepartmentsHandler);
    // router.get('/department/unList/:id',authenticateAdmin, controller.unlistDepartmentsHandler);
    router.put('/editDepartment/:id',authenticateAdmin, controller.updateDepartmentHandler);
    router.patch('/block_department/:id',authenticateAdmin, controller.blockDepartmentHandler);
    router.patch('/unblock_department/:id',authenticateAdmin, controller.unblockDepartmentHandler);
    router.get("/banners",authenticateAdmin, controller.getBanners);
    router.post("/banners/add",authenticateAdmin, controller.addNewBanner);
    router.patch("/banners/edit/:bannerId",authenticateAdmin,controller.updateBanner);
    router.delete("/banners/remove/:bannerId",authenticateAdmin,controller.removBanner);

    router.get('/getallreviews',authenticateAdmin, _reviewController.getAllTheReviewsHandler);
    router.delete("/reviews/remove/:reviewId",authenticateAdmin,_reviewController.removeReviewHandler);

    
    return router
}