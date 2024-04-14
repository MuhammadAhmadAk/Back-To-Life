"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rehab_center_controller_1 = require("../controllers/rehab_center_controller");
const rehabRouter = (0, express_1.Router)();
rehabRouter.post("/createRehabCenter", rehab_center_controller_1.RehabCenterController.createRehabCenter);
rehabRouter.get("/getAllRehabCenter", rehab_center_controller_1.RehabCenterController.getAllRehabcenters);
rehabRouter.get("/getRehabCenter/:id", rehab_center_controller_1.RehabCenterController.getRehabcenterById);
exports.default = rehabRouter;
