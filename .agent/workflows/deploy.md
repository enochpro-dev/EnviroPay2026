---
description: Deploy EnviroPay to Firebase App Hosting via git push
---

# EnviroPay Deploy Workflow

Firebase App Hosting auto-deploys whenever the `web` branch is pushed to GitHub.
The repo is owned by `enochpro-dev`, so the remote URL must embed that username
to avoid a 403 from a different authenticated account.

## Pre-flight checklist

- Repo: `enochpro-dev/EnviroPay2026`
- Branch: `web`
- Remote must use: `https://enochpro-dev@github.com/enochpro-dev/EnviroPay2026.git`

## Steps

1. Ensure the remote URL has the correct account embedded:

// turbo
```
git remote set-url origin https://enochpro-dev@github.com/enochpro-dev/EnviroPay2026.git
```

2. Stage and commit your changes:

```
git add -A && git commit -m "<describe your change>"
```

3. Push the `web` branch:

// turbo
```
git push origin web
```

4. Firebase App Hosting will detect the push and automatically trigger a build + deploy.
   Monitor progress at: https://console.firebase.google.com/project/enviropay-io/apphosting

> Build typically takes 2–5 minutes. No manual `firebase deploy` needed.
