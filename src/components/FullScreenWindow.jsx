import { X } from "lucide-react";

function FullScreenWindow({
  title,
  children,
  onClose,
}) {
  return (
    <div
      className="
        fixed
        inset-0
        z-[999]
        bg-black
        flex
        flex-col
      "
    >
      {/* Header */}
      <div
        className="
          h-14
          border-b
          border-green-500
          flex
          items-center
          justify-between
          px-5
        "
      >
        <h1 className="text-green-400 font-bold">
          {title}
        </h1>

        <button
          onClick={onClose}
          className="
            text-red-500
            hover:text-red-300
          "
        >
          <X />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
}

export default FullScreenWindow;