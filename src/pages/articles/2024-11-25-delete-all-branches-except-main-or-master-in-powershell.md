---
layout: ../../layouts/MarkdownPostLayout.astro
title: "How to Delete All Git Branches Except Master or Main in PowerShell"
description: "A step-by-step guide to deleting all Git branches except master or main using PowerShell commands."
author: "Ganessh Kumar"
date: 2024-11-25
pubDate: 2024-11-25
modified_date: 2024-11-25
image:
    url: /assets/images/2024-11-25-delete-git-branches-powershell/branch-deletion.png
    alt: "Delete Git Branches in PowerShell"
disqus: false
tags:
  - git
  - powershell
  - version control
categories:
  - technology
thumbnail: banner/delete-git-branches.jpeg
---

In Windows PowerShell, you can delete all branches except main or master branch of a git repository using the following command

```ps
git branch | Where-Object { $_ -notmatch "master" -and $_ -notmatch "main" } | ForEach-Object { git branch -D $_.Trim() }
```

Explanation:
- `git branch`: Lists all branches.
- `Where-Object { $_ -notmatch "master" -and $_ -notmatch "main" }`: Filters out the branch named master or main using PowerShell's pattern matching.
- `ForEach-Object { git branch -D $_.Trim() }`: Iterates over each remaining branch name, trims any extra whitespace, and deletes it with git branch -D.
