import React from 'react';
import Link from 'next/link';  // Importando o Link do Next.js

const Header2 = () => {
  return (
    <header className="bg-white fixed top-0 left-0 w-full h-30 z-20 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="logo2">
          <img src="/logo2.png" alt="Logo" className="w-24" />
        </div>
        
        {/* Navegação */}
        <nav>
          <ul className="flex space-x-6 text-black">
            <li><Link className="hover:text-green-500" href="/">Home</Link></li>
            <li><Link className="hover:text-green-500" href="/catalogo">Catálogo</Link></li>
            <li><a href="#favoritos" className="hover:text-green-500">Favoritos</a></li>
            <li><a href="#contato" className="hover:text-green-500">Contato</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header2;
