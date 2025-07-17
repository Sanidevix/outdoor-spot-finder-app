
import React from 'react';
import { X, Radio, Clock, Signal } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPoint: any;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, selectedPoint }) => {
  const getSignalCategory = (signalStrength: number) => {
    if (signalStrength >= -70) return { category: 'Excelente', color: 'text-green-600' };
    if (signalStrength >= -85) return { category: 'Buena', color: 'text-yellow-600' };
    if (signalStrength >= -95) return { category: 'Regular', color: 'text-gray-600' };
    if (signalStrength >= -105) return { category: 'Pobre', color: 'text-red-600' };
    return { category: 'Muy Pobre / Sin Servicio', color: 'text-black' };
  };

  if (!isOpen || !selectedPoint) return null;

  const { category, color } = getSignalCategory(selectedPoint.signalStrength);

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out">
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-green-800 flex items-center gap-2">
            <Radio size={20} />
            Medición Celular
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-bold text-green-800 mb-2">{selectedPoint.operatorName}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Red:</span>
                <span className="font-medium">{selectedPoint.networkType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tipo:</span>
                <span className="font-medium">{selectedPoint.connectionType}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Signal size={16} />
              Intensidad de Señal
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Potencia:</span>
                <span className="font-mono text-lg">{selectedPoint.signalStrength} dBm</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Calidad:</span>
                <span className={`font-medium ${color}`}>{category}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">ASU:</span>
                <span className="font-mono">{selectedPoint.asu}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Nivel:</span>
                <span className="font-mono">{selectedPoint.signalLevel}/5</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-bold text-blue-800 mb-3">Información Técnica</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Cell ID:</span>
                <span className="font-mono">{selectedPoint.cellId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">LAC:</span>
                <span className="font-mono">{selectedPoint.lac}</span>
              </div>
            </div>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
              <Clock size={16} />
              Timestamp
            </h4>
            <p className="text-sm font-mono text-gray-700">{selectedPoint.timestamp}</p>
          </div>

          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h5 className="font-bold text-gray-800 mb-2">Rangos de Señal</h5>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>-50 a -70 dBm: Excelente</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span>-71 a -85 dBm: Buena</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-white border border-gray-400 rounded-full"></div>
                <span>-86 a -95 dBm: Regular</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>-96 a -105 dBm: Pobre</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-black rounded-full"></div>
                <span>-110 dBm o menos: Sin servicio</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
