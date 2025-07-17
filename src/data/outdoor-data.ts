
export const geoJsonData = {
  type: "FeatureCollection",
  features: [
    // Points of Interest
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-3.7038, 40.4168] // Madrid area
      },
      properties: {
        nombre: "Refugio de Peñalara",
        descripcion: "Refugio de montaña situado en la Sierra de Guadarrama, perfecto para excursiones de alta montaña. Ofrece alojamiento básico y es punto de partida para rutas hacia el pico Peñalara.",
        imagen: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
        coordenadas: [-3.7038, 40.4168],
        operador: "Federación Madrileña de Montañismo",
        db: "refugios",
        level: "Intermedio"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-4.1198, 40.9701] // Segovia area
      },
      properties: {
        nombre: "Sendero de La Mujer Muerta",
        descripcion: "Ruta circular de dificultad media que recorre la silueta de La Mujer Muerta en la Sierra de Guadarrama. Espectaculares vistas panorámicas y bosques de pino silvestre.",
        imagen: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
        coordenadas: [-4.1198, 40.9701],
        operador: "Parque Nacional Sierra de Guadarrama",
        db: "senderos",
        level: "Intermedio"
      }
    },
    {
      type: "Feature", 
      geometry: {
        type: "Point",
        coordinates: [-5.6640, 43.0378] // Asturias
      },
      properties: {
        nombre: "Mirador del Naranjo de Bulnes",
        descripcion: "Impresionante mirador con vistas al emblemático Naranjo de Bulnes en los Picos de Europa. Accesible mediante teleférico desde Fuente Dé.",
        imagen: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
        coordenadas: [-5.6640, 43.0378],
        operador: "Parque Nacional Picos de Europa",
        db: "miradores", 
        level: "Fácil"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-1.6057, 42.6953] // Navarra
      },
      properties: {
        nombre: "Camping Urrobi",
        descripcion: "Camping ecológico en pleno corazón del Valle de Erro, rodeado de hayedos centenarios. Ideal para familias y amantes de la naturaleza.",
        imagen: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
        coordenadas: [-1.6057, 42.6953],
        operador: "Camping Urrobi S.L.",
        db: "campings",
        level: "Fácil"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [0.6391, 42.6952] // Pirineos
      },
      properties: {
        nombre: "Refugio de Góriz",
        descripcion: "Refugio guardado en el corazón del Parque Nacional de Ordesa y Monte Perdido. Base perfecta para ascensiones al Monte Perdido y explorar el circo de Góriz.",
        imagen: "https://images.unsplash.com/photo-1464822759844-d150ad6d0cde?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
        coordenadas: [0.6391, 42.6952],
        operador: "Federación Aragonesa de Montañismo",
        db: "refugios",
        level: "Avanzado"
      }
    },

    // Polygon Areas
    {
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-4.5, 40.0],
          [-3.0, 40.0], 
          [-3.0, 41.2],
          [-4.5, 41.2],
          [-4.5, 40.0]
        ]]
      },
      properties: {
        nombre: "Sierra de Guadarrama"
      }
    },
    {
      type: "Feature", 
      geometry: {
        type: "Polygon",
        coordinates: [[
          [-6.0, 42.8],
          [-4.8, 42.8],
          [-4.8, 43.5],
          [-6.0, 43.5], 
          [-6.0, 42.8]
        ]]
      },
      properties: {
        nombre: "Picos de Europa"
      }
    },
    {
      type: "Feature",
      geometry: {
        type: "Polygon", 
        coordinates: [[
          [-0.5, 42.4],
          [1.2, 42.4],
          [1.2, 43.0],
          [-0.5, 43.0],
          [-0.5, 42.4]
        ]]
      },
      properties: {
        nombre: "Pirineos Centrales"
      }
    }
  ]
};
