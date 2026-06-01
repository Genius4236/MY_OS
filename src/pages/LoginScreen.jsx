import { useState } from "react";
import { motion } from "framer-motion";
import LoginGlitch from "../effects/LoginGlitch.jsx";
import { playSoundEffect } from "../utils/audio.js";
import { ShieldAlert, Fingerprint, Lock, User } from "lucide-react";
function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shakeTrigger, setShakeTrigger] = useState(0);
  const handleLogin = () => {
    if (username === "mdkhizer" && password === "1234") {
      setLoading(true);
      playSoundEffect("access_granted");
      setError("");
      setTimeout(() => {
        onLogin();
      }, 2000);
    } else {
      playSoundEffect("access_denied");
      setError("ACCESS RESTRICTED // CRITICAL L2 BREACH DETECTED");
      setShakeTrigger((prev) => prev + 1);
    }
  };
  const handleInputChange = (e, setter) => {
    setter(e.target.value);
    playSoundEffect("typing");
  };
  // Screen shake animation values
  const shakeAnimation = {
    shake: {
      x: [0, -10, 10, -10, 10, -5, 5, 0],
      transition: { duration: 0.4 }
    }
  };
  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center relative overflow-hidden select-none font-mono">
      {/* Background Holographic Scanlines */}
      <LoginGlitch />
      {/* Cyber Grid backdrop */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
        <div className="w-full h-full bg-[linear-gradient(#00ff88_1px,transparent_1px),linear-gradient(90deg,#00ff88_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>
      {/* Central login structure */}
      <motion.div
        variants={shakeAnimation}
        animate={shakeTrigger ? "shake" : ""}
        key={shakeTrigger}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-[420px] bg-black/80 border border-[#00ff88] p-8 rounded-xl shadow-[0_0_40px_rgba(0,255,136,0.3)] backdrop-blur-md"
      >
        {/* Neon corner decorative lines */}
        <div className="absolute -top-[1px] -left-[1px] w-5 h-5 border-t-2 border-l-2 border-[#00f3ff]" />
        <div className="absolute -top-[1px] -right-[1px] w-5 h-5 border-t-2 border-r-2 border-[#00f3ff]" />
        <div className="absolute -bottom-[1px] -left-[1px] w-5 h-5 border-b-2 border-l-2 border-[#00f3ff]" />
        <div className="absolute -bottom-[1px] -right-[1px] w-5 h-5 border-b-2 border-r-2 border-[#00f3ff]" />
        <h1 className="text-2xl font-bold mb-6 text-center tracking-widest text-[#00ff88] flex items-center justify-center gap-2">
          <ShieldAlert size={24} className="animate-pulse" />
          MAINFRAME LOCKOUT
        </h1>
        {/* Biometrics Scan simulation visual */}
        <div className="w-full flex flex-col items-center justify-center py-4 mb-6 border border-[#00ff88]/20 bg-black/50 rounded-lg relative overflow-hidden group">
          
          {/* Hologram biometric finger */}
          <div className="relative p-3 border border-[#00ff88]/40 rounded-full bg-[#00ff88]/5 flex items-center justify-center text-[#00ff88]">
            <Fingerprint size={48} className="animate-pulse text-[#00ff88]" />
            
            {/* Hologram sweep bar */}
            <motion.div
              animate={{ y: [-24, 24, -24] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-0 right-0 h-[2px] bg-[#00f3ff] shadow-[0_0_8px_#00f3ff] z-10 pointer-events-none"
            />
          </div>
          <div className="mt-3 text-[10px] text-[#00ff88]/60 tracking-widest uppercase">
            {loading ? "Decrypting Core Signature..." : "Biometric Scan System Active"}
          </div>
        </div>
        {/* USERNAME */}
        <div className="mb-5 relative">
          <label className="block text-xs uppercase tracking-widest mb-2 text-[#00ff88]/80 flex items-center gap-1.5">
            <User size={12} />
            User Identity
          </label>
          <input
            value={username}
            onChange={(e) => handleInputChange(e, setUsername)}
            disabled={loading}
            placeholder="ENTER NODE ID"
            className="w-full bg-black/60 border border-[#00ff88]/40 p-3 pl-4 rounded-lg outline-none text-[#00ff88] placeholder-[#00ff88]/30 font-bold focus:border-[#00ff88] focus:shadow-[0_0_10px_rgba(0,255,136,0.15)] transition-all"
          />
        </div>
        {/* PASSWORD */}
        <div className="mb-6 relative">
          <label className="block text-xs uppercase tracking-widest mb-2 text-[#00ff88]/80 flex items-center gap-1.5">
            <Lock size={12} />
            Secure Passphrase
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => handleInputChange(e, setPassword)}
            disabled={loading}
            placeholder="ENTER DECRYPT PHRASE"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !loading) {
                handleLogin();
              }
            }}
            className="w-full bg-black/60 border border-[#00ff88]/40 p-3 pl-4 rounded-lg outline-none text-[#00ff88] placeholder-[#00ff88]/30 font-bold focus:border-[#00ff88] focus:shadow-[0_0_10px_rgba(0,255,136,0.15)] transition-all"
          />
        </div>
        {/* ERROR MESSAGE PANEL */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-red-500 text-xs font-bold text-center border border-red-500/30 bg-red-500/10 p-2.5 rounded-md mb-4 flex items-center justify-center gap-2"
          >
            <span>🚨</span>
            {error}
          </motion.div>
        )}
        {/* STATUS LOADING */}
        {loading && (
          <div className="mb-4 text-center text-[#00f3ff] font-bold text-xs animate-pulse tracking-widest uppercase border border-[#00f3ff]/30 bg-[#00f3ff]/10 py-2 rounded-md">
            🔓 ACCESS GRANTED // OVERRIDING KERNEL...
          </div>
        )}
        {/* ACCESS BUTTON */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-[#00ff88] text-black py-3 rounded-lg font-bold tracking-widest uppercase hover:bg-[#00f3ff] shadow-[0_0_15px_rgba(0,255,136,0.4)] hover:shadow-[0_0_18px_rgba(0,243,255,0.4)] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
        >
          {loading ? "ESTABLISHING SHELL..." : "BOOT DECK COMMANDER"}
        </button>
        {/* HINT LEGEND */}
        <div className="mt-5 text-[10px] text-[#00ff88]/40 text-center border-t border-[#00ff88]/10 pt-4">
          HINT CARD: <span className="text-white font-bold">mdkhizer</span> / PASSPHRASE: <span className="text-white font-bold">1234</span>
        </div>
      </motion.div>
    </div>
  );
}
export default LoginScreen;