import { FiltersPanel } from './filters/FiltersPanel'
import { AdjustmentsPanel } from './adjustments/AdjustmentsPanel'
import { TransformPanel } from './transform/TransformPanel'
import { ToolPanel } from './ui/ToolPanel'
 

export const Sidebar = () => {
  return (
    <div className="h-full overflow-y-auto">
      <ToolPanel title="Filters">
        <FiltersPanel />
      </ToolPanel>
      
      <ToolPanel title="Adjustments">
        <AdjustmentsPanel />
      </ToolPanel>
      
      <ToolPanel title="Transform">
        <TransformPanel />
      </ToolPanel>
    </div>
  )
}
