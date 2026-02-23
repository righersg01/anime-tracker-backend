import express from "express";
import healthRoute from "./routes/health.route";
import userRoutes from "./routes/user.routes";
import animeRoutes from "./routes/anime.routes";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(express.json());

app.use(healthRoute);

app.use("/users", userRoutes);

app.use("/animes", animeRoutes);

app.use("/auth", authRoutes);

export default app;
