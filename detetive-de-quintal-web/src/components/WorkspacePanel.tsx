import { useState, useEffect } from 'react';
import { Play, Terminal } from 'lucide-react';
import type { QueryExecResult } from 'sql.js';
import type { Level } from '../App';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeMirror from '@uiw/react-codemirror';
import { sql, SQLite } from '@codemirror/lang-sql';
import { keymap } from '@codemirror/view';
import { saveUserAnswer } from '../lib/storage';
import type { UserProgress } from '../lib/storage';

interface WorkspacePanelProps {
  level: Level | null;
  onRunQuery: (query: string) => void;
  results: QueryExecResult[] | null;
  error: string | null;
  currentUser?: UserProgress | null;
  onUserUpdate?: () => void;
}

export function WorkspacePanel({ level, onRunQuery, results, error, currentUser, onUserUpdate }: WorkspacePanelProps) {
  const [query, setQuery] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [showConclusion, setShowConclusion] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [isPartial, setIsPartial] = useState(false);

  const buildSqlSchema = () => {
    if (!level || !level.setupScript) return {};
    const schema: Record<string, string[]> = {};
    const regex = /CREATE TABLE (\w+) \(([\s\S]*?)\);/gi;
    let match;
    while ((match = regex.exec(level.setupScript)) !== null) {
      const tableName = match[1];
      const columnsText = match[2];
      const columns = columnsText.split(',').map(c => c.trim().split(' ')[0]).filter(c => c);
      schema[tableName] = columns;
    }
    return schema;
  };

  // Clear or load states when switching levels
  useEffect(() => {
    if (!results && !error) {
      setQuery('');
      
      // Load saved answer if it exists for this level
      if (currentUser && level && currentUser.answers[level.id]) {
        const savedAnswer = currentUser.answers[level.id];
        setUserAnswer(savedAnswer.answerText);
        setIsCorrect(savedAnswer.score === 1);
        setIsPartial(savedAnswer.isPartial);
        setShowConclusion(true);
      } else {
        setUserAnswer('');
        setShowConclusion(false);
        setIsCorrect(null);
        setIsPartial(false);
      }
    }
  }, [results, error, currentUser, level]);

  const extractConclusion = (content: string) => {
    const match = content.match(/\*\*🔎 Conclusão:?\*\*([\s\S]*)/i);
    return match ? match[1].trim() : "Nenhuma conclusão disponível.";
  };

  const conclusionText = level ? extractConclusion(level.content) : "";
  const solutionScript = level?.solutionScript || "";

  const checkAnswer = () => {
    // Pegar apenas a primeira linha da conclusão (onde fica a resposta)
    // para evitar pegar palavras em negrito da explicação
    const firstLineMatch = conclusionText.match(/> \*\*Caso encerrado!\*\*([^\n]+)/i);
    const targetText = firstLineMatch ? firstLineMatch[1] : conclusionText.split('\n')[0];

    // Extrair apenas as palavras em negrito dessa primeira linha
    const matches = [...targetText.matchAll(/\*\*([^*]+)\*\*/g)];
    const keywords = matches.map(m => m[1].toLowerCase().trim());

    const userText = userAnswer.toLowerCase();
    
    let correct = false;
    let partial = false;
    let score = 0;

    if (keywords.length === 0) {
      // Fallback if no keywords found
      correct = true;
      score = 1;
    } else {
      const matchedKeywords = keywords.filter(kw => userText.includes(kw));
      if (matchedKeywords.length === keywords.length) {
        correct = true;
        score = 1;
      } else if (matchedKeywords.length > 0 && matchedKeywords.length >= Math.ceil(keywords.length / 2)) {
        correct = false;
        partial = true;
        score = 0.5;
      }
    }
    
    setIsCorrect(correct);
    setIsPartial(partial);
    setShowConclusion(true);

    if (currentUser && level) {
      saveUserAnswer(currentUser.id, level.id, userAnswer, score, partial);
      if (onUserUpdate) onUserUpdate();
    }
  };

  const renderResults = () => {
    if (error) {
      return (
        <div className="error-message">
          <strong>Erro SQLite:</strong> {error}
        </div>
      );
    }

    if (!results) {
      return (
        <div className="empty-state">
          <Terminal size={48} opacity={0.2} />
          <p>Digite sua query SQL acima e clique em Executar (ou Ctrl+Enter)</p>
        </div>
      );
    }

    if (results.length === 0) {
      return (
        <div className="empty-state">
          <p>Sua query retornou 0 resultados.</p>
        </div>
      );
    }

    // Display the last result set (useful if user runs multiple statements)
    const result = results[results.length - 1];

    return (
      <table className="result-table">
        <thead>
          <tr>
            {result.columns.map((col: string, i: number) => (
              <th key={i}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {result.values.map((row: any[], rowIndex: number) => (
            <tr key={rowIndex}>
              {row.map((val: any, colIndex: number) => (
                <td key={colIndex}>{val !== null ? val.toString() : <em>NULL</em>}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="workspace-panel">
      <div className="editor-section">
        <div className="section-header">
          <span>Editor SQL</span>
          <button 
            className="run-button" 
            onClick={() => onRunQuery(query)}
            disabled={!query.trim()}
          >
            <Play size={16} fill="currentColor" />
            Executar
          </button>
        </div>
        <div className="sql-editor-container" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <CodeMirror
            value={query}
            height="100%"
            extensions={[
              sql({ dialect: SQLite, schema: buildSqlSchema() }),
              keymap.of([{
                key: "Mod-Enter",
                run: () => {
                  onRunQuery(query);
                  return true;
                }
              }])
            ]}
            onChange={(value) => setQuery(value)}
            basicSetup={{
              lineNumbers: true,
              highlightActiveLineGutter: true,
              highlightActiveLine: true,
              autocompletion: true,
            }}
            style={{ height: '100%', flex: 1, overflow: 'auto', fontSize: '0.95rem', fontFamily: 'var(--font-mono)' }}
          />
        </div>
      </div>
      
      <div className="results-section">
        <div className="section-header">
          <span>Resultados</span>
          {results && results.length > 0 && (
            <span>{results[results.length - 1].values.length} linhas retornadas</span>
          )}
        </div>
        <div className="results-content">
          {renderResults()}
        </div>
      </div>

      <div className="answer-section">
        <div className="section-header">
          <span>Solução do Caso</span>
        </div>
        <div className="answer-content">
          {!showConclusion ? (
            <div className="answer-form">
              <input 
                type="text" 
                value={userAnswer}
                onChange={(e) => {
                  setUserAnswer(e.target.value);
                  setIsCorrect(null); // Reset error state on typing
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') checkAnswer();
                }}
                placeholder="Qual é a sua resposta final para o mistério?"
                className={`answer-input ${isCorrect === false ? 'error-border' : ''}`}
              />
              <button 
                onClick={checkAnswer}
                disabled={!userAnswer.trim()}
                className="reveal-button"
              >
                Resolver Mistério
              </button>
              
              {isCorrect === false && !isPartial && (
                <div style={{color: 'var(--error)', fontWeight: 'bold', marginLeft: '1rem'}}>
                  ❌ Errado! Tente novamente.
                </div>
              )}
              {isPartial && (
                <div style={{color: '#eab308', fontWeight: 'bold', marginLeft: '1rem'}}>
                  ⚠️ Quase lá! Você acertou uma parte.
                </div>
              )}
              
              <button 
                onClick={() => {
                  setIsCorrect(false);
                  setIsPartial(false);
                  setShowConclusion(true);
                  if (currentUser && level) {
                    saveUserAnswer(currentUser.id, level.id, userAnswer, 0, false);
                    if (onUserUpdate) onUserUpdate();
                  }
                }}
                className="reveal-button secondary"
                style={{marginLeft: 'auto'}}
                title="Desistir e ver a solução"
              >
                Desistir
              </button>
            </div>
          ) : (
            <div className="conclusion-reveal">
              {isCorrect ? (
                <div className="success-banner">🎉 Parabéns! Você desvendou o mistério! (+1 pt)</div>
              ) : isPartial ? (
                <div style={{ backgroundColor: 'rgba(234, 179, 8, 0.2)', color: '#ca8a04', padding: '1rem', borderRadius: '0.5rem', marginBottom: '1rem', fontWeight: 'bold', border: '1px solid rgba(234, 179, 8, 0.5)' }}>
                  ⚠️ Quase lá! Você ganhou pontuação parcial. (+0.5 pts) Veja a solução abaixo:
                </div>
              ) : (
                <div className="failure-banner">⚠️ Você desistiu ou errou. (+0 pts) Veja a solução abaixo:</div>
              )}
              <div className="markdown-body">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {`> **Sua resposta:** ${userAnswer || "*(Desistiu)*"}\n\n**Query Oficial Esperada:**\n\`\`\`sql\n${solutionScript}\n\`\`\`\n\n**Conclusão Oficial:**\n${conclusionText}`}
                </ReactMarkdown>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
