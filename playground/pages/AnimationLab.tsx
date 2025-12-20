import { useState } from 'react'
import { motion } from 'framer-motion'
import { GlassContainer } from 'glass-ui'

// Animation Presets (Smart defaults)
const ANIMATION_PRESETS = {
  fast: {
    name: 'Fast',
    description: 'Snappy, responsive',
    hoverScale: 1.01,
    tapScale: 0.98,
    duration: 150,
    easing: [0.4, 0.0, 1, 1], // Accelerate
    yOffset: 0,
  },
  smooth: {
    name: 'Smooth',
    description: 'Polished, elegant',
    hoverScale: 1.015,
    tapScale: 0.97,
    duration: 200,
    easing: [0.4, 0.0, 0.2, 1], // Standard
    yOffset: 0,
  },
  tactile: {
    name: 'Tactile',
    description: 'Playful, engaging',
    hoverScale: 1.02,
    tapScale: 0.96,
    duration: 180,
    easing: 'spring', // Spring physics
    springStiffness: 400,
    springDamping: 25,
    yOffset: -2,
  },
  heavy: {
    name: 'Heavy',
    description: 'Bold, impactful',
    hoverScale: 1.03,
    tapScale: 0.95,
    duration: 250,
    easing: [0.2, 0.0, 0, 1], // Emphasized
    yOffset: -3,
  },
} as const

type PresetName = keyof typeof ANIMATION_PRESETS

