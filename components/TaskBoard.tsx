import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, Trash2, Calendar, AlertCircle } from 'lucide-react';
import { taskService, Task } from '../services/taskService';
import { useAuth } from '../context/AuthContext';

export const TaskBoard: React.FC = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [isAdding, setIsAdding] = useState(false);

    useEffect(() => {
        if (user) {
            loadTasks();
        }
    }, [user]);

    const loadTasks = async () => {
        try {
            if (!user) return;
            const fetchedTasks = await taskService.getUserTasks(user.uid);
            setTasks(fetchedTasks);
        } catch (error) {
            console.error("Failed to load tasks", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskTitle.trim() || !user) return;

        setIsAdding(true);
        try {
            const newTask = await taskService.createTask({
                userId: user.uid,
                title: newTaskTitle,
                description: '',
                status: 'pending',
                priority: 'medium'
            });
            setTasks([newTask as Task, ...tasks]);
            setNewTaskTitle('');
        } catch (error) {
            console.error("Failed to create task", error);
        } finally {
            setIsAdding(false);
        }
    };

    const handleToggleStatus = async (task: Task) => {
        if (!task.id) return;
        const newStatus = task.status === 'completed' ? 'pending' : 'completed';

        // Optimistic update
        const updatedTasks = tasks.map(t =>
            t.id === task.id ? { ...t, status: newStatus } : t
        );
        setTasks(updatedTasks as Task[]); // Cast to avoid strict type issues with optimistic updates

        try {
            await taskService.updateTask(task.id, { status: newStatus });
        } catch (error) {
            console.error("Failed to update task", error);
            // Revert on error
            loadTasks();
        }
    };

    const handleDelete = async (taskId: string) => {
        // Optimistic update
        const updatedTasks = tasks.filter(t => t.id !== taskId);
        setTasks(updatedTasks);

        try {
            await taskService.deleteTask(taskId);
        } catch (error) {
            console.error("Failed to delete task", error);
            loadTasks();
        }
    };

    if (loading) return <div className="text-white/40 text-sm">Loading protocols...</div>;

    return (
        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-md h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg text-white/80 font-medium">Active Directives</h3>
                <div className="text-xs text-white/30 uppercase tracking-widest">{tasks.filter(t => t.status !== 'completed').length} PENDING</div>
            </div>

            {/* Add Task Form */}
            <form onSubmit={handleAddTask} className="mb-6 relative">
                <input
                    type="text"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    placeholder="Input new directive..."
                    className="w-full bg-black/20 border border-white/10 rounded-xl py-3 px-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50 transition-colors pr-12"
                />
                <button
                    type="submit"
                    disabled={isAdding || !newTaskTitle.trim()}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 rounded-lg transition-colors disabled:opacity-50"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </form>

            {/* Task List */}
            <div className="flex-1 overflow-y-auto space-y-3 scrollbar-hide">
                <AnimatePresence mode='popLayout'>
                    {tasks.map((task) => (
                        <motion.div
                            key={task.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            layout
                            className={`group flex items-center gap-3 p-3 rounded-xl border transition-all ${task.status === 'completed'
                                    ? 'bg-emerald-500/5 border-emerald-500/20'
                                    : 'bg-white/5 border-white/5 hover:border-white/10'
                                }`}
                        >
                            <button
                                onClick={() => handleToggleStatus(task)}
                                className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${task.status === 'completed'
                                        ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                                        : 'border-white/20 hover:border-cyan-400 text-transparent hover:text-cyan-400'
                                    }`}
                            >
                                <Check className="w-3 h-3" />
                            </button>

                            <span className={`flex-1 text-sm ${task.status === 'completed' ? 'text-white/30 line-through' : 'text-white/80'
                                }`}>
                                {task.title}
                            </span>

                            <button
                                onClick={() => task.id && handleDelete(task.id)}
                                className="opacity-0 group-hover:opacity-100 p-1.5 text-white/20 hover:text-red-400 transition-all"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </motion.div>
                    ))}
                    {tasks.length === 0 && (
                        <div className="text-center py-8 text-white/20 text-sm">
                            No active directives. System waiting...
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
