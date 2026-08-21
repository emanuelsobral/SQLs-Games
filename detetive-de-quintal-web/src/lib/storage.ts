export interface UserProgress {
  id: string;
  name: string;
  season: string;
  totalScore: number;
  answers: Record<string, {
    score: number;
    answerText: string;
    isPartial: boolean;
  }>;
}

const STORAGE_KEY = 'detetive_quintal_users';

export function getAllUsers(): UserProgress[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveUsers(users: UserProgress[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
}

export function getOrCreateUser(name: string, season: string): UserProgress {
  const users = getAllUsers();
  
  // Buscar se o usuário já existe pelo nome e temporada (ignorando maiúsculas/minúsculas)
  const existingUserIndex = users.findIndex(u => u.name.toLowerCase() === name.toLowerCase() && u.season === season);
  
  if (existingUserIndex !== -1) {
    return users[existingUserIndex];
  }

  // Se não existe para aquela temporada, cria um novo
  const newUser: UserProgress = {
    id: Date.now().toString() + Math.random().toString(36).substr(2, 5),
    name,
    season,
    totalScore: 0,
    answers: {}
  };
  users.push(newUser);
  saveUsers(users);
  return newUser;
}

export function getUser(id: string): UserProgress | null {
  const users = getAllUsers();
  return users.find(u => u.id === id) || null;
}

export function saveUserAnswer(userId: string, levelId: string, answerText: string, score: number, isPartial: boolean): UserProgress | null {
  const users = getAllUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  
  if (userIndex === -1) return null;
  
  const user = users[userIndex];
  
  // Update answer for this level
  const previousScore = user.answers[levelId]?.score || 0;
  
  // Only update if it's a better score (to prevent penalizing after a correct answer)
  if (!user.answers[levelId] || score > previousScore) {
    user.answers[levelId] = {
      score,
      answerText,
      isPartial
    };
    
    // Recalculate total score
    user.totalScore = Object.values(user.answers).reduce((acc, curr) => acc + curr.score, 0);
    
    users[userIndex] = user;
    saveUsers(users);
  }
  
  return user;
}

export function updateUserName(userId: string, newName: string): boolean {
  const users = getAllUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex === -1) return false;
  
  users[userIndex].name = newName;
  saveUsers(users);
  return true;
}

export function deleteUser(userId: string): boolean {
  const users = getAllUsers();
  const newUsers = users.filter(u => u.id !== userId);
  if (newUsers.length === users.length) return false;
  saveUsers(newUsers);
  return true;
}

export function clearAllUsers() {
  localStorage.removeItem(STORAGE_KEY);
}
