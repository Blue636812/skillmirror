import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Mail, Lock, ArrowRight, ShieldCheck, User } from 'lucide-react';
import { InteractionState } from '../types';
import { Input } from './ui/Input';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

export const SignUpForm: React.FC = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [greeting, setGreeting] = useState("Join the Neural Network.");
    const [interactionState, setInteractionState] = useState<InteractionState>('idle');

    const { signup, isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();

    // Redirect if already authenticated
    useEffect(() => {
        if (!loading && isAuthenticated) {
            navigate('/', { replace: true });
        }
    }, [isAuthenticated, loading, navigate]);

    // Mouse Parallax Logic
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseX = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseY = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseY, [-window.innerHeight / 2, window.innerHeight / 2], [3, -3]);
    const rotateY = useTransform(mouseX, [-window.innerWidth / 2, window.innerWidth / 2], [-3, 3]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            x.set(e.clientX - window.innerWidth / 2);
            y.set(e.clientY - window.innerHeight / 2);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [x, y]);

    // Conversational Microcopy
    useEffect(() => {
        switch (interactionState) {
            case 'idle':
                setGreeting("Join the Neural Network.");
                break;
            case 'typing':
                setGreeting("Inputting data...");
                break;
            case 'processing':
                setGreeting("Creating your digital twin...");
                break;
            case 'success':
                setGreeting("Optimization Complete. Welcome.");
                break;
            case 'error':
                // Greeting set by error handler
                break;
        }
    }, [interactionState]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        setInteractionState('typing');

        setTimeout(() => {
            setInteractionState('focused');
        }, 1000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.email || !form.password || !form.confirmPassword || !form.name) {
            setInteractionState('error');
            setGreeting("Complete all data points.");
            setTimeout(() => setInteractionState('idle'), 2000);
            return;
        }

        if (form.password !== form.confirmPassword) {
            setInteractionState('error');
            setGreeting("Access keys do not match.");
            setTimeout(() => setInteractionState('idle'), 2000);
            return;
        }

        if (form.password.length < 6) {
            setInteractionState('error');
            setGreeting("Key strength insufficient (min 6 chars).");
            setTimeout(() => setInteractionState('idle'), 2000);
            return;
        }

        setInteractionState('processing');

        try {
            await signup(form.email, form.password, { name: form.name });
            setInteractionState('success');
            setTimeout(() => {
                navigate('/', { replace: true });
            }, 1500);
        } catch (err: any) {
            console.error('Signup error:', err);
            setInteractionState('error');

            switch (err.code) {
                case 'auth/email-already-in-use':
                    setGreeting("Identity already registered.");
                    break;
                case 'auth/invalid-email':
                    setGreeting("Invalid identity format.");
                    break;
                case 'auth/weak-password':
                    setGreeting("Key integrity too weak.");
                    break;
                default:
                    setGreeting("Construction failed. Try again.");
            }
            setTimeout(() => setInteractionState('idle'), 3000);
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
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 rounded-[2rem] blur-2xl opacity-50 pointer-events-none transform translate-z-[-10px]" />

            <div className="relative bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl overflow-hidden transform-style-3d">

                <motion.div
                    style={{
                        x: useTransform(mouseX, (val) => val / 5),
                        y: useTransform(mouseY, (val) => val / 5),
                    }}
                    className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-30 pointer-events-none rounded-[2rem]"
                />

                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

                <div className="mb-10 text-center relative z-10">
                    <motion.div
                        key={greeting}
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.4 }}
                    >
                        <h1 className="text-3xl font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 mb-2">
                            New Entity
                        </h1>
                        <p className={`text-sm font-light tracking-wide h-6 ${interactionState === 'error' ? 'text-red-400' :
                            interactionState === 'success' ? 'text-emerald-400' : 'text-cyan-200/80'
                            }`}>
                            {greeting}
                        </p>
                    </motion.div>
                </div>

                <form onSubmit={handleSubmit} className="relative z-10 space-y-2">
                    <Input
                        label="Name"
                        name="name"
                        type="text"
                        value={form.name}
                        onChange={handleInputChange}
                        icon={<User className="w-5 h-5" />}
                        autoComplete="name"
                    />

                    <Input
                        label="Identity"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleInputChange}
                        icon={<Mail className="w-5 h-5" />}
                        autoComplete="email"
                    />

                    <Input
                        label="Create Key"
                        name="password"
                        type="password"
                        value={form.password}
                        onChange={handleInputChange}
                        icon={<Lock className="w-5 h-5" />}
                    />

                    <Input
                        label="Verify Key"
                        name="confirmPassword"
                        type="password"
                        value={form.confirmPassword}
                        onChange={handleInputChange}
                        icon={<Lock className="w-5 h-5" />}
                    />

                    <div className="pt-6 flex flex-col gap-4">
                        <motion.button
                            whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(6, 182, 212, 0.3)" }}
                            whileTap={{ scale: 0.98 }}
                            className="group relative w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl py-4 flex items-center justify-center gap-2 overflow-hidden transition-all duration-300"
                            disabled={interactionState === 'processing' || interactionState === 'success'}
                        >
                            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-cyan-400/10 to-transparent -translate-x-full group-hover:animate-shine" />

                            <span className="font-medium tracking-wide">
                                {interactionState === 'processing' ? 'Constructing...' : 'Initiate Sequence'}
                            </span>
                            {interactionState !== 'processing' && (
                                <ArrowRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                            )}
                        </motion.button>

                        <div className="flex items-center justify-between mt-4">
                            <span className="text-xs text-white/30">
                                Existing Entity? <Link to="/login" className="text-cyan-400 hover:text-cyan-300 transition-colors">Reonnect</Link>
                            </span>
                            <div className="flex items-center gap-1 text-xs text-emerald-400/40">
                                <ShieldCheck className="w-3 h-3" />
                                <span>End-to-End Encrypted</span>
                            </div>
                        </div>
                    </div>
                </form>

                <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none opacity-50" />
                <div className="absolute -top-20 -left-20 w-40 h-40 bg-violet-500/10 rounded-full blur-3xl pointer-events-none opacity-50" />
            </div>
        </motion.div>
    );
};
