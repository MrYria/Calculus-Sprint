import { PostgresDatabase } from '../src/config/db.js'

async function main() {
  const db = PostgresDatabase.getInstance();

  console.log('Starting test connection...');
  
  await db.testConnection();
  await db.close();
}

main().catch((err) => {
  console.error('Crash error:', err);
  process.exit(1);
});