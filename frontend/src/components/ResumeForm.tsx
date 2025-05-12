'use client';

import { useState } from 'react';

interface ResumeFormProps {
  onSubmit: (resumeText: string) => void;
  isLoading: boolean;
}

export default function ResumeForm({ onSubmit, isLoading }: ResumeFormProps) {
  const [resumeText, setResumeText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (resumeText.trim()) {
      onSubmit(resumeText);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="mb-6">
        <label htmlFor="resumeText" className="block text-sm font-medium mb-2 text-text-muted">
          Paste your resume text below
        </label>
        <textarea
          id="resumeText"
          name="resumeText"
          rows={12}
          className="form-control w-full rounded-md p-4 text-sm shadow-md"
          placeholder="Copy and paste your resume text here..."
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          disabled={isLoading}
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading || !resumeText.trim()}
          className={`btn-primary px-6 py-2.5 text-sm font-semibold rounded-full shadow-sm ${
            isLoading || !resumeText.trim() ? 'opacity-50' : ''
          }`}
        >
          {isLoading ? 'Processing...' : 'Parse Resume'}
        </button>
      </div>
    </form>
  );
}