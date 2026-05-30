import { useEffect, useState } from "react";

const fakeLogs = [
  "Incoming connection from 192.168.1.45",
  "Firewall updated successfully",
  "Threat signature detected",
  "Encrypted tunnel established",
  "Suspicious packet blocked",
  "Port scan initiated",
  "Remote node connected",
  "AI defense system active",
  "Unauthorized login attempt blocked",
  "Secure shell session started",
];

function ActivityLog() {

  const [logs, setLogs] = useState([]);

  useEffect(() => {

    const interval = setInterval(() => {

      const randomLog =
        fakeLogs[
          Math.floor(Math.random() * fakeLogs.length)
        ];

      const timestamp =
        new Date().toLocaleTimeString();

      setLogs((prev) => [
        `[${timestamp}] ${randomLog}`,
        ...prev.slice(0, 8),
      ]);

    }, 2500);

    return () => clearInterval(interval);

  }, []);

  return (
    <div
      className="
        absolute bottom-16 right-5
        w-96
        h-64
        bg-black/80
        border border-green-500
        p-4
        text-green-400
        z-50
        overflow-hidden
        shadow-[0_0_20px_#00ff88]
      "
    >

      <h2 className="font-bold mb-4">
        LIVE ACTIVITY LOG
      </h2>

      <div className="space-y-2 text-sm">

        {logs.map((log, index) => (
          <div key={index}>
            {log}
          </div>
        ))}

      </div>

    </div>
  );
}

export default ActivityLog;