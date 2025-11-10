import React from 'react';

function ProgressBar({ percentage, label }) {
  const safePercentage = Math.min(100, Math.max(0, percentage || 0));
  
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between text-sm mb-1">
          <span className="text-gray-600">{label}</span>
          <span className="text-gray-900 font-medium">{safePercentage}%</span>
        </div>
      )}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-green-600 h-2 rounded-full transition-all duration-300" 
          style={{width: `${safePercentage}%`}}
        />
      </div>
    </div>
  );
}

export default ProgressBar;
