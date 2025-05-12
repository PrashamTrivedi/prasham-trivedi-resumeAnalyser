export interface Education {
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Skill {
  name: string;
  level?: string;
}

export interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone?: string;
    location?: string;
    linkedIn?: string;
    website?: string;
    summary?: string;
  };
  education: Education[];
  experience: Experience[];
  skills: Skill[];
  certifications?: string[];
  languages?: string[];
  projects?: {
    name: string;
    description: string;
    technologies?: string[];
    url?: string;
  }[];
}

export interface ResumeResponse {
  data: ResumeData;
}

export interface ResumeError {
  message: string;
}