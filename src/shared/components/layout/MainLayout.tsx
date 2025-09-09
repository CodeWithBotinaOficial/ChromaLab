import * as React from 'react'
import { cn } from '../../../lib/utils'
import { PanelLeft } from 'lucide-react'

interface MainLayoutProps {
  sidebar: React.ReactNode
  children: React.ReactNode
}

export const MainLayout = ({ sidebar, children }: MainLayoutProps) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false)

  return (
    <div className="flex h-full overflow-hidden">
      {/* Sidebar */}
      <div
        className={cn(
          'flex-shrink-0 bg-background-secondary transition-all duration-300',
          isSidebarCollapsed ? 'w-0' : 'w-72'
        )}
      >
        <div className="h-full overflow-auto">
          {sidebar}
        </div>
      </div>

      {/* Toggle Button */}
      <button
        className="absolute left-2 top-20 z-50 p-2 rounded-full bg-background-secondary text-gray-light hover:bg-accent-blue/20 transition-colors duration-200"
        onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        title={isSidebarCollapsed ? 'Show Sidebar' : 'Hide Sidebar'}
      >
        <PanelLeft className={cn(
          'w-5 h-5 transition-transform duration-300',
          isSidebarCollapsed ? 'rotate-180' : ''
        )} />
      </button>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  )
}
