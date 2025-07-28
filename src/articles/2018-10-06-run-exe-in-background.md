---
title: "Running exe in background"
description: "Run executables in the background on Windows 10 with PowerShell. This guide covers step-by-step process management for efficient start and stop."
author: Ganessh Kumar
pubDate: 2018-10-06
date: 2018-10-06
modified_date: 2018-10-06
image: /assets/images/posts/random-img.jpg
disqus: false
tags:
  - windows
categories:
  - personal-reference
---

A simple way to run an executable file in backgound in Windows 10.

```powershell
> Start-Process .\someName.exe -NoNewWindow -PassThru
```

The above command will return the name of the process, which can be used to stop the process as follows

```powershell
> Stop-Process -name YourServiceName
```

These two simple command have saved me a lot of time in the past few days.