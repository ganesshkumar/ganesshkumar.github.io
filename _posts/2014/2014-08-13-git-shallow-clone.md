---
date: 2014/08/13 00:00:00 +05:30
title: Git Shallow Clone
layout: post
disqus: true
tags:
  - git
categories:
  - computer
  - git
thumbnail: banner/git-logo.png
---

I was trying to clone a fat git repository to my machine. It failed with the following error message.

```
    error: index-pack died of signal 9921)  
    fatal: index-pack failed
```

Cloning a huge repository might fail quiet frequently. The solution to this is **shallow cloning** (cloning the repository in parts)

1.Clone the latest commit first and then the rest. We have to specify the depth as a parameter to clone.

```
    git clone [repo_url] --depth 1
````

2.Clone the rest of the repository  

```
    git fetch --depth=100000 or
    git fetch --unshallow (equivalent of git fetch -–depth=2147483647)
```

**Note:** If you just have a shallow clone and remote revoke the latest commit(s), you are lost. So try to unshallow it as soon as possible
