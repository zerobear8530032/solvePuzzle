import React, { useEffect, useState } from 'react';
import { HelpCircle, X, Crown, Palette, Grid3x3, CheckCircle } from 'lucide-react';

function HelpModal({ timeRef }) {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      timeRef.current.stopTimer(true);
    } else {
      timeRef.current.startTimer();
    }
  }, [isOpen])
  const rules = [
    {
      icon: Crown,
      title: "Place Queens & Marks",
      description: "Click on cells to cycle through: Empty → X (mark) → Q (queen) → Empty. Use X to mark cells where queens can't go.",
      gradient: "from-purple-400 to-pink-500"
    },
    {
      icon: Grid3x3,
      title: "No Conflicts",
      description: "Queens cannot attack each other. No two queens can be in the same row, column, diagonal.",
      gradient: "from-blue-400 to-cyan-500"
    },
    {
      icon: Palette,
      title: "One Per Color",
      description: "Each colored region must contain exactly one queen. Colors help you organize the board.",
      gradient: "from-emerald-400 to-teal-500"
    },
    {
      icon: CheckCircle,
      title: "Win Condition",
      description: "Place all queens on the board without any conflicts. Red borders indicate errors that need fixing.",
      gradient: "from-amber-400 to-orange-500"
    }
  ];

  return (
    <>
      {/* Help Button */}
      <button
        onClick={() => setIsOpen(true)}
        className=" z-40 w-12 h-12 rounded-[999px] pl-16 pr-16 pt-4 pb-4 bg-gradient-to-br from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-110 flex items-center justify-center group"
        aria-label="Help"
      >
        Rules
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          {/* Modal Content */}
          <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl shadow-2xl border-2 border-white/10 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:rotate-90 flex items-center justify-center"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="p-8 pb-6 border-b border-white/10">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500">
                  <HelpCircle className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                  How to Play
                </h2>
              </div>
              <p className="text-slate-400">
                Master the Queens Puzzle by following these simple rules
              </p>
            </div>

            {/* Rules */}
            <div className="p-8 space-y-6">
              {rules.map((rule, index) => {
                const Icon = rule.icon;
                return (
                  <div
                    key={index}
                    className="flex gap-4 p-5 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20"
                  >
                    <div className={`flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br ${rule.gradient} flex items-center justify-center`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className={`text-lg font-bold mb-2 bg-gradient-to-br ${rule.gradient} bg-clip-text text-transparent`}>
                        {rule.title}
                      </h3>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {rule.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Visual Example */}
            <div className="p-8 pt-0">
              <div className="p-5 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                  <span className="text-2xl">💡</span>
                  Quick Tips
                </h3>
                <ul className="space-y-2 text-slate-300 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span>Click cells to cycle: Empty → X → Q → Empty</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span>Use X marks to remember where queens can't be placed</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span>Start by placing queens in regions with fewer cells</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span>Red borders indicate conflicts - fix these to win</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span>Use the reset button if you get stuck</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-400 font-bold">•</span>
                    <span>Think ahead - each queen placement affects multiple cells</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="p-8 pt-0">
              <button
                onClick={() => setIsOpen(false)}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold shadow-lg hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105"
              >
                Got it! Let's Play
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
      `}</style>
    </>
  );
}

export default HelpModal;