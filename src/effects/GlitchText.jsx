function GlitchText({ text }) {

  return (
    <div className="relative inline-block text-green-400">

      <span className="relative z-10">
        {text}
      </span>

      <span
        className="
          absolute left-0 top-0
          text-red-500 opacity-70
          translate-x-[2px]
        "
      >
        {text}
      </span>

      <span
        className="
          absolute left-0 top-0
          text-blue-500 opacity-70
          -translate-x-[2px]
        "
      >
        {text}
      </span>

    </div>
  );
}

export default GlitchText;