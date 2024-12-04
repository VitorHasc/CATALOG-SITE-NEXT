"use client";

import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function AgentRegistrario() {
  const [agents, setAgents] = useState([]);
  const [agent, setAgent] = useState({
    email: '',
    password: '',
    numero: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Carregar agentes no início
  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/listarEmpregados', {
        headers: { 'Authorization': token }
      });
      setAgents(response.data.empregados); // Ajuste aqui para acessar 'empregados'
    } catch (err) {
      setError('Erro ao carregar corretores');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (editMode) {
        await axios.put(`/api/empregado/${editId}`, agent, {
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          }
        });
        setSuccess('Corretor atualizado com sucesso!');
      } else {
        await axios.post('/api/empregado', agent, {
          headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
          }
        });
        setSuccess('Corretor cadastrado com sucesso!');
      }
      setAgent({ email: '', password: '', numero: '' });
      setEditMode(false);
      fetchAgents();
    } catch (err) {
      setError('Erro ao salvar corretor');
    }
  };

  const handleEdit = (agent) => {
    setEditMode(true);
    setEditId(agent.idUser);
    setAgent({
      email: agent.email,
      password: '',
      numero: agent.numero
    });
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('token');
      
      // Realizando a requisição DELETE enviando o ID no corpo (body)
      await axios.delete('/api/empregado', {
        headers: { 'Authorization': token },
        data: { idUser: id }, // Aqui você passa o ID no corpo
      });
  
      setSuccess('Corretor excluído com sucesso!');
      fetchAgents();
    } catch (err) {
      setError('Erro ao excluir corretor');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-20">
      <h2 className="text-2xl font-bold mb-6">Gerenciamento de Corretores</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            value={agent.email}
            onChange={(e) => setAgent({ ...agent, email: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Senha</label>
          <input
            type="password"
            value={agent.password}
            onChange={(e) => setAgent({ ...agent, password: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            required={!editMode} // Senha opcional no modo de edição
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Número de Telefone</label>
          <input
            type="text"
            value={agent.numero}
            onChange={(e) => setAgent({ ...agent, numero: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          {editMode ? 'Atualizar Corretor' : 'Cadastrar Corretor'}
        </button>
      </form>

      {/* Lista de Corretores */}
      <div className="mt-10">
        <h3 className="text-xl font-bold mb-4">Corretores Cadastrados</h3>
        <ul className="space-y-4">
          {agents.map((agent) => (
            <li key={agent.idUser} className="p-4 bg-gray-100 rounded-lg shadow">
              <p><strong>Email:</strong> {agent.email}</p>
              <p><strong>Número:</strong> {agent.numero}</p>
              <div className="mt-2 space-x-2">
                <button
                  onClick={() => handleEdit(agent)}
                  className="py-1 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(agent.idUser)}
                  className="py-1 px-3 bg-red-500 text-white rounded-md hover:bg-red-600"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
