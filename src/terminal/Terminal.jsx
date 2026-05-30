// import { useState, useRef, useEffect } from "react";
// import commands from "../commands";

// function Terminal() {
//   const [history, setHistory] = useState([
//     "Welcome to Hacker OS",
//     "Type 'help' to begin.",
//   ]);

//   const [input, setInput] = useState("");

//   const terminalRef = useRef(null);

//   const handleCommand = () => {
//     if (!input.trim()) return;

//     const cmd = input.trim().toLowerCase();

//     let output;

//     if (cmd === "clear") {
//       setHistory([]);
//       setInput("");
//       return;
//     }

//     if (commands[cmd]) {
//       output = commands[cmd]();
//     } else {
//       output = `Command not found: ${cmd}`;
//     }

//     setHistory((prev) => [
//       ...prev,
//       `> ${cmd}`,
//       output,
//     ]);

//     setInput("");
//   };

//   useEffect(() => {
//     terminalRef.current?.scrollTo({
//       top: terminalRef.current.scrollHeight,
//       behavior: "smooth",
//     });
//   }, [history]);

//   return (
//     <div
//       ref={terminalRef}
//       className="h-full overflow-y-auto text-green-400 font-mono"
//     >
//       {history.map((line, index) => (
//         <div key={index} className="mb-1 whitespace-pre-wrap">
//           {line}
//         </div>
//       ))}

//       <div className="flex items-center mt-2">
//         <span className="mr-2">{">"}</span>

//         <input
//           autoFocus
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") {
//               handleCommand();
//             }
//           }}
//           className="bg-transparent outline-none flex-1 text-green-300"
//         />
//       </div>
//     </div>
//   );
// }

// export default Terminal;





// import { useState, useRef, useEffect } from "react";

// import commands from "../commands";

// import {
//   listDirectory,
//   readFile,
//   getDirectory,
// } from "./utils";

// function Terminal({ setMatrixMode }) {

//   const [history, setHistory] = useState([
//     "Welcome to Hacker OS",
//     "Type 'help' to begin.",
//   ]);

//   const [input, setInput] = useState("");

//   const [commandHistory, setCommandHistory] = useState([]);

//   const [historyIndex, setHistoryIndex] = useState(-1);

//   const [path, setPath] = useState([
//     "home",
//     "khizer",
//   ]);

//   const terminalRef = useRef(null);

//   const executeCommand = (command) => {

//     const args = command.split(" ");

//     const cmd = args[0];

//     // CLEAR
//     if (cmd === "clear") {
//       setHistory([]);
//       return;
//     }

//     //matrix mode
//     if (cmd === "matrix") {

//   setMatrixMode((prev) => !prev);

//   setHistory((prev) => [
//     ...prev,
//     `khizer@os:~$ ${command}`,
//     "Matrix mode toggled.",
//   ]);

//   return;
// }

//     // HELP COMMANDS
//     if (commands[cmd]) {
//       setHistory((prev) => [
//         ...prev,
//         `khizer@os:~$ ${command}`,
//         commands[cmd](),
//       ]);

//       return;
//     }

//     // PWD
//     if (cmd === "pwd") {
//       setHistory((prev) => [
//         ...prev,
//         `khizer@os:~$ ${command}`,
//         "/" + path.join("/"),
//       ]);

//       return;
//     }

//     // LS
//     if (cmd === "ls") {

//       const files = listDirectory(path);

//       setHistory((prev) => [
//         ...prev,
//         `khizer@os:~$ ${command}`,
//         files,
//       ]);

//       return;
//     }

//     // CD
//     if (cmd === "cd") {

//       const folder = args[1];

//       if (!folder) return;

//       if (folder === "..") {

//         if (path.length > 1) {
//           setPath((prev) => prev.slice(0, -1));
//         }

//         return;
//       }

//       const current = getDirectory(path);

//       if (current && current[folder]) {

//         setPath((prev) => [
//           ...prev,
//           folder,
//         ]);

//       } else {

//         setHistory((prev) => [
//           ...prev,
//           `Directory not found: ${folder}`,
//         ]);
//       }

//       return;
//     }

//     // CAT
//     if (cmd === "cat") {

//       const filename = args[1];

//       const content = readFile(path, filename);

//       setHistory((prev) => [
//         ...prev,
//         `khizer@os:~$ ${command}`,
//         content,
//       ]);

//       return;
//     }

//     // UNKNOWN
//     setHistory((prev) => [
//       ...prev,
//       `khizer@os:~$ ${command}`,
//       `Command not found: ${cmd}`,
//     ]);
//   };

