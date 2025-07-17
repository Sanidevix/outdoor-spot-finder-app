
import React from 'react';
import { X, MapPin, User, Star, Calendar } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPoint: any;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, selectedPoint }) => {
  if (!isOpen || !selectedPoint) return null;

  const getDbColor = (db: string) => {
    const colors = {
      'refugios': 'bg-amber-100 text-amber-800',
      'senderos': 'bg-green-100 text-green-800',
      'miradores': 'bg-blue-100 text-blue-800',
      'campings': 'bg-yellow-100 text-yellow-800'
    };
    return colors[db] || 'bg-gray-100 text-gray-800';
  };

  const getDbIcon = (db: string) => {
    const icons = {
      'refugios': '🏔️',
      'senderos': '🥾',
      'miradores': '👁️',
      'campings': '🏕️'
    };
    return icons[db] || '📍';
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-[1001] md:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className={`
        fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-2xl z-[1002] 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        overflow-y-auto
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-green-800">Información del Lugar</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Main Image */}
            {selectedPoint.imagen && (
              <div className="relative h-48 rounded-lg overflow-hidden shadow-md">
                <img
                  src={selectedPoint.imagen}
                  alt={selectedPoint.nombre}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getDbColor(selectedPoint.db)}`}>
                    {getDbIcon(selectedPoint.db)} {selectedPoint.db}
                  </span>
                </div>
              </div>
            )}

            {/* Title and basic info */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedPoint.nombre}</h3>
              
              <div className="flex items-center gap-2 text-gray-600 mb-3">
                <MapPin size={16} />
                <span className="text-sm">
                  Coordenadas: {selectedPoint.coordenadas?.[1]?.toFixed(4)}, {selectedPoint.coordenadas?.[0]?.toFixed(4)}
                </span>
              </div>

              {selectedPoint.operador && (
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <User size={16} />
                  <span className="text-sm">Operador: {selectedPoint.operador}</span>
                </div>
              )}

              {selectedPoint.level && (
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <Star size={16} />
                  <span className="text-sm">Nivel: {selectedPoint.level}</span>
                </div>
              )}
            </div>

            {/* Description */}
            {selectedPoint.descripcion && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Descripción</h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {selectedPoint.descripcion}
                </p>
              </div>
            )}

            {/* Additional Info Card */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                <Calendar size={16} />
                Información Adicional
              </h4>
              <div className="space-y-2 text-sm text-green-700">
                <p>• Consulta siempre las condiciones meteorológicas antes de tu visita</p>
                <p>• Respeta el entorno natural y las normativas locales</p>
                <p>• Lleva equipo adecuado según la actividad</p>
                {selectedPoint.db === 'refugios' && (
                  <p>• Se recomienda reservar con antelación</p>
                )}
                {selectedPoint.db === 'senderos' && (
                  <p>• Informa a alguien de tu ruta planificada</p>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t">
              <button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg font-medium transition-colors">
                Ver en Google Maps
              </button>
              <button className="w-full border border-green-600 text-green-600 hover:bg-green-50 py-3 px-4 rounded-lg font-medium transition-colors">
                Compartir Ubicación
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
