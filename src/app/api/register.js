import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // Verifica se o usuário já existe
      const userExists = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (userExists) {
        return res.status(400).json({ message: 'Usuário já existe!' });
      }

      const newUser = await prisma.user.create({
        data: {
          email,
          password,
        },
      });

      return res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro ao registrar usuário' });
    }
  } else {
    return res.status(405).json({ message: 'Método não permitido' });
  }
}
