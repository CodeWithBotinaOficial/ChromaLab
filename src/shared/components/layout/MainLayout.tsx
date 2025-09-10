import * as React from 'react'
import { cn } from '../../../lib/utils'
import { PanelLeft, PanelRight } from 'lucide-react'

interface MainLayoutProps {
  leftSidebar?: React.ReactNode
  rightSidebar?: React.ReactNode
  children: React.ReactNode
}

export const MainLayout = ({ leftSidebar, rightSidebar, children }: MainLayoutProps) => {
  const [isLeftSidebarCollapsed, setIsLeftSidebarCollapsed] = React.useState(false)
  const [isRightSidebarCollapsed, setIsRightSidebarCollapsed] = React.useState(true)

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left Sidebar */}
      {leftSidebar && (
        <div
          className={cn(
            'flex-shrink-0 bg-background-secondary transition-all duration-300',
            isLeftSidebarCollapsed ? 'w-0' : 'w-80'
          )}
        >
          <div className="h-full overflow-auto">
            {leftSidebar}
          </div>
        </div>
      )}

      {/* Toggle Button Left */}
      {leftSidebar && (
        <button
          className="absolute left-2 top-20 z-50 p-2 rounded-full bg-background-secondary text-gray-light hover:bg-accent-blue/20 transition-colors duration-200"
          onClick={() => setIsLeftSidebarCollapsed(!isLeftSidebarCollapsed)}
          title={isLeftSidebarCollapsed ? 'Show Left Sidebar' : 'Hide Left Sidebar'}
        >
          <PanelLeft className={cn(
            'w-5 h-5 transition-transform duration-300',
            isLeftSidebarCollapsed ? 'rotate-180' : ''
          )} />
        </button>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {children}
      </main>

      {/* Right Sidebar */}
      <div
        className={cn(
          'flex-shrink-0 bg-background-secondary transition-all duration-300 relative',
          isRightSidebarCollapsed ? 'w-0' : 'w-72'
        )}
      >
        <div className="h-full overflow-auto">
          {rightSidebar}
        </div>
        {/* Toggle Button Right */}
        <button
          className="absolute -left-4 top-1/2 -translate-y-1/2 z-50 p-2 rounded-full bg-background-primary text-gray-light hover:bg-accent-blue/20 transition-colors duration-200"
          onClick={() => setIsRightSidebarCollapsed(!isRightSidebarCollapsed)}
          title={isRightSidebarCollapsed ? 'Show Right Sidebar' : 'Hide Right Sidebar'}
        >
          <PanelRight className={cn(
            'w-5 h-5 transition-transform duration-300',
            isRightSidebarCollapsed ? '' : 'rotate-180'
          )} />
        </button>
      </div>
    </div>
  )
}
