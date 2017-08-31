---
title: Containerize GUI Applications on Mac - II
date: 2016/08/06 06:31:00 +0530
layout: post
disqus: true
tags:
  - docker
categories:
  - docker
---

In the [previous post](http://www.ganesshkumar.com/2016/08/05/docker-mac-gui-appications.html), we ran firefox inside a container on OS X. To allow connection from the container to the X11, we used `xhost + $(hostname)`. This gives rise to serious security vulnerability.

Let's list the entries in ACL before adding our local machine

```
$ /usr/X11R6/bin/xhost
access control enabled, only authorized clients can connect
```

Now let's add our localmachine to ACL

```
$ /usr/X11R6/bin/xhost + $(hostname)
<my-machine-name>.local being added to access control list
```

Let's list the entries in ACL

```
$ /usr/X11R6/bin/xhost
access control enabled, only authorized clients can connect
INET:192.168.1.x
INET6:ganessh-macbook.local
```

Our ip address has been added to the ACL. If you are switching between networks regularly or your dynamic ip address gets renewed to a new address, X11 will stop allowing connection from the container. You **must** remove the old ip address from the ACL, else Bob can use your old ip address(in your network) and hijack your X display.

Let's remove our machine from ACL. Removing hostname will remove both hostname and ip address entries from ACL

```
$ /usr/X11R6/bin/xhost - $(hostname)
<my-machine-name>.local being removed from access control list

$ /usr/X11R6/bin/xhost
access control enabled, only authorized clients can connect
```

Using `xhost +` or open X display is one of the [high rated system vulnerabilities](http://www.nikhef.nl/~mjg/xhost_plus.html). So let's use another(safer) way in this post. The drawback of this method is that it requires us to extend the image and create a local image containing our xauth file.

* **Extending the image** to include our user to authenticate with x11.

```
# Dockerfile
FROM jess/firefox

ARG username
ARG uid

ENV USERNAME ${user}
RUN useradd -m $USERNAME && \
        echo "$USERNAME:$USERNAME" | chpasswd && \
        usermod --shell /bin/bash $USERNAME && \
        usermod  --uid ${uid} $USERNAME && \
        groupmod --gid ${uid} $USERNAME

USER ${user}

WORKDIR /home/${user}
```

* **Building docker image**. Note that the variables started with `ARG` reference in the Dockerfile are supplied using --build-args

```
$ docker build --build-arg user=$USER --build-arg uid=$(id -u) -t <image_name> .
```

* **Generate xauth file**. Using `:0` as our display. Note: if it complains that the file `/tmp/.docker.xauth` doesn't exist, `touch` the file and re-run the command.

```
$ /usr/X11R6/bin/xauth nlist :0 | sed -e 's/^..../ffff/' | /usr/X11R6/bin/xauth -f /tmp/.docker.xauth nmerge -
```

* While **starting the container**, we should mount the xauth file and set the path of the file as environmental variable using the flags
  * -v /tmp/.docker.xauth:/tmp/.docker.xauth:rw
  * -e XAUTHORITY=/tmp/.docker.xauth

```
$ docker run -d \
      --memory 2gb \
      --net host \
      --cpuset-cpus 0 \
      -v /etc/localtime:/etc/localtime:ro \
      -v /tmp/.X11-unix:/tmp/.X11-unix \
      -v $HOME/docker_data/.firefox/cache:/root/.cache/mozilla \
      -v $HOME/docker_data/.firefox/mozilla:/root/.mozilla \
      -v $HOME/Downloads:/root/Downloads \
      -v /tmp/.docker.xauth:/tmp/.docker.xauth:rw -e XAUTHORITY=/tmp/.docker.xauth \
      -e DISPLAY=$ip:0 \
      -e GDK_SCALE \
      -e GDK_DPI_SCALE \
      --name firefox \
      jess/firefox
```

The above run command will preserve firefox's data on the mounted volumes.

**Issues left unfixed**

* We haven't touched audio yet. I am yet to figure out a way to pass audio from the container to hostmachine.
* Retina display is not properly used by the container. The fonts are not smooth on the retina screen.
