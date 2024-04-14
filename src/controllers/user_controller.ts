import { Request, Response } from "express"
import User, { IUser } from "../models/user_model";
import asyncHandler from "express-async-handler";
import { generateToken } from "../config/jwt_token";


export class AuthController {
    static createUser = asyncHandler(async (req: Request, res: Response) => {
        const user: IUser = req.body;
        const findUser = await User.findOne({ email: user.email, });
        if (!findUser) {
            const newUser = await User.create(req.body);
            res.json(
                {
                    success: true,
                    data: newUser
                });
        } else {
            throw new Error("User Already Exist")
        }
    });

    static login = asyncHandler(async (req: Request, res: Response) => {
        const user: IUser = req.body;
        const findUser = await User.findOne({ email: user.email });
        console.log(`${user.email}  : ${user.password}`);
        if (findUser && await findUser.isPasswordMatch(user.password)) {
            res.json({
                id: findUser._id,
                name: findUser.name,
                email: findUser.email,
                mobile: findUser.mobile,
                jwtToken: generateToken(findUser._id)
            });
        } else {
            throw new Error(`Invalid Credentials`);
        }
    });
    static getAllUser = asyncHandler(async (req: Request, res: Response) => {
        try {
            const getUsers = await User.find();
            const totalusers = await User.countDocuments();
            res.json({ data: getUsers, totalUsers: totalusers });

        } catch (error) {
            throw new Error(`${error}`);
        }
    });
    static getUserbyid = asyncHandler(async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const user = await User.findById(id);
            res.json({ data: user });
        } catch (error) {
            throw new Error(`${error}`);
        }


    });
    static deleteUserbyid = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const deleteduser = await User.findByIdAndDelete(id);
            if (deleteduser == null) {
                res.json({
                    messege: "User Not Found",
                });
            } else {
                res.json({
                    success: true,
                    messege: "User Deleted Successfull",
                });
            }

        } catch (error) {
            throw new Error(`${error}`);
        }


    });
    static updateUserbyId = asyncHandler(async (req: Request, res: Response) => {
        const { id } = req.params;
        try {
            const updateUser = await User.findByIdAndUpdate(id, {
                name: req.body.name,
                email: req.body.email,
                mobile: req.body.mobile,
                problems: req.body.problems

            },
                {
                    new: true
                }
            );
            res.json(updateUser);

        } catch (error) {
            throw new Error(`${error}`);
        }

    });

}

