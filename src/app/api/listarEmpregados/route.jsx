import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function GET(req) {
    try {
        // Buscar todos os empregados
        const empregados = await prisma.user.findMany({
            where: { role: "EMPREGADO" }, // Filtra usuários com a role "EMPREGADO"
            include: {
                Imoveis: true, // Inclui os imóveis relacionados
            },
        });

        return new Response(
            JSON.stringify({
                message: "Lista de empregados encontrada.",
                empregados,
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ message: "Erro ao buscar empregados.", error: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}