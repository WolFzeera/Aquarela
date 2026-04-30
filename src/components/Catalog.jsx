import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { catalogColors, categories } from '../data/colors';
import { cn } from './PaletteGrid';

export default function Catalog({ onSelectColor }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredColors = activeCategory === 'all' 
    ? catalogColors 
    : catalogColors.filter(c => c.category === activeCategory);

  return (
    <div className="w-full flex flex-col h-full">
      <div className="mb-4">
        <h3 className="text-xl font-serif text-vangogh-deepBrown mb-3">Catálogo Van Gogh</h3>
        <div className="flex overflow-x-auto pb-2 gap-2 hide-scrollbar">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "whitespace-nowrap px-4 py-2 rounded-full text-xs font-sans transition-all",
                activeCategory === cat.id 
                  ? "bg-vangogh-indigo text-white shadow-md" 
                  : "bg-black/5 text-gray-600 hover:bg-black/10"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 pb-20 custom-scrollbar grid grid-cols-3 gap-4">
        <AnimatePresence>
          {filteredColors.map((color, idx) => (
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              key={color.id}
              className="flex flex-col items-center cursor-pointer group"
              onClick={() => onSelectColor(color)}
            >
              <div 
                className="w-full aspect-square rounded-full organic-edge shadow-sm mb-2 transition-transform group-hover:scale-110"
                style={{ backgroundColor: color.hex }}
              />
              <span className="text-[10px] font-sans text-center text-gray-700 leading-tight">
                {color.name}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
