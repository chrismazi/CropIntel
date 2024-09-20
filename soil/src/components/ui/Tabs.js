import * as Tabs from '@radix-ui/react-tabs';

const TabMenu = ({ activeTab, setActiveTab, children }) => (
  <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
    <Tabs.List className="flex mb-4">
      <Tabs.Trigger value="overview" className={`px-4 py-2 ${activeTab === 'overview' ? 'bg-green-600 text-white' : 'bg-green-200 text-green-800'} rounded-t-lg`}>Overview</Tabs.Trigger>
      <Tabs.Trigger value="soil-health" className={`px-4 py-2 ${activeTab === 'soil-health' ? 'bg-green-600 text-white' : 'bg-green-200 text-green-800'} rounded-t-lg`}>Soil Health</Tabs.Trigger>
      <Tabs.Trigger value="nutrients" className={`px-4 py-2 ${activeTab === 'nutrients' ? 'bg-green-600 text-white' : 'bg-green-200 text-green-800'} rounded-t-lg`}>Nutrients</Tabs.Trigger>
      <Tabs.Trigger value="environmental" className={`px-4 py-2 ${activeTab === 'environmental' ? 'bg-green-600 text-white' : 'bg-green-200 text-green-800'} rounded-t-lg`}>Environmental</Tabs.Trigger>
    </Tabs.List>
    {children}
  </Tabs.Root>
);

export default TabMenu;
