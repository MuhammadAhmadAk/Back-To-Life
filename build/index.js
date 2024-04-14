"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./Routes/routes"));
const dbconnect_1 = __importDefault(require("./config/dbconnect"));
const body_parser_1 = __importDefault(require("body-parser"));
const error_handler_1 = require("./middlewares/error_handler");
dotenv_1.default.config();
const PORT = process.env.PORT || 4000;
const app = (0, express_1.default)();
(0, dbconnect_1.default)();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use("/api/v1", routes_1.default);
app.use(error_handler_1.notFound);
app.use(error_handler_1.errorHandler);
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log(`http://192.168.1.14:${PORT}`);
});
