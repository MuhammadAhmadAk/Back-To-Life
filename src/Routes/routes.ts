import { Router } from "express";
import authRouter from "./auth.routes";
import patientRouter from "./patients.routes";
import rehabRouter from "./rehabcenter.routes";


const router = Router();
router.use("/user", authRouter);
router.use("/pateint", patientRouter)
router.use("/rehabcenter", rehabRouter)

export default router;