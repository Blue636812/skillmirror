import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles } from 'lucide-react';

export interface Message {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
}

interface ChatInterfaceProps {
    initialMessages?: Message[];
    onSendMessage?: (content: string) => Promise<void>;
    isProcessing?: boolean;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
    initialMessages = [],
    onSendMessage,
    isProcessing = false
}) => {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initial Welcome Message if empty
    useEffect(() => {
        if (messages.length === 0) {
            setMessages([
                {
                    id: 'welcome',
                    role: 'assistant',
                    content: "Hello. I am initialized and ready to assist you. Whether you need complex problem solving, creative brainstorming, or data analysis, I am at your disposal. Where shall we begin?",
                    timestamp: new Date()
                }
            ]);
        }
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim() || isProcessing) return;

        const newUserMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, newUserMsg]);
        setInputValue('');

        if (onSendMessage) {
            await onSendMessage(newUserMsg.content);
        } else {
            // Mock response if no handler provided (for UI demo)
            setTimeout(() => {
                const mockResponse: Message = {
                    id: (Date.now() + 1).toString(),
                    role: 'assistant',
                    content: "I've received your input. As a prototype, I am not yet connected to a live neural network, but I am listening.",
                    timestamp: new Date()
                };
                setMessages(prev => [...prev, mockResponse]);
            }, 1000);
        }
    };

    return (
        <div className="flex flex-col h-full w-full relative">
            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto space-y-6 pr-4 mb-20 scrollbar-hide pb-4">
                <AnimatePresence>
                    {messages.map((msg, index) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`flex gap-4 max-w-[80%] ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                        >
                            <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${msg.role === 'assistant'
                                    ? 'bg-gradient-to-br from-cyan-500 to-violet-500'
                                    : 'bg-white/10'
                                }`}>
                                {msg.role === 'assistant' ? <Sparkles className="w-4 h-4 text-white" /> : null}
                            </div>

                            <div className={`p-6 backdrop-blur-sm border ${msg.role === 'user'
                                    ? 'bg-cyan-900/20 border-cyan-500/20 rounded-2xl rounded-tr-none'
                                    : 'bg-white/5 border-white/10 rounded-2xl rounded-tl-none'
                                }`}>
                                <p className="text-white/90 leading-relaxed font-light whitespace-pre-wrap">
                                    {msg.content}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                    {isProcessing && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex gap-4 max-w-[80%]"
                        >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex-shrink-0 animate-pulse" />
                            <div className="bg-white/5 border border-white/10 rounded-2xl rounded-tl-none p-6 backdrop-blur-sm">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                                    <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                    <div className="w-2 h-2 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#050505] via-[#050505] to-transparent">
                <motion.form
                    onSubmit={handleSend}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative"
                >
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Ask anything..."
                        className="w-full bg-black/40 backdrop-blur-xl border border-white/20 rounded-xl py-4 pl-6 pr-14 text-white placeholder:text-white/40 focus:outline-none focus:border-cyan-500/50 transition-all font-light"
                    />
                    <button
                        type="submit"
                        disabled={!inputValue.trim() || isProcessing}
                        className="absolute right-3 top-3.5 p-2 bg-white/10 hover:bg-cyan-500/20 rounded-lg text-white/60 hover:text-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Send className="w-4 h-4" />
                    </button>
                </motion.form>
            </div>
        </div>
    );
};
