import { OpenAI } from "https://esm.town/v/std/openai";
import { ResumeData } from "../types/resume.ts";
import { generatePrompt } from "../prompts/resumePrompts.ts";

/**
 * Parse resume text using OpenAI and return structured data
 * 
 * @param resumeText The plain text of the resume to parse
 * @returns Structured resume data with confidence scores
 */
export async function parseResumeWithAI(resumeText: string): Promise<ResumeData> {
  try {
    // Initialize OpenAI client (uses API key from environment)
    const openai = new OpenAI();
    
    // Get extraction prompt
    const prompt = generatePrompt('extract');
    
    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // Using Val Town's available model
      messages: [
        { 
          role: "system", 
          content: "You are a precise resume parser that extracts structured data from resumes. Always return valid JSON." 
        },
        { 
          role: "user", 
          content: prompt + "\n\nResume:\n" + resumeText
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.1,
      max_tokens: 2000,
    });
    
    // Parse and return the response
    const responseContent = completion.choices[0]?.message?.content;
    
    if (!responseContent) {
      throw new Error("Empty response from OpenAI");
    }
    
    // Parse JSON response
    const parsedData = JSON.parse(responseContent) as ResumeData;
    
    return parsedData;
  } catch (error) {
    console.error("OpenAI parsing error:", error);
    throw new Error("Failed to parse resume with OpenAI: " + (error as Error).message);
  }
}