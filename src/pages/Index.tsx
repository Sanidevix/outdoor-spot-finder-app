
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Sidebar } from '../components/Sidebar';
import { Header } from '../components/Header';
import { geoJsonData } from '../data/outdoor-data';
import { RotateCcw, Mountain } from 'lucide-react';

// Fix for default markers
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Index = () => {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [filteredPoints, setFilteredPoints] = useState(geoJsonData.features);
  const [selectedArea, setSelectedArea] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const mapRef = useRef(null);

  const resetView = () => {
    setFilteredPoints(geoJsonData.features);
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

  const handleAreaClick = (area) => {
    setSelectedArea(area);
    // Filter points that are within the selected area
    const pointsInArea = geoJsonData.features.filter(feature => {
      if (feature.geometry.type !== 'Point') return false;
      
      const point = L.latLng(
        feature.geometry.coordinates[1], 
        feature.geometry.coordinates[0]
      );
      
      // Simple bounding box check for demo
      const bounds = L.geoJSON(area).getBounds();
      return bounds.contains(point);
    });
    
    setFilteredPoints(pointsInArea);
    setIsSidebarOpen(false);
  };

  const getMarkerIcon = (db) => {
    const colors = {
      'refugios': '#8B4513',
      'senderos': '#228B22', 
      'miradores': '#4169E1',
      'campings': '#DAA520'
    };
    
    return new L.Icon({
      iconUrl: `data:image/svg+xml;base64,${btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
          <circle cx="12" cy="12" r="10" fill="${colors[db] || '#666'}" stroke="#fff" stroke-width="2"/>
          <circle cx="12" cy="12" r="3" fill="#fff"/>
        </svg>
      `)}`,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
    });
  };

  const pointToLayer = (feature, latlng) => {
    return L.marker(latlng, {
      icon: getMarkerIcon(feature.properties.db)
    });
  };

  const onEachFeature = (feature, layer) => {
    if (feature.geometry.type === 'Point') {
      layer.bindPopup(`<strong>${feature.properties.nombre}</strong>`);
      layer.on('click', () => handlePointClick(feature.properties));
    } else if (feature.geometry.type === 'Polygon') {
      layer.setStyle({
        fillColor: '#90EE90',
        weight: 2,
        opacity: 1,
        color: '#228B22',
        fillOpacity: 0.3
      });
      layer.bindPopup(`<strong>Área: ${feature.properties.nombre}</strong>`);
      layer.on('click', () => handleAreaClick(feature));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-green-50">
      <Header />
      
      <div className="relative">
        {/* Map Container */}
        <div className="h-[70vh] w-full relative">
          <MapContainer
            center={[40.4168, -3.7038]}
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
                  return (
                    <Marker
                      key={index}
                      position={[lat, lng]}
                      icon={getMarkerIcon(feature.properties.db)}
                      eventHandlers={{
                        click: () => handlePointClick(feature.properties),
                      }}
                    >
                      <Popup>
                        <div className="text-center">
                          <h3 className="font-bold text-green-800">{feature.properties.nombre}</h3>
                          <p className="text-sm text-gray-600">{feature.properties.descripcion?.substring(0, 100)}...</p>
                        </div>
                      </Popup>
                    </Marker>
                  );
                }
                return null;
              })}
            </MarkerClusterGroup>

            <GeoJSON
              data={{
                type: 'FeatureCollection',
                features: geoJsonData.features.filter(f => f.geometry.type === 'Polygon')
              }}
              onEachFeature={onEachFeature}
            />
          </MapContainer>

          {/* Reset Button */}
          <button
            onClick={resetView}
            className="absolute top-4 right-4 z-[1000] bg-green-700 hover:bg-green-800 text-white p-3 rounded-full shadow-lg transition-colors"
            title="Reiniciar vista"
          >
            <RotateCcw size={20} />
          </button>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 z-[1000] bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-lg">
            <h4 className="font-bold text-green-800 mb-2 flex items-center gap-2">
              <Mountain size={16} />
              Leyenda
            </h4>
            <div className="space-y-1 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-amber-600"></div>
                <span>Refugios</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-green-600"></div>
                <span>Senderos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-600"></div>
                <span>Miradores</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-yellow-600"></div>
                <span>Campings</span>
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

        {/* Stats */}
        <div className="bg-white/80 backdrop-blur-sm p-6 mx-4 -mt-8 relative z-10 rounded-lg shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-green-700">{filteredPoints.filter(f => f.geometry.type === 'Point').length}</p>
              <p className="text-sm text-gray-600">Puntos mostrados</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-blue-700">{geoJsonData.features.filter(f => f.geometry.type === 'Polygon').length}</p>
              <p className="text-sm text-gray-600">Áreas disponibles</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-amber-700">
                {filteredPoints.filter(f => f.properties?.db === 'refugios').length}
              </p>
              <p className="text-sm text-gray-600">Refugios</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-700">
                {filteredPoints.filter(f => f.properties?.db === 'senderos').length}
              </p>
              <p className="text-sm text-gray-600">Senderos</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
