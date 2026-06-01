import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Terminal as TermIcon, 
  User, 
  FolderCode, 
  Cpu, 
  Mail, 
  Globe, 
  Activity,
  FileCode
} from "lucide-react";
import { playSoundEffect } from "../utils/audio";
const iconMap = {
  terminal: { icon: TermIcon, color: "var(--accent)", desc: "Bash Command Console", size: "12 KB" },
  about: { icon: User, color: "var(--accent)", desc: "Identity Dossier Card", size: "8 KB" },
  projects: { icon: FolderCode, color: "var(--accent)", desc: "Hacked Git Repositories", size: "32 KB" },
  skills: { icon: Cpu, color: "var(--accent)", desc: "Core Intelligence Deck", size: "24 KB" },
  contact: { icon: Mail, color: "var(--accent)", desc: "RSA Encrypted Comms", size: "5 KB" },
  browser: { icon: Globe, color: "var(--accent)", desc: "Secure Deep Net Navigator", size: "48 KB" },
  monitor: { icon: Activity, color: "var(--accent)", desc: "System Hardware Monitors", size: "15 KB" },
};
function DesktopIcon({ title, iconType, onOpen }) {
  const [displayText, setDisplayText] = useState(title);
  const [hovered, setHovered] = useState(false);
  
  const config = iconMap[iconType] || { icon: FileCode, color: "var(--accent)", desc: "Virtual Executable File", size: "2 KB" };
  const Icon = config.icon;
  const triggerScramble = () => {
    playSoundEffect("typing");
    let iterations = 0;
    const chars = "アァカサタナハマヤャラワ0123456789#%&?$!@";
    const interval = setInterval(() => {
      setDisplayText(
        title
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iterations) {
              return title[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      iterations += 0.5;
      if (iterations >= title.length) {
        clearInterval(interval);
        setDisplayText(title);
      }
    }, 25);
  };
  return (
    <div
      onDoubleClick={onOpen}
      onMouseEnter={() => {
        setHovered(true);
        triggerScramble();
      }}
      onMouseLeave={() => {
        setHovered(false);
        setDisplayText(title);
      }}
      className="flex flex-col items-center cursor-pointer w-24 relative select-none group py-2"
    >
      {/* Hologram project emission ring at bottom of icon */}
      <div className="absolute bottom-8 w-14 h-3 bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-full blur-[1px] transform scale-y-50 group-hover:bg-[var(--accent)]/20 group-hover:border-[var(--accent)]/50 transition-all duration-300 pointer-events-none">
        <div className="w-full h-full rounded-full border-t border-[var(--accent)] animate-ping opacity-30" />
      </div>
      {/* Pulsing floating Icon */}
      <motion.div
        animate={hovered ? { y: -8, scale: 1.1 } : { y: [0, -3, 0] }}
        transition={hovered ? { duration: 0.2 } : { repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="relative z-10 p-3 bg-black/60 border border-[var(--accent)]/20 rounded-xl group-hover:border-[var(--accent)] group-hover:shadow-[0_0_20px_var(--accent-glow)] transition-all duration-300 flex items-center justify-center"
      >
        <Icon
          size={32}
          style={{ color: "var(--accent)" }}
          className="transition-colors duration-300"
        />
      </motion.div>
      {/* Scrambled name text */}
      <span className="text-[11px] font-bold text-center mt-2 px-1 py-0.5 rounded bg-black/40 border border-transparent group-hover:border-[var(--accent-dim)] group-hover:bg-black/80 transition-all duration-300 text-shadow text-[var(--accent)] whitespace-nowrap overflow-hidden max-w-full">
        {displayText}
      </span>
      {/* Rich Tooltip popup */}
      {hovered && (
        <div className="absolute left-28 top-3 w-48 bg-black/95 border border-[var(--accent)] p-2.5 rounded-lg shadow-[0_0_15px_var(--accent-dim)] text-[var(--accent)] z-50 pointer-events-none text-[10px] uppercase tracking-wider backdrop-blur-md">
          <div className="font-bold border-b border-[var(--accent-dim)] pb-1 mb-1 text-white">{title}</div>
          <div className="text-[var(--accent)]/70">{config.desc}</div>
          <div className="flex justify-between mt-1 text-[9px] text-white">
            <span>SIZE: {config.size}</span>
            <span className="text-emerald-400">DEC: READY</span>
          </div>
        </div>
      )}
    </div>
  );
}
export default DesktopIcon;