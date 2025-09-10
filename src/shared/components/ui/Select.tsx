
import * as React from 'react';
import { cn } from '../../utils/cn';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className, label, children, ...props }, ref) => {
  return (
    <div className="space-y-2">
      {label && <label className="text-sm font-medium text-gray-light">{label}</label>}
      <select
        ref={ref}
        className={cn(
          'w-full h-10 px-3 py-2 text-sm bg-background-secondary border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-blue',
          className
        )}
        {...props}
      >
        {children}
      </select>
    </div>
  );
});
