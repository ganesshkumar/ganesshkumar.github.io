# Analytics Instrumentation

## Purpose
This document defines how analytics are collected, what is tracked automatically, how custom events are instrumented and how analytics data maps to KPI measurement.

Use this for:
- integrating Plausible tracking into new pages and components,
- firing custom events from user interactions,
- understanding what data is collected and why,
- and maintaining GDPR-compliant privacy-first analytics.

## Analytics platform
- **Platform**: Plausible Analytics (self-hosted)
- **Instance URL**: `https://count.ganesshkumar.com`
- **Tracked domain**: `ganesshkumar.com`
- **Data retention**: per Plausible default policy
- **Privacy model**: GDPR-compliant, cookieless, no IP logging

## Plausible configuration
The site loads Plausible with extended features enabled:

```tsx
// In src/app/layout.tsx (root layout)
<Script
  defer
  data-domain="ganesshkumar.com"
  src="https://count.ganesshkumar.com/js/script.file-downloads.outbound-links.pageview-props.tagged-events.js"
/>
<Script id="plausible-init" strategy="beforeInteractive">
  {`
    window.plausible = window.plausible || function() { 
      (window.plausible.q = window.plausible.q || []).push(arguments) 
    }
  `}
</Script>
```

## Enabled extensions

### 1. File downloads (`file-downloads`)
Automatically tracks clicks on downloadable file types.

**Tracked file types**:
- `.pdf`, `.xlsx`, `.docx`, `.pptx`, `.zip`, `.txt`
- and other common binary/document types

**Event name**: `File Downloaded`

**Use case**: Measure engagement with downloadable resources such as guides, checklists or worksheets.

### 2. Outbound links (`outbound-links`)
Automatically tracks clicks to external domains.

**Tracked**: Any `<a>` tag pointing outside the site domain.

**Event name**: `Outbound Link: <domain>`

**Use case**: Track referral quality and traffic sent to external resources (GitHub, LinkedIn, tools, affiliate links).

### 3. Custom page properties (`pageview-props`)
Allows attaching arbitrary properties to pageview events.

**How to use**:
```javascript
window.plausible('pageview', {
  props: {
    article_topic: 'React',
    article_length_minutes: 12,
    has_code_blocks: true
  }
})
```

**Use case**: Segment traffic by content attributes (topic, reading time, complexity level).

### 4. Custom event tracking (`tagged-events`)
Allows firing arbitrary custom events with properties.

**How to use**:
```javascript
window.plausible('Newsletter Signup', { props: { source: 'homepage' } })
window.plausible('Contact Form Submitted', { props: { intent: 'collaboration' } })
```

**Constraints**:
- Event names are case-sensitive.
- Properties are key-value pairs (string values recommended).
- Property values should be concise (< 200 chars).

## Automatic tracking

### Pageviews
**What gets tracked**:
- Every page load
- Browser information (user agent)
- Referrer
- Device type (mobile/tablet/desktop)
- Country/region (from IP geolocation)

**What is NOT tracked**:
- Individual IP address
- Personal identifiers
- Cookies or session IDs
- Device ID or fingerprinting

### Outbound links
**What gets tracked**:
- Click to external domains
- Target URL domain
- Timestamp
- Referrer page

**Excluded domains**: None by default (all external domains are tracked).

### File downloads
**What gets tracked**:
- File name and extension
- URL path
- Timestamp
- Referrer page

## Custom event taxonomy

### Core conversion events

#### Newsletter signup
```javascript
window.plausible('Newsletter Signup', {
  props: {
    source: 'homepage' | 'article' | 'sidebar' | 'footer',
    placement: 'above_fold' | 'mid_content' | 'end_content'
  }
})
```

**KPI link**: Newsletter subscribers, signup rate.

#### Contact form submission
```javascript
window.plausible('Contact Form Submitted', {
  props: {
    intent: 'general' | 'collaboration' | 'speaking' | 'feedback',
    status: 'success' | 'error'
  }
})
```

**KPI link**: Contact form completion rate, collaboration inquiries.

