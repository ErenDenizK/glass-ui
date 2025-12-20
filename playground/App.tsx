import { useState } from 'react'
import Interactive from './Interactive'
import AnimationLab from './pages/AnimationLab'

export default function App() {
  const [mode, setMode] = useState<'interactive' | 'lab'>('lab')

  return (
    <>
      {/* Mode Switcher */}
      <div className="fixed top-6 right-6 z-50 flex gap-2">
        <button
          onClick={() => setMode('lab')}
          className={`px-4 py-2 rounded-lg font-medium transition-all backdrop-blur-md border ${
            mode === 'lab'
              ? 'bg-white/90 text-gray-900 border-white scale-105'
              : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
          }`}
        >
          Animation Lab
        </button>
        <button
          onClick={() => setMode('interactive')}
          className={`px-4 py-2 rounded-lg font-medium transition-all backdrop-blur-md border ${
            mode === 'interactive'
              ? 'bg-white/90 text-gray-900 border-white scale-105'
              : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
          }`}
        >
          Old Playground
        </button>
      </div>

      {/* Content */}
      {mode === 'lab' && <AnimationLab />}
      {mode === 'interactive' && <Interactive />}
    </>
  )
}
