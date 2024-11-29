"use server";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { signToken } from "../APIfun";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const user = await prisma.user.findUnique({
      where: { email },
    });
    console.log(user);
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(
        JSON.stringify({ message: "Credenciais inválidas" }),
      );
    }
    const token = signToken({ id: user.idUser });
    return new Response(
      JSON.stringify({
        message: "Login bem-sucedido",
        user: {
          id: user.id,
          email: user.email,
        },
        token,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Erro ao realizar login", error: error.message }),
    );
  }
}
