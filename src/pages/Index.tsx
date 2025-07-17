
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { FileUploader } from '../components/FileUploader';
import { cellularData } from '../data/cellular-data';
import { RotateCcw, Radio } from 'lucide-react';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Index = () => {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [filteredPoints, setFilteredPoints] = useState(cellularData.features);
  const [selectedArea, setSelectedArea] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isFileUploaderOpen, setIsFileUploaderOpen] = useState(false);
  const mapRef = useRef(null);

  const resetView = () => {
    setFilteredPoints(cellularData.features);
    setSelectedArea(null);
    setSelectedPoint(null);
    setIsSidebarOpen(false);
    if (mapRef.current) {
      mapRef.current.setView([40.4168, -3.7038], 6);
    }
  };

  const handlePointClick = (point) => {
    setSelectedPoint(point);
    setIsSidebarOpen(true);
  };

  const handleFileUpload = (data) => {
    // Convert uploaded data to the expected GeoJSON format
    const convertedFeatures = data.map((item, index) => ({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [item.longitude, item.latitude]
      },
      properties: {
        cellId: item.cellId,
        connectionType: item.connectionType,
        lac: item.lac,
        networkType: item.networkType,
        operatorName: item.operatorName,
        signalLevel: item.signalLevel,
        signalStrength: item.signalStrength,
        asu: item.asu,
        timestamp: item.timestamp
      }
    }));
    
    setFilteredPoints(convertedFeatures);
    setIsFileUploaderOpen(false);
  };

  const getSignalCategory = (signalStrength) => {
    if (signalStrength >= -70) return { category: 'Excelente', color: '#22c55e' };
    if (signalStrength >= -85) return { category: 'Buena', color: '#eab308' };
    if (signalStrength >= -95) return { category: 'Regular', color: '#ffffff' };
    if (signalStrength >= -105) return { category: 'Pobre', color: '#ef4444' };
    return { category: 'Muy Pobre / Sin Servicio', color: '#000000' };
  };

  const getMarkerIcon = (signalStrength) => {
    const { color } = getSignalCategory(signalStrength);
    
    return new L.Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <circle cx="12" cy="12" r="10" fill="${color}" stroke="#333" stroke-width="2"/>
          <circle cx="12" cy="12" r="3" fill="#333"/>
        </svg>
      `)}`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-green-50">
      <Header />
      
      <div className="relative">
        {/* Map Container */}
        <div className="h-[70vh] w-full relative">
          <MapContainer
            center={[40.4168, -3.7038] as [number, number]}
            zoom={6}
            style={{ height: '100%', width: '100%' }}
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            <MarkerClusterGroup>
              {filteredPoints.map((feature, index) => {
                if (feature.geometry.type === 'Point') {
                  const [lng, lat] = feature.geometry.coordinates;
                  const props = feature.properties;
                  const { category } = getSignalCategory(props.signalStrength);
                  
                  return (
                    <Marker
                      key={index}
                      position={[lat, lng] as [number, number]}
                      icon={getMarkerIcon(props.signalStrength)}
                      eventHandlers={{
                        click: () => handlePointClick(props),
                      }}
                    >
                      <Popup>
                        <div className="text-center">
                          <h3 className="font-bold text-green-800">{props.operatorName}</h3>
                          <p className="text-sm text-gray-600">Señal: {props.signalStrength} dBm ({category})</p>
                          <p className="text-xs text-gray-500">{props.networkType} - {props.connectionType}</p>
                        </div>
                      </Popup>
                    </Marker>
                  );
                }
                return null;
              })}
            </MarkerClusterGroup>
          </MapContainer>

          {/* Control Buttons */}
          <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
            <button
              onClick={resetView}
              className="bg-green-700 hover:bg-green-800 text-white p-3 rounded-full shadow-lg transition-colors"
              title="Reiniciar vista"
            >
              <RotateCcw size={20} />
            </button>
            
            <button
              onClick={() => setIsFileUploaderOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors"
              title="Subir archivo GeoJSON"
            >
              <Radio size={20} />
            </button>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 z-[1000] bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
            <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
              <Radio size={16} />
              Intensidad de Señal
            </h4>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span>Excelente (-50 a -70 dBm)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                <span>Buena (-71 a -85 dBm)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-white border border-gray-400"></div>
                <span>Regular (-86 a -95 dBm)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500"></div>
                <span>Pobre (-96 a -105 dBm)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-black"></div>
                <span>Sin Servicio (-110 dBm o menos)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          selectedPoint={selectedPoint}
        />

        {/* File Uploader */}
        <FileUploader
          isOpen={isFileUploaderOpen}
          onClose={() => setIsFileUploaderOpen(false)}
          onUpload={handleFileUpload}
        />

        {/* Stats */}
        <div className="bg-white/80 backdrop-blur-sm p-6 mx-4 -mt-8 relative z-10 rounded-lg shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-700">{filteredPoints.length}</p>
              <p className="text-sm text-gray-600">Mediciones</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-700">
                {filteredPoints.filter(f => getSignalCategory(f.properties?.signalStrength).category === 'Excelente').length}
              </p>
              <p className="text-sm text-gray-600">Excelente</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-yellow-700">
                {filteredPoints.filter(f => getSignalCategory(f.properties?.signalStrength).category === 'Buena').length}
              </p>
              <p className="text-sm text-gray-600">Buena</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-700">
                {filteredPoints.filter(f => ['Pobre', 'Muy Pobre / Sin Servicio'].includes(getSignalCategory(f.properties?.signalStrength).category)).length}
              </p>
              <p className="text-sm text-gray-600">Pobre/Sin servicio</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
