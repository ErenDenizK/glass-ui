import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { GlassContainer } from 'glass-ui'

// 3 Animation Presets (Character-driven)
const ANIMATION_PRESETS = {
  subtle: {
    name: 'Subtle',
    character: 'Premium, barely there',
    icon: '✨',
    hoverScale: 1.01,
    tapScale: 0.98,
    duration: 200,
    easing: [0.4, 0.0, 0.2, 1], // Material Standard
  },
  balanced: {
    name: 'Balanced',
    character: 'Professional, noticeable',
    icon: '⚖️',
    hoverScale: 1.015,
    tapScale: 0.97,
    duration: 180,
    easing: [0.4, 0.0, 0.2, 1],
  },
  bold: {
    name: 'Bold',
    character: 'Playful, engaging',
    icon: '⚡',
    hoverScale: 1.025,
    tapScale: 0.96,
    duration: 200,
    spring: true,
    springStiffness: 400,
    springDamping: 25,
  },
} as const

type PresetName = keyof typeof ANIMATION_PRESETS
type PanelPreset = 'light' | 'medium' | 'heavy'
type ButtonPreset = 'solid' | 'glass' | 'minimal'

// Collapsible Section Component
function CollapsibleSection({ 
  title, 
  defaultOpen = true, 
  children 
}: { 
  title: string
  defaultOpen?: boolean
  children: React.ReactNode 
}) {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  
  return (
    <div className="mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
      >
        <span className="text-white font-semibold text-sm">{title}</span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-white"
        >
          ▼
        </motion.span>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function AnimationLab() {
  // Animation
  const [selectedPreset, setSelectedPreset] = useState<PresetName>('balanced')
  
  // Glass Panel (layer system)
  const [panelLayer, setPanelLayer] = useState<1 | 2>(1)
  const [panelPreset, setPanelPreset] = useState<PanelPreset>('medium')
  
  // Glass Button
  const [buttonPreset, setButtonPreset] = useState<ButtonPreset>('glass')
  
  // Get preset config
  const preset = ANIMATION_PRESETS[selectedPreset]
  
  // Build transition
  const getTransition = (type: 'hover' | 'tap') => {
    if ('spring' in preset && preset.spring && selectedPreset === 'bold') {
      return {
        type: 'spring' as const,
        stiffness: preset.springStiffness,
        damping: preset.springDamping,
      }
    }
    
    return {
      duration: (type === 'hover' ? preset.duration : preset.duration * 0.5) / 1000,
      ease: 'easing' in preset ? preset.easing : [0.4, 0.0, 0.2, 1],
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
          <GlassContainer panelPreset="medium" radius="xl" className="p-6">
            <h2 className="text-white text-xl font-bold mb-6">Controls</h2>
            
            {/* Animation Section */}
            <CollapsibleSection title="Animation" defaultOpen={true}>
              <div className="grid grid-cols-1 gap-3">
                {(Object.keys(ANIMATION_PRESETS) as PresetName[]).map((presetName) => {
                  const p = ANIMATION_PRESETS[presetName]
                  return (
                    <button
                      key={presetName}
                      onClick={() => setSelectedPreset(presetName)}
                      className={`px-4 py-3 rounded-lg text-left transition-all ${
                        selectedPreset === presetName
                          ? 'bg-white text-gray-900 scale-105'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span>{p.icon}</span>
                        <span className="font-semibold text-sm">{p.name}</span>
                      </div>
                      <div className="text-xs opacity-70">{p.character}</div>
                    </button>
                  )
                })}
              </div>
            </CollapsibleSection>
            
            {/* Glass Panel Section */}
            <CollapsibleSection title="Glass Panel" defaultOpen={false}>
              {/* Layer System */}
              <div className="mb-6">
                <label className="text-white text-sm font-medium mb-3 block">
                  Layer Depth (Auto Darkness)
                </label>
                <div className="flex gap-2">
                  {[1, 2].map((layer) => (
                    <button
                      key={layer}
                      onClick={() => setPanelLayer(layer as 1 | 2)}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        panelLayer === layer
                          ? 'bg-white text-gray-900'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      Layer {layer}
                    </button>
                  ))}
                </div>
                <p className="text-white/60 text-xs mt-2">
                  Layer 2 is automatically darker
                </p>
              </div>
              
              {/* Panel Presets */}
              <div>
                <label className="text-white text-sm font-medium mb-3 block">
                  Panel Presets
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['light', 'medium', 'heavy'] as PanelPreset[]).map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setPanelPreset(preset)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium transition-all capitalize ${
                        panelPreset === preset
                          ? 'bg-white text-gray-900'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            </CollapsibleSection>
            
            {/* Glass Button Section */}
            <CollapsibleSection title="Glass Button" defaultOpen={false}>
              <label className="text-white text-sm font-medium mb-3 block">
                Button Glass Style
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['solid', 'glass', 'minimal'] as ButtonPreset[]).map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setButtonPreset(preset)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all capitalize ${
                      buttonPreset === preset
                        ? 'bg-white text-gray-900'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
              <p className="text-white/60 text-xs mt-2">
                Solid = opaque, Glass = translucent, Minimal = subtle
              </p>
            </CollapsibleSection>
          </GlassContainer>
        </div>
        
        {/* Right Panel - Info */}
        <div className="fixed right-8 top-1/2 -translate-y-1/2 w-80">
          <GlassContainer panelPreset="medium" radius="xl" className="p-6">
            <h2 className="text-white text-xl font-bold mb-4">Current Setup</h2>
            
            <div className="space-y-4 text-sm">
              <div>
                <div className="text-white/60 text-xs mb-1">Animation</div>
                <div className="text-white font-medium">
                  {preset.icon} {preset.name}
                </div>
                <div className="text-white/70 text-xs">{preset.character}</div>
              </div>
              
              <div className="border-t border-white/10 pt-4">
                <div className="text-white/60 text-xs mb-1">Panel Glass</div>
                <div className="text-white font-medium">
                  Layer {panelLayer} + {panelPreset}
                </div>
              </div>
              
              <div className="border-t border-white/10 pt-4">
                <div className="text-white/60 text-xs mb-1">Button Glass</div>
                <div className="text-white font-medium capitalize">
                  {buttonPreset}
                </div>
              </div>
            </div>
          </GlassContainer>
          
          {/* Instructions */}
          <GlassContainer panelPreset="light" radius="lg" className="p-4 mt-4">
            <p className="text-white/90 text-xs leading-relaxed">
              <strong className="text-white">Select presets</strong> to test combinations.
              <br />
              <strong className="text-white">Hover & click</strong> the button to feel animation.
              <br />
              <strong className="text-white">Expand sections</strong> for more options.
            </p>
          </GlassContainer>
        </div>
        
        {/* Center - Login Layout */}
        <div className="flex flex-col items-center gap-8">
          {/* Outer Panel (uses layer system) */}
          <GlassContainer 
            layer={panelLayer}
            color="neutral"
            radius="2xl"
            className="p-12 w-full max-w-md"
          >
            {/* Inner Panel (uses panel preset) */}
            <GlassContainer
              panelPreset={panelPreset}
              color="neutral"
              radius="xl"
              className="p-8"
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
              
              {/* Button (isolated animation, uses button preset) */}
              <motion.div
                whileHover={{
                  scale: preset.hoverScale,
                  transition: getTransition('hover'),
                }}
                whileTap={{
                  scale: preset.tapScale,
                  transition: getTransition('tap'),
                }}
                className="w-full"
              >
                <GlassContainer
                  as="button"
                  buttonPreset={buttonPreset}
                  radius="lg"
                  className="w-full px-8 py-4 text-gray-900 font-semibold text-lg shadow-xl hover:shadow-2xl transition-shadow duration-200"
                  style={{
                    backgroundColor: buttonPreset === 'solid' ? 'rgba(255, 255, 255, 0.95)' 
                      : buttonPreset === 'glass' ? 'rgba(255, 255, 255, 0.5)'
                      : 'rgba(255, 255, 255, 0.2)'
                  }}
                >
                  Continue
                </GlassContainer>
              </motion.div>
            </GlassContainer>
          </GlassContainer>
        </div>
      </div>
      
      {/* Title */}
      <div className="absolute top-8 left-1/2 -translate-x-1/2">
        <GlassContainer panelPreset="light" radius="full" className="px-8 py-3">
          <h1 className="text-white text-2xl font-bold">Animation Lab</h1>
        </GlassContainer>
      </div>
    </div>
  )
}
