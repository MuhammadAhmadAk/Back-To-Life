import express from "express";
import dotenv from "dotenv";
import router from "./Routes/routes";
import connectDatabase from "./config/dbconnect";
import bodyParser from "body-parser";
import { errorHandler, notFound } from "./middlewares/error_handler";
dotenv.config();
const PORT = process.env.PORT || 4000;
const app = express();

connectDatabase();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1", router);
app.use(notFound);
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log(`http://192.168.1.14:${PORT}`);

});

