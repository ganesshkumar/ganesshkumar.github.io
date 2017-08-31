---
date: 2014/11/15 00:00:00 +05:30
title: Learn Docker While Migrating Octopress to Pelican
layout: post
disqus: true
tags:
  - docker
  - pelican
  - octopress
categories:
  - computer
  - software
  - docker
thumbnail: banner/docker-pelican.jpeg
---

I rely on static site generators to write my blog. I am impressed with the ideology behind it. Keeping each and every component of the blog as small modules, templating webpages into separate components and writing markdown files for the static site generators to generate the blog is the way I enjoy to write blogs.  


Recently I have migrated my blog from Octopress to Pelican mainly for two reasons,

* The environment in which Octopress runs started to get complicated as I kept on switching devices and setup the environment again and again. Creating  new instance of environment and copying my articles into it was easier than replicating the environment from my source repository.
* I am more comfortable in python than ruby and it looks like there are more opportunities to improve Pelican when compared to Octopress. Pelican is still in early stages in terms of features.  

I made this migration bit more fun by learning and using Docker. **Docker** is an incredible piece of software serving to run virtual machines, committing them as images and storing them online in Docker Hub.

<!--more-->

First, let's install docker on the host operating system

    sudo apt-get install dockerio

Then let's search for guest OS which we will be running as a container on top of the host OS(use sudo whenever necessary)

    docker search ubuntu

We will get a list of images stored in DockerHub. Choose the version you like. I went ahead with the base ubuntu 10.04 LTS.

    docker pull ubuntu:10.04

Now, if we run the command `docker images`, we will see the list of images pulled  to your system.

```
   REPOSITORY          TAG                 IMAGE ID            CREATED             VIRTUAL SIZE
   ubuntu              14.10               277eb4304907        3 weeks ago         228.5 MB
```

Now let's create an instance of this image called container

    docker run -t -I 277eb4304907  /bin/bash

what happens here is we are running the image[id=277eb4304907]. The parameters -t -I makes the container interactive. And we are executing /bin/bash in this container. So once the command gets executed we will be dropped in a bash shell of the container(guest OS)

Following the instructions from [Pelican doc](http://docs.getpelican.com/en/3.5.0/install.html) I installed Pelican and put my articles in it and generated my blog.  

Come back to your host OS. If we execute the command `docker ps -a`, it will list all the containers running in your system.

```
    CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                       PORTS               NAMES
    4f0c70cd8e64        ubuntu:14.10        "/bin/bash"         12 hours ago        Exited (130) 12 hours ago                        sleepy_perlman
```

Now let's commit the container and get an image out of it.

```
    docker commit 4f0c70cd8e64 <user_name>/<image_name>:<tag>
```

`4f0c70cd8e64` is the container id. `<user_name>` is your Docker Hub username(if you want to upload the image to DockerHub). `<tag>` is a the tag for your image. When we create Ubuntu container :10.04 was the tag.

That's it. Push the image  to DockerHub.

    docker push <user_name>/<image_name>:<tag>

Where ever you need this container, just pull the image from DockerHub, run a container from it and get your job done. No more setting up of the same environment again and again. Have fun :)

**Note**: There are lot more about Docker. This is just a quick introduction for creating an image and pushing it to DockerHub.
