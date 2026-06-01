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

function ActivityLog({
  embedded = false,
}) {

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
      className={embedded? "text-green-400": `absolute bottom-16 right-5 w-96 h-64 cyber-panel z-50`
  }
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