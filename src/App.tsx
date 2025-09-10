import { ImageEditor } from './features/editor/ImageEditor'
import { Sidebar } from './shared/components/Sidebar'
import { Header } from './shared/components/layout/Header'
import { MainLayout } from './shared/components/layout/MainLayout'
import { useKeyboardShortcuts } from './shared/hooks/useKeyboardShortcuts'
 

export default function App() {
  useKeyboardShortcuts()

  return (
    <div className="flex flex-col h-screen bg-background-primary">
      <Header />
      <MainLayout
        sidebar={<Sidebar />}
      >
        <ImageEditor />
      </MainLayout>
    </div>
  )
}
