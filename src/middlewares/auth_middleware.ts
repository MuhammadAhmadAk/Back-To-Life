import User, { IUser } from "../models/user_model";
import jwt from "jsonwebtoken";
import asyncHandler from 'express-async-handler';
import { Response, Request, NextFunction } from "express";

export const authMiddleware = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    let token;
    if (req.headers.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        try {
            if (token) {
                const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
                const user = await User.findById(decoded?.id);
                req.body.user = user;
                next();

            }

        } catch (error) {
            throw new Error(`Not Authorized token expire.Please login again`);
        }

    }
    else {
        throw new Error(`there is not token attact to header`);
    }
})

export const isAdmin = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;

    try {
        if (!user) {
            throw new Error("User not found");
        }

        console.log(user.role);

        if (user.role !== "admin") {
            throw new Error("You are not an admin");
        } else {
            next();
        }
    } catch (error) {
        console.error(error);
        throw new Error(`${error}`);
    }
});
