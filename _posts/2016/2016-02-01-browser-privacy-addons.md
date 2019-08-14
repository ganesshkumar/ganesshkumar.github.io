---
title: Privacy Plugins for Browsers
date: 2016/02/01 20:03:00 +0530
layout: post
disqus: true
tags:
  - privacy
  - firefox
  - chrome
categories:
  - privacy
thumbnail: banner/privacy.png
---

Here are some of my curated list of browser add-ons to protect your privacy against trackers and advertisers. Some of the add-ons might be available only on Firefox as it is my primary browser.

## Privacy Badger
Privacy Badger blocks advertisers from loading content once they detect the advertisers are tracking you without permission. Privacy Badger(a fork of Ad-Blocker Plus) automatically analyzes and blocks any tracker who violates user consent. It provides an out of the box experience without any additional settings, knowledge or configurations by the user. Identifying itself as a privacy tool Privacy Badger does't block all the ads. It blocks only the non-consensual invasions of user's privacy. If you want to block all ads, Privacy Badger suggests you to install a traditional ad-blocker alongside.  
[Official Site](https://www.eff.org/privacybadger) | [Firefox](https://www.eff.org/files/privacy-badger-latest.xpi) |  [Chrome](https://chrome.google.com/webstore/detail/privacy-badger/pkehgijcmpdhfbdbbnkijodmdjhbjlgp)

## Disconnect
Disconnect is a collection of tools to protect your privacy. The free version **block trackers** using their tracker list(Disconnect claims to block over 5000 trackers) and provide **private search**, where they use your default search engine after anonymizing your search queries. By subscribing to their packs, you can get functionalities to **detect malware**, **identify secure public Wi-Fi**, **VPN** to mask your location and access censored websites.  

Disconnect powers the **Tracker Protection** in Firefox's Private Browsing mode. Disconnect's **private search** is the default search option in Tor browsers. Disconnect is available as both native application and browser add-ons. They have also decoupled the features and provide add-ons like private search, privacy icons, private browsing etc.  
[Official Site](https://disconnect.me/) | [Free Protection](https://disconnect.me/freeprotection)

## CanvasBlocker
CanvasBlocker protects you from [Canvas fingerprinting](http://www.browserleaks.com/canvas#how-does-it-work). Using the **Canvas** element in HTML5, it is possible to profile an user. CanvasBlocker provides different levels of settings to block the Canvas API. Using this add-on you can let websites use canvas but prevent profiling at the same time.  
[Firefox](https://addons.mozilla.org/en-US/firefox/addon/canvasblocker/) | [Chrome](https://chrome.google.com/webstore/detail/canvasfingerprintblock/ipmjngkmngdcdpmgmiebdmfbkcecdndc)

## Clean Links
 * Clean Links converts obfuscated links to genuine clean links. For example, http://www.foobar.com/goto=https://www.yoursite.com may redirect you to https://yoursite.com when clicked. Clean links can parse the entire DOM and replace the obfuscated links with the clean links.
 * Clean Links also removes tracking tags(like reference tags when you are referred from another site, search engine or email) from the urls by using configurable patterns.  
[Firefox](https://addons.mozilla.org/en-US/firefox/addon/clean-links/)

## HTTPS everywhere
When parts of the website or the entire website is compatible with HTTPS and you try to access it over HTTP, HTTPS Everywhere  will rewrites your request by encrypting the content and thereby securing your communication. It works based on predefined list of rules on how to rewrite the request to use HTTPS.  
[Official Page](https://www.eff.org/HTTPS-EVERYWHERE) | [Firefox](https://addons.mozilla.org/en-US/firefox/addon/https-everywhere/) | [Chrome](https://chrome.google.com/webstore/detail/https-everywhere/gcbommkclmclpchllfjekcdonpmejbdp?hl=en)

## uBlock
A fast and light-weight add-on to block ads, trackers and analytics. EasyList, Peter Lowe's Adservers, EasyPrivacy and Malware domains are enabled by default and users can enable more readily available lists. They also support **Hosts** file entries. They have listed various comparisons with other blockers on their [github repo](https://github.com/chrisaljoudi/ublock).  
[Official Site](https://www.ublock.org/) | [Firefox](https://addons.mozilla.org/en-US/firefox/addon/ublock/) | [Chrome](https://chrome.google.com/webstore/detail/ublock/epcnnfbjfcgphgdmggkamkmgojdagdnn)

## uBlock Origin and uMatrix
The original developer of uBlock, [Raymond Hill](https://github.com/gorhill), gave the project to the current uBlock developers and he is currently maintaining both **uBlock Origin and uMatrix**. uBlock Origin is the developer's own fork and it is not related to uBlock at present. In addition to the uBlock's blocking list, uBlock Origin has its own blocking list. Advanced version of uBlock, which is targeted for advanced options is uMatrix.  
[Official Page](https://github.com/gorhill/uBlock) | [Firefox](https://addons.mozilla.org/en-US/firefox/addon/ublock-origin/) | [Chrome](https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm?hl=en)

## Self Destructing Cookies
Tracking systems heavily rely on cookies to store information in your browser. Destroying the cookies immediately after closing the tab or browser will prevent them from accessing the information trackers had stored on your system and you can protect your privacy to a great extent. If you are using this extension, you may notice a lot of notifications popping up. You can disable it in the settings, which also allows you to fine tune the add-on.  
[Firefox](https://addons.mozilla.org/en-US/firefox/addon/self-destructing-cookies/)

## Random Agent Spoofer
Random Agent Spoofer(RAS) is a great tool to spoof your identity. This add-on can play around with lot of parameters to mock your identity. It has a list of userAgents which can be cycled through at regular intervals. It also modifies content of headers like Do Not Track, Authorization, XFF, referred options. The Accept headers are usually tailored to the profile currently being used. You can see the additional options provided by RAS [here](https://addons.mozilla.org/en-US/firefox/addon/random-agent-spoofer/). RAS doesn't exactly prevent tracking. It adds noise to the tracking system by sending random information intelligently over period of time.  
[Firefox](https://addons.mozilla.org/en-US/firefox/addon/random-agent-spoofer/)

## CsFire
CsFire protects you against Cross Site Request Forgeries(CSRF) by removing cookies and authentication headers from the cross-domain requests, thereby making them harmless. CsFire is result of academic research.  
[Official Site](https://distrinet.cs.kuleuven.be/software/CsFire/) | [Firefox](https://addons.mozilla.org/en-US/firefox/addon/csfire/) | [Chrome](https://chrome.google.com/webstore/detail/csfire/kflgpkibamedbalplkfjeodpghfelmii)

## Expire History
A simple add-on(not exactly a privacy-tool) which enables you to delete history after certain number of days. This was a Firefox feature in older versions to let users choose between slightly better performance and infinite history.  
[Firefox](https://addons.mozilla.org/en-US/firefox/addon/expire-history-by-days/)
