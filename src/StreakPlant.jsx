import { Flame, Sparkles, Trophy, Sprout } from 'lucide-react'

// --- COMPONENTE: Tarjeta con animación (Reutilizado localmente o importado si fuera compartido) ---
const AnimatedCard = ({ children, className = '', delay = 0 }) => (
    <div
        className={`opacity-0 animate-fade-in-up ${className}`}
        style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
        {children}
    </div>
)

const GrowingPlant = ({ totalStreak }) => {
    // Determinar etapa de crecimiento (0-5)
    const getGrowthStage = () => {
        if (totalStreak <= 0) return 0
        if (totalStreak <= 3) return 1
        if (totalStreak <= 7) return 2
        if (totalStreak <= 14) return 3
        if (totalStreak <= 21) return 4
        return 5
    }

    const stage = getGrowthStage()

    const stageInfo = [
        { name: 'Semilla', emoji: '🌱', message: '¡Empezá tu racha!' },
        { name: 'Brote', emoji: '🌱', message: '¡Sigue así!' },
        { name: 'Planta', emoji: '🌿', message: '¡Creciendo fuerte!' },
        { name: 'Flor', emoji: '🌸', message: '¡Floreciendo!' },
        { name: 'Árbol', emoji: '🌳', message: '¡Increíble!' },
        { name: 'Bosque', emoji: '🌲', message: '¡Sos leyenda!' },
    ][stage]

    return (
        <div className="flex flex-col items-center justify-center relative min-h-[300px] w-full max-w-md mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-100/50 to-teal-100/50 rounded-full blur-3xl opacity-60 pointer-events-none" />

            <div className="relative w-48 h-48 flex items-center justify-center mb-6 z-10">
                {/* Base pot */}
                <div className="absolute bottom-0 w-24 h-12 bg-gradient-to-b from-amber-600 to-amber-800 rounded-b-3xl rounded-t-lg shadow-xl" />
                <div className="absolute bottom-10 w-28 h-4 bg-amber-700 rounded-full shadow-sm" />

                {/* Soil */}
                <div className="absolute bottom-11 w-20 h-4 bg-gradient-to-b from-amber-900 to-amber-950 rounded-full" />

                {/* Plant stages */}
                <div className={`absolute bottom-14 flex flex-col items-center transition-all duration-1000 ease-out ${stage >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'}`}>
                    {/* Stem */}
                    <div
                        className="w-2 bg-gradient-to-t from-emerald-700 to-emerald-400 rounded-full transition-all duration-1000"
                        style={{ height: `${Math.min(stage * 24, 120)}px` }}
                    />

                    {/* Leaves at different stages */}
                    {stage >= 2 && (
                        <>
                            <div className="absolute bottom-6 -left-5 w-6 h-4 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full transform -rotate-45 origin-right animate-pulse-slow" />
                            <div className="absolute bottom-6 -right-5 w-6 h-4 bg-gradient-to-l from-emerald-600 to-emerald-400 rounded-full transform rotate-45 origin-left animate-pulse-slow" style={{ animationDelay: '0.3s' }} />
                        </>
                    )}

                    {stage >= 3 && (
                        <>
                            <div className="absolute bottom-12 -left-6 w-8 h-5 bg-gradient-to-r from-green-500 to-emerald-400 rounded-full transform -rotate-30 origin-right" />
                            <div className="absolute bottom-12 -right-6 w-8 h-5 bg-gradient-to-l from-green-500 to-emerald-400 rounded-full transform rotate-30 origin-left" />
                        </>
                    )}

                    {/* Flower at stage 3+ */}
                    {stage >= 3 && (
                        <div className="absolute -top-2 flex items-center justify-center z-20">
                            <div className="text-4xl animate-bounce-slow" style={{ animationDuration: '3s' }}>
                                {stage === 3 ? '🌸' : stage === 4 ? '🌺' : '🌻'}
                            </div>
                        </div>
                    )}

                    {/* Extra decorations for high stages */}
                    {stage >= 4 && (
                        <>
                            <div className="absolute -top-6 -left-8 text-2xl animate-float">🦋</div>
                            <div className="absolute -top-4 -right-8 text-xl animate-float" style={{ animationDelay: '1.5s' }}>🐝</div>
                        </>
                    )}

                    {stage >= 5 && (
                        <>
                            {/* Sparkles around */}
                            <div className="absolute -top-10 left-0 text-lg animate-ping-slow text-yellow-400">✨</div>
                            <div className="absolute -top-12 -right-4 text-sm animate-ping-slow text-yellow-300" style={{ animationDelay: '1s' }}>✨</div>
                            <div className="absolute top-0 -left-10 text-xl animate-bounce-slow text-emerald-600">🌿</div>
                            <div className="absolute top-0 -right-10 text-xl animate-bounce-slow text-emerald-600" style={{ animationDelay: '0.5s' }}>🌿</div>
                        </>
                    )}
                </div>

                {/* Seed when stage 0 */}
                {stage === 0 && (
                    <div className="absolute bottom-12 text-4xl opacity-70 animate-pulse">🌰</div>
                )}
            </div>

            <div className="text-center z-10 p-4 bg-white/40 backdrop-blur-md rounded-2xl border border-white/50 shadow-sm w-full">
                <div className="text-4xl mb-2 filter drop-shadow-sm">{stageInfo.emoji}</div>
                <h3 className="text-xl font-extrabold text-emerald-800 mb-1">{stageInfo.name}</h3>
                <p className="text-sm font-medium text-emerald-600 mb-3">{stageInfo.message}</p>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 rounded-full border border-emerald-200">
                    <Flame size={16} className="text-orange-500 fill-orange-500" />
                    <span className="text-sm font-bold text-emerald-800">{totalStreak} días totales</span>
                </div>
            </div>
        </div>
    )
}

