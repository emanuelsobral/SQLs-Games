import { useState, useEffect } from 'react';
import { Search, ChevronDown, ChevronRight, X, User, CheckCircle, AlertTriangle, XCircle, LogOut } from 'lucide-react';
import type { Level } from '../App';
import type { UserProgress } from '../lib/storage';

interface SidebarProps {
  levels: Level[];
  currentLevel: Level | null;
  onSelectLevel: (level: Level) => void;
  isOpen: boolean;
  onClose: () => void;
  user?: UserProgress | null;
  onGoAdmin?: () => void;
  onLogout?: () => void;
}

export function Sidebar({ levels, currentLevel, onSelectLevel, isOpen, onClose, user, onGoAdmin, onLogout }: SidebarProps) {
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

      {user && (
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: 'rgba(0,0,0,0.2)' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <User size={20} color="white" />
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--accent)' }}>{user.totalScore} pts</div>
          </div>
          {onLogout && (
            <button 
              onClick={onLogout}
              style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer', padding: '0.25rem' }}
              title="Sair / Trocar de Temporada"
              onMouseOver={e => e.currentTarget.style.color = 'var(--error)'}
              onMouseOut={e => e.currentTarget.style.color = 'rgba(255,255,255,0.6)'}
            >
              <LogOut size={18} />
            </button>
          )}
        </div>
      )}
      
      <div className="sidebar-content" style={{ flex: 1 }}>
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
                  {seasonLevels.map(level => {
                    const answered = user?.answers[level.id];
                    const score = answered ? answered.score : 0;
                    return (
                      <button
                        key={level.id}
                        className={`level-button ${currentLevel?.id === level.id ? 'active' : ''}`}
                        onClick={() => onSelectLevel(level)}
                        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                      >
                        <span>{level.title}</span>
                        {answered && (
                          <span style={{ 
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            padding: '4px', 
                            borderRadius: '50%',
                            backgroundColor: score === 1 ? 'rgba(16, 185, 129, 0.2)' : score > 0 ? 'rgba(234, 179, 8, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                            color: score === 1 ? '#10b981' : score > 0 ? '#eab308' : '#ef4444',
                            marginLeft: '0.5rem'
                          }} title={score === 1 ? "Correto (1 pt)" : score > 0 ? "Parcial (0.5 pts)" : "Errado (0 pts)"}>
                            {score === 1 ? <CheckCircle size={14} /> : score > 0 ? <AlertTriangle size={14} /> : <XCircle size={14} />}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      {onGoAdmin && (
        <div style={{ padding: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <button 
            onClick={onGoAdmin}
            style={{ width: '100%', background: 'none', border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.6)', padding: '0.5rem', borderRadius: '0.5rem', cursor: 'pointer', transition: 'all 0.2s' }}
            onMouseOver={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'white'; }}
            onMouseOut={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
          >
            Painel Admin
          </button>
        </div>
      )}
    </aside>
  );
}
