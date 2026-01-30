import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic } from 'lucide-react';

export const VoiceAssistant: React.FC = () => {
  return (
    <div className="w-full h-[80vh] flex flex-col items-center justify-center relative">
      
      {/* Central Visualizer Placeholder - The Orb is behind this, so we just enhance focus */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative z-10 flex flex-col items-center"
      >
        <h2 className="text-2xl font-light text-white/80 mb-2">I'm listening</h2>
        <p className="text-white/40 mb-12">Speak naturally. Say "Hey Smart" to begin.</p>
        
        {/* Fake Audio Waveform */}
        <div className="flex items-center gap-1 h-12 mb-12">
           {[...Array(20)].map((_, i) => (
             <motion.div
                key={i}
                animate={{ 
                    height: [10, Math.random() * 40 + 10, 10],
                    opacity: [0.3, 1, 0.3]
                }}
                transition={{ 
                    duration: 1.5, 
                    repeat: Infinity, 
                    delay: i * 0.1,
                    ease: "easeInOut"
                }}
                className="w-1 bg-cyan-400 rounded-full"
             />
           ))}
        </div>
        
        <button className="p-6 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:scale-110 transition-all duration-300 group">
            <Mic className="w-8 h-8 text-white/60 group-hover:text-white" />
        </button>
      </motion.div>
    </div>
  );
};
