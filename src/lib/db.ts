// import Database from 'better-sqlite3';
// import path from 'path';
// import { promises as fs } from 'fs';

// // Initialize the database connection
// const dbPath = process.env.DATABASE_URL?.startsWith('sqlite://')
//   ? process.env.DATABASE_URL.replace('sqlite://', '')
//   : './db.sqlite';

// const db = new Database(dbPath);

// // Initialize the database schema if it doesn't exist
// function initializeDb() {
//   // Create users table with role column if it doesn't exist
//   db.exec(`
//     CREATE TABLE IF NOT EXISTS user (
//       id TEXT PRIMARY KEY,
//       email TEXT UNIQUE NOT NULL,
//       name TEXT,
//       role TEXT DEFAULT 'user',
//       created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//       updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
//     )
//   `);

//   // Create sessions table if it doesn't exist (for Better Auth compatibility)
//   db.exec(`
//     CREATE TABLE IF NOT EXISTS session (
//       id TEXT PRIMARY KEY,
//       user_id TEXT NOT NULL,
//       expires_at DATETIME NOT NULL,
//       created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//       FOREIGN KEY (user_id) REFERENCES user(id)
//     )
//   `);

//   // Create accounts table if it doesn't exist (for Better Auth compatibility)
//   db.exec(`
//     CREATE TABLE IF NOT EXISTS account (
//       id TEXT PRIMARY KEY,
//       user_id TEXT NOT NULL,
//       provider_id TEXT NOT NULL,
//       provider_user_id TEXT NOT NULL,
//       access_token TEXT,
//       refresh_token TEXT,
//       id_token TEXT,
//       expires_at TIMESTAMP,
//       created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
//       FOREIGN KEY (user_id) REFERENCES user(id)
//     )
//   `);

//   // Add role column to user table if it doesn't exist
//   try {
//     db.exec(`ALTER TABLE user ADD COLUMN role TEXT DEFAULT 'user'`);
//   } catch (e) {
//     // Column might already exist, which is fine
//   }
// }

// initializeDb();

// export { db };