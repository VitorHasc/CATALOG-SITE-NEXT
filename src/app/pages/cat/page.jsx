"use client";
import React, { useState } from "react";
import axios from "axios"; // Importando axios
import Header2 from "@/app/components/header2";
import Footer from "@/app/components/footer";

export default function CatalogoPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [preco, setPreco] = useState({ min: 0, max: 1000000 });
    const [quartos, setQuartos] = useState(0); // Valor numérico
    const [bairro, setBairro] = useState("");
    const [rua, setRua] = useState("");
    const [cidade, setCidade] = useState("");
    const [tipo, setTipo] = useState("");
    const [imoveis, setImoveis] = useState([]);
    const [loading, setLoading] = useState(false);
    const [frase, setFrase] = useState("")

    const handleSearch = async () => {
        setLoading(true);

        try {
            const token = localStorage.getItem("token");
            console.log("Buscando imóveis com os seguintes parâmetros:");
            console.log("searchTerm:", searchTerm);
            console.log("preco:", preco);
            console.log("quartos:", quartos);
            console.log("bairro:", bairro);
            console.log("rua:", rua);
            console.log("cidade:", cidade);
            console.log("tipo:", tipo);
            console.log(token);
            const response = await axios.post("/api/buscarimovel", {
                searchTerm,
                preco: { ...preco, max: Number(preco.max) }, // Convertendo para número
                quartos,
                bairro,
                rua,
                cidade,
                tipo,
            }, {
                headers: {
                    Authorization: token,
                },
            });
            setImoveis(response.data || response.data.imoveis);
        } catch (error) {
            console.error("Erro na requisição:", error);
            setImoveis([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Header2 />

            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
                    <div className="w-full px-4 md:px-6 mx-auto">
                        <h1 className="text-3xl font-bold tracking-tighter lg:text-5xl mb-8">
                            Catálogo de Imóveis
                        </h1>

                        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            <div className="lg:col-span-1 space-y-4">
                                <div>
                                    <label className="text-sm font-medium" htmlFor="search">
                                        Buscar
                                    </label>
                                    <div className="flex mt-1">
                                        <input
                                            id="search"
                                            className="w-full border rounded-md p-2"
                                            placeholder="Digite um endereço ou bairro"
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                        />
                                        <button
                                            className="ml-2 px-4 py-2 border rounded-md"
                                            onClick={handleSearch}
                                        >
                                            🔍
                                        </button>
                                    </div>
                                </div>

                                {/* Campo de Bairro */}
                                <div>
                                    <label className="text-sm font-medium" htmlFor="bairro">
                                        Bairro
                                    </label>
                                    <input
                                        id="bairro"
                                        className="w-full border rounded-md p-2 mt-1"
                                        placeholder="Digite o bairro"
                                        value={bairro}
                                        onChange={(e) => setBairro(e.target.value)}
                                    />
                                </div>

                                {/* Campo de Rua */}
                                <div>
                                    <label className="text-sm font-medium" htmlFor="rua">
                                        Rua
                                    </label>
                                    <input
                                        id="rua"
                                        className="w-full border rounded-md p-2 mt-1"
                                        placeholder="Digite a rua"
                                        value={rua}
                                        onChange={(e) => setRua(e.target.value)}
                                    />
                                </div>

                                {/* Campo de Cidade */}
                                <div>
                                    <label className="text-sm font-medium" htmlFor="cidade">
                                        Cidade
                                    </label>
                                    <input
                                        id="cidade"
                                        className="w-full border rounded-md p-2 mt-1"
                                        placeholder="Digite a cidade"
                                        value={cidade}
                                        onChange={(e) => setCidade(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium" htmlFor="tipo">
                                        Tipo de Imóvel
                                    </label>
                                    <select
                                        id="tipo"
                                        className="w-full border rounded-md p-2 mt-1"
                                        value={tipo}
                                        onChange={(e) => setTipo(e.target.value)}
                                    >
                                        <option value="">Todos</option>
                                        <option value="casa">Casa</option>
                                        <option value="apartamento">Apartamento</option>
                                        <option value="terreno">Terreno</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="text-sm font-medium" htmlFor="preco">
                                        Faixa de Preço
                                    </label>
                                    <input
                                        type="range"
                                        id="preco"
                                        className="w-full mt-1"
                                        min="0"
                                        max="1000000"
                                        step="50000"
                                        value={preco.max}
                                        onChange={(e) =>
                                            setPreco((prev) => ({ ...prev, max: e.target.value }))
                                        }
                                    />
                                    <div className="flex justify-between text-sm text-gray-500 mt-2">
                                        <span>R$ 0</span>
                                        <span>R$ 1.000.000+</span>
                                    </div>
                                </div>

                                <div>
                                    <label className="text-sm font-medium" htmlFor="quartos">
                                        Quartos
                                    </label>
                                    <input
                                        type="number"
                                        id="quartos"
                                        className="w-full border rounded-md p-2 mt-1"
                                        value={quartos}
                                        onChange={(e) => setQuartos(Number(e.target.value))}
                                    />
                                </div>

                                <button
                                    className="w-full py-2 bg-blue-500 text-white rounded-md"
                                    onClick={handleSearch}
                                >
                                    Aplicar Filtros
                                </button>
                            </div>

                            <div className="lg:col-span-3">
                                {loading ? (
                                    <p>Carregando...</p>
                                ) : (
                                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                        {imoveis.length > 0 ? (
                                            imoveis.map((imovel, i) => (
                                                <div key={i} className="rounded-lg border bg-white shadow-sm overflow-hidden">
                                                    <img
                                                        src={imovel.imageP || "/casa.jpg"}
                                                        alt={`Imóvel ${i + 1}`}
                                                        className="w-full h-48 object-cover"
                                                    />
                                                    <div className="p-4">
                                                        <h3 className="text-lg font-bold">{imovel.nome}</h3>
                                                        <p className="text-sm text-gray-500 mb-2">
                                                            {imovel.bairro}, {imovel.cidade}
                                                        </p>
                                                        <div className="flex justify-between text-sm text-gray-500 mb-2">
                                                            <span>{imovel.quartos} Quartos</span>
                                                            <span>{imovel.tipo}</span>
                                                        </div>
                                                        <p className="text-lg font-bold mb-2">
                                                            R$ {imovel.preco.toLocaleString("pt-BR")}
                                                        </p>
                                                        <button className="w-full py-2 border rounded-md text-blue-500">
                                                            Ver Detalhes
                                                        </button>
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <p>{frase}</p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}
