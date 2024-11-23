import React from 'react';

interface CardProps {
  title: string;
  subtitle: string;
  image: string;
  description: string;
  pdfUrl: string;
}

const Card: React.FC<CardProps> = ({ title, subtitle, image, description, pdfUrl }) => {
    return (
      <div 
        onClick={() => window.open(pdfUrl, '_blank')}
        className="bg-white shadow-lg rounded-lg  w-full md:w-[300px] flex flex-col justify-between h-full cursor-pointer transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
      >
        <div>
          <img src={image} alt={title} className="rounded-lg w-full h-30 mx-auto mb-4" />
          <h2 className="text-2xl text-cardtext font-bold font-anuphan text-left pl-2">{title}</h2>
          <h3 className="text-lg font-anuphan text-left text-gray-700 pl-2">{subtitle}</h3>
        </div>
        <p className="text-md font-anuphan text-gray-600 mt-4 pl-2 mb-2">{description}</p>
      </div>
    );
  };
  

export default Card;
