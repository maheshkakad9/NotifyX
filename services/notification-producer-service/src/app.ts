import express from "express";
import cors from "cors";
import notifyRoutes from "./routes/notify.routes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/notify", notifyRoutes);

export default app;
