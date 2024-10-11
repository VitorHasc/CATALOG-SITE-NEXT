import React from 'react';

const Header = () => {
  return (
    <header className="bg-transparent fixed top-0 left-0 w-full z-20 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="logo">

        </div>
        
        {/* Navigation */}
        <nav>
          <ul className="flex space-x-6 text-white">
            <li>Home</li>
            <li></li> {/* Corrigido o 'to' */}
            <li><a href="#favoritos" className="hover:text-green-500">Favoritos</a></li>
            <li><a href="#contato" className="hover:text-green-500">Contato</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;