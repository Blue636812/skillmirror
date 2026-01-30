import React from 'react';
import { motion } from 'framer-motion';
import { Layout, CheckSquare, Clock, Plus } from 'lucide-react';

export const VirtualAssistant: React.FC = () => {
  const tasks = [
    { id: 1, title: 'System Diagnostics', time: '10:00 AM', tag: 'High Priority', color: 'border-red-400/50' },
    { id: 2, title: 'Client Meeting Preparation', time: '11:30 AM', tag: 'Work', color: 'border-cyan-400/50' },
    { id: 3, title: 'Neural Net Training Cycle', time: '02:00 PM', tag: 'Dev', color: 'border-violet-400/50' },
    { id: 4, title: 'Weekly Review', time: '04:00 PM', tag: 'Routine', color: 'border-white/20' },
  ];

  return (
    <div className="w-full max-w-5xl mx-auto p-4">
      <div className="flex justify-between items-end mb-8">
        <div>
            <h2 className="text-3xl font-light text-white">Tasks & Schedule</h2>
            <p className="text-white/40">You have 4 tasks remaining today.</p>
        </div>
        <button className="px-4 py-2 bg-cyan-500 text-black font-medium rounded-full flex items-center gap-2 hover:bg-cyan-400 transition-colors">
            <Plus className="w-4 h-4" /> New Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tasks.map((task, index) => (
            <motion.div 
                key={task.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`group relative bg-white/5 border ${task.color} rounded-2xl p-6 backdrop-blur-md hover:bg-white/10 transition-all duration-300`}
            >
                <div className="flex justify-between items-start mb-4">
                    <span className="px-2 py-1 bg-white/5 rounded text-[10px] uppercase tracking-wider text-white/60">{task.tag}</span>
                    <button className="text-white/20 group-hover:text-white/60"><CheckSquare className="w-5 h-5" /></button>
                </div>
                <h3 className="text-lg font-light text-white mb-2">{task.title}</h3>
                <div className="flex items-center gap-2 text-sm text-white/40">
                    <Clock className="w-4 h-4" />
                    <span>{task.time}</span>
                </div>
                
                {/* Glow Effect on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity pointer-events-none" />
            </motion.div>
        ))}
      </div>

      {/* Calendar Strip */}
      <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
        <h3 className="text-lg text-white/80 mb-6">Timeline</h3>
        <div className="relative h-24 flex items-center">
            {/* Line */}
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10" />
            
            {/* Events */}
            <div className="relative z-10 w-full flex justify-between px-8">
                {[9, 10, 11, 12, 1, 2, 3, 4, 5].map((hour, i) => (
                    <div key={hour} className="flex flex-col items-center gap-2 group cursor-pointer">
                        <div className={`w-3 h-3 rounded-full border border-white/20 bg-[#050505] transition-all duration-300 group-hover:scale-150 ${i === 2 ? 'bg-cyan-400 border-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.5)]' : ''}`} />
                        <span className="text-xs text-white/20 group-hover:text-white/60">{hour}:00</span>
                    </div>
                ))}
            </div>
        </div>
      </div>
    </div>
  );
};
