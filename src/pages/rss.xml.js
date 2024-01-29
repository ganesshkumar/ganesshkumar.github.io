import rss, { pagesGlobToRssItems } from '@astrojs/rss';

export async function GET(context) {
  return rss({
    title: 'Ganessh Kumar',
    description: "Ganessh Kumar's personal site to write about technology and learnings",
    site: context.site,
    items: await pagesGlobToRssItems(import.meta.glob('./articles/*.md')),
    customData: `<language>en-us</language>`,
  });
}