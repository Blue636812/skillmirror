import React from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';
import { Input } from '../ui/Input';

export const CoreAssistant: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto h-[80vh] flex flex-col">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
            <Sparkles className="w-5 h-5 text-cyan-400" />
        </div>
        <h2 className="text-xl font-light text-white">Core Assistant</h2>
      </motion.div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-4 mb-6 scrollbar-hide">
        {/* AI Message */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex gap-4 max-w-[80%]"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex-shrink-0" />
          <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-6 backdrop-blur-sm">
            <p className="text-white/80 leading-relaxed font-light">
              Hello. I am initialized and ready to assist you. Whether you need complex problem solving, creative brainstorming, or data analysis, I am at your disposal. Where shall we begin?
            </p>
          </div>
        </motion.div>

        {/* User Message (Mock) */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-4 max-w-[80%] ml-auto flex-row-reverse"
        >
          <div className="w-8 h-8 rounded-full bg-white/10 flex-shrink-0" />
          <div className="bg-cyan-900/20 border border-cyan-500/20 rounded-2xl rounded-tr-none p-6 backdrop-blur-sm">
            <p className="text-white/90 leading-relaxed font-light">
              Can you help me outline a strategy for a new SaaS product launch?
            </p>
          </div>
        </motion.div>
        
        {/* AI Response (Mock) */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="flex gap-4 max-w-[80%]"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex-shrink-0" />
          <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-6 backdrop-blur-sm">
            <p className="text-white/80 leading-relaxed font-light mb-4">
              Certainly. A successful SaaS launch requires a multi-faceted approach. Here is a high-level strategic outline:
            </p>
            <ul className="space-y-2 text-white/70 list-disc list-inside">
                <li><strong className="text-white/90">Pre-Launch:</strong> Beta testing, community building, and teaser campaigns.</li>
                <li><strong className="text-white/90">Launch Day:</strong> Product Hunt coordination, press releases, and influencer activation.</li>
                <li><strong className="text-white/90">Post-Launch:</strong> User onboarding optimization, feedback loops, and rapid iteration.</li>
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Input Area */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="relative"
      >
        <Input 
          label="Ask anything..." 
          className="pr-12 bg-black/40 backdrop-blur-xl border-white/20" 
        />
        <button className="absolute right-3 top-3.5 p-2 bg-white/10 hover:bg-cyan-500/20 rounded-lg text-white/60 hover:text-cyan-400 transition-colors">
          <Send className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
};
