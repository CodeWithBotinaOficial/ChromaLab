import Konva from 'konva'

// Filter Types
export type PresetFilter = 
  | 'black-and-white'
  | 'sepia'
  | 'vintage'
  | 'cool'
  | 'high-contrast'
  | 'vivid'
  | 'dramatic'
  | null

export interface FilterAdjustments {
  brightness: number   // 0-200 (100 is normal)
  contrast: number    // 0-200 (100 is normal)
  saturation: number  // 0-200 (100 is normal)
  blur: number        // 0-20
  hue: number         // -180 to 180
  noise: number       // 0-100
  pixelate: number    // 1-40
  whitePoint: number  // 0-100
  blackPoint: number  // 0-100
}

export interface FilterOptions {
  filter: PresetFilter
  adjustments: FilterAdjustments
}

// Utility Functions
const normalizeValue = (value: number, fromRange: [number, number], toRange: [number, number]): number => {
  const [fromMin, fromMax] = fromRange
  const [toMin, toMax] = toRange
  const normalizedValue = (value - fromMin) / (fromMax - fromMin)
  return toMin + normalizedValue * (toMax - toMin)
}

const filters = {
  'black-and-white': (imageNode: Konva.Image) => {
    imageNode.cache()
    imageNode.filters([Konva.Filters.Grayscale])
  },

  'sepia': (imageNode: Konva.Image) => {
    imageNode.cache()
    imageNode.filters([Konva.Filters.Sepia])
  },

  'vintage': (imageNode: Konva.Image) => {
    imageNode.cache()
    imageNode.filters([
      Konva.Filters.HSL,
      Konva.Filters.Contrast,
      Konva.Filters.Noise
    ])
    imageNode.saturation(0.3)  // Reduced saturation
    imageNode.contrast(0.1)    // Slight contrast
    imageNode.hue(10)         // Warm tint
    imageNode.noise(10)       // Film grain effect
  },

  'cool': (imageNode: Konva.Image) => {
    imageNode.cache()
    imageNode.filters([
      Konva.Filters.HSL,
      Konva.Filters.Brighten
    ])
    imageNode.saturation(1.2)  // Increased saturation
    imageNode.hue(-10)        // Cool blue tint
    imageNode.brightness(0.1)  // Slightly brighter
  },

  'high-contrast': (imageNode: Konva.Image) => {
    imageNode.cache()
    imageNode.filters([
      Konva.Filters.Contrast,
      Konva.Filters.HSL
    ])
    imageNode.contrast(0.3)    // High contrast
    imageNode.saturation(1.1)  // Slightly increased saturation
  },

  'vivid': (imageNode: Konva.Image) => {
    imageNode.cache()
    imageNode.filters([
      Konva.Filters.HSL,
      Konva.Filters.Contrast,
      Konva.Filters.Brighten
    ])
    imageNode.saturation(1.5)   // High saturation
    imageNode.contrast(0.15)    // Moderate contrast
    imageNode.brightness(0.05)  // Slightly brighter
  },

  'dramatic': (imageNode: Konva.Image) => {
    imageNode.cache()
    imageNode.filters([
      Konva.Filters.HSL,
      Konva.Filters.Contrast,
      Konva.Filters.Noise
    ])
    imageNode.saturation(0.7)   // Reduced saturation
    imageNode.contrast(0.4)     // High contrast
    imageNode.noise(5)          // Slight grain
  }
}

export const applyImageFilters = (imageNode: Konva.Image, options: FilterOptions) => {
  const { filter, adjustments } = options

  // Clear existing cache and filters
  imageNode.clearCache()
  imageNode.filters([])
  
  // Ensure node has dimensions before caching
  if (imageNode.width() > 0 && imageNode.height() > 0) {
    // Apply preset filter if selected
    if (filter && filter in filters) {
      filters[filter](imageNode)
    }

    // Apply adjustments
    const konvaFilters: any[] = []

    // Basic adjustments
    if (adjustments.brightness !== 100) {
      konvaFilters.push(Konva.Filters.Brighten)
      imageNode.brightness(normalizeValue(adjustments.brightness, [0, 200], [-1, 1]))
    }

    if (adjustments.contrast !== 100) {
      konvaFilters.push(Konva.Filters.Contrast)
      imageNode.contrast(normalizeValue(adjustments.contrast, [0, 200], [-100, 100]))
    }

    if (adjustments.saturation !== 100) {
      konvaFilters.push(Konva.Filters.HSL)
      imageNode.saturation(normalizeValue(adjustments.saturation, [0, 200], [-2, 2]))
    }

    // Special effects
    if (adjustments.blur > 0) {
      konvaFilters.push(Konva.Filters.Blur)
      imageNode.blurRadius(adjustments.blur)
    }

    if (adjustments.noise > 0) {
      konvaFilters.push(Konva.Filters.Noise)
      imageNode.noise(adjustments.noise)
    }

    if (adjustments.pixelate > 1) {
      konvaFilters.push(Konva.Filters.Pixelate)
      imageNode.pixelSize(adjustments.pixelate)
    }

    if (adjustments.hue !== 0) {
      konvaFilters.push(Konva.Filters.HSL)
      imageNode.hue(adjustments.hue)
    }

    // White and black point adjustments
    if (adjustments.whitePoint < 100 || adjustments.blackPoint > 0) {
      konvaFilters.push(Konva.Filters.Brighten)
      const whitePointAdjust = normalizeValue(adjustments.whitePoint, [0, 100], [-0.5, 0.5])
      const blackPointAdjust = normalizeValue(adjustments.blackPoint, [0, 100], [-0.5, 0.5])
      imageNode.brightness(whitePointAdjust - blackPointAdjust)
    }

    // Add any new filters to existing ones
    const currentFilters = imageNode.filters() || []
    imageNode.filters([...new Set([...currentFilters, ...konvaFilters])])
    imageNode.cache()
  }
}