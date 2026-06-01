import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Folder, FolderOpen, ChevronDown, ChevronUp, Link as LinkIcon, HardDrive } from "lucide-react";
import { playSoundEffect } from "../utils/audio";
const projectsData = [
  {
    title: "Rahat Clinic Portal",
    shortDesc: "Full-Stack Healthcare Administration Platform",
    desc: "A comprehensive medical scheduling and patient recording database portal. Built with secure cookies session management, encrypted medical records, real-time doctor schedules, and digital prescription issuance dashboards.",
    tech: ["React", "NodeJS", "Express", "MongoDB", "TailwindCSS"],
    size: "4.8 MB",
    link: "github.com/khizer/rahat-clinic",
    status: "SECURE_DEPLOYED"
  },
  {
    title: "Anti-Cheat Secure Exam",
    shortDesc: "Anti-Cheating Online Examination Platform",
    desc: "A secure assessment portal designed to prevent browser tab switches, copy-paste shortcuts, and screen recordings during examinations. Tracks network status anomalies and records logs for proctor reviews.",
    tech: ["React", "Express", "TailwindCSS", "Socket.io", "MongoDB"],
    size: "3.2 MB",
    link: "github.com/khizer/secure-exam",
    status: "LOG_ACTIVE"
  },
  {
    title: "AI Cyber Defense Assistant",
    shortDesc: "Threat Signature Analysis Assistant",
    desc: "A natural language interface connected to a localized threat scanning database. Helps automate network diagnostics log reviews, searches for known vulnerabilities, and proposes prompt remediation actions.",
    tech: ["Python", "Flask", "React", "Gemini API", "HuggingFace"],
    size: "12.4 MB",
    link: "github.com/khizer/cyber-ai",
    status: "CORE_LOADED"
  },
  {
    title: "Medical CryptVault",
    shortDesc: "Encrypted Cloud Record Repository",
    desc: "A client-side encrypted storage application where medical charts and radiological images are encrypted using AES-256 before uploading to cloud nodes, ensuring full patient confidentiality compliance.",
    tech: ["React", "Web Crypto API", "AWS S3", "TailwindCSS"],
    size: "2.1 MB",
    link: "github.com/khizer/crypt-vault",
    status: "ENCRYPTED"
  },
];
// Project Card with character scrambling title
function ProjectCard({ project, isOpen, toggleOpen }) {
  const [title, setTitle] = useState(project.title);
  const scrambleTitle = () => {
    playSoundEffect("typing");
    let iterations = 0;
    const chars = "アァカサタナハマヤャラワ0123456789#%&?$!@";
    const interval = setInterval(() => {
      setTitle(
        project.title
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iterations) {
              return project.title[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      iterations += 0.5;
      if (iterations >= project.title.length) {
        clearInterval(interval);
        setTitle(project.title);
      }
    }, 20);
  };
  return (
    <div 
      className={`border rounded-lg bg-black/40 transition-all duration-300 ${
        isOpen ? "border-[var(--accent)] shadow-[0_0_15px_var(--accent-dim)]" : "border-[var(--accent)]/20 hover:border-[var(--accent)]/60"
      }`}
    >
      {/* Header bar */}
      <div
        onClick={() => {
          playSoundEffect("click");
          toggleOpen();
        }}
        onMouseEnter={scrambleTitle}
        className="p-4 flex items-center justify-between cursor-pointer select-none"
      >
        <div className="flex items-center gap-3">
          <div className="text-[var(--accent)]">
            {isOpen ? <FolderOpen size={20} className="animate-pulse" /> : <Folder size={20} />}
          </div>
          <div>
            <h2 className="text-[14px] font-bold text-white font-mono">
              {title}
            </h2>
            <div className="text-[10px] text-[var(--accent)]/60 uppercase mt-0.5">
              {project.shortDesc}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`hidden md:inline text-[9px] px-2 py-0.5 border rounded-full font-bold ${
            project.status === "ENCRYPTED" ? "border-amber-500/50 text-amber-500 bg-amber-500/5" : "border-emerald-500/50 text-emerald-400 bg-emerald-500/5"
          }`}>
            {project.status}
          </span>
          <div className="text-[var(--accent)]/65">
            {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </div>
        </div>
      </div>
      {/* Expandable Body */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden border-t border-[var(--accent-dim)] bg-black/20"
          >
            <div className="p-4 space-y-4 text-xs font-mono">
              <p className="leading-relaxed text-[var(--accent)]/90 text-justify">
                {project.desc}
              </p>
              {/* Technologies Badges */}
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-[10px] text-[var(--accent)]/55 uppercase font-bold mr-1">TECH LOADED:</span>
                {project.tech.map((t, idx) => (
                  <span 
                    key={idx}
                    className="text-[9px] px-2.5 py-1 bg-[var(--accent-dim)] border border-[var(--accent)]/30 rounded-md text-white font-bold"
                  >
                    {t}
                  </span>
                ))}
              </div>
              {/* Grid Metadata Footer */}
              <div className="flex justify-between items-center border-t border-[var(--accent-dim)] pt-3 text-[10px] text-[var(--accent)]/60">
                <div className="flex items-center gap-1.5">
                  <HardDrive size={12} />
                  <span>PAYLOAD SIZE: {project.size}</span>
                </div>
                <a 
                  href={`https://${project.link}`}
                  target="_blank" 
                  rel="noreferrer"
                  onClick={(e) => {
                    e.stopPropagation();
                    playSoundEffect("click");
                  }}
                  className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer font-bold border border-[var(--accent)]/30 px-2 py-0.5 rounded hover:border-[var(--accent)] hover:bg-[var(--accent-dim)]"
                >
                  <LinkIcon size={10} />
                  ACCESS COMPONENT
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
function ProjectsApp() {
  const [openCardIdx, setOpenCardIdx] = useState(0);
  const handleToggle = (idx) => {
    setOpenCardIdx(openCardIdx === idx ? -1 : idx);
  };
  return (
    <div className="text-[var(--accent)] flex flex-col gap-4 h-full select-none">
      <div className="flex justify-between items-baseline border-b border-[var(--accent-dim)] pb-2">
        <h1 className="text-xl font-bold tracking-wider text-white">DECRYPTED PROJECTS</h1>
        <span className="text-[10px] text-[var(--accent)]/60 font-mono">COUNT: {projectsData.length} UNITS</span>
      </div>
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {projectsData.map((project, idx) => (
          <ProjectCard
            key={idx}
            project={project}
            isOpen={openCardIdx === idx}
            toggleOpen={() => handleToggle(idx)}
          />
        ))}
      </div>
    </div>
  );
}
export default ProjectsApp;