import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./config/db.js";
import { connectQueue } from "./config/rabbitmq.js";

const port = process.env.PORT || 4003;

(async () => {
    await connectDB();
    connectQueue();
    app.listen(port, () => console.log(`Notification Producer running on port ${port}`));
})();