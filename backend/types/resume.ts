// Resume data structure types
export interface ContactDetails {
  name: string;
  email: string;
  phone: string;
  linkedin?: string;
  github?: string;
  website?: string;
}

export interface Skill {
  name: string;
  proficiency?: string;
  items: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location?: string;
  duration?: string;
}

export interface WorkExperience {
  company: string;
  role: string;
  duration: string;
  responsibilities: string[];
}

export interface Project {
  name: string;
  description: string;
  duration?: string;
  techStack?: string[];
  url?: string;
  responsibilities?: string[];
}

export interface ResumeData {
  contactDetails: ContactDetails;
  skills: Skill[];
  education: Education[];
  workExperience: WorkExperience[];
  projects?: Project[];
  confidenceScores?: {
    [key: string]: number;
  };
}

// Request/Response types
export interface ParseResumeRequest {
  resumeText: string;
}

export interface ParseResumeResponse {
  success: boolean;
  data?: ResumeData;
  error?: {
    message: string;
    code: string;
  };
}