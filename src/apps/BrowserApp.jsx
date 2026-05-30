import { useState } from "react";

const pages = {

  home: `
WELCOME TO CYBER NETWORK

Available routes:

/projects
/about
/security
/contact
`,

  projects: `
PROJECT DATABASE

[1] Rahat Clinic
[2] Secure Exam System
[3] AI Cyber Assistant
[4] Medical Vault
`,

  about: `
MD KHIZER

Full Stack Developer
Cybersecurity Enthusiast
Creative UI Engineer
`,

  security: `
SECURITY STATUS

Firewall: ACTIVE
Encryption: ENABLED
Threat Monitoring: ONLINE
`,

  contact: `
CONTACT CHANNELS

GitHub:
github.com/khizer

LinkedIn:
linkedin.com/in/khizer
`,
};

function BrowserApp() {

  const [route, setRoute] =
    useState("home");

  const navigate = (path) => {

    const clean =
      path.replace("/", "");

    if (pages[clean]) {

      setRoute(clean);

    } else {

      setRoute("404");
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-[#050505] text-green-400">

      {/* TOP BAR */}
      <div
        className="
          h-12
          border-b border-green-500
          flex items-center gap-3
          px-4
        "
      >

        {/* BUTTONS */}
        <div className="flex gap-2">

          <div className="w-3 h-3 rounded-full bg-red-500" />

          <div className="w-3 h-3 rounded-full bg-yellow-500" />

          <div className="w-3 h-3 rounded-full bg-green-500" />

        </div>

        {/* ADDRESS BAR */}
        <input
          value={`cyber://${route}`}

          onChange={(e) => {

            const value =
              e.target.value
                .replace("cyber://", "");

            setRoute(value);
          }}

          onKeyDown={(e) => {

            if (e.key === "Enter") {

              navigate(route);
            }
          }}

          className="
            flex-1
            bg-black
            border border-green-500
            px-4 py-2
            outline-none
          "
        />

      </div>

      {/* PAGE */}
      <div className="flex-1 p-6 overflow-auto whitespace-pre-wrap">

        {pages[route] || `
404 PAGE NOT FOUND
`}

      </div>

    </div>
  );
}

export default BrowserApp;