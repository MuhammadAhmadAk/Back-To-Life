"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const user_model_1 = __importDefault(require("../models/user_model"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const jwt_token_1 = require("../config/jwt_token");
class AuthController {
    static createUser = (0, express_async_handler_1.default)(async (req, res) => {
        const user = req.body;
        const findUser = await user_model_1.default.findOne({ email: user.email, });
        if (!findUser) {
            const newUser = await user_model_1.default.create(req.body);
            res.json({
                success: true,
                data: newUser
            });
        }
        else {
            throw new Error("User Already Exist");
        }
    });
    static login = (0, express_async_handler_1.default)(async (req, res) => {
        const user = req.body;
        const findUser = await user_model_1.default.findOne({ email: user.email });
        console.log(`${user.email}  : ${user.password}`);
        if (findUser && await findUser.isPasswordMatch(user.password)) {
            res.json({
                id: findUser._id,
                name: findUser.name,
                email: findUser.email,
                mobile: findUser.mobile,
                jwtToken: (0, jwt_token_1.generateToken)(findUser._id)
            });
        }
        else {
            throw new Error(`Invalid Credentials`);
        }
    });
    static getAllUser = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const getUsers = await user_model_1.default.find();
            const totalusers = await user_model_1.default.countDocuments();
            res.json({ data: getUsers, totalUsers: totalusers });
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    });
    static getUserbyid = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const { id } = req.params;
            const user = await user_model_1.default.findById(id);
            res.json({ data: user });
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    });
    static deleteUserbyid = (0, express_async_handler_1.default)(async (req, res) => {
        const { id } = req.params;
        try {
            const deleteduser = await user_model_1.default.findByIdAndDelete(id);
            if (deleteduser == null) {
                res.json({
                    messege: "User Not Found",
                });
            }
            else {
                res.json({
                    success: true,
                    messege: "User Deleted Successfull",
                });
            }
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    });
    static updateUserbyId = (0, express_async_handler_1.default)(async (req, res) => {
        const { id } = req.params;
        try {
            const updateUser = await user_model_1.default.findByIdAndUpdate(id, {
                name: req.body.name,
                email: req.body.email,
                mobile: req.body.mobile,
                problems: req.body.problems
            }, {
                new: true
            });
            res.json(updateUser);
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    });
}
exports.AuthController = AuthController;
