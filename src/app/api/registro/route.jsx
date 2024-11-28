"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    const newUser = await prisma.user.create({
      data: {
        email,
        password,
      },
    });
    return new Response(
      JSON.stringify({ message: "Usuário criado com sucesso", user: newUser }),
      {
        status: 201,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Erro ao criar usuário", error: error.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
