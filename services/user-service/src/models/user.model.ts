import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: { type: String, unique: true },
        role: { type: String, default: "user" },
        preferences: {
            notifications: { type: Boolean, default: true }
        }
    },
    {timestamps : true}
);

export const User = mongoose.model("User", userSchema);