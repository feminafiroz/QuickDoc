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
const MailService_1 = __importDefault(require("../frameworks/services/MailService"));
const sentMail = (email, emailSubject, content) => __awaiter(void 0, void 0, void 0, function* () {
    // send mail with defined transport object
    try {
        const info = yield MailService_1.default.sendMail({
            from: '"QUICK DOC" <quickdoc@gmail.com>',
            to: email,
            subject: emailSubject,
            html: content,
        });
        console.log(`Email sent to ${email} : `, info.messageId);
    }
    catch (error) {
        console.log("Error in sending mail:", error);
    }
});
exports.default = sentMail;
