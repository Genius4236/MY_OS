import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Terminal as TermIcon, 
  User, 
  FolderCode, 
  Cpu, 
  Mail, 
  Globe, 
  Activity, 
  Settings, 
  Volume2, 
  VolumeX, 
  Tv, 
  RefreshCw,
  Power
} from "lucide-react";
import GlitchText from "../effects/GlitchText";
import { playSoundEffect } from "../utils/audio";
function Taskbar({
  windows,
  openWindow,
  closeWindow,
  focusWindow,
  crtActive,
  setCrtActive,
  matrixMode,
  setMatrixMode,
  soundEnabled,
  toggleSound,
  theme,
  setTheme,
  openMonitor,
}) {
  const [time, setTime] = useState(() => new Date().toLocaleTimeString());
  const [settingsOpen, setSettingsOpen] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const handleRestart = () => {
    playSoundEffect("access_denied");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };
  const appList = [
    { name: "terminal", label: "Terminal", icon: TermIcon },
    { name: "about", label: "About", icon: User },
    { name: "projects", label: "Projects", icon: FolderCode },
    { name: "skills", label: "Skills", icon: Cpu },
    { name: "contact", label: "Contact", icon: Mail },
    { name: "browser", label: "Browser", icon: Globe },
    { name: "monitor", label: "Monitor", icon: Activity },
  ];
  const handleAppClick = (appName) => {
    if (windows[appName]) {
      closeWindow(appName);
    } else {
      openWindow(appName);
    }
  };
  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl z-[100] flex flex-col gap-2">
      {/* Settings Deck Slideup */}
      <AnimatePresence>
        {settingsOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full bg-[#050505]/95 border border-[var(--accent)] p-5 rounded-xl shadow-[0_0_30px_var(--accent-dim)] backdrop-blur-md grid grid-cols-1 md:grid-cols-4 gap-6 text-[var(--accent)]"
          >
            {/* Theme Selector */}
            <div className="flex flex-col gap-2 border-r border-[var(--accent-dim)] pr-4">
              <span className="text-xs uppercase font-bold tracking-widest text-[var(--accent)] opacity-60">Accent Theme</span>
              <div className="flex gap-3 mt-1">
                {[
                  { name: "green", color: "#00ff88", label: "Emerald" },
                  { name: "cyan", color: "#00f3ff", label: "Cyber" },
                  { name: "amber", color: "#ffb700", label: "Amber" },
                  { name: "violet", color: "#d600ff", label: "Violet" }
                ].map((t) => (
                  <button
                    key={t.name}
                    onClick={() => {
                      setTheme(t.name);
                      playSoundEffect("click");
                    }}
                    className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center`}
                    style={{ 
                      backgroundColor: t.color,
                      borderColor: theme === t.name ? "#ffffff" : "transparent",
                      boxShadow: theme === t.name ? `0 0 10px ${t.color}` : "none" 
                    }}
                    title={t.label}
                  />
                ))}
              </div>
            </div>
            {/* Graphic Overlays */}
            <div className="flex flex-col gap-2 border-r border-[var(--accent-dim)] pr-4 md:col-span-2">
              <span className="text-xs uppercase font-bold tracking-widest opacity-60">System Filters</span>
              <div className="flex flex-wrap gap-4 mt-2">
                <button
                  onClick={() => {
                    setCrtActive(!crtActive);
                    playSoundEffect("click");
                  }}
                  className={`cyber-btn text-xs py-1.5 flex items-center gap-1.5 rounded-md ${crtActive ? 'bg-[var(--accent)] text-black' : ''}`}
                >
                  <Tv size={14} />
                  CRT Scanlines: {crtActive ? "ON" : "OFF"}
                </button>
                <button
                  onClick={() => {
                    setMatrixMode(!matrixMode);
                    playSoundEffect("click");
                  }}
                  className={`cyber-btn text-xs py-1.5 flex items-center gap-1.5 rounded-md ${matrixMode ? 'bg-[var(--accent)] text-black' : ''}`}
                >
                  <Activity size={14} />
                  Matrix Code: {matrixMode ? "ON" : "OFF"}
                </button>
              </div>
            </div>
            {/* Power Controls */}
            <div className="flex flex-col gap-2">
              <span className="text-xs uppercase font-bold tracking-widest opacity-60">Hardware Config</span>
              <div className="flex gap-3 mt-1">
                <button
                  onClick={toggleSound}
                  className={`p-2 border border-[var(--accent)] rounded-lg hover:bg-[var(--accent)] hover:text-black transition-all`}
                  title={soundEnabled ? "Mute Audio" : "Unmute Audio"}
                >
                  {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
                </button>
                <button
                  onClick={handleRestart}
                  className="p-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all flex items-center gap-1.5 text-xs font-bold"
                  title="Reboot Terminal"
                >
                  <Power size={14} />
                  REBOOT
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Main floating dock */}
      <div className="w-full h-14 bg-[#050505]/85 border border-[var(--accent)] rounded-xl flex items-center justify-between px-5 shadow-[0_0_25px_var(--accent-dim)] backdrop-blur-md transition-all duration-300">
        
        {/* Left side: Glitch Logo & Settings Panel Toggle */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              setSettingsOpen(!settingsOpen);
              playSoundEffect("click");
            }}
            className="flex items-center gap-2 text-[var(--accent)] hover:text-white transition-colors cursor-pointer group"
          >
            <Settings size={18} className="group-hover:rotate-45 transition-transform" />
            <GlitchText text="M.KHIZER_OS" />
          </button>
        </div>
        {/* Center: App Icons Dock */}
        <div className="flex items-center gap-2">
          {appList.map((app) => {
            const Icon = app.icon;
            const isOpen = windows[app.name];
            return (
              <button
                key={app.name}
                onClick={() => handleAppClick(app.name)}
                className={`relative p-2.5 rounded-lg border text-[var(--accent)] transition-all duration-300 group cursor-pointer ${
                  isOpen 
                    ? "bg-[var(--accent-dim)] border-[var(--accent)] shadow-[0_0_12px_var(--accent-glow)]" 
                    : "bg-transparent border-transparent hover:bg-white/5 hover:border-[var(--accent-dim)]"
                }`}
                title={app.label}
              >
                <Icon size={20} className="group-hover:scale-110 transition-transform" />
                
                {/* Active dot */}
                {isOpen && (
                  <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-[var(--accent)] rounded-full animate-ping" />
                )}
              </button>
            );
          })}
        </div>
        {/* Right side: Audio, Diagnostics & Clock */}
        <div className="flex items-center gap-4 text-[var(--accent)] text-sm">
          <button
            onClick={() => {
              openMonitor();
            }}
            className="hidden md:flex items-center gap-2 border border-[var(--accent-dim)] px-3 py-1 rounded-md text-xs font-bold hover:bg-[var(--accent)] hover:text-black hover:border-[var(--accent)] transition-all cursor-pointer"
          >
            <Activity size={12} className="animate-pulse" />
            DIAGNOSTICS
          </button>
          <button
            onClick={toggleSound}
            className="hover:scale-105 transition-transform cursor-pointer"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          <div className="border-l border-[var(--accent-dim)] pl-4 text-xs font-bold select-none whitespace-nowrap">
            {time}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Taskbar;