import React from 'react';
import Link from  'next/link'

const Header = () => {
  return (
    <header className="bg-transparent fixed h-30 top-0 left-0 w-full z-20 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="logo">
        </div>
        <nav>
          <ul className="flex space-x-6 text-white">
           <li><Link className="hover:text-green-500" href="/">Home</Link></li>
            <li><Link className="hover:text-green-500" href="/catalogo">Catálogo</Link></li>
            <li><a href="#favoritos" className="hover:text-green-500">Favoritos</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;