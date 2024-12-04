"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router';

const PerfilCorretor = () => {
    const router = useRouter();
    const { idUser } = router.query; // Obtém o idUser da URL
    const [corretor, setCorretor] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!idUser) return; // Evita chamar a API se idUser não estiver disponível ainda

        const fetchCorretor = async () => {
            try {
                const response = await axios.get(`/api/empregado?idUser=${idUser}`);
                setCorretor(response.data);
            } catch (error) {
                console.error("Erro ao buscar corretor:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCorretor();
    }, [idUser]);

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
