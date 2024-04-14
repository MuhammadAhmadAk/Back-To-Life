"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
async function connectDatabase() {
    const dburl = process.env.MONGODB_URL;
    if (!dburl) {
        console.log(`MongoDB Url is not define`);
        process.exit(1);
    }
    mongoose_1.default.connect(dburl, {}).then(() => {
        console.log(`MongoDB is connected`);
    }).catch((error) => {
        console.log(`Error : ${error}`);
    });
}
exports.connectDatabase = connectDatabase;
exports.default = connectDatabase;
