import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import bootSound from "../assets/boot.mp3";

import { playSound } from "../hooks/useSound.js";


const bootMessages = [
  "Initializing Kernel...",
  "Loading Security Modules...",
  "Starting Network Scanner...",
  "Connecting to Secure Node...",
  "Bypassing Firewalls...",
  "Access Granted.",
  "Welcome MD KHIZER",
];

function BootScreen() {
  const [visibleMessages, setVisibleMessages] = useState([]);

  useEffect(() => {
    bootMessages.forEach((msg, index) => {
      setTimeout(() => {
        setVisibleMessages((prev) => [...prev, msg]);
      }, index * 900);
    });
  }, []);
  playSound(bootSound, 0.4);

  return (
    <div className="w-screen h-screen bg-black text-green-400 p-8 flex flex-col justify-center">
      {visibleMessages.map((msg, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-xl mb-2"
        >
          {">"} {msg}
        </motion.div>
      ))}

      <motion.div
        animate={{ opacity: [0, 1, 0] }}
        transition={{
          duration: 1,
          repeat: Infinity,
        }}
        className="mt-4 text-2xl"
      >
        _
      </motion.div>
    </div>
  );
}

export default BootScreen;