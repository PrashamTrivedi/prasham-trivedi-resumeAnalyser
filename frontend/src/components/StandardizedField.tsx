'use client';

import React, { useState, useRef, useEffect } from 'react';

interface StandardizedFieldProps {
  value: string | number | null | boolean | Array<any>;
  standardization?: string | null;
  confidence?: number;
  isMissing?: boolean;
  className?: string;
}

export default function StandardizedField({
  value,
  standardization,
  confidence = 0,
  isMissing = false,
  className = '',
}: StandardizedFieldProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const fieldRef = useRef<HTMLSpanElement>(null);
  
  // Format confidence as percentage
  const confidencePercentage = Math.round((confidence || 0) * 100);
  
  // Determine color based on confidence
  const getConfidenceColor = () => {
    if (confidencePercentage >= 80) return 'text-success';
    if (confidencePercentage >= 50) return 'text-warning';
    return 'text-error';
  };
  
  // Handle arrays and other value types
  const displayValue = Array.isArray(value) 
    ? value.length > 0 
      ? value.join(', ') 
      : '(None provided)'
    : value === '' || value === null 
      ? '(Not provided)' 
      : String(value);
  
  // Determine if field has standardization info
  const hasStandardization = standardization !== null && standardization !== undefined && standardization !== '';
  
  // Determine styling based on whether this is a missing field
  const missingStyle = isMissing ? 'border-dashed border-2 border-error bg-error/10 px-2 rounded' : '';

  // Position tooltip when it's shown
  useEffect(() => {
    if (showTooltip && tooltipRef.current && fieldRef.current) {
      // Get field dimensions and position
      const fieldRect = fieldRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      // Calculate position to keep tooltip within viewport
      let left = 0;
      const windowWidth = window.innerWidth;
      
      // Centered on field by default
      left = -tooltipRect.width / 2 + fieldRect.width / 2;
      
      // Adjust if off-screen
      if (fieldRect.left + left < 0) {
        left = -fieldRect.left + 10;
      } else if (fieldRect.left + left + tooltipRect.width > windowWidth) {
        left = windowWidth - fieldRect.left - tooltipRect.width - 10;
      }
      
      // Apply position
      tooltipRef.current.style.left = `${left}px`;
    }
  }, [showTooltip]);
  
  return (
    <span 
      ref={fieldRef}
      className={`relative inline-block ${className} ${missingStyle}`}
      onMouseEnter={() => hasStandardization && setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      onFocus={() => hasStandardization && setShowTooltip(true)}
      onBlur={() => setShowTooltip(false)}
      tabIndex={hasStandardization ? 0 : undefined}
      role={hasStandardization ? "button" : undefined}
      aria-describedby={hasStandardization ? "standardization-tooltip" : undefined}
    >
      <span className={`${hasStandardization ? 'border-b border-dotted border-primary cursor-help' : ''}`}>
        {displayValue}
        {hasStandardization && standardization !== displayValue && (
          <span className="ml-1 text-primary">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 20 20" 
              fill="currentColor" 
              className="inline w-4 h-4"
              aria-hidden="true"
            >
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
            </svg>
          </span>
        )}
      </span>
      
      {/* Confidence indicator (small dot with color) */}
      {confidence > 50 && (
        <span 
          className={`absolute -top-1 -right-2 text-lg font-bold ${getConfidenceColor()}`}
          title={`Confidence: ${confidencePercentage}%`}
          aria-hidden="true"
        >
          •
        </span>
      )}
      
      {/* Tooltip */}
      {showTooltip && hasStandardization && standardization !== displayValue && (
        <div 
          ref={tooltipRef}
          id="standardization-tooltip"
          role="tooltip"
          className="absolute z-50 bottom-full mb-2 p-2 bg-surface-3 dark:bg-gray-800 text-text dark:text-white text-xs rounded shadow-lg max-w-xs whitespace-normal"
        >
          <div className="font-bold mb-1">Standardization:</div>
          <div>{standardization}</div>
          {confidence > 0 && (
            <div className="mt-1 pt-1 border-t border-border">
              <span className={getConfidenceColor()}>Confidence: {confidencePercentage}%</span>
            </div>
          )}
          <div 
            className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-8 border-solid border-transparent border-t-surface-3 dark:border-t-gray-800" 
            aria-hidden="true"
          ></div>
        </div>
      )}
    </span>
  );
}