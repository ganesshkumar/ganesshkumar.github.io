---
date: 2018/10/06 05:11:34 +05:30
title: "Running exe in background"
layout: post
disqus: false
tags:
  - windows
categories:
  - windows
---

A simple way to run an executable file in backgound in Windows 10.

```
> Start-Process .\someName.exe -NoNewWindow -PassThru
```

The above command will return the name of the process, which can be used to stop the process as follows

```
> Stop-Process -name YourServiceName
```

These two simple command have saved me a lot of time in the past few days.
