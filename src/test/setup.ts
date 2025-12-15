import '@testing-library/jest-dom'

// Mock CSS.supports for jsdom (not available by default)
if (typeof CSS !== 'undefined' && !CSS.supports) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (CSS as any).supports = (property: string) => {
    // Mock support for backdrop-filter in tests
    if (property === 'backdrop-filter' || property === '-webkit-backdrop-filter') {
      return true
    }
    return false
  }
}

