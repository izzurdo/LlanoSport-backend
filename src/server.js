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

// Configuración de CORS
const corsOptions = {
  origin: function (origin, callback) {
    // Permitir requests sin origin (como mobile apps o curl)
    if (!origin) return callback(null, true);
    
    // Lista de orígenes permitidos
    const allowedOrigins = [
      'http://localhost:5173',           // Desarrollo local
      'http://localhost:3000',           // Desarrollo local alternativo
      process.env.FRONTEND_URL,          // URL del frontend en producción
    ].filter(Boolean); // Eliminar valores undefined
    
    // En desarrollo, permitir todos los orígenes
    if (process.env.NODE_ENV === 'development') {
      return callback(null, true);
    }
    
    // En producción, verificar la lista de permitidos
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

server.use(cors(corsOptions));
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
