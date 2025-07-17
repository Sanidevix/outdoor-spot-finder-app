
# 🏔️ Outdoor Explorer - Aplicación Web Interactiva

Una aplicación web responsive orientada a actividades outdoor que permite explorar refugios, senderos, miradores y campings a través de un mapa interactivo con datos geoespaciales.

## 🎯 Características Principales

- **Mapa Interactivo**: Powered by Leaflet.js con clustering automático de puntos
- **Datos GeoJSON**: Carga y visualización de puntos de interés y áreas geográficas
- **Filtrado Inteligente**: Selección de áreas para mostrar solo puntos contenidos
- **Panel Lateral**: Información detallada al hacer clic en cualquier punto
- **Diseño Responsive**: Optimizado para desktop, tablet y móvil
- **Estética Natural**: Colores inspirados en la naturaleza (verdes, ocres, azul cielo)

## 🧭 Funcionalidades

### Mapa
- Visualización de puntos con iconos diferenciados por categoría
- Clustering automático para mejor organización visual
- Popups informativos al pasar sobre los puntos
- Áreas seleccionables con filtrado automático
- Botón de "Reiniciar vista" para volver al mapa completo

### Interfaz
- **Header**: Imagen de fondo outdoor con título y descripción
- **Leyenda**: Código de colores para diferentes tipos de puntos
- **Estadísticas**: Contador dinámico de puntos y áreas mostradas
- **Sidebar**: Panel deslizable con información detallada de cada punto

## 🛠️ Tecnologías Utilizadas

- **React 18** - Framework principal
- **TypeScript** - Tipado estático
- **Leaflet.js** - Mapas interactivos
- **React-Leaflet** - Integración React + Leaflet
- **Tailwind CSS** - Estilos y diseño responsive
- **Vite** - Build tool y servidor de desarrollo
- **Lucide React** - Iconografía

## 📦 Estructura del Proyecto

```
src/
├── components/
│   ├── Header.tsx          # Cabecera con imagen de fondo
│   └── Sidebar.tsx         # Panel lateral de información
├── data/
│   └── outdoor-data.ts     # Datos GeoJSON con puntos y áreas
└── pages/
    └── Index.tsx           # Página principal con mapa
```

## 🚀 Instalación y Uso

### Requisitos Previos
- Node.js 16+ 
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd outdoor-explorer
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Iniciar servidor de desarrollo**
   ```bash
   npm run dev
   ```

4. **Abrir en navegador**
   ```
   http://localhost:8080
   ```

### Uso sin Servidor Local
Para usar sin servidor de desarrollo, simplemente abre `index.html` en cualquier navegador moderno.

## 📊 Datos Incluidos

### Puntos de Interés (5 ejemplos)
- **Refugio de Peñalara** (Sierra de Guadarrama) - Refugio de montaña
- **Sendero de La Mujer Muerta** (Segovia) - Ruta de senderismo  
- **Mirador del Naranjo de Bulnes** (Asturias) - Mirador panorámico
- **Camping Urrobi** (Navarra) - Camping ecológico
- **Refugio de Góriz** (Pirineos) - Refugio de alta montaña

### Áreas Geográficas (3 polígonos)
- Sierra de Guadarrama
- Picos de Europa  
- Pirineos Centrales

Cada punto incluye:
- Nombre y descripción detallada
- Coordenadas GPS
- Imagen representativa
- Operador/gestor
- Nivel de dificultad
- Categoría (db): refugios, senderos, miradores, campings

## 🎨 Diseño y UX

### Paleta de Colores
- **Verde Natural**: `#228B22` - Senderos y vegetación
- **Ocre Tierra**: `#DAA520` - Campings y naturaleza
- **Azul Cielo**: `#4169E1` - Miradores y agua
- **Marrón Refugio**: `#8B4513` - Refugios y construcciones

### Responsive Design
- **Mobile First**: Optimización para dispositivos móviles
- **Sidebar Adaptable**: Panel que se convierte en overlay en móviles
- **Controles Touch**: Optimizados para pantallas táctiles

## 🔧 Personalización

### Añadir Nuevos Puntos
Edita `src/data/outdoor-data.ts` y añade nuevos features al array:

```typescript
{
  type: "Feature",
  geometry: {
    type: "Point", 
    coordinates: [longitude, latitude]
  },
  properties: {
    nombre: "Nombre del lugar",
    descripcion: "Descripción detallada...",
    imagen: "URL de la imagen",
    operador: "Gestor del lugar",
    db: "categoria", // refugios, senderos, miradores, campings
    level: "Dificultad"
  }
}
```

### Modificar Estilos
Los estilos están definidos con Tailwind CSS en cada componente. Para cambiar colores o diseño, modifica las clases correspondientes.

## 📱 Capturas de Pantalla

*Las capturas se mostrarían aquí en un proyecto real*

## 🤝 Contribuir

1. Fork del proyecto
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

## 🙏 Reconocimientos

- Imágenes de [Unsplash](https://unsplash.com)
- Mapas base de [OpenStreetMap](https://www.openstreetmap.org)
- Iconos de [Lucide](https://lucide.dev)
- Desarrollado con [Lovable](https://lovable.dev)

---

**¡Disfruta explorando la naturaleza! 🌲🏔️**
