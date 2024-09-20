import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Droplet, Thermometer, Leaf, Wind, Download, Sun, Moon } from 'lucide-react';

// Mock data
const soilData = [
  { month: 'Jan', moisture: 30, pH: 6.5, nitrogen: 20, phosphorus: 15, potassium: 150, organicMatter: 3.5, cec: 15, ec: 1.2, temperature: 10, compaction: 1.3, erosionRisk: 'Low' },
  { month: 'Feb', moisture: 28, pH: 6.7, nitrogen: 22, phosphorus: 16, potassium: 155, organicMatter: 3.6, cec: 16, ec: 1.3, temperature: 12, compaction: 1.2, erosionRisk: 'Low' },
  { month: 'Mar', moisture: 32, pH: 6.6, nitrogen: 21, phosphorus: 17, potassium: 160, organicMatter: 3.7, cec: 15, ec: 1.2, temperature: 15, compaction: 1.4, erosionRisk: 'Medium' },
  { month: 'Apr', moisture: 35, pH: 6.8, nitrogen: 23, phosphorus: 18, potassium: 165, organicMatter: 3.8, cec: 17, ec: 1.4, temperature: 18, compaction: 1.3, erosionRisk: 'Low' },
  { month: 'May', moisture: 40, pH: 7.0, nitrogen: 25, phosphorus: 19, potassium: 170, organicMatter: 3.9, cec: 18, ec: 1.5, temperature: 22, compaction: 1.2, erosionRisk: 'Low' },
  { month: 'Jun', moisture: 38, pH: 6.9, nitrogen: 24, phosphorus: 20, potassium: 175, organicMatter: 4.0, cec: 17, ec: 1.3, temperature: 25, compaction: 1.5, erosionRisk: 'Medium' }
];

const soilComposition = [
  { name: 'Sand', value: 40 },
  { name: 'Silt', value: 40 },
  { name: 'Clay', value: 20 }
];

const COLORS = ['#004d00', '#008000', '#00b300', '#00e600'];

const MetricCard = ({ title, value, unit, icon: Icon }) => (
  <div className="bg-green-50 p-4 rounded-lg shadow">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-sm font-medium">{title}</h3>
      {Icon && <Icon className="h-4 w-4 text-green-500" />}
    </div>
    <p className="text-2xl font-bold text-green-700">{value}{unit}</p>
  </div>
);

const SoilChart = ({ data, dataKey }) => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey={dataKey} stroke="#008000" activeDot={{ r: 8 }} />
    </LineChart>
  </ResponsiveContainer>
);

const SoilCompositionChart = ({ data }) => (
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={data}
        cx="50%"
        cy="50%"
        labelLine={false}
        outerRadius={80}
        fill="#008000"
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
);

const SoilHealthRadar = ({ data }) => {
  const latestData = data[data.length - 1];
  const radarData = [
    { subject: 'pH', A: latestData.pH, fullMark: 14 },
    { subject: 'Moisture', A: latestData.moisture, fullMark: 100 },
    { subject: 'Nitrogen', A: latestData.nitrogen, fullMark: 50 },
    { subject: 'Phosphorus', A: latestData.phosphorus, fullMark: 50 },
    { subject: 'Potassium', A: latestData.potassium, fullMark: 300 },
    { subject: 'Organic Matter', A: latestData.organicMatter, fullMark: 10 }
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis />
        <Radar name="Soil Health" dataKey="A" stroke="#008000" fill="#008000" fillOpacity={0.6} />
      </RadarChart>
    </ResponsiveContainer>
  );
};

const CropRecommendationDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedCrop, setSelectedCrop] = useState("corn");
  const [timeRange, setTimeRange] = useState("monthly");
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark');
  };

  const exportData = (format) => {
    console.log(`Exporting data in ${format} format`);
  };

  return (
    <div className={`p-4 space-y-4 ${darkMode ? 'dark bg-green-900' : 'bg-green-50'}`}>
      <div className="flex justify-between items-center">
        <h1 className={`text-3xl font-bold mb-4 ${darkMode ? 'text-green-200' : 'text-green-800'}`}>Crop Recommendation Dashboard</h1>
        <div className="flex items-center space-x-4">
          <select 
            value={selectedCrop} 
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="corn">Corn</option>
            <option value="wheat">Wheat</option>
            <option value="soybean">Soybean</option>
          </select>
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <button 
            onClick={() => exportData('csv')} 
            className="flex items-center bg-green-600 text-white p-2 rounded"
          >
            <Download className="mr-2 h-4 w-4" /> Export
          </button>
          <div className="flex items-center space-x-2">
            <Sun className={`h-4 w-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
            <input
              type="checkbox"
              checked={darkMode}
              onChange={toggleDarkMode}
              className="toggle"
            />
            <Moon className={`h-4 w-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
          </div>
        </div>
      </div>

      <div>
        <div className="flex mb-4">
          {['overview', 'soil-health', 'nutrients', 'environmental'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 ${activeTab === tab ? 'bg-green-600 text-white' : 'bg-green-200 text-green-800'} rounded-t-lg`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === "overview" && (
              <div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <MetricCard title="Soil Moisture" value={soilData[soilData.length - 1].moisture} unit="%" icon={Droplet} />
                  <MetricCard title="Soil pH" value={soilData[soilData.length - 1].pH} unit="" />
                  <MetricCard title="Organic Matter" value={soilData[soilData.length - 1].organicMatter} unit="%" icon={Leaf} />
                  <MetricCard title="Temperature" value={soilData[soilData.length - 1].temperature} unit="°C" icon={Thermometer} />
                </div>
                <div className="mt-4">
                  <SoilHealthRadar data={soilData} />
                </div>
              </div>
            )}

            {activeTab === "soil-health" && (
              <div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <MetricCard title="CEC" value={soilData[soilData.length - 1].cec} unit="meq/100g" />
                  <MetricCard title="EC" value={soilData[soilData.length - 1].ec} unit="dS/m" />
                  <MetricCard title="Compaction" value={soilData[soilData.length - 1].compaction} unit="g/cm³" />
                </div>
                <div className="mt-4">
                  <SoilCompositionChart data={soilComposition} />
                </div>
              </div>
            )}

            {activeTab === "nutrients" && (
              <div>
                <div className="grid grid-cols-3 gap-4">
                  <MetricCard title="Nitrogen" value={soilData[soilData.length - 1].nitrogen} unit="mg/kg" icon={Leaf} />
                  <MetricCard title="Phosphorus" value={soilData[soilData.length - 1].phosphorus} unit="mg/kg" icon={Leaf} />
                  <MetricCard title="Potassium" value={soilData[soilData.length - 1].potassium} unit="mg/kg" icon={Leaf} />
                </div>
                <div className="mt-4">
                  <SoilChart data={soilData} dataKey="nitrogen" />
                </div>
              </div>
            )}

            {activeTab === "environmental" && (
              <div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <MetricCard title="Temperature" value={soilData[soilData.length - 1].temperature} unit="°C" icon={Thermometer} />
                  <MetricCard title="Wind Speed" value={soilData[soilData.length - 1].windSpeed || 5} unit="km/h" icon={Wind} />
                  <MetricCard title="Erosion Risk" value={soilData[soilData.length - 1].erosionRisk} unit="" />
                </div>
                <div className="mt-4">
                  <SoilChart data={soilData} dataKey="temperature" />
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CropRecommendationDashboard;