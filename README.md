# PrintWatch API - Node.js

API REST para gerenciamento e monitoramento de impressões usando Node.js, Express e Prisma.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Requisitos](#requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Endpoints](#endpoints)
- [Troubleshooting](#troubleshooting)
- [Desenvolvimento](#desenvolvimento)

## 🎯 Visão Geral

A PrintWatch API é um servidor REST desenvolvido em Node.js que recebe, processa e armazena dados de impressão de clientes Windows. O sistema inclui:

- **Recebimento de dados** de impressão via HTTP POST
- **Verificação de duplicatas** antes do armazenamento
- **Estatísticas detalhadas** por setor, usuário e impressora
- **Banco de dados** PostgreSQL com Prisma ORM
- **Logs estruturados** para auditoria
- **CORS configurado** para aplicações web

## ⚙️ Requisitos

### Sistema
- Node.js 18+ 
- PostgreSQL 12+
- Sistema operacional: Windows, Linux ou macOS

### Software
- **Node.js**: Runtime JavaScript
- **PostgreSQL**: Banco de dados
- **Cliente PrintWatch**: Para envio de dados
  - Repositório: [https://github.com/ronnybrendo/PrintWacth-client-windows](https://github.com/ronnybrendo/PrintWacth-client-windows)

## 🚀 Instalação

### Método 1: Instalação Automática (Recomendado)

1. **Clone o repositório**
   ```bash
   git clone https://github.com/ronnybrendo/PrintWatch-api-nodejs.git
   cd PrintWatch-api-nodejs
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure o banco de dados**
   ```bash
   # Configure as variáveis de ambiente
   cp .env.example .env
   # Edite o arquivo .env com suas configurações
   ```

4. **Execute as migrações**
   ```bash
   npx prisma migrate dev
   ```

5. **Inicie o servidor**
   ```bash
   npm run dev
   ```

### Método 2: Instalação com Docker

1. **Clone o repositório**
   ```bash
   git clone https://github.com/ronnybrendo/PrintWatch-api-nodejs.git
   cd PrintWatch-api-nodejs
   ```

2. **Configure o ambiente**
   ```bash
   cp .env.example .env
   # Edite o arquivo .env
   ```

3. **Execute com Docker**
   ```bash
   docker-compose up -d
   ```

## ⚙️ Configuração

### Arquivo .env

Crie um arquivo `.env` na raiz do projeto:

```env
# Configurações do Servidor
PORT=3005
NODE_ENV=development

# Configurações do Banco de Dados
DATABASE_URL="postgresql://usuario:senha@localhost:5432/printwatch_db"

# Configurações de Segurança
CORS_ORIGIN=http://localhost:3000

# Configurações de Log
LOG_LEVEL=info
```

### Parâmetros de Configuração

| Variável | Descrição | Padrão |
|----------|-----------|---------|
| `PORT` | Porta do servidor | `3005` |
| `NODE_ENV` | Ambiente (development/production) | `development` |
| `DATABASE_URL` | URL de conexão PostgreSQL | - |
| `CORS_ORIGIN` | Origem permitida para CORS | `http://localhost:3000` |
| `LOG_LEVEL` | Nível de log | `info` |

### Configuração do PostgreSQL

1. **Instale o PostgreSQL**
   - Download: https://www.postgresql.org/download/
   - Configure usuário e senha

2. **Crie o banco de dados**
   ```sql
   CREATE DATABASE printwatch_db;
   CREATE USER printwatch_user WITH PASSWORD 'sua_senha';
   GRANT ALL PRIVILEGES ON DATABASE printwatch_db TO printwatch_user;
   ```

3. **Execute as migrações**
   ```bash
   npx prisma migrate dev
   ```

## 🔧 Uso

### Comandos do Servidor

```bash
# Modo desenvolvimento (com hot reload)
npm run dev

# Modo produção
npm start

# Executar migrações
npx prisma migrate dev

# Resetar banco de dados
npx prisma migrate reset

# Abrir Prisma Studio
npx prisma studio
```

### Verificação do Status

1. **Servidor rodando**
   ```bash
   curl http://localhost:${PORT}/health
   ```

2. **Banco de dados**
   ```bash
   npx prisma db pull
   ```

3. **Logs do sistema**
   - Verifique os logs no console
   - Logs estruturados em formato JSON

### Monitoramento

O servidor executa automaticamente:

1. **Ao iniciar**: Conecta ao banco de dados
2. **Recebimento**: Processa dados de impressão
3. **Verificação**: Confirma duplicatas
4. **Armazenamento**: Salva dados no PostgreSQL
5. **Estatísticas**: Gera relatórios em tempo real

## 📁 Estrutura do Projeto

```
PrintWatch-api-nodejs/
├── src/
│   ├── central/           # Endpoints principais
│   │   ├── controller/    # Controladores
│   │   ├── router/        # Rotas
│   │   └── service/       # Lógica de negócio
│   ├── estatisticas/      # Endpoints de estatísticas
│   ├── impressoras/       # Endpoints de impressoras
│   ├── setores/           # Endpoints de setores
│   └── utils/             # Utilitários
├── prisma/
│   ├── migrations/        # Migrações do banco
│   └── schema.prisma      # Schema do banco
├── server.js              # Arquivo principal
├── package.json           # Dependências
└── .env                   # Configurações
```

### Principais Componentes

- **`server.js`**: Configuração do servidor Express
- **`src/central/`**: Endpoints para recebimento de dados
- **`src/estatisticas/`**: Relatórios e estatísticas
- **`prisma/`**: ORM e migrações do banco
- **`src/utils/`**: Utilitários e helpers

## 🔌 Endpoints

### Central (Recebimento de Dados)

#### POST `/central/receptprintreq`
Recebe dados de impressão do cliente Windows.

**Payload:**
```json
{
  "data": "2025-01-30",
  "hora": "10:30:15",
  "usuario": "joao.silva",
  "setor": "CPD",
  "paginas": 5,
  "copias": 2,
  "impressora": "HP-LaserJet",
  "nomearquivo": "documento.pdf",
  "tipo": "pdf",
  "nomepc": "PC-001",
  "tipopage": "A4",
  "cor": "COLOR",
  "tamanho": "1024KB",
  "ip": "192.168.1.100",
  "mac": "00:11:22:33:44:55",
  "empresa": 1
}
```

#### POST `/central/verifyimpression`
Verifica se uma impressão já existe no sistema.

**Resposta:**
```json
{
  "status": "true"
}
```

### Estatísticas

#### GET `/estatisticas/copias`
Retorna estatísticas de cópias por período.

#### GET `/estatisticas/color`
Retorna estatísticas de uso de cores.

### Impressoras

#### GET `/impressoras`
Lista todas as impressoras registradas.

### Setores

#### GET `/setores`
Lista todos os setores registrados.

## 🔍 Troubleshooting

### Problemas Comuns

#### 1. Servidor não inicia
```
Erro: "Cannot connect to database"
```
**Solução**: 
- Verifique a URL do banco no `.env`
- Confirme se o PostgreSQL está rodando
- Teste a conexão manualmente

#### 2. Migrações falham
```
Erro: "Migration failed"
```
**Solução**:
- Verifique as permissões do banco
- Confirme se o usuário tem privilégios
- Execute `npx prisma migrate reset`

#### 3. CORS bloqueando requisições
```
Erro: "CORS policy"
```
**Solução**:
- Configure `CORS_ORIGIN` no `.env`
- Verifique se a origem está correta
- Teste com `*` temporariamente

#### 4. Dados não sendo salvos
```
Erro: "Validation failed"
```
**Solução**:
- Verifique o formato dos dados enviados
- Confirme se todos os campos obrigatórios estão presentes
- Verifique os logs de erro

### Logs de Debug

Para ativar logs detalhados:

1. **Modo desenvolvimento**
   ```bash
   npm run dev
   ```

2. **Logs estruturados**
   - Todos os logs são em formato JSON
   - Níveis: error, warn, info, debug

3. **Prisma Studio**
   ```bash
   npx prisma studio
   ```

## 🛠️ Desenvolvimento

### Ambiente de Desenvolvimento

1. **Instale o Node.js**
   ```bash
   # Versão mínima: 18
   node --version
   ```

2. **Clone o repositório**
   ```bash
   git clone https://github.com/ronnybrendo/PrintWatch-api-nodejs.git
   cd PrintWatch-api-nodejs
   ```

   **Cliente Windows**: [https://github.com/ronnybrendo/PrintWacth-client-windows](https://github.com/ronnybrendo/PrintWacth-client-windows)

3. **Instale dependências**
   ```bash
   npm install
   ```

4. **Configure o ambiente**
   ```bash
   cp .env.example .env
   # Edite o arquivo .env
   ```

### Estrutura do Código

- **`server.js`**: Configuração do servidor Express
- **`src/central/`**: Endpoints principais de recebimento
- **`src/estatisticas/`**: Relatórios e análises
- **`prisma/schema.prisma`**: Modelo do banco de dados
- **`src/utils/`**: Utilitários compartilhados

### Testes

```bash
# Teste de conexão com banco
npx prisma db pull

# Teste de endpoints
curl -X POST http://localhost:${PORT}/central/verifyimpression \
  -H "Content-Type: application/json" \
  -d '{"test": true}'

# Teste de migrações
npx prisma migrate dev
```

### Deploy em Produção

1. **Configure variáveis de produção**
   ```env
   NODE_ENV=production
   PORT=3005
   DATABASE_URL=postgresql://user:pass@host:5432/db
   ```

2. **Execute migrações**
   ```bash
   npx prisma migrate deploy
   ```

3. **Inicie o servidor**
   ```bash
   npm start
   ```

4. **Use PM2 para produção**
   ```bash
   npm install -g pm2
   pm2 start server.js --name printwatch-api
   ```

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para suporte técnico ou dúvidas:

- **Issues**: Abra uma issue no GitHub
- **Documentação**: Consulte este README
- **Logs**: Verifique os logs do servidor

---

**Desenvolvido por Ronnybrendo**  
**Versão**: 1.0.0  
**Última atualização**: 2025 
