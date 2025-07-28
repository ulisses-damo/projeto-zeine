const pool = require('./index');

const createUsersTable = async () => {
  try {
    console.log('🔄 Tentando criar tabela users...');
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ Tabela users criada com sucesso!');
    
    // Testar conexão
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Conexão com banco funcionando:', result.rows[0]);
  } catch (error) {
    console.error('❌ Erro ao criar tabela users:', error.message);
    console.error('❌ Stack:', error.stack);
  }
};

module.exports = createUsersTable;
