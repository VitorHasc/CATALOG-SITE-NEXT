import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function POST(req) {
  const { email, password } = await req.json();

  try {

    const userExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userExists) {
      return NextResponse.json({ message: 'Usuário já existe!' }, { status: 400 });
    }

    const newUser = await prisma.user.create({
      data: { email, password },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Erro ao registrar usuário' }, { status: 500 });
  }
}
