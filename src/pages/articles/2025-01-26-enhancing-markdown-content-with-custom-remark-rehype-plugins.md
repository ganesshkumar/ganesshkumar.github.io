---
layout: ../../layouts/MarkdownPostLayout.astro
title: "Enhancing Markdown Content with Custom Remark/Rehype Plugins"
description: "Learn how to automate content enrichment using custom Remark and Rehype plugins in Next.js to streamline content updates."
author: "Ganessh Kumar"
date: 2025-01-26
pubDate: 2025-01-26
modified_date: 2025-01-26
image:
  - url: /assets/images/2025-01-26-remark-rehype-plugins/remark-rehype-plugin.png
  - alt: "Enhancing Markdown Content with Custom Remark/Rehype Plugins"
disqus: false
tags:
  - Next.js
  - Remark
  - Rehype
  - Content Automation
categories:
  - technology
thumbnail: banner/remark-rehype-plugin.jpeg
---

Writing a blog can be rewarding but also repetitive and time-consuming. While writing weekly plugin posts for ObsidianStats, I found myself manually entering plugin names, links, and descriptions for each post. This manual approach was not only tedious but also lacked flexibility to keep up with evolving plugin data such as categories, tags, total downloads, and other metadata from my datastore. To overcome this challenge and improve search engine visibility, I decided to automate the process by introducing custom Markdown code blocks.

## The Challenge

Initially, my blog posts contained static plugin information written directly into Markdown files. Updating plugin details, especially when new categories were introduced, became cumbersome as I had to revisit and modify multiple posts. I needed a more efficient approach to maintain content relevance. What if I could just write something like this in Markdown?

````markdown
```plugin
{pluginId}
```
````

With this approach, instead of manually adding plugin details, the blog would automatically fetch the required information from my datastore and inject it in the appropriate place, ensuring the content stays up-to-date and optimized for search engines.

## Building a Custom Plugin for Remark

To automate this and improve content discoverability, I built a custom **Remark** plugin using `unist-util-visit` to process Markdown content during static generation in Next.js. The plugin scans for `plugin` code blocks, extracts the `pluginID`, and replaces it with an HTML structure that includes dynamically retrieved plugin details.

Here's the implementation I created:

```javascript
function remarkPluginHandler() {
  return (tree) => {
    visit(tree, 'code', (node) => {
      if (node.lang === 'plugin') {
        const pluginId = node.value.trim();
        node.type = 'html';
        node.value = `<div class="plugin-container" data-plugin-id="${pluginId}">${pluginId}</div>`;
      }
    });
  };
}
```

This plugin was then integrated into my Next.js `getStaticProps` function to process Markdown content dynamically, ensuring fast load times and better indexing by search engines.

```javascript
export const getStaticProps: GetStaticProps = async ({ params }) => {
  // stripped

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkPluginHandler)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(postData.content);

  // stripped
}
```

## Challenges Faced

Some of the key challenges I encountered during implementation included:

- Without the custom plugin, the default Markdown parser displayed `<pre>` and `<code>` blocks correctly.
- With the custom `plugin` blocks, nothing appeared in place of the `plugin` blocks.
- Removing the custom plugin resulted in Markdown being parsed normally, showing `<pre><code>` blocks.
- There were no visible errors, and console logs didn't provide any insights, making debugging difficult.
- The issue was ultimately traced to the transformation pipeline.

## Solution That Fixed the Issue

After extensive debugging, I discovered that the raw HTML generated by the custom plugin was being stripped away for security reasons. The issue was resolved by enabling the `{ allowDangerousHtml: true }` option in both `remarkRehype` and `rehypeStringify`. This allowed the HTML to be processed and included in the final output correctly, enriching the content and keeping the older content up-to date.

**Final Solution:**

```javascript
const processedContent = await unified()
  .use(remarkParse)
  .use(remarkPluginHandler)
  .use(remarkRehype, { allowDangerousHtml: true })  // Important fix
  .use(rehypeStringify, { allowDangerousHtml: true })  // Important fix
  .process(postData.content);
```

With this solution in place, the blog posts now dynamically pull plugin data based on the provided `pluginID`, reducing manual effort and ensuring consistency across all posts, leading to improved **organic search rankings**.


The default settings in `remarkRehype` and `rehypeStringify` sanitize content to prevent potential security risks, which was the reason my transformed plugin blocks were not appearing. By enabling `{ allowDangerousHtml: true }`, the pipeline was able to include the dynamically generated HTML elements in the final output without stripping them away.&#x20;


With this setup, I can now simply add the `plugin` code block with a `pluginID`, and the blog will automatically fetch and display plugin details dynamically. This has made content creation faster, easier, and more consistent.

---

What started as a small attempt to automate my blog content has turned into a valuable learning experience in working with Markdown, Remark plugins, and *Next.js*. If you are facing similar challenges in content automation, I highly recommend exploring the power of custom Markdown plugins to enhance your workflow and search engine optimization efforts.