//   const handleCommand = () => {

//     if (!input.trim()) return;

//     executeCommand(input);

//     setCommandHistory((prev) => [
//       input,
//       ...prev,
//     ]);

//     setInput("");

//     setHistoryIndex(-1);
//   };

//   // AUTO SCROLL
//   useEffect(() => {

//     terminalRef.current?.scrollTo({
//       top: terminalRef.current.scrollHeight,
//       behavior: "smooth",
//     });

//   }, [history]);

//   return (
//     <div
//       ref={terminalRef}
//       className="h-full overflow-y-auto text-green-400 font-mono"
//     >

//       {history.map((line, index) => (
//         <div
//           key={index}
//           className="mb-1 whitespace-pre-wrap"
//         >
//           {line}
//         </div>
//       ))}

//       {/* INPUT */}
//       <div className="flex items-center mt-2">

//         <span className="mr-2 text-green-500">
//           khizer@os:~$
//         </span>

//         <input
//           autoFocus
//           value={input}
//           onChange={(e) => setInput(e.target.value)}

//           onKeyDown={(e) => {

//             // ENTER
//             if (e.key === "Enter") {
//               handleCommand();
//             }

//             // UP HISTORY
//             if (e.key === "ArrowUp") {

//               const newIndex = historyIndex + 1;

//               if (newIndex < commandHistory.length) {

//                 setHistoryIndex(newIndex);

//                 setInput(commandHistory[newIndex]);
//               }
//             }

//             // DOWN HISTORY
//             if (e.key === "ArrowDown") {

//               const newIndex = historyIndex - 1;

//               if (newIndex >= 0) {

//                 setHistoryIndex(newIndex);

//                 setInput(commandHistory[newIndex]);

//               } else {

//                 setHistoryIndex(-1);

//                 setInput("");
//               }
//             }
//           }}

//           className="bg-transparent outline-none flex-1 text-green-300"
//         />
//       </div>

//     </div>
//   );
// }

// export default Terminal;


import { useState, useRef, useEffect } from "react";

import commands from "../commands";

import banner from "./banner";

import {
  listDirectory,
  readFile,
  getDirectory,
} from "./utils";

import { ROOT_PASSWORD } from "../filesystem/auth";

import typingSound from "../assets/typing.mp3";

import { playSound } from "../hooks/useSound";
import { getAIResponse } from "./aiEngine";

