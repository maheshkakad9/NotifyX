import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/db.js";

const port = process.env.PORT || 4001;

connectDB();
app.listen(port, () => console.log(`Auth Service running on port ${port}`));