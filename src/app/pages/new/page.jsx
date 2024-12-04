"use client";

import React from 'react';
import PropertyForm from '../../components/PropertyForm';
import Header2 from '../../components/header2';

export default function NewPropertyPage() {
  return (
    <div>
      <Header2 />
      <div className="container mx-auto py-8">
        <PropertyForm />
      </div>
    </div>
  );
}