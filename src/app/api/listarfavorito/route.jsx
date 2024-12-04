"use server";

import { PrismaClient } from "@prisma/client";
import { verifyToken, verifyUserRole } from "../APIfun";

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    // Obter o token de autorização
    const token = req.headers.get("Authorization");
    const role = await verifyUserRole(token);
    const idUser = await verifyToken(token);

    // Verifica se o usuário tem permissão para acessar os favoritos
    if (role === "EMPREGADO" || role === "ADM" || role === "USER") {
      // Consulta os imóveis favoritos do usuário
      const favoritos = await prisma.favorito.findMany({
        where: { idUser },
        include: {
          Imovel: true,  // Incluir os detalhes do imóvel relacionado
        },
      });

      // Se o usuário não tem favoritos, retornar mensagem
      if (favoritos.length === 0) {
        return new Response(
          JSON.stringify({
            message: "Você não tem imóveis favoritos.",
          }),
          { status: 200, headers: { "Content-Type": "application/json" } }
        );
      }

      // Retorna os imóveis favoritos com os dados completos
      return new Response(
        JSON.stringify(
          favoritos.map(favorito => ({
            idFavorito: favorito.idFavorito,
            idImovel: favorito.Imovel.idImovel,
            nome: favorito.Imovel.nome,
            cidade: favorito.Imovel.cidade,
            preco: favorito.Imovel.preco,
            imageP: favorito.Imovel.imageP,
          }))
        ),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } else {
      return new Response(
        JSON.stringify({ message: "Acesso negado. Permissão insuficiente." }),
        { status: 403, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ message: "Erro ao listar favoritos.", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
