---
title: Docker - Sync your clock
date: 2016/07/16 05:20:00 +0530
layout: post
disqus: true
tags:
  - docker
categories:
  - docker
---

By default docker container's will sync their time with the local system time but the default timezone is "UTC". If you are using `Date` or `Time` in your application, you have to manually set the timezone for the container. One easy way to do so is using the environmental variable `-e "TZ=Asia/Kolkata"`.

But sometimes, the container time will deviate a little from the local system time. In that case, OS X, linux and unix have '/etc/localtime' file by default. One can mount this file as a read-only file inside the container. `-v /etc/localtime:/etc/localtime:ro`.

Please post below, if you find any other issues related to time within docker container.
