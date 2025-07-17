
import React from 'react';
import { Radio } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header
      className="relative h-48 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d')",
      }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
        <div className="flex items-center gap-3 mb-3">
          <Radio size={32} className="text-green-400" />
          <h1 className="text-4xl font-bold">Mapa de Cobertura Celular</h1>
        </div>
        <p className="text-lg text-green-100 max-w-2xl">
          Visualiza la calidad de señal de las redes móviles en tiempo real. 
          Explora mediciones de diferentes operadores y tecnologías de red.
        </p>
      </div>
    </header>
  );
};
