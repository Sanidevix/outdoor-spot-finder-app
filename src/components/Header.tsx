
import React from 'react';
import { Mountain, Compass } from 'lucide-react';

export const Header = () => {
  return (
    <header 
      className="relative h-64 bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
      }}
    >
      <div className="text-center text-white space-y-4 max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Mountain size={48} className="text-green-400" />
          <h1 className="text-4xl md:text-6xl font-bold tracking-wide">
            Outdoor Explorer
          </h1>
          <Compass size={48} className="text-blue-400" />
        </div>
        
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed">
          Descubre los mejores refugios, senderos, miradores y campings para tus aventuras al aire libre. 
          Explora la naturaleza con información detallada y mapas interactivos.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          <span className="bg-green-600/80 px-3 py-1 rounded-full">🏔️ Montañismo</span>
          <span className="bg-blue-600/80 px-3 py-1 rounded-full">🥾 Senderismo</span>
          <span className="bg-amber-600/80 px-3 py-1 rounded-full">🏕️ Camping</span>
          <span className="bg-purple-600/80 px-3 py-1 rounded-full">📸 Fotografía</span>
        </div>
      </div>
    </header>
  );
};
