---
layout: ../../layouts/MarkdownPostLayout.astro
title: How to Find and Kill a Process Using a Specific Port on Windows
description: Identify and terminate processes using a specific port on Windows with step-by-step instructions and PowerShell scripts to fix address already in use errors.
author: Ganessh Kumar
pubDate: 2023-05-18
date: 2023-05-18
modified_date: 2023-06-02
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

To do this, open the Command Prompt and enter the command 

```shell
> netstat -aon | findstr :[port number]
```

replacing *[port number]* with the actual port number you’re interested in. This will show you the PID of the process using that port.

**2. Kill the process:**

To kill the process, you can enter the command

```shell
> taskkill /F /PID [PID] 
```

replacing *[PID]* with the actual PID of the process you want to kill. This will forcefully terminate the process.

And that’s it! Now you should be able to run your program without encountering the “address already in use” error.

### Piped commands
Putting the above things together run the following command with your port number to find the kill the process using it. 

```shell
> netstat -ano | Select-String '0.0.0.0:[port number]' | ForEach-Object { $_ -split '\s+' } | Select-Object -Index 4 | ForEach-Object { Stop-Process -Id $_ -Force }
```

### PowerShell script

To make it reusable, we can write the above command in a PowerShell script as follows  

```shell
param (
    [Parameter(Mandatory = $false, Position = 0)]
    [ValidateRange(1, 65535)]
    [int]$PortNumber = 443,
    [switch]$Help
)

if ($Help) {
    Write-Output "Usage: KillPort [-Help] [<PortNumber>]"
    Write-Output ""
    Write-Output "Description: Terminates processes using the specified port number."
    Write-Output ""
    Write-Output "Options:"
    Write-Output "  -Help              Show this help information."
    Write-Output "  <PortNumber>       Specify the port number to target (default: 443)."
    return
}

$connections = netstat -ano | findstr "0.0.0.0:$PortNumber"
if (-not $connections) {
    $connections = netstat -ano | findstr "127.0.0.1:$PortNumber"
}

if ($connections) {
    $pids = $connections | ForEach-Object { $_ -split '\s+' } | Select-Object -Index 5
    $pids | ForEach-Object { taskkill /F /PID $_ }
    Write-Output "Processes using port $PortNumber have been terminated."
} else {
    Write-Output "No processes found using port $PortNumber."
}
```

Note: In addition to checking `0.0.0.0:$portNumber`, it is also useful to check `127.0.0.1:$portNumber`

Invoke the above PowerShell scripts using the following command (assuming TerminateProcessByPort.ps1` is the name of the file.

```shell
> .\TerminateProcessesByPort.ps1 -PortNumber 443
```
