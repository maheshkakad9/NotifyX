import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI!);
        console.log("Producer DB Connected");
    } catch (err) {
        console.log("Failed to connect DB", err);
        process.exit(1);
    }
};