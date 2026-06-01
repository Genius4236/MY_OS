import { useEffect, useState } from "react";
import { Shield, Cpu, RefreshCw, Radio } from "lucide-react";
function CyberHUD() {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString());
  const [cpuHistory, setCpuHistory] = useState([20, 25, 30, 28, 35, 40, 38, 45, 42, 50]);
  const [ramHistory, setRamHistory] = useState([60, 61, 60, 62, 63, 62, 63, 62, 63, 64]);
  const [coord, setCoord] = useState({ lat: "37.7749", lng: "-122.4194" });
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
      setCpuHistory((prev) => [...prev.slice(1), Math.floor(Math.random() * 45) + 15]);
      setRamHistory((prev) => [...prev.slice(1), Math.floor(Math.random() * 6) + 58]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    // Slowly drift mock coordinate values to simulate satellite triangulation
    const interval = setInterval(() => {
      setCoord({
        lat: (37.7749 + (Math.random() - 0.5) * 0.01).toFixed(4),
        lng: (-122.4194 + (Math.random() - 0.5) * 0.01).toFixed(4),
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  const makePath = (history) => {
    const width = 60;
    const height = 18;
    return history
      .map((val, idx) => {
        const x = (idx / (history.length - 1)) * width;
        const y = height - (val / 100) * (height - 2) - 1;
        return `${x},${y}`;
      })
      .join(" ");
  };
  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl h-11 bg-[#050505]/70 border border-[var(--accent)]/30 rounded-lg flex items-center justify-between px-5 z-40 backdrop-blur-md text-[var(--accent)] text-xs font-bold shadow-[0_0_15px_var(--accent-dim)] select-none">
      
      {/* HUD Left: System status */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Radio size={14} className="animate-pulse text-[var(--accent)]" />
          <span className="tracking-wider uppercase">NODE: SECURE</span>
        </div>
        <div className="hidden md:flex items-center gap-1.5 border-l border-[var(--accent-dim)] pl-4 text-[var(--accent)]/70">
          <Shield size={12} />
          <span>FIREWALL: PRO</span>
        </div>
      </div>
      {/* HUD Center: Coordinates triangulation */}
      <div className="hidden lg:flex items-center gap-2 font-mono tracking-widest text-[var(--accent)]/65 text-[10px]">
        <span>GPS LOC // LAT: {coord.lat} N | LNG: {coord.lng} W</span>
      </div>
      {/* HUD Right: Micro sparkline graphs */}
      <div className="flex items-center gap-5">
        
        {/* CPU Graph */}
        <div className="flex items-center gap-2">
          <Cpu size={12} className="opacity-80" />
          <span className="text-[10px] text-[var(--accent)]/70 mr-1">CPU</span>
          <div className="relative flex items-center bg-black/40 border border-[var(--accent-dim)] rounded px-1.5 py-0.5 h-6">
            <svg width="60" height="18" className="stroke-[var(--accent)] fill-none">
              <polyline 
                points={makePath(cpuHistory)} 
                className="stroke-1.5 transition-all duration-300"
              />
            </svg>
            <span className="ml-1.5 text-[9px] w-6 text-right font-mono text-white">
              {cpuHistory[cpuHistory.length - 1]}%
            </span>
          </div>
        </div>
        {/* RAM Graph */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[var(--accent)]/70 mr-1">RAM</span>
          <div className="relative flex items-center bg-black/40 border border-[var(--accent-dim)] rounded px-1.5 py-0.5 h-6">
            <svg width="60" height="18" className="stroke-[var(--accent)] fill-none">
              <polyline 
                points={makePath(ramHistory)} 
                className="stroke-1.5 transition-all duration-300"
              />
            </svg>
            <span className="ml-1.5 text-[9px] w-6 text-right font-mono text-white">
              {ramHistory[ramHistory.length - 1]}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CyberHUD;