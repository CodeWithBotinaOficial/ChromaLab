import * as React from 'react'
import { cn } from '../../utils/cn'
import { ChevronDown } from 'lucide-react'

interface ToolPanelProps {
  title: string
  children: React.ReactNode
  defaultExpanded?: boolean
  className?: string
}

export const ToolPanel = ({
  title,
  children,
  defaultExpanded = true,
  className,
}: ToolPanelProps) => {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded)

  return (
    <div className={cn('border-b border-background-primary', className)}>
      <button
        className="flex items-center justify-between w-full p-4 text-left"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg font-semibold text-gray-light">{title}</h3>
        <ChevronDown
          className={cn(
            'w-5 h-5 text-gray-400 transition-transform duration-200',
            isExpanded ? 'transform rotate-180' : ''
          )}
        />
      </button>
      
      {isExpanded && (
        <div className="p-4 pt-0 space-y-4">
          {children}
        </div>
      )}
    </div>
  )
}
