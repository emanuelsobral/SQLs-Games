import initSqlJs from 'sql.js';
import type { Database, QueryExecResult } from 'sql.js';
import sqlWasmUrl from 'sql.js/dist/sql-wasm.wasm?url';

let db: Database | null = null;

export async function initDb() {
  const SQL = await initSqlJs({
    locateFile: () => sqlWasmUrl
  });
  
  // Create a new in-memory database
  db = new SQL.Database();
  return db;
}

export function executeQuery(query: string): QueryExecResult[] {
  if (!db) throw new Error("Database not initialized");
  
  // Exec returns an array of results (one object per statement)
  // For multiple statements (like in setup), we just return the array
  // If it's a SELECT query, it will return columns and values
  return db.exec(query);
}

export function resetDb() {
  if (db) {
    db.close();
  }
  return initDb();
}
