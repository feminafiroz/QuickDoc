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
exports.getSingleUser = exports.getPatientFullDetails = exports.getPatients = void 0;
const getPatients = (bookingDbRepository) => __awaiter(void 0, void 0, void 0, function* () { return yield bookingDbRepository.getAllPatients(); });
exports.getPatients = getPatients;
const getPatientFullDetails = (id, bookingDbRepository) => __awaiter(void 0, void 0, void 0, function* () { return yield bookingDbRepository.getSinglePatient(id); });
exports.getPatientFullDetails = getPatientFullDetails;
const getSingleUser = (id, userDbRepository) => __awaiter(void 0, void 0, void 0, function* () { return yield userDbRepository.getUserbyId(id); });
exports.getSingleUser = getSingleUser;
