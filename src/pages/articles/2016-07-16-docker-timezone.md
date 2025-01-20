---
layout: ../../layouts/MarkdownPostLayout.astro
title: Docker - Sync your clock
description: Sync Docker container clock with the system and set the right timezone for accurate timekeeping in your apps.
author: Ganessh Kumar
pubDate: 2016-07-16
date: 2016-07-16
modified_date: 2016-07-16
image: /assets/images/posts/random-img.jpg
disqus: true
tags:
  - docker
categories:
  - docker
---

**Setting the Timezone**  
By default docker containers will sync their clock with the system clock but the default timezone will be set to "UTC". If we are using `Date` or `Time` in our application, we have to manually set the timezone for the container. One easy way to do so is by setting the environmental variable `-e "TZ=Asia/Kolkata"`.


**Syncing the clock**  
Sometimes, the container clock will deviate a little from the local system clock. OS X, linux and unix have '/etc/localtime' file by default. We can mount this file as a read-only file inside the container. `-v /etc/localtime:/etc/localtime:ro`.