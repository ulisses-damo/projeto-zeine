# Projeto Zeine

Este Projeto foi desenvolvido em React, CSS e JavaScript com a proposta de executar uma tela de login, cadastro e uma dashboard de gerenciamento de contatos.

## 🚀 Links de Deploy

- **Frontend**: https://projeto-zeine-qca54pwpo-ulissesdamos-projects.vercel.app/
- **Backend API**: https://projeto-zeine-api.onrender.com/

## 🛠️ Tecnologias Utilizadas

### Frontend
- React.js
- Vite
- CSS3
- Axios
- React Router DOM
- React Toastify

### Backend
- Node.js
- Express.js
- PostgreSQL
- bcryptjs
- jsonwebtoken
- CORS



## 🔧 Instalação e Configuração Local

### 1. Clone o repositório
```bash
git clone https://github.com/ulisses-damo/projeto-zeine.git
cd projeto-zeine
```

### 2. Configuração do Backend

#### 2.1. Navegue para a pasta do backend
```bash
cd backend
```

#### 2.2. Instale as dependências
```bash
npm install
```

#### 2.3. Configure o banco de dados PostgreSQL
Crie um banco de dados local no PostgreSQL:
```sql
CREATE DATABASE projeto_zeine;
```

#### 2.4. Configure as variáveis de ambiente
Crie um arquivo `.env` na pasta `backend/` com o seguinte conteúdo:
```env
# Configurações do Banco de Dados
PGHOST=localhost
PGPORT=5432
PGDATABASE=projeto_zeine
PGUSER=seu_usuario_postgres
PGPASSWORD=sua_senha_postgres

# Configurações da API
PORT=5000
NODE_ENV=development
```

#### 2.5. Inicie o servidor backend
```bash
npm start
```

O backend estará disponível em: `http://localhost:5000`

### 3. Configuração do Frontend

#### 3.1. Abra um novo terminal e navegue para a raiz do projeto
```bash
cd projeto-zeine
```

#### 3.2. Instale as dependências do frontend
```bash
npm install
```

#### 3.3. Configure a URL da API para desenvolvimento local
No arquivo `src/services/api.js`, altere a baseURL para:
```javascript
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Para desenvolvimento local
  timeout: 10000,
});
```

#### 3.4. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

O frontend estará disponível em: `http://localhost:5173`

## 🎯 Como usar

1. **Acesse o frontend** em `http://localhost:5173`
2. **Crie uma conta** clicando em "Registrar"
3. **Faça login** com suas credenciais
4. **Gerencie contatos** na dashboard

## 📁 Estrutura do Projeto

```
projeto-zeine/
├── backend/                 # API Node.js
│   ├── db/                 # Configurações do banco
│   ├── routes/             # Rotas da API
│   ├── server.js           # Servidor principal
│   └── package.json
├── src/                    # Frontend React
│   ├── components/         # Componentes React
│   ├── pages/             # Páginas da aplicação
│   ├── services/          # Configuração da API
│   ├── styles/            # Arquivos CSS
│   └── App.jsx            # Componente principal
├── public/                # Arquivos públicos
└── package.json           # Dependências do frontend
```

## 🔄 Scripts Disponíveis

### Frontend
- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera build de produção
- `npm run preview` - Visualiza o build de produção

### Backend
- `npm start` - Inicia o servidor em produção
- `npm run dev` - Inicia o servidor em modo de desenvolvimento (se configurado)

## 🌐 Endpoints da API

### Autenticação
- `POST /api/auth/register` - Cadastro de usuário
- `POST /api/auth/login` - Login de usuário

### Utilitários
- `GET /api/setup/create-table` - Cria tabela de usuários (desenvolvimento)

