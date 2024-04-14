"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RehabCenterController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const rehabcenter_model_1 = __importDefault(require("../models/rehabcenter_model"));
class RehabCenterController {
    static createRehabCenter = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const center = req.body;
            const findRehabCenter = await rehabcenter_model_1.default.findOne({ centerName: center.centerName });
            if (!findRehabCenter) {
                const rehabcenter = await rehabcenter_model_1.default.create(center);
                const { _id, ...responseWithoutId } = rehabcenter.toObject();
                res.json({ rehabcenter: responseWithoutId });
            }
            else {
                res.json({
                    messege: "Center is Already registered"
                });
            }
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    });
    static getAllRehabcenters = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const centers = await rehabcenter_model_1.default.find({}, { _id: 0 });
            res.json({ RehabCenters: centers });
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    });
    static getRehabcenterById = (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const { id } = req.params; // Assuming ID is passed as a route parameter
            const center = await rehabcenter_model_1.default.findOne({ id: id }, { _id: 0 });
            if (!center) {
                throw new Error(`Rehab center is Not found`);
            }
            else {
                res.json({ center });
            }
        }
        catch (error) {
            throw new Error(`${error}`);
        }
    });
}
exports.RehabCenterController = RehabCenterController;
