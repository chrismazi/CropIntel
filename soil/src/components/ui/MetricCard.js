import { Droplet, Thermometer, Leaf } from 'lucide-react';

const MetricCard = ({ title, value, unit, icon: Icon }) => (
  <div className="bg-green-50 p-4 rounded-lg shadow">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-sm font-medium">{title}</h3>
      {Icon && <Icon className="h-4 w-4 text-green-500" />}
    </div>
    <p className="text-2xl font-bold text-green-700">{value}{unit}</p>
  </div>
);

export default MetricCard;
