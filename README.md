
# 🍷 Degusta Notes

<p>
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/>
  <img src="https://img.shields.io/badge/Drizzle-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black"/>
  <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white"/>
</p>

Aplicação web para Sommeliers registrarem, organizarem e consultarem suas notas de degustação de vinhos.

🔗 **[Acesse o projeto ao vivo](https://degusta-notes.vercel.app)**

---

## 📋 Funcionalidades

- ✅ Autenticação de usuário
- ✅ Criar notas de degustação
- ✅ Editar notas existentes
- ✅ Deletar notas
- ✅ Interface moderna e responsiva com **shadcn/ui**

---

## 🛠️ Tecnologias

| Tecnologia | Descrição |
|------------|-----------|
| Next.js | Framework React fullstack |
| TypeScript | Tipagem estática |
| Tailwind CSS | Estilização |
| shadcn/ui | Componentes de UI |
| Drizzle ORM | ORM para acesso ao banco |
| PostgreSQL | Banco de dados relacional |
| Vercel | Deploy e hospedagem |

---

## ⚙️ Como rodar o projeto

### Pré-requisitos

- Node.js 18+
- PostgreSQL rodando localmente ou uma instância na nuvem (ex: Neon, Supabase)

### Passo a passo

```bash
# Clone o repositório
git clone https://github.com/EnzoMendes34/degusta-notes.git

# Entre na pasta
cd degusta-notes

# Instale as dependências
npm install
```

Configure as variáveis de ambiente criando um arquivo `.env.local` na raiz do projeto:

```env
DATABASE_URL=postgresql://usuario:senha@localhost:5432/degusta_notes
```

```bash
# Rode as migrations do banco
npx drizzle-kit migrate

# Inicie o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

---

## 🚀 Deploy

O projeto está deployado na **Vercel** e pode ser acessado em:
**[https://degusta-notes.vercel.app](https://degusta-notes.vercel.app)**

---

## 👨‍💻 Autor

Feito por **Enzo Mendes**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/enzo-mendes-49896b285)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/EnzoMendes34)
