---
layout: ../../layouts/MarkdownPostLayout.astro
title: "Powershell Scripting - Building Blocks"
description: "Learn the essential building blocks of PowerShell scripting, including how to check and create directories if they don't exist."
author: Ganessh Kumar
pubDate: 2018-12-10
date: 2018-12-10
modified_date: 2018-12-10
image: /assets/images/posts/random-img.jpg
disqus: true
tags:
  - powershell
  - scripting
categories:
  - powershell
---

### Check and create directory if it doesn't exist

```powershell
$SourceDir = "directoryName"
if (!(Test-Path -Path $SourceDir ))
{
    Write-Host "Creating {$SourceDir} directory" -ForegroundColor Green
    New-Item -ItemType directory -Path $SourceDir
}
```