import { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronRight, X } from 'lucide-react';
import type { Level } from '../App';

interface SidebarProps {
  levels: Level[];
  currentLevel: Level | null;
  onSelectLevel: (level: Level) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ levels, currentLevel, onSelectLevel, isOpen, onClose }: SidebarProps) {
  const [expandedSeasons, setExpandedSeasons] = useState<Record<string, boolean>>({});

  // Group levels by season
  const groupedLevels = levels.reduce((acc, level) => {
    if (!acc[level.season]) {
      acc[level.season] = [];
    }
    acc[level.season].push(level);
    return acc;
  }, {} as Record<string, Level[]>);

  useEffect(() => {
    if (currentLevel) {
      setExpandedSeasons(prev => ({ ...prev, [currentLevel.season]: true }));
    }
  }, [currentLevel]);

  const toggleSeason = (season: string) => {
    setExpandedSeasons(prev => ({ ...prev, [season]: !prev[season] }));
  };

  return (
    <aside className={`sidebar ${isOpen ? '' : 'closed'}`}>
      <div className="sidebar-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem' }}>
          <Search size={20} className="text-accent" color="var(--accent)" />
          Detetive
        </h1>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex' }} title="Fechar menu">
          <X size={20} />
        </button>
      </div>
      
      <div className="sidebar-content">
        {Object.entries(groupedLevels).map(([season, seasonLevels]) => {
          const isExpanded = expandedSeasons[season];
          return (
            <div key={season} className="season-group">
              <button 
                className="season-title-btn" 
                onClick={() => toggleSeason(season)}
              >
                <span>{season}</span>
                {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
              </button>
              
              {isExpanded && (
                <div className="level-list">
                  {seasonLevels.map(level => (
                    <button
                      key={level.id}
                      className={`level-button ${currentLevel?.id === level.id ? 'active' : ''}`}
                      onClick={() => onSelectLevel(level)}
                    >
                      <span className="truncate">{level.title}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
