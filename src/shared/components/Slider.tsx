import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

interface SliderProps {
  label: string
  value: number
  defaultValue: number
  min: number
  max: number
  step: number
  onChange: (value: number) => void
}

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ label, value, defaultValue, min, max, step, onChange, ...props }, ref) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-light">
          {label}
        </label>
        <span className="text-sm text-gray-400">
          {value}
        </span>
      </div>
      <SliderPrimitive.Root
        ref={ref}
        className="relative flex w-full touch-none select-none items-center"
        value={[value]}
        defaultValue={[defaultValue]}
        max={max}
        min={min}
        step={step}
        onValueChange={(values) => onChange(values[0])}
        {...props}
      >
        <SliderPrimitive.Track className="relative h-1.5 w-full grow rounded-full bg-background-secondary">
          <SliderPrimitive.Range className="absolute h-full rounded-full bg-accent-blue" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-accent-blue bg-background-primary ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
      </SliderPrimitive.Root>
    </div>
  )
)
