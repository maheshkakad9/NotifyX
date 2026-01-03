import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log("Auth service DB Connected");
    } catch (err) {
        console.error("DB Connection Failed",err);
        process.exit(1);
    }
};