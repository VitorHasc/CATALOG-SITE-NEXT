import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Imobiliária Casa Boa</h3>
          <p className="text-gray-400">
            Encontre o lar dos seus sonhos com nossa imobiliária. Oferecemos as melhores propriedades da região.
          </p>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
          <ul>
            <li><a href="#" className="text-gray-400 hover:text-white">Home</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Catálogo</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Favoritos</a></li>
            <li><a href="#" className="text-gray-400 hover:text-white">Contato</a></li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-4">Siga-nos</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-facebook-f"></i> Facebook
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-instagram"></i> Instagram
            </a>
            <a href="#" className="text-gray-400 hover:text-white">
              <i className="fab fa-twitter"></i> Twitter
            </a>
          </div>
        </div>
        
      </div>

      {/* Footer Bottom */}
      <div className="mt-8 text-center text-gray-400">
        <p>© {new Date().getFullYear()} Imobiliária Casa Boa. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;