#### Article engagement
```javascript
window.plausible('Article Engagement', {
  props: {
    article_slug: 'react-accessibility-making-your-app-inclusive',
    scroll_depth: '25' | '50' | '75' | '100',
    time_on_page_seconds: '60'
  }
})
```

**How to implement**: Fire on scroll milestones (25%, 50%, 75%, 100%) and on page exit.

**KPI link**: Scroll depth, time on article, engagement rate.

#### Related content click
```javascript
window.plausible('Related Content Clicked', {
  props: {
    source_article: 'rust-ownership-explained',
    target_article: 'rust-lifetimes-deep-dive',
    position: '1' | '2' | '3',
    section: 'related_articles' | 'suggestions' | 'sidebar'
  }
})
```

**KPI link**: Click-through to related content, content graph depth.

#### Project/case study view
```javascript
window.plausible('Project Viewed', {
  props: {
    project_id: 'obsidian-plugin-stats',
    section: 'overview' | 'technical_details' | 'outcomes'
  }
})
```

**KPI link**: Project engagement, case study quality.

#### Affiliate or sponsor click
```javascript
window.plausible('Affiliate Click', {
  props: {
    affiliate_partner: 'netlify' | 'vercel' | 'tailwindcss',
    article_slug: 'nextjs-optimization-guide',
    position: 'in-article' | 'sidebar' | 'end-of-article'
  }
})
```

**KPI link**: Affiliate CTR, monetization health.

### Secondary events

#### Search (if implemented)
```javascript
window.plausible('Search', {
  props: {
    query: 'user search term',
    results_count: '12'
  }
})
```

#### Tag/topic navigation
```javascript
window.plausible('Tag Clicked', {
  props: {
    tag: 'react',
    source_page: 'articles' | 'article_detail'
  }
})
```

#### Series progression
```javascript
window.plausible('Series Next', {
  props: {
    series_id: 'rust-fundamentals',
    current_part: '1',
    next_part: '2'
  }
})
```

## Implementation patterns

### In React components (client-side)
```tsx
import { useEffect } from 'react';

export function ArticleDetail({ article }) {
  useEffect(() => {
    // Track pageview with article properties
    window.plausible?.('pageview', {
      props: {
        article_topic: article.topic,
        article_length_minutes: article.readingTime,
        article_slug: article.slug
      }
    });
  }, [article.slug]);

  const handleScroll = (depth) => {
    window.plausible?.('Article Engagement', {
      props: {
        article_slug: article.slug,
        scroll_depth: depth.toString(),
        time_on_page_seconds: getTimeOnPage().toString()
      }
    });
  };

  const handleRelatedClick = (target, position) => {
    window.plausible?.('Related Content Clicked', {
      props: {
        source_article: article.slug,
        target_article: target.slug,
        position: position.toString()
      }
    });
  };

  return (
    // Component JSX
  );
}
```

### For form submissions
```tsx
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(formData)
    });
    
    if (response.ok) {
      window.plausible?.('Contact Form Submitted', {
        props: {
          intent: formData.intent,
          status: 'success'
        }
      });
    }
  } catch (error) {
    window.plausible?.('Contact Form Submitted', {
      props: {
        intent: formData.intent,
        status: 'error'
      }
    });
  }
};
```

### For interactive elements
```tsx
const handleNewsletterSignup = (source, placement) => {
  window.plausible?.('Newsletter Signup', {
    props: {
      source,
      placement
    }
  });
};
```

## KPI-to-event mapping

### Traffic and engagement
| KPI | Events to track | Notes |
| --- | --- | --- |
| Monthly unique visitors | Automatic (pageview) | Plausible counts unique browsers |
| Returning visitor rate | Automatic (session detection) | Plausible identifies return visits |
| Article page scroll depth | Article Engagement (scroll milestones) | Fire at 25%, 50%, 75%, 100% |
| Time on article | Article Engagement (on exit or milestone) | Calculate as page_open to page_close |
| Click-through to related content | Related Content Clicked | Track position and section |

