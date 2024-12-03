"use server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { searchTerm, preco, quartos, bairro, rua, cidade, tipo, numero } = await req.json();
        const whereConditions = {
            AND: [],
        };

        if (searchTerm) {
            const searchWords = searchTerm.split(" ");
            searchWords.forEach((word) => {
                whereConditions.AND.push({
                    OR: [
                        { descricao: { contains: word, mode: "insensitive" } },
                        { nome: { contains: word, mode: "insensitive" } }
                    ]
                });
            });
        }

        if (preco) {
            whereConditions.AND.push({
                preco: { gte: preco.min, lte: preco.max },
            });
        }

        if (quartos) {
            whereConditions.AND.push({
                quartos: { gte: quartos },
            });
        }

        if (bairro) {
            whereConditions.AND.push({
                bairro: { contains: bairro, mode: "insensitive" },
            });
        }

        if (rua) {
            whereConditions.AND.push({
                rua: { contains: rua, mode: "insensitive" },
            });
        }

        if (cidade) {
            whereConditions.AND.push({
                cidade: { contains: cidade, mode: "insensitive" },
            });
        }

        if (tipo) {
            whereConditions.AND.push({
                tipo: { equals: tipo },
            });
        }

        let imoveis = await prisma.imovel.findMany({
            where: whereConditions.AND.length > 0 ? whereConditions : {},
        });

        if (imoveis.length === 0 && searchTerm) {

            const descricaoConditions = {
                AND: [
                    {
                        descricao: { contains: searchTerm, mode: "insensitive" }
                    },
                ],
            };
            imoveis = await prisma.imovel.findMany({
                where: descricaoConditions.AND.length > 0 ? descricaoConditions : {},
            });
        }

        if (imoveis.length === 0) {

            const localizacaoConditions = {
                AND: [],
            };

            if (bairro) {
                localizacaoConditions.AND.push({
                    bairro: { contains: bairro, mode: "insensitive" },
                });
            }

            if (rua) {
                localizacaoConditions.AND.push({
                    rua: { contains: rua, mode: "insensitive" },
                });
            }

            if (cidade) {
                localizacaoConditions.AND.push({
                    cidade: { contains: cidade, mode: "insensitive" },
                });
            }

            if (localizacaoConditions.AND.length > 0) {
                imoveis = await prisma.imovel.findMany({
                    where: localizacaoConditions,
                });
            }
        }

        if (imoveis.length === 0) {
            imoveis = await prisma.imovel.findMany();
            return new Response(
                JSON.stringify({
                    message: "Não foi possível filtrar os imóveis. Exibindo todos.",
                    imoveis,
                }),
                { status: 200, headers: { "Content-Type": "application/json" } }
            );
        }

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
