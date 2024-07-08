"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const server_1 = __importDefault(require("./frameworks/webserver/server"));
const routes_1 = __importDefault(require("./frameworks/webserver/routes"));
const connection_1 = __importDefault(require("./frameworks/database/connection"));
const expressConfig_1 = __importDefault(require("./frameworks/webserver/expressConfig"));
const errorhandleMiddleware_1 = __importDefault(require("./frameworks/webserver/middlewares/errorhandleMiddleware"));
const socket_io_1 = require("socket.io");
const socket_1 = __importDefault(require("./frameworks/webserver/webSocket/socket"));
const customError_1 = __importDefault(require("./utils/customError"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: true,
        methods: ["GET", "POST"],
        credentials: true,
    },
});
app.use(express_1.default.static(path_1.default.join(__dirname, "../../Frontend/dist")));
(0, socket_1.default)(io);
(0, expressConfig_1.default)(app);
(0, connection_1.default)();
(0, routes_1.default)(app);
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../../Frontend/dist/index.html"));
});
(0, server_1.default)(server).startServer();
app.use(errorhandleMiddleware_1.default);
app.all("*", (req, res, next) => {
    next(new customError_1.default(`Not found : ${req.url}`, 404));
});
