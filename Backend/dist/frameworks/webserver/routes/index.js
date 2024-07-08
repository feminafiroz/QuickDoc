"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userRoute_1 = __importDefault(require("./userRoute"));
const doctorRoute_1 = __importDefault(require("./doctorRoute"));
const adminRoute_1 = __importDefault(require("./adminRoute"));
const refreshTokenRoute_1 = __importDefault(require("./refreshTokenRoute"));
const chatRoutes_1 = __importDefault(require("./chatRoutes"));
const routes = (app) => {
    app.use("/api/user", (0, userRoute_1.default)());
    app.use("/api/token", (0, refreshTokenRoute_1.default)());
    app.use("/api/doctor", (0, doctorRoute_1.default)());
    app.use('/api/admin', (0, adminRoute_1.default)());
    app.use("/api/chat", (0, chatRoutes_1.default)());
};
exports.default = routes;
