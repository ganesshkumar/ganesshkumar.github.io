---
layout: ../../layouts/MarkdownPostLayout.astro
title: Upgrading Google Analytics in Octopress
description: Learn how to upgrade Google Analytics in Octopress to include Demographics and Interest reports with a simple one-line change.
author: Ganessh Kumar
pubDate: 2014-09-08
date: 2014-09-08
modified_date: 2014-09-08
image: /assets/images/posts/random-img.jpg
disqus: true
tags:
  - google analytics
  - universal analytics
categories:
  - computer
  - software
  - octopress
thumbnail: banner/analytics-in-octopress.png
---

Google Analytics for Octopress hasn’t integrated the latest update to include **Demographics and Interest** reports. In Octopress, Google Analytics code resides in source/_includes/google_analytics.html

According to Google, one line change will include the demographics and interest reports to your analytics. Following is the diff of my source/_includes/google_analytics.html

Just replace the line

```js
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
```

to

```js
ga.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'stats.g.doubleclick.net/dc.js';
```

And you are done. It will take upto 24 hours for the new reports to start appearing.

I have opened a [pull request](https://github.com/imathis/octopress/pull/1647) for this upgrade. If this gets merged, these reports should be included by default.