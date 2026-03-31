# TraGo Frontend

Standalone Next.js frontend for TraGo consumer and admin experiences.

## Local Development

1. Install dependencies
```bash
bun install
```

2. Configure environment
```bash
cp .env.example .env.local
```

3. Run development server
```bash
bun run dev
```

## Environment Variables

- `NEXT_PUBLIC_API_BASE`: Base URL for the TraGo backend API.

Production value:

```env
NEXT_PUBLIC_API_BASE=https://trago.nissihub.vn
```

## Deploy

This repo is intended to be connected directly to Vercel.

- Framework preset: `Next.js`
- Install command: `bun install`
- Build command: `bun run build`
- Output setting: default Next.js output
