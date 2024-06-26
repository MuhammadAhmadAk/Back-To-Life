"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user_controller");
const auth_middleware_1 = require("../middlewares/auth_middleware");
const authRouter = (0, express_1.Router)();
authRouter.post("/register", user_controller_1.AuthController.createUser);
authRouter.post("/login", user_controller_1.AuthController.login);
authRouter.get("/getAllUsers", auth_middleware_1.authMiddleware, user_controller_1.AuthController.getAllUser);
authRouter.get("/getuserbyId/:id", auth_middleware_1.authMiddleware, user_controller_1.AuthController.getUserbyid);
authRouter.delete("/deleteUserbyId/:id", auth_middleware_1.authMiddleware, auth_middleware_1.isAdmin, user_controller_1.AuthController.deleteUserbyid);
authRouter.put("/updateUserbyId/:id", auth_middleware_1.authMiddleware, user_controller_1.AuthController.updateUserbyId);
exports.default = authRouter;
