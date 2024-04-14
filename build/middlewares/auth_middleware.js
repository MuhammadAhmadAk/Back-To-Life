"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.authMiddleware = void 0;
const user_model_1 = __importDefault(require("../models/user_model"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.authMiddleware = (0, express_async_handler_1.default)(async (req, res, next) => {
    let token;
    if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        try {
            if (token) {
                const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                const user = await user_model_1.default.findById(decoded?.id);
                req.body.user = user;
                next();
            }
        }
        catch (error) {
            throw new Error(`Not Authorized token expire.Please login again`);
        }
    }
    else {
        throw new Error(`there is not token attact to header`);
    }
});
exports.isAdmin = (0, express_async_handler_1.default)(async (req, res, next) => {
    const { user } = req.body;
    try {
        if (!user) {
            throw new Error("User not found");
        }
        console.log(user.role);
        if (user.role !== "admin") {
            throw new Error("You are not an admin");
        }
        else {
            next();
        }
    }
    catch (error) {
        console.error(error);
        throw new Error(`${error}`);
    }
});
