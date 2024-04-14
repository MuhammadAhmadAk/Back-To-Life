import { NextFunction } from 'express';
import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    mobile: string;
    password: string;
    isPasswordMatch(enterPassword: any): Promise<boolean>;
}

const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: `user`

    }
},
    {
        versionKey: false,
        timestamps: { createdAt: true, updatedAt: false },
    }
);

userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password as string, salt);
        next();
    } catch (error) {
        throw new Error(`${error}`);
    }
});

userSchema.methods.isPasswordMatch = async function (enterPassword: any): Promise<boolean> {
    return await bcrypt.compare(enterPassword, this.password);
}

const User = mongoose.model<IUser>('User', userSchema);

export default User;
