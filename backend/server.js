const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/auth'));

app.listen(5000, () => console.log('API rodando na porta 5000'));