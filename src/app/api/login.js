// pages/api/login.js
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcryptjs'; // Se você estiver usando bcrypt para comparar senhas

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    try {
      // Buscar o usuário diretamente no banco de dados pelo e-mail
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return res.status(401).json({ message: 'Usuário não encontrado' });
      }

      // Comparar a senha
      const isMatch = await compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Senha incorreta' });
      }

      res.status(200).json({ message: 'Login bem-sucedido', user: { email: user.email } });

    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno do servidor' });
    } finally {
      await prisma.$disconnect(); // Desconectar do banco de dados
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Método ${req.method} não permitido`);
  }
}
