import React from 'react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-lg font-bold text-primary-teal mb-2">
          {label}
        </label>
      )}
      <input
        className={`w-full px-4 py-3 text-lg rounded-2xl border-4 border-primary-yellow focus:outline-none focus:border-primary-pink transition-colors ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-2 text-sm text-red-500 font-semibold">{error}</p>
      )}
    </div>
  );
};

