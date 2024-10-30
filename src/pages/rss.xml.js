import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function GET(context) {
  const items = await pagesGlobToRssItems(import.meta.glob('./articles/*.md'));
  items.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));

  return rss({
    title: 'Ganessh Kumar',
    description: "Ganessh Kumar's personal site to write about technology and learnings",
    site: context.site,
    items,
    customData: `<language>en-us</language>`,
  });
}