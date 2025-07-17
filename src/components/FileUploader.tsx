
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { X, Upload, FileText } from 'lucide-react';

interface FileUploaderProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (data: any[]) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  isOpen,
  onClose,
  onUpload,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === 'application/json' || selectedFile.name.endsWith('.json')) {
        setFile(selectedFile);
        setError(null);
      } else {
        setError('Por favor, selecciona un archivo JSON válido.');
        setFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Por favor, selecciona un archivo.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      // Validate the data structure
      if (!Array.isArray(data)) {
        throw new Error('El archivo debe contener un array de objetos.');
      }

      // Validate each object has the required fields
      const requiredFields = [
        'cellId', 'connectionType', 'lac', 'latitude', 'longitude',
        'networkType', 'operatorName', 'signalLevel', 'signalStrength',
        'asu', 'timestamp'
      ];

      const isValid = data.every(item => 
        requiredFields.every(field => field in item)
      );

      if (!isValid) {
        throw new Error('Los datos no tienen la estructura correcta. Campos requeridos: ' + requiredFields.join(', '));
      }

      onUpload(data);
      setFile(null);
      console.log(`Cargados ${data.length} puntos de datos celulares`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar el archivo.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFile(null);
    setError(null);
    setIsLoading(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[2000]">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-bold text-green-800">Cargar Archivo GeoJSON</h2>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X size={20} />
          </Button>
        </div>

        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="file-upload">Seleccionar archivo JSON</Label>
            <Input
              id="file-upload"
              type="file"
              accept=".json,application/json"
              onChange={handleFileChange}
              className="cursor-pointer"
            />
          </div>

          {file && (
            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
              <FileText size={16} className="text-green-600" />
              <span className="text-sm text-green-800">{file.name}</span>
              <span className="text-xs text-green-600">
                ({(file.size / 1024).toFixed(1)} KB)
              </span>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="text-sm text-gray-600">
            <p className="font-medium mb-2">Formato esperado:</p>
            <pre className="bg-gray-50 p-2 rounded text-xs overflow-x-auto">
{`[
  {
    "cellId": "71721236",
    "connectionType": "Cellular",
    "lac": "28600",
    "latitude": 40.37436343,
    "longitude": -3.63064727,
    "networkType": "LTE",
    "operatorName": "Movistar",
    "signalLevel": 1,
    "signalStrength": -109,
    "asu": 80,
    "timestamp": "2025-07-16 19:01:23"
  }
]`}
            </pre>
          </div>
        </div>

        <div className="flex gap-2 p-6 border-t">
          <Button variant="outline" onClick={handleClose} className="flex-1">
            Cancelar
          </Button>
          <Button 
            onClick={handleUpload} 
            disabled={!file || isLoading}
            className="flex-1 bg-green-600 hover:bg-green-700"
          >
            {isLoading ? (
              <>
                <Upload size={16} className="mr-2 animate-spin" />
                Cargando...
              </>
            ) : (
              <>
                <Upload size={16} className="mr-2" />
                Cargar Datos
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
