---
title: Docker - Disable Stream Buffers in Python
date: 2016/07/10 22:00:00 +0530
layout: post
disqus: true
tags:
  - python
  - docker
categories:
  - docker
---

When running python application inside docker container, one may use `print` function for debugging. Usually it takes long time before you see anything on the screen as python tries to buffer the output to stdout and stderror. To force python to print immediately, set the environmental variable `PYTHONUNBUFFERED=0` or run python with the flag `-u` inside the container. Both these force stdout and stderr stream to be unbuffered.

There is very little possibility that this variable might change, so you can configure via Dockerfile.
