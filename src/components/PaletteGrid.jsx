import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function PaletteGrid({ palette, onSlotClick }) {
  // 12 slots total
  const slots = Array.from({ length: 12 }, (_, i) => palette[i] || null);

  return (
    <div className="w-full max-w-sm mx-auto p-6 bg-white/40 backdrop-blur-sm rounded-xl organic-edge shadow-lg mt-8 md:mt-0 relative">
      <div className="grid grid-cols-3 gap-4">
        {slots.map((color, index) => {
          const isEmpty = !color;
          return (
            <motion.div
              key={color ? `slot-${index}-${color.id}` : `slot-${index}-empty`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className={cn(
                "w-full aspect-square rounded-lg flex flex-col items-center justify-center relative cursor-pointer",
                isEmpty ? "border-2 border-dashed border-gray-400 bg-black/5" : "shadow-md hover:ring-2 hover:ring-vangogh-indigo/50"
              )}
              style={color ? { backgroundColor: color.hex } : {}}
              onClick={() => onSlotClick(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isEmpty ? (
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Plus className="text-gray-500 w-8 h-8" />
                </motion.div>
              ) : (
                <>
                  <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-lg mix-blend-overlay pointer-events-none"></div>
                  {color && (
                    <div className="absolute -bottom-6 w-full text-center">
                      <span className="text-[10px] font-sans text-gray-500 uppercase tracking-widest">{color.name.split(' + ')[0]}</span>
                    </div>
                  )}
                </>
              )}
            </motion.div>
          );
        })}
      </div>
      <div className="mt-6 text-center">
        <h2 className="text-2xl text-vangogh-deepBrown tracking-wide">Estojo Van Gogh</h2>
        <p className="text-sm font-sans text-gray-600 mt-1">Toque nos espaços vazios (Discovery Slots) para experimentar.</p>
      </div>
    </div>
  );
}
