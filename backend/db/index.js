const { Pool } = require('pg');

// Debug das variáveis de ambiente
console.log('🔍 DATABASE_URL exists:', !!process.env.DATABASE_URL);
console.log('🔍 PGHOST:', process.env.PGHOST);
console.log('🔍 PGUSER:', process.env.PGUSER);
console.log('🔍 PGDATABASE:', process.env.PGDATABASE);

// Tentar usar DATABASE_URL primeiro (Render fornece automaticamente)
const pool = process.env.DATABASE_URL 
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false }
    })
  : new Pool({
      user: process.env.PGUSER || 'postgres',
      host: process.env.PGHOST || 'localhost',
      database: process.env.PGDATABASE || 'zeine',
      password: process.env.PGPASSWORD || '12345678',
      port: process.env.PGPORT || 5433,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });

module.exports = pool;