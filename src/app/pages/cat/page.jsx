"use client";

import React from "react";
import Header2 from "@/app/components/header2";
import Footer from "@/app/components/footer";

export default function CatalogoPage() {
return (
    <div className="flex flex-col min-h-screen">    


    {/* Header */}
    <Header2 />

    
    {/* Main content */}
    <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
        <div className="w-full px-4 md:px-6 mx-auto">
            <h1 className="text-3xl font-bold tracking-tighter  lg:text-5xl mb-8">
            Catálogo de Imóveis
            </h1>

            {/* Filtros + Imóveis */}
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            
            {/* Filtros */}
            <div className="lg:col-span-1 space-y-4">
                <div>
                <label className="text-sm font-medium" htmlFor="search">
                    Buscar
                </label>
                <div className="flex mt-1">
                    <input id="search" className="w-full border rounded-md p-2" placeholder="Digite um endereço ou bairro" />
                    <button className="ml-2 px-4 py-2 border rounded-md">
                        🔍
                    </button>
                </div>
                </div>

                <div>
                <label className="text-sm font-medium" htmlFor="tipo">
                    Tipo de Imóvel
                </label>
                <select id="tipo" className="w-full border rounded-md p-2 mt-1">
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
                <input type="range" id="preco" className="w-full mt-1" min="0" max="1000000" step="50000" />
                <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>R$ 0</span>
                    <span>R$ 1.000.000+</span>
                </div>
                </div>

                <div>
                <label className="text-sm font-medium" htmlFor="quartos">
                    Quartos
                </label>
                <select id="quartos" className="w-full border rounded-md p-2 mt-1">
                    <option value="">Qualquer</option>
                    <option value="1">1+</option>
                    <option value="2">2+</option>
                    <option value="3">3+</option>
                    <option value="4">4+</option>
                </select>
                </div>

                <button className="w-full py-2 bg-blue-500 text-white rounded-md">
                Aplicar Filtros
                </button>
            </div>

            {/* Imóveis */}
            <div className="lg:col-span-3">
                <div className="flex justify-between items-center mb-4">
                <p className="text-sm text-gray-500">Exibindo 1-9 de 42 imóveis</p>
                <select className="border rounded-md p-2">
                    <option value="relevancia">Mais relevantes</option>
                    <option value="preco-asc">Menor preço</option>
                    <option value="preco-desc">Maior preço</option>
                    <option value="data">Mais recentes</option>
                </select>
                </div>

                {/* Grid de Cards */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[...Array(9)].map((_, i) => (
                    <div key={i} className="rounded-lg border bg-white shadow-sm overflow-hidden">
                    <img
                        src="/casa.jpg"
                        alt={`Imóvel ${i + 1}`}
                        className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                        <h3 className="text-lg font-bold">Casa Encantadora {i + 1}</h3>
                        <p className="text-sm text-gray-500 mb-2">Bairro Exemplo, Cidade</p>
                        <div className="flex justify-between text-sm text-gray-500 mb-2">
                        <span>3 Quartos</span>
                        <span>2 Banheiros</span>
                        <span>150m²</span>
                        </div>
                        <p className="text-lg font-bold mb-2">R$ {(500000 + i * 50000).toLocaleString('pt-BR')}</p>
                        <button className="w-full py-2 border rounded-md text-blue-500">
                        Ver Detalhes
                        </button>
                    </div>
                    </div>
                ))}
                </div>

                {/* Paginação */}
                <div className="flex justify-center mt-8">
                <button className="mr-2 py-2 px-4 border rounded-md">
                    Anterior
                </button>
                <button className="py-2 px-4 border rounded-md">
                    Próxima
                </button>
                </div>
            </div>
            </div>
        </div>
        </section>
    </main>


    </div>
);
}