import fs from 'fs';
import path from 'path';

const projectRoot = path.resolve('../'); // Points to the 'SQLs Games' folder
const outputJson = path.resolve('./src/data/levels.json');

const seasons = [
  { folder: 'Temporada_1_Iniciante', title: 'Temporada 1: Iniciante' },
  { folder: 'Temporada_2_Intermediario', title: 'Temporada 2: Intermediário' },
  { folder: 'Temporada_3_Avancado', title: 'Temporada 3: Avançado' }
];

const levelsData = [];

for (const season of seasons) {
  const seasonPath = path.join(projectRoot, season.folder);
  if (!fs.existsSync(seasonPath)) continue;

  const files = fs.readdirSync(seasonPath).filter(f => f.endsWith('.md')).sort();

  for (const file of files) {
    const content = fs.readFileSync(path.join(seasonPath, file), 'utf-8');
    
    // Extract setup script
    let setupScript = '';
    const setupMatch = content.match(/\*\*🛠️ Script de Setup do Ambiente.*?\*\*\s*```sql\n([\s\S]*?)```/i);
    if (setupMatch) {
      setupScript = setupMatch[1].trim();
    }

    // Extract solution script
    let solutionScript = '';
    const solutionMatch = content.match(/\*\*✅ Script de Solução:?\*\*\s*```sql\n([\s\S]*?)```/i);
    if (solutionMatch) {
      solutionScript = solutionMatch[1].trim();
    }

    // Level info
    const levelTitleMatch = content.match(/## 🐾 (Nível \d+: .*)/);
    const title = levelTitleMatch ? levelTitleMatch[1] : file;

    // Difficulty
    const diffMatch = content.match(/\*\*Nível de Dificuldade:\*\* (.*)/);
    const difficulty = diffMatch ? diffMatch[1] : '';

    levelsData.push({
      season: season.title,
      id: file.replace('.md', ''),
      file: file,
      title: title,
      difficulty: difficulty,
      content: content,
      setupScript: setupScript,
      solutionScript: solutionScript
    });
  }
}

// Create src/data if it doesn't exist
const dataDir = path.dirname(outputJson);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

fs.writeFileSync(outputJson, JSON.stringify(levelsData, null, 2));
console.log(`Successfully built ${levelsData.length} levels into ${outputJson}`);
