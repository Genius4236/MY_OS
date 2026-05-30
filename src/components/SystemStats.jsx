import { useEffect, useState } from "react";

function SystemStats() {

  const [stats, setStats] = useState({
    cpu: 0,
    ram: 0,
    network: 0,
  });

  useEffect(() => {

    const interval = setInterval(() => {

      setStats({
        cpu: Math.floor(Math.random() * 100),
        ram: Math.floor(Math.random() * 100),
        network: Math.floor(Math.random() * 1000),
      });

    }, 1500);

    return () => clearInterval(interval);

  }, []);

  return (
    <div
      className="
        absolute top-5 right-5
        w-64
        bg-black/80
        border border-green-500
        p-4
        text-green-400
        z-50
        shadow-[0_0_20px_#00ff88]
      "
    >

      <h2 className="font-bold mb-4">
        SYSTEM MONITOR
      </h2>

      <div className="space-y-3">

        <div>
          CPU: {stats.cpu}%
        </div>

        <div>
          RAM: {stats.ram}%
        </div>

        <div>
          NET: {stats.network} kb/s
        </div>

      </div>

    </div>
  );
}

export default SystemStats;