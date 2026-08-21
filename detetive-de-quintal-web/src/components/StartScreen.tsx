import { useState } from 'react';
import { Search } from 'lucide-react';

interface StartScreenProps {
  onStart: (name: string, season: string) => void;
  availableSeasons: string[];
}

export function StartScreen({ onStart, availableSeasons }: StartScreenProps) {
  const [name, setName] = useState('');
  const [season, setSeason] = useState(availableSeasons[0] || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && season) {
      onStart(name.trim(), season);
    }
  };

  return (
    <div className="start-screen" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100%',
      backgroundColor: 'var(--bg-color)',
      color: 'var(--text-main)',
      padding: '2rem'
    }}>
      <div style={{
        backgroundColor: 'var(--panel-bg)',
        padding: '3rem',
        borderRadius: '1rem',
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
        maxWidth: '500px',
        width: '100%',
        textAlign: 'center'
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <Search size={48} color="var(--accent)" />
        </div>
        <h1 style={{ marginBottom: '0.5rem', fontSize: '2rem' }}>Detetive de Quintal</h1>
        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          Aprenda SQL desvendando mistérios!
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', textAlign: 'left' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Seu Nome (Detetive)</label>
            <input 
              type="text" 
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Digite seu nome..."
              required
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                border: '1px solid var(--border)',
                fontSize: '1rem',
                fontFamily: 'var(--font-sans)',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Escolha a Temporada</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {availableSeasons.map(s => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSeason(s)}
                  style={{
                    padding: '1rem',
                    borderRadius: '0.5rem',
                    border: season === s ? '2px solid var(--accent)' : '1px solid var(--border)',
                    backgroundColor: season === s ? 'rgba(236, 112, 0, 0.1)' : 'var(--panel-bg)',
                    color: season === s ? 'var(--accent)' : 'var(--text-main)',
                    fontWeight: season === s ? 'bold' : 'normal',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s'
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <button 
            type="submit" 
            style={{
              backgroundColor: 'var(--accent)',
              color: 'white',
              border: 'none',
              padding: '1rem',
              borderRadius: '0.5rem',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '1rem',
              transition: 'background-color 0.2s'
            }}
          >
            Iniciar Investigação
          </button>
        </form>
      </div>
    </div>
  );
}
