import { cn } from '../../utils/cn'
import { Toolbar } from '../toolbar/Toolbar'
import { Image } from 'lucide-react'

interface HeaderProps {
  className?: string
}

export const Header = ({ className }: HeaderProps) => {
  return (
    <header className={cn('flex items-center justify-between p-4 bg-background-secondary border-b border-background-primary', className)}>
      {/* Logo and Title */}
      <div className="flex items-center space-x-2">
        <div className="p-2 rounded-md bg-accent-blue/10">
          <Image className="w-6 h-6 text-accent-blue" />
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-gray-light">ChromaLab</h1>
          <p className="text-xs text-gray-400">Professional Image Editor</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        <Toolbar />
      </div>
    </header>
  )
}
