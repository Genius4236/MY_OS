import { useEffect, useState } from "react";
import { Cpu, Network, ShieldCheck, Zap } from "lucide-react";
function SystemStats() {
  const [stats, setStats] = useState({
    cpu: 25,
    ram: 62,
    network: 140,
    temp: 39,
  });
  useEffect(() => {
    const interval = setInterval(() => {
      setStats({
        cpu: Math.floor(Math.random() * 45) + 15,
        ram: Math.floor(Math.random() * 8) + 58,
        network: Math.floor(Math.random() * 400) + 80,
        temp: Math.floor(Math.random() * 5) + 38,
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);
  // Map progress (0-100) to SVG circle dash offset
  const getStrokeDashOffset = (percent, radius) => {
    const circumference = 2 * Math.PI * radius;
    return circumference - (percent / 100) * circumference;
  };
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  return (
    <div className="absolute top-20 right-6 w-64 bg-[#050505]/75 border border-[var(--accent)]/30 rounded-xl p-4 z-20 backdrop-blur-md text-[var(--accent)] font-mono shadow-[0_0_20px_var(--accent-dim)] select-none">
      
      {/* Title */}
      <div className="flex items-center gap-2 border-b border-[var(--accent-dim)] pb-2 mb-3">
        <Zap size={14} className="animate-pulse" />
        <span className="text-xs uppercase font-bold tracking-widest text-white">System Diagnostics</span>
      </div>
      {/* SVG Dials */}
      <div className="flex justify-around items-center mb-4">
        
        {/* CPU Dial */}
        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              {/* Background circle */}
              <circle
                cx="32"
                cy="32"
                r={radius}
                className="stroke-neutral-800 fill-none"
                strokeWidth="3.5"
              />
              {/* Progress circle */}
              <circle
                cx="32"
                cy="32"
                r={radius}
                className="stroke-[var(--accent)] fill-none transition-all duration-500"
                strokeWidth="3.5"
                strokeDasharray={circumference}
                strokeDashoffset={getStrokeDashOffset(stats.cpu, radius)}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center text-[10px] text-white font-bold">
              <span>{stats.cpu}%</span>
            </div>
          </div>
          <span className="text-[9px] uppercase tracking-wider text-[var(--accent)]/70 mt-1 flex items-center gap-1">
            <Cpu size={10} /> CPU
          </span>
        </div>
        {/* RAM Dial */}
        <div className="flex flex-col items-center">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
              <circle
                cx="32"
                cy="32"
                r={radius}
                className="stroke-neutral-800 fill-none"
                strokeWidth="3.5"
              />
              <circle
                cx="32"
                cy="32"
                r={radius}
                className="stroke-[var(--accent)] fill-none transition-all duration-500"
                strokeWidth="3.5"
                strokeDasharray={circumference}
                strokeDashoffset={getStrokeDashOffset(stats.ram, radius)}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute flex flex-col items-center text-[10px] text-white font-bold">
              <span>{stats.ram}%</span>
            </div>
          </div>
          <span className="text-[9px] uppercase tracking-wider text-[var(--accent)]/70 mt-1 flex items-center gap-1">
            <Cpu size={10} /> RAM
          </span>
        </div>
      </div>
      {/* Numerical Spec Table */}
      <div className="space-y-2 border-t border-[var(--accent-dim)] pt-3 text-[10px] uppercase tracking-wider text-[var(--accent)]/85">
        <div className="flex justify-between">
          <span className="text-[var(--accent)]/60">BANDWIDTH:</span>
          <span className="text-white flex items-center gap-1">
            <Network size={10} /> {stats.network} KB/S
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[var(--accent)]/60">CPU TEMP:</span>
          <span className="text-white">{stats.temp} °C</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[var(--accent)]/60">AI CYBER CORE:</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <ShieldCheck size={10} /> ACTIVE
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-[var(--accent)]/60">THREAT LEVEL:</span>
          <span className="text-green-400 font-bold">0.02% [NOMINAL]</span>
        </div>
      </div>
    </div>
  );
}
export default SystemStats;