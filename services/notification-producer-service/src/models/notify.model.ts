import mongoose from "mongoose";

const notifySchema = new mongoose.Schema(
    {
        userId: String,
        type: {
            type: String,
            enum: ["email","sms","push"],
            required: true
        },
        content: String,
        status: {
            type: String,
            default: "queued"
        }
    },
    { timestamps: true }
);

export const Notification = mongoose.model("Notification", notifySchema);