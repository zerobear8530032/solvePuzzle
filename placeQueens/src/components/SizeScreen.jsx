import { ArrowLeft, Grid3x3 } from "lucide-react";
import { useState } from "react";

export default function SizeScreen({ difficulty, onSelect, onBack, selectedSize }) {
  const [hoveredSize, setHoveredSize] = useState(null);
  const Icon = difficulty.icon;
  
  // Generate size options based on difficulty
  const sizes = [];
  for (let i = difficulty.sizeRange.min; i <= difficulty.sizeRange.max; i++) {
    sizes.push(i);
  }

  return (
    <>
      {/* Back button */}
      <button
        onClick={onBack}
        className="absolute top-8 left-8 flex items-center gap-2 text-slate-400 hover:text-white transition-colors duration-300 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
        <span className="text-sm font-medium">Back</span>
      </button>

      {/* Title Section */}
      <div className="text-center mb-12 space-y-4">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className={`p-3 rounded-full bg-gradient-to-br ${difficulty.gradient}`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
          <h1 className={`text-5xl font-black bg-gradient-to-br ${difficulty.gradient} bg-clip-text text-transparent tracking-tight`}>
            {difficulty.name}
          </h1>
        </div>
        <p className="text-xl text-slate-300 font-light tracking-widest flex items-center justify-center gap-2">
          <Grid3x3 className="w-6 h-6" />
          SELECT BOARD SIZE
        </p>
        <p className="text-sm text-slate-400">
          Available sizes: {difficulty.sizeRange.min}x{difficulty.sizeRange.min} to {difficulty.sizeRange.max}x{difficulty.sizeRange.max}
        </p>
      </div>

      {/* Size Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 max-w-5xl mx-auto">
        {sizes.map((size) => {
          const isHovered = hoveredSize === size;
          const isSelected = selectedSize === size;
          
          return (
            <button
              key={size}
              onClick={() => onSelect(size)}
              onMouseEnter={() => setHoveredSize(size)}
              onMouseLeave={() => setHoveredSize(null)}
              className={`
                relative group p-6 rounded-xl backdrop-blur-sm
                border-2 border-white/10
                transition-all duration-300 ease-out
                ${isHovered || isSelected ? 'scale-110 shadow-xl' : 'scale-100'}
                ${isSelected ? difficulty.glow : ''}
                hover:border-white/30
              `}
              style={{
                background: isHovered || isSelected
                  ? `linear-gradient(135deg, rgba(255,255,255,0.15), rgba(255,255,255,0.08))`
                  : 'rgba(255,255,255,0.05)'
              }}
            >
              {/* Gradient overlay */}
              <div 
                className={`
                  absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100
                  transition-opacity duration-300 bg-gradient-to-br ${difficulty.gradient}
                `}
                style={{ mixBlendMode: 'overlay' }}
              ></div>

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center space-y-3">
                {/* Grid icon representation */}
                <div className="grid grid-cols-3 gap-0.5">
                  {[...Array(9)].map((_, i) => (
                    <div
                      key={i}
                      className={`
                        w-1.5 h-1.5 rounded-sm transition-all duration-300
                        ${isHovered || isSelected
                          ? `bg-gradient-to-br ${difficulty.gradient}`
                          : 'bg-white/30'
                        }
                      `}
                    ></div>
                  ))}
                </div>

                {/* Size label */}
                <div className="text-center">
                  <div className={`
                    text-2xl font-black
                    bg-gradient-to-br ${difficulty.gradient} bg-clip-text text-transparent
                    group-hover:scale-110 transition-transform duration-300
                  `}>
                    {size}×{size}
                  </div>
                  <div className="text-xs text-slate-400 mt-1">
                    {size * size} tiles
                  </div>
                </div>
              </div>

              {/* Selection indicator */}
              {isSelected && (
                <div className={`absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br ${difficulty.gradient} flex items-center justify-center animate-bounce`}>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer text */}
      <div className="text-center mt-12">
        <p className="text-slate-500 text-sm">
          Select a board size to start playing
        </p>
      </div>
    </>
  );
}
