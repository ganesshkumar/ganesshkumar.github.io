---
date: 2017/01/20 12:42:38 +05:30
title: "Dockerize Meteor Application"
layout: post
disqus: true
tags:
  - docker
  - docker-compose
  - meteor
categories:
  - docker
---

Let's start with building our meteor project to make it ready for the production environment. Create a file `build-docker.sh` in the project's root directory.

```
#!/bin/sh
set -e

# meteor doesn't want the build directory to be present under the root folder
meteor build --architecture=os.linux.x86_64 ../build

cd ../build && tar -zxvf <project_name>.tar.gz && cd -
docker build -t <username>/<image_name> .

```

* `meteor build` will output <project_name>.tar.gz file into the directory `build` in the project's parent directory.
* `tar` will unzip the archive and extract out the bundle directory. We need to add this bundle directory to the docker image.
* `docker build` will try to create a docker project using the project directory as the context. So we need to add `Dockerfile` to the project directory.

```
FROM node:7.4.0

COPY ../build/bundle /app
RUN cd /app/programs/server && npm install
ENV PORT=80
EXPOSE 80

CMD node /app/main.js
```

* `COPY` will add the bundle folder to the docker image under /app directory.
* `RUN` will install the required npm dependencies.
* `ENV` will set the port the server listens to inside the container.
* `EXPOSE` will make this port available to be linked outside the container.
* `CMD` will start our server when docker container of this image is run.

Running the `build-docker.sh` script will create the docker image. If you are using this locally, you can use `docker-compose` to easily link the application to a containerized database.

```
version: '2'

services:
  mongo:
    image: mongo:3.4.0
    ports:
      - "27030:27017"
    volumes:
      - $HOME/Data/mongodb:/data/db
    command: mongod --smallfiles

  web:
    image: <username>/<image_name>
    ports:
      - "8001:80"
    environment:
      - MONGO_URL=mongodb://mongo:27017/tasks
      - ROOT_URL=http://appname.local
```

* Database(mongo)
  * We are exposing the database on port 27030 to the host machine
  * $HOME/Data/mongodb is mounted on /data/db to persist the data on host machine
* Application(web)
  * We are exposing our application on port 8081 of local machine
  * MONGO_URL is set to connect to mongo service via docker network on port 27017. This is the port that mongodb listens to internally.
