import { useRef } from 'react';
import { ImageEditor, type ImageEditorRef } from './features/editor/ImageEditor'
import { Sidebar } from './shared/components/Sidebar'
import { Header } from './shared/components/layout/Header'
import { MainLayout } from './shared/components/layout/MainLayout'
import { useKeyboardShortcuts } from './shared/hooks/useKeyboardShortcuts'
import { ToolsSidebar } from './features/sidebar/ToolsSidebar'
 

export default function App() {
  useKeyboardShortcuts()
  const imageEditorRef = useRef<ImageEditorRef>(null);

  const handleExportClick = () => {
    if (imageEditorRef.current) {
      imageEditorRef.current.handleExport();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background-primary">
      <Header onExport={handleExportClick} />
      <MainLayout
        leftSidebar={<ToolsSidebar />}
        rightSidebar={<Sidebar />}
      >
        <ImageEditor ref={imageEditorRef} />
      </MainLayout>
    </div>
  )
}
