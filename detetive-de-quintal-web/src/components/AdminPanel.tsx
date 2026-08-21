import React, { useState, useMemo, Fragment } from 'react';
import { Shield, Download, Trash2, ArrowLeft, ChevronDown, ChevronRight, Edit2, Check, X } from 'lucide-react';
import { getAllUsers, clearAllUsers, updateUserName, deleteUser } from '../lib/storage';
import type { UserProgress } from '../lib/storage';

interface AdminPanelProps {
  onBack: () => void;
}

export function AdminPanel({ onBack }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [users, setUsers] = useState<UserProgress[]>([]);
  
  const [selectedSeason, setSelectedSeason] = useState<string>('');
  const [expandedUsers, setExpandedUsers] = useState<Record<string, boolean>>({});
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editNameValue, setEditNameValue] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'DadosGTO') {
      setIsAuthenticated(true);
      const allUsers = getAllUsers();
      setUsers(allUsers);
      const seasons = Array.from(new Set(allUsers.map(u => u.season)));
      if (seasons.length > 0) setSelectedSeason(seasons[0]);
      setError('');
    } else {
      setError('Senha incorreta!');
    }
  };

  const availableSeasons = useMemo(() => Array.from(new Set(users.map(u => u.season))), [users]);
  const filteredUsers = users.filter(u => u.season === selectedSeason);

  const handleClearData = () => {
    if (window.confirm('TEM CERTEZA? Isso vai apagar o progresso de TODOS os alunos de TODAS as temporadas!')) {
      clearAllUsers();
      setUsers([]);
      setSelectedSeason('');
    }
  };

  const handleDeleteUser = (id: string, name: string) => {
    if (window.confirm(`Tem certeza que deseja apagar o progresso do aluno ${name}?`)) {
      if (deleteUser(id)) {
        setUsers(getAllUsers());
      }
    }
  };

  const startEditing = (user: UserProgress) => {
    setEditingUserId(user.id);
    setEditNameValue(user.name);
  };

  const saveEdit = (id: string) => {
    if (editNameValue.trim() && updateUserName(id, editNameValue.trim())) {
      setUsers(getAllUsers());
    }
    setEditingUserId(null);
  };

  const toggleExpand = (id: string) => {
    setExpandedUsers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleExportCSV = () => {
    if (users.length === 0) return;

    // We use dynamic import for xlsx to avoid loading it until needed, or just import at top.
    // Since I already added it, I will just require it here to avoid top-level import issues if any.
    import('xlsx').then(XLSX => {
      const workbook = XLSX.utils.book_new();

      availableSeasons.forEach(season => {
        const seasonUsers = users.filter(u => u.season === season);
        if (seasonUsers.length === 0) return;

        const allLevels = new Set<string>();
        seasonUsers.forEach(user => {
          Object.keys(user.answers).forEach(levelId => allLevels.add(levelId));
        });
        const levelsArray = Array.from(allLevels).sort();

        const rows = seasonUsers.map(user => {
          const rowData: Record<string, any> = {
            'Nome': user.name,
            'Temporada': user.season,
            'Pontuação Total': user.totalScore
          };

          levelsArray.forEach(levelId => {
            const answer = user.answers[levelId];
            if (answer) {
              rowData[`Nível: ${levelId}`] = `[${answer.score}pts] ${answer.answerText}`;
            } else {
              rowData[`Nível: ${levelId}`] = '';
            }
          });

          return rowData;
        });

        const worksheet = XLSX.utils.json_to_sheet(rows);
        const safeSeasonName = season.substring(0, 31).replace(/[?*:\/\\]/g, '');
        XLSX.utils.book_append_sheet(workbook, worksheet, safeSeasonName || "Geral");
      });

      XLSX.writeFile(workbook, `detetive_resultados_${new Date().toISOString().split('T')[0]}.xlsx`);
    });
  };

  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', backgroundColor: 'var(--bg-color)', padding: '2rem' }}>
        <button onClick={onBack} style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)', fontWeight: 'bold' }}>
          <ArrowLeft size={20} /> Voltar
        </button>

        <div style={{ backgroundColor: 'var(--panel-bg)', padding: '3rem', borderRadius: '1rem', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', maxWidth: '400px', width: '100%', textAlign: 'center' }}>
          <Shield size={48} color="var(--accent)" style={{ marginBottom: '1.5rem' }} />
          <h2 style={{ marginBottom: '1.5rem' }}>Acesso Restrito</h2>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Digite a senha..."
              required
              style={{ padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--border)', fontSize: '1rem', fontFamily: 'var(--font-sans)', outline: 'none' }}
            />
            {error && <span style={{ color: 'var(--error)', fontSize: '0.9rem' }}>{error}</span>}
            <button type="submit" style={{ backgroundColor: 'var(--accent)', color: 'white', border: 'none', padding: '0.75rem', borderRadius: '0.5rem', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}>
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: 'var(--bg-color)' }}>
      <header style={{ padding: '1.5rem', backgroundColor: 'var(--panel-bg)', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-main)', fontWeight: 'bold' }}>
            <ArrowLeft size={20} /> Sair
          </button>
          <h1 style={{ margin: 0, fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Shield size={24} color="var(--accent)" />
            Painel do Professor
          </h1>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={handleExportCSV} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--success)', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer' }}>
            <Download size={18} /> Exportar Excel
          </button>
          <button onClick={handleClearData} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--error)', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontWeight: 'bold', cursor: 'pointer' }}>
            <Trash2 size={18} /> Limpar Tudo
          </button>
        </div>
      </header>

      <div style={{ padding: '1rem 2rem', borderBottom: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto' }}>
          {availableSeasons.map(season => (
            <button
              key={season}
              onClick={() => setSelectedSeason(season)}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                border: selectedSeason === season ? '2px solid var(--accent)' : '1px solid var(--border)',
                backgroundColor: selectedSeason === season ? 'rgba(236, 112, 0, 0.1)' : 'var(--panel-bg)',
                color: selectedSeason === season ? 'var(--accent)' : 'var(--text-main)',
                fontWeight: selectedSeason === season ? 'bold' : 'normal',
                cursor: 'pointer'
              }}
            >
              {season}
            </button>
          ))}
          {availableSeasons.length === 0 && (
            <span style={{ color: 'var(--text-muted)' }}>Nenhuma temporada registrada.</span>
          )}
        </div>
      </div>

      <main style={{ flex: 1, padding: '2rem', overflow: 'auto' }}>
        <div style={{ backgroundColor: 'var(--panel-bg)', borderRadius: '0.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#f8fafc', borderBottom: '2px solid var(--border)' }}>
              <tr>
                <th style={{ width: '40px', padding: '1rem' }}></th>
                <th style={{ padding: '1rem', fontWeight: 'bold' }}>Nome do Aluno</th>
                <th style={{ padding: '1rem', fontWeight: 'bold' }}>Pontuação Total</th>
                <th style={{ padding: '1rem', fontWeight: 'bold' }}>Níveis</th>
                <th style={{ padding: '1rem', fontWeight: 'bold', textAlign: 'right' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                    Nenhum aluno nesta temporada.
                  </td>
                </tr>
              ) : (
                filteredUsers.map(user => (
                  <Fragment key={user.id}>
                    <tr style={{ borderBottom: expandedUsers[user.id] ? 'none' : '1px solid var(--border)', backgroundColor: expandedUsers[user.id] ? '#fafafa' : 'transparent' }}>
                      <td style={{ padding: '1rem', cursor: 'pointer' }} onClick={() => toggleExpand(user.id)}>
                        {expandedUsers[user.id] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                      </td>
                      <td style={{ padding: '1rem' }}>
                        {editingUserId === user.id ? (
                          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            <input 
                              value={editNameValue} 
                              onChange={e => setEditNameValue(e.target.value)}
                              style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', border: '1px solid var(--accent)', outline: 'none' }}
                              autoFocus
                              onKeyDown={e => e.key === 'Enter' && saveEdit(user.id)}
                            />
                            <button onClick={() => saveEdit(user.id)} style={{ background: 'none', border: 'none', color: 'var(--success)', cursor: 'pointer' }}><Check size={16} /></button>
                            <button onClick={() => setEditingUserId(null)} style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer' }}><X size={16} /></button>
                          </div>
                        ) : (
                          <span style={{ fontWeight: 'bold' }}>{user.name}</span>
                        )}
                      </td>
                      <td style={{ padding: '1rem', color: 'var(--accent)', fontWeight: 'bold', fontSize: '1.1rem' }}>
                        {user.totalScore} pts
                      </td>
                      <td style={{ padding: '1rem', color: 'var(--text-muted)' }}>
                        {Object.keys(user.answers).length} concluídos
                      </td>
                      <td style={{ padding: '1rem', textAlign: 'right' }}>
                        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                          <button onClick={() => startEditing(user)} title="Editar Nome" style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', padding: '4px' }}>
                            <Edit2 size={16} />
                          </button>
                          <button onClick={() => handleDeleteUser(user.id, user.name)} title="Excluir Aluno" style={{ background: 'none', border: 'none', color: 'var(--error)', cursor: 'pointer', padding: '4px' }}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedUsers[user.id] && (
                      <tr style={{ borderBottom: '1px solid var(--border)', backgroundColor: '#fafafa' }}>
                        <td></td>
                        <td colSpan={4} style={{ padding: '0 1rem 1rem 1rem' }}>
                          <div style={{ backgroundColor: 'white', border: '1px solid var(--border)', borderRadius: '0.5rem', padding: '1rem' }}>
                            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>Respostas Detalhadas:</h4>
                            {Object.entries(user.answers).length === 0 ? (
                              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Nenhuma resposta ainda.</span>
                            ) : (
                              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                {Object.entries(user.answers).map(([levelId, answer]) => (
                                  <li key={levelId} style={{ fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '0.25rem', borderBottom: '1px dashed var(--border)', paddingBottom: '0.5rem' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                      <span style={{ fontWeight: 'bold' }}>{levelId}</span>
                                      <span style={{ 
                                        fontWeight: 'bold', 
                                        color: answer.score === 1 ? '#10b981' : answer.score > 0 ? '#eab308' : '#ef4444' 
                                      }}>
                                        {answer.score} pts
                                      </span>
                                    </div>
                                    <div style={{ fontFamily: 'monospace', backgroundColor: '#f1f5f9', padding: '0.5rem', borderRadius: '4px', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                                      {answer.answerText || "(vazio)"}
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
