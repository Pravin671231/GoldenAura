# Deployment

Golden Aura deploys as a static export (`app/out/`) to Cloudflare Pages. Deployment is automated via `.github/workflows/cd.yml`, which runs on every push to `main` — since `main` is protected (see `docs/MILESTONES.md` §Milestone 2), that means every deploy has already passed the full CI suite.

## One-time setup (required before the CD workflow can succeed)

1. **Create a Cloudflare Pages project** named `golden-aura` (Cloudflare dashboard → Workers & Pages → Create → Pages → "Direct Upload" — do *not* connect Cloudflare's own Git integration, since deploys should only happen through the `cd.yml` workflow after CI passes, not independently on every push). If you'd rather use a different project name, update `--project-name=golden-aura` in `.github/workflows/cd.yml` to match.
2. **Generate a Cloudflare API token**: My Profile → API Tokens → Create Token, with the "Cloudflare Pages — Edit" permission (scoped to the account that owns the project).
3. **Find your Account ID**: Cloudflare dashboard → any domain/Workers & Pages overview page → right sidebar.
4. **Add two repo secrets** (GitHub repo → Settings → Secrets and variables → Actions — not pasted anywhere else):
   - `CLOUDFLARE_API_TOKEN` — the token from step 2
   - `CLOUDFLARE_ACCOUNT_ID` — from step 3

Once these two secrets exist, every push to `main` triggers `cd.yml`: build (`npm run build -w app` → `app/out/`) → `wrangler pages deploy app/out --project-name=golden-aura` (via `cloudflare/wrangler-action`) → an automated health check (`curl` the deployment URL, expect HTTP 200 on `/`). The workflow fails if the health check fails. Since the project uses Direct Upload (no build step on Cloudflare's side), the exact static output produced and verified in CI is what gets deployed — no re-build happens on Cloudflare's infrastructure.

## Rollback

Cloudflare Pages keeps up to the 100 most recently published deployments, each independently addressable:

**Dashboard (simplest):** Pages project → Deployments tab → select a previous deployment → "Rollback to this deployment". Production traffic switches within seconds; no rebuild required.

**CLI + API:**
```
wrangler pages deployment list --project-name=golden-aura   # find the prior deployment's ID

curl -X POST \
  "https://api.cloudflare.com/client/v4/accounts/$CLOUDFLARE_ACCOUNT_ID/pages/projects/golden-aura/deployments/$DEPLOYMENT_ID/rollback" \
  -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
(Wrangler has no dedicated `rollback` subcommand for Pages — that CLI command exists only for Workers — so the API call above is the CLI-driven equivalent of the dashboard button.)
