import React from 'react';
import { motion } from 'framer-motion';
import { mixingPrimaries } from '../data/colors';
import { X } from 'lucide-react';

export default function MixingSwatches({ color, onClose, onAdd }) {
  if (!color) return null;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full flex justify-between items-center mb-6">
        <h3 className="text-xl font-serif text-vangogh-deepBrown">Simulador de Mistura</h3>
        <button onClick={onClose} className="p-2 rounded-full bg-black/5 hover:bg-black/10">
          <X className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      <div className="flex flex-col items-center mb-6 w-full">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-20 h-20 rounded-full organic-edge shadow-md mb-2 relative overflow-hidden"
          style={{ backgroundColor: color.hex }}
        >
          {/* Watercolor effect overlay */}
          <div className="absolute inset-0 bg-white/20 watercolor-blend opacity-50 mix-blend-overlay blur-sm"></div>
        </motion.div>
        <span className="font-serif text-lg">{color.name}</span>
        <span className="text-xs text-gray-500 uppercase tracking-widest text-center">{color.category}</span>
      </div>

      <div className="w-full grid grid-cols-3 gap-3 mb-8">
        {mixingPrimaries.map((primary, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="relative w-16 h-16 mb-2">
              <motion.div 
                className="absolute inset-0 rounded-full organic-edge opacity-80 mix-blend-multiply"
                style={{ backgroundColor: primary.hex }}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 0.8 }}
                transition={{ delay: index * 0.1 }}
              />
              <motion.div 
                className="absolute inset-0 rounded-full organic-edge opacity-80 mix-blend-multiply"
                style={{ backgroundColor: color.hex }}
                initial={{ x: 10, opacity: 0 }}
                animate={{ x: 0, opacity: 0.8 }}
                transition={{ delay: index * 0.1 + 0.1 }}
              />
            </div>
            <span className="text-xs text-gray-600 font-sans text-center leading-tight">
              + {primary.name}
            </span>
          </div>
        ))}
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => onAdd(color)}
        className="w-full py-4 rounded-xl bg-vangogh-indigo text-white font-serif text-lg tracking-wide shadow-lg hover:bg-vangogh-indigo/90 transition-colors"
      >
        Adicionar à Paleta
      </motion.button>
    </div>
  );
}
