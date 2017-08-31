---
title: Notes on my Virtual Box
date: 2016/08/18 18:32:00 +0530
layout: post
disqus: true
tags:
  - virtual-box
categories:
  - virtual-box
---

Though I use OS X as my primary operating system now a days, I still use [Ubuntu GNOME](https://ubuntugnome.org/) on a virtual box for one or two projects. Why not? I love GNOME. This post contains notes on my virtual box setup, primarily for my reference.

## Post Installation

```
$ apt-get update
$ apt-get install vim git build-essential
```

## Tools and softwares

* Docker

```
$ # Setup sources for apt
$ sudo apt-get install apt-transport-https ca-certificates
$ sudo apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv-keys 58118E89F3A912897C070ADBF76221572C52609D
$ echo "deb https://apt.dockerproject.org/repo ubuntu-xenial main" > /etc/apt/sources.list.d/docker.list # for 16.04

$ # Clean and check apt source
$ sudo apt-get update
$ sudo apt-get purge lxc-docker
$ apt-cache policy docker-engine

$ # Install docker
$ sudo apt-get install linux-image-extra-$(uname -r) # recommended
$ sudo apt-get install docker-engine

$ # Add user to docker group to avoid usage of sudo everytime
$ sudo usermod -aG docker $USER

$ # Start docker
$ sudo service docker start
```

## Useful commands

* Mount the shared folder with read-write permission for the user.

```
sudo mount -t vboxsf -o uid=<user_id> <shared_folder_name> /mount/point
```
