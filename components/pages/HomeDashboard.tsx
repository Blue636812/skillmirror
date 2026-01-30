import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Zap, TrendingUp, CheckCircle2 } from 'lucide-react';
import { TaskBoard } from '../TaskBoard';

export const HomeDashboard: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto p-6 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-4xl font-light text-transparent bg-clip-text bg-gradient-to-r from-white to-white/60">
          Good morning, Creator.
        </h1>
        <p className="text-white/40 font-light">
          Your systems are operating at 100% efficiency.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Daily Focus (Task Board) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="col-span-2 h-[400px]"
        >
          <TaskBoard />
        </motion.div>

        {/* Card 2: Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md flex flex-col justify-between"
        >
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-lg text-white/80 font-medium">Up Next</h3>
              <p className="text-sm text-white/40">Today, 10:00 AM</p>
            </div>
            <Calendar className="w-6 h-6 text-violet-400" />
          </div>
          <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/5">
            <p className="text-sm text-cyan-200">Product Strategy Sync</p>
            <div className="flex items-center gap-2 mt-2 text-xs text-white/30">
              <Clock className="w-3 h-3" />
              <span>45 mins</span>
            </div>
          </div>
        </motion.div>

        {/* Card 3: Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-cyan-900/20 to-violet-900/20 border border-white/10 rounded-3xl p-8 backdrop-blur-md"
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm text-white/60 uppercase tracking-widest">Efficiency</h3>
            <TrendingUp className="w-5 h-5 text-emerald-400" />
          </div>
          <p className="text-4xl font-light text-white">98.2%</p>
          <div className="mt-4 h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <div className="h-full w-[98%] bg-gradient-to-r from-cyan-400 to-emerald-400" />
          </div>
        </motion.div>

        {/* Card 4: Recent Prompt */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="col-span-1 md:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md"
        >
          <h3 className="text-lg text-white/80 font-medium mb-4">Recent Inquiry</h3>
          <div className="flex gap-4">
            <div className="w-1 h-full min-h-[40px] bg-cyan-500 rounded-full" />
            <div>
              <p className="text-white/60 italic">"Analyze the market trends for quantum computing in 2025..."</p>
              <button className="mt-4 text-xs text-cyan-400 hover:text-cyan-300 transition-colors uppercase tracking-wider font-medium">Continue Conversation &rarr;</button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
