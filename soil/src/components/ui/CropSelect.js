const CropSelect = ({ selectedCrop, setSelectedCrop }) => (
    <select 
      value={selectedCrop} 
      onChange={(e) => setSelectedCrop(e.target.value)}
      className="p-2 border rounded"
    >
      <option value="corn">Corn</option>
      <option value="wheat">Wheat</option>
      <option value="soybean">Soybean</option>
    </select>
  );
  
  export default CropSelect;
  