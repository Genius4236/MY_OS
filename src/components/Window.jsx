import { Rnd } from "react-rnd";
import { X } from "lucide-react";

function Window({
  title,
  children,
  onClose,
  defaultPosition = { x: 100, y: 100 },
}) {
  return (
    <Rnd
      default={{
        x: defaultPosition.x,
        y: defaultPosition.y,
        width: 700,
        height: 450,
      }}
      minWidth={400}
      minHeight={250}
      bounds="window"
      className="z-50"
    >
      <div className="w-full h-full bg-[#050505] border border-green-500 flex flex-col shadow-[0_0_20px_#00ff88]">

        {/* Header */}
        <div className="h-10 bg-black border-b border-green-500 flex items-center justify-between px-3 cursor-move">

          <span className="text-green-400 font-bold">
            {title}
          </span>

          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-300"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-auto p-3">
          {children}
        </div>

      </div>
    </Rnd>
  );
}

export default Window;