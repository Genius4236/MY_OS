const projects = [
  {
    title: "Rahat Clinic",
    desc: "Full Stack Healthcare Platform",
  },
  {
    title: "Secure Exam System",
    desc: "Anti-Cheating Examination Platform",
  },
  {
    title: "AI Cyber Assistant",
    desc: "Cybersecurity AI Chatbot",
  },
  {
    title: "Medical Vault",
    desc: "Encrypted Medical Records Storage",
  },
];

function ProjectsApp() {
  return (
    <div className="text-green-400">
      <h1 className="text-2xl font-bold mb-5">
        PROJECTS
      </h1>

      <div className="space-y-4">
        {projects.map((project, index) => (
          <div
            key={index}
            className="border border-green-500 p-4 rounded"
          >
            <h2 className="text-xl font-bold">
              {project.title}
            </h2>

            <p className="text-green-300 mt-2">
              {project.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProjectsApp;