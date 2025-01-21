---
layout: ../../layouts/MarkdownPostLayout.astro
title: "Fixing Google Search Console errors caused by multiple values in JSON-LD schema"
description: "Discover how adding @id to JSON-LD schema resolved Google Search Console errors and improved schema validity for enhanced search visibility."
author: "Ganessh Kumar"
date: 2025-01-04
pubDate: 2025-01-04
modified_date: 2025-01-04
image:
    url: /assets/images/posts/jsonld-fix.jpg
    alt: "JSON-LD Schema Fix"
disqus: true
tags:
  - json-ld
  - seo
  - google search console
  - multiple aggregate ratings
  - structured data errors
categories:
  - web development
thumbnail: banner/jsonld-schema-fix.jpeg
---

### How do you fix Google Search Console errors caused by multiple aggregate ratings in JSON-LD schema?

If you’ve encountered errors in Google Search Console related to JSON-LD schema, such as:

> "Review has multiple aggregate ratings. Items with this issue are invalid. Invalid items are not eligible for Google Search's rich results,"

this post will help you understand and resolve the issue. The solution lies in using the `@id` property in your schema to fix structured data errors.

---

#### Understanding the Problem

When working with JSON-LD structured data for SEO, it’s crucial to provide unique identifiers for nested objects. If objects like `aggregateRating`, `offers`, or `author` etc. don’t have an `@id`, Google may treat them as standalone entities, causing errors such as duplicate entries or multiple aggregate ratings.

For instance, the following schema caused issues:

```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "url": "https://example.com/plugins/mock-plugin",
  "name": "Mock Plugin - A plugin for Obsidian",
  "aggregateRating": {
    "@type": "AggregateRating",
    "worstRating": 0,
    "bestRating": 100,
    "ratingValue": 51,
    "ratingCount": 2
  },
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "author": {
    "@type": "Person",
    "name": "mockauthor"
  }
}
```

Google Search Console flagged this schema because it could not associate the `aggregateRating`, `offers`, and `author` objects with the parent `SoftwareApplication` object. This confusion leads to errors in structured data, reducing the chances of your page appearing as a rich snippet in search results.

---

#### The Solution: Adding @id to Fix JSON-LD Errors

To fix this, you need to add an `@id` property to nested objects. This property acts as a unique identifier, ensuring that Google recognizes these objects as part of the same entity, thereby resolving the "multiple aggregate ratings" issue.

Here’s the updated schema:

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "SoftwareApplication",
      "@id": "https://example.com/plugins/mock-plugin",
      "url": "https://example.com/plugins/mock-plugin",
      "name": "Mock Plugin - A plugin for Obsidian",
      "aggregateRating": {
        "@type": "AggregateRating",
        "@id": "https://example.com/plugins/mock-plugin#aggregateRating",
        "worstRating": 0,
        "bestRating": 100,
        "ratingValue": 51,
        "ratingCount": 2
      },
      "offers": {
        "@type": "Offer",
        "@id": "https://example.com/plugins/mock-plugin#offers",
        "price": "0",
        "priceCurrency": "USD"
      },
      "author": {
        "@type": "Person",
        "@id": "https://example.com/plugins/mock-plugin#author",
        "name": "mockauthor"
      }
    }
  ]
}
```

**To summarize**

1. **Always Use @id in Structured Data:** Include an `@id` property in nested or referenced objects to avoid ambiguity.
2. **Validate Your JSON-LD Schema:** Use [Google’s Rich Results Test](https://search.google.com/test/rich-results) to check for errors and ensure schema validity.
3. **Optimize for Long-Tail Keywords:** Structure your data to align with SEO best practices and ensure compatibility with Google’s standards.
4. **Stay Updated on Structured Data Guidelines:** Adhering to the latest recommendations ensures long-term visibility and reduces the chances of errors.

By resolving issues like "multiple aggregate ratings" in your JSON-LD schema, you can significantly improve your content’s visibility and performance in search engine results.
