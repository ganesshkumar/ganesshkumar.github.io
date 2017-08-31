---
date: 2014/03/05 00:00:00 +05:30
title: Save The Hacker
layout: post
disqus: true
tags:
  - product reviews
  - sentiment analysis
categories:
  - project
  - hackathon
thumbnail: banner/save-the-hacker.png
---

**Sentiment analysis on product reviews** is our idea for "Save the Hacker" hackathon. Our basic goals were to

* Scrap product reviews across various e-commerce websites and do sentiment analysis classify them under positive, negative and neutral categories.
* Extract various features of the product from the reviews and do sentiment analysis on them.
* Date wise analysis of the product from common data source like Twitter

**Outcome?**

* Goal 1 will help to capture the overall sentiment about the product and the corresponding e-commerce website's performance. For example, one may provide better delivery and the other may provide better customer service etc. This metric will help you to get an idea of where should we buy the product from not considering only the price as a factor.
* Goal 2 will help to know about the product's features from customer provided reviews across these e-commerce sites.
* Goal 3 will help you identify the improvement in products over iterations. For example, PS4 had lot of complaints on the release day but after next set of consoles got released the complaints got reduced. So, this metric will help to get an idea about how the product's quality varies over a period of time.


For the hackathon, we chose to proceed only with

* Flikart and Amazon as the target e-commerce websites
* Mobile as the targeted product
* Twitter tweets as the source for day by day analysis of the product

And **Panda**(we felt that Pandas are cool, so named it Panda) came to life in the next 30 hours

![Main page](http://i.imgur.com/zUbNOSw.png)

The entire first time process of scrapping all the reviews from Amazon and Flipkart, doing sentiment analysis on them was time consuming process. So we chose only two products *Galaxy Note 3* and *Nokia Lumia 1520* for the demo.

![Analysis1](http://i.imgur.com/92wlCJF.png)

This is the comparison of sentiment analysis of customer reviews on Amazon and Flipkart. We also done sentiment analysis on tweets regarding this product. The twitter data only captures the sentiment on products.

![Analysis2](http://i.imgur.com/By5B6j2.png)

We considered battery, display, RAM and storage as static features that will be analyzed. These are based on reviews from Amazon, Flipkart and tweets that spoke about these features.

![Analysis3](http://i.imgur.com/ZNX4Pqt.png)

This is the day by day analysis based on tweets
