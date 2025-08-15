---
title: "From Yarn Chaos to a Clean Dev Setup"
description: "Walk through to fix a stubborn Yarn version mismatch on Windows by removing legacy shims and letting Corepack manage the right version, with practical tips for UI cleanup along the way."
author: "Ganessh Kumar"
date: 2025-08-15
pubDate: 2025-08-15
modified_date: 2025-08-15
image:
    url: /assets/images/2025-08-15-2025-08-15-from-yarn-chaos-to-clean-dev-setup/yarn-errors.webp
    alt: "Removing Yarn shims and aligning Corepack version"
disqus: true
tags:
  - yarn
  - corepack
  - windows
  - nodejs
  - troubleshooting
categories:
  - technology
  - development
coverImage: /assets/images/2025-08-15-2025-08-15-from-yarn-chaos-to-clean-dev-setup/yarn-errors.webp
---


Every once in a while, a tool that’s supposed to make your life easier decides to make it harder. This time it was yarn. The monorepo clearly declared `"packageManager": "yarn@4.9.2"`, but my terminal stubbornly ran the ancient classic yarn 1.22.x. That mismatch was a silent trap—installs could go rogue, lockfiles could drift, and suddenly your “consistent” dev environment isn’t so consistent anymore.  

The first signs were obvious. `yarn -v` mocked me with `1.22.22`. PowerShell’s `Get-Command yarn` told me the binary was living under `C:\Program Files\nodejs\yarn*`. Even after running `corepack prepare yarn@4.9.2 --activate`, the version never changed. I deleted one yarn location only to find another lurking in a different folder. It was like a game of whack-a-mole with binaries.  

I tried the usual suspects—`corepack enable`, re-preparing yarn again and again, combing through the repo for any sneaky per-package overrides. Nothing. Old installs were everywhere: one set in `Program Files (x86)`, another in `Program Files`. Even after purging one, the PowerShell shims kept pointing to Corepack’s internal `yarn.js` but still clung to legacy wrappers.  

The breakthrough came when I stopped fighting Corepack and started hunting the real culprit: leftover shim files. Those `yarn*` and `yarnpkg*` executables in `C:\Program Files\nodejs` always got picked first from PATH. They overruled Corepack every time. Deleting them finally let Corepack hand over the correct yarn 4.9.2 binary.  

The winning sequence was short and brutal:  

```powershell
Remove-Item 'C:\Program Files\nodejs\yarn*' -Force -ErrorAction SilentlyContinue
Remove-Item 'C:\Program Files\nodejs\yarnpkg*' -Force -ErrorAction SilentlyContinue

corepack disable
corepack enable
corepack prepare yarn@4.9.2 --activate
```

Now `yarn -v` reports 4.9.2, and `Get-Command yarn` points exactly where it should. No drama, no shadow installs.  

While fixing this, I also reworked a job details card in the UI. The idea was to make scanning effortless: job description hidden by default, company and location in one neat line, color-coded remote/hybrid/on-site pill, compact industry tags with a “+N more” where needed. Footer actions got a clear order—remote pill first, then an outline “Open Job” button, and finally the toggle for description. Less vertical space, faster reading.  

The lessons here stick beyond yarn. Shims win over version managers if they appear earlier in PATH. Never trust just the version output—check the binary source. The `packageManager` field is the single source of truth. In UI work, aggregation beats dumping everything on the screen. Keep things minimal and reveal details only when needed.  

Now, with yarn behaving and the UI cleaner, the dev environment feels under control again. And the next time a command refuses to obey, I’ll remember: always check where it’s coming from before assuming what it is.  
