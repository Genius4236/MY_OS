const skills = [
  { name: "React", level: "95%" },
  { name: "Node.js", level: "90%" },
  { name: "MongoDB", level: "88%" },
  { name: "Linux", level: "96%" },
  { name: "Cybersecurity", level: "85%" },
];

function SkillsApp() {
  return (
    <div className="text-green-400">
      <h1 className="text-2xl font-bold mb-5">
        SKILLS
      </h1>

      <div className="space-y-5">
        {skills.map((skill, index) => (
          <div key={index}>
            <div className="flex justify-between mb-1">
              <span>{skill.name}</span>
              <span>{skill.level}</span>
            </div>

            <div className="w-full bg-[#111] h-4 rounded">
              <div
                className="bg-green-500 h-4 rounded"
                style={{
                  width: skill.level,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkillsApp;