import { useEffect, useRef } from "react";
import { Shield, Fingerprint, Award, HardDrive } from "lucide-react";
function AboutApp() {
  const avatarCanvasRef = useRef(null);
  // Digital Avatar Animation
  useEffect(() => {
    const canvas = avatarCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    
    canvas.width = 130;
    canvas.height = 140;
    let animFrameId;
    let gridOffset = 0;
    const drawAvatar = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Get active accent color
      const activeColor = getComputedStyle(document.documentElement)
        .getPropertyValue("--accent")
        .trim() || "#00ff88";
      // Draw scanner background grid
      ctx.strokeStyle = `${activeColor}20`;
      ctx.lineWidth = 1;
      
      // Horizontal grid lines
      for (let y = 0; y < canvas.height; y += 12) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Vertical grid lines
      for (let x = 0; x < canvas.width; x += 12) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      // Draw stylized hacker head vector
      ctx.strokeStyle = activeColor;
      ctx.lineWidth = 2;
      ctx.shadowBlur = 6;
      ctx.shadowColor = activeColor;
      
      ctx.beginPath();
      // Hood outline
      ctx.moveTo(35, 120);
      ctx.quadraticCurveTo(35, 30, 65, 25);
      ctx.quadraticCurveTo(95, 30, 95, 120);
      ctx.stroke();
      // Inner face shadow
      ctx.fillStyle = "#000000";
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.moveTo(45, 110);
      ctx.quadraticCurveTo(45, 45, 65, 40);
      ctx.quadraticCurveTo(85, 45, 85, 110);
      ctx.closePath();
      ctx.fill();
      
      // Inner glowing face outline
      ctx.strokeStyle = `${activeColor}aa`;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(48, 110);
      ctx.quadraticCurveTo(48, 48, 65, 44);
      ctx.quadraticCurveTo(82, 48, 82, 110);
      ctx.stroke();
      // Cyber goggles / glasses
      ctx.strokeStyle = activeColor;
      ctx.fillStyle = `${activeColor}30`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = activeColor;
      ctx.beginPath();
      ctx.roundRect(50, 60, 13, 10, 2);
      ctx.roundRect(67, 60, 13, 10, 2);
      ctx.fill();
      ctx.stroke();
      // Bridge connection
      ctx.beginPath();
      ctx.moveTo(63, 65);
      ctx.lineTo(67, 65);
      ctx.stroke();
      // Draw green code binary stream overlays inside the head
      ctx.shadowBlur = 0;
      ctx.fillStyle = `${activeColor}60`;
      ctx.font = "8px monospace";
      for (let i = 0; i < 5; i++) {
        const streamX = 50 + i * 7;
        const streamY = 78 + Math.floor(Math.sin((gridOffset + i) * 0.1) * 10);
        ctx.fillText(Math.random() > 0.5 ? "1" : "0", streamX, streamY);
        ctx.fillText(Math.random() > 0.5 ? "0" : "1", streamX, streamY + 10);
      }
      // Moving laser scanline overlay
      gridOffset += 0.5;
      const scanY = (Math.sin(gridOffset * 0.05) * 0.5 + 0.5) * canvas.height;
      ctx.strokeStyle = activeColor;
      ctx.lineWidth = 1;
      ctx.shadowBlur = 5;
      ctx.shadowColor = activeColor;
      ctx.beginPath();
      ctx.moveTo(5, scanY);
      ctx.lineTo(canvas.width - 5, scanY);
      ctx.stroke();
      ctx.shadowBlur = 0;
      // Outer targeting frame Corners
      ctx.strokeStyle = activeColor;
      ctx.lineWidth = 1.5;
      
      // Top Left corner
      ctx.beginPath();
      ctx.moveTo(3, 15); ctx.lineTo(3, 3); ctx.lineTo(15, 3);
      ctx.stroke();
      // Top Right corner
      ctx.beginPath();
      ctx.moveTo(canvas.width - 3, 15); ctx.lineTo(canvas.width - 3, 3); ctx.lineTo(canvas.width - 15, 3);
      ctx.stroke();
      // Bottom Left corner
      ctx.beginPath();
      ctx.moveTo(3, canvas.height - 15); ctx.lineTo(3, canvas.height - 3); ctx.lineTo(15, canvas.height - 3);
      ctx.stroke();
      // Bottom Right corner
      ctx.beginPath();
      ctx.moveTo(canvas.width - 3, canvas.height - 15); ctx.lineTo(canvas.width - 3, canvas.height - 3); ctx.lineTo(canvas.width - 15, canvas.height - 3);
      ctx.stroke();
      animFrameId = requestAnimationFrame(drawAvatar);
    };
    drawAvatar();
    return () => cancelAnimationFrame(animFrameId);
  }, []);
  return (
    <div className="text-[var(--accent)] space-y-5 h-full flex flex-col md:flex-row gap-6 items-center md:items-stretch select-none">
      
      {/* Left side: Avatar Profile Container */}
      <div className="w-full md:w-[170px] border border-[var(--accent)]/30 bg-black/40 rounded-lg p-4 flex flex-col items-center justify-between text-center relative overflow-hidden">
        {/* Hologram indicator */}
        <div className="absolute top-2 left-2 flex items-center gap-1.5 text-[9px] text-[var(--accent)]/70 uppercase">
          <Fingerprint size={10} className="animate-pulse" />
          <span>BIOMETRIC</span>
        </div>
        {/* The Hologram Canvas */}
        <div className="my-3 flex items-center justify-center">
          <canvas 
            ref={avatarCanvasRef} 
            className="border border-[var(--accent)]/20 rounded bg-black/70 shadow-[0_0_15px_rgba(0,0,0,0.8)]"
          />
        </div>
        <div className="space-y-1">
          <div className="text-white text-xs font-bold font-sans tracking-wide">ID: MDKHIZER-98A</div>
          <div className="text-[10px] text-emerald-400 font-bold tracking-widest uppercase">SYS_SEC_LEVEL_4</div>
        </div>
      </div>
      {/* Right side: Biography & Dossier Metadata */}
      <div className="flex-1 flex flex-col justify-between border border-[var(--accent)]/20 bg-black/25 rounded-lg p-5">
        
        {/* Spec Rows */}
        <div className="space-y-4">
          <div className="flex justify-between items-baseline border-b border-[var(--accent-dim)] pb-2">
            <h1 className="text-xl font-bold tracking-wider text-white">IDENTITY PROFILE</h1>
            <span className="text-[10px] text-[var(--accent)]/70">CLASS: FULL STACK DECK</span>
          </div>
          <p className="text-sm leading-relaxed text-[var(--accent)]/90 text-justify">
            A software engineer specializing in developing secure, robust web applications and high-fidelity terminal interfaces. Fluent in constructing elegant automation pipelines and designing premium user environments.
          </p>
          {/* Key Parameters */}
          <div className="grid grid-cols-2 gap-3 text-xs uppercase tracking-wider pt-2">
            <div className="flex items-center gap-1.5">
              <Shield size={12} className="text-emerald-400" />
              <span className="text-[var(--accent)]/70">DECK IP:</span>
              <span className="text-white font-bold font-mono">192.168.9.45</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Award size={12} className="text-amber-400" />
              <span className="text-[var(--accent)]/70">STATUS:</span>
              <span className="text-white font-bold font-mono">DECRYPTED</span>
            </div>
            <div className="flex items-center gap-1.5 col-span-2">
              <HardDrive size={12} className="text-cyan-400" />
              <span className="text-[var(--accent)]/70">CORE SKILLSETS:</span>
              <span className="text-white font-bold font-sans text-[10px]">MERN / PYTHON / LINUX / SECURE SHELL</span>
            </div>
          </div>
        </div>
        {/* System parameters labels at bottom */}
        <div className="flex justify-between items-center text-[10px] text-[var(--accent)]/50 pt-4 mt-4 border-t border-[var(--accent-dim)]">
          <span>MD KHIZER - CREATIVE UI ENGINEER</span>
          <span>REVISED: 2026</span>
        </div>
      </div>
    </div>
  );
}
export default AboutApp;