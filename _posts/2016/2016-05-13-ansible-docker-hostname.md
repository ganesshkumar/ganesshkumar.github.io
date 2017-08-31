---
title: Passing Host's Hostname to Docker Container
date: 2016/05/13 02:04:00 +0530
layout: post
disqus: true
tags:
  - ansible
  - docker
categories:
  - docker
---

There are two simple ways to pass `hostname` of the machine running docker daemon to the docker container using Ansible.

1. Using Environmental Variable

```
- name: Start application container
  docker:
    name: my_application
    image: my_username/my_application
    env:
        HOST_HOSTNAME: "{{ "{{ ansible_hostname " }} }}"
```

2. Setting the hostname of the docker container the same as of the host running it.

```
- name: Start application container
  docker:
    name: my_application
    image: my_username/my_application
    hostname: "{{ "{{ ansible_hostname " }} }}"
```
