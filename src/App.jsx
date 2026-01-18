/* eslint-disable react-hooks/static-components */
import { useState, useEffect } from 'react'
import { 
  LayoutDashboard, History, TrendingUp, Plus, X, Check, 
  Dumbbell, BookOpen, Droplets, Heart, Zap, Flame, Trophy, 
  ArrowRight, Save, Menu
} from 'lucide-react'

// --- COMPONENTE: Círculo de Progreso ---
const CircularProgress = ({ porcentaje, color }) => {
  const radio = 35
  const circunferencia = 2 * Math.PI * radio
  const offset = circunferencia - (porcentaje / 100) * circunferencia

  return (
    <div className="relative flex items-center justify-center w-32 h-32 group">
      <svg className="transform -rotate-90 w-full h-full drop-shadow-md">
        <circle cx="64" cy="64" r={radio} stroke="#F3F4F6" strokeWidth="8" fill="transparent" />
        <circle
          cx="64" cy="64" r={radio} stroke={color} strokeWidth="8" fill="transparent"
          strokeDasharray={circunferencia} strokeDashoffset={offset} strokeLinecap="round"
          className="transition-all duration-1000 ease-out group-hover:opacity-90"
        />
      </svg>
      <span className="absolute text-xl font-bold text-gray-700 group-hover:scale-110 transition-transform">{Math.round(porcentaje)}%</span>
    </div>
  )
}

