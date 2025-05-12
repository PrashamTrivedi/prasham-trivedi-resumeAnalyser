/**
 * Generate prompts for different resume parsing operations
 * 
 * @param type The type of prompt to generate
 * @returns The prompt text
 */
export function generatePrompt(type: 'extract' | 'validate' | 'confidence'): string {
  switch (type) {
    case 'extract':
      return `Extract structured data from the following resume. 
Return a JSON object with the following sections:
- contactDetails: name, email, phone, linkedin, github, website
- skills: array of skill categories each with a name and items array
- workExperience: array of positions with company, role, duration, responsibilities
- education: array of education entries with degree, institution, location, duration

For each field, include a confidence score from 0-1 indicating your certainty.
Standardize degree names to common formats (e.g., "BS" to "Bachelor of Science").
DO NOT fabricate or assume data not present in the resume.`;
      
    case 'validate':
      return `Validate the following resume data for consistency and accuracy.
Identify any fields that seem incorrect or inconsistent and flag them.
Standardize terminology where appropriate (e.g., degree names, job titles).
Return the validated and standardized data in the same format.`;
      
    case 'confidence':
      return `Analyze the following resume data and add confidence scores for each field.
Rate each field on a scale from 0 to 1, where:
- 0.9-1.0: Very high confidence (clear, unambiguous data)
- 0.7-0.9: High confidence (likely correct, but could have minor issues)
- 0.5-0.7: Medium confidence (possibly correct, but some uncertainty)
- 0.3-0.5: Low confidence (significant uncertainty)
- 0.0-0.3: Very low confidence (likely incorrect or missing data)
Return the data with confidence scores added to each field.`;
      
    default:
      return '';
  }
}