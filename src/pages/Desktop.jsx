import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Taskbar from "../components/Taskbar.jsx";
import DesktopIcon from "../components/DesktopIcon.jsx";
import Window from "../components/Window.jsx";
import Terminal from "../terminal/Terminal.jsx";
import AboutApp from "../apps/AboutApp.jsx";
import ProjectsApp from "../apps/ProjectsApp.jsx";
import SkillsApp from "../apps/SkillsApp.jsx";
import ContactApp from "../apps/ContactApp.jsx";
import BrowserApp from "../apps/BrowserApp.jsx";
import CyberMonitorApp from "../apps/CyberMonitorApp.jsx";
import MatrixRain from "../effects/MatrixRain.jsx";
import CRTEffect from "../effects/CRTEffects.jsx";
import RedAlert from "../effects/RedAlert.jsx";
import SystemStats from "../components/SystemStats.jsx";
import CyberScene from "../effects/CyberScene.jsx";
import CyberParticles from "../effects/CyberParticles.jsx";
import CyberHUD from "../components/CyberHUD.jsx";
import { playSoundEffect, setAudioEnabled } from "../utils/audio.js";
function Desktop() {
  // Window states
  const [windows, setWindows] = useState({
    terminal: false,
    about: false,
    projects: false,
    skills: false,
    contact: false,
    browser: false,
    monitor: false,
  });
  // Focus stack order (last item is focused)
  const [focusOrder, setFocusOrder] = useState([]);
  // System options
  const [theme, setTheme] = useState("green");
  const [crtActive, setCrtActive] = useState(true);
  const [matrixMode, setMatrixMode] = useState(false);
  const [alertMode, setAlertMode] = useState(false);
  const [soundEnabled, setSoundEnabledState] = useState(true);
  // Apply theme attribute
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);
  // Window handlers
  const openWindow = (name) => {
    setWindows((prev) => ({ ...prev, [name]: true }));
    setFocusOrder((prev) => [...prev.filter((w) => w !== name), name]);
    playSoundEffect("click");
  };
  const closeWindow = (name) => {
    setWindows((prev) => ({ ...prev, [name]: false }));
    setFocusOrder((prev) => prev.filter((w) => w !== name));
    playSoundEffect("click");
  };
  const focusWindow = (name) => {
    if (focusOrder[focusOrder.length - 1] !== name) {
      setFocusOrder((prev) => [...prev.filter((w) => w !== name), name]);
      playSoundEffect("click");
    }
  };
  const toggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabledState(next);
    setAudioEnabled(next);
    if (next) {
      // Play brief test sound
      playSoundEffect("click");
    }
  };
  return (
    <div className="w-screen h-screen bg-black relative overflow-hidden select-none">
      {/* 3D Wireframe Canvas */}
      <CyberScene />
      {/* Floating Canvas Particles */}
      <CyberParticles />
      {/* Matrix Rain backdrop if active */}
      {matrixMode && <MatrixRain />}
      {/* Red alert overlay if active */}
      {alertMode && <RedAlert />}
      {/* CRT Scanline Filter overlay */}
      {crtActive && <CRTEffect />}
      {/* Futuristic Cyber Header HUD */}
      <CyberHUD />
      {/* Desktop Grid Layout Icons */}
      <div className="absolute top-20 left-6 flex flex-col gap-6 z-10">
        <DesktopIcon
          title="Terminal.exe"
          iconType="terminal"
          onOpen={() => openWindow("terminal")}
        />
        <DesktopIcon
          title="About.exe"
          iconType="about"
          onOpen={() => openWindow("about")}
        />
        <DesktopIcon
          title="Projects.exe"
          iconType="projects"
          onOpen={() => openWindow("projects")}
        />
        <DesktopIcon
          title="Skills.exe"
          iconType="skills"
          onOpen={() => openWindow("skills")}
        />
        <DesktopIcon
          title="Contact.exe"
          iconType="contact"
          onOpen={() => openWindow("contact")}
        />
        <DesktopIcon
          title="CyberBrowser.exe"
          iconType="browser"
          onOpen={() => openWindow("browser")}
        />
        <DesktopIcon
          title="Diagnostics.exe"
          iconType="monitor"
          onOpen={() => openWindow("monitor")}
        />
      </div>
      {/* Floating Diagnostics HUD Widget */}
      <SystemStats />
      {/* Windows Layer */}
      <AnimatePresence>
        {/* TERMINAL */}
        {windows.terminal && (
          <Window
            title="SYSTEM_TERMINAL // Bash Emulator"
            name="terminal"
            onClose={() => closeWindow("terminal")}
            onFocus={() => focusWindow("terminal")}
            focused={focusOrder[focusOrder.length - 1] === "terminal"}
            zIndex={50 + focusOrder.indexOf("terminal")}
            defaultPosition={{ x: 280, y: 110 }}
            defaultSize={{ width: 680, height: 420 }}
          >
            <Terminal
              setMatrixMode={setMatrixMode}
              setAlertMode={setAlertMode}
              openBrowser={() => openWindow("browser")}
            />
          </Window>
        )}
        {/* ABOUT */}
        {windows.about && (
          <Window
            title="IDENTITY_DOSSIER // Profile Card"
            name="about"
            onClose={() => closeWindow("about")}
            onFocus={() => focusWindow("about")}
            focused={focusOrder[focusOrder.length - 1] === "about"}
            zIndex={50 + focusOrder.indexOf("about")}
            defaultPosition={{ x: 340, y: 140 }}
            defaultSize={{ width: 500, height: 450 }}
          >
            <AboutApp />
          </Window>
        )}
        {/* PROJECTS */}
        {windows.projects && (
          <Window
            title="PROJECTS_INDEX // Decrypted Archives"
            name="projects"
            onClose={() => closeWindow("projects")}
            onFocus={() => focusWindow("projects")}
            focused={focusOrder[focusOrder.length - 1] === "projects"}
            zIndex={50 + focusOrder.indexOf("projects")}
            defaultPosition={{ x: 390, y: 160 }}
            defaultSize={{ width: 550, height: 480 }}
          >
            <ProjectsApp />
          </Window>
        )}
        {/* SKILLS */}
        {windows.skills && (
          <Window
            title="DIAGNOSTIC_SKILLS // LED Matrix Loadout"
            name="skills"
            onClose={() => closeWindow("skills")}
            onFocus={() => focusWindow("skills")}
            focused={focusOrder[focusOrder.length - 1] === "skills"}
            zIndex={50 + focusOrder.indexOf("skills")}
            defaultPosition={{ x: 440, y: 180 }}
            defaultSize={{ width: 500, height: 440 }}
          >
            <SkillsApp />
          </Window>
        )}
        {/* CONTACT */}
        {windows.contact && (
          <Window
            title="SECURE_COMMUNICATOR // RSA-4096 Form"
            name="contact"
            onClose={() => closeWindow("contact")}
            onFocus={() => focusWindow("contact")}
            focused={focusOrder[focusOrder.length - 1] === "contact"}
            zIndex={50 + focusOrder.indexOf("contact")}
            defaultPosition={{ x: 490, y: 200 }}
            defaultSize={{ width: 480, height: 430 }}
          >
            <ContactApp />
          </Window>
        )}
        {/* BROWSER */}
        {windows.browser && (
          <Window
            title="CYBER_NET_NAVIGATOR // Deep Web View"
            name="browser"
            onClose={() => closeWindow("browser")}
            onFocus={() => focusWindow("browser")}
            focused={focusOrder[focusOrder.length - 1] === "browser"}
            zIndex={50 + focusOrder.indexOf("browser")}
            defaultPosition={{ x: 310, y: 120 }}
            defaultSize={{ width: 700, height: 460 }}
          >
            <BrowserApp />
          </Window>
        )}
        {/* MONITOR */}
        {windows.monitor && (
          <Window
            title="CYBER_SECURITY_CENTER // Command Deck"
            name="monitor"
            onClose={() => closeWindow("monitor")}
            onFocus={() => focusWindow("monitor")}
            focused={focusOrder[focusOrder.length - 1] === "monitor"}
            zIndex={50 + focusOrder.indexOf("monitor")}
            defaultPosition={{ x: 360, y: 100 }}
            defaultSize={{ width: 800, height: 500 }}
          >
            <CyberMonitorApp />
          </Window>
        )}
      </AnimatePresence>
      {/* Cyber Taskbar Control Deck */}
      <Taskbar
        windows={windows}
        openWindow={openWindow}
        closeWindow={closeWindow}
        focusWindow={focusWindow}
        crtActive={crtActive}
        setCrtActive={setCrtActive}
        matrixMode={matrixMode}
        setMatrixMode={setMatrixMode}
        soundEnabled={soundEnabled}
        toggleSound={toggleSound}
        theme={theme}
        setTheme={setTheme}
        openMonitor={() => openWindow("monitor")}
      />
    </div>
  );
}
export default Desktop;