'use client';

import { ApiResponse } from '@/types/apiResponse';
import StandardizedField from './StandardizedField';

interface EnhancedResumeResultsProps {
  apiResponse: ApiResponse | null;
}

export default function EnhancedResumeResults({ apiResponse }: EnhancedResumeResultsProps) {
  if (!apiResponse || !apiResponse.success) return null;
  
  const { data } = apiResponse;
  const { missingFields } = data;

  // Helper function to check if a field is in the missing fields list
  const isMissingField = (path: string): boolean => {
    return missingFields.includes(path);
  };

  // Format date for display (from YYYY-MM format to Month Year)
  const formatDate = (dateString: string): string => {
    if (!dateString) return 'Present';
    
    const [year, month] = dateString.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short'
    });
  };

  return (
    <div className="mt-10 result-card shadow-xl rounded-lg overflow-hidden">
      <div className="result-header px-6 py-5">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-xl leading-6 font-bold text-white">Parsed Resume</h3>
            <p className="mt-2 text-sm text-white/90">
              Here's the structured data extracted from your resume
            </p>
          </div>
          <div className="text-right text-white">
            <div className="text-sm font-medium">Overall Confidence</div>
            <div className="text-2xl font-bold">{Math.round(data.overallConfidence * 100)}%</div>
          </div>
        </div>
      </div>

      {/* Missing Fields Alert */}
      {missingFields.length > 0 && (
        <div className="bg-warning/10 dark:bg-warning/5 border-l-4 border-warning p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-warning" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-warning">
                Missing Information! The following fields could not be found in your resume:
              </p>
              <ul className="mt-1 text-xs text-warning/80 list-disc list-inside">
                {missingFields.map((field, index) => (
                  <li key={index}>{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      
      <div className="bg-surface">
        <dl>
          {/* Personal Info Section */}
          <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-border">
            <dt className="text-sm font-medium text-text-muted md:col-span-1">
              Personal Info
            </dt>
            <dd className="mt-1 md:mt-0 md:col-span-2">
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-xl text-text">
                    <StandardizedField 
                      value={data.personalInfo.name.value} 
                      standardization={data.personalInfo.name.standardization}
                      confidence={data.personalInfo.name.confidence}
                      isMissing={isMissingField('personalInfo.name')}
                    />
                  </h4>
                  <p className="text-text-muted mt-1">
                    <StandardizedField 
                      value={data.personalInfo.email.value} 
                      standardization={data.personalInfo.email.standardization}
                      confidence={data.personalInfo.email.confidence}
                      isMissing={isMissingField('personalInfo.email')}
                    />
                  </p>
                  <div className="mt-2 text-sm grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <span className="font-medium text-text-muted">Phone: </span>
                      <StandardizedField 
                        value={data.personalInfo.phone.value} 
                        standardization={data.personalInfo.phone.standardization}
                        confidence={data.personalInfo.phone.confidence}
                        isMissing={isMissingField('personalInfo.phone')}
                      />
                    </div>
                    <div>
                      <span className="font-medium text-text-muted">Location: </span>
                      <StandardizedField 
                        value={data.personalInfo.location.value} 
                        standardization={data.personalInfo.location.standardization}
                        confidence={data.personalInfo.location.confidence}
                        isMissing={isMissingField('personalInfo.location')}
                      />
                    </div>
                  </div>
                  
                  {/* Social Links */}
                  <div className="mt-3 text-sm grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {data.personalInfo.linkedin.value && (
                      <div>
                        <span className="font-medium text-text-muted">LinkedIn: </span>
                        <StandardizedField 
                          value={data.personalInfo.linkedin.value} 
                          standardization={data.personalInfo.linkedin.standardization}
                          confidence={data.personalInfo.linkedin.confidence}
                          isMissing={isMissingField('personalInfo.linkedin')}
                        />
                      </div>
                    )}
                    {data.personalInfo.github.value && (
                      <div>
                        <span className="font-medium text-text-muted">GitHub: </span>
                        <StandardizedField 
                          value={data.personalInfo.github.value} 
                          standardization={data.personalInfo.github.standardization}
                          confidence={data.personalInfo.github.confidence}
                          isMissing={isMissingField('personalInfo.github')}
                        />
                      </div>
                    )}
                    {data.personalInfo.website.value && (
                      <div>
                        <span className="font-medium text-text-muted">Website: </span>
                        <StandardizedField 
                          value={data.personalInfo.website.value} 
                          standardization={data.personalInfo.website.standardization}
                          confidence={data.personalInfo.website.confidence}
                          isMissing={isMissingField('personalInfo.website')}
                        />
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Personal Summary */}
                {data.personalInfo.summary.value && (
                  <div className="bg-surface-2 p-4 rounded-lg">
                    <h5 className="text-sm font-medium text-text-muted mb-2">Professional Summary</h5>
                    <p className="text-sm text-text">
                      <StandardizedField 
                        value={data.personalInfo.summary.value} 
                        standardization={data.personalInfo.summary.standardization}
                        confidence={data.personalInfo.summary.confidence}
                        isMissing={isMissingField('personalInfo.summary')}
                      />
                    </p>
                  </div>
                )}
              </div>
            </dd>
          </div>

          {/* Skills Section */}
          <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-border bg-surface-2 dark:bg-surface-3/30">
            <dt className="text-sm font-medium text-text-muted md:col-span-1">
              Skills
            </dt>
            <dd className="mt-1 md:mt-0 md:col-span-2">
              <div className="mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {data.skills.map((skill, index) => (
                    <div key={index} className="bg-surface p-3 shadow-sm rounded-lg border border-border">
                      <div className="font-medium text-text">
                        <StandardizedField 
                          value={skill.name.value.value} 
                          standardization={skill.name.value.standardization}
                          confidence={skill.name.value.confidence}
                        />
                      </div>
                      
                      {skill.category.value.value && (
                        <div className="text-xs text-text-muted mt-1">
                          <span className="font-medium">Category: </span>
                          <StandardizedField 
                            value={skill.category.value.value} 
                            standardization={skill.category.value.standardization}
                            confidence={skill.category.value.confidence}
                          />
                        </div>
                      )}
                      
                      {skill.proficiency.value.value && (
                        <div className="text-xs text-text-muted">
                          <span className="font-medium">Proficiency: </span>
                          <StandardizedField 
                            value={skill.proficiency.value.value} 
                            standardization={skill.proficiency.value.standardization}
                            confidence={skill.proficiency.value.confidence}
                          />
                        </div>
                      )}
                      
                      {skill.yearsOfExperience.value > 0 && (
                        <div className="text-xs text-text-muted">
                          <span className="font-medium">Experience: </span>
                          <StandardizedField 
                            value={`${skill.yearsOfExperience.value} year${skill.yearsOfExperience.value !== 1 ? 's' : ''}`} 
                            standardization={skill.yearsOfExperience.standardization}
                            confidence={skill.yearsOfExperience.confidence}
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {data.skills.length === 0 && (
                  <div className="text-text-muted italic text-center">No skills were extracted from the resume</div>
                )}
              </div>
            </dd>
          </div>

          {/* Work Experience Section */}
          <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-border">
            <dt className="text-sm font-medium text-text-muted md:col-span-1">
              Work Experience
            </dt>
            <dd className="mt-1 md:mt-0 md:col-span-2">
              <ul className="space-y-6">
                {data.workExperience.map((exp, index) => (
                  <li key={index} className="border-l-2 border-primary pl-4 -ml-4">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                      <h4 className="font-semibold text-lg text-text">
                        <StandardizedField 
                          value={exp.title.value} 
                          standardization={exp.title.standardization}
                          confidence={exp.title.confidence}
                          isMissing={isMissingField(`workExperience[${index}].title`)}
                        />
                      </h4>
                      <span className="text-text-muted text-sm mt-1 md:mt-0">
                        <StandardizedField 
                          value={formatDate(exp.dates.startDate.value)} 
                          standardization={exp.dates.startDate.standardization}
                          confidence={exp.dates.startDate.confidence}
                          isMissing={isMissingField(`workExperience[${index}].dates.startDate`)}
                        />
                        {' - '}
                        <StandardizedField 
                          value={exp.dates.current.value ? 'Present' : formatDate(exp.dates.endDate.value)} 
                          standardization={exp.dates.endDate.standardization}
                          confidence={exp.dates.endDate.confidence}
                          isMissing={isMissingField(`workExperience[${index}].dates.endDate`)}
                        />
                      </span>
                    </div>
                    
                    <div className="mt-1 flex items-center text-text">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      <StandardizedField 
                        value={exp.company.value} 
                        standardization={exp.company.standardization}
                        confidence={exp.company.confidence}
                        isMissing={isMissingField(`workExperience[${index}].company`)}
                      />
                    </div>
                    
                    {exp.location.value && (
                      <div className="mt-1 flex items-center text-text-muted text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <StandardizedField 
                          value={exp.location.value} 
                          standardization={exp.location.standardization}
                          confidence={exp.location.confidence}
                          isMissing={isMissingField(`workExperience[${index}].location`)}
                        />
                      </div>
                    )}
                    
                    {/* Responsibilities */}
                    {exp.responsibilities.value.length > 0 && (
                      <div className="mt-3 text-sm text-text">
                        <h5 className="font-medium text-text-muted mb-1">Responsibilities:</h5>
                        <ul className="list-disc list-inside space-y-1">
                          {exp.responsibilities.value.map((responsibility, idx) => (
                            <li key={idx}>
                              <StandardizedField 
                                value={responsibility} 
                                confidence={exp.responsibilities.confidence}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {/* Technologies */}
                    {exp.technologies.value.length > 0 && (
                      <div className="mt-3">
                        <h5 className="text-xs font-medium text-text-muted mb-1">Technologies:</h5>
                        <div className="flex flex-wrap gap-1">
                          {exp.technologies.value.map((tech, idx) => (
                            <span key={idx} className="inline-block px-2 py-0.5 bg-surface-2 dark:bg-surface-3 text-xs rounded">
                              <StandardizedField value={tech} confidence={exp.technologies.confidence} />
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Achievements */}
                    {exp.achievements.value.length > 0 && (
                      <div className="mt-3 text-sm text-text">
                        <h5 className="font-medium text-text-muted mb-1">Achievements:</h5>
                        <ul className="list-disc list-inside space-y-1">
                          {exp.achievements.value.map((achievement, idx) => (
                            <li key={idx}>
                              <StandardizedField value={achievement} confidence={exp.achievements.confidence} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                ))}
                
                {data.workExperience.length === 0 && (
                  <div className="text-text-muted italic text-center">No work experience was extracted from the resume</div>
                )}
              </ul>
            </dd>
          </div>

          {/* Education Section */}
          <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-3 gap-4 border-b border-border bg-surface-2 dark:bg-surface-3/30">
            <dt className="text-sm font-medium text-text-muted md:col-span-1">
              Education
            </dt>
            <dd className="mt-1 md:mt-0 md:col-span-2">
              <ul className="space-y-6">
                {data.education.map((edu, index) => (
                  <li key={index} className="border-l-2 border-secondary pl-4 -ml-4">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-baseline">
                      <h4 className="font-semibold text-lg text-text">
                        <StandardizedField 
                          value={`${edu.degree.value.value}${edu.field.value.value ? ' in ' + edu.field.value.value : ''}`} 
                          standardization={edu.degree.value.standardization || edu.field.value.standardization}
                          confidence={Math.max(edu.degree.value.confidence, edu.field.value.confidence)}
                          isMissing={isMissingField(`education[${index}].degree`) || isMissingField(`education[${index}].field`)}
                        />
                      </h4>
                      <span className="text-text-muted text-sm mt-1 md:mt-0">
                        {edu.dates.startDate.value && (
                          <>
                            <StandardizedField 
                              value={formatDate(edu.dates.startDate.value)} 
                              standardization={edu.dates.startDate.standardization}
                              confidence={edu.dates.startDate.confidence}
                              isMissing={isMissingField(`education[${index}].dates.startDate`)}
                            />
                            {' - '}
                          </>
                        )}
                        <StandardizedField 
                          value={edu.dates.current.value ? 'Present' : formatDate(edu.dates.endDate.value)} 
                          standardization={edu.dates.endDate.standardization}
                          confidence={edu.dates.endDate.confidence}
                          isMissing={isMissingField(`education[${index}].dates.endDate`)}
                        />
                      </span>
                    </div>
                    
                    {edu.institution.value && (
                      <div className="mt-1 flex items-center text-text">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                        <StandardizedField 
                          value={edu.institution.value} 
                          standardization={edu.institution.standardization}
                          confidence={edu.institution.confidence}
                          isMissing={isMissingField(`education[${index}].institution`)}
                        />
                      </div>
                    )}
                    
                    {edu.gpa.value && (
                      <div className="mt-1 flex items-center text-text-muted text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                        <span className="font-medium">GPA: </span>
                        <StandardizedField 
                          value={edu.gpa.value} 
                          standardization={edu.gpa.standardization}
                          confidence={edu.gpa.confidence}
                          isMissing={isMissingField(`education[${index}].gpa`)}
                        />
                      </div>
                    )}
                  </li>
                ))}
                
                {data.education.length === 0 && (
                  <div className="text-text-muted italic text-center">No education was extracted from the resume</div>
                )}
              </ul>
            </dd>
          </div>
          
          {/* Analyzed Sections Summary */}
          <div className="px-6 py-5 grid grid-cols-1 md:grid-cols-3 gap-4">
            <dt className="text-sm font-medium text-text-muted md:col-span-1">
              Resume Analysis
            </dt>
            <dd className="mt-1 md:mt-0 md:col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-surface p-4 rounded-lg shadow-sm border border-border">
                  <h5 className="font-medium text-text-muted mb-2 text-sm">Detected Sections</h5>
                  <div className="flex flex-wrap gap-2">
                    {data.detectedSections.map((section, idx) => (
                      <span key={idx} className="px-2 py-1 bg-primary/10 dark:bg-primary/20 text-primary dark:text-primary-foreground text-xs rounded-full border border-primary/20">
                        {section.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="bg-surface p-4 rounded-lg shadow-sm border border-border">
                  <h5 className="font-medium text-text-muted mb-2 text-sm">Confidence Levels</h5>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-text-muted">Overall Confidence:</span>
                      <span className="font-medium text-text">{Math.round(data.overallConfidence * 100)}%</span>
                    </div>
                    <div className="w-full bg-surface-3 rounded-full h-2">
                      <div 
                        className={`rounded-full h-2 ${
                          data.overallConfidence >= 0.8 
                            ? 'bg-success' 
                            : data.overallConfidence >= 0.5 
                              ? 'bg-warning' 
                              : 'bg-error'
                        }`} 
                        style={{ width: `${data.overallConfidence * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}