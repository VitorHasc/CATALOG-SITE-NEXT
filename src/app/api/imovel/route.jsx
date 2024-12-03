"use server";
import { PrismaClient } from "@prisma/client";
import { verifyToken, verifyUserRole } from "../APIfun";

const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const token = req.headers.get("Authorization");
        const role = await verifyUserRole(token);
        const idUser = await verifyToken(token);
        if (role == "EMPREGADO" || role == "ADM") {
            let { nome, descricao, preco, cidade, bairro, rua, numero, tipo, quartos, imageP } = await req.json();
            if (!imageP){
                imageP = "";
            }
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
                    tipo,
                    quartos,
                    imageP
                },
            });
            return new Response(
                JSON.stringify({
                    message: "Imóvel criado com sucesso",
                    imovel,
                }),
                { status: 201, headers: { "Content-Type": "application/json" } }
            );
        }
    } catch (error) {
        return new Response(
            JSON.stringify({ message: "Erro ao criar imóvel.", error: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}

export async function DELETE(req) {
    try {
        const token = req.headers.get("Authorization");
        const role = await verifyUserRole(token);
        if (role == "EMPREGADO" || "ADM") {
            const { idImovel } = await req.json();
            const deletedImovel = await prisma.imovel.delete({ where: { idImovel } });
            return new Response(
                JSON.stringify({
                    message: "Imóvel deletado com sucesso",
                    imovel: deletedImovel,
                }),
                { status: 200, headers: { "Content-Type": "application/json" } }
            );
        }
    } catch (error) {
        return new Response(
            JSON.stringify({ message: "Erro ao deletar imóvel", error: error.message }),
        );
    }
}

export async function PUT(req) {
    try {
        const token = req.headers.get("Authorization");
        const role = await verifyUserRole(token);
        if (role == "EMPREGADO" || "ADM") {
            const { idImovel, nome, descricao, preco, cidade, bairro, rua, numero } = await req.json();
            const updatedImovel = await prisma.imovel.update({
                where: { idImovel },
                data: { nome, descricao, preco, cidade, bairro, rua, numero },
            });
            return new Response(
                JSON.stringify({
                    message: "Imóvel atualizado com sucesso",
                    imovel: updatedImovel,
                }),
                { status: 200, headers: { "Content-Type": "application/json" } }
            );
        }
    } catch (error) {
        return new Response(
            JSON.stringify({ message: "Erro ao atualizar imóvel", error: error.message }),
        );
    }
}
