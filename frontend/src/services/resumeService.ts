import { ApiResponse } from '@/types/apiResponse';

const API_URL = 'https://prashamhtrivedi-resumeparser.val.run/api/parse';

/**
 * Parse a resume by sending the text to the API
 * @param resumeText The text content of the resume
 * @returns Parsed resume data
 */
export async function parseResume(resumeText: string): Promise<ApiResponse> {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ resumeText }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Unknown error' }));
      throw new Error(errorData.message || `Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error parsing resume:', error);
    throw error;
  }
}