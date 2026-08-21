import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { StoryPanel } from './components/StoryPanel';
import { WorkspacePanel } from './components/WorkspacePanel';
import { StartScreen } from './components/StartScreen';
import { AdminPanel } from './components/AdminPanel';
import { initDb, executeQuery } from './lib/db';
import { getOrCreateUser, getUser } from './lib/storage';
import type { UserProgress } from './lib/storage';
import levelsData from './data/levels.json';
import { Menu, Shield } from 'lucide-react';
import { Group as PanelGroup, Panel, Separator as PanelResizeHandle } from 'react-resizable-panels';

export type Level = typeof levelsData[0];

// Extract unique seasons from data
const availableSeasons = Array.from(new Set(levelsData.map(l => l.season)));

function App() {
  const [currentScreen, setCurrentScreen] = useState<'start' | 'game' | 'admin'>('start');
  const [currentUser, setCurrentUser] = useState<UserProgress | null>(null);

  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [dbReady, setDbReady] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Filter levels for the chosen season
  const seasonLevels = currentUser 
    ? levelsData.filter(l => l.season === currentUser.season)
    : [];

  useEffect(() => {
    // Initialize the SQLite database engine
    initDb().then(() => {
      setDbReady(true);
    });
  }, []);

  // When user and season are selected, select the first level of that season
  useEffect(() => {
    if (currentScreen === 'game' && seasonLevels.length > 0 && !currentLevel) {
      handleLevelSelect(seasonLevels[0]);
    }
  }, [currentScreen, seasonLevels, currentLevel]);

  const handleStart = (name: string, season: string) => {
    const user = getOrCreateUser(name, season);
    setCurrentUser(user);
    setCurrentScreen('game');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentLevel(null);
    setCurrentScreen('start');
  };

  const handleLevelSelect = (level: Level) => {
    setCurrentLevel(level);
    setResults(null);
    setError(null);
    
    // Execute the setup script for this level to reset the database
    if (level.setupScript) {
      try {
        executeQuery(level.setupScript);
      } catch (err: any) {
        console.error("Setup script failed:", err);
      }
    }
  };

  const handleRunQuery = (query: string) => {
    if (!query.trim()) return;
    
    try {
      setError(null);
      const res = executeQuery(query);
      setResults(res);
    } catch (err: any) {
      setError(err.message);
      setResults(null);
    }
  };

  // Callback for WorkspacePanel to refresh user score
  const refreshUser = () => {
    if (currentUser) {
      const updated = getUser(currentUser.id);
      if (updated) setCurrentUser(updated);
    }
  };

  if (!dbReady) {
    return <div className="empty-state">Carregando Motor SQL...</div>;
  }

  if (currentScreen === 'start') {
    return (
      <div style={{ height: '100%', position: 'relative' }}>
        <button 
          onClick={() => setCurrentScreen('admin')}
          style={{ 
            position: 'absolute', 
            top: '1rem', 
            right: '1rem', 
            background: 'rgba(0,0,0,0.3)', 
            border: '1px solid rgba(255,255,255,0.2)', 
            color: 'white', 
            cursor: 'pointer', 
            padding: '0.5rem 1rem',
            borderRadius: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            transition: 'all 0.2s',
            zIndex: 10
          }}
          onMouseOver={e => e.currentTarget.style.background = 'rgba(0,0,0,0.5)'}
          onMouseOut={e => e.currentTarget.style.background = 'rgba(0,0,0,0.3)'}
          title="Acesso Admin"
        >
          <Shield size={16} />
          <span>Painel Admin</span>
        </button>
        <StartScreen onStart={handleStart} availableSeasons={availableSeasons} />
      </div>
    );
  }

  if (currentScreen === 'admin') {
    return <AdminPanel onBack={() => setCurrentScreen('start')} />;
  }

  return (
    <div className="app-container">
      <Sidebar 
        levels={seasonLevels} 
        currentLevel={currentLevel} 
        onSelectLevel={handleLevelSelect} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        user={currentUser}
        onGoAdmin={() => setCurrentScreen('admin')}
        onLogout={handleLogout}
      />
      
      <main className="main-content" style={{ position: 'relative', display: 'flex', width: '100%', height: '100%' }}>
        {!isSidebarOpen && (
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="floating-menu-btn"
            title="Abrir menu"
          >
            <Menu size={20} />
          </button>
        )}
        
        <PanelGroup orientation="horizontal" style={{ width: '100%', height: '100%' }}>
          <Panel defaultSize={40} minSize={20}>
            <StoryPanel level={currentLevel} />
          </Panel>
          
          <PanelResizeHandle className="resize-handle" />
          
          <Panel defaultSize={60} minSize={30}>
            <WorkspacePanel 
              level={currentLevel}
              onRunQuery={handleRunQuery} 
              results={results} 
              error={error}
              currentUser={currentUser}
              onUserUpdate={refreshUser}
            />
          </Panel>
        </PanelGroup>
      </main>
    </div>
  );
}

export default App;
