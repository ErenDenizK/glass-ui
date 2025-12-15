import { GlassContainer } from 'glass-ui'

export default function StaticTests() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-8">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-bold text-white mb-2">
          Glass UI Playground
        </h1>
        <p className="text-white/80 text-lg">
          Internal testing environment - not for public use
        </p>
      </header>

      {/* Test Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Test 1: Default Glass */}
        <TestCard title="Default Glass">
          <GlassContainer className="p-6">
            <h3 className="text-white font-semibold mb-2">Default Glass</h3>
            <p className="text-white/90 text-sm">
              glass={'{true}'} - Default blur (12px) and opacity (0.25)
            </p>
          </GlassContainer>
        </TestCard>

        {/* Test 2: No Glass (Solid) */}
        <TestCard title="Solid (No Glass)">
          <GlassContainer glass={false} color="primary" className="p-6">
            <h3 className="text-white font-semibold mb-2">Solid Background</h3>
            <p className="text-white/90 text-sm">
              glass={'{false}'} - Fully opaque, no blur
            </p>
          </GlassContainer>
        </TestCard>

        {/* Test 3: Custom Blur */}
        <TestCard title="Custom Blur">
          <GlassContainer 
            glass={{ blur: 'lg', opacity: 0.3 }}
            className="p-6"
          >
            <h3 className="text-white font-semibold mb-2">Heavy Blur</h3>
            <p className="text-white/90 text-sm">
              blur: 'lg' (20px), opacity: 0.3
            </p>
          </GlassContainer>
        </TestCard>

        {/* Test 4: Border Glow */}
        <TestCard title="Border Glow">
          <GlassContainer 
            glass={{ borderGlow: true }}
            color="primary"
            className="p-6"
          >
            <h3 className="text-white font-semibold mb-2">With Border Glow</h3>
            <p className="text-white/90 text-sm">
              borderGlow: true - Gradient border effect
            </p>
          </GlassContainer>
        </TestCard>

        {/* Test 5: Light Blur */}
        <TestCard title="Light Blur">
          <GlassContainer 
            glass={{ blur: 'xs', opacity: 0.1 }}
            className="p-6"
          >
            <h3 className="text-white font-semibold mb-2">Subtle Glass</h3>
            <p className="text-white/90 text-sm">
              blur: 'xs' (4px), opacity: 0.1 - Very subtle
            </p>
          </GlassContainer>
        </TestCard>

        {/* Test 6: Success Color */}
        <TestCard title="Success Color">
          <GlassContainer 
            glass={{ borderGlow: true }}
            color="success"
            className="p-6"
          >
            <h3 className="text-white font-semibold mb-2">Success Variant</h3>
            <p className="text-white/90 text-sm">
              color: 'success' - Green glass
            </p>
          </GlassContainer>
        </TestCard>

        {/* Test 7: Danger Color */}
        <TestCard title="Danger Color">
          <GlassContainer 
            glass={{ blur: 'md', opacity: 0.35, borderGlow: true }}
            color="danger"
            className="p-6"
          >
            <h3 className="text-white font-semibold mb-2">Danger Variant</h3>
            <p className="text-white/90 text-sm">
              color: 'danger' - Red glass with glow
            </p>
          </GlassContainer>
        </TestCard>

        {/* Test 8: Warning Color */}
        <TestCard title="Warning Color">
          <GlassContainer 
            color="warning"
            className="p-6"
          >
            <h3 className="text-white font-semibold mb-2">Warning Variant</h3>
            <p className="text-white/90 text-sm">
              color: 'warning' - Orange glass
            </p>
          </GlassContainer>
        </TestCard>

        {/* Test 9: Accent Color */}
        <TestCard title="Accent Color">
          <GlassContainer 
            glass={{ borderGlow: true }}
            color="accent"
            className="p-6"
          >
            <h3 className="text-white font-semibold mb-2">Accent Variant</h3>
            <p className="text-white/90 text-sm">
              color: 'accent' - Purple glass
            </p>
          </GlassContainer>
        </TestCard>

        {/* Test 10: Nested Glass */}
        <TestCard title="Nested Glass">
          <GlassContainer className="p-6">
            <h3 className="text-white font-semibold mb-3">Outer Container</h3>
            <GlassContainer 
              glass={{ blur: 'sm', opacity: 0.2 }}
              className="p-4"
            >
              <p className="text-white/90 text-sm">
                Nested inner container - testing layer stacking
              </p>
            </GlassContainer>
          </GlassContainer>
        </TestCard>

        {/* Test 11: Custom Radius */}
        <TestCard title="Custom Radius">
          <GlassContainer 
            radius="2xl"
            shadow="lg"
            className="p-6"
          >
            <h3 className="text-white font-semibold mb-2">Large Radius</h3>
            <p className="text-white/90 text-sm">
              radius: '2xl', shadow: 'lg'
            </p>
          </GlassContainer>
        </TestCard>

        {/* Test 12: As Different Element */}
        <TestCard title="Semantic HTML">
          <GlassContainer 
            as="article"
            className="p-6"
          >
            <h3 className="text-white font-semibold mb-2">Article Element</h3>
            <p className="text-white/90 text-sm">
              as: 'article' - Rendered as {'<article>'}
            </p>
          </GlassContainer>
        </TestCard>

      </div>

      {/* Performance Info */}
      <div className="max-w-7xl mx-auto mt-12">
        <GlassContainer className="p-6">
          <h2 className="text-white font-bold text-xl mb-4">
            Performance Notes
          </h2>
          <ul className="text-white/90 text-sm space-y-2">
            <li>• Check DevTools for GPU acceleration (transform: translateZ)</li>
            <li>• Blur values are clamped to MAX_BLUR (20px)</li>
            <li>• Backdrop-filter fallback increases opacity on unsupported browsers</li>
            <li>• Border glow uses CSS mask (::before pseudo-element)</li>
            <li>• Open console for any validation warnings</li>
          </ul>
        </GlassContainer>
      </div>
    </div>
  )
}

// Helper component for consistent test card layout
function TestCard({ 
  title, 
  children 
}: { 
  title: string
  children: React.ReactNode 
}) {
  return (
    <div className="space-y-2">
      <div className="text-white/60 text-xs font-mono uppercase tracking-wider">
        {title}
      </div>
      {children}
    </div>
  )
}

