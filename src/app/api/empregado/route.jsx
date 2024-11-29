import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt'; // Importando o bcrypt

const prisma = new PrismaClient();

export async function POST(req) {
  try {

    const token = req.headers.get('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return new Response(
        JSON.stringify({ message: "Token não fornecido" }),
        { status: 401, headers: { "Content-Type": "application/json" } }
      );
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (decodedToken.role !== 'ADM') {
      return new Response(
        JSON.stringify({ message: "Apenas administradores podem criar empregados." }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }

    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({ message: "Email e senha são obrigatórios." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const novoEmpregado = await prisma.user.create({
      data: {
        email,
        password: hashedPassword, 
        role: 'EMPREGADO', 
      },
    });

    return new Response(
      JSON.stringify({
        message: "Empregado registrado com sucesso.",
        user: {
          idUser: novoEmpregado.idUser,
          email: novoEmpregado.email,
          role: novoEmpregado.role,
        },
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Erro ao registrar empregado.", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
