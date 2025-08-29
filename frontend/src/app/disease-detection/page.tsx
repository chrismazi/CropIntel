'use client';

import { useState } from 'react';

export default function DiseaseDetection() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;
    
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      
      const response = await fetch('http://localhost:8000/api/v1/pest_disease/predict', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getHealthStatus = (className: string) => {
    if (className.toLowerCase().includes('healthy')) {
      return { status: 'Healthy', color: 'green', icon: '✅' };
    } else {
      return { status: 'Disease Detected', color: 'red', icon: '⚠️' };
    }
  };

  const formatClassName = (className: string) => {
    return className.replace(/_/g, ' ').replace(/___/g, ' - ');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-red-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-green-800 mb-8">
          🔬 Plant Disease Detection
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Upload Plant Image</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  {preview ? (
                    <div className="space-y-4">
                      <img 
                        src={preview} 
                        alt="Preview" 
                        className="max-w-full max-h-64 mx-auto rounded-lg"
                      />
                      <p className="text-sm text-gray-600">Click to change image</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-6xl">📸</div>
                      <div>
                        <p className="text-lg font-medium text-gray-700">
                          Click to upload plant image
                        </p>
                        <p className="text-sm text-gray-500">
                          Supports JPG, PNG, and other image formats
                        </p>
                      </div>
                    </div>
                  )}
                </label>
              </div>
              
              <button
                type="submit"
                disabled={!selectedFile || loading}
                className="w-full bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
              >
                {loading ? 'Analyzing Image...' : 'Detect Disease'}
              </button>
            </form>
            
            <div className="mt-6 text-sm text-gray-600">
              <h3 className="font-semibold mb-2">Tips for best results:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li>Use clear, well-lit images</li>
                <li>Focus on affected plant parts</li>
                <li>Avoid blurry or dark images</li>
                <li>Include leaves, fruits, or stems showing symptoms</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Detection Results</h2>
            
            {result ? (
              <div className="space-y-6">
                <div className={`border-l-4 p-4 rounded ${
                  getHealthStatus(result.class_name).color === 'green' 
                    ? 'bg-green-100 border-green-500' 
                    : 'bg-red-100 border-red-500'
                }`}>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-2xl">{getHealthStatus(result.class_name).icon}</span>
                    <h3 className={`text-lg font-semibold ${
                      getHealthStatus(result.class_name).color === 'green' 
                        ? 'text-green-800' 
                        : 'text-red-800'
                    }`}>
                      {getHealthStatus(result.class_name).status}
                    </h3>
                  </div>
                  <p className="text-gray-700 font-medium">
                    {formatClassName(result.class_name)}
                  </p>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Confidence Level</h4>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${(result.confidence * 100).toFixed(1)}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {(result.confidence * 100).toFixed(1)}% confident
                  </p>
                </div>
                
                {getHealthStatus(result.class_name).status === 'Disease Detected' && (
                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">⚡ Quick Actions</h4>
                    <ul className="text-sm text-yellow-700 space-y-1">
                      <li>• Isolate affected plants immediately</li>
                      <li>• Remove and dispose of infected plant parts</li>
                      <li>• Apply appropriate fungicide or treatment</li>
                      <li>• Monitor surrounding plants for symptoms</li>
                      <li>• Consult with local agricultural extension office</li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center text-gray-500 py-8">
                <div className="text-6xl mb-4">🌿</div>
                <p>Upload a plant image to detect diseases and get instant AI-powered analysis.</p>
                <p className="text-sm mt-2">Our AI can identify 38+ different plant diseases and conditions.</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <a 
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </div>
  );
}
