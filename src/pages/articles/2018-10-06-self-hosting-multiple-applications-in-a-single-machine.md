---
layout: ../../layouts/MarkdownPostLayout.astro
title: "Self-hosting multiple applications in a single machine"
description: "Learn how to self-host multiple applications on a single machine using Docker, Nginx, and Let's Encrypt for SSL certificates. This guide walks you through setting up a reverse proxy, securing your applications, and managing SSL renewals."
author: Ganessh Kumar
pubDate: 2018-10-06
date: 2018-10-06
modified_date: 2018-10-06
image: /assets/images/posts/random-img.jpg
disqus: true
tags:
  - docker
  - nginx
  - certbot
categories:
  - self-hosting
---

I love self-hosting personal applications. I spun a machine on cloud and started hosting my applications. As I wanted to host my second application, I got struck routing both the application's request to the same machine without needing to specify a port number in the URL. Specifying a port number in the URL like http://miniflux.ganesshkumar.com:5000 and http://blog.ganesshkumar.com:4000 made the URL look ugly.  

After searching for a while, I found that reverse proxy using nginx can come in handy. At this point, I also wanted to enforce SSL to the applications as my application needed login. [Let's Encrypt](https://letsencrypt.org/) provides free SSL certificates. Now I needed to put together nginx, certificates and my applications to work together. To reduce setup procedures, I opted to use Docker. In this post let's see how I put all the pieces together.

The first application I want to host in [miniflux](https://miniflux.app/), a minimalist feed reader.

Let's create two folders in the home directory. `data` to hold all the volumes that will be mounted in docker and `docker-compose` to hold docker-compose files to launch the services and applications.

```shell
$ mkdir data docker-compose
```

### 1. Let's start our first application

Create the folders for data and docker-compose

```shell
$ mkdir data/miniflux docker-compose/miniflux
```

Then create _docker-compose.yml_ file in the docker-compose/miniflux folder with the following content

```yaml
version: '3'
services:
  miniflux:
    image: miniflux/miniflux:latest
    ports:
      - "8000:8080"
    depends_on:
      - db
    environment:
      - DATABASE_URL=postgres://<username>:<password>@db/miniflux?sslmode=disable
  db:
    image: postgres:10.1
    environment:
      - POSTGRES_USER=<username>
      - POSTGRES_PASSWORD=<password>
    volumes:
      - ${HOME}/data/miniflux:/var/lib/postgresql/data
```

Now running `docker-compose up -d` in the docker-compose folder will run this application in the background. We can reach the server on _localhost:8000_. Our first application is up and running now.

### 2. Starting nginx

Create the folders for data and docker-compose

```shell
$ mkdir data/nginx docker-compose/nginx
```

We will be mounting SSL certificates in nginx container, so that our applications will be served over a secured layer. Create folders for holding the certificates

```shell
$ mkdir -p data/letsencrypt/certs data/letsencrypt/certs-data
```

Then create _docker-compose.yml_ file with the following contents

```yaml
version: '3'
services:
  nginx:
    image: nginx:alpine
    container_name: nginx
    restart: always
    network_mode: host
    volumes:
      - ${HOME}/data/letsencrypt/certs:/etc/letsencrypt
      - ${HOME}/data/letsencrypt/certs-data:/data/letsencrypt
      - ${HOME}/data/nginx:/etc/nginx
    ports:
      - 80:80
      - 443:443
```

Before string the ngix container, we have to create a config file for nginx. Create `data/nginx/nginx.conf` file with the following content

```apacheconf
events {
}

http {
    server {
        listen      80;
        listen [::]:80;
        server_name miniflux.ganesshkumar.com;

         location / {
                rewrite ^ https://$host$request_uri? permanent;
        }

        location ^~ /.well-known {
                allow all;
                root  /data/letsencrypt/;
        }
    }
}
```

This config dictates to redirect any request to `miniflux.ganesshkumar.com` to `https://ganesshkumar.com`. Also serve the request to _/.well-known_ to be served from _/data/letscrypt_ directory. This .well-known endpoint will be used by Let's Encrypt to verify our DNS entry for miniflux.

Now, we can run `docker-compose up -d` from the docker-compose directory to start the nginx server. The request to miniflux will not reach the application yet, as we haven't routed it to localhost:8000 but still the nginx server will help set up the SSL certificates for the miniflux domain.

### 3. Setting up SSL certificates

Let's Encrypt provides to tool certbot to create our SSL certificates. Let's use the docker image of certbot to do that. Run the following docker command.

```shell
$ docker run -it --rm \
        -v certs:/etc/letsencrypt \
        -v certs-data:/data/letsencrypt \
        deliverous/certbot \
        certonly \
        --webroot --webroot-path=/data/letsencrypt
        -d miniflux.ganesshkumar.com
```

The above command will generate a challage and tries to solve it at `miniflux.ganesshkumar.com/.well-known`. Our nginx server has enough configuration to host the contents of .well-known folder generated by the certbot.

On successful execution of the above command, you will have your certificates generated at data/letsencrypt/certs-data directory.

### 4. Routing the request to the application

Now let's modify the contents of _nginx.conf_ file, to route the requests to miniflux.ganesshkumar.com to localhost:8000.

Add the following code to the http section of _nginx.conf_

```apacheconf
    server {
        listen      443           ssl http2;
        listen [::]:443           ssl http2;
        server_name               miniflux.ganesshkumar.com;

        ssl                       on;

        add_header                Strict-Transport-Security "max-age=31536000" always;

        ssl_session_cache         shared:SSL:20m;
        ssl_session_timeout       10m;

        ssl_protocols             TLSv1 TLSv1.1 TLSv1.2;
        ssl_prefer_server_ciphers on;
        ssl_ciphers               "ECDH+AESGCM:ECDH+AES256:ECDH+AES128:!ADH:!AECDH:!MD5;";

        ssl_stapling              on;
        ssl_stapling_verify       on;
        resolver                  8.8.8.8 8.8.4.4;

        ssl_certificate           /etc/letsencrypt/live/miniflux.ganesshkumar.com/fullchain.pem;
        ssl_certificate_key       /etc/letsencrypt/live/miniflux.ganesshkumar.com/privkey.pem;
        ssl_trusted_certificate   /etc/letsencrypt/live/miniflux.ganesshkumar.com/chain.pem;

        access_log                /dev/stdout;
        error_log                 /dev/stderr info;

        location / {
            proxy_pass           http://127.0.0.1:8000;
            proxy_set_header     Host $host;
            proxy_set_header     X-Forwarded-For $remote_addr;
        }
    }
```

We are almost done. Restart the nginx server to use the latest configuration. Run the following command in nginx's docker-compose directory.

```shell
$ docker-compose down
$ docker-compose up -d
```

That all. Our request to http://miniflux.ganesshkumar.com will be redirected to https://miniflux.ganesshkumar.com which will be served from localhost:8000, making sure that all the requests are being served over SSL.

**To add a second application**, just repeat all the four steps. You will be serving both the applications from the same machine using nginx reverse proxy.

### 5. Renewing SSL certificate

After few months your SSL certificate will expire. You can run the following command to renew the certificate.

```shell
$ docker run -t --rm \
      -v certs:/etc/letsencrypt \
      -v certs-data:/data/letsencrypt \
      deliverous/certbot \
      renew \
      --webroot --webroot-path=/data/letsencrypt

$ docker-compose kill -s HUP nginx
```

This set up has made the process of deploying any new application to the server simple :)