"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const patients_routes_1 = __importDefault(require("./patients.routes"));
const rehabcenter_routes_1 = __importDefault(require("./rehabcenter.routes"));
const router = (0, express_1.Router)();
router.use("/user", auth_routes_1.default);
router.use("/pateint", patients_routes_1.default);
router.use("/rehabcenter", rehabcenter_routes_1.default);
exports.default = router;
