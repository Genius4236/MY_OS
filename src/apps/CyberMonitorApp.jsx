import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, ShieldAlert, Users, Radio, Globe2, Layers, AlertOctagon } from "lucide-react";
import { playSoundEffect } from "../utils/audio";
const countries = ["USA", "Germany", "Japan", "Russia", "China", "Brazil", "India", "UK", "France", "Canada"];
function generateIP() {
  return `${Math.floor(Math.random() * 200) + 30}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
}
// Simulated Threat Vectors for radar map
const mapAttackVectors = [
  { fromX: 80, fromY: 60, toX: 190, toY: 110, country: "USA" },
  { fromX: 310, fromY: 50, toX: 190, toY: 110, country: "Russia" },
  { fromX: 340, fromY: 95, toX: 190, toY: 110, country: "China" },
  { fromX: 230, fromY: 160, toX: 190, toY: 110, country: "Brazil" },
  { fromX: 120, fromY: 55, toX: 190, toY: 110, country: "Canada" },
];
function CyberMonitorApp() {
  const [activeTab, setActiveTab] = useState("map"); // 'map' | 'visitors' | 'logs'
  const [threats, setThreats] = useState([]);
  const [visitorList, setVisitorList] = useState([]);
  const [logSeverity, setLogSeverity] = useState("all"); // 'all' | 'info' | 'warn' | 'alert'
  const [logs, setLogs] = useState([]);
  // Generate Visitor list updates
  useEffect(() => {
    // Initial batch
    setVisitorList([
      { ip: generateIP(), country: "USA", port: "443", threatLevel: "Low" },
      { ip: generateIP(), country: "Russia", port: "22", threatLevel: "High" },
      { ip: generateIP(), country: "Japan", port: "80", threatLevel: "Low" },
    ]);
    const interval = setInterval(() => {
      const country = countries[Math.floor(Math.random() * countries.length)];
      const threatLevel = Math.random() > 0.8 ? "High" : Math.random() > 0.4 ? "Medium" : "Low";
      const newVisitor = {
        ip: generateIP(),
        country,
        port: ["22", "80", "443", "8080"][Math.floor(Math.random() * 4)],
        threatLevel,
      };
      setVisitorList((prev) => [newVisitor, ...prev.slice(0, 14)]);
      
      // Also add threat line trigger if high/medium
      if (threatLevel !== "Low") {
        const fromX = Math.floor(Math.random() * 320) + 20;
        const fromY = Math.floor(Math.random() * 150) + 10;
        const vector = { fromX, fromY, toX: 190, toY: 110, country };
        setThreats((prev) => [...prev, vector]);
        playSoundEffect("alert");
        // Clear vector after animation finishes
        setTimeout(() => {
          setThreats((prev) => prev.slice(1));
        }, 1200);
      }
    }, 3500);
    return () => clearInterval(interval);
  }, []);
  // Generate logs
  useEffect(() => {
    const defaultLogs = [
      { text: "Firewall core initialized", sev: "info", time: new Date().toLocaleTimeString() },
      { text: "SSH login request on node: 22", sev: "warn", time: new Date().toLocaleTimeString() },
      { text: "Decryption block loaded: PROJECTS", sev: "info", time: new Date().toLocaleTimeString() },
    ];
    setLogs(defaultLogs);
    const logMessages = [
      { text: "Packet filter blocked incoming port scan", sev: "warn" },
      { text: "Intrusion detected at node interface: L3", sev: "alert" },
      { text: "RSA key handshake successful with satellite proxy", sev: "info" },
      { text: "Anonymous secure tunnel established", sev: "info" },
      { text: "Alert status toggled // core status online", sev: "warn" },
      { text: "SQL injection payload discarded by firewall", sev: "alert" },
    ];
    const interval = setInterval(() => {
      const rawLog = logMessages[Math.floor(Math.random() * logMessages.length)];
      const newLog = {
        text: rawLog.text,
        sev: rawLog.sev,
        time: new Date().toLocaleTimeString(),
      };
      setLogs((prev) => [newLog, ...prev.slice(0, 20)]);
    }, 2800);
    return () => clearInterval(interval);
  }, []);
  const handleTabClick = (tab) => {
    playSoundEffect("click");
    setActiveTab(tab);
  };
  const filteredLogs = logs.filter((l) => {
    if (logSeverity === "all") return true;
    return l.sev === logSeverity;
  });
  return (
    <div className="h-full flex flex-col text-[var(--accent)] font-mono select-none">
      
      {/* Navigation Tabs */}
      <div className="flex border-b border-[var(--accent)]/30 mb-4 text-xs font-bold uppercase tracking-wider bg-black/40 rounded-t-lg">
        <button
          onClick={() => handleTabClick("map")}
          className={`flex-1 py-2.5 flex items-center justify-center gap-2 border-r border-[var(--accent)]/15 transition-all cursor-pointer ${
            activeTab === "map" ? "bg-[var(--accent)] text-black font-bold shadow-[inset_0_0_10px_rgba(255,255,255,0.4)]" : "hover:bg-white/5"
          }`}
        >
          <Globe2 size={13} />
          Threat Radar Map
        </button>
        <button
          onClick={() => handleTabClick("visitors")}
          className={`flex-1 py-2.5 flex items-center justify-center gap-2 border-r border-[var(--accent)]/15 transition-all cursor-pointer ${
            activeTab === "visitors" ? "bg-[var(--accent)] text-black font-bold shadow-[inset_0_0_10px_rgba(255,255,255,0.4)]" : "hover:bg-white/5"
          }`}
        >
          <Users size={13} />
          Visitor Triangulator
        </button>
        <button
          onClick={() => handleTabClick("logs")}
          className={`flex-1 py-2.5 flex items-center justify-center gap-2 transition-all cursor-pointer ${
            activeTab === "logs" ? "bg-[var(--accent)] text-black font-bold shadow-[inset_0_0_10px_rgba(255,255,255,0.4)]" : "hover:bg-white/5"
          }`}
        >
          <Layers size={13} />
          Security Audit Logs
        </button>
      </div>
      {/* Main tab content workspace */}
      <div className="flex-1 min-h-0 bg-black/45 border border-[var(--accent-dim)] rounded-b-lg p-4 relative overflow-hidden">
        
        {/* TAB 1: THREAT RADAR MAP */}
        {activeTab === "map" && (
          <div className="h-full flex flex-col justify-between">
            <div className="flex justify-between items-center text-[10px] text-white/50 border-b border-[var(--accent-dim)] pb-1 mb-2">
              <span>SATELLITE ORBIT RADAR INT-9</span>
              <span className="text-red-500 font-bold flex items-center gap-1">
                <Radio size={11} className="animate-pulse" /> LIVE TRACKING ACTIVE
              </span>
            </div>
            {/* SVG Visual World Outline and attack vectors */}
            <div className="flex-1 bg-black/90 border border-[var(--accent)]/20 rounded relative flex items-center justify-center overflow-hidden shadow-inner">
              <svg viewBox="0 0 380 200" className="w-full h-full stroke-[var(--accent)]/30 fill-none">
                {/* World grid outlines (Mock global coordinates) */}
                <circle cx="190" cy="110" r="15" className="stroke-[var(--accent)]/20 stroke-dasharray-[3,3]" />
                <circle cx="190" cy="110" r="45" className="stroke-[var(--accent)]/20 stroke-dasharray-[3,3]" />
                <circle cx="190" cy="110" r="85" className="stroke-[var(--accent)]/15 stroke-dasharray-[4,4]" />
                <circle cx="190" cy="110" r="135" className="stroke-[var(--accent)]/10 stroke-dasharray-[5,5]" />
                
                {/* Target node crosshair (MD KHIZER's Server core) */}
                <circle cx="190" cy="110" r="4" className="fill-emerald-400 stroke-emerald-400 stroke-4 animate-pulse" />
                <line x1="190" y1="85" x2="190" y2="135" className="stroke-emerald-400/30" />
                <line x1="165" y1="110" x2="215" y2="110" className="stroke-emerald-400/30" />
                {/* Animated attack lines */}
                {threats.map((t, idx) => (
                  <g key={idx}>
                    {/* Pulsing origin circle */}
                    <circle cx={t.fromX} cy={t.fromY} r="3" className="fill-red-500 stroke-red-500 stroke-4 animate-ping" />
                    
                    {/* Vector line to core */}
                    <motion.path
                      d={`M ${t.fromX} ${t.fromY} Q ${(t.fromX + t.toX)/2} ${(t.fromY + t.toY)/2 - 30} ${t.toX} ${t.toY}`}
                      className="stroke-red-500 stroke-1.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                  </g>
                ))}
              </svg>
              
              {/* Overlay Triangulated Details */}
              <div className="absolute bottom-2 left-2 text-[8px] text-[var(--accent)]/60 font-mono flex flex-col gap-0.5">
                <span>BEAM ID: 0x98FFDA</span>
                <span>TARGET COR: 37.77 N / 122.41 W</span>
              </div>
            </div>
          </div>
        )}
        {/* TAB 2: VISITOR LIST */}
        {activeTab === "visitors" && (
          <div className="h-full flex flex-col">
            <div className="text-[10px] text-white/50 border-b border-[var(--accent-dim)] pb-1 mb-3 flex justify-between uppercase">
              <span>Subnet Visitor Nodes</span>
              <span>Triangulated: {visitorList.length} Nodes</span>
            </div>
            <div className="flex-grow overflow-y-auto space-y-2 pr-1">
              <table className="w-full text-[10px] text-left text-[var(--accent)] border-collapse">
                <thead>
                  <tr className="border-b border-[var(--accent-dim)] text-white font-bold">
                    <th className="pb-1.5 w-1/3">IP ADDRESS</th>
                    <th className="pb-1.5 w-1/4">LOCATION</th>
                    <th className="pb-1.5 w-1/6 text-center">PORT</th>
                    <th className="pb-1.5 w-1/4 text-right">THREAT LEVEL</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--accent-dim)]/20">
                  {visitorList.map((v, idx) => (
                    <tr key={idx} className="hover:bg-white/5">
                      <td className="py-2 text-white font-mono">{v.ip}</td>
                      <td className="py-2">{v.country}</td>
                      <td className="py-2 text-center text-cyan-400 font-bold">{v.port}</td>
                      <td className={`py-2 text-right font-bold ${
                        v.threatLevel === "High" ? "text-red-500" : v.threatLevel === "Medium" ? "text-amber-500" : "text-emerald-400"
                      }`}>
                        {v.threatLevel}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* TAB 3: AUDIT LOGS */}
        {activeTab === "logs" && (
          <div className="h-full flex flex-col gap-3">
            {/* Filter buttons */}
            <div className="flex items-center gap-2 bg-black/60 p-2 border border-[var(--accent-dim)] rounded text-[9px] uppercase tracking-wider font-bold">
              <span className="text-white/50">FILTER SEVERITY:</span>
              <div className="flex gap-2">
                {["all", "info", "warn", "alert"].map((sev) => (
                  <button
                    key={sev}
                    onClick={() => {
                      playSoundEffect("click");
                      setLogSeverity(sev);
                    }}
                    className={`px-2 py-0.5 border rounded cursor-pointer ${
                      logSeverity === sev 
                        ? "bg-[var(--accent)] border-[var(--accent)] text-black font-bold" 
                        : "border-[var(--accent)]/30 hover:border-[var(--accent)]"
                    }`}
                  >
                    {sev}
                  </button>
                ))}
              </div>
            </div>
            {/* Scrollable logs */}
            <div className="flex-1 overflow-y-auto space-y-2 pr-1 font-mono text-[10px] bg-black/80 p-3 border border-[var(--accent-dim)]/50 rounded shadow-inner">
              {filteredLogs.length === 0 ? (
                <div className="text-center py-10 text-[var(--accent)]/40 font-bold">
                  NO LOGS RECORDED FOR FILTER: {logSeverity.toUpperCase()}
                </div>
              ) : (
                filteredLogs.map((l, idx) => (
                  <div key={idx} className="flex gap-2.5 items-start">
                    <span className="text-neutral-500 font-bold whitespace-nowrap">{l.time}</span>
                    <span className={`font-bold px-1.5 py-0.2 rounded border ${
                      l.sev === "alert" 
                        ? "border-red-500/50 text-red-500 bg-red-500/5" 
                        : l.sev === "warn" 
                          ? "border-amber-500/50 text-amber-500 bg-amber-500/5" 
                          : "border-cyan-500/50 text-cyan-400 bg-cyan-500/5"
                    }`}>
                      {l.sev}
                    </span>
                    <span className="text-white">{l.text}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default CyberMonitorApp;