function App() {
  // --- CONFIGURACIÓN ---
  const [vistaActual, setVistaActual] = useState('tracker')
  const [mostrarForm, setMostrarForm] = useState(false)
  const [nuevoHabito, setNuevoHabito] = useState('')
  const diasSemana = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom']
  const hoy = new Date()
  const fechaFormateada = hoy.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })

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

  // --- PERSISTENCIA (Actualizada a v7) ---
  useEffect(() => { localStorage.setItem('tracker-habitos-v7', JSON.stringify(habitos)) }, [habitos])
  useEffect(() => { localStorage.setItem('tracker-historial-v7', JSON.stringify(historial)) }, [historial])

  // --- FUNCIONES ---
  const getEstiloHabito = (nombre) => {
    const n = nombre.toLowerCase()
    if (n.includes('ejercicio') || n.includes('gym')) return { icon: <Dumbbell size={20}/>, color: '#EF4444', label: 'Salud Física' }
    if (n.includes('leer') || n.includes('estudiar')) return { icon: <BookOpen size={20}/>, color: '#3B82F6', label: 'Crecimiento' }
    if (n.includes('agua') || n.includes('beber')) return { icon: <Droplets size={20}/>, color: '#06B6D4', label: 'Hidratación' }
    if (n.includes('meditar')) return { icon: <Heart size={20}/>, color: '#8B5CF6', label: 'Bienestar' }
    return { icon: <Zap size={20}/>, color: '#F59E0B', label: 'General' }
  }

  const toggleDia = (idHabito, indexDia) => {
    setHabitos(habitos.map(habito => {
      if (habito.id === idHabito) {
        const nuevosDias = [...habito.dias]
        nuevosDias[indexDia] = !nuevosDias[indexDia]
        return { ...habito, dias: nuevosDias }
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
    if (confirm("¿Finalizar semana? Se guardará en el historial.")) {
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
      setHabitos(habitos.map(h => ({ ...h, dias: Array(7).fill(false) })))
      alert("¡Semana guardada!")
    }
  }

  const totalCompletados = habitos.reduce((acc, h) => acc + h.dias.filter(d => d).length, 0)

  // --- VISTAS ---
  const VistaTracker = () => (
    <div className="animate-fade-in space-y-6 md:space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight">Tracker Semanal</h2>
          <p className="text-gray-500 font-medium mt-1 text-sm md:text-base">{fechaFormateada} — {new Date().getFullYear()}</p>
        </div>
        <button 
          onClick={cerrarSemana}
          className="w-full md:w-auto flex justify-center items-center gap-2 px-5 py-3 bg-gray-900 active:scale-95 hover:bg-gray-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
        >
          <Save size={18} /> Cerrar Semana
        </button>
      </header>

      {/* HOVER APLICADO A LA TARJETA PRINCIPAL */}
      <section className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/5 transition-all duration-500">
        <div className="p-4 md:p-8 border-b border-gray-50 flex justify-between items-center bg-gradient-to-r from-white to-gray-50">
          <h3 className="text-lg md:text-xl font-bold text-gray-800">Mis Hábitos</h3>
          <button onClick={() => setMostrarForm(!mostrarForm)} className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-700 rounded-xl active:bg-gray-100 hover:border-blue-300 hover:text-blue-600 transition-all text-xs md:text-sm font-bold shadow-sm">
            <Plus size={16} /> {mostrarForm ? 'Cancelar' : 'Nuevo'}
          </button>
        </div>

        {mostrarForm && (
          <div className="p-4 md:p-6 bg-blue-50/50 flex flex-col md:flex-row gap-3 animate-fade-in border-b border-blue-100">
            <input 
              type="text" placeholder="Nuevo hábito..." className="flex-1 p-3 md:p-4 border-0 bg-white rounded-xl md:rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 text-gray-700 font-medium"
              value={nuevoHabito} onChange={(e) => setNuevoHabito(e.target.value)} autoFocus
            />
            <button onClick={agregarHabito} className="bg-blue-600 text-white py-3 md:py-0 px-8 rounded-xl md:rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all">Guardar</button>
          </div>
        )}

        <div className="overflow-x-auto pb-2">
          <table className="w-full min-w-[600px] md:min-w-full">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-gray-400 border-b border-gray-100 bg-gray-50/30">
                <th className="p-4 md:p-6 font-bold w-1/3 pl-6 md:pl-8">Hábito</th>
                {diasSemana.map(dia => <th key={dia} className="p-4 md:p-6 text-center font-bold">{dia}</th>)}
                <th className="p-4 md:p-6"></th>
              </tr>
            </thead>
            <tbody>
              {habitos.map(habito => (
                <tr key={habito.id} className="border-b border-gray-50 hover:bg-blue-50/30 transition-colors group">
                  <td className="p-4 md:p-6 pl-6 md:pl-8 font-semibold text-gray-700 flex items-center gap-3 md:gap-4 text-sm md:text-base">
                    <div className="p-2 rounded-lg bg-gray-100 text-gray-500 hidden md:block group-hover:bg-white group-hover:text-blue-600 transition-all">
                      {getEstiloHabito(habito.nombre).icon}
                    </div>
                    {habito.nombre}
                  </td>
                  {habito.dias.map((completado, index) => (
                    <td key={index} className="p-2 text-center">
                      <button onClick={() => toggleDia(habito.id, index)} className={`w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center transition-all ${completado ? 'bg-blue-600 text-white shadow-md active:scale-90' : 'bg-gray-100 text-transparent hover:bg-gray-200 active:scale-90'}`}>
                        <Check size={16} strokeWidth={3.5} className="md:w-5 md:h-5" />
                      </button>
                    </td>
                  ))}
                  <td className="p-4 md:p-6 text-center">
                    <button onClick={() => eliminarHabito(habito.id)} className="text-gray-300 hover:text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all"><X size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <div>
        <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6">Objetivos</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {habitos.map(habito => {
            const diasOk = habito.dias.filter(d => d).length
            const style = getEstiloHabito(habito.nombre)
            return (
              /* HOVER ESTANDARIZADO EN TARJETAS DE OBJETIVOS */
              <div key={habito.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center hover:-translate-y-2 hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 cursor-default group">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-gray-50 text-gray-600 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">{style.icon}</div>
                  <h4 className="font-bold text-gray-800">{habito.nombre}</h4>
                </div>
                <CircularProgress porcentaje={(diasOk / 7) * 100} color={style.color} />
                <p className="mt-4 text-xs font-bold text-gray-400 group-hover:text-gray-600 transition-colors">{diasOk} / 7 días</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )

  const VistaHistorial = () => (
    <div className="animate-fade-in max-w-4xl mx-auto">
      <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-6">Historial</h2>
      <div className="space-y-4 md:space-y-6">
        {historial.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-500">Sin historial aún.</p>
          </div>
        ) : (
          historial.map((item) => (
            /* HOVER ESTANDARIZADO EN TARJETAS DEL HISTORIAL */
            <div key={item.id} className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 hover:-translate-y-2 hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-100 transition-all duration-300 group">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-lg md:text-xl text-gray-900 group-hover:text-blue-700 transition-colors">{item.fecha}</h3>
                <span className="text-2xl md:text-3xl font-extrabold text-blue-600">{item.porcentaje}%</span>
              </div>
              <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-4">
                <div className="h-full bg-blue-500 rounded-full group-hover:bg-blue-600 transition-all" style={{ width: `${item.porcentaje}%` }}></div>
              </div>
              <div className="text-xs text-gray-400 font-medium">Hitos: {item.fraccion}</div>
            </div>
          ))
        )}
      </div>
    </div>
  )

  const VistaAvance = () => (
    <div className="animate-fade-in max-w-5xl mx-auto space-y-6">
      <h2 className="text-2xl md:text-4xl font-extrabold text-gray-900">Mi Avance</h2>
      
      {/* HOVER EN TARJETA DE RACHA (La naranja) */}
      <div className="bg-gradient-to-br from-orange-500 to-pink-600 p-6 md:p-8 rounded-3xl text-white shadow-xl relative overflow-hidden hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/30 transition-all duration-300">
        <div className="relative z-10">
           <p className="text-orange-100 font-bold uppercase text-xs mb-1">Racha Actual</p>
           <h3 className="text-4xl md:text-5xl font-extrabold flex items-center gap-3">
             12 días <Flame size={32} className="text-orange-200 animate-pulse"/>
           </h3>
           <p className="text-white/80 text-sm mt-2 font-medium">¡Estás imparable!</p>
        </div>
      </div>

      {/* HOVER EN TARJETA DE TOTALES (La blanca) */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center hover:-translate-y-2 hover:shadow-xl transition-all duration-300 group">
        <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform"><Trophy size={24}/></div>
        <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900">{totalCompletados}</h3>
        <p className="text-gray-400 font-bold text-xs uppercase mt-1">Hábitos Completados</p>
      </div>

       <div>
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><ArrowRight size={20} className="text-blue-600"/> Desempeño por Categoría</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {habitos.map(habito => {
               const diasOk = habito.dias.filter(d => d).length
               const style = getEstiloHabito(habito.nombre)
               return (
                 /* HOVER EN TARJETAS PEQUEÑAS DE CATEGORÍA */
                 <div key={habito.id} className="bg-white p-5 rounded-3xl shadow-sm border border-gray-100 hover:-translate-y-1 hover:border-blue-300 hover:shadow-md transition-all duration-300">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2 bg-gray-50 rounded-lg text-gray-600">{style.icon}</div>
                      <span className="font-bold text-gray-700 text-sm">{habito.nombre}</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-2 mb-2 overflow-hidden">
                      <div className="bg-blue-500 h-2 rounded-full" style={{width: `${(diasOk/7)*100}%`}}></div>
                    </div>
                    <p className="text-right text-xs font-bold text-gray-400">{Math.round((diasOk/7)*100)}%</p>
                 </div>
               )
            })}
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-['Montserrat',_sans-serif] text-gray-800 pb-24 md:pb-0 selection:bg-blue-100 selection:text-blue-900">
      
      {/* SIDEBAR (Desktop) */}
      <aside className="hidden md:flex w-72 bg-white border-r border-gray-100 flex-col p-8 fixed h-full z-20">
        <div className="mb-12 flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">H</div>
          <div><h1 className="text-xl font-extrabold text-gray-900">Habit Tracker</h1></div>
        </div>
        <nav className="flex-1 space-y-3">
          <button onClick={() => setVistaActual('tracker')} className={`flex items-center gap-4 w-full px-5 py-4 rounded-2xl transition-all font-bold text-sm ${vistaActual === 'tracker' ? 'bg-blue-600 text-white shadow-lg translate-x-2' : 'text-gray-500 hover:bg-gray-50 hover:translate-x-1'}`}>
            <LayoutDashboard size={20} /> Tracker
          </button>
          <button onClick={() => setVistaActual('historial')} className={`flex items-center gap-4 w-full px-5 py-4 rounded-2xl transition-all font-bold text-sm ${vistaActual === 'historial' ? 'bg-purple-600 text-white shadow-lg translate-x-2' : 'text-gray-500 hover:bg-gray-50 hover:translate-x-1'}`}>
            <History size={20} /> Historial
          </button>
          <button onClick={() => setVistaActual('avance')} className={`flex items-center gap-4 w-full px-5 py-4 rounded-2xl transition-all font-bold text-sm ${vistaActual === 'avance' ? 'bg-gray-900 text-white shadow-lg translate-x-2' : 'text-gray-500 hover:bg-gray-50 hover:translate-x-1'}`}>
            <TrendingUp size={20} /> Mi Avance
          </button>
        </nav>
      </aside>

      {/* BOTTOM NAVIGATION (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t border-gray-200 p-2 flex justify-around items-center z-50 pb-safe shadow-lg rounded-t-3xl">
        <button onClick={() => setVistaActual('tracker')} className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${vistaActual === 'tracker' ? 'text-blue-600 bg-blue-50' : 'text-gray-400 active:text-gray-600'}`}>
          <LayoutDashboard size={24} />
          <span className="text-[10px] font-bold">Tracker</span>
        </button>
        <button onClick={() => setVistaActual('historial')} className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${vistaActual === 'historial' ? 'text-purple-600 bg-purple-50' : 'text-gray-400 active:text-gray-600'}`}>
          <History size={24} />
          <span className="text-[10px] font-bold">Historial</span>
        </button>
        <button onClick={() => setVistaActual('avance')} className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${vistaActual === 'avance' ? 'text-gray-900 bg-gray-50' : 'text-gray-400 active:text-gray-600'}`}>
          <TrendingUp size={24} />
          <span className="text-[10px] font-bold">Avance</span>
        </button>
      </nav>

      {/* CONTENIDO PRINCIPAL */}
      <main className="flex-1 p-4 md:p-8 md:ml-72 overflow-y-auto w-full">
        <div className="max-w-6xl mx-auto pt-2 md:pt-4">
          {vistaActual === 'tracker' && <VistaTracker />}
          {vistaActual === 'historial' && <VistaHistorial />}
          {vistaActual === 'avance' && <VistaAvance />}
        </div>
      </main>
    </div>
  )
}

export default App