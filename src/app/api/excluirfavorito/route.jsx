"use server";
import { PrismaClient } from "@prisma/client";
import { verifyToken, verifyUserRole } from "../APIfun";

const prisma = new PrismaClient();

export async function DELETE(req) {
  try {
    // Obter o token de autorização
    const token = req.headers.get("Authorization");
    const role = await verifyUserRole(token);
    const idUser = await verifyToken(token);

    // Verifica se o usuário tem permissão para desfavoritar
    if (role === "EMPREGADO" || role === "ADM") {
      // Obter o id do imóvel a ser removido dos favoritos
      const { idImovel } = await req.json();

      // Verifica se o imóvel está nos favoritos do usuário
      const existingFavorite = await prisma.favorito.findUnique({
        where: {
          idUser_idImovel: {
            idUser,
            idImovel
          }
        }
      });

      if (!existingFavorite) {
        return new Response(
          JSON.stringify({
            message: "Este imóvel não está nos seus favoritos.",
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      // Remove o imóvel dos favoritos
      await prisma.favorito.delete({
        where: {
          idUser_idImovel: {
            idUser,
            idImovel
          }
        }
      });

      return new Response(
        JSON.stringify({
          message: "Imóvel removido dos favoritos com sucesso.",
        }),
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
      JSON.stringify({ message: "Erro ao remover imóvel dos favoritos.", error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
