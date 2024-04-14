import mongoose from "mongoose";

export async function connectDatabase() {
    const dburl = process.env.MONGODB_URL;
    if (!dburl) {
        console.log(`MongoDB Url is not define`);
        process.exit(1);

    }
    mongoose.connect(dburl, {}).then(() => {
        console.log(`MongoDB is connected`);
    }).catch((error) => {
        console.log(`Error : ${error}`);
    });
}
export default connectDatabase;