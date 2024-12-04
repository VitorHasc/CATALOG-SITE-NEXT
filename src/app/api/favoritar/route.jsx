"use server";
import { PrismaClient } from "@prisma/client";
import { verifyToken, verifyUserRole } from "../APIfun";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const token = req.headers.get("Authorization");
        const role = await verifyUserRole(token);
        const idUser = await verifyToken(token);

        if (role === "EMPREGADO" || role === "ADM") {
            const { idImovel } = await req.json();

            const existingFavorite = await prisma.favorito.findFirst({
                where: {
                    idUser,
                    idImovel
                }
            });

            if (existingFavorite) {
                return new Response(
                    JSON.stringify({
                        message: "Este imóvel já foi adicionado aos favoritos.",
                    }),
                    { status: 400, headers: { "Content-Type": "application/json" } }
                );
            }

            const favorito = await prisma.favorito.create({
                data: {
                    idUser,
                    idImovel
                },
            });

            return new Response(
                JSON.stringify({
                    message: "Imóvel adicionado aos favoritos com sucesso.",
                    favorito,
                }),
                { status: 201, headers: { "Content-Type": "application/json" } }
            );
        } else {
            return new Response(
                JSON.stringify({ message: "Acesso negado. Permissão insuficiente." }),
                { status: 403, headers: { "Content-Type": "application/json" } }
            );
        }
    } catch (error) {
        return new Response(
            JSON.stringify({ message: "Erro ao adicionar imóvel aos favoritos.", error: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}