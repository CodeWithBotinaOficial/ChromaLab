import { useEditorStore } from '../../store/editorStore'
import { Slider } from '../Slider'

export const AdjustmentsPanel = () => {
  const { adjustments, updateAdjustment } = useEditorStore()

  return (
    <div className="space-y-6 p-4">
      <h3 className="text-lg font-semibold text-gray-light">Adjustments</h3>
      
      <div className="space-y-6">
        {/* Basic Adjustments */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-400">Basic</h4>
          <Slider
            label="Brightness"
            value={adjustments.brightness}
            defaultValue={100}
            min={0}
            max={200}
            step={1}
            onChange={(value) => updateAdjustment('brightness', value)}
          />
          
          <Slider
            label="Contrast"
            value={adjustments.contrast}
            defaultValue={100}
            min={0}
            max={200}
            step={1}
            onChange={(value) => updateAdjustment('contrast', value)}
          />
          
          <Slider
            label="Saturation"
            value={adjustments.saturation}
            defaultValue={100}
            min={0}
            max={200}
            step={1}
            onChange={(value) => updateAdjustment('saturation', value)}
          />
        </div>

        {/* Color Adjustments */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-400">Color</h4>
          <Slider
            label="Hue"
            value={adjustments.hue}
            defaultValue={0}
            min={-180}
            max={180}
            step={1}
            onChange={(value) => updateAdjustment('hue', value)}
          />
          
          <Slider
            label="White Point"
            value={adjustments.whitePoint}
            defaultValue={100}
            min={0}
            max={100}
            step={1}
            onChange={(value) => updateAdjustment('whitePoint', value)}
          />
          
          <Slider
            label="Black Point"
            value={adjustments.blackPoint}
            defaultValue={0}
            min={0}
            max={100}
            step={1}
            onChange={(value) => updateAdjustment('blackPoint', value)}
          />
        </div>

        {/* Effects */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-gray-400">Effects</h4>
          <Slider
            label="Blur"
            value={adjustments.blur}
            defaultValue={0}
            min={0}
            max={20}
            step={0.5}
            onChange={(value) => updateAdjustment('blur', value)}
          />
          
          <Slider
            label="Noise"
            value={adjustments.noise}
            defaultValue={0}
            min={0}
            max={100}
            step={1}
            onChange={(value) => updateAdjustment('noise', value)}
          />
          
          <Slider
            label="Pixelate"
            value={adjustments.pixelate}
            defaultValue={1}
            min={1}
            max={40}
            step={1}
            onChange={(value) => updateAdjustment('pixelate', value)}
          />
        </div>
      </div>
    </div>
  )
}
