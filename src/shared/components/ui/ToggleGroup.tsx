
import * as React from 'react';
import { cn } from '../../utils/cn';

interface ToggleButtonProps {
  value: string;
  children: React.ReactNode;
  isActive: boolean;
  onClick: (value: string) => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ value, children, isActive, onClick }) => {
  return (
    <button
      onClick={() => onClick(value)}
      className={cn(
        'px-3 py-1 text-sm font-medium rounded-md',
        isActive ? 'bg-accent-blue text-white' : 'bg-background-secondary text-gray-light hover:bg-accent-blue/20'
      )}
    >
      {children}
    </button>
  );
};

interface ToggleGroupProps {
  label?: string;
  children: React.ReactElement<ToggleButtonProps> | React.ReactElement<ToggleButtonProps>[];
}

export const ToggleGroup: React.FC<ToggleGroupProps> = ({ label, children }) => {
  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-gray-light">{label}</label>}
      <div className="flex space-x-2">{children}</div>
    </div>
  );
};

export { ToggleButton };