### Trust and distribution
| KPI | Events to track | Notes |
| --- | --- | --- |
| Newsletter subscribers | Newsletter Signup | Track signup conversions |
| Newsletter open rate | Via email platform (not Plausible) | Use email service provider analytics |
| Newsletter click rate | Outbound Link (to newsletter links) | Cross-reference with email clicks |
| Direct traffic growth | Automatic (referrer = direct) | Plausible tracks direct visits |
| Referral quality from social/search | Automatic (referrer information) | Plausible segments by referrer |

### Conversion
| KPI | Events to track | Notes |
| --- | --- | --- |
| Newsletter signup rate | Newsletter Signup / pageviews | Calculate conversion rate from pageviews |
| Contact form completion rate | Contact Form Submitted / visits | Measure form submission rate |
| Collaboration inquiry rate | Contact Form Submitted (intent: collaboration) | Segment by intent type |
| Affiliate CTR | Affiliate Click / mentions | Track partner click engagement |

### Content system health
| KPI | Events to track | Notes |
| --- | --- | --- |
| Publishing consistency | Page creation date (metadata) | Manual tracking via content calendar |
| Percent of articles linked to related content | Related Content Clicked events | Count articles with active related links |
| Percent of projects upgraded to case-study quality | Project Viewed events | Manual review + engagement metrics |
| Number of papershelf/bookshelf entries | Page views for curated surfaces | Track once secondary surfaces launch |

## Privacy and compliance

### What we collect and why
- **Pageviews**: Measure traffic and user flow through the site.
- **Device/browser info**: Understand how users access the site.
- **Referrer**: Measure traffic sources and quality.
- **Country/region**: Segment audience by geography.
- **Custom events**: Measure user engagement with specific features.

### What we do NOT collect
- IP addresses (Plausible hashes them and discards)
- Cookies or persistent identifiers
- Personal names, emails or IDs (unless submitted in a form)
- Detailed device fingerprints
- Session replay data

### GDPR and privacy safeguards
- No consent banner or cookie notice required (cookieless analytics).
- No tracking across domains or third-party integrations.
- Data retention follows Plausible default policy (30 days by default).
- User opt-out: Analytics script respects Do Not Track (DNT) header.

### Disclosure in privacy policy
The privacy policy should document:
- Use of Plausible Analytics for measuring site usage.
- No personal data collection or storage.
- Self-hosted analytics (not third-party).
- Compliance with GDPR and privacy by design principles.

## Monitoring and validation

### How to check if tracking is working

**In the browser console**:
```javascript
// Check if Plausible is loaded
console.log(window.plausible);

// Fire a test event
window.plausible('Test Event', { props: { test: 'true' } });
```

**In Plausible dashboard**:
1. Log in to `https://count.ganesshkumar.com`
2. Check real-time event stream for new events.
3. Verify custom events appear in the events list.

### QA checklist before launch
- [ ] Plausible script loads on all pages (check network tab).
- [ ] Pageviews are recorded (visible in real-time).
- [ ] Outbound links are tracked (test with external link).
- [ ] File downloads are tracked (test with .pdf or similar).
- [ ] Custom events fire correctly (test Newsletter Signup, Contact Form, etc.).
- [ ] Privacy policy mentions Plausible and analytics approach.
- [ ] No sensitive data (emails, IDs) is sent in event properties.

## Performance considerations

### Script loading
- Plausible script is deferred and loads after page content.
- No render-blocking impact.
- ~45 KB gzipped.

### Event firing overhead
- Event firing is asynchronous and non-blocking.
- Safe to fire multiple events per page without performance penalty.

### Recommendations
- Batch related scroll/engagement events (do not fire on every scroll pixel).
- Debounce or throttle high-frequency events (for example scroll tracking).
- Use consistent event names and property keys across the codebase.

## Related docs
- `performance-indicators.md`: KPI definitions and quality bar.
- `content-and-sidebar-strategy.md`: monetization strategy (for affiliate tracking).
- `../engineering/security-and-privacy.md`: privacy model and headers.
