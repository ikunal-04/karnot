import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dataBaseConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "");
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Database connection failed", error);
    }
}

export default dataBaseConnection;