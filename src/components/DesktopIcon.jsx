// import { Monitor } from "lucide-react";

// function DesktopIcon({ title }) {
//   return (
//     <div className="flex flex-col items-center cursor-pointer w-20">
//       <Monitor
//         size={40}
//         className="text-green-400"
//       />

//       <span className="text-green-300 mt-2 text-sm">
//         {title}
//       </span>
//     </div>
//   );
// }

// export default DesktopIcon;

import { Monitor } from "lucide-react";

function DesktopIcon({ title, onOpen }) {
  return (
    <div
      onDoubleClick={onOpen}
      className="flex flex-col items-center cursor-pointer w-20"
    >
      <Monitor
        size={40}
        className="text-green-400"
      />

      <span className="text-green-300 mt-2 text-sm text-center">
        {title}
      </span>
    </div>
  );
}

export default DesktopIcon;