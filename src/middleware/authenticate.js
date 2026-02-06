import jwt from "jsonwebtoken";
import { prisma } from "../libs/prisma.js";

export const authenticate = async (req, res, next) => {
  const bearer = req.headers.authorization;

  if (!bearer) {
    const error = new Error("No autorizado");
    return res.status(401).json({ error: error.message });
  }
  const [, token] = bearer.split(" ");

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.usuario.findUnique({
      where: { id: payload.id },
      omit: {
        password: true,
      },
    });
    if (!user) {
      const error = new Error("Usuario no encontrado");
      return res.status(404).json({ error: error.message });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido" });
  }
};
