import { Button, GlassContainer } from 'glass-ui'

export default function StaticTestPage() {
  return (
    <div 
      className="min-h-screen relative"
      style={{
        backgroundImage: 'url(/backgrounds/forest.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/50" />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Hero */}
        <header className="pt-20 pb-16 px-8 text-center">
          <h1 className="text-7xl font-bold text-white mb-6 drop-shadow-2xl tracking-tight">
            Glass UI
          </h1>
          <p className="text-3xl text-white/95 mb-3 font-light">
            Glassmorphism Reimagined
          </p>
          <p className="text-lg text-white/75 mb-10 max-w-2xl mx-auto">
            Performance-first • Type-safe • Composable
          </p>
          <Button glass="modal" size="lg" color="primary">
            Explore Components
          </Button>
        </header>

        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto px-8 pb-20 space-y-24">
          
          {/* ARCHITECTURE DEMONSTRATION */}
          <section>
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-5xl font-bold text-white mb-4">
                  Architecture: Composition Over Custom Logic
                </h2>
                <p className="text-xl text-white/85 max-w-3xl mx-auto leading-relaxed">
                  Button doesn't reimplement glass. It <em className="text-white font-medium">composes</em> GlassContainer.
                </p>
              </div>

              {/* Side-by-side comparison */}
              <div className="grid md:grid-cols-2 gap-8 mb-10">
                {/* Left: Raw GlassContainer */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    GlassContainer (Foundation)
                  </h3>
                  <GlassContainer
                    glass={{ blur: 'md', opacity: 0.25, borderGlow: true }}
                    color="primary"
                    radius="lg"
                    shadow="md"
                    className="p-8 text-center"
                  >
                    <p className="text-white font-medium text-lg">
                      Raw Glass Element
                    </p>
                    <p className="text-white/70 text-sm mt-3">
                      blur: md, opacity: 0.25, borderGlow: true
                    </p>
                  </GlassContainer>
                </div>

                {/* Right: Button with EXACT same props */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">
                    Button (Composition)
                  </h3>
                  <div className="flex flex-col items-center gap-6">
                    <Button
                      glass={{ blur: 'md', opacity: 0.25, borderGlow: true }}
                      color="primary"
                      radius="lg"
                    >
                      Glass Button
                    </Button>
                    <div className="text-center">
                      <p className="text-white/90 text-sm font-medium">
                        ↑ Identical glass config
                      </p>
                      <p className="text-white/70 text-xs mt-2">
                        Button = GlassContainer + Animation + Interaction
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key insight */}
              <GlassContainer
                glass={{ blur: 'sm', opacity: 0.15 }}
                color="accent"
                radius="lg"
                className="p-8"
              >
                <p className="text-white text-center text-lg leading-relaxed">
                  <strong className="font-semibold">Key Insight:</strong> Every Button prop (glass, color, radius, shadow) 
                  is a <strong className="font-semibold">GlassContainer prop</strong>. Zero duplication. Pure composition.
                </p>
              </GlassContainer>
            </div>
          </section>

          {/* GLASS POWER DEMONSTRATION */}
          <section>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-5xl font-bold text-white mb-4">
                  Glass System Power
                </h2>
                <p className="text-xl text-white/85 max-w-2xl mx-auto">
                  Button inherits ALL GlassContainer capabilities
                </p>
              </div>

              {/* Glass Intensity Spectrum */}
              <div className="mb-16">
                <h3 className="text-2xl font-semibold text-white mb-6">Intensity Spectrum</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                  <div className="space-y-2">
                    <Button 
                      glass={{ blur: 'xs', opacity: 0.05, borderGlow: false }}
                      fullWidth
                    >
                      Ultra Subtle
                    </Button>
                    <p className="text-white/60 text-xs text-center">
                      blur: xs, opacity: 0.05
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      glass={{ blur: 'sm', opacity: 0.15, borderGlow: false }}
                      fullWidth
                    >
                      Light
                    </Button>
                    <p className="text-white/60 text-xs text-center">
                      blur: sm, opacity: 0.15
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      glass="button"
                      fullWidth
                    >
                      Medium
                    </Button>
                    <p className="text-white/60 text-xs text-center">
                      preset: button (default)
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      glass={{ blur: 'lg', opacity: 0.5, borderGlow: true }}
                      fullWidth
                    >
                      Heavy
                    </Button>
                    <p className="text-white/60 text-xs text-center">
                      blur: lg, opacity: 0.5
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Button 
                      glass={{ blur: 'max', opacity: 0.8, borderGlow: true }}
                      fullWidth
                    >
                      Extreme
                    </Button>
                    <p className="text-white/60 text-xs text-center">
                      blur: max, opacity: 0.8
                    </p>
                  </div>
                </div>
              </div>

              {/* Material Hybrids */}
              <div className="mb-16">
                <h3 className="text-2xl font-semibold text-white mb-6">Material Explorations</h3>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="space-y-3">
                    <Button 
                      glass={{ blur: 'lg', opacity: 0.3, borderGlow: false }}
                      fullWidth
                      size="lg"
                    >
                      Frosted
                    </Button>
                    <div>
                      <p className="text-white/90 text-sm font-medium">Frosted Glass</p>
                      <p className="text-white/60 text-xs">High blur, medium opacity</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      glass={{ blur: 'sm', opacity: 0.7, borderGlow: false }}
                      fullWidth
                      size="lg"
                    >
                      Solid
                    </Button>
                    <div>
                      <p className="text-white/90 text-sm font-medium">Solid Glass</p>
                      <p className="text-white/60 text-xs">Low blur, high opacity</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      glass={{ blur: 'md', opacity: 0.12, borderGlow: false }}
                      fullWidth
                      size="lg"
                    >
                      Ethereal
                    </Button>
                    <div>
                      <p className="text-white/90 text-sm font-medium">Ethereal</p>
                      <p className="text-white/60 text-xs">Medium blur, low opacity</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button 
                      glass={{ blur: 'md', opacity: 0.4, borderGlow: true }}
                      fullWidth
                      size="lg"
                    >
                      Crystal
                    </Button>
                    <div>
                      <p className="text-white/90 text-sm font-medium">Crystalline</p>
                      <p className="text-white/60 text-xs">Border glow + balanced</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shape Variations */}
              <div className="mb-16">
                <h3 className="text-2xl font-semibold text-white mb-6">Shape Variations</h3>
                <div className="flex flex-wrap gap-4 items-center justify-center">
                  <Button radius="none">Sharp</Button>
                  <Button radius="sm">Subtle</Button>
                  <Button radius="md">Medium</Button>
                  <Button radius="lg">Standard</Button>
                  <Button radius="xl">Large</Button>
                  <Button radius="2xl">Extra</Button>
                  <Button radius="full">Pill</Button>
                </div>
              </div>

              {/* Contextual Presets */}
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">Contextual Presets</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <Button glass="modal" fullWidth size="lg">
                      Modal CTA
                    </Button>
                    <div>
                      <p className="text-white/90 text-sm font-medium">Modal Preset</p>
                      <p className="text-white/60 text-xs">Heavy glass, prominent</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button glass="nav" fullWidth size="lg">
                      Nav Action
                    </Button>
                    <div>
                      <p className="text-white/90 text-sm font-medium">Nav Preset</p>
                      <p className="text-white/60 text-xs">Balanced, no glow</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Button glass="card" fullWidth size="lg">
                      Card Button
                    </Button>
                    <div>
                      <p className="text-white/90 text-sm font-medium">Card Preset</p>
                      <p className="text-white/60 text-xs">Subtle, lightweight</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* COMPONENT SHOWCASE */}
          <section>
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-5xl font-bold text-white mb-4">
                  Component Showcase
                </h2>
                <p className="text-xl text-white/85">
                  All variations and states
                </p>
              </div>

              <div className="space-y-16">
                {/* Variants */}
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-6">Variants</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button variant="primary">Primary</Button>
                    <Button variant="secondary">Secondary</Button>
                    <Button variant="ghost">Ghost</Button>
                    <Button variant="outline">Outline</Button>
                  </div>
                </div>

                {/* Sizes */}
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-6">Sizes</h3>
                  <div className="flex flex-wrap items-center gap-4">
                    <Button size="sm">Small</Button>
                    <Button size="md">Medium</Button>
                    <Button size="lg">Large</Button>
                    <Button size="xl">Extra Large</Button>
                  </div>
                </div>

                {/* Colors */}
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-6">Colors</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button color="primary">Primary</Button>
                    <Button color="success">Success</Button>
                    <Button color="danger">Danger</Button>
                    <Button color="warning">Warning</Button>
                    <Button color="accent">Accent</Button>
                    <Button color="neutral">Neutral</Button>
                  </div>
                </div>

                {/* With Icons */}
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-6">With Icons</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button leadingIcon={<span>⚡</span>}>Leading Icon</Button>
                    <Button trailingIcon={<span>→</span>}>Trailing Icon</Button>
                    <Button 
                      leadingIcon={<span>💾</span>}
                      trailingIcon={<span>✓</span>}
                    >
                      Both Icons
                    </Button>
                  </div>
                </div>

                {/* Icon Only */}
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-6">Icon Only</h3>
                  <div className="flex flex-wrap items-center gap-4">
                    <Button iconOnly leadingIcon={<span>⚙️</span>} size="sm" />
                    <Button iconOnly leadingIcon={<span>🔥</span>} size="md" />
                    <Button iconOnly leadingIcon={<span>⭐</span>} size="lg" />
                    <Button iconOnly leadingIcon={<span>❤️</span>} size="xl" />
                  </div>
                </div>

                {/* States */}
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-6">States</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button>Normal</Button>
                    <Button loading>Loading</Button>
                    <Button disabled>Disabled</Button>
                  </div>
                </div>

                {/* Full Width */}
                <div>
                  <h3 className="text-2xl font-semibold text-white mb-6">Full Width</h3>
                  <Button fullWidth size="lg">Full Width Button</Button>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="text-center py-12 text-white/60 text-sm">
          <p>Glass UI Beta 0.1 • Built with GlassContainer</p>
        </footer>
      </div>
    </div>
  )
}
