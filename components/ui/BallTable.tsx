import React, { useRef, useEffect, useState, useCallback } from 'react';

interface BallTableProps {
  onHoleSelect?: (value: number) => void;
  selectedHole?: number | null;
  isAnimating?: boolean;
  onHolePositionsReady?: (positions: Map<number, { x: number; y: number }[]>) => void;
}

export const BallTable: React.FC<BallTableProps> = ({
  onHoleSelect,
  selectedHole,
  isAnimating = false,
  onHolePositionsReady,
}) => {
  // Criar grade 6x6 com valores de 1 a 6 distribuídos aleatoriamente
  // Cada valor aparece 6 vezes na grade, mas em posições aleatórias
  const createGrid = (): number[][] => {
    // Criar array com 36 valores: cada número de 1 a 6 aparece 6 vezes
    const allValues: number[] = [];
    for (let i = 1; i <= 6; i++) {
      for (let j = 0; j < 6; j++) {
        allValues.push(i);
      }
    }
    
    // Embaralhar o array
    for (let i = allValues.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [allValues[i], allValues[j]] = [allValues[j], allValues[i]];
    }
    
    // Criar grade 6x6 a partir do array embaralhado
    const grid: number[][] = [];
    for (let row = 0; row < 6; row++) {
      const rowValues: number[] = [];
      for (let col = 0; col < 6; col++) {
        rowValues.push(allValues[row * 6 + col]);
      }
      grid.push(rowValues);
    }
    
    return grid;
  };

  const [grid] = useState<number[][]>(createGrid());
  const holeRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  const updatePositions = useCallback(() => {
    const positions = new Map<number, { x: number; y: number }[]>();
    
    holeRefs.current.forEach((element, key) => {
      if (element) {
        const rect = element.getBoundingClientRect();
        const value = parseInt(key.split('-')[0]);
        
        if (!positions.has(value)) {
          positions.set(value, []);
        }
        
        positions.get(value)!.push({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    });

    if (positions.size > 0 && onHolePositionsReady) {
      onHolePositionsReady(positions);
    }
  }, [onHolePositionsReady]);

  useEffect(() => {
    // Aguardar um frame para garantir que o DOM está renderizado
    const timeoutId = setTimeout(() => {
      updatePositions();
    }, 100);
    
    const handleResize = () => {
      updatePositions();
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, [updatePositions]);

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="grid grid-cols-6 gap-2 md:gap-3">
        {grid.map((row, rowIndex) =>
          row.map((value, colIndex) => {
            const key = `${value}-${rowIndex}-${colIndex}`;
            const isSelected = selectedHole === value && isAnimating;
            
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
                  ref={(el) => {
                    if (el) {
                      holeRefs.current.set(key, el);
                    }
                  }}
                  className={`
                    absolute inset-2 md:inset-3
                    rounded-full
                    bg-gradient-radial from-gray-800 via-gray-900 to-black
                    shadow-[inset_0_0_20px_rgba(0,0,0,0.8),0_4px_8px_rgba(0,0,0,0.3)]
                    border-2 border-gray-700
                    transition-all duration-300
                    ${isSelected ? 'scale-110 ring-4 ring-primary-yellow' : ''}
                  `}
                  style={{
                    background: 'radial-gradient(circle at 30% 30%, rgba(100,100,100,0.3), rgba(0,0,0,0.9))',
                  }}
                >
                  {/* Valor monetário */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-bold text-xs md:text-sm lg:text-base drop-shadow-lg">
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

