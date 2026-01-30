import React from 'react';
import { motion } from 'framer-motion';
import { BarChart2, PieChart, TrendingUp, Activity, Database } from 'lucide-react';

export const Insights: React.FC = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <h2 className="text-2xl font-light text-white">System Insights</h2>
        <div className="flex gap-2">
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/60">Last 24 Hours</span>
            <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-xs text-cyan-400">Live</span>
        </div>
      </motion.div>

      {/* Main Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
            { label: 'Total Interactions', value: '8,421', icon: <Activity />, color: 'text-cyan-400' },
            { label: 'Knowledge Base', value: '42TB', icon: <Database />, color: 'text-violet-400' },
            { label: 'Optimization', value: '99.9%', icon: <TrendingUp />, color: 'text-emerald-400' },
        ].map((stat, i) => (
            <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md"
            >
                <div className="flex justify-between items-start mb-4">
                    <div className={`p-2 bg-white/5 rounded-lg ${stat.color}`}>{stat.icon}</div>
                    <span className="text-xs text-white/30">+12% vs last week</span>
                </div>
                <h3 className="text-3xl font-light text-white mb-1">{stat.value}</h3>
                <p className="text-sm text-white/40">{stat.label}</p>
            </motion.div>
        ))}
      </div>

      {/* Large Chart Area (Mock) */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="bg-black/40 border border-white/10 rounded-3xl p-8 backdrop-blur-xl h-64 relative overflow-hidden"
      >
        <h3 className="text-lg text-white/80 mb-8">Neural Processing Load</h3>
        
        {/* Mock Chart Visuals */}
        <div className="absolute bottom-0 left-0 right-0 h-40 flex items-end justify-between px-8 pb-8 gap-2">
            {[...Array(30)].map((_, i) => (
                <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.random() * 80 + 20}%` }}
                    transition={{ duration: 1, delay: i * 0.02 }}
                    className="flex-1 bg-gradient-to-t from-cyan-500/50 to-transparent rounded-t-sm"
                />
            ))}
        </div>
        
        {/* Grid lines */}
        <div className="absolute inset-0 z-0 pointer-events-none opacity-10" style={{ backgroundImage: 'linear-gradient(white 1px, transparent 1px)', backgroundSize: '100% 40px' }} />
      </motion.div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md"
         >
             <div className="flex items-center gap-3 mb-4">
                 <PieChart className="w-5 h-5 text-violet-400" />
                 <h3 className="text-white/80">Topic Distribution</h3>
             </div>
             <div className="space-y-4">
                 {[
                     { label: 'Coding & Dev', width: '70%', color: 'bg-cyan-500' },
                     { label: 'Creative Writing', width: '45%', color: 'bg-violet-500' },
                     { label: 'Data Analysis', width: '30%', color: 'bg-emerald-500' }
                 ].map((item, i) => (
                     <div key={i}>
                         <div className="flex justify-between text-xs text-white/60 mb-1">
                             <span>{item.label}</span>
                             <span>{item.width}</span>
                         </div>
                         <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                             <div className={`h-full ${item.color} rounded-full`} style={{ width: item.width }} />
                         </div>
                     </div>
                 ))}
             </div>
         </motion.div>

         <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md flex flex-col justify-center items-center text-center"
         >
             <div className="w-24 h-24 rounded-full border-4 border-white/5 border-t-cyan-400 flex items-center justify-center mb-4">
                 <span className="text-2xl font-light text-white">A+</span>
             </div>
             <h3 className="text-white/80 mb-1">System Health</h3>
             <p className="text-sm text-white/40">All neural pathways operational.</p>
         </motion.div>
       </div>
    </div>
  );
};
