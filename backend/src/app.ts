import express from "express";
import healthRoute from "./routes/health.route";
import userRoutes from "./routes/user.routes";

const app = express();

app.use(express.json());

app.use(healthRoute);

app.use("/users", userRoutes);

export default app;
