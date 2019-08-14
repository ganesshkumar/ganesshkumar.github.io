---
date: 2014/09/07 00:00:00 +05:30
title: Using Spotify Outside US and UK
layout: post
disqus: true
tags:
  - spotify
categories:
  - life style
  - hack
thumbnail: banner/spotify-logo.png
---

[Spotify](https://www.spotify.com/) has been the best music streaming application I have used till date. Spotify is available to limited countries as of now. So if you are not from US or UK and want to use Spotify here is a simple work around.

## How does Spotify verifies your country

When signing up for an account you have to select your country. You won’t be able to create an account if your country is not supported by Spotify. If you are from a country that is not in the supported list, create an account with UK or US as your country.

Later, (only) whenever you log in to the application, a **country check** is triggered and it uses your IP to check if your country matches with the one you selected when you created your account. So this is the place when we should use a proxy.

## Workaround

We are going to use a proxy when we log in to the application. I use [TunnelBear](https://www.tunnelbear.com/) for proxy. It allows us to transmit 500MB of data through their proxy every month.

* [Download](https://www.tunnelbear.com/download/) and install TunnelBear
* Crate a TunnelBear Little(free tier) account
* Launch TunnelBear and choose the country(US or UK) that you specified when you created Spotify account
* Turn on TunnelBear
* Log in to Spotify
* Turn off TunnelBear(as data transfer through proxy will be slow and we have only 500MB data limit per month)
* Use Spotify and keep listening to music
