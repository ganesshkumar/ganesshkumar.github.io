---
title: How to Find and Kill a Process Using a Specific Port on Windows
description: How to Find and Kill a Process Using a Specific Port on Windows
date: 2023/05/18
modified_date: 2023/05/18
image: /assets/images/posts/random-img.jpg
disqus: false
tags:
  - windows
  - command-line
categories:
  - windows
---

Sometimes, you may encounter an error that says “address already in use” when trying to run a program that uses a specific port. This means that another process is already using that port. In this post, we’ll go over the steps to find and kill the process using that port on Windows.

**1. Find the Process ID (PID) of the process using the port:** 

To do this, open the Command Prompt and enter the command `netstat -aon | findstr :[port number]`, replacing *[port number]* with the *actual port number* you’re interested in. This will show you the PID of the process using that port.

**2. Kill the process:**

To kill the process, you can enter the command `taskkill /F /PID [PID]`, replacing *[PID]* with the *actual PID of the process you want to kill*. This will forcefully terminate the process.

And that’s it! Now you should be able to run your program without encountering the “address already in use” error.
