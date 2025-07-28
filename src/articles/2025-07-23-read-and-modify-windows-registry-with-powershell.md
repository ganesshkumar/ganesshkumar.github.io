---
title: "Read and Modify Windows Registry with PowerShell: The Practical Way"
description: "An Indian software engineer shares how to use PowerShell to read and update Windows registry keys with real examples for automation and configuration."
author: "Ganessh Kumar"
date: 2025-07-23
pubDate: 2025-07-23
modified_date: 2025-07-23
image:
    url: /assets/images/2025-07-23-read-and-modify-windows-registry-with-powershell/powershell.webp
    alt: "PowerShell reading and editing registry"
disqus: true
tags:
  - powershell
  - registry
categories:
  - technology
  - tutorials
thumbnail: banner/powershell-registry.jpeg
coverImage: /assets/images/2025-07-23-read-and-modify-windows-registry-with-powershell/powershell.webp
---

When I started spinning up Windows VMs on cloud platforms, I ran into a nagging concern: many images came with old protocols like TLS 1.0 and 1.1 still enabled. Security teams everywhere keep warning about these legacy versions, and auditors love to call them out. Manually disabling them on every VM was out of question. It had to be automated. So I leaned into **PowerShell registry** scripting to get the job done.

### Why I needed to automate registry changes

There was no way I could go through dozens of cloud VMs, open regedit, and toggle settings one by one. I needed a predictable, scriptable way to **read and update registry keys with powershell**, mainly to ensure TLS 1.0 and 1.1 were permanently disabled. This wasn't just a nice to have. On client projects, security is non negotiable and cloud environments make manual work a maintenance nightmare.

### How I used powershell to read and update registry values

To verify if TLS 1.0 was even enabled, I used this **PowerShell GetValue example** on the relevant registry path:

```powershell
$value = [Microsoft.Win32.Registry]::GetValue(
    "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.0\Client",
    "Enabled",
    $null
)

if ($value -ne $null) {
    Write-Output "TLS 1.0 Client Enabled = $value"
} else {
    Write-Output "Registry value not found."
}
```

After confirming what was active, I disabled both TLS 1.0 and TLS 1.1 using **PowerShell SetValue example** scripts like this:

```powershell
[Microsoft.Win32.Registry]::SetValue(
    "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\SecurityProviders\SCHANNEL\Protocols\TLS 1.0\Client",
    "Enabled",
    0,
    [Microsoft.Win32.RegistryValueKind]::DWord
)
```
I repeated similar steps for `TLS 1.1`. The best part is, even if the registry path doesn't exist, PowerShell creates it automatically - something you just don't get with manual regedit work.

### Scripting everything for cloud provisioning

All my scripts lived as `.ps1` files, ready to run as part of the VM provisioning pipeline. For any execution policy issues, this single line solved it:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

This routine has now become a standard step in my cloud VM setup. The **PowerShell registry** approach let me roll out secure defaults every single time, without missing a single server.

--- 

For me, the registry was never about showing off obscure Windows tricks. It's a critical piece for enforcing security standards in cloud infra, especially when dealing with scale. Automating these **PowerShell GetValue example** and SetValue steps saved me hours and gave my clients confidence that those old protocols were gone for good.