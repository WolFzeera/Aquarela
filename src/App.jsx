import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PaletteGrid from './components/PaletteGrid';
import BottomSheet from './components/BottomSheet';
import { existingPalette } from './data/colors';
import MixingSwatches from './components/MixingSwatches';
import Catalog from './components/Catalog';

function App() {
  const [palette, setPalette] = useState(() => {
    const saved = localStorage.getItem('aquarelaPalette_v2');
    const defaultPalette = [...existingPalette, null, null, null];
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return defaultPalette;
      }
    }
    return defaultPalette;
  });
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [activeSlotIndex, setActiveSlotIndex] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);

  useEffect(() => {
    localStorage.setItem('aquarelaPalette_v2', JSON.stringify(palette));
  }, [palette]);

  const handleReset = () => {
    setPalette([...existingPalette, null, null, null]);
    localStorage.removeItem('aquarelaPalette_v2');
  };

  const handleSlotClick = (index) => {
    setActiveSlotIndex(index);
    setIsSheetOpen(true);
    setSelectedCandidate(null);
  };

  const handleAddColor = (color) => {
    if (activeSlotIndex !== null) {
      const newPalette = [...palette];
      newPalette[activeSlotIndex] = color;
      setPalette(newPalette);
      setIsSheetOpen(false);
      setActiveSlotIndex(null);
      setSelectedCandidate(null);
    }
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden paper-texture md:flex md:h-screen md:items-stretch">
      {/* Left / Main Section */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 py-12 px-6 overflow-y-auto">
        <header className="text-center mb-8 md:mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl text-vangogh-deepBrown tracking-wider font-serif"
          >
            Aquarela de Letícia
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm md:text-base font-sans text-gray-500 mt-2 uppercase tracking-widest"
          >
            Paleta Van Gogh
          </motion.p>
        </header>

        <main className="w-full max-w-lg">
          <PaletteGrid 
            palette={palette} 
            onSlotClick={handleSlotClick} 
          />
          <div className="mt-8 flex justify-center w-full relative z-20">
            <button 
              onClick={handleReset}
              className="text-xs text-gray-500 hover:text-vangogh-indigo uppercase tracking-widest font-sans underline underline-offset-4 transition-colors px-4 py-2"
            >
              Restaurar Paleta Original
            </button>
          </div>
        </main>
      </div>

      {/* Mobile Bottom Sheet */}
      <div className="md:hidden">
        <BottomSheet 
          isOpen={isSheetOpen}
          onClose={() => setIsSheetOpen(false)}
          selectedColor={selectedCandidate}
          onSelectColor={setSelectedCandidate}
          onAddColor={handleAddColor}
        />
      </div>

      {/* Desktop Side Panel */}
      <AnimatePresence>
        {isSheetOpen && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 450, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="hidden md:flex flex-col bg-white/80 backdrop-blur-xl border-l border-white/40 shadow-glass z-40 relative h-full"
          >
            <div className="p-8 flex-1 overflow-y-auto custom-scrollbar flex flex-col h-full w-[450px]">
              <div className="flex justify-end mb-4">
                <button 
                  onClick={() => setIsSheetOpen(false)}
                  className="text-gray-500 hover:text-gray-800 font-sans text-sm tracking-widest uppercase"
                >
                  Fechar
                </button>
              </div>
              
              <AnimatePresence mode="wait">
                {selectedCandidate ? (
                  <motion.div
                    key="mixing"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    className="flex-1"
                  >
                    <MixingSwatches 
                      color={selectedCandidate} 
                      onClose={() => setSelectedCandidate(null)} 
                      onAdd={handleAddColor}
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="catalog"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 50, opacity: 0 }}
                    className="flex-1 h-full"
                  >
                    <Catalog onSelectColor={setSelectedCandidate} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
