import express from "express";
import healthRoute from "./routes/health.route";
import userRoutes from "./routes/user.routes";
import animeRoutes from "./routes/anime.routes";
import authRoutes from "./routes/auth.routes";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: "http://localhost:8080",
    credentials: true,
  }),
);

app.use(express.json());

app.use(healthRoute);

app.use("/users", userRoutes);

app.use("/animes", animeRoutes);

app.use("/auth", authRoutes);

export default app;
