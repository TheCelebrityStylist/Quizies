# Vercel Deploy Checklist

- **Root Directory:** repository root (`/`)
- **Framework Preset:** Next.js
- **Build Command:** `next build`
- **Output:** Next.js server output (do **not** use static export)
- **Node.js:** 20.x recommended

## Required env vars for live realtime features
- `PUSHER_APP_ID`
- `PUSHER_KEY`
- `PUSHER_SECRET`
- `PUSHER_CLUSTER`
- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `NEXT_PUBLIC_PUSHER_KEY`
- `NEXT_PUBLIC_PUSHER_CLUSTER`
- `NEXT_PUBLIC_SITE_URL`

Homepage (`/`) and status endpoints should render even when these are missing.
