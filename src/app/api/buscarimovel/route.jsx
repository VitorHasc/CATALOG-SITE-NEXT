"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { searchTerm } = await req.json();
        const imoveis = await prisma.imovel.findMany({
            where: { descricao: { contains: searchTerm, mode: "insensitive" } },
        });
        return new Response(
            JSON.stringify(imoveis),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ message: "Erro ao buscar imóveis", error: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}