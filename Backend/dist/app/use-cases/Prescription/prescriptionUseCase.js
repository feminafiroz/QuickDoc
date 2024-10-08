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
exports.deletePrescriptionData = exports.fetchPrescriptionForDoctor = exports.fetchPrescriptionUsecase = exports.addPrescriptionToUser = void 0;
const addPrescriptionToUser = (data, dbPrescriptionRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield dbPrescriptionRepository.addPrescription(data);
    return response;
});
exports.addPrescriptionToUser = addPrescriptionToUser;
const fetchPrescriptionUsecase = (data, dbPrescriptionRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield dbPrescriptionRepository.fetchPrescription(data);
    return response;
});
exports.fetchPrescriptionUsecase = fetchPrescriptionUsecase;
const fetchPrescriptionForDoctor = (data, dbPrescriptionRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield dbPrescriptionRepository.fetchPrescriptionDoctor(data);
    return response;
});
exports.fetchPrescriptionForDoctor = fetchPrescriptionForDoctor;
const deletePrescriptionData = (prescriptionId, dbPrescriptionRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield dbPrescriptionRepository.deletePrescriptionDetails(prescriptionId);
    return response;
});
exports.deletePrescriptionData = deletePrescriptionData;
