---
layout: ../../layouts/MarkdownPostLayout.astro
title: Git Shallow Clone
description: Learn how to handle cloning large Git repositories efficiently using shallow cloning to avoid common errors and improve performance.
author: Ganessh Kumar
pubDate: 2014-08-13
date: 2014-08-13
modified_date: 2014-08-13
image: /assets/images/posts/random-img.jpg
disqus: true
tags:
  - git
categories:
  - computer
  - git
thumbnail: banner/git-logo.png
---

I was trying to clone a fat git repository to my machine. It failed with the following error message.

```shell
error: index-pack died of signal 9921)  
fatal: index-pack failed
```

Cloning a huge repository might fail quiet frequently. The solution to this is **shallow cloning** (cloning the repository in parts)

1.Clone the latest commit first and then the rest. We have to specify the depth as a parameter to clone.

```shell
  git clone [repo_url] --depth 1
````

2.Clone the rest of the repository  

```shell
  git fetch --depth=100000 or
  git fetch --unshallow (equivalent of git fetch -–depth=2147483647)
```

**Note:** If you just have a shallow clone and remote revoke the latest commit(s), you are lost. So try to unshallow it as soon as possible