import { verify, hash } from "argon2";
import { prisma } from "../libs/prisma.js";
import { createToken } from "../libs/jwt.js";

export class AuthController {
  static async login(req, res) {
    const { email, password } = req.body;
    const user = await prisma.usuario.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return res.status(401).json({ error: "Usuario no encontrado" });
    }
    const isPasswordValid = await verify(user.password, password);
    if (!isPasswordValid) {
      const error = new Error("Contraseña incorrecta");
      return res.status(401).json({ error: error.message });
    }
    const token = createToken(user);
    res.json(token);
  }

  static async getUser(req, res) {
    res.json(req.user);
  }

  static async updateEmail(req, res) {
    try {
      const { email } = req.body;
      const userId = req.user.id;

      // Verificar si el email ya existe
      const existingUser = await prisma.usuario.findUnique({
        where: { email }
      });

      if (existingUser && existingUser.id !== userId) {
        return res.status(400).json({ 
          message: "Este email ya está en uso por otro usuario" 
        });
      }

      // Actualizar el email
      const updatedUser = await prisma.usuario.update({
        where: { id: userId },
        data: { email },
        select: {
          id: true,
          email: true,
          nombre: true,
          createdAt: true,
          updatedAt: true
        }
      });

      res.json({
        message: "Email actualizado correctamente",
        user: updatedUser
      });
    } catch (error) {
      console.error("Error updating email:", error);
      res.status(500).json({ 
        message: "Error interno del servidor" 
      });
    }
  }

  static async updatePassword(req, res) {
    try {
      const { currentPassword, newPassword } = req.body;
      const userId = req.user.id;

      // Obtener el usuario actual
      const user = await prisma.usuario.findUnique({
        where: { id: userId }
      });

      if (!user) {
        return res.status(404).json({ 
          message: "Usuario no encontrado" 
        });
      }

      // Verificar la contraseña actual
      const isCurrentPasswordValid = await verify(user.password, currentPassword);
      if (!isCurrentPasswordValid) {
        return res.status(400).json({ 
          message: "La contraseña actual es incorrecta" 
        });
      }

      // Hash de la nueva contraseña
      const hashedNewPassword = await hash(newPassword);

      // Actualizar la contraseña
      await prisma.usuario.update({
        where: { id: userId },
        data: { password: hashedNewPassword }
      });

      res.json({
        message: "Contraseña actualizada correctamente"
      });
    } catch (error) {
      console.error("Error updating password:", error);
      res.status(500).json({ 
        message: "Error interno del servidor" 
      });
    }
  }
}
