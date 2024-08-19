type Repository = {
  name: string;
  technology: string;
  description: string;
  gitUrl: string;
};

type Server = {
  type: string;
  provider: string;
  database: {
    kind: string;
    version: string;
  };
};

type Environment = {
  name: string;
  description: string;
  host: string[];
  server: Server;
};

export interface I_Project {
  id?: string;
  type: "project";
  name: string;
  description?: string;
  tags?: string[];
  repositiroes?: Repository[];
  environmrnts?: Environment[];
  createdAt?: any;
  updatedAt?: any;
}

export const dummyProjects: I_Project[] = [
  { id: "1", type:"project",name: "FanClub" },
  { id: "2", type:"project",name: "Recoveroo Uk" },
  { id: "3", type:"project",name: "GameHub" },
  { id: "4", type:"project",name: "StudyQuest" },
  { id: "5", type:"project",name: "D3 Solutions" },
];