import asyncHandler from 'express-async-handler';
import { Response, Request, NextFunction } from 'express';
import RehabCenter, { IRehabCenter } from '../models/rehabcenter_model';
import validateId from '../Utils/validate_id';

export class RehabCenterController {
    static createRehabCenter = asyncHandler(async (req: Request, res: Response) => {
        try {
            const center: IRehabCenter = req.body;
            const findRehabCenter = await RehabCenter.findOne({ centerName: center.centerName });
            if (!findRehabCenter) {
                const rehabcenter: IRehabCenter = await RehabCenter.create(center);
                const { _id, ...responseWithoutId } = rehabcenter.toObject();
                res.json({ rehabcenter: responseWithoutId })
            } else {
                res.json({
                    messege: "Center is Already registered"
                })
            }

        } catch (error) {
            throw new Error(`${error}`)
        }
    });

    static getAllRehabcenters = asyncHandler(async (req: Request, res: Response) => {
        try {
            const centers = await RehabCenter.find({}, { _id: 0 });
            res.json({ RehabCenters: centers });
        } catch (error) {
            throw new Error(`${error}`);
        }
    });

    static getRehabcenterById = asyncHandler(async (req: Request, res: Response) => {
        try {
            const { id } = req.params; // Assuming ID is passed as a route parameter
            const center = await RehabCenter.findOne({ id: id }, { _id: 0 });
            if (!center) {
                res.status(404).json({ message: `Rehab center is Not found` });
            } else {
                res.json({ center });
            }
        } catch (error) {
            throw new Error(`${error}`);
        }
    });

    static updateRehabcenterbyid = asyncHandler(async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const updateRehabcenter = await RehabCenter.findOneAndUpdate({ id: id }, req.body, {
                new: true,
                select: '-_id'
            });

            res.json({ rehabcenter: updateRehabcenter });

        } catch (error) {
            throw new Error(`${error}`);
        }
    });
    static deleteRehabcenterbyid = asyncHandler(async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const center = await RehabCenter.findOneAndDelete({ id: id });
            res.json({
                status: true,
                message: "center Deleted Successfully",
                rehab_center: center

            })
        } catch (error) {
            throw new Error(`${error}`);
        }
    });
}