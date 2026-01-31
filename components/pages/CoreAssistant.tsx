import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { ChatInterface } from '../ChatInterface';

export const CoreAssistant: React.FC = () => {
  return (
    <div className="w-full max-w-4xl mx-auto h-[80vh] flex flex-col">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 mb-6 flex-shrink-0"
      >
        <div className="p-2 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
          <Sparkles className="w-5 h-5 text-cyan-400" />
        </div>
        <h2 className="text-xl font-light text-white">Core Assistant</h2>
      </motion.div>

      {/* Chat Interface */}
      <div className="flex-1 min-h-0">
        <ChatInterface />
      </div>
    </div>
  );
};
