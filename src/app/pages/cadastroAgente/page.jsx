"use client";

import React from 'react';
import AgentRegistrario from '@/app/components/AgentRegistrario'
import Header2 from '../../components/header2';

export default function RegisterAgentPage() {
  return (
    <div>
      <Header2 />
      <div className="container mx-auto py-8">
        <AgentRegistrario />
      </div>
    </div>
  );
}