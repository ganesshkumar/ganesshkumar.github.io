---
date: 2018/12/10 02:03:00 +05:30
title: "Powershell Scripting - Building Blocks"
layout: post
disqus: true
tags:
  - powershell
  - scripting
categories:
  - powershell
---

#### Check and create directory if it doesn't exist

```
$SourceDir = "directoryName"
if (!(Test-Path -Path $SourceDir ))
{
    Write-Host "Creating {$SourceDir} directory" -ForegroundColor Green
<<<<<<< HEAD
    New-Item -ItemType directory -Path $DOCDIR\MatchedLog
=======
    New-Item -ItemType directory -Path $SourceDir
>>>>>>> f963c4bdec8ce390cacd15bcb9c3ca3329aedd77
}
```
