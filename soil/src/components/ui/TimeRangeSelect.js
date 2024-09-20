const TimeRangeSelect = ({ timeRange, setTimeRange }) => (
    <select 
      value={timeRange} 
      onChange={(e) => setTimeRange(e.target.value)}
      className="p-2 border rounded"
    >
      <option value="daily">Daily</option>
      <option value="weekly">Weekly</option>
      <option value="monthly">Monthly</option>
    </select>
  );
  
  export default TimeRangeSelect;
  