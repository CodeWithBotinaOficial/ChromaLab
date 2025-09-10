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

export const ToolsSidebar: React.FC = () => {
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
        </TabsContent>
      </Tabs>
    </div>
  );
};