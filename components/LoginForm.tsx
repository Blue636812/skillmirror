import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Mail, Lock, ArrowRight, ShieldCheck, User } from 'lucide-react';
import { InteractionState, FormState, LoginCardProps } from '../types';
import { Input } from './ui/Input';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export const LoginForm: React.FC<LoginCardProps> = ({ onInteractionChange, interactionState, onLoginSuccess }) => {
  const [form, setForm] = useState<FormState>({ email: '', password: '' });
  const [greeting, setGreeting] = useState("I'm Smart. Ready when you are.");
  const [isGuest, setIsGuest] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  // Mouse Parallax Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth out the mouse movement
  const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

  // Transform mouse position to rotation values (subtle tilt)
  const rotateX = useTransform(mouseY, [-window.innerHeight / 2, window.innerHeight / 2], [3, -3]);
  const rotateY = useTransform(mouseX, [-window.innerWidth / 2, window.innerWidth / 2], [-3, 3]);

  // Handle global mouse move for parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      x.set(e.clientX - window.innerWidth / 2);
      y.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y]);

  // Conversational Microcopy updates based on state
  useEffect(() => {
    switch (interactionState) {
      case 'idle':
        setGreeting("I'm Smart. Ready when you are.");
        break;
      case 'typing':
        setGreeting("I'm listening...");
        break;
      case 'processing':
        setGreeting("Verifying securely...");
        break;
      case 'success':
        setGreeting(isGuest ? "Welcome, Guest. Access limited." : "Welcome back, Creator.");
        break;
      case 'error':
        // Greeting set by error handler
        break;
    }
  }, [interactionState, isGuest]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    onInteractionChange('typing');
    setIsGuest(false);

    // Debounce return to idle/focused
    setTimeout(() => {
      onInteractionChange('focused');
    }, 1000);
  };

  const handleGuestLogin = () => {
    setIsGuest(true);
    onInteractionChange('processing');
    setGreeting("Initializing anonymous protocol...");

    setTimeout(() => {
      onInteractionChange('success');
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess();
        navigate('/');
      }, 1000);
    }, 1500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGuest(false);
    if (!form.email || !form.password) {
      onInteractionChange('error');
      setGreeting("I need both identity and key.");
      setTimeout(() => onInteractionChange('idle'), 2000);
      return;
    }

    onInteractionChange('processing');

    try {
      await login(form.email, form.password);
      onInteractionChange('success');
      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess();
        navigate('/');
      }, 1000);
    } catch (err: any) {
      console.error('Login error:', err);
      onInteractionChange('error');

      switch (err.code) {
        case 'auth/user-not-found':
        case 'auth/invalid-credential':
        case 'auth/wrong-password':
          setGreeting("Identity could not be verified.");
          break;
        case 'auth/invalid-email':
          setGreeting("That identity format appears invalid.");
          break;
        case 'auth/too-many-requests':
          setGreeting("Too many attempts. Stand by.");
          break;
        default:
          setGreeting("Authentication protocol failed.");
      }
      setTimeout(() => onInteractionChange('idle'), 3000);
    }
  };

  return (
    <motion.div
      style={{ rotateX, rotateY, perspective: 1000 }}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative w-full max-w-md mx-auto perspective-1000"
    >
      {/* Background Glow behind card */}
      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-[2rem] blur-2xl opacity-50 pointer-events-none transform translate-z-[-10px]" />

      {/* Main Glass Card */}
      <div className="relative bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl overflow-hidden transform-style-3d">

        {/* Dynamic Sheen/Reflection based on mouse position */}
        <motion.div
          style={{
            x: useTransform(mouseX, (val) => val / 5),
            y: useTransform(mouseY, (val) => val / 5),
          }}
          className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-30 pointer-events-none rounded-[2rem]"
        />

        {/* Subtle inner reflection */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

        {/* Header */}
        <div className="mb-10 text-center relative z-10">
          <motion.div
            key={greeting}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-2">
              Smart
            </h1>
            <p className={`text-sm font-light tracking-wide h-6 ${interactionState === 'error' ? 'text-red-400' :
                interactionState === 'success' ? 'text-emerald-400' : 'text-cyan-200/80'
              }`}>
              {greeting}
            </p>
          </motion.div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="relative z-10 space-y-2">
          <Input
            label="Identity"
            name="email"
            type="email"
            value={form.email}
            onChange={handleInputChange}
            onFocus={() => onInteractionChange('focused')}
            onBlur={() => onInteractionChange('idle')}
            icon={<Mail className="w-5 h-5" />}
            autoComplete="off"
          />

          <Input
            label="Access Key"
            name="password"
            type="password"
            value={form.password}
            onChange={handleInputChange}
            onFocus={() => onInteractionChange('focused')}
            onBlur={() => onInteractionChange('idle')}
            icon={<Lock className="w-5 h-5" />}
          />

          {/* Action Area */}
          <div className="pt-6 flex flex-col gap-4">
            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(6, 182, 212, 0.3)" }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl py-4 flex items-center justify-center gap-2 overflow-hidden transition-all duration-300"
              disabled={interactionState === 'processing' || interactionState === 'success'}
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full group-hover:animate-shine" />

              <span className="font-medium tracking-wide">
                {interactionState === 'processing' ? 'Authenticating...' : 'Initialize Session'}
              </span>
              {interactionState !== 'processing' && (
                <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              )}
            </motion.button>

            <motion.button
              type="button"
              onClick={handleGuestLogin}
              whileHover={{ scale: 1.01, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
              whileTap={{ scale: 0.98 }}
              disabled={interactionState === 'processing' || interactionState === 'success'}
              className="w-full bg-transparent border border-white/5 text-white/40 hover:text-white hover:border-white/20 rounded-xl py-3 text-sm font-light tracking-wide transition-all duration-300 flex items-center justify-center gap-2"
            >
              <User className="w-4 h-4" />
              <span>Continue as Guest</span>
            </motion.button>

            <div className="flex items-center justify-between mt-4">
              <Link to="/signup" className="text-xs text-white/30 hover:text-white/60 transition-colors">
                Create Account
              </Link>
              <div className="flex items-center gap-1 text-xs text-emerald-400/40">
                <ShieldCheck className="w-3 h-3" />
                <span>End-to-End Encrypted</span>
              </div>
            </div>
          </div>
        </form>

        {/* Decorative elements inside card */}
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none opacity-50" />
        <div className="absolute -top-20 -left-20 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl pointer-events-none opacity-50" />
      </div>
    </motion.div>
  );
};
