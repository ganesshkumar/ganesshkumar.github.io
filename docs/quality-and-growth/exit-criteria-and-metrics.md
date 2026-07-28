# Exit Criteria and Metrics

> The go or no-go criteria for launching the rebuild, and the success metrics to watch after. The ongoing quality bar, the full KPI set and the review cadence live in `performance-indicators.md`. This doc is the launch gate.

## Exit criteria
The rebuild ships only when all of these are met.

### Design and UX
1. All four primary tabs are redesigned and consistent.
2. Homepage clearly communicates positioning and routes users effectively.
3. Article pages provide a strong reading experience on desktop and mobile.
4. Projects section communicates proof, not just links.
5. About page communicates credibility without visual clutter.
6. Contact flow is clear, intentional and working.

### Technical
1. Canonical host is consistent across metadata, sitemap and robots.
2. Sitemap includes only valid routes.
3. SearchAction is removed or backed by a real search route.
4. Contact page has proper metadata.
5. Static build succeeds cleanly.
6. No new severe accessibility or lint regressions caused by rebuild work.

### Content system
1. Related articles are working on article pages.
2. Newsletter CTA exists and is usable.
3. Project pages or project cards clearly communicate outcomes.
4. Footer and internal navigation support future pillar growth.

### Monetization
1. Ad placements do not damage readability.
2. No aggressive layout shifts caused by ads.
3. Affiliate or sponsor surfaces are disclosed clearly.
4. Sidebar policy is respected page-by-page.

## Launch gate
Launch when:
- Priority 0 technical issues are fixed,
- the core reading experience is stronger than the current site,
- and the new system is easier to expand than the old one.

## Success metrics after launch
Watch these in the first months. Full definitions live in `performance-indicators.md`.
- **Engagement:** returning visitor rate, scroll depth, time on article, click-through to related content.
- **Trust and distribution:** newsletter subscribers, open and click rates, direct and referral traffic.
- **Conversion:** newsletter signup rate, contact completion rate, collaboration inquiries.
- **Content health:** publishing consistency, percent of articles with related links, projects upgraded to case-study quality.

## Related
- Full quality bar, KPI set and cadence: `performance-indicators.md`.
- Per-page ship gates: `acceptance-checklists.md`.
