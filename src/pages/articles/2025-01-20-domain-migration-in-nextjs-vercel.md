---
layout: ../../layouts/MarkdownPostLayout.astro
title: "Handling Domain Migration in Next.js and Vercel"
description: "Learn how to manage domain migrations effectively using Next.js middleware to optimize redirections and ensure seamless user experience."
author: "Ganessh Kumar"
date: 2025-01-20
pubDate: 2025-01-20
modified_date: 2025-01-20
image:
  url: /assets/images/2025-01-20-nextjs-migration/middleware.png
  alt: "Handling Domain Migration in Next.js and Vercel"
disqus: false
tags:
  - Next.js
  - Vercel
  - SEO
  - web development
categories:
  - technology
thumbnail: banner/nextjs-migration.jpeg
---

When I decided to migrate my web application to a new domain, I wanted to ensure users had a smooth experience while keeping some features functional on the old domain. Specifically, I needed to support a /migrate page to help users transfer their data from the old domain to the new one. Initially, I thought simple domain-level redirects would do the job, but I quickly realized that supporting the /migrate page wasn't possible with that approach. That's when I decided to use Next.js middleware for domain redirects to handle the redirections more effectively.


At first, I set up domain-level redirects, mapping all requests from old-site.com to new-site.com. It seemed like the perfect solution until I found out that I couldn't selectively allow certain routes like /migrate to remain accessible under the old domain. This limitation pushed me to look for an alternative, and Next.js middleware for SEO optimization turned out to be the perfect fit.

**How I Solved It**

By using Next.js middleware for handling URL redirects, I was able to intercept requests and apply conditional redirections based on the hostname and pathname.

Here’s the middleware code I used to handle the domain transition effectively:

```ts
// middlware.ts file at the root level
import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname, hostname } = req.nextUrl;

  if (hostname === 'www.new-site.com') {
    return NextResponse.next();
  }

  if (hostname === 'old-site.com') {
    if (pathname === '/migrate' || pathname.startsWith('/_next') || pathname.startsWith('/images')) {
      return NextResponse.next();
    }
  }

  if (hostname === 'localhost' || hostname === 'dev.new-site.com') {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.hostname = 'www.new-site.com';
  url.port = "443";
  return NextResponse.redirect(url, 301);
}
```

- **Seamless Handling of Requests**: Requests to www.new-site.com were processed normally.
- **Specific Route Allowance**: The /migrate page and essential internal paths remained accessible.
- **Development Flexibility**: Local and staging environments were unaffected.
- **Automatic Redirections**: All other requests were seamlessly redirected to the new domain.

Once I implemented the middleware, I tested various scenarios to ensure it worked as expected:

- Accessing old-site.com/migrate successfully loaded the page without redirection.
- All other requests to old-site.com were redirected to new-site.com.
- Local and development environments were unaffected.


Using Next.js middleware for site redirection turned out to be a great solution for my domain migration needs. It allowed me to fine-tune redirections while ensuring critical functionality remained intact.


If you're planning a similar migration, consider using Next.js URL redirection to get precise control over your redirections while keeping your users' experience seamless.