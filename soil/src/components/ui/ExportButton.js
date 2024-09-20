import { Download } from 'lucide-react';

const ExportButton = ({ exportData }) => (
  <button onClick={() => exportData('csv')} className="flex items-center bg-green-600 text-white p-2 rounded">
    <Download className="mr-2 h-4 w-4" /> Export
  </button>
);

export default ExportButton;
