// const filesystem = {
//   home: {
//     khizer: {
//       projects: {},
//       skills: {},
//       secret: {}
//     }
//   }
// };


const filesystem = {
  home: {
    khizer: {
      projects: {
        "rahat-clinic.txt":
          "Full Stack Healthcare Platform built with MERN Stack.",

        "ai-cyber-assistant.txt":
          "AI powered cybersecurity assistant project.",

        "medical-vault.txt":
          "Encrypted medical storage platform.",
      },

      skills: {
        "skills.txt":
          `
React
Node.js
MongoDB
Linux
Cybersecurity
Python
          `,
      },

      secret: {
        locked: true,
        ".classified":
          "TOP SECRET ACCESS GRANTED",
      },

      contact: {
        "contact.txt":
          `
Email: khizer@example.com
GitHub: github.com/khizer
LinkedIn: linkedin.com/in/khizer
          `,
      },
    },
  },
};

export default filesystem;