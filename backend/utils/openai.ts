import { OpenAI } from "https://esm.town/v/std/openai";
import { ParsedResume, ResumeParserOptions } from "../types/resume.ts";
import { generatePrompt } from "../prompts/resumePrompts.ts";

/**
 * Parse resume text using OpenAI and return structured data
 * 
 * @param resumeText The plain text of the resume to parse
 * @param options Optional parsing configuration
 * @returns Structured resume data with confidence scores
 */
export async function parseResumeWithAI(
  resumeText: string,
  options?: ResumeParserOptions
): Promise<any> {
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
          content: `You are a precise resume parser that extracts structured data from resumes. 
Always return valid JSON with confidence scores for each field.
If you're unsure about a field, provide a lower confidence score rather than making assumptions.
Standardize terminology where possible and indicate when standardization occurs.` 
        },
        { 
          role: "user", 
          content: prompt + "\n\nResume:\n" + resumeText
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.1,
      max_tokens: 4000,
    });
    
    // Parse and return the response
    const responseContent = completion.choices[0]?.message?.content;
    
    if (!responseContent) {
      throw new Error("Empty response from OpenAI");
    }
    
    // Parse JSON response
    const parsedData = JSON.parse(responseContent);
    
    return parsedData;
  } catch (error) {
    console.error("OpenAI parsing error:", error);
    throw new Error("Failed to parse resume with OpenAI: " + (error as Error).message);
  }
}

/**
 * Validate extracted data using OpenAI
 * 
 * @param data The extracted resume data to validate
 * @returns Validated resume data with confidence scores
 */
export async function validateResumeWithAI(data: any): Promise<any> {
  try {
    // Initialize OpenAI client
    const openai = new OpenAI();
    
    // Get validation prompt
    const prompt = generatePrompt('validate');
    
    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { 
          role: "system", 
          content: `You are a precise resume data validator. You check for inconsistencies,
standardize terminology, and ensure data quality. Always return valid JSON with updated confidence scores.`
        },
        { 
          role: "user", 
          content: prompt + "\n\nData:\n" + JSON.stringify(data)
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.1,
      max_tokens: 4000,
    });
    
    // Parse and return the response
    const responseContent = completion.choices[0]?.message?.content;
    
    if (!responseContent) {
      throw new Error("Empty validation response from OpenAI");
    }
    
    // Parse JSON response
    const validatedData = JSON.parse(responseContent);
    
    return validatedData;
  } catch (error) {
    console.error("OpenAI validation error:", error);
    throw new Error("Failed to validate resume with OpenAI: " + (error as Error).message);
  }
}

/**
 * Add confidence scores to extracted data using OpenAI
 * 
 * @param data The extracted resume data without confidence scores
 * @returns Resume data with confidence scores
 */
export async function addConfidenceScoresWithAI(data: any): Promise<any> {
  try {
    // Initialize OpenAI client
    const openai = new OpenAI();
    
    // Get confidence prompt
    const prompt = generatePrompt('confidence');
    
    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { 
          role: "system", 
          content: `You are a precise confidence scoring system for resume data.
You analyze each field and assign confidence scores between 0 and 1.
Always return valid JSON with confidence scores for every field.`
        },
        { 
          role: "user", 
          content: prompt + "\n\nData:\n" + JSON.stringify(data)
        }
      ],
      response_format: { type: "json_object" },
      temperature: 0.1,
      max_tokens: 4000,
    });
    
    // Parse and return the response
    const responseContent = completion.choices[0]?.message?.content;
    
    if (!responseContent) {
      throw new Error("Empty confidence scoring response from OpenAI");
    }
    
    // Parse JSON response
    const scoredData = JSON.parse(responseContent);
    
    return scoredData;
  } catch (error) {
    console.error("OpenAI confidence scoring error:", error);
    throw new Error("Failed to add confidence scores with OpenAI: " + (error as Error).message);
  }
}