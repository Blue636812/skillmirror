import React, { useState, Suspense } from 'react';
import { SmartOrb } from './components/SmartOrb';
import { Navigation } from './components/Navigation';
import { InteractionState } from './types';
import { AnimatePresence, motion } from 'framer-motion';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Pages
import { HomeDashboard } from './components/pages/HomeDashboard';
import { CoreAssistant } from './components/pages/CoreAssistant';
import { WritingAssistant } from './components/pages/WritingAssistant';
import { VirtualAssistant } from './components/pages/VirtualAssistant';
import { VoiceAssistant } from './components/pages/VoiceAssistant';
import { Insights } from './components/pages/Insights';
import SignIn from './components/pages/SignIn';
import SignUp from './components/pages/SignUp';
import ProtectedRoute from './components/ProtectedRoute';

const App: React.FC = () => {
  const [interactionState, setInteractionState] = useState<InteractionState>('idle');
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      setInteractionState('idle');
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  // Effect to update interaction state based on route?
  // For now, simpler to just let pages update it if needed, or default to idle
  // But orb is global.
  // We can pass setInteractionState to pages via Context or Props if we wanted tight coupling,
  // but for this task, keeping orb distinct is fine.

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
            <Routes location={location} key={location.pathname}>
              {/* Public Routes */}
              <Route
                path="/login"
                element={
                  <motion.div
                    key="login"
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                  >
                    <SignIn />
                  </motion.div>
                }
              />
              <Route
                path="/signup"
                element={
                  <motion.div
                    key="signup"
                    exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                  >
                    <SignUp />
                  </motion.div>
                }
              />

              {/* Protected Routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <motion.div
                    key="home"
                    initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full pb-24"
                  >
                    <HomeDashboard />
                  </motion.div>
                </ProtectedRoute>
              } />
              <Route path="/core" element={
                <ProtectedRoute>
                  <motion.div
                    key="core"
                    initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full pb-24"
                  >
                    <CoreAssistant />
                  </motion.div>
                </ProtectedRoute>
              } />
              <Route path="/writing" element={
                <ProtectedRoute>
                  <motion.div
                    key="writing"
                    initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full pb-24"
                  >
                    <WritingAssistant />
                  </motion.div>
                </ProtectedRoute>
              } />
              <Route path="/virtual" element={
                <ProtectedRoute>
                  <motion.div
                    key="virtual"
                    initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full pb-24"
                  >
                    <VirtualAssistant />
                  </motion.div>
                </ProtectedRoute>
              } />
              <Route path="/voice" element={
                <ProtectedRoute>
                  <motion.div
                    key="voice"
                    initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full pb-24"
                  >
                    <VoiceAssistant />
                  </motion.div>
                </ProtectedRoute>
              } />
              <Route path="/insights" element={
                <ProtectedRoute>
                  <motion.div
                    key="insights"
                    initial={{ opacity: 0, y: 10, filter: "blur(5px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full pb-24"
                  >
                    <Insights />
                  </motion.div>
                </ProtectedRoute>
              } />
            </Routes>
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
            onLogout={handleLogout}
          />
        )}

      </main>
    </div>
  );
};

export default App;
