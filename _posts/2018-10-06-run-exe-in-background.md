---
title: "Running exe in background"
description: "Running exe in background"
date: '2018/10/06'
modified_date: '2018/10/06'
image: /assets/images/posts/random-img.jpg
disqus: false
tags:
  - windows
categories:
  - personal-reference
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