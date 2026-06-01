import { useEffect, useState } from "react";
import { Cpu, Layout, Server, Terminal } from "lucide-react";
const skillsCategories = [
  {
    category: "Frontend Cores",
    icon: Layout,
    items: [
      { name: "React / Vite", val: 95 },
      { name: "CSS3 / Tailwind", val: 90 },
      { name: "Framer Motion / GSAP", val: 85 },
      { name: "ThreeJS / WebGL", val: 75 },
    ]
  },
  {
    category: "Backend Shells",
    icon: Server,
    items: [
      { name: "NodeJS / Express", val: 90 },
      { name: "MongoDB / PostgreSQL", val: 85 },
      { name: "Python / Flask / FastAPI", val: 80 },
      { name: "REST / WebSockets", val: 90 },
    ]
  },
  {
    category: "System Deck",
    icon: Terminal,
    items: [
      { name: "Linux Administration", val: 92 },
      { name: "Bash Shell Scripting", val: 88 },
      { name: "Git / Docker Containers", val: 82 },
      { name: "Network Security Audit", val: 78 },
    ]
  }
];
function LedProgressBar({ value }) {
  const [litBlocks, setLitBlocks] = useState(0);
  const totalBlocks = 12;
  useEffect(() => {
    const targetBlocks = Math.round((value / 100) * totalBlocks);
    let current = 0;
    const interval = setInterval(() => {
      if (current >= targetBlocks) {
        clearInterval(interval);
        return;
      }
      current++;
      setLitBlocks(current);
    }, 45);
    return () => clearInterval(interval);
  }, [value]);
  return (
    <div className="flex gap-1 items-center bg-black/40 border border-[var(--accent-dim)] p-1 rounded h-7">
      {Array.from({ length: totalBlocks }).map((_, idx) => {
        const isLit = idx < litBlocks;
        return (
          <div
            key={idx}
            className={`flex-1 h-full rounded-sm transition-all duration-300 ${
              isLit 
                ? "bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]" 
                : "bg-neutral-800/80"
            }`}
          />
        );
      })}
      <span className="text-[10px] text-white font-bold ml-2 font-mono w-7 text-right">
        {value}%
      </span>
    </div>
  );
}
function SkillsApp() {
  return (
    <div className="text-[var(--accent)] flex flex-col gap-4 h-full select-none">
      <div className="flex justify-between items-baseline border-b border-[var(--accent-dim)] pb-2">
        <h1 className="text-xl font-bold tracking-wider text-white">SKILLS INVENTORY</h1>
        <span className="text-[10px] text-[var(--accent)]/60 font-mono">DIAGNOSTICS: NOMINAL</span>
      </div>
      <div className="flex-1 overflow-y-auto space-y-5 pr-1">
        {skillsCategories.map((cat, catIdx) => {
          const Icon = cat.icon;
          return (
            <div key={catIdx} className="space-y-3">
              {/* Category Header */}
              <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest border-b border-[var(--accent-dim)]/50 pb-1 text-white">
                <Icon size={14} className="text-[var(--accent)]" />
                <span>{cat.category}</span>
              </div>
              {/* Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                {cat.items.map((skill, itemIdx) => (
                  <div key={itemIdx} className="flex flex-col gap-1">
                    <span className="text-[11px] text-[var(--accent)] font-bold">{skill.name}</span>
                    <LedProgressBar value={skill.val} />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default SkillsApp;