export default function AnimationLab() {
  // Preset selection
  const [selectedPreset, setSelectedPreset] = useState<PresetName>('smooth')
  const [advancedMode, setAdvancedMode] = useState(false)
  
  // Animation parameters (from preset or custom)
  const preset = ANIMATION_PRESETS[selectedPreset]
  const [hoverScale, setHoverScale] = useState<number>(preset.hoverScale)
  const [tapScale, setTapScale] = useState<number>(preset.tapScale)
  const [duration, setDuration] = useState<number>(preset.duration)
  const [yOffset, setYOffset] = useState<number>(preset.yOffset)
  
  // Glass response
  const [blurShift, setBlurShift] = useState(false)
  const [opacityShift, setOpacityShift] = useState(0.05)
  
  // Context (glass layers)
  const [outerBlur, setOuterBlur] = useState<'xs' | 'sm' | 'md' | 'lg' | 'max'>('md')
  const [outerOpacity, setOuterOpacity] = useState(0.2)
  const [innerBlur, setInnerBlur] = useState<'xs' | 'sm' | 'md' | 'lg' | 'max'>('lg')
  const [innerOpacity, setInnerOpacity] = useState(0.4)
  
  // Button state
  const [isHovered, setIsHovered] = useState(false)
  
  // Update values when preset changes
  const handlePresetChange = (presetName: PresetName) => {
    setSelectedPreset(presetName)
    const newPreset = ANIMATION_PRESETS[presetName]
    setHoverScale(newPreset.hoverScale)
    setTapScale(newPreset.tapScale)
    setDuration(newPreset.duration)
    setYOffset(newPreset.yOffset)
  }
  
  // Build transition
  const getTransition = (type: 'hover' | 'tap') => {
    const currentDuration = type === 'hover' ? duration : duration * 0.5
    
    if (preset.easing === 'spring' && selectedPreset === 'tactile') {
      return {
        type: 'spring' as const,
        stiffness: preset.springStiffness,
        damping: preset.springDamping,
      }
    }
    
    return {
      duration: currentDuration / 1000,
      ease: Array.isArray(preset.easing) ? [...preset.easing] as [number, number, number, number] : undefined,
    }
  }
  
  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: 'url(/backgrounds/field.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        
        {/* Left Panel - Animation Controls */}
        <div className="fixed left-8 top-1/2 -translate-y-1/2 w-80">
          <GlassContainer glass={{ blur: 'md', opacity: 0.2 }} className="p-6">
            <h2 className="text-white text-xl font-bold mb-6">Animation</h2>
            
            {/* Preset Selector */}
            <div className="mb-6">
              <label className="text-white text-sm font-medium mb-3 block">
                Presets
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(ANIMATION_PRESETS) as PresetName[]).map((presetName) => {
                  const p = ANIMATION_PRESETS[presetName]
                  return (
                    <button
                      key={presetName}
                      onClick={() => handlePresetChange(presetName)}
                      className={`px-4 py-3 rounded-lg text-left transition-all ${
                        selectedPreset === presetName
                          ? 'bg-white text-gray-900'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      <div className="font-semibold text-sm">{p.name}</div>
                      <div className="text-xs opacity-70 mt-0.5">{p.description}</div>
                    </button>
                  )
                })}
              </div>
            </div>
            
            {/* Advanced Mode Toggle */}
            <div className="mb-6 border-t border-white/10 pt-6">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={advancedMode}
                  onChange={(e) => setAdvancedMode(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-white text-sm font-medium">Advanced Controls</span>
              </label>
            </div>
            
            {/* Advanced Controls (Expandable) */}
            {advancedMode && (
              <div className="space-y-6 border-t border-white/10 pt-6">
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">
                    Hover Scale: {hoverScale.toFixed(3)}
                  </label>
                  <input
                    type="range"
                    min="1.0"
                    max="1.05"
                    step="0.001"
                    value={hoverScale}
                    onChange={(e) => setHoverScale(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">
                    Tap Scale: {tapScale.toFixed(3)}
                  </label>
                  <input
                    type="range"
                    min="0.9"
                    max="1.0"
                    step="0.001"
                    value={tapScale}
                    onChange={(e) => setTapScale(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">
                    Duration: {duration}ms
                  </label>
                  <input
                    type="range"
                    min="50"
                    max="400"
                    step="10"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="text-white text-sm font-medium mb-2 block">
                    Y Offset: {yOffset}px
                  </label>
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    step="1"
                    value={yOffset}
                    onChange={(e) => setYOffset(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            )}
            
            {/* Glass Response */}
            <div className="border-t border-white/10 pt-6 mt-6">
              <h3 className="text-white text-sm font-bold mb-4">Glass Response</h3>
              
              <div className="mb-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={blurShift}
                    onChange={(e) => setBlurShift(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <span className="text-white text-sm">Blur shift on hover</span>
                </label>
              </div>
              
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Opacity Shift: +{opacityShift.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0"
                  max="0.15"
                  step="0.01"
                  value={opacityShift}
                  onChange={(e) => setOpacityShift(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </GlassContainer>
        </div>
        
        {/* Right Panel - Context Controls */}
        <div className="fixed right-8 top-1/2 -translate-y-1/2 w-80">
          <GlassContainer glass={{ blur: 'md', opacity: 0.2 }} className="p-6">
            <h2 className="text-white text-xl font-bold mb-6">Glass Context</h2>
            
            {/* Outer Glass */}
            <div className="mb-8">
              <h3 className="text-white text-sm font-bold mb-4">Outer Glass</h3>
              
              <div className="mb-4">
                <label className="text-white text-sm font-medium mb-2 block">Blur</label>
                <div className="flex gap-2">
                  {(['xs', 'sm', 'md', 'lg', 'max'] as const).map((blur) => (
                    <button
                      key={blur}
                      onClick={() => setOuterBlur(blur)}
                      className={`flex-1 px-2 py-1.5 rounded text-xs font-medium transition-all ${
                        outerBlur === blur
                          ? 'bg-white text-gray-900'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {blur}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Opacity: {outerOpacity.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="0.5"
                  step="0.01"
                  value={outerOpacity}
                  onChange={(e) => setOuterOpacity(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
            
            {/* Inner Glass */}
            <div>
              <h3 className="text-white text-sm font-bold mb-4">Inner Glass</h3>
              
              <div className="mb-4">
                <label className="text-white text-sm font-medium mb-2 block">Blur</label>
                <div className="flex gap-2">
                  {(['xs', 'sm', 'md', 'lg', 'max'] as const).map((blur) => (
                    <button
                      key={blur}
                      onClick={() => setInnerBlur(blur)}
                      className={`flex-1 px-2 py-1.5 rounded text-xs font-medium transition-all ${
                        innerBlur === blur
                          ? 'bg-white text-gray-900'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {blur}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="text-white text-sm font-medium mb-2 block">
                  Opacity: {innerOpacity.toFixed(2)}
                </label>
                <input
                  type="range"
                  min="0.1"
                  max="0.8"
                  step="0.01"
                  value={innerOpacity}
                  onChange={(e) => setInnerOpacity(parseFloat(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </GlassContainer>
        </div>
        
        {/* Center - Login-Style Layout */}
        <div className="flex flex-col items-center gap-8">
          {/* Outer Glass Container */}
          <GlassContainer 
            glass={{ blur: outerBlur, opacity: outerOpacity }}
            color="neutral"
            radius="2xl"
            className="p-12 w-full max-w-md"
          >
            {/* Inner Glass (Content Card) */}
            <GlassContainer
              glass={{ 
                blur: blurShift && isHovered 
                  ? (innerBlur === 'xs' ? 'sm' 
                    : innerBlur === 'sm' ? 'md'
                    : innerBlur === 'md' ? 'lg'
                    : innerBlur === 'lg' ? 'max'
                    : 'max')
                  : innerBlur,
                opacity: innerOpacity + (isHovered ? opacityShift : 0)
              }}
              color="neutral"
              radius="xl"
              className="p-8 transition-all duration-200"
            >
              {/* Content */}
              <div className="text-center mb-8">
                <h2 className="text-white text-3xl font-bold mb-3">
                  Welcome Back
                </h2>
                <p className="text-white/80 text-sm leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                  Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
              
              {/* White Button */}
              <motion.button
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                whileHover={{
                  scale: hoverScale,
                  y: yOffset,
                  transition: getTransition('hover'),
                }}
                whileTap={{
                  scale: tapScale,
                  y: 0,
                  transition: getTransition('tap'),
                }}
                className="w-full px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold text-lg shadow-xl hover:shadow-2xl transition-shadow duration-200"
              >
                Continue
              </motion.button>
            </GlassContainer>
          </GlassContainer>
          
          {/* Instructions */}
          <GlassContainer glass={{ blur: 'sm', opacity: 0.15 }} radius="lg" className="p-4 max-w-md">
            <p className="text-white/90 text-sm text-center leading-relaxed">
              <strong className="text-white">Select a preset</strong> to test animation feel.
              <br />
              <strong className="text-white">Enable Advanced</strong> for fine-tuning.
              <br />
              <strong className="text-white">Hover & click</strong> the button to test.
            </p>
          </GlassContainer>
        </div>
      </div>
      
      {/* Title */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2">
        <GlassContainer glass={{ blur: 'sm', opacity: 0.15 }} radius="full" className="px-8 py-3">
          <h1 className="text-white text-2xl font-bold">Animation Lab</h1>
        </GlassContainer>
      </div>
    </div>
  )
}
