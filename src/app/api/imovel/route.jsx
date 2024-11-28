"use server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const { nome, descricao, preco, idUser, cidade, bairro, rua, numero } = await req.json();

        const imovel = await prisma.imovel.create({
            data: {
                nome,
                descricao,
                preco,
                idUser,
                cidade, 
                bairro,
                rua,
                numero,
            },
        });

        return new Response(
            JSON.stringify({
                message: "Imóvel criado com sucesso",
                imovel: {
                    idImovel: imovel.idImovel,
                    nome: imovel.nome,
                    descricao: imovel.descricao,
                    preco: imovel.preco,
                    cidade: imovel.cidade,
                    bairro: imovel.bairro,
                    rua: imovel.rua,
                    numero: imovel.numero,
                },
            }),
            {
                status: 201,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        return new Response( 
            JSON.stringify({ message: "Erro ao criar imóvel.", error: error.message }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
}

export async function GET(req) {
    try {
        const { searchTerm } = await req.json(); 

        const imoveis = await prisma.imovel.findMany({
            where: {
                descricao: {
                    contains: searchTerm, 
                    mode: 'insensitive', 
                },
            },
        });

        return new Response(
            JSON.stringify(imoveis),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ message: "Erro ao buscar imóveis", error: error.message }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
}

export async function DELETE(req) {
    try {
        const { idImovel } = await req.json();

        const deletedImovel = await prisma.imovel.delete({
            where: { idImovel },
        });

        return new Response(
            JSON.stringify({
                message: "Imóvel deletado com sucesso",
                imovel: {
                    idImovel: deletedImovel.idImovel,
                    nome: deletedImovel.nome,
                    descricao: deletedImovel.descricao,
                },
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ message: "Erro ao deletar imóvel", error: error.message }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
}

export async function PUT(req) {
    try {
        const { idImovel, nome, descricao, preco, cidade, bairro, rua, numero } = await req.json();

        const updatedImovel = await prisma.imovel.update({
            where: { idImovel },
            data: {
                nome,
                descricao,
                preco,
                cidade,  // Campos de endereço diretamente no imóvel
                bairro,
                rua,
                numero,
            },
        });

        return new Response(
            JSON.stringify({
                message: "Imóvel atualizado com sucesso",
                imovel: {
                    idImovel: updatedImovel.idImovel,
                    nome: updatedImovel.nome,
                    descricao: updatedImovel.descricao,
                    preco: updatedImovel.preco,
                    cidade: updatedImovel.cidade,
                    bairro: updatedImovel.bairro,
                    rua: updatedImovel.rua,
                    numero: updatedImovel.numero,
                },
            }),
            {
                status: 200,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ message: "Erro ao atualizar imóvel", error: error.message }),
            {
                status: 500,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
    }
}