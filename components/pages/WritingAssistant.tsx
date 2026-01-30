import React from 'react';
import { motion } from 'framer-motion';
import { PenTool, RefreshCw, Type, AlignLeft, Download } from 'lucide-react';

export const WritingAssistant: React.FC = () => {
  return (
    <div className="w-full h-full max-w-6xl mx-auto flex gap-6 p-4">
      {/* Sidebar Tools */}
      <motion.div 
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-16 flex flex-col items-center gap-4 py-6 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md"
      >
        <button className="p-3 bg-cyan-500/20 text-cyan-400 rounded-xl"><PenTool className="w-5 h-5" /></button>
        <button className="p-3 text-white/40 hover:text-white hover:bg-white/10 rounded-xl transition-colors"><RefreshCw className="w-5 h-5" /></button>
        <button className="p-3 text-white/40 hover:text-white hover:bg-white/10 rounded-xl transition-colors"><Type className="w-5 h-5" /></button>
        <button className="p-3 text-white/40 hover:text-white hover:bg-white/10 rounded-xl transition-colors"><AlignLeft className="w-5 h-5" /></button>
        <div className="flex-1" />
        <button className="p-3 text-white/40 hover:text-white hover:bg-white/10 rounded-xl transition-colors"><Download className="w-5 h-5" /></button>
      </motion.div>

      {/* Main Editor */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="flex-1 bg-black/20 border border-white/10 rounded-3xl p-8 backdrop-blur-xl flex flex-col"
      >
        <div className="flex justify-between items-center mb-6 pb-6 border-b border-white/5">
            <div>
                <h2 className="text-xl font-light text-white">Project: Q3 Manifesto</h2>
                <p className="text-xs text-white/40 mt-1">Last edited just now</p>
            </div>
            <div className="flex gap-2">
                <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/60">Tone: Professional</span>
                <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-white/60">Length: Medium</span>
            </div>
        </div>
        
        <textarea 
            className="flex-1 bg-transparent resize-none outline-none text-white/80 font-serif leading-8 text-lg placeholder-white/20"
            placeholder="Start writing or ask AI to draft..."
            defaultValue="The future of artificial intelligence lies not in replacement, but in augmentation. As we look towards the next decade, our focus shifts from raw computational power to symbiotic relationships between human intuition and machine precision..."
        />
      </motion.div>

      {/* AI Suggestions */}
      <motion.div 
        initial={{ x: 20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="w-80 bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md"
      >
        <h3 className="text-sm font-medium text-white/60 uppercase tracking-wider mb-4">Suggestions</h3>
        
        <div className="space-y-4">
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl cursor-pointer hover:bg-emerald-500/20 transition-colors">
                <p className="text-xs text-emerald-400 font-bold mb-1">IMPROVE FLOW</p>
                <p className="text-sm text-emerald-100/80">Consider breaking this paragraph into two for better readability.</p>
            </div>
            
            <div className="p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl cursor-pointer hover:bg-cyan-500/20 transition-colors">
                <p className="text-xs text-cyan-400 font-bold mb-1">VOCABULARY</p>
                <p className="text-sm text-cyan-100/80">Replace "use" with "leverage" to match the professional tone.</p>
            </div>

            <div className="mt-8">
                <p className="text-xs text-white/40 mb-2">GENERATE NEXT SECTION</p>
                <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm text-white transition-colors border border-white/5">
                    + Ethics & Responsibility
                </button>
            </div>
        </div>
      </motion.div>
    </div>
  );
};
