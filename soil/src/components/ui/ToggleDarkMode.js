import { Sun, Moon } from 'lucide-react';
import * as Switch from '@radix-ui/react-switch';

const ToggleDarkMode = ({ darkMode, toggleDarkMode }) => (
  <div className="flex items-center space-x-2">
    <Sun className={`h-4 w-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
    <Switch.Root checked={darkMode} onCheckedChange={toggleDarkMode} className="SwitchRoot">
      <Switch.Thumb className="SwitchThumb" />
    </Switch.Root>
    <Moon className={`h-4 w-4 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
  </div>
);

export default ToggleDarkMode;
