import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { mixingPrimaries } from '../data/colors';
import { blendSubtractive } from '../utils/colorMath';
import { X } from 'lucide-react';

export default function MixingSwatches({ color, onClose, onAdd }) {
  const [ratio, setRatio] = useState(50); // 50% catalog, 50% palette
  const [selectedMixture, setSelectedMixture] = useState(null);

  useEffect(() => {
    setSelectedMixture(null);
    setRatio(50);
  }, [color]);

  const activeColor = selectedMixture || color;

  // Pre-calculate the 4 mixtures based on current ratio
  const mixtures = useMemo(() => {
    return mixingPrimaries.map(primary => {
      // ratio is the percentage of the Catalog color (color)
      const r = ratio / 100;
      const hex = blendSubtractive(color.hex, primary.hex, r);
      return {
        ...primary,
        mixedHex: hex,
        mixedName: `${color.name.split(' ')[0]} + ${primary.name.split(' ')[0]}`,
        id: `mix-${color.id}-${primary.id}`
      };
    });
  }, [color, ratio]);

  if (!color) return null;

  return (
    <div className="w-full flex flex-col items-center pb-8 z-50 relative pointer-events-auto">
      <div className="w-full flex justify-between items-center mb-6">
        <h3 className="text-xl font-serif text-vangogh-deepBrown">Laboratório de Mistura</h3>
        <button onClick={onClose} className="p-2 rounded-full bg-black/5 hover:bg-black/10 z-50 pointer-events-auto">
          <X className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Main Preview Swatch */}
      <div className="flex flex-col items-center mb-4 w-full">
        <motion.div
          key={activeColor.hex || activeColor.mixedHex}
          initial={{ scale: 0.9, opacity: 0.8 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 rounded-full organic-edge shadow-md mb-3 relative overflow-hidden"
          style={{ backgroundColor: activeColor.mixedHex || activeColor.hex }}
        >
          <div className="absolute inset-0 bg-white/20 watercolor-blend opacity-50 mix-blend-overlay blur-sm"></div>
        </motion.div>
        <span className="font-serif text-lg text-center leading-tight max-w-[250px]">
          {activeColor.mixedName || activeColor.name}
        </span>
        <span className="text-[10px] text-gray-500 uppercase tracking-widest text-center mt-1">
          {selectedMixture ? 'Mistura Personalizada' : color.category}
        </span>
      </div>

      {/* Ratio Slider */}
      <div className="w-full px-2 mb-6">
        <div className="flex justify-between text-[10px] font-sans text-gray-500 uppercase tracking-widest mb-2">
          <span>{color.name.split(' ')[0]} {ratio}%</span>
          <span>Pigmento {100 - ratio}%</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max="100" 
          value={ratio}
          onChange={(e) => {
            setRatio(Number(e.target.value));
            // Update selected mixture immediately if one is selected
            if (selectedMixture) {
              const updated = mixtures.find(m => m.id === selectedMixture.id);
              if (updated) setSelectedMixture(updated);
            }
          }}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-vangogh-indigo"
        />
      </div>

      <p className="text-xs text-gray-500 mb-3 font-sans text-center">Selecione uma base para misturar (CMY):</p>

      {/* Mixture Grid */}
      <div className="w-full grid grid-cols-2 gap-4 mb-8">
        {mixtures.map((mix) => (
          <motion.div 
            key={mix.id} 
            className={`flex flex-col items-center cursor-pointer relative z-50 pointer-events-auto p-3 rounded-xl transition-colors ${selectedMixture?.id === mix.id ? 'bg-black/5 ring-1 ring-black/10' : 'hover:bg-black/5'}`}
            onClick={() => setSelectedMixture(mix)}
            whileTap={{ scale: 0.95 }}
          >
            <div 
              className="w-14 h-14 rounded-full organic-edge shadow-sm mb-2 relative"
              style={{ backgroundColor: mix.mixedHex }}
            >
               {selectedMixture?.id === mix.id && (
                  <motion.div 
                    layoutId="outline"
                    className="absolute -inset-1 rounded-full border border-vangogh-indigo"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
               )}
            </div>
            <span className="text-[10px] text-gray-600 font-sans text-center leading-tight uppercase">
              + {mix.name.split(' ')[0]}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          onAdd({
            id: activeColor.id || `${color.id}-${Date.now()}`,
            name: activeColor.mixedName || activeColor.name,
            hex: activeColor.mixedHex || activeColor.hex,
            category: 'Personalizada'
          });
        }}
        className="w-full py-4 rounded-xl bg-vangogh-indigo text-white font-serif text-lg tracking-wide shadow-lg hover:bg-vangogh-indigo/90 transition-colors z-50 relative pointer-events-auto mt-2"
      >
        Adicionar à Paleta
      </motion.button>
    </div>
  );
}
