---
date: 2016/12/13 02:07:54 +05:30
title: "Nathas: Your Slack DJ"
layout: post
disqus: true
tags:
  - chatbot
  - hackathon
  - slack
categories:
  - project
  - hackathon
---

Nathas, a slack bot, is our entry for the [India's first botathon](http://tlabs.in/event/indias-first-botathon/) conducted by TLabs. Nathas has won us the second runner-up at the hackathon.

Nathas is a slack bot that sits and listens to messages sent on a particular channel. It will process any message that starts with `@nathas` and will ignore the rest.

You can see a list of commands that @nathas will understand by simply asking for help. on typing `@nathas help`, you will get back the following message from @nathas.

```
$ @nathas command [options]

list          list the songs in the queue
play _[song]_ to add a song to queue
clear all     to clear the queue
next          to play the next song
pause         to pause the current song
resume        to resume the paused song
suggest       to get song suggestion
shuffle       to shuffle your song queue
volumeup      to increase the volume of the player
volumedown    to decrease the volume of the player
```

As you can see from the help, you can list, add, clear songs from the queue. You can pause, resume, play next song, increase or decrease the volume, shuffle the songs in the queue and ask for suggestions from @nathas.

Instead of `@naths play [song]` if you enter an artist name like `@nathas play AR Rahman`, @nathas will recognize the artist and will suggest the artist's ten most played songs from Youtube.

![Artist]({{ site.url }}/images/2016-12-13-nathas-your-slack-dj/artist.png)

If you type `@nathas suggest something to listen to`, @nathas will suggest songs based on previously played songs. @nathas generated this suggestion by combining data from Youtube and Spotify's free APIs.

To play the songs, we wrote a meteor web application, [Nathas Frontend](https://github.com/TeamSven/nathas-frontend), which will monitor @nathas and play the songs using YouTube API.

We had a lot of fun building this simple bot. You can grab the code [here](https://github.com/TeamSven/nathas) and set up @nathas on your slack channel.
