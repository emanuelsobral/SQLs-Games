import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Level } from '../App';

interface StoryPanelProps {
  level: Level | null;
}

export function StoryPanel({ level }: StoryPanelProps) {
  if (!level) {
    return (
      <div className="story-panel empty-state">
        <p>Selecione um caso para começar a investigação.</p>
      </div>
    );
  }

  // Hide the setup script code block
  let cleanContent = level.content
    .replace(/\*\*🛠️ Script de Setup do Ambiente.*?\*\*\s*```sql\n[\s\S]*?```/ig, '');
    
  // Hide the Introdução block
  cleanContent = cleanContent.replace(/\*\*🎬 Introdução:\*\*[\s\S]*?---/ig, '');

  // Hide everything from Solution Script onwards
  cleanContent = cleanContent.replace(/\*\*✅ Script de Solução:?\*\*[\s\S]*/ig, '');

  // Extract the table schemas from the setupScript
  const extractSchema = (setup: string) => {
    const tables: string[] = [];
    const regex = /CREATE TABLE (\w+) \(([\s\S]*?)\);/gi;
    let match;
    while ((match = regex.exec(setup)) !== null) {
      const tableName = match[1];
      const columnsText = match[2];
      const columns = columnsText.split(',').map(c => {
        // Clean up the column definition to just show name and type
        const cleanCol = c.trim().replace(/\n/g, '').replace(/--.*/g, '').trim();
        return cleanCol;
      }).filter(c => c);
      tables.push(`**Tabela:** \`${tableName}\`\n- ` + columns.join('\n- '));
    }
    return tables.length > 0 ? "\n\n---\n\n### 🗄️ Tabelas Disponíveis\n\n" + tables.join('\n\n') : "";
  };

  const schemaMarkdown = extractSchema(level.setupScript);

  return (
    <div className="story-panel">
      <div className="markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {cleanContent + schemaMarkdown}
        </ReactMarkdown>
      </div>
    </div>
  );
}
