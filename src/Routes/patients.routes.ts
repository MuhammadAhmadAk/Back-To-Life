import { Router } from "express";
import { authMiddleware, isAdmin } from "../middlewares/auth_middleware";
// import PatientController from "../controllers/patient_controller";
const patientRouter = Router();



// patientRouter.post("/createPatient", authMiddleware, PatientController.createPatientProfile);

export default patientRouter