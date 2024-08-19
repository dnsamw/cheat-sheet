const dummyProject = {
  id: 1,
  name: "FanClub",
  description: "The description of my project",
  tags: [
    "Aws",
    "Jenkins",
    "Git",
    "Laravel",
    "TypeScript",
    "ReactJS",
    "Redux",
    "Docker",
    "Nginx",
    "Linux",
    "FanClub",
    "J-League",
  ],

  repositiroes: [
    {
      id: 1,
      name: "Frontend",
      technology: "ReactJS",
      description: "The description of my repo",
      gitUrl: "https://github.com",
    },
    {
      id: 2,
      name: "Backend",
      technology: "Laravel",
      description: "The description of my repo",
      gitUrl: "https://github.com",
    },
    {
      id: 3,
      name: "AminPanel - BackOffice",
      technology: "Laravel",
      description: "The description of my repo",
      gitUrl: "https://github.com",
    },
    {
      id: 4,
      name: "MyPage",
      technology: "Laravel",
      description: "The description of my repo",
      gitUrl: "https://github.com",
    },
  ],

  environmrnts: [
    {
      id: 1,
      name: "Dev",
      description: "The description of my environment",
      host: [
        { id: 1, name: "Frontend", url: "https://github.com" },
        { id: 2, name: "Backtend", url: "https://github.com" },
        { id: 3, name: "AdminBackoffice", url: "https://github.com" },
        { id: 4, name: "MyPage", url: "https://github.com" },
      ],
      server: {
        type: "Cloud",
        provider: "AWS",
        database: { kind: "MySQL", version: "8.2" },
      },
    },
    {
      id: 2,
      name: "Stg",
      description: "The description of my environment",
      host: [
        { id: 1, name: "Frontend", url: "https://github.com" },
        { id: 2, name: "Backtend", url: "https://github.com" },
        { id: 3, name: "AdminBackoffice", url: "https://github.com" },
        { id: 4, name: "MyPage", url: "https://github.com" },
      ],
      server: {
        type: "Cloud",
        provider: "AWS",
        database: { kind: "MySQL", version: "8.2" },
      },
    },
    {
      id: 3,
      name: "Prod",
      description: "The description of my environment",
      host: [
        { id: 1, name: "Frontend", url: "https://github.com" },
        { id: 2, name: "Backtend", url: "https://github.com" },
        { id: 3, name: "AdminBackoffice", url: "https://github.com" },
        { id: 4, name: "MyPage", url: "https://github.com" },
      ],
      server: {
        type: "Cloud",
        provider: "AWS",
        database: { kind: "MySQL", version: "8.2" },
      },
    },
    {
      id: 3,
      name: "DevCss",
      description: "The description of my environment",
      host: [
        { id: 1, name: "Frontend", url: "https://github.com" },
        { id: 2, name: "Backtend", url: "https://github.com" },
        { id: 3, name: "AdminBackoffice", url: "https://github.com" },
        { id: 4, name: "MyPage", url: "https://github.com" },
      ],
      server: {
        type: "Cloud",
        provider: "AWS",
        database: { kind: "MySQL", version: "8.2" },
      },
    },
  ],
};
