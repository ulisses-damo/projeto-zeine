const express = require('express');
const cors = require('cors');
const createUsersTable = require('./db/createTable');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

// Criar tabela de usuários na inicialização
createUsersTable();

app.listen(PORT, () => console.log(`API rodando na porta ${PORT}`));