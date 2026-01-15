---
title: "Why lsof Failed to Find the Process Hogging Port 3000 (And How ss Saved the Day)"
description: "Port 3000 was stuck. lsof returned nothing. killall node didn't help. The ghost process was hiding in kernel space, and only ss could find it."
author: "Ganessh Kumar"
date: 2026-01-15
pubDate: 2026-01-15
modified_date: 2026-01-15
image:
    url: /assets/images/2026-01-15-use-ss-to-find-hogging-port/screen.webp
    alt: "Why lsof failed to find the process hogging port 3000"
disqus: true
tags:
  - linux
  - networking
  - troubleshooting
  - terminal
  - nextjs
categories:
  - technology
  - development
  - tips
coverImage: /assets/images/2026-01-15-use-ss-to-find-hogging-port/screen.webp
---

Next.js threw the error again. `Error: listen EADDRINUSE: address already in use :::3000`. Port 3000 was busy, but nothing showed up when I ran `lsof -i :3000`. The port was clearly occupied, yet the usual tools acted like nothing was there. I tried `npx kill-port 3000`, checked `pm2 list`, even ran `killall -9 node` out of frustration. None of it worked. The ghost process remained invisible until I switched to `ss`.

---

## Why lsof missed the process

`lsof` treats sockets as files. It operates at a higher abstraction layer, which means it sometimes misses processes stuck in specific kernel states like `TIME_WAIT` or those bound to IPv6 addresses. It's a reliable tool for most cases, but when something operates closer to kernel space or sits in an unusual socket state, lsof can draw a blank.

`ss` doesn't have that limitation. It pulls data directly from the kernel's networking subsystem. No abstraction layer. No guessing. If a port is occupied, `ss` will tell you exactly which process is holding it, even if that process is in a weird state or managed by a system service.

---

## The command that worked

```bash
sudo ss -tulpn | grep :3000
```

This single line exposed the hidden process. Here's what each flag does:

| Flag | Name | What it does |
| --- | --- | --- |
| **`sudo`** | superuser do | Grants permission to see processes owned by other users or the system. Without this, you might see the port is busy but won't see which process is using it. |
| **`ss`** | socket statistics | The base command used to dump socket statistics. It is the modern replacement for the old `netstat`. |
| **`-t`** | tcp | Filters for tcp connections, the protocol web servers use. |
| **`-u`** | udp | Filters for udp connections. Less common for web servers, but ensures a comprehensive search. |
| **`-l`** | listening | Only shows sockets that are actively listening for incoming connections. |
| **`-p`** | process | Shows the PID and the name of the program using the socket. This is what you need. |
| **`-n`** | numeric | Shows raw port numbers like `3000` instead of trying to resolve them to service names. |
| **`grep :3000`** | filter | Pipes the output so you only see the line involving port 3000. |

Once the PID appeared, I killed it with `sudo kill -9 <PID>`. Port 3000 freed up instantly.

---

## Why this matters

Port conflicts are common in development. You close a server, but the port doesn't release. You restart your machine, but something still holds it. The standard tools like `lsof` work most of the time, but when they don't, you're stuck guessing.

`ss` doesn't guess. It goes straight to the kernel and pulls the truth. If a port is busy, `ss` will show you what's using it, no matter where it's hiding.

This isn't just about Next.js. Any service that binds to a port can run into this. Docker containers, flask apps, nginx, even system services. When the usual methods fail, `ss` is the tool that finds the answer.

---

## Quick reference for future use

```bash
# find the process holding a port
sudo ss -tulpn | grep :<PORT>

# kill the process
sudo kill -9 <PID>
```

You can also create an alias in your `.zshrc` or `.bashrc`:

```bash
alias findport='sudo ss -tulpn | grep'
```

Then just run `findport :3000` whenever you need to hunt down a port conflict.

---

The next time a port is stuck and `lsof` gives you nothing, skip the frustration. Use `ss`. It's faster, more accurate, and it doesn't hide the truth.