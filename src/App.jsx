import { useEffect, useState } from "react";

import BootScreen from "./pages/BootScreen";

import LoginScreen from "./pages/LoginScreen";

import Desktop from "./pages/Desktop";

function App() {

  const [stage, setStage] =
    useState("boot");

  useEffect(() => {

    const timer = setTimeout(() => {

      setStage("login");

    }, 7000);

    return () => clearTimeout(timer);

  }, []);

  return (
    <>
      {stage === "boot" && (
        <BootScreen />
      )}

      {stage === "login" && (
        <LoginScreen
          onLogin={() =>
            setStage("desktop")
          }
        />
      )}

      {stage === "desktop" && (
        <Desktop />
      )}
    </>
  );
}

export default App;