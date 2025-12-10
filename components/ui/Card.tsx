import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  selected?: boolean;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  selected = false,
  onClick,
}) => {
  const baseStyles =
    'border-4 rounded-3xl p-4 text-center transition-all duration-200';
  const selectedStyles = selected
    ? 'bg-gradient-to-r from-primary-purple-light to-primary-purple-dark border-primary-pink text-white transform scale-105'
    : 'bg-white border-primary-yellow hover:scale-105 hover:shadow-lg';

  return (
    <div
      className={`${baseStyles} ${selectedStyles} ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (onClick && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onClick();
        }
      }}
    >
      {children}
    </div>
  );
};

