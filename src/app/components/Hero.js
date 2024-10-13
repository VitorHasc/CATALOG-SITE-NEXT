// Hero.js
import React from 'react';


const Hero = () => {
  return (
    <section 
      className="hero h-screen bg-cover bg-center relative" 
    >
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

          <button 
            className="">
            <i className="fas fa-search"></i>
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;