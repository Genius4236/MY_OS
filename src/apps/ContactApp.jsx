import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, GitBranch, ExternalLink, Send, ShieldAlert, CheckCircle } from "lucide-react";
import { playSoundEffect } from "../utils/audio";
function ContactApp() {
  const [formData, setFormData] = useState({ identity: "", payload: "" });
  const [stage, setStage] = useState("form"); // 'form' | 'sending' | 'success'
  const [logs, setLogs] = useState([]);
  const handleInputChange = (e, field) => {
    setFormData({ ...formData, [field]: e.target.value });
    playSoundEffect("typing");
  };
  const handleTransmit = (e) => {
    e.preventDefault();
    if (!formData.identity || !formData.payload) return;
    playSoundEffect("click");
    setStage("sending");
    setLogs([]);
    const transmissionSteps = [
      "STATUS: INITIALIZING RSA-4096 COMPLIANT HANDSHAKE...",
      "STATUS: NEGOTIATING SOCKET TUNNEL... CONNECTED",
      "STATUS: ENCRYPTING PAYLOAD BYTES WITH AES-256...",
      "STATUS: PACKING TCP IP PROTOCOL SEGMENTS [1/1]...",
      "STATUS: INJECTING PAYLOAD TO MAINFRAME QUEUE...",
      "STATUS: TRANSMISSION VERIFIED. DISCONNECTING SOCKET...",
      "SUCCESS: PAYLOAD DEPLOYED SUCCESSFULLY."
    ];
    transmissionSteps.forEach((step, idx) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, step]);
        playSoundEffect("typing");
        if (idx === transmissionSteps.length - 1) {
          setTimeout(() => {
            setStage("success");
            playSoundEffect("access_granted");
          }, 600);
        }
      }, idx * 600);
    });
  };
  const handleReset = () => {
    playSoundEffect("click");
    setFormData({ identity: "", payload: "" });
    setStage("form");
    setLogs([]);
  };
  return (
    <div className="text-[var(--accent)] space-y-4 h-full flex flex-col justify-between select-none">
      
      {/* Top Header */}
      <div className="flex justify-between items-baseline border-b border-[var(--accent-dim)] pb-2 mb-2">
        <h1 className="text-xl font-bold tracking-wider text-white">SECURE COMMUNICATOR</h1>
        <span className="text-[10px] text-[var(--accent)]/60 font-mono">PORT: 9005 // SSH</span>
      </div>
      {/* Main Content Pane */}
      <div className="flex-1 overflow-y-auto min-h-0 bg-black/35 border border-[var(--accent-dim)] rounded-lg p-4">
        
        {/* STAGE 1: FORM INPUT */}
        {stage === "form" && (
          <form onSubmit={handleTransmit} className="space-y-3.5 h-full flex flex-col justify-between">
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[var(--accent)]/70 mb-1.5 font-bold">
                  SENDER IDENTITY (EMAIL / CALLSIGN)
                </label>
                <input
                  required
                  type="text"
                  placeholder="EX: COMMANDER@NODE.SEC"
                  value={formData.identity}
                  onChange={(e) => handleInputChange(e, "identity")}
                  className="w-full bg-black/60 border border-[var(--accent)]/30 p-2.5 rounded outline-none text-[var(--accent)] focus:border-[var(--accent)] text-xs font-mono"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase tracking-widest text-[var(--accent)]/70 mb-1.5 font-bold">
                  MESSAGE PAYLOAD (BODY DATA)
                </label>
                <textarea
                  required
                  rows="4"
                  placeholder="INPUT CIPHERTEXT STREAM HERE..."
                  value={formData.payload}
                  onChange={(e) => handleInputChange(e, "payload")}
                  className="w-full bg-black/60 border border-[var(--accent)]/30 p-2.5 rounded outline-none text-[var(--accent)] focus:border-[var(--accent)] text-xs font-mono resize-none"
                />
              </div>
            </div>
            <button
              type="submit"
              className="cyber-btn text-xs w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border text-white font-bold"
            >
              <Send size={13} />
              TRANSMIT ENCRYPTED PAYLOAD
            </button>
          </form>
        )}
        {/* STAGE 2: TRANSMITTING LOGS */}
        {stage === "sending" && (
          <div className="h-full flex flex-col justify-start font-mono text-xs space-y-2">
            <div className="text-[var(--accent)]/50 border-b border-[var(--accent-dim)] pb-1 mb-2 uppercase tracking-wider text-[9px] flex items-center gap-1.5">
              <ShieldAlert size={12} className="animate-pulse" />
              <span>Transmitting Packet Frames</span>
            </div>
            {logs.map((log, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className={log.startsWith("SUCCESS") ? "text-emerald-400 font-bold" : "text-[var(--accent)]/80"}
              >
                {`> ${log}`}
              </motion.div>
            ))}
            <motion.span
              animate={{ opacity: [0, 1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="text-[var(--accent)]"
            >
              _
            </motion.span>
          </div>
        )}
        {/* STAGE 3: SUCCESS STATE */}
        {stage === "success" && (
          <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-emerald-400 bg-emerald-500/10 p-3 rounded-full border border-emerald-500/30"
            >
              <CheckCircle size={40} className="shadow-[0_0_15px_rgba(16,185,129,0.3)]" />
            </motion.div>
            <div className="space-y-1">
              <h2 className="text-white font-bold text-sm tracking-widest uppercase">Payload Transmitted</h2>
              <p className="text-[11px] text-[var(--accent)]/70 max-w-xs leading-relaxed">
                Your encrypted datastream has successfully bypasses firewalls and is queued in MD KHIZER's inbox node.
              </p>
            </div>
            <button
              onClick={handleReset}
              className="cyber-btn text-[10px] py-1.5 px-4 rounded border font-bold"
            >
              TRANSMIT NEW BLOCK
            </button>
          </div>
        )}
      </div>
      {/* External channels */}
      <div className="grid grid-cols-3 gap-2.5 pt-1 text-[10px] uppercase font-bold tracking-widest">
        <a
          href="mdkhizer15@gmail.com"
          onClick={() => playSoundEffect("click")}
          className="flex items-center justify-center gap-1.5 border border-[var(--accent)]/20 p-2 rounded hover:border-[var(--accent)] hover:bg-[var(--accent-dim)] transition-all text-center text-[var(--accent)]/80 hover:text-white"
        >
          <Mail size={12} />
          EMAIL
        </a>
        <a
          href="https://github.com/Genius4236"
          target="_blank"
          rel="noreferrer"
          onClick={() => playSoundEffect("click")}
          className="flex items-center justify-center gap-1.5 border border-[var(--accent)]/20 p-2 rounded hover:border-[var(--accent)] hover:bg-[var(--accent-dim)] transition-all text-center text-[var(--accent)]/80 hover:text-white"
        >
          <GitBranch size={12} />
          GITHUB
        </a>
        <a
          href="https://www.linkedin.com/in/md-khizer-0b31a5314"
          target="_blank"
          rel="noreferrer"
          onClick={() => playSoundEffect("click")}
          className="flex items-center justify-center gap-1.5 border border-[var(--accent)]/20 p-2 rounded hover:border-[var(--accent)] hover:bg-[var(--accent-dim)] transition-all text-center text-[var(--accent)]/80 hover:text-white"
        >
          <ExternalLink size={12} />
          LINKEDIN
        </a>
      </div>
    </div>
  );
}
export default ContactApp;