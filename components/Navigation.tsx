import React from 'react';
import { Home, MessageSquare, PenTool, Layout, Mic, BarChart2, LogOut } from 'lucide-react';
import { PageType } from '../types';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

interface NavigationProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
  onLogout: () => void;
}

const navItems: { id: PageType; label: string; icon: React.ReactNode }[] = [
  { id: 'home', label: 'Home', icon: <Home className="w-5 h-5" /> },
  { id: 'core', label: 'Assistant', icon: <MessageSquare className="w-5 h-5" /> },
  { id: 'writing', label: 'Writing', icon: <PenTool className="w-5 h-5" /> },
  { id: 'virtual', label: 'Tasks', icon: <Layout className="w-5 h-5" /> },
  { id: 'voice', label: 'Voice', icon: <Mic className="w-5 h-5" /> },
  { id: 'insights', label: 'Insights', icon: <BarChart2 className="w-5 h-5" /> },
];

export const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate, onLogout }) => {
  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-center gap-2 p-2 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={clsx(
              "relative px-4 py-3 rounded-full flex items-center justify-center transition-all duration-300 group",
              currentPage === item.id 
                ? "bg-white/10 text-white shadow-[0_0_20px_rgba(255,255,255,0.1)]" 
                : "text-white/40 hover:text-white hover:bg-white/5"
            )}
            title={item.label}
          >
            {item.icon}
            {currentPage === item.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 border border-white/20 rounded-full pointer-events-none"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            
            {/* Tooltip */}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 border border-white/10 rounded text-[10px] text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              {item.label}
            </span>
          </button>
        ))}
        
        <div className="w-px h-6 bg-white/10 mx-2" />
        
        <button 
          onClick={onLogout}
          className="px-4 py-3 rounded-full text-red-400/60 hover:text-red-400 hover:bg-red-500/10 transition-all duration-300"
          title="Logout"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </motion.div>
  );
};
