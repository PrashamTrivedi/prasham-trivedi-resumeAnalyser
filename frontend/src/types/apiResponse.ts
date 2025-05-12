export interface FieldValue<T> {
  value: T;
  confidence: number;
  standardization: string | null;
}

export interface ComplexFieldValue<T> {
  value: FieldValue<T>;
  confidence: number;
  standardization: string | null;
}

export interface PersonalInfo {
  name: FieldValue<string>;
  email: FieldValue<string>;
  phone: FieldValue<string>;
  location: FieldValue<string>;
  linkedin: FieldValue<string>;
  github: FieldValue<string>;
  website: FieldValue<string>;
  summary: FieldValue<string>;
}

export interface Skill {
  name: ComplexFieldValue<string>;
  category: ComplexFieldValue<string>;
  proficiency: ComplexFieldValue<string>;
  yearsOfExperience: FieldValue<number>;
}

export interface DateRange {
  startDate: FieldValue<string>;
  endDate: FieldValue<string>;
  durationInMonths: FieldValue<number | null>;
  current: FieldValue<boolean>;
}

export interface WorkExperience {
  company: FieldValue<string>;
  title: FieldValue<string>;
  location: FieldValue<string>;
  dates: DateRange;
  responsibilities: FieldValue<string[]>;
  technologies: FieldValue<string[]>;
  achievements: FieldValue<string[]>;
}

export interface Education {
  institution: FieldValue<string>;
  degree: ComplexFieldValue<string>;
  field: ComplexFieldValue<string>;
  dates: DateRange;
  gpa: FieldValue<string>;
  coursework: FieldValue<string[] | null>;
  achievements: FieldValue<string[] | null>;
}

export interface ParsedResumeData {
  personalInfo: PersonalInfo;
  skills: Skill[];
  workExperience: WorkExperience[];
  education: Education[];
  projects: FieldValue<string>[]; // Can be expanded if needed
  certifications: FieldValue<string>[]; // Can be expanded if needed
  languages: FieldValue<string>[]; // Can be expanded if needed
  overallConfidence: number;
  missingFields: string[];
  detectedSections: string[];
}

export interface ApiResponse {
  success: boolean;
  data: ParsedResumeData;
}