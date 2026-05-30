// import Taskbar from "../components/Taskbar";
// import DesktopIcon from "../components/DesktopIcon";

// function Desktop() {
//   return (
//     <div className="w-screen h-screen bg-black relative overflow-hidden">

//       {/* Background Grid */}
//       <div className="absolute inset-0 opacity-10">
//         <div className="w-full h-full bg-[linear-gradient(#00ff8822_1px,transparent_1px),linear-gradient(90deg,#00ff8822_1px,transparent_1px)] bg-[size:40px_40px]" />
//       </div>

//       {/* Desktop Icons */}
//       <div className="p-5 flex flex-col gap-6 z-10 relative">
//         <DesktopIcon title="Terminal" />
//         <DesktopIcon title="Projects" />
//         <DesktopIcon title="Skills" />
//         <DesktopIcon title="Contact" />
//       </div>

//       <Taskbar />
//     </div>
//   );
// }

// export default Desktop;



import { useState } from "react";

import Taskbar from "../components/Taskbar.jsx";
import DesktopIcon from "../components/DesktopIcon.jsx";
import Window from "../components/Window.jsx";

import Terminal from "../terminal/Terminal.jsx";

import AboutApp from "../apps/AboutApp.jsx";
import ProjectsApp from "../apps/ProjectsApp.jsx";
import SkillsApp from "../apps/SkillsApp.jsx";
import ContactApp from "../apps/ContactApp.jsx";

import MatrixRain from "../effects/MatrixRain.jsx";
import CRTEffect from "../effects/CRTEffects.jsx";

import RedAlert from "../effects/RedAlert";

import SystemStats from "../components/SystemStats";

import ActivityLog from "../components/ActivityLog";
import VisitorTracker from "../components/VisitorTracker";
import ThreatMonitor from "../components/ThreatMonitor";

import CyberScene from "../effects/CyberScene";
import CyberParticles from "../effects/CyberParticles";

import CyberHUD from "../components/CyberHUD";

import BrowserApp from "../apps/BrowserApp";

function Desktop() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [windows, setWindows] = useState({
    terminal: false,
    about: false,
    projects: false,
    skills: false,
    contact: false,
    browser: false,
  });
  const openWindow = (name) => {
    setWindows((prev) => ({
      ...prev,
      [name]: true,
    }));
  };

  const closeWindow = (name) => {
    setWindows((prev) => ({
      ...prev,
      [name]: false,
    }));
  };

  const [matrixMode, setMatrixMode] = useState(false);
  const [alertMode, setAlertMode] = useState(false);

//   



return (
    <div className="w-screen h-screen bg-black relative overflow-hidden">

      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[linear-gradient(#00ff8822_1px,transparent_1px),linear-gradient(90deg,#00ff8822_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      {matrixMode && <MatrixRain />}
      <CyberScene />
      <CyberParticles />
      <CRTEffect />
      {alertMode && <RedAlert />}
      
      <CyberHUD />
      {/* Desktop Icons */}
      <div className="p-5 flex flex-col gap-6 relative z-10">

        <DesktopIcon
          title="Terminal"
          onOpen={() => openWindow("terminal")}
        />

        <DesktopIcon
          title="About"
          onOpen={() => openWindow("about")}
        />

        <DesktopIcon
          title="Projects"
          onOpen={() => openWindow("projects")}
        />

        <DesktopIcon
          title="Skills"
          onOpen={() => openWindow("skills")}
        />

        <DesktopIcon
          title="Contact"
          onOpen={() => openWindow("contact")}
        />

        <DesktopIcon
          title="Browser"
          onOpen={() => openWindow("browser")}
        />

      </div>

      {/* TERMINAL */}
      {windows.terminal && (
        <Window
          title="Terminal"
          onClose={() => closeWindow("terminal")}
          defaultPosition={{ x: 250, y: 80 }}
        >
          <Terminal
            setMatrixMode={setMatrixMode}
            setAlertMode={setAlertMode}
            openBrowser={() =>openWindow("browser")}
          />
        </Window>
      )}

      {/* ABOUT */}
      {windows.about && (
        <Window
          title="About.exe"
          onClose={() => closeWindow("about")}
          defaultPosition={{ x: 200, y: 120 }}
        >
          <AboutApp />
        </Window>
      )}

      {/* PROJECTS */}
      {windows.projects && (
        <Window
          title="Projects.exe"
          onClose={() => closeWindow("projects")}
          defaultPosition={{ x: 300, y: 90 }}
        >
          <ProjectsApp />
        </Window>
      )}

      {/* SKILLS */}
      {windows.skills && (
        <Window
          title="Skills.exe"
          onClose={() => closeWindow("skills")}
          defaultPosition={{ x: 350, y: 110 }}
        >
          <SkillsApp />
        </Window>
      )}

      {/* CONTACT */}
      {windows.contact && (
        <Window
          title="Contact.exe"
          onClose={() => closeWindow("contact")}
          defaultPosition={{ x: 400, y: 130 }}
        >
        <ContactApp />
        </Window>
        
      )}

      {/* BROWSER */}
      {windows.browser && (
  <Window
    title="CyberBrowser.exe"
    onClose={() =>
      closeWindow("browser")
    }
    defaultPosition={{
      x: 220,
      y: 100,
    }}
  >
    <BrowserApp />
  </Window>
)}

      <SystemStats />
      <Taskbar />
      <ActivityLog />
      <VisitorTracker />
      <ThreatMonitor />
      
    </div>
  );
}

export default Desktop;