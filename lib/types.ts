export interface Portfolio {
  id: string;
  user_id: string;
  username: string;
  name: string;
  title: string;
  bio: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  email?: string;
  skills: string[];
  projects: Project[];
  experience: Experience[];
  theme: string;
  is_public: boolean;
  view_count: number;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  duration: string;
  description: string;
}

export interface AIGeneration {
  id: string;
  user_id: string;
  type: 'resume' | 'bio' | 'case_study' | 'skills_gap';
  input: string;
  output: any;
  created_at: string;
}
