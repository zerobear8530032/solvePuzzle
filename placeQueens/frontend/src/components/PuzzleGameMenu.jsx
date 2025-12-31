import React, { useState } from 'react';
import { Sparkles, Zap, Flame, Skull, Grid3x3, ArrowLeft } from 'lucide-react';
import DifficultyScreen from './DifficultyScreen';
import SizeScreen from './SizeScreen';
import { useNavigate } from 'react-router-dom';

export default function PuzzleGameMenu() {
  const [screen, setScreen] = useState('difficulty'); // 'difficulty' or 'size'
  const [selectedDifficulty, setSelectedDifficulty] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  
  const difficulties = [
    {
      id: 'easy',
      name: 'EASY',
      icon: Sparkles,
      gradient: 'from-emerald-400 to-teal-500',
      hoverGradient: 'from-emerald-300 to-teal-400',
      description: 'Perfect for beginners',
      glow: 'shadow-emerald-500/50',
      sizeRange: { min: 4, max: 7 }
    },
    {
      id: 'medium',
      name: 'MEDIUM',
      icon: Zap,
      gradient: 'from-amber-400 to-orange-500',
      hoverGradient: 'from-amber-300 to-orange-400',
      description: 'A balanced challenge',
      glow: 'shadow-amber-500/50',
      sizeRange: { min: 8, max: 12 }
    },
    {
      id: 'hard',
      name: 'HARD',
      icon: Flame,
      gradient: 'from-rose-500 to-pink-600',
      hoverGradient: 'from-rose-400 to-pink-500',
      description: 'Test your skills',
      glow: 'shadow-rose-500/50',
      sizeRange: { min: 13, max: 20 }
    },
    {
      id: 'extreme',
      name: 'EXTREME',
      icon: Skull,
      gradient: 'from-purple-600 to-indigo-700',
      hoverGradient: 'from-purple-500 to-indigo-600',
      description: 'For masters only',
      glow: 'shadow-purple-500/50',
      sizeRange: { min: 21, max: 25 }
    }
  ];

  const navigate= useNavigate(); 
  const handleDifficultySelect = (difficulty) => {
    setSelectedDifficulty(difficulty);
    setTimeout(() => {
      navigate(`${difficulty.id}`)
    }, 300);
  };
  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setTimeout(() => {
      navigate("/")
    }, 300);
  };
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-8 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative z-10 max-w-6xl w-full">
          <DifficultyScreen 
            difficulties={difficulties}
            onSelect={handleDifficultySelect}
          />        
      </div>
    </div>
  );
}



