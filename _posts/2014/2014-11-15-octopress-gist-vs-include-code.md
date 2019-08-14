---
date: 2014/11/15 00:00:00 +05:30
title: Octopress Gist vs Include-code
layout: post
disqus: true
tags:
  - github
  - octopress
categories:
  - computer
  - software
  - octopress
thumbnail: banner/source-code.png
---

I was using **gist** to share code snippets in this blog. Today I stumbled upon [Pingdom](http://tools.pingdom.com/fpt/), a tool to test the load time of that page, analyze it and find bottlenecks. I tested my blog and found that gist is taking approximately 300ms to load, which is bad. The average time taken to load my blog was 686ms and **300ms taken by gist is approximately 50% of the load time**.

Files loaded from gist

* My target file (from gist.github.com)
* Gist CSS file (from gist-assets.github.com)

So I decided to stop using gist. To share code snippets, Octopress provides three other options: [Backtick Code Blocks](http://octopress.org/docs/plugins/backtick-codeblock/), [Inline Code Blocks](http://octopress.org/docs/blogging/code/) and [Include Code](http://octopress.org/docs/plugins/include-code/). Of these three options, include code behaves very much like gist. You can put your code snippet into a file and give the filename as argument to include_code plugin. Further, When I had to share a ruby block in my blog, include_code seemed to be elegant way of doing it. Ruby block shared using other methods were executed by Octopress when generating the blog. Now the average load time of this blog is **375ms i.e. 45% faster than before**.

Personally I prefer include_code if I am sharing a snippet or ruby code with paranthesis and blockcode if I am sharing one or two lines of code.
