import { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { StoryPanel } from './components/StoryPanel';
import { WorkspacePanel } from './components/WorkspacePanel';
import { initDb, executeQuery } from './lib/db';
import levelsData from './data/levels.json';

export type Level = typeof levelsData[0];

function App() {
  const [currentLevel, setCurrentLevel] = useState<Level | null>(null);
  const [dbReady, setDbReady] = useState(false);
  const [results, setResults] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Initialize the SQLite database engine
    initDb().then(() => {
      setDbReady(true);
      // Select the first level by default
      if (levelsData.length > 0) {
        handleLevelSelect(levelsData[0]);
      }
    });
  }, []);

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

  if (!dbReady) {
    return <div className="empty-state">Carregando Motor SQL...</div>;
  }

  return (
    <div className="app-container">
      <Sidebar 
        levels={levelsData} 
        currentLevel={currentLevel} 
        onSelectLevel={handleLevelSelect} 
      />
      
      <main className="main-content">
        <StoryPanel level={currentLevel} />
        <WorkspacePanel 
          level={currentLevel}
          onRunQuery={handleRunQuery} 
          results={results} 
          error={error} 
        />
      </main>
    </div>
  );
}

export default App;
