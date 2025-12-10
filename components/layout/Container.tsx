import React from 'react';

export interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4 ${className}`}>
      <div className="max-w-4xl mx-auto">{children}</div>
    </div>
  );
};

