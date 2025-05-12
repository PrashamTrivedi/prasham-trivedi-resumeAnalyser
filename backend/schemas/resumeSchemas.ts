import { z } from 'npm:@hono/zod-openapi';

// Generic confidence field schema
const ConfidenceFieldSchema = <T extends z.ZodTypeAny>(valueSchema: T) => 
  z.object({
    value: valueSchema,
    confidence: z.number().min(0).max(1).openapi({
      description: 'Confidence score between 0 and 1',
      example: 0.95
    }),
    standardization: z.string().nullable().openapi({
      description: 'Notes about any standardization applied',
      example: 'Standardized from "JS" to "JavaScript"'
    })
  });

// Date range schema
const DateRangeSchema = z.object({
  startDate: ConfidenceFieldSchema(z.string().nullable()),
  endDate: ConfidenceFieldSchema(z.string().nullable()),
  durationInMonths: ConfidenceFieldSchema(z.number().nullable()),
  current: ConfidenceFieldSchema(z.boolean())
}).openapi('DateRange');

// Request schema
export const ResumeParserRequestSchema = z.object({
  resumeText: z.string().min(1).openapi({
    description: 'The raw text of the resume to parse',
    example: 'John Doe\nSoftware Engineer\n...'
  }),
  options: z.object({
    confidenceThreshold: z.number().min(0).max(1).optional().openapi({
      description: 'Minimum confidence score threshold (0-1)',
      example: 0.5
    }),
    standardizationEnabled: z.boolean().optional().openapi({
      description: 'Whether to standardize terminology',
      example: true
    }),
    extractSummary: z.boolean().optional().openapi({
      description: 'Whether to extract and analyze the resume summary',
      example: true
    }),
    sectionPriorities: z.array(z.string()).optional().openapi({
      description: 'Sections to prioritize in extraction',
      example: ['skills', 'workExperience']
    }),
    extractLanguages: z.boolean().optional().openapi({
      description: 'Whether to extract language proficiencies',
      example: true
    })
  }).optional().openapi({
    description: 'Parser configuration options'
  })
}).openapi('ResumeParserRequest');

// Personal info schema
const PersonalInfoSchema = z.object({
  name: ConfidenceFieldSchema(z.string()),
  email: ConfidenceFieldSchema(z.string()),
  phone: ConfidenceFieldSchema(z.string()),
  location: ConfidenceFieldSchema(z.string().nullable()),
  linkedin: ConfidenceFieldSchema(z.string().nullable()),
  github: ConfidenceFieldSchema(z.string().nullable()),
  website: ConfidenceFieldSchema(z.string().nullable()),
  summary: ConfidenceFieldSchema(z.string().nullable())
}).openapi('PersonalInfo');

// Skill schema
const SkillSchema = z.object({
  name: ConfidenceFieldSchema(z.string()),
  category: ConfidenceFieldSchema(z.string().nullable()),
  proficiency: ConfidenceFieldSchema(z.string().nullable()),
  yearsOfExperience: ConfidenceFieldSchema(z.number().nullable())
}).openapi('Skill');

// Work experience schema
const WorkExperienceSchema = z.object({
  company: ConfidenceFieldSchema(z.string()),
  title: ConfidenceFieldSchema(z.string()),
  location: ConfidenceFieldSchema(z.string().nullable()),
  dates: DateRangeSchema,
  responsibilities: ConfidenceFieldSchema(z.array(z.string())),
  technologies: ConfidenceFieldSchema(z.array(z.string())),
  achievements: ConfidenceFieldSchema(z.array(z.string()))
}).openapi('WorkExperience');

// Education schema
const EducationSchema = z.object({
  institution: ConfidenceFieldSchema(z.string()),
  degree: ConfidenceFieldSchema(z.string()),
  field: ConfidenceFieldSchema(z.string()),
  dates: DateRangeSchema,
  gpa: ConfidenceFieldSchema(z.string().nullable()),
  coursework: ConfidenceFieldSchema(z.array(z.string()).nullable()),
  achievements: ConfidenceFieldSchema(z.array(z.string()).nullable())
}).openapi('Education');

// Project schema
const ProjectSchema = z.object({
  name: ConfidenceFieldSchema(z.string()),
  description: ConfidenceFieldSchema(z.string()),
  technologies: ConfidenceFieldSchema(z.array(z.string())),
  urls: ConfidenceFieldSchema(z.array(z.string()).nullable()),
  dates: ConfidenceFieldSchema(DateRangeSchema.nullable()),
  role: ConfidenceFieldSchema(z.string().nullable())
}).openapi('Project');

// Certification schema
const CertificationSchema = z.object({
  name: ConfidenceFieldSchema(z.string()),
  issuer: ConfidenceFieldSchema(z.string().nullable()),
  date: ConfidenceFieldSchema(z.string().nullable()),
  expiryDate: ConfidenceFieldSchema(z.string().nullable()),
  id: ConfidenceFieldSchema(z.string().nullable())
}).openapi('Certification');

// Language schema
const LanguageSchema = z.object({
  name: ConfidenceFieldSchema(z.string()),
  proficiency: ConfidenceFieldSchema(z.string().nullable())
}).openapi('Language');

// Parsed resume schema
export const ParsedResumeSchema = z.object({
  personalInfo: PersonalInfoSchema,
  skills: z.array(SkillSchema),
  workExperience: z.array(WorkExperienceSchema),
  education: z.array(EducationSchema),
  projects: z.array(ProjectSchema),
  certifications: z.array(CertificationSchema),
  languages: z.array(LanguageSchema),
  overallConfidence: z.number().min(0).max(1),
  missingFields: z.array(z.string()),
  detectedSections: z.array(z.string())
}).openapi('ParsedResume');

// Response schema
export const ParseResumeResponseSchema = z.object({
  success: z.boolean(),
  data: ParsedResumeSchema.optional(),
  error: z.object({
    message: z.string(),
    code: z.string(),
    details: z.unknown().optional()
  }).optional()
}).openapi('ParseResumeResponse');

// Error response schema
export const ErrorResponseSchema = z.object({
  success: z.literal(false),
  error: z.object({
    message: z.string(),
    code: z.string(),
    details: z.unknown().optional()
  })
}).openapi('ErrorResponse');