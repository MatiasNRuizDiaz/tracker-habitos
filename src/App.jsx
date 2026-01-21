/* eslint-disable react-hooks/static-components */
import { useState, useEffect } from 'react'
import {
  LayoutDashboard, History, TrendingUp, Plus, X, Check,
  Dumbbell, BookOpen, Droplets, Heart, Zap, Flame, Trophy,
  ArrowRight, Save, Sparkles, Lightbulb, PartyPopper, Star,
  Moon, Sun, Volume2, VolumeX, Download, Upload, Trash2, GripVertical,
  MessageSquare, Target, Sprout
} from 'lucide-react'
import StreakPlant from './StreakPlant'

// --- COMPONENTE: Splash Screen con Lamparita ---
const SplashScreen = ({ onFinish }) => {
  const [phase, setPhase] = useState(0) // 0: dark, 1: flicker, 2: glow, 3: fade out

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 300),   // Start flicker
      setTimeout(() => setPhase(2), 1500),  // Full glow
      setTimeout(() => setPhase(3), 2200),  // Start fade out
      setTimeout(() => onFinish(), 2800),   // Complete
    ]
    return () => timers.forEach(clearTimeout)
  }, [onFinish])

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 transition-opacity duration-700 ${phase === 3 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      {/* Ambient particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-indigo-400/30 rounded-full transition-opacity duration-1000 ${phase >= 2 ? 'opacity-100' : 'opacity-0'}`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative flex flex-col items-center">
        {/* Glow effect behind bulb */}
        <div className={`absolute w-48 h-48 rounded-full blur-3xl transition-all duration-700 ${phase >= 2 ? 'bg-amber-400/40 scale-100' : 'bg-transparent scale-50'
          }`} />

        {/* Lightbulb */}
        <div className={`relative z-10 p-6 rounded-full transition-all duration-300 ${phase === 0 ? 'bg-slate-800' :
          phase === 1 ? 'animate-flicker bg-amber-500/50' :
            'bg-gradient-to-br from-amber-300 to-amber-500 shadow-2xl shadow-amber-400/50'
          }`}>
          <Lightbulb
            size={64}
            className={`transition-all duration-300 ${phase === 0 ? 'text-slate-600' :
              phase === 1 ? 'text-amber-200' :
                'text-white drop-shadow-lg'
              }`}
            strokeWidth={1.5}
          />
        </div>

        {/* Text */}
        <div className={`mt-8 text-center transition-all duration-700 ${phase >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <h1 className="text-3xl font-bold text-white mb-2">Habit Tracker</h1>
          <p className="text-indigo-300/80 text-sm font-medium">Iluminando tu camino al éxito</p>
        </div>

        {/* Loading dots */}
        <div className={`flex gap-2 mt-6 transition-opacity duration-500 ${phase >= 1 && phase < 3 ? 'opacity-100' : 'opacity-0'}`}>
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 150}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// --- COMPONENTE: Modal de Celebración ---
const CelebrationModal = ({ isOpen, onClose, porcentaje, totalChecks, totalPosibles }) => {
  const [confetti, setConfetti] = useState([])

  useEffect(() => {
    if (isOpen) {
      // Generate random confetti pieces
      const pieces = []
      for (let i = 0; i < 50; i++) {
        pieces.push({
          id: i,
          left: Math.random() * 100,
          delay: Math.random() * 2,
          duration: 2 + Math.random() * 2,
          color: ['#6366f1', '#8b5cf6', '#f59e0b', '#10b981', '#ef4444', '#ec4899'][Math.floor(Math.random() * 6)],
          size: 6 + Math.random() * 8,
        })
      }
      setConfetti(pieces)
    }
  }, [isOpen])

  if (!isOpen) return null

  const getMessage = () => {
    if (porcentaje >= 80) return { title: "¡Increíble! 🏆", subtitle: "Superaste tus objetivos esta semana" }
    if (porcentaje >= 60) return { title: "¡Muy bien! 🌟", subtitle: "Buen trabajo esta semana" }
    if (porcentaje >= 40) return { title: "¡Buen esfuerzo! 💪", subtitle: "Sigue mejorando cada día" }
    return { title: "¡Nueva semana! 🚀", subtitle: "Es hora de mejorar" }
  }

  const { title, subtitle } = getMessage()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {confetti.map((piece) => (
          <div
            key={piece.id}
            className="absolute animate-confetti-fall"
            style={{
              left: `${piece.left}%`,
              top: '-20px',
              width: piece.size,
              height: piece.size,
              backgroundColor: piece.color,
              borderRadius: '2px',
              animationDelay: `${piece.delay}s`,
              animationDuration: `${piece.duration}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          />
        ))}
      </div>

      {/* Modal */}
      <div className="relative bg-white rounded-3xl p-8 md:p-10 max-w-md w-full shadow-2xl animate-scale-in text-center">
        {/* Floating stars */}
        <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-amber-200 animate-bounce">
          <Star size={24} className="text-white fill-white" />
        </div>
        <div className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 animate-bounce" style={{ animationDelay: '0.2s' }}>
          <PartyPopper size={24} className="text-white" />
        </div>

        {/* Content */}
        <div className="mb-6">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
            <Trophy size={36} className="text-indigo-500" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2">{title}</h2>
          <p className="text-gray-500 font-medium">{subtitle}</p>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-indigo-50 to-violet-50 rounded-2xl p-6 mb-6">
          <div className="text-5xl font-extrabold bg-gradient-to-r from-indigo-500 to-violet-600 bg-clip-text text-transparent mb-2">
            {porcentaje}%
          </div>
          <p className="text-gray-500 text-sm font-semibold">
            Completaste {totalChecks} de {totalPosibles} hábitos
          </p>
        </div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="w-full py-4 bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white rounded-2xl font-bold shadow-lg shadow-indigo-200 active:scale-[0.98] transition-all"
        >
          ¡Comenzar nueva semana!
        </button>
      </div>
    </div>
  )
}

