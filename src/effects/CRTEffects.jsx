function CRTEffect() {

  return (
    <div className="pointer-events-none absolute inset-0 z-[999]">

      {/* Scanlines */}
      <div
        className="
          absolute inset-0
          bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)]
          bg-[length:100%_4px]
          opacity-20
        "
      />

      {/* Flicker */}
      <div
        className="
          absolute inset-0
          animate-pulse
          bg-green-500/5
        "
      />

    </div>
  );
}

export default CRTEffect;