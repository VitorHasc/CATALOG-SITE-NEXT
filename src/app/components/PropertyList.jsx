"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';


export default function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get('/api/buscarImovel');
      setProperties(response.data);
    } catch (err) {
      setError('Erro ao carregar imóveis');
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete('/api/imovel', {
        headers: { Authorization: token },
        data: { idImovel: id }
      });
      fetchProperties();
    } catch (err) {
      setError('Erro ao deletar imóvel');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Imóveis Cadastrados</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property.idImovel} className="bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={property.imageP || '/casa.jpg'}
              alt={property.nome}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{property.nome}</h3>
              <p className="text-gray-600 mb-2">{property.descricao}</p>
              <p className="text-green-600 font-bold mb-2">
                R$ {property.preco.toLocaleString('pt-BR')}
              </p>
              <p className="text-gray-500 mb-2">
                {property.rua}, {property.numero} - {property.bairro}, {property.cidade}
              </p>
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => router.push(`/properties/edit/${property.idImovel}`)}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(property.idImovel)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Deletar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}   