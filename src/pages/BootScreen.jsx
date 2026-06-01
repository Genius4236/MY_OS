import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { playSoundEffect } from "../utils/audio.js";
const bootMessages = [
  "STAGE 1: Loading Kernel Core...",
  "STAGE 2: Connecting Secure Shell Socket...",
  "STAGE 3: Initializing Encrypted File System...",
  "STAGE 4: Decrypting Identity Dossiers...",
  "STAGE 5: Mounting Peripheral Hardware...",
  "STAGE 6: Bypassing Network Firewall...",
  "STAGE 7: Accessing Mainframe Interface...",
  "SUCCESS: Connection Established. Welcome MD KHIZER.",
];
function BootScreen() {
  const [visibleMessages, setVisibleMessages] = useState([]);
  const [progress, setProgress] = useState(0);
  const [memCount, setMemCount] = useState(0);
  // Play boot sound on mount
  useEffect(() => {
    playSoundEffect("boot");
  }, []);
  // Print text lines
  useEffect(() => {
    bootMessages.forEach((msg, index) => {
      const delay = index * 750;
      setTimeout(() => {
        setVisibleMessages((prev) => [...prev, msg]);
        playSoundEffect("typing");
      }, delay);
    });
  }, []);
  // Memory counter animation
  useEffect(() => {
    const totalMem = 16384; // 16GB RAM check
    const interval = setInterval(() => {
      setMemCount((prev) => {
        if (prev >= totalMem) {
          clearInterval(interval);
          return totalMem;
        }
        return prev + Math.floor(Math.random() * 500) + 200;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);
  // Progress Bar loading animation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 60); // 6 seconds to load 100%
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-screen h-screen bg-black text-[#00ff88] p-8 flex flex-col justify-between font-mono relative overflow-hidden">
      
      {/* Background cyber grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(#00ff88_1px,transparent_1px),linear-gradient(90deg,#00ff88_1px,transparent_1px)] bg-[size:20px_20px]" />
      </div>
      {/* Hologram Scanner lines */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,255,136,0.06)_50%)] bg-[length:100%_4px] opacity-30 animate-pulse pointer-events-none" />
      {/* Top Header bar */}
      <div className="flex justify-between items-center border-b border-[#00ff88]/30 pb-3 z-10 text-xs">
        <div>SYS_REVISION: SECURE_CORE_v1.0.8</div>
        <div>DAT_PORT: 443_SSL_ESTABLISHED</div>
        <div>HOST: MDKHIZER_DEC</div>
      </div>
      {/* Center Section: Pulsing Mainframe Logo and Logs */}
      <div className="flex-1 my-8 grid grid-cols-1 md:grid-cols-2 gap-8 items-center z-10">
        
        {/* Holographic Logo */}
        <div className="flex flex-col items-center justify-center">
          <motion.div
            animate={{ 
              scale: [0.98, 1.02, 0.98], 
              opacity: [0.7, 1.0, 0.7],
              rotateY: [0, 180, 360]
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="w-48 h-48 border-2 border-[#00ff88]/40 rounded-full flex items-center justify-center relative shadow-[0_0_35px_rgba(0,255,136,0.2)]"
          >
            {/* Hexagon vector */}
            <svg viewBox="0 0 100 100" className="w-36 h-36 fill-none stroke-[#00ff88] stroke-2 opacity-80">
              <polygon points="50,5 95,25 95,75 50,95 5,75 5,25" className="stroke-[#00ff88] stroke-[1.5]" />
              <polygon points="50,15 80,30 80,70 50,85 20,70 20,30" className="stroke-[#00ff88]/50 stroke-[1] stroke-dasharray-[3,3]" />
              <circle cx="50" cy="50" r="10" className="fill-[#00ff88] animate-pulse" />
              <line x1="50" y1="5" x2="50" y2="95" className="stroke-[#00ff88]/30" />
              <line x1="5" y1="50" x2="95" y2="50" className="stroke-[#00ff88]/30" />
            </svg>
            
            {/* Orbiting ring */}
            <div className="absolute inset-2 border border-dashed border-[#00ff88]/30 rounded-full animate-[spin_20s_linear_infinite]" />
          </motion.div>
          
          <div className="mt-4 text-xs font-bold text-center tracking-widest text-[#00ff88]/60 uppercase">
            Holographic System Decryptor
          </div>
        </div>
        {/* Console Printouts */}
        <div className="bg-[#050505] border border-[#00ff88]/30 p-5 rounded-lg h-64 overflow-y-auto font-mono flex flex-col justify-start text-xs shadow-inner">
          <div className="text-[#00ff88]/50 mb-3 border-b border-[#00ff88]/20 pb-1 flex justify-between">
            <span>CONSOLE LOGOUT</span>
            <span>MEM_ADDR: OK</span>
          </div>
          <div className="text-yellow-400 mb-2">
            {`> INITIALIZING DIAGNOSTIC CHECKS...`}
          </div>
          <div className="text-[#00ff88]/70 mb-2">
            {`> SECURE_RAM: `}
            <span className="text-white font-bold">{memCount} KB</span>
            {memCount >= 16384 ? " [SUCCESS]" : " [LOADING...]"}
          </div>
          {visibleMessages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className={`mb-2 font-mono ${
                msg.startsWith("SUCCESS") ? "text-[#00ff88] font-bold" : "text-[#00ff88]/80"
              }`}
            >
              {`> ${msg}`}
            </motion.div>
          ))}
          {/* Pulsing blinking cursor */}
          {visibleMessages.length < bootMessages.length && (
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="text-[#00ff88] text-sm"
            >
              _
            </motion.div>
          )}
        </div>
      </div>
      {/* Bottom Progress Bar area */}
      <div className="z-10 flex flex-col gap-2">
        <div className="flex justify-between items-center text-xs text-[#00ff88]/80">
          <span className="font-bold tracking-widest">LOADING VIRTUAL OPERATING INTERFACE</span>
          <span className="font-bold">{progress}%</span>
        </div>
        
        {/* Loading track */}
        <div className="w-full h-4 bg-[#0a1f10] border border-[#00ff88]/40 rounded-full p-[2px] shadow-[0_0_10px_rgba(0,255,136,0.1)]">
          <motion.div
            style={{ width: `${progress}%` }}
            className="h-full bg-gradient-to-r from-[#00ff88] to-[#00f3ff] rounded-full shadow-[0_0_8px_#00ff88]"
            layoutId="progressBar"
          />
        </div>
        
        <div className="text-[10px] text-center text-[#00ff88]/40 uppercase mt-1">
          Hacker Operating System (C) MD KHIZER 2026. All rights reserved.
        </div>
      </div>
    </div>
  );
}
export default BootScreen;