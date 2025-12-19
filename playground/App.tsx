import { useState } from 'react'
import StaticTests from './StaticTests'
import Interactive from './Interactive'
import StaticTestPage from './pages/StaticTestPage'

export default function App() {
  const [mode, setMode] = useState<'static' | 'interactive' | 'showcase'>('showcase')

  return (
    <>
      {/* Mode Switcher */}
      <div className="fixed top-6 right-6 z-50 flex gap-2">
        <button
          onClick={() => setMode('showcase')}
          aria-label="Switch to showcase mode"
          className={`px-4 py-2 rounded-lg font-medium transition-all backdrop-blur-md border ${
            mode === 'showcase'
              ? 'bg-white/90 text-gray-900 border-white scale-105'
              : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
          }`}
        >
          Showcase
        </button>
        <button
          onClick={() => setMode('interactive')}
          aria-label="Switch to interactive mode"
          className={`px-4 py-2 rounded-lg font-medium transition-all backdrop-blur-md border ${
            mode === 'interactive'
              ? 'bg-white/90 text-gray-900 border-white scale-105'
              : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
          }`}
        >
          Interactive
        </button>
        <button
          onClick={() => setMode('static')}
          aria-label="Switch to static tests mode"
          className={`px-4 py-2 rounded-lg font-medium transition-all backdrop-blur-md border ${
            mode === 'static'
              ? 'bg-white/90 text-gray-900 border-white scale-105'
              : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
          }`}
        >
          Static Tests
        </button>
      </div>

      {/* Content */}
      {mode === 'showcase' && <StaticTestPage />}
      {mode === 'interactive' && <Interactive />}
      {mode === 'static' && <StaticTests />}
    </>
  )
}

