---
date: 2019/01/24 19:14:00 +05:30
title: "Azure Active Directory PowerShell"
layout: post
disqus: true
tags:
  - powershell
  - azure
categories:
  - powershell
---

A list of most used Azure Active Directory PowerShell commands

**Install Azure Active Directory PowerShell module**

```
Install-Module AzureAD
```

Use `AzureADPreview` to install public preview of the module

**Connect to Azure account**

````
Connect-AzureAD
````

**Commands**

| Command | Usage |
|---|---|
| Get-AzureADObjectByObjectId | Find the resource from its object Id |
