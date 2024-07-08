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
exports.prescriptionDbRepository = void 0;
const prescriptionDbRepository = (repository) => {
    const addPrescription = (data) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.addPrescriptions(data); });
    const fetchPrescription = (data) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.fetPrescriptions(data); });
    const fetchPrescriptionDoctor = (data) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.fetchPrescriptionlist(data); });
    const deletePrescriptionDetails = (prescriptionId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.deletePrescriptionDetail(prescriptionId); });
    return {
        addPrescription,
        fetchPrescription,
        fetchPrescriptionDoctor,
        deletePrescriptionDetails,
    };
};
exports.prescriptionDbRepository = prescriptionDbRepository;
