"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.googleSignInUserEntity = void 0;
function doctorEntity(doctorName, email, phoneNumber, passsword, verification) {
    return {
        getDoctorName: () => doctorName,
        getEmail: () => email,
        getphoneNumber: () => phoneNumber,
        getPassword: () => passsword,
        getVerificationToken: () => verification
    };
}
exports.default = doctorEntity;
function googleSignInUserEntity(name, email, picture, email_verified) {
    return {
        doctorName: () => name,
        email: () => email,
        picture: () => picture,
        email_verified: () => email_verified,
    };
}
exports.googleSignInUserEntity = googleSignInUserEntity;
