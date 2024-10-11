import React from 'react';

const Card = ({ title, location, price, beds, baths, img }) => {
  return (
    <div className="card bg-white shadow-md rounded-lg overflow-hidden">
      <img src={img} alt={title} className="w-full h-48 object-cover" />
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

const Recommended = () => {
  const properties = [
    { 
      title: 'Apartamento tal 1', 
      location: '225, Montenegro', 
      price: 'R$00000', 
      beds: '4', 
      baths: 'Banheiros', 
    },
    { 
      title: 'Apartamento tal 2', 
      location: '225, Montenegro', 
      price: 'R$00000', 
      beds: '4', 
      baths: 'Banheiros', 
    },
    { 
      title: 'Apartamento tal 3', 
      location: '225, Montenegro', 
      price: 'R$00000', 
      beds: '4', 
      baths: 'Banheiros', 
    },
    { 
      title: 'Apartamento tal 4', 
      location: '225, Montenegro', 
      price: 'R$00000', 
      beds: '4', 
      baths: 'Banheiros', 
    },
    
   
  ];

  return (
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
  );
}

export default Recommended;