// --- COMPONENTE: Modal de Confirmación de Eliminación ---
const DeleteConfirmModal = ({ isOpen, habitName, onConfirm, onCancel }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-fade-in"
        onClick={onCancel}
      />
      <div className="relative bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl animate-scale-in text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-rose-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Trash2 size={28} className="text-red-500" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">¿Eliminar hábito?</h3>
        <p className="text-gray-500 text-sm mb-6">
          Vas a eliminar <span className="font-bold text-gray-700">{habitName}</span>. Esta acción no se puede deshacer.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-semibold transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-3 bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white rounded-xl font-semibold shadow-lg shadow-red-200 active:scale-[0.98] transition-all"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}


// --- COMPONENTE: Círculo de Progreso Premium ---
const CircularProgress = ({ porcentaje, color }) => {
  const radio = 38
  const circunferencia = 2 * Math.PI * radio
  const offset = circunferencia - (porcentaje / 100) * circunferencia

  return (
    <div className="relative flex items-center justify-center w-28 h-28">
      <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 100 100">
        {/* Outer glow */}
        <circle
          cx="50" cy="50" r={radio + 4}
          fill="transparent"
          stroke={`${color}20`}
          strokeWidth="1"
        />
        {/* Background circle */}
        <circle
          cx="50" cy="50" r={radio}
          stroke="currentColor"
          strokeWidth="5"
          fill="transparent"
          className="text-gray-100"
        />
        {/* Progress circle with gradient effect */}
        <circle
          cx="50" cy="50" r={radio}
          stroke={color}
          strokeWidth="5"
          fill="transparent"
          strokeDasharray={circunferencia}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
          style={{
            filter: `drop-shadow(0 0 6px ${color}60)`
          }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-2xl font-bold bg-gradient-to-br from-gray-700 to-gray-900 bg-clip-text text-transparent">{Math.round(porcentaje)}%</span>
      </div>
    </div>
  )
}



// --- COMPONENTE: Tarjeta con animación ---
const AnimatedCard = ({ children, className = '', delay = 0 }) => (
  <div
    className={`opacity-0 animate-fade-in-up ${className}`}
    style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
  >
    {children}
  </div>
)

function App() {
  // --- CONFIGURACIÓN ---
  const [showSplash, setShowSplash] = useState(true)
  const [vistaActual, setVistaActual] = useState('tracker')
  const [mostrarForm, setMostrarForm] = useState(false)
  const [nuevoHabito, setNuevoHabito] = useState('')
  const [isLoaded, setIsLoaded] = useState(false)
  const [showCelebration, setShowCelebration] = useState(false)
  const [celebrationData, setCelebrationData] = useState({ porcentaje: 0, totalChecks: 0, totalPosibles: 0 })
  const diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
  const hoy = new Date()
  const fechaFormateada = hoy.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })

  // Trigger load animation after splash
  useEffect(() => {
    if (!showSplash) {
      setTimeout(() => setIsLoaded(true), 100)
    }
  }, [showSplash])

  // --- ESTADOS ---
  const [habitos, setHabitos] = useState(() => {
    const guardado = localStorage.getItem('tracker-habitos-v7')
    if (guardado) return JSON.parse(guardado)
    return [
      { id: 1, nombre: 'Ejercicio', dias: [true, true, false, true, false, false, false] },
      { id: 2, nombre: 'Leer 30 min', dias: [true, false, true, false, true, false, true] },
    ]
  })

  const [historial, setHistorial] = useState(() => {
    const guardado = localStorage.getItem('tracker-historial-v7')
    if (guardado) return JSON.parse(guardado)
    return []
  })

  // --- PERSISTENCIA ---
  useEffect(() => { localStorage.setItem('tracker-habitos-v7', JSON.stringify(habitos)) }, [habitos])
  useEffect(() => { localStorage.setItem('tracker-historial-v7', JSON.stringify(historial)) }, [historial])

  // --- DARK MODE ---
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('tracker-darkmode')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    localStorage.setItem('tracker-darkmode', JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  // --- SOUND ---
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('tracker-sound')
    return saved ? JSON.parse(saved) : true
  })

  useEffect(() => {
    localStorage.setItem('tracker-sound', JSON.stringify(soundEnabled))
  }, [soundEnabled])

  const playSound = () => {
    if (!soundEnabled) return
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2Onq+3wMjO09rf5OTi3tjSycK6sq+mp6Wpq6yurKqpqKenp6ioqautrq6urq6urq2traytrq+wsbKztLW1trW0s7GvrKmlop+cmpmam5yeoKKjpKSkpKOhn5yZl5WUk5OTlJWXmZudoKOmqautrq6trKqnpKGempiWlZWVlpianJ6goaKio6OioaGenJqYl5aWl5iZmpudnp+goKCfnp2cmpmXlpaWlpiZmpydnp+fn5+fnp2cm5qZmJeXl5eYmZqbnJ2dnp6enZ2cmpmYl5aWlpeYmZqbnJydnZ2dnJybmpmYl5aWlpeYmZmam5ucnJycnJubmpmYl5aWlpaXmJmam5ubnJycm5ubmpmYl5aVlZaXmJmam5ubnJycm5qZmZiXlpaWl5iZmpubm5ubm5uamZiXl5aWl5eYmZqam5ubm5uamZmYl5aWlpeYmJmam5ubm5uamZmYl5eWlpaXmJiZmpqbm5uampmYl5eWlpaXmJiZmpqam5qamZiXl5aWlpeXmJmampqampqZmJeXlpaWl5eYmZmampqampqZmJeXlpaWl5eYmJmZmpqampqZmZiXl5aWlpaXmJiZmZqampqamZiYl5eWlpaXl5iYmZmampqamZmYl5eXlpaWl5eYmJmZmZqampmZmJeXl5aWlpeXmJiYmZmZmpmZmJiXl5eWlpaXl5iYmJmZmZmZmZiYl5eXlpaWl5eYmJiZmZmZmZiYl5eXl5aWlpeXmJiYmJmZmZmYmJeXl5eWlpaXl5iYmJiYmZmZmJiXl5eXl5aWl5eYmJiYmJiZmZiYl5eXl5eWlpeXl5iYmJiYmJiYmJeXl5eXlpaWl5eXmJiYmJiYmJiXl5eXl5eWlpaXl5eYmJiYmJiYmJeXl5eXl5aWlpeXl5iYmJiYmJiXl5eXl5eXlpaWl5eXmJiYmJiYl5eXl5eXl5aWlpaXl5eYmJiYmJiXl5eXl5eXlpaWlpeXl5iYmJiYl5eXl5eXl5aWlpaWl5eXl5iYmJeXl5eXl5eXlpaWlpaXl5eXl5eXl5eXl5eXl5eWlpaWlpaXl5eXl5eXl5eXl5eXl5aWlpaWlpaXl5eXl5eXl5eXl5eXlpaWlpaWlpaXl5eXl5eXl5eXl5aWlpaWlpaWl5eXl5eXl5eXl5eWlpaWlpaWlpaXl5eXl5eXl5eWlpaWlpaWlpaWl5eXl5eXl5eWlpaWlpaWlpaWl5eXl5eXl5aWlpaWlpaWlpaWl5eXl5eXlpaWlpaWlpaWlpaWl5eXl5aWlpaWlpaWlpaWlpaWl5eXlpaWlpaWlpaWlpaWlpaWl5aWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaWlpaW')
    audio.volume = 0.3
    audio.play().catch(() => { })
  }

  // --- DELETE MODAL ---
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, habitId: null, habitName: '' })

  const handleDeleteClick = (habito) => {
    setDeleteModal({ isOpen: true, habitId: habito.id, habitName: habito.nombre })
  }

  const handleDeleteConfirm = () => {
    setHabitos(habitos.filter(h => h.id !== deleteModal.habitId))
    setDeleteModal({ isOpen: false, habitId: null, habitName: '' })
  }

  const handleDeleteCancel = () => {
    setDeleteModal({ isOpen: false, habitId: null, habitName: '' })
  }

  // --- EXPORT/IMPORT ---
  const exportData = () => {
    const data = {
      habitos,
      historial,
      settings: { darkMode, soundEnabled },
      exportedAt: new Date().toISOString()
    }
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `habit-tracker-backup-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const importData = (event) => {
    const file = event.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result)
        if (data.habitos) setHabitos(data.habitos)
        if (data.historial) setHistorial(data.historial)
        if (data.settings) {
          if (data.settings.darkMode !== undefined) setDarkMode(data.settings.darkMode)
          if (data.settings.soundEnabled !== undefined) setSoundEnabled(data.settings.soundEnabled)
        }
        alert('¡Datos importados correctamente!')
      } catch {
        alert('Error al importar: archivo inválido')
      }
    }
    reader.readAsText(file)
    event.target.value = ''
  }


  // --- FUNCIONES ---
  const getEstiloHabito = (nombre) => {
    const n = nombre.toLowerCase()
    if (n.includes('ejercicio') || n.includes('gym')) return { icon: <Dumbbell size={18} />, color: '#ef4444', bg: 'bg-gradient-to-br from-red-50 to-rose-100', text: 'text-red-500', accent: 'red' }
    if (n.includes('leer') || n.includes('estudiar')) return { icon: <BookOpen size={18} />, color: '#6366f1', bg: 'bg-gradient-to-br from-indigo-50 to-violet-100', text: 'text-indigo-500', accent: 'indigo' }
    if (n.includes('agua') || n.includes('beber')) return { icon: <Droplets size={18} />, color: '#06b6d4', bg: 'bg-gradient-to-br from-cyan-50 to-sky-100', text: 'text-cyan-500', accent: 'cyan' }
    if (n.includes('meditar')) return { icon: <Heart size={18} />, color: '#8b5cf6', bg: 'bg-gradient-to-br from-violet-50 to-purple-100', text: 'text-violet-500', accent: 'violet' }
    return { icon: <Zap size={18} />, color: '#f59e0b', bg: 'bg-gradient-to-br from-amber-50 to-orange-100', text: 'text-amber-500', accent: 'amber' }
  }

  const toggleDia = (idHabito, indexDia) => {
    setHabitos(habitos.map(habito => {
      if (habito.id === idHabito) {
        const nuevosDias = [...habito.dias]
        const wasCompleted = nuevosDias[indexDia]
        nuevosDias[indexDia] = !nuevosDias[indexDia]

        // Play sound only when marking as complete
        if (!wasCompleted) {
          playSound()
        }

        // Calculate current streak (consecutive days from start)
        let currentStreak = 0
        for (let i = 0; i < nuevosDias.length; i++) {
          if (nuevosDias[i]) currentStreak++
          else if (currentStreak > 0) break
        }

        const bestStreak = Math.max(habito.bestStreak || 0, currentStreak)

        return { ...habito, dias: nuevosDias, currentStreak, bestStreak }
      }
      return habito
    }))
  }

  const eliminarHabito = (id) => setHabitos(habitos.filter(h => h.id !== id))

  const agregarHabito = (e) => {
    e.preventDefault()
    if (!nuevoHabito.trim()) return
    setHabitos([...habitos, { id: Date.now(), nombre: nuevoHabito, dias: Array(7).fill(false) }])
    setNuevoHabito('')
    setMostrarForm(false)
  }

  const cerrarSemana = () => {
    const totalChecks = habitos.reduce((acc, h) => acc + h.dias.filter(d => d).length, 0)
    const totalPosibles = habitos.length * 7
    const porcentaje = totalPosibles > 0 ? Math.round((totalChecks / totalPosibles) * 100) : 0

    const nuevaEntrada = {
      id: Date.now(),
      fecha: `Semana del ${fechaFormateada}`,
      porcentaje: porcentaje,
      fraccion: `${totalChecks}/${totalPosibles}`,
      detalleHabitos: habitos
    }

    setHistorial([nuevaEntrada, ...historial])
    setCelebrationData({ porcentaje, totalChecks, totalPosibles })
    setShowCelebration(true)
  }

  const handleCloseCelebration = () => {
    setShowCelebration(false)
    setHabitos(habitos.map(h => ({ ...h, dias: Array(7).fill(false) })))
  }

  const totalCompletados = habitos.reduce((acc, h) => acc + h.dias.filter(d => d).length, 0)

  // --- VISTAS ---
  const VistaTracker = () => (
    <div className="space-y-6 md:space-y-8">
      {/* Header */}
      <AnimatedCard delay={0}>
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 rounded-full border border-indigo-200/50">
                <Sparkles size={12} className="text-indigo-500" />
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">Tu semana</span>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 bg-clip-text text-transparent">Tracker Semanal</h2>
            <p className="text-gray-400 font-medium mt-1 text-sm">{fechaFormateada}, {new Date().getFullYear()}</p>
          </div>
          <button
            onClick={cerrarSemana}
            className="w-full md:w-auto flex justify-center items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 active:scale-[0.98] text-white rounded-2xl font-semibold shadow-xl shadow-gray-900/20 hover:shadow-2xl transition-all duration-300"
          >
            <Save size={18} /> Cerrar Semana
          </button>
        </header>
      </AnimatedCard>

      {/* Main Card - Habits Table */}
      <AnimatedCard delay={100} className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl shadow-gray-200/50 border border-white overflow-hidden">
        <div className="p-5 md:p-6 border-b border-gray-100/80 flex justify-between items-center bg-gradient-to-r from-white to-gray-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
              <LayoutDashboard size={18} className="text-white" />
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold text-gray-800">Mis Hábitos</h3>
              <p className="text-[10px] text-gray-400 font-semibold">
                {totalCompletados} de {habitos.length * 7} completados
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {/* Mini progress bar */}
            <div className="hidden md:flex items-center gap-2">
              <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
                  style={{ width: `${habitos.length > 0 ? (totalCompletados / (habitos.length * 7)) * 100 : 0}%` }}
                />
              </div>
              <span className="text-xs font-bold text-indigo-600">
                {habitos.length > 0 ? Math.round((totalCompletados / (habitos.length * 7)) * 100) : 0}%
              </span>
            </div>
            <button
              onClick={() => setMostrarForm(!mostrarForm)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-50 to-violet-50 hover:from-indigo-100 hover:to-violet-100 text-indigo-600 rounded-xl active:scale-95 transition-all text-xs md:text-sm font-bold border border-indigo-100"
            >
              <Plus size={16} /> {mostrarForm ? 'Cancelar' : 'Nuevo Hábito'}
            </button>
          </div>
        </div>

        {/* New Habit Form */}
        {mostrarForm && (
          <div className="p-5 bg-gradient-to-r from-indigo-50/80 via-violet-50/50 to-purple-50/80 flex flex-col md:flex-row gap-3 animate-slide-down border-b border-indigo-100/50">
            <input
              type="text"
              placeholder="Nombre del hábito..."
              className="flex-1 p-4 border-2 border-indigo-100 bg-white rounded-2xl focus:ring-4 focus:ring-indigo-100 focus:border-indigo-300 text-gray-700 font-medium transition-all outline-none shadow-inner"
              value={nuevoHabito}
              onChange={(e) => setNuevoHabito(e.target.value)}
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && agregarHabito(e)}
            />
            <button
              onClick={agregarHabito}
              className="bg-gradient-to-r from-indigo-500 to-violet-600 hover:from-indigo-600 hover:to-violet-700 text-white py-4 px-8 rounded-2xl font-bold shadow-lg shadow-indigo-300 active:scale-95 transition-all"
            >
              Guardar
            </button>
          </div>
        )}

        {/* Habits Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] md:min-w-full">
            <thead>
              <tr className="text-left text-[10px] uppercase tracking-widest text-gray-400 border-b border-gray-100 bg-gradient-to-r from-gray-50/80 to-white">
                <th className="p-4 md:p-5 font-bold w-1/3 pl-6">Hábito</th>
                {diasSemana.map((dia, idx) => {
                  const hoyIdx = (new Date().getDay() + 6) % 7 // Adjust to Monday = 0
                  const isToday = idx === hoyIdx
                  return (
                    <th key={dia} className="p-4 md:p-5 text-center font-bold">
                      <div className={`inline-flex flex-col items-center ${isToday ? 'text-indigo-600' : ''}`}>
                        <span>{dia}</span>
                        {isToday && <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full mt-1" />}
                      </div>
                    </th>
                  )
                })}
                <th className="p-4 md:p-5 w-12"></th>
              </tr>
            </thead>
            <tbody>
              {habitos.map((habito, idx) => {
                const style = getEstiloHabito(habito.nombre)
                return (
                  <tr
                    key={habito.id}
                    className="border-b border-gray-50 hover:bg-gradient-to-r hover:from-gray-50/50 hover:to-indigo-50/30 transition-all group"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <td className="p-4 md:p-5 pl-6">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl ${style.bg} ${style.text} shadow-sm transition-all group-hover:scale-110 group-hover:shadow-md`}>
                          {style.icon}
                        </div>
                        <div className="flex flex-col">
                          <span className="font-semibold text-gray-700 text-sm">{habito.nombre}</span>
                          {(habito.currentStreak || 0) > 0 && (
                            <span className="text-[10px] font-bold text-orange-500 flex items-center gap-1">
                              <Flame size={10} /> {habito.currentStreak} días
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    {habito.dias.map((completado, index) => (
                      <td key={`${habito.id}-${index}`} className="p-2 text-center">
                        <button
                          onClick={() => toggleDia(habito.id, index)}
                          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-150 ${completado
                            ? 'bg-gradient-to-br from-indigo-500 to-violet-600 text-white shadow-lg shadow-indigo-200'
                            : 'bg-gray-100 text-gray-300 hover:bg-gray-200'
                            } active:opacity-80`}
                        >
                          <Check size={18} strokeWidth={3} className={completado ? 'opacity-100' : 'opacity-0'} />
                        </button>
                      </td>
                    ))}
                    <td className="p-4 md:p-5 text-center">
                      <button
                        onClick={() => handleDeleteClick(habito)}
                        className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-xl transition-all opacity-0 group-hover:opacity-100"
                      >
                        <X size={16} />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {
          habitos.length === 0 && (
            <div className="p-16 text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-indigo-100 to-violet-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Plus size={32} className="text-indigo-400" />
              </div>
              <p className="text-gray-600 font-semibold">No tienes hábitos aún</p>
              <p className="text-gray-400 text-sm mt-1">Agregá tu primer hábito para comenzar</p>
            </div>
          )
        }
      </AnimatedCard >

      {/* Goals Section */}
      < AnimatedCard delay={200} >
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-200">
            <Trophy size={18} className="text-white" />
          </div>
          <h3 className="text-lg md:text-xl font-bold text-gray-800">Progreso de la Semana</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {habitos.map((habito, idx) => {
            const diasOk = habito.dias.filter(d => d).length
            const style = getEstiloHabito(habito.nombre)
            return (
              <div
                key={habito.id}
                className="bg-white/80 backdrop-blur-sm p-5 rounded-3xl shadow-lg shadow-gray-200/50 border border-white flex flex-col items-center hover:-translate-y-2 hover:shadow-xl transition-all duration-300 cursor-default group"
                style={{ animationDelay: `${200 + idx * 50}ms` }}
              >
                <div className={`p-3 rounded-2xl ${style.bg} ${style.text} mb-3 group-hover:scale-110 transition-transform shadow-sm`}>
                  {style.icon}
                </div>
                <h4 className="font-bold text-gray-700 text-sm mb-3 text-center">{habito.nombre}</h4>
                <CircularProgress porcentaje={(diasOk / 7) * 100} color={style.color} />
                <p className="mt-3 text-xs font-bold text-gray-400">{diasOk} / 7 días</p>
              </div>
            )
          })}
        </div>

        {/* Growing Plant - Tu Racha */}

      </AnimatedCard >
    </div >
  )

  const VistaHistorial = () => (
    <div className={`max-w-3xl mx-auto ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
      <AnimatedCard delay={0}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-200">
            <History size={18} className="text-white" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-violet-500 uppercase tracking-widest">Registro</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800">Historial</h2>
          </div>
        </div>
      </AnimatedCard>

      <div className="space-y-4">
        {historial.length === 0 ? (
          <AnimatedCard delay={100} className="text-center py-20 bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-dashed border-gray-200 shadow-lg">
            <div className="w-20 h-20 bg-gradient-to-br from-violet-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-4">
              <History size={32} className="text-violet-400" />
            </div>
            <p className="text-gray-600 font-semibold">Sin historial aún</p>
            <p className="text-gray-400 text-sm mt-1">Cerrá tu primera semana para ver el registro</p>
          </AnimatedCard>
        ) : (
          historial.map((item, idx) => (
            <AnimatedCard key={item.id} delay={100 + idx * 50}>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl shadow-lg shadow-gray-200/50 border border-white hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-gray-700 group-hover:text-violet-600 transition-colors">{item.fecha}</h3>
                  <span className="text-3xl font-extrabold bg-gradient-to-r from-violet-500 to-purple-600 bg-clip-text text-transparent">{item.porcentaje}%</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-3">
                  <div
                    className="h-full bg-gradient-to-r from-violet-400 via-purple-500 to-indigo-500 rounded-full transition-all duration-1000"
                    style={{ width: `${item.porcentaje}%` }}
                  />
                </div>
                <div className="text-xs text-gray-400 font-semibold">Completados: {item.fraccion}</div>
              </div>
            </AnimatedCard>
          ))
        )}
      </div>
    </div>
  )

  const VistaAvance = () => (
    <div className={`max-w-4xl mx-auto space-y-6 ${isLoaded ? 'animate-fade-in' : 'opacity-0'}`}>
      <AnimatedCard delay={0}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200">
            <TrendingUp size={18} className="text-white" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Estadísticas</span>
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800">Mi Avance</h2>
          </div>
        </div>
      </AnimatedCard>

      {/* Streak Card - Premium */}
      <AnimatedCard delay={100} className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-400 via-rose-500 to-pink-600" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.05\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        <div className="relative p-8 md:p-10 text-white">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
          <div className="relative z-10">
            <p className="text-white/70 font-bold text-xs uppercase tracking-widest mb-2">Racha Actual</p>
            <h3 className="text-5xl md:text-6xl font-extrabold flex items-center gap-4">
              12 días <Flame size={40} className="text-amber-200 animate-pulse drop-shadow-lg" />
            </h3>
            <p className="text-white/80 text-sm mt-3 font-medium">¡Estás en llamas! 🔥 Seguí así que vas muy bien.</p>
          </div>
        </div>
      </AnimatedCard>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <AnimatedCard delay={150} className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl border border-white shadow-lg shadow-gray-200/50 text-center hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
          <div className="w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-lg shadow-emerald-200">
            <Trophy size={24} />
          </div>
          <h3 className="text-4xl font-extrabold bg-gradient-to-br from-gray-700 to-gray-900 bg-clip-text text-transparent">{totalCompletados}</h3>
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-1">Completados</p>
        </AnimatedCard>

        <AnimatedCard delay={200} className="bg-white/80 backdrop-blur-sm p-6 rounded-3xl border border-white shadow-lg shadow-gray-200/50 text-center hover:-translate-y-1 hover:shadow-xl transition-all duration-300 group">
          <div className="w-14 h-14 bg-gradient-to-br from-indigo-400 to-violet-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform shadow-lg shadow-indigo-200">
            <Zap size={24} />
          </div>
          <h3 className="text-4xl font-extrabold bg-gradient-to-br from-gray-700 to-gray-900 bg-clip-text text-transparent">{habitos.length}</h3>
          <p className="text-gray-400 font-bold text-[10px] uppercase tracking-widest mt-1">Hábitos Activos</p>
        </AnimatedCard>
      </div>

      {/* Category Performance */}
      <AnimatedCard delay={250}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center shadow-md shadow-indigo-200">
            <ArrowRight size={14} className="text-white" />
          </div>
          <h3 className="text-lg font-bold text-gray-800">Desempeño por Categoría</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {habitos.map((habito, idx) => {
            const diasOk = habito.dias.filter(d => d).length
            const style = getEstiloHabito(habito.nombre)
            const porcentaje = Math.round((diasOk / 7) * 100)
            return (
              <div
                key={habito.id}
                className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl shadow-md shadow-gray-200/50 border border-white hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${250 + idx * 50}ms` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2.5 rounded-xl ${style.bg} ${style.text} shadow-sm`}>
                    {style.icon}
                  </div>
                  <span className="font-semibold text-gray-700 text-sm flex-1">{habito.nombre}</span>
                  <span className="text-sm font-extrabold" style={{ color: style.color }}>{porcentaje}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-2.5 rounded-full transition-all duration-1000"
                    style={{ width: `${porcentaje}%`, background: `linear-gradient(to right, ${style.color}, ${style.color}cc)` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </AnimatedCard>
    </div>
  )

  // Show splash screen first
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-violet-50/50 font-sans text-gray-800 pb-24 md:pb-0">

      {/* SIDEBAR (Desktop) */}
      <aside className="hidden md:flex w-64 bg-white/60 backdrop-blur-xl border-r border-white/80 flex-col p-6 fixed h-full z-20 shadow-xl shadow-gray-200/30">
        <div className="mb-10 flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 via-violet-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold shadow-xl shadow-indigo-300/50">
            <Lightbulb size={22} />
          </div>
          <div>
            <h1 className="text-lg font-extrabold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Habit Tracker</h1>
            <p className="text-[10px] text-gray-400 font-semibold">Iluminá tu camino</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { id: 'tracker', icon: LayoutDashboard, label: 'Tracker', gradient: 'from-indigo-500 to-violet-600', shadow: 'shadow-indigo-300' },
            { id: 'historial', icon: History, label: 'Historial', gradient: 'from-violet-500 to-purple-600', shadow: 'shadow-violet-300' },
            { id: 'avance', icon: TrendingUp, label: 'Mi Avance', gradient: 'from-blue-400 to-cyan-500', shadow: 'shadow-blue-300' },
            { id: 'planta', icon: Sprout, label: 'Mi Jardín', gradient: 'from-emerald-400 to-teal-500', shadow: 'shadow-emerald-300' },
          ].map(({ id, icon: Icon, label, gradient, shadow }) => (
            <button
              key={id}
              onClick={() => setVistaActual(id)}
              className={`flex items-center gap-3 w-full px-4 py-3.5 rounded-2xl transition-all duration-300 font-semibold text-sm ${vistaActual === id
                ? `bg-gradient-to-r ${gradient} text-white shadow-lg ${shadow}/50`
                : 'text-gray-500 hover:bg-white/80 hover:text-gray-700 hover:shadow-md'
                }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </nav>

        {/* Settings toggles */}
        <div className="space-y-2 mb-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-500 hover:bg-white/80 hover:text-gray-700 hover:shadow-md transition-all text-sm font-medium"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            {darkMode ? 'Modo Claro' : 'Modo Oscuro'}
          </button>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-gray-500 hover:bg-white/80 hover:text-gray-700 hover:shadow-md transition-all text-sm font-medium"
          >
            {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            {soundEnabled ? 'Sonido On' : 'Sonido Off'}
          </button>
        </div>

        <div className="pt-6 border-t border-gray-100">
          <p className="text-[10px] text-gray-400 text-center font-medium">© 2026 Habit Tracker</p>
        </div>
      </aside>

      {/* BOTTOM NAVIGATION (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-white/50 p-3 flex justify-around items-center z-50 shadow-2xl shadow-gray-400/20 rounded-t-3xl safe-area-bottom">
        {[
          { id: 'tracker', icon: LayoutDashboard, label: 'Tracker', gradient: 'from-indigo-500 to-violet-600' },
          { id: 'historial', icon: History, label: 'Historial', gradient: 'from-violet-500 to-purple-600' },
          { id: 'avance', icon: TrendingUp, label: 'Avance', gradient: 'from-blue-400 to-cyan-500' },
          { id: 'planta', icon: Sprout, label: 'Planta', gradient: 'from-emerald-400 to-teal-500' },
        ].map(({ id, icon: Icon, label, gradient }) => (
          <button
            key={id}
            onClick={() => setVistaActual(id)}
            className={`flex flex-col items-center gap-1.5 p-3 rounded-2xl transition-all active:scale-95 ${vistaActual === id
              ? `bg-gradient-to-br ${gradient} text-white shadow-lg`
              : 'text-gray-400'
              }`}
          >
            <Icon size={22} />
            <span className="text-[10px] font-bold">{label}</span>
          </button>
        ))}
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-4 md:p-8 md:ml-64 overflow-y-auto w-full">
        <div className="max-w-5xl mx-auto pt-2 md:pt-4">
          {vistaActual === 'tracker' && VistaTracker()}
          {vistaActual === 'historial' && VistaHistorial()}
          {vistaActual === 'avance' && VistaAvance()}
          {vistaActual === 'planta' && <StreakPlant habitos={habitos} />}
        </div>
      </main>

      {/* CELEBRATION MODAL */}
      <CelebrationModal
        isOpen={showCelebration}
        onClose={handleCloseCelebration}
        porcentaje={celebrationData.porcentaje}
        totalChecks={celebrationData.totalChecks}
        totalPosibles={celebrationData.totalPosibles}
      />

      {/* DELETE CONFIRMATION MODAL */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        habitName={deleteModal.habitName}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </div>
  )
}

export default App