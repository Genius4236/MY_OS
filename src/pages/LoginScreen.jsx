import { useState } from "react";

import { motion } from "framer-motion";
import LoginGlitch from "../effects/LoginGlitch.jsx";

function LoginScreen({ onLogin }) {

  const [username, setUsername] =useState("");

  const [password, setPassword] =useState("");

  const [error, setError] =useState("");
  
  const [loading, setLoading] =useState(false);

  const handleLogin = () => {

    if (
  username === "mdkhizer" &&
  password === "1234"
) {

  setLoading(true);

  setTimeout(() => {
    onLogin();
  }, 2500);

} else {

  setError("ACCESS DENIED");
}
  };

  return (
    <div
      className="
        w-screen h-screen
        bg-black
        flex items-center justify-center
        text-green-400
        relative overflow-hidden
      "
    >

      {/* Background Glow */}
      <div
        className="
          absolute w-[500px] h-[500px]
          bg-green-500/10
          blur-3xl rounded-full
        "
      />
      <LoginGlitch />
      <motion.div
        initial={{
          opacity: 0,
          scale: 0.9,
        }}

        animate={{
          opacity: 1,
          scale: 1,
        }}

        className="
          relative z-10
          w-[420px]
          bg-black/80
          border border-green-500
          p-8
          shadow-[0_0_40px_#00ff88]
        "
      >

        <h1
          className="
            text-4xl font-bold mb-8
            text-center
          "
        >
          HACKER OS LOGIN
        </h1>

        {/* USERNAME */}
        <div className="mb-5">

          <label className="block mb-2">
            USERNAME
          </label>

          <input
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }

            className="
              w-full
              bg-black
              border border-green-500
              p-3
              outline-none
            "
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-5">

          <label className="block mb-2">
            PASSWORD
          </label>

          <input
            type="password"

            value={password}

            onChange={(e) =>
              setPassword(e.target.value)
            }

            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}

            className="
              w-full
              bg-black
              border border-green-500
              p-3
              outline-none
            "
          />
        </div>

        {/* ERROR */}
        {error && (

          <div className="text-red-500 mb-4">
            {error}
          </div>
        )}
{loading && (

  <div
    className="
      mb-4
      text-center
      text-green-400
      animate-pulse
    "
  >
    ACCESS GRANTED...
  </div>
)}

        {/* BUTTON */}
        <button
          onClick={handleLogin}

          className="
            w-full
            bg-green-500
            text-black
            py-3
            font-bold
            hover:bg-green-400
            transition
          "
        >
          ACCESS SYSTEM
        </button>

        {/* HINT */}
        <div
          className="
            mt-6
            text-sm
            text-green-300/60
            text-center
          "
        >
          Hint: mdkhizer / 1234
        </div>

      </motion.div>

    </div>
  );
}

export default LoginScreen;