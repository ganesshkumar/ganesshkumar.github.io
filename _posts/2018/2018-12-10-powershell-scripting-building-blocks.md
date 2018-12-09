---
date: 2018/12/10 02:03:00 +05:30
title: "Powershell Scripting - Building Blocks"
layout: post
disqus: true
tags:
  - powershell
  - scripting
categories:
  - powershell-script
---

## Check and create directory if it doesn't exist

```
$SourceDir = "directoryName"
if (!(Test-Path -Path $SourceDir ))
{
    Write-Host "Creating .\src directory" -ForegroundColor Green
    New-Item -ItemType directory -Path $DOCDIR\MatchedLog
}
```
