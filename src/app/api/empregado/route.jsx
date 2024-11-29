"use server";

import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { verifyUserRole } from "../APIfun";
const prisma = new PrismaClient();

export async function POST(req) {
    try {
        const token = req.headers.get("Authorization");
        const role = await verifyUserRole(token);

        if (role == "ADM") {
            const { email, password, numero } = await req.json();

            const hashedPassword = await bcrypt.hash(password, 10);

            const novoEmpregado = await prisma.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    role: "EMPREGADO",
                    numero,
                },
            });
            return new Response(
                JSON.stringify({
                    message: "Empregado registrado com sucesso.",
                    user: {
                        idUser: novoEmpregado.idUser,
                        email: novoEmpregado.email,
                        role: novoEmpregado.role,
                        numero: novoEmpregado.numero,
                    },
                }),
                { status: 201, headers: { "Content-Type": "application/json" } }
            );
        }
    } catch (error) {
        return new Response(
            JSON.stringify({ message: "Erro ao registrar empregado.", error: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}

export async function DELETE(req) {
    try {
        const token = req.headers.get("Authorization");
        const role = await verifyUserRole(token);

        if (role == "ADM") {
            const { idUser } = await req.json();

            if (!idUser) {
                return new Response(
                    JSON.stringify({ message: "ID do usuário não fornecido." }),
                    { status: 400, headers: { "Content-Type": "application/json" } }
                );
            }

            const userToDelete = await prisma.user.findUnique({
                where: { idUser },
            });

            if (!userToDelete) {
                return new Response(
                    JSON.stringify({ message: "Usuário não encontrado." }),
                    { status: 404, headers: { "Content-Type": "application/json" } }
                );
            }

            await prisma.user.delete({
                where: { idUser },
            });

            return new Response(
                JSON.stringify({
                    message: "Empregado deletado com sucesso.",
                    userDeleted: {
                        idUser: userToDelete.idUser,
                        email: userToDelete.email,
                        role: userToDelete.role,
                    },
                }),
                { status: 200, headers: { "Content-Type": "application/json" } }
            );
        } else {
            return new Response(
                JSON.stringify({ message: "Permissão negada. Somente administradores podem excluir empregados." }),
                { status: 403, headers: { "Content-Type": "application/json" } }
            );
        }
    } catch (error) {
        return new Response(
            JSON.stringify({ message: "Erro ao deletar empregado.", error: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}

export async function GET(req) {
    try {
        const url = new URL(req.url);
        const idUser = url.searchParams.get("idUser");

        if (!idUser) {
            return new Response(
                JSON.stringify({ message: "ID do usuário não fornecido." }),
                { status: 400, headers: { "Content-Type": "application/json" } }
            );
        }

        const empregado = await prisma.user.findUnique({
            where: { idUser: parseInt(idUser) },
            include: {
                Imoveis: true,
            },
        });

        if (!empregado) {
            return new Response(
                JSON.stringify({ message: "Empregado não encontrado." }),
                { status: 404, headers: { "Content-Type": "application/json" } }
            );
        }

        return new Response(
            JSON.stringify({
                idUser: empregado.idUser,
                email: empregado.email,
                role: empregado.role,
                imoveis: empregado.Imoveis,
                numero: empregado.numero
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ message: "Erro ao buscar empregado.", error: error.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
