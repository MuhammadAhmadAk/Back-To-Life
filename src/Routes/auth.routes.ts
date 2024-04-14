import { Router } from "express";
import { AuthController } from "../controllers/user_controller";
import { authMiddleware, isAdmin } from "../middlewares/auth_middleware";
const authRouter = Router();

authRouter.post("/register", AuthController.createUser);
authRouter.post("/login", AuthController.login);
authRouter.get("/getAllUsers", authMiddleware, AuthController.getAllUser);
authRouter.get("/getuserbyId/:id", authMiddleware, AuthController.getUserbyid);
authRouter.delete("/deleteUserbyId/:id", authMiddleware, isAdmin, AuthController.deleteUserbyid);
authRouter.put("/updateUserbyId/:id", authMiddleware, AuthController.updateUserbyId);

export default authRouter;