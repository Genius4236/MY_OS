import { useState } from "react";
import { ArrowLeft, ArrowRight, ShieldCheck, Lock, Bookmark, Globe } from "lucide-react";
import { playSoundEffect } from "../utils/audio";
const pages = {
  home: {
    title: "MAINFRAME HOME // CYBERNET INTRA",
    body: (
      <div className="space-y-4">
        <h2 className="text-sm font-bold border-b border-[var(--accent-dim)] pb-1.5 text-white">SYSTEM NODE INDEX</h2>
        <p className="text-xs leading-relaxed text-[var(--accent)]/80 text-justify">
          Welcome to the Secure Local Intracity Network for MDKHIZER Node. This dashboard bridges localized subnet applications, core profiles, secure contact decks, and diagnostic centers.
        </p>
        <div className="grid grid-cols-2 gap-3 text-[10px] uppercase font-bold tracking-wider pt-2">
          <div className="border border-[var(--accent-dim)] bg-black/40 p-2.5 rounded hover:border-[var(--accent)] transition-all">
            <span className="block text-white mb-0.5">/projects</span>
            <span className="text-[var(--accent)]/55">Decrypted Archives</span>
          </div>
          <div className="border border-[var(--accent-dim)] bg-black/40 p-2.5 rounded hover:border-[var(--accent)] transition-all">
            <span className="block text-white mb-0.5">/about</span>
            <span className="text-[var(--accent)]/55">Identity Dossier</span>
          </div>
          <div className="border border-[var(--accent-dim)] bg-black/40 p-2.5 rounded hover:border-[var(--accent)] transition-all">
            <span className="block text-white mb-0.5">/security</span>
            <span className="text-[var(--accent)]/55">Diagnostics center</span>
          </div>
          <div className="border border-[var(--accent-dim)] bg-black/40 p-2.5 rounded hover:border-[var(--accent)] transition-all">
            <span className="block text-white mb-0.5">/contact</span>
            <span className="text-[var(--accent)]/55">RSA Comms deck</span>
          </div>
        </div>
      </div>
    ),
  },
  projects: {
    title: "PROJECT DATABASE // INTRA_DOCS",
    body: (
      <div className="space-y-3">
        <h2 className="text-sm font-bold border-b border-[var(--accent-dim)] pb-1.5 text-white">DECRYPTED REPOSITORY DIRECTORY</h2>
        <ul className="space-y-2 text-xs">
          <li className="flex justify-between items-center border-b border-[var(--accent-dim)]/30 pb-1.5">
            <div>
              <span className="font-bold text-white block">RAHAT CLINIC PORTAL</span>
              <span className="text-[10px] text-[var(--accent)]/60">Full-Stack Healthcare platform</span>
            </div>
            <span className="text-[9px] px-2 py-0.5 border border-emerald-500/30 text-emerald-400 rounded-full font-bold">SECURE</span>
          </li>
          <li className="flex justify-between items-center border-b border-[var(--accent-dim)]/30 pb-1.5">
            <div>
              <span className="font-bold text-white block">ANTI-CHEAT EXAM LAB</span>
              <span className="text-[10px] text-[var(--accent)]/60">Anti-Cheating Online Examination portal</span>
            </div>
            <span className="text-[9px] px-2 py-0.5 border border-emerald-500/30 text-emerald-400 rounded-full font-bold">SECURE</span>
          </li>
          <li className="flex justify-between items-center border-b border-[var(--accent-dim)]/30 pb-1.5">
            <div>
              <span className="font-bold text-white block">CYBER AI THREAT SYSTEM</span>
              <span className="text-[10px] text-[var(--accent)]/60">AI Security Signature assistant</span>
            </div>
            <span className="text-[9px] px-2 py-0.5 border border-cyan-500/30 text-cyan-400 rounded-full font-bold">ACTIVE</span>
          </li>
        </ul>
      </div>
    ),
  },
  about: {
    title: "DOSSIER ARCHIVE // IDENTITY_SYS",
    body: (
      <div className="space-y-3">
        <h2 className="text-sm font-bold border-b border-[var(--accent-dim)] pb-1.5 text-white">IDENTITY DETAILS</h2>
        <div className="space-y-2 text-xs text-[var(--accent)]/85">
          <div className="flex justify-between border-b border-[var(--accent-dim)]/30 pb-1">
            <span className="text-[var(--accent)]/60">CALLSIGN:</span>
            <span className="text-white font-bold">MD KHIZER</span>
          </div>
          <div className="flex justify-between border-b border-[var(--accent-dim)]/30 pb-1">
            <span className="text-[var(--accent)]/60">CORE SPEC:</span>
            <span className="text-white font-bold">FULL STACK DEVELOPER // MERN</span>
          </div>
          <div className="flex justify-between border-b border-[var(--accent-dim)]/30 pb-1">
            <span className="text-[var(--accent)]/60">CLEARANCE:</span>
            <span className="text-emerald-400 font-bold">LEVEL 4 CLEARANCE</span>
          </div>
          <p className="text-[11px] leading-relaxed text-[var(--accent)]/70 text-justify pt-1">
            Devoted to building fluid interactive front-ends, secured databases, and automating tasks across multiple virtual servers.
          </p>
        </div>
      </div>
    ),
  },
  security: {
    title: "SECURITY REPORT // MAINFRAME_AUDIT",
    body: (
      <div className="space-y-3">
        <h2 className="text-sm font-bold border-b border-[var(--accent-dim)] pb-1.5 text-white">SYSTEM SHELL HEALTH</h2>
        <div className="grid grid-cols-2 gap-2 text-xs font-mono">
          <div className="border border-[var(--accent-dim)] p-2 rounded">
            <span className="block text-[10px] text-[var(--accent)]/55">FIREWALL</span>
            <span className="font-bold text-emerald-400">ONLINE [NOMINAL]</span>
          </div>
          <div className="border border-[var(--accent-dim)] p-2 rounded">
            <span className="block text-[10px] text-[var(--accent)]/55">RSA DECRYPTOR</span>
            <span className="font-bold text-emerald-400">ENABLED</span>
          </div>
          <div className="border border-[var(--accent-dim)] p-2 rounded">
            <span className="block text-[10px] text-[var(--accent)]/55">PROXY ROUTE</span>
            <span className="font-bold text-cyan-400">127.0.0.1:9050 [TOR]</span>
          </div>
          <div className="border border-[var(--accent-dim)] p-2 rounded">
            <span className="block text-[10px] text-[var(--accent)]/55">INTRUSION INDEX</span>
            <span className="font-bold text-green-400">0.00%</span>
          </div>
        </div>
      </div>
    ),
  },
  contact: {
    title: "COMMUNICATION CHANNELS // RSA_DECK",
    body: (
      <div className="space-y-3">
        <h2 className="text-sm font-bold border-b border-[var(--accent-dim)] pb-1.5 text-white">CONTACT CHANNELS</h2>
        <div className="space-y-3 text-xs">
          <div className="border border-[var(--accent-dim)] p-3 rounded bg-black/40">
            <span className="text-[10px] text-[var(--accent)]/60 uppercase block">Secure Email Node</span>
            <a href="mailto:khizer@example.com" className="text-white hover:text-[var(--accent)] transition-colors font-bold underline">khizer@example.com</a>
          </div>
          <div className="border border-[var(--accent-dim)] p-3 rounded bg-black/40">
            <span className="text-[10px] text-[var(--accent)]/60 uppercase block">GitHub Secure Codebase</span>
            <a href="#" className="text-white hover:text-[var(--accent)] transition-colors font-bold underline">github.com/khizer</a>
          </div>
        </div>
      </div>
    ),
  },
};
function BrowserApp() {
  const [route, setRoute] = useState("home");
  const [history, setHistory] = useState(["home"]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const navigate = (path) => {
    playSoundEffect("click");
    const clean = path.replace("/", "").replace("cyber://", "").trim().toLowerCase();
    
    if (pages[clean]) {
      const newHistory = history.slice(0, historyIndex + 1);
      setHistory([...newHistory, clean]);
      setHistoryIndex(newHistory.length);
      setRoute(clean);
    } else {
      setRoute("404");
    }
  };
  const handleBack = () => {
    if (historyIndex > 0) {
      playSoundEffect("click");
      const nextIdx = historyIndex - 1;
      setHistoryIndex(nextIdx);
      setRoute(history[nextIdx]);
    }
  };
  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      playSoundEffect("click");
      const nextIdx = historyIndex + 1;
      setHistoryIndex(nextIdx);
      setRoute(history[nextIdx]);
    }
  };
  const currentPage = pages[route] || {
    title: "404 PAGE NOT FOUND",
    body: (
      <div className="text-center py-8 space-y-3">
        <div className="text-red-500 font-bold text-lg">⚠️ ERROR CODE: 404</div>
        <p className="text-xs text-[var(--accent)]/70">
          The requested cyber route `cyber://{route}` could not be resolved by host node.
        </p>
        <button
          onClick={() => navigate("home")}
          className="cyber-btn text-[10px] rounded"
        >
          GO BACK HOME
        </button>
      </div>
    ),
  };
  return (
    <div className="w-full h-full flex flex-col bg-[#050505]/30 text-[var(--accent)] select-none">
      
      {/* Address Bar Navigation Row */}
      <div className="h-12 border-b border-[var(--accent)]/30 flex items-center justify-between gap-3 px-3 relative z-10 bg-black/60">
        {/* Buttons */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={handleBack}
            disabled={historyIndex === 0}
            className="p-1 rounded hover:bg-[var(--accent)]/10 text-[var(--accent)] disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
          >
            <ArrowLeft size={16} />
          </button>
          <button
            onClick={handleForward}
            disabled={historyIndex === history.length - 1}
            className="p-1 rounded hover:bg-[var(--accent)]/10 text-[var(--accent)] disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
          >
            <ArrowRight size={16} />
          </button>
        </div>
        {/* Address text box */}
        <div className="flex-1 flex items-center bg-black/80 border border-[var(--accent)]/30 rounded px-3 py-1 gap-2">
          <Lock size={12} className="text-emerald-400 animate-pulse" />
          <span className="text-[10px] text-emerald-400 font-bold tracking-widest uppercase">SSL</span>
          <div className="w-[1px] h-3 bg-[var(--accent-dim)]" />
          <input
            value={`cyber://${route}`}
            onChange={(e) => {
              const val = e.target.value.replace("cyber://", "");
              setRoute(val);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                navigate(route);
              }
            }}
            className="bg-transparent outline-none flex-1 text-white text-xs font-mono font-bold"
          />
        </div>
        <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-[10px] border border-emerald-500/20 bg-emerald-500/5 px-2.5 py-1 rounded">
          <ShieldCheck size={12} />
          <span className="hidden sm:inline">SECURE INTRA</span>
        </div>
      </div>
      {/* Intranet Main Split Deck */}
      <div className="flex-grow flex min-h-0 relative z-10">
        
        {/* Intranet Bookmarks Sidebar */}
        <div className="w-48 border-r border-[var(--accent)]/20 bg-black/40 p-3 hidden md:flex flex-col gap-3 font-mono text-[10px] uppercase font-bold tracking-wider">
          <div className="flex items-center gap-1.5 text-white/50 text-[9px] border-b border-[var(--accent-dim)] pb-1.5 mb-1">
            <Bookmark size={11} />
            <span>Node Shortcuts</span>
          </div>
          {[
            { label: "Mainframe Home", path: "home" },
            { label: "Project Database", path: "projects" },
            { label: "Dossier Files", path: "about" },
            { label: "Security Report", path: "security" },
            { label: "Secure Comms", path: "contact" }
          ].map((item, idx) => (
            <button
              key={idx}
              onClick={() => navigate(item.path)}
              className={`text-left p-2 rounded border transition-all flex items-center gap-2 cursor-pointer ${
                route === item.path 
                  ? "bg-[var(--accent)]/15 border-[var(--accent)] text-white shadow-[0_0_8px_var(--accent-dim)]" 
                  : "bg-transparent border-transparent hover:bg-white/5 hover:border-[var(--accent-dim)]"
              }`}
            >
              <Globe size={11} />
              {item.label}
            </button>
          ))}
        </div>
        {/* Intranet Web View Page Area */}
        <div className="flex-1 overflow-y-auto p-5 bg-[#050505]/45">
          <div className="border border-[var(--accent)]/30 rounded-lg p-5 bg-black/30 shadow-inner min-h-full">
            <div className="text-[10px] font-bold text-[var(--accent)]/55 border-b border-[var(--accent-dim)]/50 pb-1.5 mb-4 uppercase tracking-widest">
              {currentPage.title}
            </div>
            
            {/* The page HTML block */}
            {currentPage.body}
          </div>
        </div>
      </div>
    </div>
  );
}
export default BrowserApp;