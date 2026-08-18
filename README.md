# CHEMRADES

Corporate website for **CHEMRADES FZE LLC**, built with Next.js and Supabase and deployed on Vercel.

## Local development

```bash
pnpm install
pnpm dev
```

Create `.env.local` with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_project_url
SUPABASE_SERVICE_ROLE_KEY=your_server_only_service_role_key
```

The service-role key is used only by the server-side inquiry endpoint and must never be exposed to browser code.

