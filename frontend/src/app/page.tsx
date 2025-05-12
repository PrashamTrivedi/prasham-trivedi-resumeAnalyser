'use client';

import { useState } from 'react';
import ResumeForm from '@/components/ResumeForm';
import EnhancedResumeResults from '@/components/EnhancedResumeResults';
import LoadingSpinner from '@/components/LoadingSpinner';
import ErrorMessage from '@/components/ErrorMessage';
import { parseResume } from '@/services/resumeService';
import { ApiResponse } from '@/types/apiResponse';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);

  const handleSubmit = async (resumeText: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await parseResume(resumeText);
      setApiResponse(response);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to parse resume. Please try again.');
      setApiResponse(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <header className="border-b border-border shadow-md">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-md bg-gradient-to-r from-primary to-secondary flex items-center justify-center shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold">Resume Analyzer</h1>
          </div>
          <div className="text-sm text-text-muted hidden sm:block">
            Powered by AI and Natural Language Processing
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="resume-container p-6 sm:p-8 mb-8 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-6">Paste your resume content below</h2>
          <ResumeForm onSubmit={handleSubmit} isLoading={isLoading} />
          
          {isLoading && <LoadingSpinner />}
          
          {error && <ErrorMessage message={error} />}
        </div>
        
        {apiResponse && !isLoading && !error && (
          <EnhancedResumeResults apiResponse={apiResponse} />
        )}
      </main>
      
      <footer className="border-t border-border py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center sm:flex-row sm:justify-between">
            <p className="text-sm text-text-muted order-2 sm:order-1 mt-4 sm:mt-0">
              © {new Date().getFullYear()} Resume Analyzer - Advanced Resume Parsing
            </p>
            <div className="flex space-x-6 order-1 sm:order-2">
              <a href="#" className="text-text-muted hover:text-text transition-colors">
                About
              </a>
              <a href="#" className="text-text-muted hover:text-text transition-colors">
                Privacy
              </a>
              <a href="#" className="text-text-muted hover:text-text transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}