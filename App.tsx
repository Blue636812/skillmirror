import React, { useState, Suspense, useEffect } from 'react';
import { SmartOrb } from './components/SmartOrb';
import { LoginForm } from './components/LoginForm';
import { Navigation } from './components/Navigation';
import { InteractionState, PageType } from './types';
import { AnimatePresence, motion } from 'framer-motion';

// Pages
import { HomeDashboard } from './components/pages/HomeDashboard';
import { CoreAssistant } from './components/pages/CoreAssistant';
import { WritingAssistant } from './components/pages/WritingAssistant';
import { VirtualAssistant } from './components/pages/VirtualAssistant';
import { VoiceAssistant } from './components/pages/VoiceAssistant';
import { Insights } from './components/pages/Insights';

const App: React.FC = () => {
  const [interactionState, setInteractionState] = useState<InteractionState>('idle');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setInteractionState('idle'); // Reset to idle for the main dashboard
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('home');
    setInteractionState('idle');
  };

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
    // Optional: React to page changes in the orb state
    if (page === 'voice') {
        setInteractionState('listening');
    } else if (page === 'core') {
        setInteractionState('focused');
    } else {
        setInteractionState('idle');
    }
  };

  const renderPage = () => {
    switch (currentPage) {
        case 'home': return <HomeDashboard />;
        case 'core': return <CoreAssistant />;
        case 'writing': return <WritingAssistant />;
        case 'virtual': return <VirtualAssistant />;
        case 'voice': return <VoiceAssistant />;
        case 'insights': return <Insights />;
        default: return <HomeDashboard />;
    }
  };

  return (
    <div className="relative w-full h-screen bg-[#050505] overflow-hidden flex flex-col font-sans">
      
      {/* 3D Background Layer - Persists across all pages */}
      <div className="absolute inset-0 z-0">
        <Suspense fallback={<div className="w-full h-full bg-black flex items-center justify-center text-cyan-900">Initializing Neural Core...</div>}>
          <SmartOrb state={interactionState} />
        </Suspense>
      </div>

      {/* Overlay Vignette for focus */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-transparent to-black opacity-80 z-0" />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-0" />

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none z-[1] opacity-[0.03]" 
        style={{
          backgroundImage: 'linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} 
      />

      {/* Main Content Layer */}
      <main className="relative z-10 w-full h-full flex flex-col">
        
        {/* Top Status Bar */}
        <div className="w-full px-8 py-6 flex justify-between items-center z-20">
           <div className="flex items-center gap-3 opacity-50 hover:opacity-100 transition-opacity duration-500 cursor-default">
             <div className={`w-2 h-2 rounded-full ${interactionState === 'processing' ? 'bg-amber-400 animate-pulse' : interactionState === 'success' ? 'bg-emerald-400' : interactionState === 'listening' ? 'bg-red-400 animate-pulse' : 'bg-cyan-400'}`} />
             <span className="text-xs tracking-[0.2em] font-mono text-white/40 uppercase">System Active</span>
           </div>
           
           {isAuthenticated && (
             <div className="text-[10px] text-white/20 font-mono">
               SECURE CONNECTION // ENCRYPTED
             </div>
           )}
        </div>

        <div className="flex-1 flex items-center justify-center relative overflow-y-auto scrollbar-hide">
            <AnimatePresence mode="wait">
                {!isAuthenticated ? (
                    <motion.div
                        key="login"
                        exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                        transition={{ duration: 0.5 }}
                        className="w-full px-4"
                    >
                        <LoginForm 
                            interactionState={interactionState} 
                            onInteractionChange={setInteractionState}
                            onLoginSuccess={handleLoginSuccess}
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        key={currentPage}
                        initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full pb-24" // Padding for dock
                    >
                        {renderPage()}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* Footer/Version (Only on Login) */}
        {!isAuthenticated && (
            <div className="absolute bottom-8 w-full text-center pointer-events-none">
                <p className="text-[10px] text-white/20 font-mono tracking-widest uppercase">
                    SmartMate AI OS v2.4.0 • Build 9482
                </p>
            </div>
        )}

        {/* Navigation Dock (Only when authenticated) */}
        {isAuthenticated && (
            <Navigation 
                currentPage={currentPage} 
                onNavigate={handleNavigate}
                onLogout={handleLogout}
            />
        )}

      </main>
    </div>
  );
};

export default App;
