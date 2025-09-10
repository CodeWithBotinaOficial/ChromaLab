import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../shared/components/ui/Tabs';
import { TextPanel } from '../textOverlay/components/TextPanel';
import { StickerPanel } from '../stickers/components/StickerPanel';
import { DrawingPanel } from '../drawing/components/DrawingPanel';
import { TemplatePanel } from '../templates/components/TemplatePanel';
import { SessionPanel } from '../persistence/components/SessionPanel';
import { TransformPanel } from '../../shared/components/transform/TransformPanel';
import { FiltersPanel } from '../../shared/components/filters/FiltersPanel';
import { AdjustmentsPanel } from '../../shared/components/adjustments/AdjustmentsPanel';
import { CropPanel } from '../editor/components/CropPanel'; // New CropPanel
import { Button } from '../../shared/components/ui/Button';
import { useEditorStore } from '../../shared/store/editorStore'; // For export

export const ToolsSidebar: React.FC = () => {
  const exportImage = useEditorStore((state) => state.exportImage);

  const handleExport = () => {
    exportImage('image/png');
  };

  return (
    <div className="w-80 bg-background-primary text-white border-l border-gray-700 flex flex-col">
      <Tabs defaultValue="core-tools">
        <TabsList>
          <TabsTrigger value="core-tools">Core Tools</TabsTrigger>
          <TabsTrigger value="creative-tools">Creative Tools</TabsTrigger>
          <TabsTrigger value="session">Session</TabsTrigger>
        </TabsList>
        <TabsContent value="core-tools">
          <TransformPanel />
          <FiltersPanel />
          <AdjustmentsPanel />
          <CropPanel />
        </TabsContent>
        <TabsContent value="creative-tools">
          <TextPanel />
          <StickerPanel />
          <DrawingPanel />
          <TemplatePanel />
        </TabsContent>
        <TabsContent value="session">
          <SessionPanel />
          <div className="p-4 border-t border-gray-700">
            <h3 className="text-lg font-semibold mb-2">Export Image</h3>
            <Button onClick={handleExport} className="w-full">Export as PNG</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};