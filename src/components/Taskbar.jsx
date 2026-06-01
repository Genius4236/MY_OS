import { useEffect, useState } from "react";
import GlitchText from "../effects/GlitchText";
import {Activity,} from "lucide-react";

function Taskbar({openMonitor,}) {
  // “Time to live” for the displayed timestamp: update every second.
  const [time, setTime] = useState(() => new Date().toLocaleTimeString());

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(id);
  }, []);

  <Taskbar
  openMonitor={() =>
    openWindow("monitor")
  }
/>

  return (
    <div className="absolute bottom-0 w-full h-12 bg-[#050505] border-t border-green-500 flex items-center justify-between px-4">
      <GlitchText text="HACKER OS" />
      <div className="flex gap-4">
        <button
        onClick={openMonitor}
        className="flex items-center gap-2 text-green-400 hover:text-white"
        >
          <Activity size={18} />
          Monitor
          </button>
        </div>
      <div className="text-green-400">{time}</div>
    </div>
  );
}

export default Taskbar;