import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Background wrapper component with animated gradient orbs
const AppWrapper = () => (
  <div className="relative min-h-screen overflow-hidden">
    {/* Animated background orbs */}
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Primary orb - top right */}
      <div
        className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-indigo-200/40 via-violet-200/30 to-purple-200/20 rounded-full blur-3xl animate-float-slow"
      />
      {/* Secondary orb - bottom left */}
      <div
        className="absolute -bottom-32 -left-32 w-80 h-80 bg-gradient-to-tr from-blue-200/30 via-cyan-200/20 to-teal-200/10 rounded-full blur-3xl animate-float-slower"
      />
      {/* Accent orb - center */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-slate-100/50 via-transparent to-transparent rounded-full blur-2xl"
      />
      {/* Small floating orbs */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-rose-200/20 to-pink-200/10 rounded-full blur-2xl animate-pulse-slow" />
      <div className="absolute bottom-1/3 right-1/3 w-24 h-24 bg-gradient-to-br from-amber-200/20 to-orange-200/10 rounded-full blur-2xl animate-pulse-slower" />
    </div>

    {/* Main app content */}
    <App />

    {/* Subtle noise overlay for texture */}
    <div
      className="fixed inset-0 -z-5 pointer-events-none opacity-[0.015]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  </div>
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
)
