# Deployment

Golden Aura deploys as a static export (`app/out/`) to Vercel. Deployment is automated via `.github/workflows/cd.yml`, which runs on every push to `main` — since `main` is protected (see `docs/MILESTONES.md` §Milestone 2), that means every deploy has already passed the full CI suite.

## One-time setup (required before the CD workflow can succeed)

1. **Create a Vercel project** for this repo (via the Vercel dashboard, "Import Project" from GitHub), or run `vercel link` locally from the repo root.
2. **Set the project's Root Directory to `app`** — this is an npm-workspaces monorepo; the Next.js app lives at `app/`, not the repo root. Vercel's monorepo support handles the root `package-lock.json`/workspaces automatically once this is set.
3. **Disable Vercel's own Git integration auto-deploys** (Project Settings → Git → toggle off), if the project was created via "Import Project" — deploys should only happen through the `cd.yml` workflow (which runs *after* CI passes), not on every push independently.
4. **Generate a Vercel API token**: Account Settings → Tokens → Create Token.
5. **Add three repo secrets** (Settings → Secrets and variables → Actions, on GitHub — not pasted anywhere else):
   - `VERCEL_TOKEN` — the token from step 4
   - `VERCEL_ORG_ID` — from `.vercel/project.json` after running `vercel link` locally, or the Vercel dashboard's team/account settings
   - `VERCEL_PROJECT_ID` — from the same `.vercel/project.json`, or the project's Settings page

Once these three secrets exist, every push to `main` triggers `cd.yml`: `vercel pull` → `vercel build --prod` → `vercel deploy --prebuilt --prod`, followed by an automated health check (`curl` the deployed URL, expect HTTP 200 on `/`). The workflow fails if the health check fails.

## Rollback

Vercel keeps every previous deployment addressable and promotable. To roll back to a previous production deployment:

```
vercel ls --token=$VERCEL_TOKEN                          # find the prior deployment's URL/ID
vercel rollback <deployment-url-or-id> --token=$VERCEL_TOKEN
```

Equivalently, from the Vercel dashboard: Deployments tab → select a previous deployment → "Promote to Production".

Rollback does not require a new build — it re-promotes an existing, already-built deployment, so it's fast and doesn't depend on the source repo state at all.
