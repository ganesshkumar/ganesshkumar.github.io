---
title: Containerize GUI Applications on Mac
date: 2016/08/05 05:20:00 +0530
layout: post
disqus: true
tags:
  - docker
categories:
  - docker
---

After watching [Container Hacks and Fun Images](https://www.youtube.com/watch?v=1qlLUf7KtAw) by Jessie Frazelle, I wanted to Containerize my GUI applications on OS X.

* OS X doesn't expose device files `/dev/snd` or `/dev/video`.
* OS X doesn't have a default x11 client. So we have to rely on XQuartz

This guide is tested under

 * OS X El Capitan (version 10.11.4)
 * Docker for Mac ([1.12.0-beta21](https://docs.docker.com/docker-for-mac/))
 * XQuartz ([2.7.10_beta2](https://www.xquartz.org/releases/index.html))

It also works well under OS X(10.11.5) and Docker for Mac(1.12 stable) but XQuartz version must be 2.7.1_beta2(latest as of now). As pointed by [Fredrik Averpil](https://fredrikaverpil.github.io/2016/07/31/docker-for-mac-and-gui-applications/), there is a [bug](https://bugs.freedesktop.org/show_bug.cgi?id=95379) in XQuartz 2.7.9 stable version, which prevents opening the display from remote.

Note: After installing XQuartz you need to log out and log in back.

**Running a container**

* Start xQuartz  

```
$ open -a XQuartz
```

* Allow connections from remote clients  
  * xQuartz's `Preference` → `Security` → `Allow connections from network clients`  
  ![xQuartz preference]({{ site.url }}/images/2016-08-05-docker-mac-gui-appications/xquartz_preference.png)
  * Get the ip address of your local machine  

  ```
  $ ip=$(ifconfig en0 | grep inet | awk '$1=="inet" {print $2}')
  ```

  * Add your local machine to ACL. Using hostname is safer than using ip address.

  ```
  $ /usr/X11R6/bin/xhost + $(hostname)
  ```

* Run firefox. Let's use [Jessie Frazzelle's](https://blog.jessfraz.com/) [firefox image](https://github.com/jfrazelle/dockerfiles/tree/master/firefox)  

```
$ docker run -d --name firefox -e DISPLAY=$ip:0 -v /tmp/.X11-unix:/tmp/.X11-unix jess/firefox
```

![xQuartz preference]({{ site.url }}/images/2016-08-05-docker-mac-gui-appications/firefox_docker.png)

Edit: There is a new [post](http://www.ganesshkumar.com/2016/08/06/docker-mac-gui-applications-2.html) with improved security using `xauth` instead of xhost.
