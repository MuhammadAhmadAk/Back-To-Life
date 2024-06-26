import { Router } from "express";
import { authMiddleware, isAdmin } from "../middlewares/auth_middleware";
import { RehabCenterController } from '../controllers/rehab_center_controller';

const rehabRouter = Router();
rehabRouter.post("/createRehabCenter", RehabCenterController.createRehabCenter);
rehabRouter.get("/getAllRehabCenter", RehabCenterController.getAllRehabcenters);
rehabRouter.get("/getRehabCenter/:id", RehabCenterController.getRehabcenterById);
rehabRouter.put("/updateRehabCenter/:id", RehabCenterController.updateRehabcenterbyid);
rehabRouter.delete("/deleteRehabCenter/:id", RehabCenterController.deleteRehabcenterbyid);

export default rehabRouter;