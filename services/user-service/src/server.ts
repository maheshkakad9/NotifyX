import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { redis } from "./config/redis.js";

const port = process.env.PORT || 4002;

connectDB();
app.listen(port, () => console.log(`User Service running on port ${port}`));