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
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_publishable_key
```

The inquiry table uses row-level security: visitors may submit validated inquiries but cannot read, update or delete records.

