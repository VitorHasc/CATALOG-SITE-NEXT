"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router';

const PerfilCorretor = () => {
    const [corretor, setCorretor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isClient, setIsClient] = useState(false);  // Estado para verificar se está no cliente
    const router = useRouter();

    // Definir que está no cliente após o primeiro render
    useEffect(() => {
        setIsClient(true); 
    }, []);

    // Espera o idUser da URL ser carregado para buscar os dados
    useEffect(() => {
        if (!isClient || !router.query.idUser) return;  // Espera o cliente estar montado e idUser disponível

        const fetchCorretor = async () => {
            try {
                const response = await axios.get(`/api/empregado?idUser=${router.query.idUser}`);
                setCorretor(response.data);
            } catch (error) {
                console.error("Erro ao buscar corretor:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCorretor();
    }, [isClient, router.query.idUser]);  // Dependências atualizadas para quando idUser ou cliente mudarem

    if (loading) return <p>Carregando...</p>;

    if (!corretor) return <p>Corretor não encontrado.</p>;

    return (
        <div className="perfil-corretor">
            <div className="info-corretor">
                <h1>{corretor.email}</h1>
                <p>Telefone: {corretor.numero}</p>
                <p>Role: {corretor.role}</p>
            </div>
            <div className="imoveis-cadastrados">
                <h2>Imóveis Cadastrados</h2>
                <div className="lista-imoveis">
                    {corretor.imoveis.map((imovel) => (
                        <div key={imovel.idImovel} className="card-imovel">
                            <h3>{imovel.nome}</h3>
                            <p>{imovel.descricao}</p>
                            <p>Preço: R$ {imovel.preco.toFixed(2)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PerfilCorretor;
