// import { useEffect, useState } from "react";

// function ThreatMonitor() {

//   const [threatLevel, setThreatLevel] =
//     useState("LOW");

//   useEffect(() => {

//     const levels = [
//       "LOW",
//       "MEDIUM",
//       "HIGH",
//       "CRITICAL",
//     ];

//     const interval = setInterval(() => {

//       const random =
//         levels[
//           Math.floor(Math.random() * levels.length)
//         ];

//       setThreatLevel(random);

//     }, 5000);

//     return () => clearInterval(interval);

//   }, []);

//   return (
//     <div
//       className="
//         absolute top-5 left-32
//         bg-black/80
//         border border-green-500
//         px-6 py-3
//         text-green-400
//         z-50
//         shadow-[0_0_20px_#00ff88]
//       "
//     >

//       <div className="text-sm">
//         THREAT LEVEL:
//       </div>

//       <div className="text-2xl font-bold mt-1">
//         {threatLevel}
//       </div>

//     </div>
//   );
// }

// export default ThreatMonitor;