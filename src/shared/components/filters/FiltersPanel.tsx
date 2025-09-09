import { useEditorStore } from '../../store/editorStore'
import { filterPresets } from '../../../features/filters/filterPresets'
import type { PresetFilter } from '../../../features/filters/filterUtils'
import { Button } from '../ui/Button'
import { Tooltip } from '../ui/Tooltip'

const filters: Array<{ id: string; filter: PresetFilter }> = [
  {
    id: 'original',
    filter: null,
  },
  ...Object.entries(filterPresets).map(([key]) => ({
    id: key,
    filter: key as PresetFilter,
  })),
]

export const FiltersPanel = () => {
  const { activeFilter, setActiveFilter } = useEditorStore()

  return (
    <div className="grid grid-cols-2 gap-2">
      {filters.map((filter) => {
        const preset = filter.filter ? filterPresets[filter.filter] : { name: 'Original', description: 'No filter applied', icon: '⭐' }
        return (
          <Tooltip key={filter.id} content={preset.description}>
            <Button
              variant="default"
              size="lg"
              isActive={activeFilter === filter.filter}
              onClick={() => setActiveFilter(filter.filter)}
              className="flex-col h-auto py-3"
            >
              <span className="text-xl block mb-1">{preset.icon}</span>
              <span className="font-medium text-sm">{preset.name}</span>
            </Button>
          </Tooltip>
        )
      })}
    </div>
  )
}
