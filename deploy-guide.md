# 🚀 Guia de Deploy - Vercel

## Pré-requisitos
- Conta no [Vercel](https://vercel.com)
- Projeto no GitHub/GitLab
- Supabase configurado

## Passos para Deploy

### 1. Preparar Repositório
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/seu-usuario/hbt-content-strategist.git
git push -u origin main
```

### 2. Deploy no Vercel

#### Opção A: Via Dashboard
1. Acesse [vercel.com](https://vercel.com)
2. Clique em "New Project"
3. Conecte seu repositório GitHub
4. Configure as variáveis de ambiente:
   - `VITE_SUPABASE_URL`: `https://jfxvfekzoaixdmckrlch.supabase.co`
   - `VITE_SUPABASE_ANON_KEY`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`
5. Clique em "Deploy"

#### Opção B: Via CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

### 3. Configurar Domínio (Opcional)
1. No dashboard do Vercel, vá em "Settings" > "Domains"
2. Adicione seu domínio personalizado
3. Configure DNS conforme instruções

## Variáveis de Ambiente Necessárias

```env
VITE_SUPABASE_URL=https://jfxvfekzoaixdmckrlch.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpmeHZmZWt6b2FpeGRtY2tybGNoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyNDU3MTUsImV4cCI6MjA3MzgyMTcxNX0.f4Oed_H6X7zYc5n7dhQtrmOsv-DNBBWK_1eDKV9Xdg8
```

## Verificações Pós-Deploy

✅ **Aplicação carrega** sem erros
✅ **Login funciona** (email@andreortega.com / 12345678)
✅ **Dados do Supabase** são carregados
✅ **Navegação** entre páginas funciona
✅ **CRUD** de pilares/conteúdo funciona

## Troubleshooting

### Erro 404 em rotas
- Verificar se `vercel.json` está configurado corretamente
- Confirmar que é uma SPA (Single Page Application)

### Erro de conexão Supabase
- Verificar variáveis de ambiente no Vercel
- Confirmar que as chaves estão corretas
- Verificar RLS (Row Level Security) no Supabase

### Build falha
- Verificar se todas as dependências estão no `package.json`
- Testar build local: `npm run build`
- Verificar logs de build no Vercel

## URLs de Exemplo

- **Produção**: `https://hbt-content-strategist.vercel.app`
- **Preview**: `https://hbt-content-strategist-git-main.vercel.app`

## Monitoramento

- **Analytics**: Habilitado automaticamente no Vercel
- **Logs**: Disponíveis no dashboard do Vercel
- **Performance**: Web Vitals integrados

---

**Deploy realizado com sucesso! 🎉**