import GlitchText from "../effects/GlitchText";


function Taskbar() {
  const time = new Date().toLocaleTimeString();

  return (
    <div className="absolute bottom-0 w-full h-12 bg-[#050505] border-t border-green-500 flex items-center justify-between px-4">

      <GlitchText text="HACKER OS" />

      <div className="text-green-400">
        {time}
      </div>

    </div>
  );
}

export default Taskbar;