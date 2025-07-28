const express = require('express');
const cors = require('cors');
const createUsersTable = require('./db/createTable');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

// Função para inicializar o banco
const initializeDatabase = async () => {
  console.log('🚀 Inicializando servidor...');
  try {
    await createUsersTable();
    console.log('📦 Banco de dados inicializado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao inicializar banco:', error);
  }
};

// Inicializar banco e depois startar servidor
initializeDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ API rodando na porta ${PORT}`);
    console.log(`🌐 URL: https://projeto-zeine-api.onrender.com`);
  });
}).catch(error => {
  console.error('💥 Falha crítica na inicialização:', error);
  process.exit(1);
});