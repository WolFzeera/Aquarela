import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ArrowLeft, BookOpen } from 'lucide-react';
import { pigmentDNA, harmonies } from '../data/infoContent';

const AccordionItem = ({ pigment, isOpen, onClick }) => {
  return (
    <div className="border-b border-vangogh-deepBrown/10 last:border-0">
      <button 
        onClick={onClick}
        className="w-full py-4 flex items-center justify-between text-left focus:outline-none"
      >
        <div className="flex items-center gap-4">
          <div 
            className="w-8 h-8 rounded-full organic-edge shadow-sm" 
            style={{ backgroundColor: pigment.hex }}
          />
          <div>
            <h4 className="font-serif text-lg text-vangogh-deepBrown leading-none">{pigment.name}</h4>
            <span className="text-xs font-sans text-gray-500 tracking-widest">{pigment.technical} • {pigment.code}</span>
          </div>
        </div>
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <ChevronDown className="w-5 h-5 text-gray-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-4 pl-12 pr-4">
              <p className="text-sm font-sans text-gray-700 mb-2 leading-relaxed">{pigment.description}</p>
              <div className="bg-white/50 rounded-lg p-3 border border-white/40 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-widest text-vangogh-indigo mb-1 block">Nota para Muralistas</span>
                <p className="text-xs font-sans text-gray-600 leading-relaxed italic">"{pigment.muralistNote}"</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function InfoPage({ onClose }) {
  const [openAccordion, setOpenAccordion] = useState(null);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="w-full max-w-2xl mx-auto pb-24"
    >
      <button 
        onClick={onClose}
        className="flex items-center gap-2 text-gray-500 hover:text-vangogh-indigo mb-8 group transition-colors px-2"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm font-sans uppercase tracking-widest">Voltar ao Estojo</span>
      </button>

      <header className="mb-12 px-2 text-center">
        <BookOpen className="w-10 h-10 text-vangogh-deepBrown mx-auto mb-4 opacity-80" />
        <h2 className="text-3xl md:text-4xl font-serif text-vangogh-deepBrown mb-3">Teoria & História</h2>
        <p className="text-sm font-sans text-gray-500 uppercase tracking-widest">O Guia Definitivo Van Gogh</p>
      </header>

      {/* Heritage Section */}
      <section className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 organic-edge shadow-lg mb-8">
        <h3 className="text-2xl font-serif text-vangogh-deepBrown mb-4">A Linhagem Van Gogh</h3>
        <p className="text-sm md:text-base font-sans text-gray-700 leading-relaxed mb-4">
          Produzida na Holanda pela Royal Talens, a linha Van Gogh Professional é concebida para artistas que exigem excelência, durabilidade e pureza. Cada pastilha nesta paleta foi meticulosamente selecionada para oferecer a máxima <strong>resistência à luz (lightfastness)</strong>.
        </p>
        <p className="text-sm md:text-base font-sans text-gray-700 leading-relaxed">
          Para muralistas, a longevidade do pigmento é crucial. As cores ancoradas no seu estojo principal mantêm sua integridade cromática mesmo sob exposição severa, garantindo que a vibração da sua arte resista ao teste do tempo.
        </p>
      </section>

      {/* Pigment DNA Section */}
      <section className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 organic-edge shadow-lg mb-8">
        <h3 className="text-2xl font-serif text-vangogh-deepBrown mb-6">O DNA dos Pigmentos</h3>
        <div className="flex flex-col">
          {pigmentDNA.map((pigment, index) => (
            <AccordionItem 
              key={pigment.id}
              pigment={pigment}
              isOpen={openAccordion === index}
              onClick={() => setOpenAccordion(openAccordion === index ? null : index)}
            />
          ))}
        </div>
      </section>

      {/* CMY Theory Section */}
      <section className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 organic-edge shadow-lg mb-8 flex flex-col items-center">
        <h3 className="text-2xl font-serif text-vangogh-deepBrown mb-4 self-start">Teoria da Mistura Subtrativa</h3>
        <p className="text-sm font-sans text-gray-700 leading-relaxed mb-8 self-start">
          Na aquarela, não usamos a luz direta das telas (RGB), mas sim a absorção da luz pelo papel. As verdadeiras primárias subtrativas são <strong>Ciano, Magenta e Amarelo (CMY)</strong>. A sobreposição física desses pigmentos filtra a luz, criando os escuros mais profundos e as misturas mais precisas.
        </p>
        
        {/* CMY SVG Diagram */}
        <div className="relative w-48 h-48 md:w-64 md:h-64 mb-6 bg-white rounded-full shadow-inner flex items-center justify-center">
          <div className="absolute w-24 h-24 md:w-32 md:h-32 rounded-full mix-blend-multiply opacity-80" style={{ backgroundColor: '#00FFFF', transform: 'translate(-20%, 20%)' }} />
          <div className="absolute w-24 h-24 md:w-32 md:h-32 rounded-full mix-blend-multiply opacity-80" style={{ backgroundColor: '#FF00FF', transform: 'translate(20%, 20%)' }} />
          <div className="absolute w-24 h-24 md:w-32 md:h-32 rounded-full mix-blend-multiply opacity-80" style={{ backgroundColor: '#FFFF00', transform: 'translate(0, -30%)' }} />
        </div>
        <p className="text-xs font-sans text-gray-500 italic text-center">Intersecção CMY: A mistura total absorve toda a luz, resultando em um negro neutro intenso.</p>
      </section>

      {/* Recommended Harmonies */}
      <section className="bg-white/40 backdrop-blur-sm rounded-2xl p-6 md:p-8 organic-edge shadow-lg">
        <h3 className="text-2xl font-serif text-vangogh-deepBrown mb-6">Harmonias Recomendadas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {harmonies.map((harmony, i) => (
            <div key={i} className="bg-white/50 rounded-xl p-4 border border-white/40 shadow-sm hover:shadow-md transition-shadow">
              <h4 className="font-serif text-md text-vangogh-deepBrown mb-2">{harmony.name}</h4>
              <div className="flex gap-2 mb-3">
                {harmony.colors.map((hex, j) => (
                  <div key={j} className="w-6 h-6 rounded-full shadow-sm organic-edge" style={{ backgroundColor: hex }} />
                ))}
              </div>
              <p className="text-xs font-sans text-gray-600 leading-relaxed">{harmony.description}</p>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
}
