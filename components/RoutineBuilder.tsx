import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Play, Sun, Moon, Clock } from 'lucide-react';
import { routineService, Routine } from '../services/routineService';
import { useAuth } from '../context/AuthContext';

export const RoutineBuilder: React.FC = () => {
    const { user } = useAuth();
    const [routines, setRoutines] = useState<Routine[]>([]);
    const [loading, setLoading] = useState(true);
    const [isCreating, setIsCreating] = useState(false);
    const [newRoutineName, setNewRoutineName] = useState('');

    useEffect(() => {
        if (user) {
            loadRoutines();
        }
    }, [user]);

    const loadRoutines = async () => {
        try {
            if (!user) return;
            const fetched = await routineService.getUserRoutines(user.uid);
            setRoutines(fetched);
        } catch (error) {
            console.error("Failed to load routines", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateRoutine = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newRoutineName.trim() || !user) return;

        try {
            const newRoutine = await routineService.createRoutine({
                userId: user.uid,
                name: newRoutineName,
                steps: [],
                isActive: true
            });
            setRoutines([...routines, newRoutine as Routine]);
            setNewRoutineName('');
            setIsCreating(false);
        } catch (error) {
            console.error("Failed to create routine", error);
        }
    };

    if (loading) return <div className="text-white/40 text-sm">Synchronizing schedules...</div>;

    return (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg text-white/80 font-medium">Daily Protocols</h3>
                <button
                    onClick={() => setIsCreating(!isCreating)}
                    className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg transition-colors text-white/60 hover:text-white"
                >
                    <Plus className={`w-4 h-4 transition-transform ${isCreating ? 'rotate-45' : ''}`} />
                </button>
            </div>

            {isCreating && (
                <form onSubmit={handleCreateRoutine} className="mb-4">
                    <input
                        autoFocus
                        type="text"
                        value={newRoutineName}
                        onChange={(e) => setNewRoutineName(e.target.value)}
                        placeholder="Protocol Name..."
                        className="w-full bg-black/20 border border-white/10 rounded-xl py-2 px-3 text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50"
                    />
                </form>
            )}

            <div className="flex-1 overflow-y-auto space-y-3 scrollbar-hide">
                <AnimatePresence>
                    {routines.map((routine) => (
                        <motion.div
                            key={routine.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/5 border border-white/5 p-4 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center text-violet-300">
                                        <Clock className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium text-white/90">{routine.name}</h4>
                                        <p className="text-xs text-white/40">{routine.steps.length} steps</p>
                                    </div>
                                </div>
                                <button className="opacity-0 group-hover:opacity-100 p-2 text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-all">
                                    <Play className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                    {routines.length === 0 && !isCreating && (
                        <div className="text-center py-8 text-white/20 text-sm">
                            No active protocols defined.
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
