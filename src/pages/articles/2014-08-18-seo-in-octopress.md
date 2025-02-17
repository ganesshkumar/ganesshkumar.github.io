---
layout: ../../layouts/MarkdownPostLayout.astro
title: SEO in Octopress
description: Learn how to optimize your Octopress blog for search engines by adding meta keywords and descriptions to your posts.
author: Ganessh Kumar
pubDate: 2014-08-18
date: 2014-08-18
modified_date: 2014-08-18
image: /assets/images/posts/random-img.jpg
disqus: true
tags:
  - seo
  - blogging
  - octopress
categories:
  - computer
  - software
  - octopress
thumbnail: banner/analytics-in-octopress.png
---

In a html document, contains the metadata of the page in tags. Search engines use two meta elements keywords and description to index the page. The file /source/_includes/head.html is used by Octopress to add the meta information to the &lt;head&gt;

```ruby
{% capture description %}{% if page.description %}{{ page.description }}{% else %}{{ content | raw_content }}{% endif %}{% endcapture %}
<meta name="description" content="{{ description | strip_html | condense_spaces | truncate:150 }}">
{% if page.keywords %}<meta name="keywords" content="{{ page.keywords }}">{% endif %}
```

But Octopress will add the meta data only if keywords and description are provided in the YAML front matter of the post. Both keywords and description are not added in the front matter by default. Let’s add them to the front matter so we don’t need to add them manually every time we write a new post.

Open the Rakefile which is located in root folder of the project. Look for the line starting with task: new_post. This is the task which we have to edit. If you look into this task, it will open a file and write the front matter into the file as follows

```ruby
open(filename, 'w') do |post|
post.puts "---"
post.puts "layout: post"
post.puts "title: \"#{title.gsub(/&/,'&')}\""
post.puts "date: #{Time.now.strftime('%Y-%m-%d %H:%M:%S %z')}"
post.puts "comments: true"
post.puts "categories: "
post.puts "---"
end
```

Add the following lines in between the two post.puts “—” lines.

```ruby
post.puts "keywords: "
post.puts "description: "
```

Now whenever you create a new post keywords and description will appear in the front matter.