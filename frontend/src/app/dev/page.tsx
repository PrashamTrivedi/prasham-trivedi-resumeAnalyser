'use client';

import EnhancedResumeResults from '@/components/EnhancedResumeResults';
import { sampleResumeData } from '@/utils/sampleData';

export default function DevPage() {
  return (
    <div className="min-h-screen gradient-bg p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Development Preview</h1>
          <p className="text-gray-600">
            This page shows a preview of the EnhancedResumeResults component with sample data.
          </p>
        </div>
        
        <EnhancedResumeResults apiResponse={sampleResumeData} />
      </div>
      
      <style jsx global>{`
        .gradient-bg {
          background-color: #f9fafb;
          background-image: radial-gradient(#e5e7eb 1px, transparent 1px);
          background-size: 20px 20px;
        }
        
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}