const StreakPlant = ({ habitos }) => {
    const totalStreak = habitos.reduce((acc, h) => acc + (h.currentStreak || 0), 0)

    // Find best habit
    const bestHabit = habitos.length > 0
        ? habitos.reduce((prev, current) => ((prev.currentStreak || 0) > (current.currentStreak || 0)) ? prev : current)
        : null

    const hasStreak = bestHabit && (bestHabit.currentStreak || 0) > 0

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in p-2 md:p-0">

            {/* Header */}
            <AnimatedCard delay={0}>
                <div className="flex flex-col md:flex-row items-center gap-4 text-center md:text-left mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center shadow-lg shadow-emerald-200">
                        <Sprout size={32} className="text-white" />
                    </div>
                    <div>
                        <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-1">Jardín de Racha</span>
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800">Tu Planta</h2>
                        <p className="text-gray-500 font-medium">Cuida tus hábitos para verla crecer</p>
                    </div>
                </div>
            </AnimatedCard>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Plant Section - Main Focus */}
                <AnimatedCard delay={100} className="md:row-span-2">
                    <div className="h-full bg-gradient-to-br from-emerald-50/80 to-teal-50/50 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white shadow-xl shadow-emerald-100/50 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-2 opacity-70">
                                <Sparkles size={16} className="text-emerald-600" />
                                <span className="text-xs font-bold text-emerald-700 uppercase">Estado Actual</span>
                            </div>
                        </div>

                        <GrowingPlant totalStreak={totalStreak} />

                        <p className="text-center text-xs text-emerald-600/60 font-medium mt-6">
                            Cada día de racha en cualquier hábito suma agua a tu planta.
                        </p>
                    </div>
                </AnimatedCard>

                {/* Best Habit Section */}
                <AnimatedCard delay={200}>
                    <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] p-8 border border-white shadow-lg shadow-gray-200/50 h-full flex flex-col relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-100 to-orange-100 rounded-full translate-x-10 -translate-y-10 blur-2xl opacity-60" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-md shadow-amber-200 group-hover:scale-110 transition-transform duration-300">
                                    <Trophy size={20} className="text-white" />
                                </div>
                                <h3 className="text-lg font-bold text-gray-800">Mayor Contribuyente</h3>
                            </div>

                            {bestHabit ? (
                                <div className="flex flex-col items-center text-center mt-2">
                                    <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">🏆</div>
                                    <h4 className="text-2xl font-extrabold text-gray-800 mb-1">{bestHabit.nombre}</h4>
                                    <div className="flex items-center gap-2 mt-2 px-4 py-1.5 bg-orange-50 rounded-full border border-orange-100">
                                        <Flame size={14} className="text-orange-500 fill-orange-500 animate-pulse" />
                                        <span className="text-orange-700 font-bold text-sm">
                                            {bestHabit.currentStreak || 0} dias de racha
                                        </span>
                                    </div>
                                    <p className="text-gray-400 text-sm mt-6 leading-relaxed">
                                        {hasStreak
                                            ? "¡Este es el hábito que más está nutriendo a tu planta! Sigue así."
                                            : "Completa este hábito hoy para empezar a sumar."}
                                    </p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-40 text-center">
                                    <p className="text-gray-400 font-medium">Aún no hay hábitos. ¡Crea uno para empezar!</p>
                                </div>
                            )}
                        </div>
                    </div>
                </AnimatedCard>

                {/* Motivation/Next Goal Section */}
                <AnimatedCard delay={300}>
                    <div className="bg-gradient-to-br from-indigo-500 to-violet-600 rounded-[2.5rem] p-8 text-white shadow-lg shadow-indigo-200 h-full flex flex-col justify-center relative overflow-hidden">
                        {/* Decorative circles */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-10">
                            <div className="absolute top-10 left-10 w-20 h-20 rounded-full border-4 border-white" />
                            <div className="absolute bottom-10 right-10 w-32 h-32 rounded-full bg-white blur-3xl opacity-30" />
                        </div>

                        <div className="relative z-10">
                            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                <Sparkles size={20} className="text-indigo-200" />
                                Consejo
                            </h3>
                            <p className="text-indigo-100 font-medium text-sm leading-relaxed mb-4">
                                "La constancia es la clave del crecimiento. No importa la velocidad, sino mantenerse en movimiento."
                            </p>
                            <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                                <div className="w-2/3 h-full bg-white/60 rounded-full" />
                            </div>
                        </div>
                    </div>
                </AnimatedCard>
            </div>
        </div>
    )
}

export default StreakPlant
