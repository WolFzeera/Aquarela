import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Catalog from './Catalog';
import MixingSwatches from './MixingSwatches';

export default function BottomSheet({ isOpen, onClose, selectedColor, onSelectColor, onAddColor }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-vangogh-deepBrown/20 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed bottom-0 left-0 right-0 h-[70vh] bg-white/80 backdrop-blur-xl border-t border-white/40 shadow-glass rounded-t-3xl z-50 p-6 flex flex-col"
          >
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6 opacity-50" />
            
            <div className="flex-1 overflow-hidden relative">
              <AnimatePresence mode="wait">
                {selectedColor ? (
                  <motion.div
                    key="mixing"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    className="absolute inset-0 h-full overflow-y-auto"
                  >
                    <MixingSwatches 
                      color={selectedColor} 
                      onClose={() => onSelectColor(null)} 
                      onAdd={onAddColor}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="catalog"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 50, opacity: 0 }}
                    className="absolute inset-0 h-full"
                  >
                    <Catalog onSelectColor={onSelectColor} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
