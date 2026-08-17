import { Search } from 'lucide-react';
import type { Level } from '../App';

interface SidebarProps {
  levels: Level[];
  currentLevel: Level | null;
  onSelectLevel: (level: Level) => void;
}

export function Sidebar({ levels, currentLevel, onSelectLevel }: SidebarProps) {
  // Group levels by season
  const groupedLevels = levels.reduce((acc, level) => {
    if (!acc[level.season]) {
      acc[level.season] = [];
    }
    acc[level.season].push(level);
    return acc;
  }, {} as Record<string, Level[]>);

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>
          <Search size={20} className="text-accent" />
          Detetive de Quintal
        </h1>
      </div>
      
      <div className="sidebar-content">
        {Object.entries(groupedLevels).map(([season, seasonLevels]) => (
          <div key={season} className="season-group">
            <h2 className="season-title">{season}</h2>
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
          </div>
        ))}
      </div>
    </aside>
  );
}
