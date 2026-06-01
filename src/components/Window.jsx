import { Rnd } from "react-rnd";
import { X, Square, Minus } from "lucide-react";
import { motion } from "framer-motion";
import { playSoundEffect } from "../utils/audio";
function Window({
  title,
  name,
  children,
  onClose,
  onFocus,
  focused,
  zIndex,
  defaultPosition = { x: 100, y: 100 },
  defaultSize = { width: 500, height: 400 },
}) {
  return (
    <Rnd
      default={{
        x: defaultPosition.x,
        y: defaultPosition.y,
        width: defaultSize.width,
        height: defaultSize.height,
      }}
      minWidth={350}
      minHeight={200}
      bounds="parent"
      style={{ zIndex }}
      onDragStart={onFocus}
      onResizeStart={onFocus}
      enableUserSelectHack={false}
      dragHandleClassName="window-drag-handle"
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        onMouseDown={onFocus}
        className={`w-full h-full flex flex-col rounded-lg border overflow-hidden relative ${
          focused 
            ? "border-[var(--accent)] shadow-[0_0_25px_var(--accent-glow)]" 
            : "border-[var(--accent)]/30 shadow-[0_0_10px_rgba(0,0,0,0.5)] opacity-85 hover:opacity-95"
        } transition-all duration-300`}
        style={{
          backgroundColor: "var(--accent-bg)",
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Subtle grid backdrop for window content */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.15)_50%)] bg-[length:100%_4px] pointer-events-none z-0" />
        {/* Window Top Header */}
        <div className="h-10 bg-black/80 border-b border-[var(--accent)]/30 flex items-center justify-between px-4 cursor-move window-drag-handle relative z-10 select-none">
          <div className="flex items-center gap-2 pointer-events-none">
            {/* Status dot */}
            <span className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              focused 
                ? "bg-[var(--accent)] shadow-[0_0_10px_var(--accent)] animate-pulse" 
                : "bg-neutral-700"
            }`} />
            <span className={`text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
              focused ? "text-[var(--accent)] text-shadow" : "text-[var(--accent)]/55"
            }`}>
              {title}
            </span>
          </div>
          {/* Window Control Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                playSoundEffect("click");
              }}
              className="w-5 h-5 rounded-md border border-[var(--accent)]/20 hover:bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]/60 hover:text-[var(--accent)] transition-all cursor-pointer"
              title="Minimize (Simulation)"
            >
              <Minus size={11} />
            </button>
            <button
              onClick={() => {
                playSoundEffect("click");
              }}
              className="w-5 h-5 rounded-md border border-[var(--accent)]/20 hover:bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)]/60 hover:text-[var(--accent)] transition-all cursor-pointer"
              title="Maximize (Simulation)"
            >
              <Square size={10} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="w-5 h-5 rounded-md border border-red-500/30 hover:bg-red-500 flex items-center justify-center text-red-500 hover:text-black transition-all cursor-pointer"
              title="Kill Process"
            >
              <X size={12} />
            </button>
          </div>
        </div>
        {/* Window App Content Panel */}
        <div className="flex-1 overflow-auto p-4 relative z-10 text-[var(--accent)] font-mono">
          {children}
        </div>
      </motion.div>
    </Rnd>
  );
}
export default Window;