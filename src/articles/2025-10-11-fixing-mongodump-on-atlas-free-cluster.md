---
title: "Fixing mongodump server selection timeout and authSource errors on MongoDB Atlas and Docker"
description: "If mongodump fails with a server selection timeout on MongoDB Atlas or mongorestore gives authSource errors in Docker, this guide shows the exact cause and the real working fixes for developers using free clusters or local containers."
author: "Ganessh Kumar"
date: 2025-10-11
pubDate: 2025-10-11
modified_date: 2025-10-11
image:
    url: /assets/images/2025-10-11-fixing-mongodump-on-atlas-free-cluster/mongodb-atlas-to-docker.webp
    alt: "Fix mongodump server selection timeout and authSource errors MongoDB Atlas Docker"
disqus: true
tags:
  - mongodb
  - mongodump
  - mongorestore
  - atlas
  - docker
  - database
categories:
  - databases
  - devops
  - troubleshooting
coverImage: /assets/images/2025-10-11-fixing-mongodump-on-atlas-free-cluster/mongodb-atlas-to-docker.webp
---
```

If you've ever tried taking a backup from a MongoDB Atlas free cluster using `mongodump`, you know the pain. The command looks perfect, credentials are correct, Compass connects without any issue, yet the terminal throws this confusing error:

```
Failed: can't create session: server selection error: server selection timeout
```

It's frustrating because everything else works. You double check the connection string, test the network, ping the cluster, even try it again after a few minutes, and still nothing. This is one of the most common mongodump issues on free MongoDB Atlas clusters, and it's caused by how Atlas handles connections when the cluster has been idle.

---

### Why mongodump server selection timeout happens on MongoDB Atlas

Free clusters on Atlas go to sleep when idle. When Compass connects, it silently wakes the cluster up, waits for it to become ready, then runs queries. But the command line tool mongodump doesn't wait long enough. It fires multiple parallel requests to list and dump collections, and since the cluster is still waking up, it hits the connection limit almost immediately.

That's why this small flag fixes it instantly:

```
--numParallelCollections=1
```

By default, mongodump tries to dump several collections in parallel. Atlas free tier only allows a small number of concurrent connections. Setting `--numParallelCollections=1` tells it to process one collection at a time. This single line solves almost every "server selection timeout" problem for free clusters.

If you also add a longer timeout and a softer read preference, you'll rarely see the error again:

```
mongodump \
  --uri="mongodb+srv://user:pass@freecluster.mdev1.mongodb.net/dbname" \
  --numParallelCollections=1 \
  --timeoutMS=60000 \
  --readPreference=secondaryPreferred \
  --gzip
  --archive=/tmp/remote.dump.gz
```

This combination works best for free MongoDB Atlas clusters, especially if you're using the `mongodb+srv` connection string. The retry behavior improves when the cluster is waking from an idle state.

Many developers hit this same issue and waste hours changing IP allowlist, rechecking credentials or trying new versions of tools. The fix is just one flag that controls concurrency.

---

### Fixing mongorestore authSource error on Docker or local MongoDB

Once the backup runs fine, the next headache usually comes while restoring it to a local MongoDB instance inside Docker. You run:

```
mongorestore --uri="mongodb://dbuser:dbpass@localhost:27017/mydb" --gzip --archive=/tmp/remote.dump.gz
```

and suddenly you see authentication errors. It says the user is not authorized or that authentication failed. This is because of how MongoDB handles authentication sources by default.

MongoDB stores user credentials in a specific database, not globally. When you create a user in a Docker setup, the default database for authentication is usually `admin`. But when you restore data into another database like `mydb`, the CLI assumes that the credentials are stored inside that same database. So it fails.

The correct fix is to specify `authSource=admin` in your connection string:

```
mongorestore \
  --uri="mongodb://dbuser:dbpass@localhost:27017/mydb?authSource=admin" \
  --gzip
  --archive=/tmp/remote.dump.gz
```

This tells MongoDB to authenticate the user using the `admin` database while performing operations on `mydb`. Without it, the restore process cannot find the user credentials and just rejects the connection.

It's not obvious at first glance. Compass and Studio 3T often handle this automatically, but the command line tools don't. The `authSource` parameter makes sure authentication happens in the right place.

---

### Why this matters when moving between Atlas and local Docker MongoDB

If you develop with MongoDB Atlas and test locally using Docker, these small connection differences can easily break your automation scripts. In Atlas you need to control how many parallel threads connect at once, and locally you need to explicitly say where the credentials are stored.

Both `mongodump` and `mongorestore` look like simple utilities, but they depend heavily on how MongoDB manages connections under the hood. Free tier clusters are slower, limited, and wake up lazily. Docker containers are fast, isolated and sometimes stricter about where credentials live.

Understanding this will save you time. You won't waste effort debugging network settings or changing firewall rules when the real fix is a simple connection flag.

---

### Practical commands that work every time

Backup from MongoDB Atlas free cluster:

```
mongodump \
  --uri="mongodb+srv://user:pass@freecluster.mdev1.mongodb.net/dbname" \
  --numParallelCollections=1 \
  --timeoutMS=60000 \
  --readPreference=secondaryPreferred \
  --gzip \
  --archive=/tmp/remote.dump.gz
```

Restore to local Docker MongoDB:

```
mongorestore \
  --uri="mongodb://dbuser:dbpass@localhost:27017/dbname?authSource=admin" \
  --gzip \
  --drop \
  --archive=/tmp/remote.dump.gz
```

Both commands work perfectly if the network and user credentials are correct.

