"use client";

import React from 'react';
import Header from '../../components/Header';

const Card = ({ title, location, price, beds, baths, img }) => {
  return (
    <div className="card bg-white shadow-md rounded-lg overflow-hidden">
      <img src="/casa.jpg" alt="Elements" />  
      <div className="p-4">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-gray-600">{location}</p>
        <p className="text-red-500 font-bold">{price}</p>
        <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
          <span>{beds} Camas</span>
          <span>{baths} Banheiros</span>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const properties = [
    { 
      title: 'Apartamento tal 1', 
      location: '225, Montenegro', 
      price: 'R$00000', 
      beds: '4',
      baths: 'Banheiros',
      img: 'path/to/image1.jpg'
    },
    { 
      title: 'Apartamento tal 2', 
      location: '225, Montenegro', 
      price: 'R$00000', 
      beds: '4', 
      baths: 'Banheiros',
      img: 'path/to/image2.jpg'
    },
    { 
      title: 'Apartamento tal 3', 
      location: '225, Montenegro', 
      price: 'R$00000', 
      beds: '4', 
      baths: 'Banheiros',
      img: 'path/to/image3.jpg'
    },
    { 
      title: 'Apartamento tal 4', 
      location: '225, Montenegro', 
      price: 'R$00000', 
      beds: '4', 
      baths: 'Banheiros',
      img: 'path/to/image4.jpg'
    },
  ];

  return (
    <div>
      <Header />
      <section className="hero h-screen bg-cover bg-center relative" style={{ backgroundImage: 'url(/elements.png)' }}>
        <div className="overlay absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="container mx-auto relative z-10 flex flex-col items-center justify-center text-center h-full text-white">
          <h1 className="text-5xl font-bold">Encontre o seu Lar perfeito.</h1>
          <div className="mt-5 relative w-96">
            <input 
              type="text" 
              placeholder="Tipo de imóvel..." 
              className="w-full py-3 px-5 rounded-full focus:outline-none"
              style={{ color: 'black' }}
            />
            <button className="absolute right-0 top-1/2 transform -translate-y-1/2">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Recommended Section */}
      <section className="recommended py-12 bg-gray-100">
        <div className="container mx-auto">
          <h2 className="text-center text-3xl font-bold mb-8">Recomendados</h2>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {properties.map((property, index) => (
              <Card key={index} {...property} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
