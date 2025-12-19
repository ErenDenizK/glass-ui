import { useState, useEffect } from 'react'
import { GlassContainer, listPresets } from 'glass-ui'
import type { ColorName, BlurValue, RadiusValue, ShadowValue, PresetName } from 'glass-ui'

// Background cycling - local assets only
const backgrounds = [
  { path: '/backgrounds/field.png', name: 'Open Field' },
  { path: '/backgrounds/forest.png', name: 'Forest Path' },
  { path: '/backgrounds/bamboo.png', name: 'Bamboo Forest' },
]

export default function Interactive() {
  // State for all GlassContainer props
  const [glassEnabled, setGlassEnabled] = useState(true)
  const [blur, setBlur] = useState<BlurValue>('md')
  const [opacity, setOpacity] = useState(0.25)
  const [borderGlow, setBorderGlow] = useState(false)
  const [color, setColor] = useState<ColorName>('neutral')
  const [radius, setRadius] = useState<RadiusValue>('lg')
  const [shadow, setShadow] = useState<ShadowValue>('sm')
  const [contentType, setContentType] = useState<'short' | 'medium' | 'long'>('medium')
  
  // Preset state
  const [usePreset, setUsePreset] = useState(false)
  const [selectedPreset, setSelectedPreset] = useState<PresetName>('button')
  
  // Copy feedback state
  const [copied, setCopied] = useState(false)
  
  // Browser support check
  const [backdropSupported, setBackdropSupported] = useState(true)
  
  const [currentBgIndex, setCurrentBgIndex] = useState<number>(0)
  const [autoCycle, setAutoCycle] = useState<boolean>(true)

  // Browser support detection
  useEffect(() => {
    setBackdropSupported(
      CSS.supports('backdrop-filter', 'blur(1px)') ||
      CSS.supports('-webkit-backdrop-filter', 'blur(1px)')
    )
  }, [])

  // Auto-cycle every 5 seconds
  useEffect(() => {
    if (!autoCycle) return

    const interval = setInterval(() => {
      setCurrentBgIndex((prev) => (prev + 1) % backgrounds.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [autoCycle])

  // Manual cycle (pauses auto)
  const cycleBackground = () => {
    setCurrentBgIndex((prev) => (prev + 1) % backgrounds.length)
    setAutoCycle(false) // Pause auto-cycle when user interacts
  }

  // Toggle auto-cycle
  const toggleAutoCycle = () => {
    setAutoCycle(!autoCycle)
  }

  // Reset handler
  const handleReset = () => {
    setGlassEnabled(true)
    setBlur('md')
    setOpacity(0.25)
    setBorderGlow(false)
    setColor('neutral')
    setRadius('lg')
    setShadow('sm')
    setContentType('medium')
    setUsePreset(false)
    setSelectedPreset('button')
    setCurrentBgIndex(0)
    setAutoCycle(true) // Resume auto-cycle
    setCopied(false)
  }
  
  // Calculate glass value
  const glassValue = usePreset 
    ? selectedPreset 
    : glassEnabled 
      ? { blur, opacity, borderGlow } 
      : false

  // Generate code output
  const generateCode = () => {
    if (usePreset) {
      const props = [`glass="${selectedPreset}"`]
      if (color !== 'neutral') props.push(`color="${color}"`)
      if (radius !== 'lg') props.push(`radius="${radius}"`)
      if (shadow !== 'sm') props.push(`shadow="${shadow}"`)
      return `<GlassContainer${props.length > 0 ? '\n  ' + props.join('\n  ') : ''}>\n  Content\n</GlassContainer>`
    }
    
    if (!glassEnabled) {
      const props = [`glass={false}`]
      if (color !== 'neutral') props.push(`color="${color}"`)
      if (radius !== 'lg') props.push(`radius="${radius}"`)
      if (shadow !== 'sm') props.push(`shadow="${shadow}"`)
      return `<GlassContainer${props.length > 0 ? '\n  ' + props.join('\n  ') : ''}>\n  Content\n</GlassContainer>`
    }

    const glassConfig = []
    if (blur !== 'md') glassConfig.push(`blur: '${blur}'`)
    if (opacity !== 0.25) glassConfig.push(`opacity: ${opacity}`)
    if (borderGlow) glassConfig.push(`borderGlow: true`)

    const props = []
    // Only include glass prop if it's not default (true) or has custom config
    if (glassConfig.length > 0) {
      props.push(`glass={{ ${glassConfig.join(', ')} }}`)
    }
    if (color !== 'neutral') props.push(`color="${color}"`)
    if (radius !== 'lg') props.push(`radius="${radius}"`)
    if (shadow !== 'sm') props.push(`shadow="${shadow}"`)

    return `<GlassContainer${props.length > 0 ? '\n  ' + props.join('\n  ') : ''}>\n  Content\n</GlassContainer>`
  }

  // Content samples
  const getContent = () => {
    switch (contentType) {
      case 'short':
        return (
          <>
            <h3 className="text-white font-semibold text-lg mb-2">Glass Container</h3>
            <p className="text-white/90">Simple content example</p>
          </>
        )
      case 'medium':
        return (
          <>
            <h3 className="text-white font-semibold text-xl mb-3">Interactive Glass</h3>
            <p className="text-white/90 mb-2">
              Adjust the controls to see real-time changes in the glass effect.
            </p>
            <p className="text-white/80 text-sm">
              Performance-optimized glassmorphism for React
            </p>
          </>
        )
      case 'long':
        return (
          <>
            <h3 className="text-white font-semibold text-2xl mb-4">Lorem Ipsum</h3>
            <p className="text-white/90 mb-3">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
              exercitation ullamco laboris.
            </p>
            <p className="text-white/80 mb-2">
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
              fugiat nulla pariatur.
            </p>
            <p className="text-white/70 text-sm">
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt 
              mollit anim id est laborum.
            </p>
          </>
        )
    }
  }

  // Copy handler
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generateCode())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Controls Sidebar - Glass UI */}
      <aside className="w-80 bg-gray-900/90 backdrop-blur-md border-r border-white/10 p-6 overflow-y-auto custom-scrollbar">
        <h2 className="text-white font-bold text-lg mb-4">Controls</h2>

        <div className="space-y-4">
          {/* Glass Toggle */}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium block">
              Glass Effect
            </label>
            <GlassContainer
              glass={{ blur: 'xs', opacity: 0.05 }}
              radius="md"
              className="p-3"
            >
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={glassEnabled}
                  onChange={(e) => {
                    setGlassEnabled(e.target.checked)
                    if (!e.target.checked) setUsePreset(false)
                  }}
                  className="w-4 h-4 accent-blue-500 cursor-pointer transition-transform hover:scale-110"
                  aria-label="Toggle glass effect"
                />
                <span className="text-white text-sm">Enable Glass</span>
              </label>
            </GlassContainer>
          </div>

          {/* Preset Mode */}
          {glassEnabled && (
            <div className="space-y-2">
              <GlassContainer
                glass={{ blur: 'xs', opacity: 0.05 }}
                radius="md"
                className="p-3"
              >
                <label className="flex items-center gap-3 cursor-pointer mb-2">
                  <input
                    type="checkbox"
                    checked={usePreset}
                    onChange={(e) => setUsePreset(e.target.checked)}
                    className="w-4 h-4 accent-blue-500 cursor-pointer transition-transform hover:scale-110"
                    aria-label="Use preset"
                  />
                  <span className="text-white text-sm font-medium">Use Preset</span>
                </label>
                
                {usePreset && (
                  <>
                    <select
                      value={selectedPreset}
                      onChange={(e) => setSelectedPreset(e.target.value as PresetName)}
                      className="w-full px-3 py-2 bg-gray-800/80 text-white rounded-lg border border-white/10 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer hover:bg-gray-800 mb-2"
                      aria-label="Select preset"
                    >
                      {listPresets().map((preset) => (
                        <option key={preset} value={preset}>
                          {preset}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-gray-400">
                      Manual controls disabled when using presets
                    </p>
                  </>
                )}
              </GlassContainer>
            </div>
          )}

          {/* Browser Support Warning */}
          {!backdropSupported && glassEnabled && (
            <GlassContainer
              glass={{ blur: 'xs', opacity: 0.1 }}
              color="danger"
              radius="sm"
              className="p-2"
            >
              <div className="flex items-start gap-2 text-xs text-red-300">
                <span>⚠️</span>
                <span>Your browser doesn't support backdrop-filter. Glass effects won't be visible.</span>
              </div>
            </GlassContainer>
          )}

          {!usePreset && glassEnabled && (
            <>
              {/* Blur */}
              <div className="space-y-2">
                <label className="text-white text-sm font-medium block">
                  Blur Intensity
                </label>
                <GlassContainer
                  glass={{ blur: 'xs', opacity: 0.05 }}
                  radius="md"
                  className="p-3"
                >
                  <select
                    value={blur}
                    onChange={(e) => setBlur(e.target.value as BlurValue)}
                    className="w-full px-3 py-2 bg-gray-800/80 text-white rounded-lg border border-white/10 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer hover:bg-gray-800"
                    aria-label="Select blur intensity"
                  >
                    <option value="none">none (0px)</option>
                    <option value="subtle">subtle (2px) - barely visible</option>
                    <option value="xs">xs (4px) - light</option>
                    <option value="sm">sm (6px) - soft</option>
                    <option value="md">md (10px) - optimal</option>
                    <option value="lg">lg (16px) - heavy</option>
                    <option value="max">max (20px) - extreme</option>
                  </select>
                </GlassContainer>
              </div>

              {/* Opacity */}
              <div className="space-y-2">
                <label className="text-white text-sm font-medium block">
                  Opacity: <span className="text-blue-300 text-sm font-mono">{opacity.toFixed(2)}</span>
                </label>
                <GlassContainer
                  glass={{ blur: 'xs', opacity: 0.05 }}
                  radius="md"
                  className="p-3"
                >
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={opacity}
                    onChange={(e) => setOpacity(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-blue-500 hover:accent-blue-400 transition-colors"
                    aria-label="Adjust opacity"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>0.0</span>
                    <span>1.0</span>
                  </div>
                </GlassContainer>
              </div>

              {/* Border Glow */}
              <div className="space-y-2">
                <label className="text-white text-sm font-medium block">
                  Border Glow
                </label>
                <GlassContainer
                  glass={{ blur: 'xs', opacity: 0.05 }}
                  radius="md"
                  className="p-3"
                >
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={borderGlow}
                      onChange={(e) => setBorderGlow(e.target.checked)}
                      className="w-4 h-4 accent-blue-500 cursor-pointer transition-transform hover:scale-110"
                      aria-label="Toggle border glow"
                    />
                    <span className="text-white text-sm">Enable Border Glow</span>
                  </label>
                </GlassContainer>
              </div>
            </>
          )}

          {/* Color */}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium block">
              Color Variant
            </label>
            <GlassContainer
              glass={{ blur: 'xs', opacity: 0.05 }}
              radius="md"
              className="p-3"
            >
              <select
                value={color}
                onChange={(e) => setColor(e.target.value as ColorName)}
                className="w-full px-3 py-2 bg-gray-800/80 text-white rounded-lg border border-white/10 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer hover:bg-gray-800"
                aria-label="Select color variant"
              >
                <option value="neutral">Neutral</option>
                <option value="primary">Primary</option>
                <option value="success">Success</option>
                <option value="danger">Danger</option>
                <option value="warning">Warning</option>
                <option value="accent">Accent</option>
              </select>
            </GlassContainer>
          </div>

          {/* Radius */}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium block">
              Border Radius
            </label>
            <GlassContainer
              glass={{ blur: 'xs', opacity: 0.05 }}
              radius="md"
              className="p-3"
            >
              <select
                value={radius}
                onChange={(e) => setRadius(e.target.value as RadiusValue)}
                className="w-full px-3 py-2 bg-gray-800/80 text-white rounded-lg border border-white/10 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer hover:bg-gray-800"
                aria-label="Select border radius"
              >
                <option value="none">none</option>
                <option value="sm">sm</option>
                <option value="md">md</option>
                <option value="lg">lg</option>
                <option value="xl">xl</option>
                <option value="2xl">2xl</option>
                <option value="full">full</option>
              </select>
            </GlassContainer>
          </div>

          {/* Shadow */}
          <div className="space-y-2">
            <label className="text-white text-sm font-medium block">
              Shadow
            </label>
            <GlassContainer
              glass={{ blur: 'xs', opacity: 0.05 }}
              radius="md"
              className="p-3"
            >
              <select
                value={shadow}
                onChange={(e) => setShadow(e.target.value as ShadowValue)}
                className="w-full px-3 py-2 bg-gray-800/80 text-white rounded-lg border border-white/10 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer hover:bg-gray-800"
                aria-label="Select shadow depth"
              >
                <option value="none">none</option>
                <option value="xs">xs</option>
                <option value="sm">sm</option>
                <option value="md">md</option>
                <option value="lg">lg</option>
                <option value="xl">xl</option>
              </select>
            </GlassContainer>
          </div>

          <div className="border-t border-white/10 pt-4">
            {/* Content Type */}
            <div className="space-y-2 mb-4">
              <label className="text-white text-sm font-medium block">
                Content Length
              </label>
              <GlassContainer
                glass={{ blur: 'xs', opacity: 0.05 }}
                radius="md"
                className="p-3"
              >
                <select
                  value={contentType}
                  onChange={(e) => setContentType(e.target.value as 'short' | 'medium' | 'long')}
                  className="w-full px-3 py-2 bg-gray-800/80 text-white rounded-lg border border-white/10 text-sm focus:outline-none focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all cursor-pointer hover:bg-gray-800"
                  aria-label="Select content length"
                >
                  <option value="short">Short</option>
                  <option value="medium">Medium</option>
                  <option value="long">Long</option>
                </select>
              </GlassContainer>
            </div>

            {/* Background Switcher */}
            <div className="space-y-2">
              <label className="text-white text-sm font-medium block">
                Test Background
              </label>
              <GlassContainer
                glass={{ blur: 'xs', opacity: 0.05 }}
                radius="md"
                className="p-3"
              >
                {/* Manual cycle button */}
                <button
                  onClick={cycleBackground}
                  aria-label="Cycle through background images"
                  className="w-full px-4 py-2 rounded-lg backdrop-blur-sm bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95 mb-2"
                >
                  <div className="flex items-center justify-center gap-2">
                    <span>🔄</span>
                    <span>{backgrounds[currentBgIndex].name}</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {currentBgIndex + 1} / {backgrounds.length}
                  </div>
                </button>
                
                {/* Auto-cycle toggle */}
                <button
                  onClick={toggleAutoCycle}
                  aria-label={autoCycle ? 'Pause auto-cycling' : 'Resume auto-cycling'}
                  className="w-full px-3 py-1.5 rounded-lg backdrop-blur-sm bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 text-xs transition-all duration-200 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>{autoCycle ? '⏸️' : '▶️'}</span>
                  <span>{autoCycle ? 'Auto-cycling (5s)' : 'Auto-cycle paused'}</span>
                </button>
                
                <p className="text-xs text-gray-500 mt-2">
                  {autoCycle 
                    ? 'Backgrounds change automatically. Click cycle button to pause.'
                    : 'Auto-cycle paused. Click play to resume.'}
                </p>
              </GlassContainer>
            </div>
          </div>

          {/* Validation Warnings */}
          {glassEnabled && (
            <div className="space-y-2">
              {(blur === 'lg' || blur === 'max') && (
                <GlassContainer
                  glass={{ blur: 'xs', opacity: 0.1 }}
                  color="warning"
                  radius="sm"
                  className="p-2"
                >
                  <div className="flex items-start gap-2 text-xs text-yellow-300">
                    <span>⚠️</span>
                    <span>
                      {blur === 'max' 
                        ? 'Maximum blur (20px) - performance intensive'
                        : 'Heavy blur (16px) - may impact low-end devices'}
                    </span>
                  </div>
                </GlassContainer>
              )}
              
              {opacity < 0.15 && (
                <GlassContainer
                  glass={{ blur: 'xs', opacity: 0.1 }}
                  color="warning"
                  radius="sm"
                  className="p-2"
                >
                  <div className="flex items-start gap-2 text-xs text-orange-300">
                    <span>💡</span>
                    <span>Very low opacity - glass effect may be subtle</span>
                  </div>
                </GlassContainer>
              )}
              
              {opacity > 0.8 && (
                <GlassContainer
                  glass={{ blur: 'xs', opacity: 0.1 }}
                  radius="sm"
                  className="p-2"
                >
                  <div className="flex items-start gap-2 text-xs text-blue-300">
                    <span>💡</span>
                    <span>High opacity - approaching solid background</span>
                  </div>
                </GlassContainer>
              )}
            </div>
          )}

          {/* Reset Button */}
          <GlassContainer
            glass={{ blur: 'xs', opacity: 0.05 }}
            radius="md"
            className="p-3"
          >
            <button
              onClick={handleReset}
              aria-label="Reset all controls to defaults"
              className="w-full px-4 py-2 rounded-lg backdrop-blur-sm bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20 text-sm font-medium transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <span className="flex items-center justify-center gap-2">
                <span>↺</span>
                <span>Reset to Defaults</span>
              </span>
            </button>
          </GlassContainer>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Preview Section - FIXED ARCHITECTURE */}
        <div className="flex-1 relative overflow-hidden">
          {/* Background Layers - Pure CSS, opacity-based crossfade */}
          <div 
            className={`absolute inset-0 transition-opacity duration-500 bg-cover bg-center bg-no-repeat ${
              currentBgIndex === 0 ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ 
              backgroundImage: `url(${backgrounds[0].path})`,
              backgroundAttachment: 'scroll',
              backgroundPosition: 'center center',
              backgroundSize: 'cover'
            }}
          />
          <div 
            className={`absolute inset-0 transition-opacity duration-500 bg-cover bg-center bg-no-repeat ${
              currentBgIndex === 1 ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ 
              backgroundImage: `url(${backgrounds[1].path})`,
              backgroundAttachment: 'scroll',
              backgroundPosition: 'center center',
              backgroundSize: 'cover'
            }}
          />
          <div 
            className={`absolute inset-0 transition-opacity duration-500 bg-cover bg-center bg-no-repeat ${
              currentBgIndex === 2 ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ 
              backgroundImage: `url(${backgrounds[2].path})`,
              backgroundAttachment: 'scroll',
              backgroundPosition: 'center center',
              backgroundSize: 'cover'
            }}
          />
          
          {/* Content Overlay - Completely separate, no background */}
          <div className="absolute inset-0 flex items-center justify-center p-8 md:p-12 pointer-events-none">
            <div className="w-full max-w-2xl pointer-events-auto">
              <GlassContainer
                glass={glassValue}
                color={color}
                radius={radius}
                shadow={shadow}
                className="p-6 md:p-8"
              >
                {getContent()}
              </GlassContainer>
            </div>
          </div>
        </div>

        {/* Code Output - Glass UI */}
        <div className="bg-gray-900/90 backdrop-blur-md border-t border-white/10 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold text-base">Generated Code</h3>
            <button
              onClick={handleCopy}
              aria-label="Copy generated code to clipboard"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 backdrop-blur-sm border ${
                copied
                  ? 'bg-green-500/20 border-green-500/50 text-green-300 scale-95'
                  : 'bg-blue-500/20 border-blue-500/50 text-blue-300 hover:bg-blue-500/30 hover:border-blue-400/50 hover:scale-105 active:scale-95'
              }`}
            >
              {copied ? (
                <span className="flex items-center gap-2">
                  <span>✓</span>
                  <span>Copied!</span>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <span>📋</span>
                  <span>Copy Code</span>
                </span>
              )}
            </button>
          </div>
          <GlassContainer
            glass={{ blur: 'xs', opacity: 0.05 }}
            radius="lg"
            className="overflow-hidden"
          >
            <pre className="bg-gray-950/50 text-gray-300 p-4 overflow-x-auto text-sm font-mono leading-relaxed custom-scrollbar">
              <code>{generateCode()}</code>
            </pre>
          </GlassContainer>
        </div>
      </main>
    </div>
  )
}
