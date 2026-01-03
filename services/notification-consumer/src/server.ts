import "dotenv/config";
import { connectQueue } from "./config/rabbitmq.js";

console.log("Notification Consumer Service Started...");
connectQueue();