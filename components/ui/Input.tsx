import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
}

export function Input({ label, icon, className, value, ...props }: InputProps) {
  return (
    <div className="relative group w-full mb-6">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/40 group-focus-within:text-cyan-400 transition-colors duration-300 z-10">
        {icon}
      </div>
      <input
        {...props}
        value={value}
        className={twMerge(
          "peer w-full bg-white/5 border border-white/10 text-white rounded-xl py-4 pl-12 pr-4 outline-none",
          "placeholder-transparent font-light tracking-wide",
          "focus:border-cyan-400/30 focus:bg-white/10",
          "focus:shadow-[0_0_20px_rgba(6,182,212,0.1),inset_0_0_10px_rgba(6,182,212,0.05)]", // Double glow
          "transition-all duration-300",
          className
        )}
        placeholder={label}
      />
      <label
        className={clsx(
          "absolute left-12 top-4 text-white/40 text-sm transition-all duration-300 pointer-events-none z-10",
          "peer-placeholder-shown:text-base peer-placeholder-shown:top-4 peer-placeholder-shown:text-white/40",
          "group-focus-within:-top-2.5 group-focus-within:text-xs group-focus-within:text-cyan-400 group-focus-within:bg-[#050505] group-focus-within:px-2",
          // Handle filled state
          value ? "-top-2.5 text-xs text-cyan-400 bg-[#050505] px-2" : ""
        )}
      >
        {label}
      </label>
      
      {/* Active bottom line indicator for that "tech" feel */}
      <div className="absolute bottom-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 ease-out" />
    </div>
  );
}