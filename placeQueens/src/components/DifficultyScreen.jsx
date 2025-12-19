import { useState } from "react";
export default function DifficultyScreen({ difficulties, onSelect }) {
  const [hoveredDifficulty, setHoveredDifficulty] = useState(null);
  return (
    <>
      {/* Title Section */}
      <div className="text-center mb-16 space-y-4">
        <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 animate-pulse tracking-tight">
          PUZZLE MASTER
        </h1>
        <p className="text-xl text-slate-300 font-light tracking-widest">
          CHOOSE YOUR CHALLENGE
        </p>
        <div className="flex justify-center gap-2 mt-6">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i} 
              className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
              style={{
                animation: `pulse 2s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Difficulty Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {difficulties.map((difficulty) => {
          const Icon = difficulty.icon;
          const isHovered = hoveredDifficulty === difficulty.id;
          
          return (
            <button
              key={difficulty.id}
              onClick={() => onSelect(difficulty)}
              onMouseEnter={() => setHoveredDifficulty(difficulty.id)}
              onMouseLeave={() => setHoveredDifficulty(null)}
              className={`
                relative group p-8 rounded-2xl backdrop-blur-sm
                border-2 border-white/10 
                transition-all duration-500 ease-out
                ${isHovered ? 'scale-105 shadow-2xl' : 'scale-100'}
                ${isHovered ? difficulty.glow : ''}
                hover:border-white/30
              `}
              style={{
                background: isHovered
                  ? `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))`
                  : 'rgba(255,255,255,0.03)'
              }}
            >
              {/* Gradient overlay on hover */}
              <div 
                className={`
                  absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
                  transition-opacity duration-500 bg-gradient-to-br ${difficulty.gradient}
                `}
                style={{ mixBlendMode: 'overlay' }}
              ></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center space-y-6">
                {/* Icon */}
                <div className={`
                  p-4 rounded-full bg-gradient-to-br ${difficulty.gradient}
                  transition-all duration-500 group-hover:scale-110 group-hover:rotate-12
                `}>
                  <Icon className="w-10 h-10 text-white" />
                </div>

                {/* Title */}
                <div className="space-y-2 text-center">
                  <h2 className={`
                    text-3xl font-black tracking-wider
                    bg-gradient-to-br ${difficulty.gradient} bg-clip-text text-transparent
                    group-hover:scale-110 transition-transform duration-300
                  `}>
                    {difficulty.name}
                  </h2>
                  <p className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
                    {difficulty.description}
                  </p>
                </div>

                {/* Difficulty indicator bars */}
                <div className="flex gap-1.5 pt-2">
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className={`
                        w-8 h-1.5 rounded-full transition-all duration-300
                        ${i < difficulties.indexOf(difficulty) + 1
                          ? `bg-gradient-to-r ${difficulty.gradient}`
                          : 'bg-white/20'
                        }
                      `}
                    ></div>
                  ))}
                </div>
              </div>

              {/* Hover effect ring */}
              <div className={`
                absolute inset-0 rounded-2xl transition-all duration-500
                ${isHovered ? `ring-2 ring-offset-2 ring-offset-transparent bg-gradient-to-br ${difficulty.gradient} opacity-20` : ''}
              `}></div>
            </button>
          );
        })}
      </div>

      {/* Footer text */}
      <div className="text-center mt-12">
        <p className="text-slate-500 text-sm">
          Select a difficulty to begin your journey
        </p>
      </div>
    </>
  );
}
