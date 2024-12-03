import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const SECRET_KEY = process.env.SECRET;

export function signToken(id) {
  if (!SECRET_KEY) {
    throw new Error("SECRET_KEY não está definida");
  }
  return jwt.sign(id, SECRET_KEY, { expiresIn: "7d" });
}

export function verifyToken(token) {
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      return decoded.id; 
    } catch (error) {
      throw new Error("Token inválido ou expirado");
    }
  }

export async function verifyUserRole(token) {
    const decoded = verifyToken(token);
    console.log(decoded);
    const user = await prisma.user.findUnique({
      where: { idUser: decoded },
    });
    console.log(user.role);
    return user.role;
  }