import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import jugadoresRoutes from "./routes/jugadores.routes.js";
import partidosRoutes from "./routes/partidos.routes.js";
import lesionesRoutes from "./routes/lesiones.routes.js";
import estadisticasRoutes from "./routes/estadisticas.routes.js";
dotenv.config();

const server = express();

server.use(cors("*"));
server.use(morgan("dev"));
server.use(express.json());

// Health check endpoint para Render
server.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

server.use("/api/auth", authRoutes);
server.use("/api/jugadores", jugadoresRoutes);
server.use("/api/partidos", partidosRoutes);
server.use("/api/lesiones", lesionesRoutes);
server.use("/api/estadisticas", estadisticasRoutes);

export default server;
