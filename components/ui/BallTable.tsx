import React, { useRef, useEffect, useState, useCallback } from 'react';

interface BallTableProps {
  grid: number[][];
  activeKey: string | null;
  onHoleSelect?: (value: number) => void;
}

export const BallTable: React.FC<BallTableProps> = ({
  grid,
  activeKey,
  onHoleSelect,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="grid grid-cols-5 gap-2 md:gap-3">
        {grid.map((row, rowIndex) =>
          row.map((value, colIndex) => {
            const key = `${value}-${rowIndex}-${colIndex}`;
            const isActive = activeKey === key;
            
            return (
              <div
                key={key}
                className="relative aspect-square"
                onClick={() => onHoleSelect?.(value)}
              >
                {/* Quadrado com borda */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg border-2 border-gray-400 shadow-md" />
                
                {/* Buraco com profundidade */}
                <div
                  className={`
                    absolute inset-2 md:inset-3
                    rounded-full
                    bg-gradient-radial from-gray-800 via-gray-900 to-black
                    shadow-[inset_0_0_20px_rgba(0,0,0,0.8),0_4px_8px_rgba(0,0,0,0.3)]
                    border-2 border-gray-700
                    transition-all duration-100
                    ${isActive ? 'scale-110 ring-4 ring-primary-yellow bg-primary-yellow shadow-[0_0_30px_rgba(255,255,0,0.6)]' : ''}
                  `}
                  style={{
                    background: isActive 
                      ? 'radial-gradient(circle at 30% 30%, #ffd700, #b8860b)' 
                      : 'radial-gradient(circle at 30% 30%, rgba(100,100,100,0.3), rgba(0,0,0,0.9))',
                  }}
                >
                  {/* Valor monetário */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`font-bold text-xs md:text-sm lg:text-base drop-shadow-lg ${isActive ? 'text-black' : 'text-white'}`}>
                      R$ {value},00
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

