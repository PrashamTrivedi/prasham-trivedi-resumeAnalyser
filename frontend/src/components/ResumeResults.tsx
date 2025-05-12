'use client';

import { ResumeData } from '@/types/resume';

interface ResumeResultsProps {
  resumeData: ResumeData | null;
}

export default function ResumeResults({ resumeData }: ResumeResultsProps) {
  if (!resumeData) return null;

  return (
    <div className="mt-10 result-card shadow-xl">
      <div className="result-header px-6 py-5">
        <h3 className="text-xl leading-6 font-bold text-text">Parsed Resume</h3>
        <p className="mt-2 text-sm text-text-muted">
          Here's the structured data extracted from your resume
        </p>
      </div>
      <div>
        <dl>
          {/* Personal Info Section */}
          <div className="result-section px-6 py-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-text-muted md:col-span-1">Personal Info</dt>
            <dd className="mt-1 md:mt-0 md:col-span-2">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-lg">{resumeData.personalInfo.name}</h4>
                  <p className="text-text-muted">{resumeData.personalInfo.email}</p>
                  {resumeData.personalInfo.phone && (
                    <p className="text-text-muted">{resumeData.personalInfo.phone}</p>
                  )}
                  {resumeData.personalInfo.location && (
                    <p className="text-text-muted">{resumeData.personalInfo.location}</p>
                  )}
                </div>
                {resumeData.personalInfo.summary && (
                  <div>
                    <h5 className="text-sm font-medium text-text-muted mb-1">Summary</h5>
                    <p className="text-sm">{resumeData.personalInfo.summary}</p>
                  </div>
                )}
              </div>
            </dd>
          </div>

          {/* Skills Section */}
          <div className="result-section px-6 py-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-text-muted md:col-span-1">Skills</dt>
            <dd className="mt-1 md:mt-0 md:col-span-2">
              <div className="flex flex-wrap gap-2">
                {resumeData.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">
                    {skill.name} {skill.level && <span>• {skill.level}</span>}
                  </span>
                ))}
              </div>
            </dd>
          </div>

          {/* Experience Section */}
          <div className="result-section px-6 py-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-text-muted md:col-span-1">Experience</dt>
            <dd className="mt-1 md:mt-0 md:col-span-2">
              <ul className="space-y-6">
                {resumeData.experience.map((exp, index) => (
                  <li key={index} className="border-l-2 border-primary pl-4 -ml-4">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                      <h4 className="font-semibold text-lg">{exp.position}</h4>
                      <span className="text-text-muted text-sm mt-1 md:mt-0">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <p className="text-secondary mt-1">{exp.company}</p>
                    <p className="mt-2 text-sm">{exp.description}</p>
                  </li>
                ))}
              </ul>
            </dd>
          </div>

          {/* Education Section */}
          <div className="result-section px-6 py-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-text-muted md:col-span-1">Education</dt>
            <dd className="mt-1 md:mt-0 md:col-span-2">
              <ul className="space-y-6">
                {resumeData.education.map((edu, index) => (
                  <li key={index} className="border-l-2 border-secondary pl-4 -ml-4">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                      <h4 className="font-semibold text-lg">{edu.degree} in {edu.field}</h4>
                      <span className="text-text-muted text-sm mt-1 md:mt-0">
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>
                    <p className="text-primary mt-1">{edu.institution}</p>
                    {edu.description && <p className="mt-2 text-sm">{edu.description}</p>}
                  </li>
                ))}
              </ul>
            </dd>
          </div>

          {/* Optional Sections */}
          {resumeData.projects && resumeData.projects.length > 0 && (
            <div className="result-section px-6 py-5 grid grid-cols-1 md:grid-cols-3 gap-4">
              <dt className="text-sm font-medium text-text-muted md:col-span-1">Projects</dt>
              <dd className="mt-1 md:mt-0 md:col-span-2">
                <ul className="space-y-5">
                  {resumeData.projects.map((project, index) => (
                    <li key={index} className="border-l-2 border-accent pl-4 -ml-4">
                      <h4 className="font-semibold text-lg">{project.name}</h4>
                      <p className="mt-2 text-sm">{project.description}</p>
                      {project.technologies && (
                        <div className="mt-3 flex flex-wrap gap-1">
                          {project.technologies.map((tech, idx) => (
                            <span key={idx} className="inline-block px-2 py-0.5 bg-surface-3 text-xs rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                      {project.url && (
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="mt-2 block text-sm text-accent hover:underline">
                          View Project →
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
          
          {resumeData.certifications && resumeData.certifications.length > 0 && (
            <div className="result-section px-6 py-5 grid grid-cols-1 md:grid-cols-3 gap-4">
              <dt className="text-sm font-medium text-text-muted md:col-span-1">Certifications</dt>
              <dd className="mt-1 md:mt-0 md:col-span-2">
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {resumeData.certifications.map((cert, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <svg className="h-4 w-4 text-secondary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
          
          {resumeData.languages && resumeData.languages.length > 0 && (
            <div className="result-section px-6 py-5 grid grid-cols-1 md:grid-cols-3 gap-4">
              <dt className="text-sm font-medium text-text-muted md:col-span-1">Languages</dt>
              <dd className="mt-1 md:mt-0 md:col-span-2">
                <div className="flex flex-wrap gap-2">
                  {resumeData.languages.map((lang, index) => (
                    <span key={index} className="inline-block px-3 py-1 bg-surface-3 rounded-full text-sm">
                      {lang}
                    </span>
                  ))}
                </div>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}