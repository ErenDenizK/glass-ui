import { useState } from 'react'
import StaticTests from './StaticTests'
import Interactive from './Interactive'

export default function App() {
  const [mode, setMode] = useState<'static' | 'interactive'>('interactive')

  return (
    <>
      {/* Mode Switcher - Enhanced */}
      <div className="fixed top-6 right-6 z-50 flex gap-2">
        <button
          onClick={() => setMode('static')}
          aria-label="Switch to static tests mode"
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 backdrop-blur-md border ${
            mode === 'static'
              ? 'bg-white/90 text-gray-900 border-white scale-105 shadow-lg'
              : 'bg-white/10 text-white border-white/20 hover:bg-white/20 hover:scale-105'
          }`}
        >
          Static Tests
        </button>
        <button
          onClick={() => setMode('interactive')}
          aria-label="Switch to interactive mode"
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 backdrop-blur-md border ${
            mode === 'interactive'
              ? 'bg-white/90 text-gray-900 border-white scale-105 shadow-lg'
              : 'bg-white/10 text-white border-white/20 hover:bg-white/20 hover:scale-105'
          }`}
        >
          Interactive
        </button>
      </div>

      {/* Content */}
      {mode === 'static' ? <StaticTests /> : <Interactive />}
    </>
  )
}

