---
title: "Remove Global npm Packages Safely on Windows, Linux, and macOS"
description: "Explaination on how to remove global npm packages in bulk without breaking essential tools, using real PowerShell and bash scripts for safe cleanup."
author: "Ganessh Kumar"
date: 2025-08-05
pubDate: 2025-08-05
modified_date: 2025-08-05
image:
    url: /assets/images/articles/2025-08-05-remove-global-npm-packages.webp
    alt: "PowerShell and Bash scripts cleaning npm packages"
disqus: true
tags:
  - npm
  - powershell
  - bash
  - linux
  - macos
categories:
  - technology
  - tutorials
coverImage: /assets/images/articles/2025-08-05-remove-global-npm-packages.webp
---

Developers love quick installs. You spot a CLI tool, try it once, and forget about it. But it's now a global npm package taking up space. This pattern repeats. Fast install becomes permanent clutter.

Uninstalling globally installed npm packages shouldn't feel risky. But if you wipe everything without filtering out `npm` or other key components, you'll break your setup. So the goal is clear-remove global npm packages, keep what matters, and automate the cleanup across systems.

---

Start with visibility:

```bash
npm list -g --depth=0
```

This lets you identify which globally installed packages are no longer needed. If you're serious about optimizing your development environment, get used to running this regularly. It's the first step in any npm uninstall guide that actually works.

---

## Clean up script

## Windows: PowerShell script

For Windows systems, PowerShell gives fine control. Use this script:

```powershell
$skipList = @("npm", "corepack")

$packages = npm list -g --depth=0 | Select-String "node_modules\\" | ForEach-Object {
  ($_ -split "node_modules\\")[1].Trim()
}

$filtered = $packages | Where-Object { $skipList -notcontains $_ }

$toRemove = $filtered -join " "

npm uninstall -g $toRemove
```

### Linux and macOS: bash script

If you're using Linux or macOS, this bash version does the job:

```bash
skip=("npm" "corepack")

packages=$(npm list -g --depth=0 | grep "node_modules/" | awk -F 'node_modules/' '{print $2}' | tr -d ' ')

to_remove=""
for pkg in $packages; do
  if [[ ! " ${skip[@]} " =~ " ${pkg} " ]]; then
    to_remove+="$pkg "
  fi
done

npm uninstall -g $to_remove
```

This safely removes global npm packages while excluding critical ones. It's a robust way to automate npm package cleanup for developers who prefer scripting over manual input. The `$skipList` helps you define what stays. This approach is cleaner than poking around in `node_modules`.

---

## Final cleanup for all environments

After uninstalling, run this:

```bash
npm list -g --depth=0
```

Confirm that only your skipped packages remain. Then clear the npm cache:

```bash
npm cache clean --force
```

That's it. This method gives you a clean global package list. It's faster than manually uninstalling and safer than brute-force deletion.

---

If you're using npm for project scaffolding or debugging, global installs are tempting. But unmanaged installs lead to conflicts, slowdowns, and obscure bugs. Clean environments run better. Period.

Whether you're on Windows, Linux, or macOS, these scripts are a reliable way to remove global npm packages in bulk without removing `npm`. You can use them during onboarding, monthly resets, or before cloning fresh repositories.
