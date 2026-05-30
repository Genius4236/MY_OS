function CyberHUD() {

  return (
    <div
      className="
        absolute top-5 left-1/2
        -translate-x-1/2
        flex gap-6
        z-50
      "
    >

      <div
        className="
          bg-black/80
          border border-green-500
          px-5 py-2
          text-green-400
          shadow-[0_0_15px_#00ff88]
        "
      >
        NODE STATUS: ONLINE
      </div>

      <div
        className="
          bg-black/80
          border border-green-500
          px-5 py-2
          text-green-400
          shadow-[0_0_15px_#00ff88]
        "
      >
        FIREWALL: ACTIVE
      </div>

      <div
        className="
          bg-black/80
          border border-green-500
          px-5 py-2
          text-green-400
          shadow-[0_0_15px_#00ff88]
        "
      >
        AI CORE: RUNNING
      </div>

    </div>
  );
}

export default CyberHUD;