function Terminal({ setMatrixMode,setAlertMode,openBrowser, }) {

  const [history, setHistory] = useState([
    banner,
    "Type 'help' to begin.",
  ]);

  const [input, setInput] = useState("");

  const [commandHistory, setCommandHistory] = useState([]);

  const [historyIndex, setHistoryIndex] = useState(-1);

  const [path, setPath] = useState([
    "home",
    "khizer",
  ]);

  const [isRoot, setIsRoot] = useState(false);

  const terminalRef = useRef(null);

  const allCommands = [
    "help",
    "about",
    "skills",
    "projects",
    "contact",
    "scan",
    "hack",
    "clear",
    "pwd",
    "ls",
    "cd",
    "cat",
    "matrix",
    "sudo",
    "alert",
    "ask",
    "open",
  ];

  const executeCommand = (command) => {

    const args = command.split(" ");

    const cmd = args[0];

    //alert
    if (cmd === "alert") {

  setAlertMode((prev) => !prev);

  setHistory((prev) => [
    ...prev,
    "WARNING: SECURITY ALERT ACTIVATED",
  ]);

  return;
}

    // CLEAR
    if (cmd === "clear") {
      setHistory([]);
      return;
    }
    // ask ai
    if (cmd === "ask") {

  const question =
    args.slice(1).join(" ");

  const response =
    getAIResponse(question);

  setHistory((prev) => [
    ...prev,
    `AI QUERY: ${question}`,
    response,
  ]);

  return;
}
    // MATRIX
    if (cmd === "matrix") {

      setMatrixMode((prev) => !prev);

      setHistory((prev) => [
        ...prev,
        `khizer@os:~$ ${command}`,
        "Matrix mode toggled.",
      ]);

      return;
    }

    if (cmd === "open") {

  const app =
    args[1];

  if (app === "browser") {

    openBrowser();

    setHistory((prev) => [
      ...prev,
      "Launching Cyber Browser...",
    ]);
  }

  return;
}

    // SUDO LOGIN
    if (cmd === "sudo") {

      const password = args[1];

      if (password === ROOT_PASSWORD) {

        setIsRoot(true);

        setHistory((prev) => [
          ...prev,
          "ROOT ACCESS GRANTED",
        ]);

      } else {

        setHistory((prev) => [
          ...prev,
          "ACCESS DENIED",
        ]);
      }

      return;
    }

    // PREDEFINED COMMANDS
    if (commands[cmd]) {

      setHistory((prev) => [
        ...prev,
        `${isRoot ? "root" : "khizer"}@os:~$ ${command}`,
        commands[cmd](),
      ]);

      return;
    }

    // PWD
    if (cmd === "pwd") {

      setHistory((prev) => [
        ...prev,
        `${isRoot ? "root" : "khizer"}@os:~$ ${command}`,
        "/" + path.join("/"),
      ]);

      return;
    }

    // LS
    if (cmd === "ls") {

      const current = getDirectory(path);

      let files = Object.keys(current);

      if (!isRoot) {
        files = files.filter(
          (file) => file !== "locked"
        );
      }

      setHistory((prev) => [
        ...prev,
        `${isRoot ? "root" : "khizer"}@os:~$ ${command}`,
        files.join("    "),
      ]);

      return;
    }

    // CD
    if (cmd === "cd") {

      const folder = args[1];

      if (!folder) return;

      if (folder === "..") {

        if (path.length > 1) {
          setPath((prev) => prev.slice(0, -1));
        }

        return;
      }

      const current = getDirectory(path);

      if (!current[folder]) {

        setHistory((prev) => [
          ...prev,
          `Directory not found: ${folder}`,
        ]);

        return;
      }

      // SECRET LOCK
      if (
        folder === "secret" &&
        !isRoot
      ) {

        setHistory((prev) => [
          ...prev,
          "ACCESS DENIED",
        ]);

        return;
      }

      setPath((prev) => [
        ...prev,
        folder,
      ]);

      return;
    }

    // CAT
    if (cmd === "cat") {

      const filename = args[1];

      const content = readFile(path, filename);

      setHistory((prev) => [
        ...prev,
        `${isRoot ? "root" : "khizer"}@os:~$ ${command}`,
        content,
      ]);

      return;
    }

    // UNKNOWN
    setHistory((prev) => [
      ...prev,
      `${isRoot ? "root" : "khizer"}@os:~$ ${command}`,
      `Command not found: ${cmd}`,
    ]);
  };

  const handleCommand = () => {

    if (!input.trim()) return;

    executeCommand(input);

    setCommandHistory((prev) => [
      input,
      ...prev,
    ]);

    setInput("");

    setHistoryIndex(-1);
  };

  // AUTO SCROLL
  useEffect(() => {

    terminalRef.current?.scrollTo({
      top: terminalRef.current.scrollHeight,
      behavior: "smooth",
    });

  }, [history]);

  return (
    <div
      ref={terminalRef}
      className="h-full overflow-y-auto text-green-400 font-mono"
    >

      {history.map((line, index) => (
        <div
          key={index}
          className="mb-1 whitespace-pre-wrap"
        >
          {line}
        </div>
      ))}

      {/* INPUT */}
      <div className="flex items-center mt-2">

        <span className="mr-2 text-green-500">
          {isRoot ? "root" : "khizer"}@os:~$
        </span>

        <input
          autoFocus
          value={input}
         onChange={(e) => {setInput(e.target.value);
          playSound(typingSound, 0.05);
        }}

          onKeyDown={(e) => {

            // ENTER
            if (e.key === "Enter") {
              handleCommand();
            }

            // TAB AUTOCOMPLETE
            if (e.key === "Tab") {

              e.preventDefault();

              const match = allCommands.find(
                (cmd) => cmd.startsWith(input)
              );

              if (match) {
                setInput(match);
              }
            }

            // UP HISTORY
            if (e.key === "ArrowUp") {

              const newIndex = historyIndex + 1;

              if (newIndex < commandHistory.length) {

                setHistoryIndex(newIndex);

                setInput(commandHistory[newIndex]);
              }
            }

            // DOWN HISTORY
            if (e.key === "ArrowDown") {

              const newIndex = historyIndex - 1;

              if (newIndex >= 0) {

                setHistoryIndex(newIndex);

                setInput(commandHistory[newIndex]);

              } else {

                setHistoryIndex(-1);

                setInput("");
              }
            }
          }}

          className="bg-transparent outline-none flex-1 text-green-300"
        />
      </div>

    </div>
  );
}

export default Terminal;