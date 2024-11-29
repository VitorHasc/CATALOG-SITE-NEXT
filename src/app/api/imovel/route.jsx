"use server";

import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";  // Certifique-se de instalar o jsonwebtoken

const prisma = new PrismaClient();

const SECRET_KEY = process.env.SECRET;  // Certifique-se de definir sua chave secreta no .env

// Função para verificar se o usuário tem a role apropriada
async function verifyUserRole(token) {
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const user = await prisma.user.findUnique({
            where: { idUser: decoded.idUser },
        });

        if (!user) throw new Error("Usuário não encontrado");

        if (user.role !== "ADM" && user.role !== "EMPREGADO") {
            throw new Error("Permissão negada");
        }

        return user; 
    } catch (error) {
        throw new Error("Token inválido ou expirado");
    }
}

export async function POST(req) {
    try {
        const token = req.headers.get("Authorization")?.split(" ")[1];
        if (!token) throw new Error("Token não fornecido");

        await verifyUserRole(token);

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
        const token = req.headers.get("Authorization")?.split(" ")[1];
        if (!token) throw new Error("Token não fornecido");

        await verifyUserRole(token);  // Verifica se o usuário tem a permissão necessária

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
        const token = req.headers.get("Authorization")?.split(" ")[1];
        if (!token) throw new Error("Token não fornecido");

        await verifyUserRole(token); 

        const { idImovel, nome, descricao, preco, cidade, bairro, rua, numero } = await req.json();

        const updatedImovel = await prisma.imovel.update({
            where: { idImovel },
            data: {
                nome,
                descricao,
                preco,
                cidade, 
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
