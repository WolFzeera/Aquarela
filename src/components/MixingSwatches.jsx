import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { mixingPrimaries } from '../data/colors';
import { X } from 'lucide-react';

const mixHexColors = (c1, c2) => {
  let r = Math.floor((parseInt(c1.substr(1,2),16) + parseInt(c2.substr(1,2),16))/2);
  let g = Math.floor((parseInt(c1.substr(3,2),16) + parseInt(c2.substr(3,2),16))/2);
  let b = Math.floor((parseInt(c1.substr(5,2),16) + parseInt(c2.substr(5,2),16))/2);
  if (c2.toUpperCase() !== '#F5F5F5' && c1.toUpperCase() !== '#F5F5F5') {
    r = Math.max(0, r - 15);
    g = Math.max(0, g - 15);
    b = Math.max(0, b - 15);
  }
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

export default function MixingSwatches({ color, onClose, onAdd }) {
  const [mixedColor, setMixedColor] = useState(color);

  useEffect(() => {
    setMixedColor(color);
  }, [color]);

  if (!color) return null;

  const handleMix = (primary) => {
    const newHex = mixHexColors(mixedColor.hex, primary.hex);
    setMixedColor({
      ...mixedColor,
      name: `${mixedColor.name} + ${primary.name}`,
      hex: newHex,
      id: `${mixedColor.id}-${primary.id}-${Date.now()}`
    });
  };

  return (
    <div className="w-full flex flex-col items-center pb-8 z-50 relative pointer-events-auto">
      <div className="w-full flex justify-between items-center mb-6">
        <h3 className="text-xl font-serif text-vangogh-deepBrown">Mistura Ateliê</h3>
        <button onClick={onClose} className="p-2 rounded-full bg-black/5 hover:bg-black/10 z-50 pointer-events-auto">
          <X className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      <div className="flex flex-col items-center mb-6 w-full">
        <motion.div
          key={mixedColor.hex}
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="w-24 h-24 rounded-full organic-edge shadow-md mb-3 relative overflow-hidden"
          style={{ backgroundColor: mixedColor.hex }}
        >
          <div className="absolute inset-0 bg-white/20 watercolor-blend opacity-50 mix-blend-overlay blur-sm"></div>
        </motion.div>
        <span className="font-serif text-lg text-center leading-tight max-w-[250px]">{mixedColor.name}</span>
        <span className="text-xs text-gray-500 uppercase tracking-widest text-center mt-1">
          {mixedColor.name === color.name ? color.category : 'Mistura Personalizada'}
        </span>
      </div>

      <p className="text-sm text-gray-500 mb-4 font-sans">Toque para adicionar pigmentos:</p>

      <div className="w-full grid grid-cols-3 gap-4 mb-8">
        {mixingPrimaries.map((primary, index) => (
          <motion.div 
            key={index} 
            className="flex flex-col items-center cursor-pointer relative z-50 pointer-events-auto"
            onClick={() => handleMix(primary)}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
          >
            <div 
              className="w-12 h-12 rounded-full organic-edge shadow-sm mb-2"
              style={{ backgroundColor: primary.hex }}
            />
            <span className="text-[10px] text-gray-600 font-sans text-center leading-tight uppercase">
              + {primary.name}
            </span>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onAdd(mixedColor)}
        className="w-full py-4 rounded-xl bg-vangogh-indigo text-white font-serif text-lg tracking-wide shadow-lg hover:bg-vangogh-indigo/90 transition-colors z-50 relative pointer-events-auto mt-4"
      >
        Adicionar à Paleta
      </motion.button>
    </div>
  );
}
