---
title: "tmux - The underrated Linux Tool Every Remote Developer Needs"
description: "Discover how tmux helps developers keep long running server tasks alive, avoid SSH disconnect issues, and work smarter on remote Linux servers."
author: "Ganessh Kumar"
date: 2021-01-05
pubDate: 2021-01-05
modified_date: 2021-01-05
image:
  url: /assets/images/article/2021-01-05-long-ruinning-commands-with-tmux.webp
  alt: "tmux session running on a Linux server terminal"
disqus: false
tags:
  - tmux
  - linux
  - ssh
  - terminal
  - ubuntu server
  - developer tools
categories:
  - technology
  - productivity
coverImage: /assets/images/article/2021-01-05-long-ruinning-commands-with-tmux.webp
---

I used to run **long running commands on my ubuntu server over ssh** and hope the connection wouldn't die. It didn't matter if it was a **setup script taking 30 minutes** or an **overnight process** - one drop in the **ssh session** and everything was gone. That frustration of losing hours of work because the connection failed was real.  

Then I discovered **tmux for remote servers**.  

And honestly, it changed how I work.  

### Why tmux became part of my routine?

**tmux - terminal multiplexer** is simple. It lets you create **persistent terminal sessions on a linux server**. Even if you disconnect from ssh, tmux keeps your processes alive. You can reconnect later and continue exactly where you left off.  

For anyone who runs **long running jobs on ubuntu or any linux system**, this is a lifesaver. I didn't plan to make tmux part of my workflow, but now I open a tmux session almost every time I log into my server.  

### How I started using tmux  

Installing tmux on ubuntu is easy:  

```bash
sudo apt install tmux
```  

That's all it takes. To start a new tmux session:  

```bash
tmux new -s work
```  

I called mine `work`. You can name it whatever you want. Inside that session, I run my **server commands** as usual.  

When I want to leave but keep the **long running command running in the background**, I press `Ctrl + b`, then `d`. The tmux session keeps running safely.  

Later, I reconnect:  

```bash
tmux attach -t work
```  

Want to see all active sessions?  

```bash
tmux ls
```  

Done with the job?  

```bash
tmux kill-session -t work
```  

This alone solves one of the biggest headaches for developers - **ssh session timeout while running scripts on a linux server**.  

### tmux commands I actually use daily

I'm not a tmux power user. I stick to the basics, and they get 99% of the work done:  

- `tmux new -s name` - start a new session for your tasks  
- `Ctrl + b`, then `d` - detach and keep processes running  
- `tmux attach -t name` - reattach later and continue work  
- `tmux ls` - list all active tmux sessions on the server  
- `tmux kill-session -t name` - clean up when done  

For most developers looking for a **simple tmux workflow**, this list is enough.  

### Splitting screens with tmux  

When I need to run **multiple terminal windows on one ssh session**, tmux makes it effortless.  

- `Ctrl + b`, then `%` - split vertically  
- `Ctrl + b`, then `"` - split horizontally  
- Use arrow keys to switch panes  

Want a new window? `Ctrl + b`, then `c`.  
Next window? `Ctrl + b`, then `n`.  
Rename? `Ctrl + b`, then `,`.  

I don't go overboard - one or two panes, maybe an extra window. But for anyone managing **multiple server tasks simultaneously**, tmux makes it neat.  

The little tmux tricks i use every day  

- Scrolling back through logs? `Ctrl + b`, then `[`  
- Closing a pane? Just type `exit` or hit `Ctrl + d`.  
- Checking sessions? Again, `tmux ls`.  

I didn't expect to rely on tmux so heavily. But now, whether I'm running docker containers on a remote server, testing code, or leaving cron jobs running overnight, I start tmux without even thinking.  

It's not about showing off some obscure terminal tool. It's about keeping your server work safe, avoiding ssh disconnect disasters, and saving hours of wasted effort.  

tmux doesn't shout for attention. It just works - and that's what makes it one of the most essential linux productivity tools for developers.
